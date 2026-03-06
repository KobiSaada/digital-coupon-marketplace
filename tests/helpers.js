const axios = require('axios');

const API_BASE_URL = process.env.API_URL || 'http://localhost:3000';

/**
 * Helper to get JWT token for admin/reseller
 */
async function getAuthToken() {
  const response = await axios.post(`${API_BASE_URL}/auth/admin/login`, {
    username: 'admin',
    password: 'admin123',
  });
  return response.data.access_token;
}

/**
 * Helper to get available products
 */
async function getAvailableProducts(token) {
  const response = await axios.get(`${API_BASE_URL}/api/v1/products`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

/**
 * Helper to purchase a product
 */
async function purchaseProduct(productId, resellerPrice, token) {
  const response = await axios.post(
    `${API_BASE_URL}/api/v1/products/${productId}/purchase`,
    { resellerPrice },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
}

/**
 * Helper to get all products as admin (includes sold products)
 */
async function getAllProductsAsAdmin(token) {
  const response = await axios.get(`${API_BASE_URL}/admin/products`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

/**
 * Helper to create a coupon as admin
 */
async function createCoupon(couponData, token) {
  const response = await axios.post(
    `${API_BASE_URL}/admin/products/coupons`,
    couponData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
}

/**
 * Helper to delete a product as admin
 */
async function deleteProduct(productId, token) {
  const response = await axios.delete(
    `${API_BASE_URL}/admin/products/${productId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
}

/**
 * Helper to get customer products (public)
 */
async function getCustomerProducts() {
  const response = await axios.get(`${API_BASE_URL}/customer/products`);
  return response.data;
}

/**
 * Helper to purchase as customer
 */
async function customerPurchase(productId) {
  const response = await axios.post(
    `${API_BASE_URL}/customer/products/${productId}/purchase`
  );
  return response.data;
}

/**
 * Calculate minimum sell price
 */
function calculateMinimumSellPrice(costPrice, marginPercentage) {
  return costPrice * (1 + marginPercentage / 100);
}

module.exports = {
  API_BASE_URL,
  getAuthToken,
  getAvailableProducts,
  purchaseProduct,
  getAllProductsAsAdmin,
  createCoupon,
  deleteProduct,
  getCustomerProducts,
  customerPurchase,
  calculateMinimumSellPrice,
};
