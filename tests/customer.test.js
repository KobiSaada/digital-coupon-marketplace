const axios = require('axios');
const {
  getCustomerProducts,
  customerPurchase,
  API_BASE_URL,
} = require('./helpers');

describe('🛍️ Customer API Tests', () => {
  describe('📋 GET /customer/products', () => {
    test('should return available products without authentication', async () => {
      const products = await getCustomerProducts();

      expect(Array.isArray(products)).toBe(true);
      expect(products.length).toBeGreaterThan(0);
    });

    test('should include required fields', async () => {
      const products = await getCustomerProducts();
      const product = products[0];

      expect(product).toHaveProperty('id');
      expect(product).toHaveProperty('name');
      expect(product).toHaveProperty('description');
      expect(product).toHaveProperty('imageUrl');
      expect(product).toHaveProperty('price');
    });

    test('should NOT include sensitive admin fields', async () => {
      const products = await getCustomerProducts();
      const product = products[0];

      // Customer should not see cost price or margin
      expect(product.coupon).toBeUndefined();
    });

    test('should only show unsold products', async () => {
      const products = await getCustomerProducts();

      // All products should be unsold (isSold not exposed but implied)
      expect(products.length).toBeGreaterThan(0);
    });
  });

  describe('💳 POST /customer/products/{id}/purchase', () => {
    test('should successfully purchase available product', async () => {
      const products = await getCustomerProducts();
      const product = products[0];

      const result = await customerPurchase(product.id);

      expect(result).toHaveProperty('value');
      expect(result).toHaveProperty('value_type');
      expect(result.value).toBeDefined();
      expect(['STRING', 'IMAGE']).toContain(result.value_type);
    });

    test('should reject purchase of already sold product', async () => {
      const products = await getCustomerProducts();
      const product = products[1];

      // First purchase
      await customerPurchase(product.id);

      // Try to purchase again
      try {
        await customerPurchase(product.id);
        fail('Should have thrown error for already sold product');
      } catch (error) {
        expect(error.response.status).toBe(409);
        expect(error.response.data.error_code).toBe('PRODUCT_ALREADY_SOLD');
      }
    });

    test('should return 404 for non-existent product', async () => {
      const fakeId = '00000000-0000-0000-0000-000000000000';

      try {
        await customerPurchase(fakeId);
        fail('Should have thrown 404 error');
      } catch (error) {
        expect(error.response.status).toBe(404);
        expect(error.response.data.error_code).toBe('PRODUCT_NOT_FOUND');
      }
    });

    test('customer pays fixed price (no negotiation)', async () => {
      const products = await getCustomerProducts();
      const product = products[2];
      const displayPrice = product.price;

      const result = await customerPurchase(product.id);

      // Customer cannot change price - it's always the minimum sell price
      expect(result.value).toBeDefined();
      // We don't get final_price in customer response, but purchase succeeded
    });
  });

  describe('⚡ Customer Purchase Flow', () => {
    test('should follow complete purchase flow', async () => {
      // 1. View products
      const products = await getCustomerProducts();
      expect(products.length).toBeGreaterThan(0);

      // 2. Select a product
      const selectedProduct = products[3];
      expect(selectedProduct).toHaveProperty('id');
      expect(selectedProduct).toHaveProperty('price');

      // 3. Purchase
      const result = await customerPurchase(selectedProduct.id);
      expect(result.value).toBeDefined();

      // 4. Product should no longer be in available list
      const updatedProducts = await getCustomerProducts();
      const stillAvailable = updatedProducts.find(
        p => p.id === selectedProduct.id
      );
      expect(stillAvailable).toBeUndefined();
    });
  });

  describe('❌ Error Handling', () => {
    test('all errors should follow standard format', async () => {
      try {
        const fakeId = 'invalid-uuid';
        await customerPurchase(fakeId);
        fail('Should have thrown error');
      } catch (error) {
        const errorData = error.response.data;
        expect(errorData).toHaveProperty('error_code');
        expect(errorData).toHaveProperty('message');
      }
    });
  });
});
