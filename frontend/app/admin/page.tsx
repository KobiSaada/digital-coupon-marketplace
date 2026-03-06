'use client';

import { useState, useEffect } from 'react';
import { api } from '../../lib/api';

export default function AdminPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [adminToken, setAdminToken] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [tokenInput, setTokenInput] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    imageUrl: '',
    costPrice: 0,
    marginPercentage: 0,
    valueType: 'STRING',
    value: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('adminToken') || process.env.NEXT_PUBLIC_ADMIN_TOKEN;
    if (token) {
      setAdminToken(token);
      setTokenInput(token);
      setIsAuthenticated(true);
      loadProducts();
    } else {
      setLoading(false);
      setShowTokenInput(true);
    }
  }, []);

  const handleTokenSubmit = async () => {
    if (!tokenInput) {
      alert('Please enter a token');
      return;
    }

    // Try to login with username/password first to get JWT
    try {
      const response = await fetch('http://localhost:3000/auth/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: 'admin',
          password: tokenInput
        })
      });

      if (response.ok) {
        const data = await response.json();
        const jwtToken = data.access_token;
        localStorage.setItem('adminToken', jwtToken);
        setAdminToken(jwtToken);
        setIsAuthenticated(true);
        setShowTokenInput(false);
        loadProducts();
        return;
      }
    } catch (err) {
      console.log('Not a password, trying as direct token...');
    }

    // If login failed, try using it as a direct JWT token
    localStorage.setItem('adminToken', tokenInput);
    setAdminToken(tokenInput);
    setIsAuthenticated(true);
    setShowTokenInput(false);
    loadProducts();
  };

  const loadProducts = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken') || adminToken || process.env.NEXT_PUBLIC_ADMIN_TOKEN || '';
      const data = await api.admin.getAllProducts(token);
      if (data.error_code) {
        alert('Authentication failed - Invalid token');
        setIsAuthenticated(false);
        localStorage.removeItem('adminToken');
        setShowTokenInput(true);
      } else {
        setProducts(data);
      }
    } catch (err) {
      console.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('adminToken') || adminToken;
      const response = await api.admin.createCoupon(formData, token);
      
      // Check if response contains error
      if (response.error_code || response.message) {
        alert(`Error: ${response.message || 'Failed to create coupon'}`);
        return;
      }
      
      alert('✅ Coupon created successfully!');
      setShowForm(false);
      setFormData({
        name: '',
        description: '',
        imageUrl: '',
        costPrice: 0,
        marginPercentage: 0,
        valueType: 'STRING',
        value: '',
      });
      loadProducts();
    } catch (err: any) {
      const errorMessage = err?.message || 'Failed to create coupon. Please check your input.';
      alert(`❌ Error: ${errorMessage}`);
      console.error('Create coupon error:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    try {
      const token = localStorage.getItem('adminToken') || adminToken;
      await api.admin.deleteProduct(id, token);
      alert('Product deleted');
      loadProducts();
    } catch (err) {
      alert('Failed to delete product');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    setAdminToken('');
    setShowTokenInput(true);
  };

  // If not authenticated, show token input
  if (showTokenInput && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Admin Access</h1>
            <p className="text-gray-600">Enter admin password or JWT token</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Password or Token
              </label>
              <input
                type="password"
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleTokenSubmit()}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors"
                placeholder="admin123 or JWT token"
              />
            </div>

            <button
              onClick={handleTokenSubmit}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Access Admin Panel
            </button>

            <a
              href="/"
              className="block text-center text-indigo-600 hover:text-indigo-700 font-semibold mt-4"
            >
              ← Back to Customer Shop
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  if (loading) return <div style={centerStyle}>Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <header className="bg-white shadow-lg sticky top-0 z-50 border-b-4 border-purple-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <a 
                href="/"
                className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
              >
                🛍️ Customer Shop
              </a>
              <span className="text-gray-400 text-2xl hidden md:inline">|</span>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
                🔐 Admin Panel
              </h1>
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={() => setShowForm(!showForm)} 
                className="px-4 md:px-6 py-2 md:py-3 rounded-xl font-semibold transition-all duration-300 text-sm md:text-base bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg hover:shadow-xl hover:from-green-600 hover:to-emerald-700"
              >
                {showForm ? 'Cancel' : '+ Create New Coupon'}
              </button>
              <button 
                onClick={handleLogout} 
                className="px-4 md:px-6 py-2 md:py-3 rounded-xl font-semibold transition-all duration-300 text-sm md:text-base bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-lg hover:shadow-xl hover:from-red-600 hover:to-pink-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {showForm && (
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 border-2 border-purple-200">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            ✨ Create New Coupon
          </h3>
          <form onSubmit={handleCreateCoupon} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Product Name</label>
              <input
                type="text"
                placeholder="e.g., Netflix Premium 1 Month"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
              <input
                type="text"
                placeholder="Product description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Image URL</label>
              <input
                type="url"
                placeholder="https://example.com/image.jpg"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Cost Price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="10.00"
                  value={formData.costPrice}
                  onChange={(e) => setFormData({ ...formData, costPrice: parseFloat(e.target.value) })}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Margin Percentage (%)</label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="20"
                  value={formData.marginPercentage}
                  onChange={(e) => setFormData({ ...formData, marginPercentage: parseFloat(e.target.value) })}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Value Type</label>
              <select
                value={formData.valueType}
                onChange={(e) => setFormData({ ...formData, valueType: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors bg-white"
              >
                <option value="STRING">String (Text Code)</option>
                <option value="IMAGE">Image (QR Code)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Coupon Value/Code</label>
              <input
                type="text"
                placeholder="NETFLIX-ABC-123 or image URL"
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              🎉 Create Coupon
            </button>
          </form>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border-2 border-indigo-200">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
          📦 All Products
        </h3>
        <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Name</th>
              <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Cost</th>
              <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Margin %</th>
              <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Min Price</th>
              <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product, index) => (
              <tr key={product.id} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-indigo-50 transition-colors`}>
                <td className="px-6 py-4 text-sm font-semibold text-gray-900">{product.name}</td>
                <td className="px-6 py-4 text-sm text-gray-700">${product.coupon?.costPrice?.toFixed(2)}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{product.coupon?.marginPercentage}%</td>
                <td className="px-6 py-4 text-sm font-semibold text-green-600">${product.coupon?.minimumSellPrice?.toFixed(2)}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    product.isSold 
                      ? 'bg-red-100 text-red-800 border border-red-300' 
                      : 'bg-green-100 text-green-800 border border-green-300'
                  }`}>
                    {product.isSold ? '🔴 SOLD' : '✅ AVAILABLE'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  <button 
                    onClick={() => handleDelete(product.id)} 
                    className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg font-semibold hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow hover:shadow-lg"
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
      </div>
    </div>
  );
}

const centerStyle: React.CSSProperties = { textAlign: 'center', padding: '2rem' };
const centerBoxStyle: React.CSSProperties = { 
  maxWidth: '400px', 
  margin: '4rem auto', 
  padding: '2rem', 
  border: '1px solid #ddd', 
  borderRadius: '8px',
  textAlign: 'center'
};
const headerStyle: React.CSSProperties = { 
  display: 'flex', 
  justifyContent: 'space-between', 
  alignItems: 'center',
  marginBottom: '2rem'
};
const buttonStyle: React.CSSProperties = { 
  padding: '0.5rem 1rem', 
  backgroundColor: '#007bff', 
  color: 'white', 
  border: 'none', 
  borderRadius: '4px', 
  cursor: 'pointer' 
};
const formStyle: React.CSSProperties = { 
  backgroundColor: '#f8f9fa', 
  padding: '1.5rem', 
  borderRadius: '8px', 
  marginBottom: '2rem' 
};
const inputStyle: React.CSSProperties = { 
  width: '100%', 
  padding: '0.5rem', 
  marginBottom: '1rem', 
  border: '1px solid #ddd', 
  borderRadius: '4px',
  fontSize: '1rem'
};
const tableStyle: React.CSSProperties = { 
  width: '100%', 
  borderCollapse: 'collapse', 
  backgroundColor: 'white' 
};
const thStyle: React.CSSProperties = { 
  textAlign: 'left', 
  padding: '0.75rem', 
  borderBottom: '2px solid #ddd', 
  backgroundColor: '#f8f9fa' 
};
const tdStyle: React.CSSProperties = { 
  padding: '0.75rem', 
  borderBottom: '1px solid #ddd' 
};
const soldBadgeStyle: React.CSSProperties = { 
  padding: '0.25rem 0.5rem', 
  backgroundColor: '#ffc107', 
  borderRadius: '4px',
  fontSize: '0.85rem',
  fontWeight: 'bold'
};
const availableBadgeStyle: React.CSSProperties = { 
  padding: '0.25rem 0.5rem', 
  backgroundColor: '#28a745', 
  color: 'white',
  borderRadius: '4px',
  fontSize: '0.85rem',
  fontWeight: 'bold'
};
const deleteBtnStyle: React.CSSProperties = { 
  padding: '0.35rem 0.75rem', 
  backgroundColor: '#dc3545', 
  color: 'white', 
  border: 'none', 
  borderRadius: '4px', 
  cursor: 'pointer',
  fontSize: '0.85rem'
};
