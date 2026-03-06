'use client';

import { useState, useEffect } from 'react';
import { api } from '../lib/api';

export default function CustomerPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [purchaseResult, setPurchaseResult] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await api.customer.getProducts();
      setProducts(data);
    } catch (err: any) {
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async (id: string) => {
    if (!confirm('Are you sure you want to purchase this coupon?')) return;

    try {
      const result = await api.customer.purchase(id);
      if (result.error_code) {
        alert(`Error: ${result.message}`);
      } else {
        setPurchaseResult(result);
        loadProducts(); // Reload to remove purchased item
      }
    } catch (err: any) {
      alert('Purchase failed');
    }
  };

  if (loading) return <div style={centerStyle}>Loading...</div>;

  return (
    <div>
      <h2 style={headingStyle}>Available Coupons</h2>
      
      {error && <div style={errorStyle}>{error}</div>}
      
      {purchaseResult && (
        <div style={successBoxStyle}>
          <h3>🎉 Purchase Successful!</h3>
          <p><strong>Product ID:</strong> {purchaseResult.productId}</p>
          <p><strong>Price Paid:</strong> ${purchaseResult.finalPrice}</p>
          <p><strong>Coupon Code:</strong> <code style={codeStyle}>{purchaseResult.value}</code></p>
          <button onClick={() => setPurchaseResult(null)} style={buttonStyle}>Close</button>
        </div>
      )}

      <div style={gridStyle}>
        {products.length === 0 ? (
          <p>No products available</p>
        ) : (
          products.map((product) => (
            <div key={product.id} style={cardStyle}>
              <img src={product.imageUrl} alt={product.name} style={imageStyle} />
              <h3>{product.name}</h3>
              <p style={descStyle}>{product.description}</p>
              <p style={priceStyle}>${product.price}</p>
              <button 
                onClick={() => handlePurchase(product.id)} 
                style={buttonStyle}
              >
                Purchase Now
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const centerStyle: React.CSSProperties = { textAlign: 'center', padding: '2rem' };
const headingStyle: React.CSSProperties = { marginBottom: '1.5rem' };
const errorStyle: React.CSSProperties = { 
  padding: '1rem', 
  backgroundColor: '#fee', 
  color: '#c33', 
  borderRadius: '4px', 
  marginBottom: '1rem' 
};
const successBoxStyle: React.CSSProperties = { 
  padding: '1.5rem', 
  backgroundColor: '#efe', 
  border: '2px solid #5c5', 
  borderRadius: '8px', 
  marginBottom: '2rem' 
};
const codeStyle: React.CSSProperties = { 
  backgroundColor: '#333', 
  color: '#0f0', 
  padding: '0.25rem 0.5rem', 
  borderRadius: '4px',
  fontSize: '1.1rem',
  fontWeight: 'bold'
};
const gridStyle: React.CSSProperties = { 
  display: 'grid', 
  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
  gap: '1.5rem' 
};
const cardStyle: React.CSSProperties = { 
  border: '1px solid #ddd', 
  borderRadius: '8px', 
  padding: '1rem', 
  backgroundColor: 'white' 
};
const imageStyle: React.CSSProperties = { 
  width: '100%', 
  height: '150px', 
  objectFit: 'cover', 
  borderRadius: '4px', 
  marginBottom: '0.5rem' 
};
const descStyle: React.CSSProperties = { 
  color: '#666', 
  fontSize: '0.9rem', 
  marginBottom: '1rem' 
};
const priceStyle: React.CSSProperties = { 
  fontSize: '1.5rem', 
  fontWeight: 'bold', 
  color: '#2a7', 
  marginBottom: '1rem' 
};
const buttonStyle: React.CSSProperties = { 
  width: '100%', 
  padding: '0.75rem', 
  backgroundColor: '#007bff', 
  color: 'white', 
  border: 'none', 
  borderRadius: '4px', 
  cursor: 'pointer',
  fontSize: '1rem'
};
