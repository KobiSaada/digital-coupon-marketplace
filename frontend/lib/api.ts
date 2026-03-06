const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const api = {
  // Admin APIs
  admin: {
    createCoupon: async (data: any, token: string) => {
      const res = await fetch(`${API_URL}/admin/products/coupons`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      
      // If response is not ok, throw error with message
      if (!res.ok) {
        throw new Error(result.message || `Server error: ${res.status}`);
      }
      
      return result;
    },
    getAllProducts: async (token: string) => {
      const res = await fetch(`${API_URL}/admin/products`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return res.json();
    },
    deleteProduct: async (id: string, token: string) => {
      const res = await fetch(`${API_URL}/admin/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return res.json();
    },
  },
  
  // Customer APIs
  customer: {
    getProducts: async () => {
      const res = await fetch(`${API_URL}/customer/products`);
      return res.json();
    },
    purchase: async (id: string) => {
      const res = await fetch(`${API_URL}/customer/products/${id}/purchase`, {
        method: 'POST',
      });
      return res.json();
    },
  },
};
