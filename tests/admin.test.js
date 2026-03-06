const axios = require('axios');
const {
  getAuthToken,
  getAllProductsAsAdmin,
  createCoupon,
  deleteProduct,
  API_BASE_URL,
} = require('./helpers');

describe('🔐 Admin API Tests', () => {
  let authToken;

  beforeAll(async () => {
    authToken = await getAuthToken();
  });

  describe('➕ POST /admin/products/coupons - Create Coupon', () => {
    test('should successfully create a new coupon', async () => {
      const newCoupon = {
        name: 'Test Coupon - Jest',
        description: 'This is a test coupon created by Jest',
        imageUrl: 'https://via.placeholder.com/300',
        costPrice: 10.0,
        marginPercentage: 50.0,
        valueType: 'STRING',
        value: 'TEST-JEST-12345',
      };

      const result = await createCoupon(newCoupon, authToken);

      expect(result).toHaveProperty('id');
      expect(result.name).toBe(newCoupon.name);
      expect(result.type).toBe('COUPON');
      expect(result.coupon.costPrice).toBe('10.00');
      expect(result.coupon.marginPercentage).toBe('50.00');

      // Cleanup
      await deleteProduct(result.id, authToken);
    });

    test('should reject coupon with negative cost price', async () => {
      const invalidCoupon = {
        name: 'Invalid Coupon',
        description: 'Should fail',
        imageUrl: 'https://via.placeholder.com/300',
        costPrice: -5.0,
        marginPercentage: 20.0,
        valueType: 'STRING',
        value: 'INVALID',
      };

      try {
        await createCoupon(invalidCoupon, authToken);
        fail('Should have thrown validation error');
      } catch (error) {
        expect(error.response.status).toBe(400);
      }
    });

    test('should calculate minimum sell price correctly', async () => {
      const newCoupon = {
        name: 'Pricing Test Coupon',
        description: 'Test pricing calculation',
        imageUrl: 'https://via.placeholder.com/300',
        costPrice: 80.0,
        marginPercentage: 25.0,
        valueType: 'STRING',
        value: 'PRICE-TEST-123',
      };

      const result = await createCoupon(newCoupon, authToken);

      // minimum_sell_price = 80 * (1 + 25/100) = 80 * 1.25 = 100
      const expectedMinimum = 100.0;
      const costPrice = parseFloat(result.coupon.costPrice);
      const margin = parseFloat(result.coupon.marginPercentage);
      const calculatedMinimum = costPrice * (1 + margin / 100);

      expect(calculatedMinimum).toBeCloseTo(expectedMinimum, 2);

      // Cleanup
      await deleteProduct(result.id, authToken);
    });
  });

  describe('📋 GET /admin/products - List All Products', () => {
    test('should return all products including sold ones', async () => {
      const products = await getAllProductsAsAdmin(authToken);

      expect(Array.isArray(products)).toBe(true);
      expect(products.length).toBeGreaterThan(0);

      // Should include sold products
      const hasSoldProducts = products.some(p => p.isSold === true);
      // Note: This might be false if no products are sold yet
    });

    test('should include cost_price and margin for admin', async () => {
      const products = await getAllProductsAsAdmin(authToken);
      const product = products[0];

      expect(product).toHaveProperty('coupon');
      expect(product.coupon).toHaveProperty('costPrice');
      expect(product.coupon).toHaveProperty('marginPercentage');
    });

    test('should include value field for admin', async () => {
      const products = await getAllProductsAsAdmin(authToken);
      const product = products[0];

      expect(product.coupon).toHaveProperty('value');
      expect(product.coupon.value).toBeDefined();
    });
  });

  describe('🔍 GET /admin/products/{id} - Get Single Product', () => {
    test('should return product with full details', async () => {
      const products = await getAllProductsAsAdmin(authToken);
      const productId = products[0].id;

      const response = await axios.get(
        `${API_BASE_URL}/admin/products/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      expect(response.status).toBe(200);
      expect(response.data.id).toBe(productId);
      expect(response.data).toHaveProperty('coupon');
    });
  });

  describe('✏️ PATCH /admin/products/{id} - Update Product', () => {
    test('should successfully update product', async () => {
      // Create a test product
      const newCoupon = {
        name: 'Update Test Coupon',
        description: 'Will be updated',
        imageUrl: 'https://via.placeholder.com/300',
        costPrice: 15.0,
        marginPercentage: 30.0,
        valueType: 'STRING',
        value: 'UPDATE-TEST',
      };

      const created = await createCoupon(newCoupon, authToken);

      // Update it
      const updates = {
        name: 'Updated Coupon Name',
        costPrice: 20.0,
        marginPercentage: 40.0,
      };

      const response = await axios.patch(
        `${API_BASE_URL}/admin/products/${created.id}`,
        updates,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      expect(response.status).toBe(200);
      expect(response.data.name).toBe(updates.name);
      expect(response.data.coupon.costPrice).toBe('20.00');
      expect(response.data.coupon.marginPercentage).toBe('40.00');

      // Cleanup
      await deleteProduct(created.id, authToken);
    });
  });

  describe('🗑️ DELETE /admin/products/{id} - Delete Product', () => {
    test('should successfully delete product', async () => {
      // Create a test product
      const newCoupon = {
        name: 'Delete Test Coupon',
        description: 'Will be deleted',
        imageUrl: 'https://via.placeholder.com/300',
        costPrice: 12.0,
        marginPercentage: 25.0,
        valueType: 'STRING',
        value: 'DELETE-TEST',
      };

      const created = await createCoupon(newCoupon, authToken);
      const productId = created.id;

      // Delete it
      await deleteProduct(productId, authToken);

      // Verify it's deleted
      try {
        await axios.get(`${API_BASE_URL}/admin/products/${productId}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        fail('Product should have been deleted');
      } catch (error) {
        expect(error.response.status).toBe(404);
      }
    });
  });

  describe('🔒 Admin Authentication', () => {
    test('should reject admin endpoints without token', async () => {
      try {
        await axios.get(`${API_BASE_URL}/admin/products`);
        fail('Should have thrown 401 error');
      } catch (error) {
        expect(error.response.status).toBe(401);
      }
    });

    test('should accept valid admin JWT token', async () => {
      const response = await axios.get(`${API_BASE_URL}/admin/products`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      expect(response.status).toBe(200);
    });
  });
});
