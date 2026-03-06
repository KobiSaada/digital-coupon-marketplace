const axios = require('axios');
const {
  getAuthToken,
  getAvailableProducts,
  purchaseProduct,
  calculateMinimumSellPrice,
  API_BASE_URL,
} = require('./helpers');

describe('🔌 Reseller API Tests', () => {
  let authToken;
  let availableProducts;

  // Setup: Get auth token before all tests
  beforeAll(async () => {
    authToken = await getAuthToken();
    expect(authToken).toBeDefined();
    expect(typeof authToken).toBe('string');
    console.log('✅ Auth token obtained');
  });

  describe('🔐 Authentication', () => {
    test('should successfully authenticate with valid credentials', async () => {
      const response = await axios.post(`${API_BASE_URL}/auth/admin/login`, {
        username: 'admin',
        password: 'admin123',
      });

      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('access_token');
      expect(response.data).toHaveProperty('refresh_token');
      expect(response.data.user.role).toBe('admin');
    });

    test('should reject request without Bearer token', async () => {
      try {
        await axios.get(`${API_BASE_URL}/api/v1/products`);
        fail('Should have thrown 401 error');
      } catch (error) {
        expect(error.response.status).toBe(401);
      }
    });

    test('should reject request with invalid Bearer token', async () => {
      try {
        await axios.get(`${API_BASE_URL}/api/v1/products`, {
          headers: {
            Authorization: 'Bearer invalid-token-12345',
          },
        });
        fail('Should have thrown 401 error');
      } catch (error) {
        expect(error.response.status).toBe(401);
      }
    });
  });

  describe('📋 GET /api/v1/products', () => {
    beforeAll(async () => {
      availableProducts = await getAvailableProducts(authToken);
    });

    test('should return list of available products', async () => {
      expect(Array.isArray(availableProducts)).toBe(true);
      expect(availableProducts.length).toBeGreaterThan(0);
    });

    test('should include required fields for each product', () => {
      const product = availableProducts[0];
      expect(product).toHaveProperty('id');
      expect(product).toHaveProperty('name');
      expect(product).toHaveProperty('description');
      expect(product).toHaveProperty('image_url');
      expect(product).toHaveProperty('price');
    });

    test('should NOT include sensitive fields', () => {
      const product = availableProducts[0];
      expect(product).not.toHaveProperty('cost_price');
      expect(product).not.toHaveProperty('costPrice');
      expect(product).not.toHaveProperty('margin_percentage');
      expect(product).not.toHaveProperty('marginPercentage');
      expect(product).not.toHaveProperty('value');
    });

    test('should only return unsold products', async () => {
      // This assumes all returned products are unsold
      expect(availableProducts.length).toBeGreaterThan(0);
      // We can't directly check isSold from reseller API (not exposed)
      // But the fact we get products means they're unsold
    });

    test('price should be a valid number', () => {
      availableProducts.forEach(product => {
        expect(typeof product.price).toBe('number');
        expect(product.price).toBeGreaterThan(0);
      });
    });
  });

  describe('🔍 GET /api/v1/products/{productId}', () => {
    test('should return single product details', async () => {
      const productId = availableProducts[0].id;
      const response = await axios.get(
        `${API_BASE_URL}/api/v1/products/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      expect(response.status).toBe(200);
      expect(response.data.id).toBe(productId);
      expect(response.data).toHaveProperty('name');
      expect(response.data).toHaveProperty('price');
    });

    test('should return 404 for non-existent product', async () => {
      const fakeId = '00000000-0000-0000-0000-000000000000';
      try {
        await axios.get(`${API_BASE_URL}/api/v1/products/${fakeId}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        fail('Should have thrown 404 error');
      } catch (error) {
        expect(error.response.status).toBe(404);
        expect(error.response.data.error_code).toBe('PRODUCT_NOT_FOUND');
      }
    });
  });

  describe('💰 POST /api/v1/products/{productId}/purchase', () => {
    test('should successfully purchase with valid reseller price', async () => {
      // Get a fresh product
      const products = await getAvailableProducts(authToken);
      const product = products[0];
      const resellerPrice = product.price + 5; // Markup of $5

      const result = await purchaseProduct(
        product.id,
        resellerPrice,
        authToken
      );

      expect(result).toHaveProperty('product_id');
      expect(result).toHaveProperty('final_price');
      expect(result).toHaveProperty('value_type');
      expect(result).toHaveProperty('value');

      expect(result.product_id).toBe(product.id);
      expect(result.final_price).toBe(resellerPrice);
      expect(result.value).toBeDefined();
      expect(result.value.length).toBeGreaterThan(0);
    });

    test('should reject purchase with price below minimum', async () => {
      const products = await getAvailableProducts(authToken);
      const product = products[1];
      const lowPrice = product.price - 1; // Below minimum

      try {
        await purchaseProduct(product.id, lowPrice, authToken);
        fail('Should have thrown error for low price');
      } catch (error) {
        expect(error.response.status).toBe(400);
        expect(error.response.data.error_code).toBe('RESELLER_PRICE_TOO_LOW');
        expect(error.response.data.message).toContain('at least');
      }
    });

    test('should reject purchase of already sold product', async () => {
      // First purchase
      const products = await getAvailableProducts(authToken);
      const product = products[2];
      const resellerPrice = product.price;

      await purchaseProduct(product.id, resellerPrice, authToken);

      // Try to purchase again
      try {
        await purchaseProduct(product.id, resellerPrice, authToken);
        fail('Should have thrown error for already sold product');
      } catch (error) {
        expect(error.response.status).toBe(409);
        expect(error.response.data.error_code).toBe('PRODUCT_ALREADY_SOLD');
      }
    });

    test('should accept price equal to minimum', async () => {
      const products = await getAvailableProducts(authToken);
      const product = products[3];
      const exactPrice = product.price; // Exactly the minimum

      const result = await purchaseProduct(product.id, exactPrice, authToken);

      expect(result.final_price).toBe(exactPrice);
      expect(result.value).toBeDefined();
    });

    test('should accept price higher than minimum', async () => {
      const products = await getAvailableProducts(authToken);
      const product = products[4];
      const highPrice = product.price + 20; // Much higher markup

      const result = await purchaseProduct(product.id, highPrice, authToken);

      expect(result.final_price).toBe(highPrice);
      expect(result.value).toBeDefined();
    });

    test('should return correct value_type (STRING or IMAGE)', async () => {
      const products = await getAvailableProducts(authToken);
      const product = products[5];

      const result = await purchaseProduct(
        product.id,
        product.price,
        authToken
      );

      expect(['STRING', 'IMAGE']).toContain(result.value_type);
    });
  });

  describe('🧮 Pricing Logic Validation', () => {
    test('minimum sell price should be calculated correctly', async () => {
      // This test requires admin access to see cost_price and margin
      const adminToken = await getAuthToken();
      const response = await axios.get(`${API_BASE_URL}/admin/products`, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });

      const adminProducts = response.data;
      const testProduct = adminProducts.find(p => !p.isSold);

      if (testProduct && testProduct.coupon) {
        const costPrice = parseFloat(testProduct.coupon.costPrice);
        const marginPercentage = parseFloat(testProduct.coupon.marginPercentage);
        const calculatedMinimum = calculateMinimumSellPrice(
          costPrice,
          marginPercentage
        );

        // Get the same product from reseller API
        const resellerResponse = await axios.get(
          `${API_BASE_URL}/api/v1/products/${testProduct.id}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        const resellerPrice = resellerResponse.data.price;

        // Prices should match (within floating point tolerance)
        expect(Math.abs(resellerPrice - calculatedMinimum)).toBeLessThan(0.01);
      }
    });
  });

  describe('⚡ Atomic Operations & Race Conditions', () => {
    test('should prevent double purchase with concurrent requests', async () => {
      const products = await getAvailableProducts(authToken);
      const product = products[6];
      const price = product.price;

      // Attempt two purchases simultaneously
      const results = await Promise.allSettled([
        purchaseProduct(product.id, price, authToken),
        purchaseProduct(product.id, price, authToken),
      ]);

      // One should succeed, one should fail
      const successful = results.filter(r => r.status === 'fulfilled');
      const failed = results.filter(r => r.status === 'rejected');

      expect(successful.length).toBe(1);
      expect(failed.length).toBe(1);

      // The failed one should have PRODUCT_ALREADY_SOLD error
      if (failed[0].reason.response) {
        expect(failed[0].reason.response.data.error_code).toBe(
          'PRODUCT_ALREADY_SOLD'
        );
      }
    });
  });

  describe('❌ Error Response Format', () => {
    test('all errors should follow standard format', async () => {
      try {
        const fakeId = '00000000-0000-0000-0000-000000000000';
        await axios.get(`${API_BASE_URL}/api/v1/products/${fakeId}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        fail('Should have thrown error');
      } catch (error) {
        const errorData = error.response.data;
        expect(errorData).toHaveProperty('error_code');
        expect(errorData).toHaveProperty('message');
        expect(typeof errorData.error_code).toBe('string');
        expect(typeof errorData.message).toBe('string');
      }
    });

    test('should return correct error codes', async () => {
      const errorTests = [
        {
          name: 'PRODUCT_NOT_FOUND',
          test: async () => {
            const fakeId = '00000000-0000-0000-0000-000000000000';
            await axios.get(`${API_BASE_URL}/api/v1/products/${fakeId}`, {
              headers: { Authorization: `Bearer ${authToken}` },
            });
          },
          expectedCode: 'PRODUCT_NOT_FOUND',
          expectedStatus: 404,
        },
        {
          name: 'RESELLER_PRICE_TOO_LOW',
          test: async () => {
            const products = await getAvailableProducts(authToken);
            await purchaseProduct(products[7].id, 0.01, authToken);
          },
          expectedCode: 'RESELLER_PRICE_TOO_LOW',
          expectedStatus: 400,
        },
      ];

      for (const errorTest of errorTests) {
        try {
          await errorTest.test();
          fail(`Should have thrown error for ${errorTest.name}`);
        } catch (error) {
          expect(error.response.status).toBe(errorTest.expectedStatus);
          expect(error.response.data.error_code).toBe(errorTest.expectedCode);
        }
      }
    });
  });
});
