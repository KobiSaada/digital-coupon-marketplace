'use client';

import { useState, useEffect } from 'react';
import { api } from '../lib/api';

interface PurchasedCoupon {
  id: string;
  productName: string;
  code: string;
  price: number;
  purchaseDate: string;
  imageUrl: string;
}

export default function CustomerPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState<string | null>(null);
  const [purchaseResult, setPurchaseResult] = useState<any>(null);
  const [error, setError] = useState('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'shop' | 'my-coupons'>('shop');
  const [myCoupons, setMyCoupons] = useState<PurchasedCoupon[]>([]);

  useEffect(() => {
    loadProducts();
    loadMyCoupons();
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

  const loadMyCoupons = () => {
    const stored = localStorage.getItem('myCoupons');
    if (stored) {
      setMyCoupons(JSON.parse(stored));
    }
  };

  const saveCouponToLocal = (coupon: PurchasedCoupon) => {
    const updated = [...myCoupons, coupon];
    setMyCoupons(updated);
    localStorage.setItem('myCoupons', JSON.stringify(updated));
  };

  const handlePurchase = async (id: string) => {
    setPurchasing(id);
    try {
      const result = await api.customer.purchase(id);
      if (result.error_code) {
        alert(`Error: ${result.message}`);
      } else {
        const product = products.find(p => p.id === id);
        if (product) {
          const coupon: PurchasedCoupon = {
            id: result.id || Date.now().toString(),
            productName: product.name,
            code: result.value,
            price: product.price,
            purchaseDate: new Date().toISOString(),
            imageUrl: product.imageUrl
          };
          saveCouponToLocal(coupon);
        }
        setPurchaseResult(result);
        setSelectedProduct(null);
        loadProducts();
      }
    } catch (err: any) {
      alert('Purchase failed');
    } finally {
      setPurchasing(null);
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg font-semibold">Loading amazing deals...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <header className="bg-white shadow-lg sticky top-0 z-50 border-b-4 border-indigo-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <a 
                href="/"
                className="text-2xl sm:text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
              >
                🛍️ Customer Shop
              </a>
              <span className="text-gray-400 text-2xl hidden md:inline">|</span>
              <a 
                href="/admin"
                className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
              >
                🔐 Admin Panel
              </a>
            </div>
            
            <div className="flex gap-2 bg-gray-100 p-1 rounded-xl">
              <button
                onClick={() => setActiveTab('shop')}
                className={`px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-300 text-xs sm:text-sm md:text-base ${
                  activeTab === 'shop'
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                🛍️ Shop
              </button>
              <button
                onClick={() => setActiveTab('my-coupons')}
                className={`px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-300 relative text-xs sm:text-sm md:text-base ${
                  activeTab === 'my-coupons'
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                🎫 My Coupons
                {myCoupons.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {myCoupons.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
        {activeTab === 'shop' && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {products.map((product) => (
              <div 
                key={product.id} 
                onClick={() => setSelectedProduct(product)}
                className="group relative bg-white rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 cursor-pointer"
              >
                <div className="relative overflow-hidden h-40 sm:h-48 bg-gray-100">
                  <img 
                    src={product.imageUrl} 
                    alt={product.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-2 sm:top-4 right-2 sm:right-4">
                    <div className="bg-white rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2 sm:py-3 shadow-2xl">
                      <div className="text-xs sm:text-sm text-gray-500 font-semibold">Price</div>
                      <div className="text-lg sm:text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        ${product.price.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 sm:p-6">
                  <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 mb-2 sm:mb-3 group-hover:text-indigo-600 transition-colors duration-300 line-clamp-2">
                    {product.name}
                  </h2>
                  <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-3 sm:mb-4 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                  
                  <div className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
                    <span className="font-semibold">Price:</span> ${product.price?.toFixed(2) || 'N/A'}
                  </div>
                  
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-3 sm:p-4 rounded-xl sm:rounded-2xl">
                    <div className="flex items-center justify-center text-xs sm:text-sm font-semibold text-indigo-600">
                      Click to view details
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {activeTab === 'my-coupons' && (
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8">🎫 My Purchased Coupons</h2>
            {myCoupons.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No coupons yet. Start shopping!</p>
                <button
                  onClick={() => setActiveTab('shop')}
                  className="mt-4 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold"
                >
                  Go Shopping
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {myCoupons.map((coupon, index) => (
                  <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="relative h-32 sm:h-40 bg-gray-100">
                      <img 
                        src={coupon.imageUrl} 
                        alt={coupon.productName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4 sm:p-6">
                      <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-2">{coupon.productName}</h3>
                      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-3 mb-3">
                        <p className="text-xs text-gray-600 mb-2 font-semibold">COUPON CODE:</p>
                        <code className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent break-all">
                          {coupon.code}
                        </code>
                      </div>
                      <button
                        onClick={() => handleCopyCode(coupon.code)}
                        className={`w-full py-2 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center ${
                          copiedCode === coupon.code
                            ? 'bg-green-500 text-white'
                            : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700'
                        }`}
                      >
                        {copiedCode === coupon.code ? (
                          <>
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Copied!
                          </>
                        ) : (
                          <>
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            Copy Code
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedProduct(null)}>
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="relative">
              <img 
                src={selectedProduct.imageUrl} 
                alt={selectedProduct.name}
                className="w-full h-64 object-cover rounded-t-3xl"
              />
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 bg-white rounded-full p-2"
              >
                ✕
              </button>
            </div>
            
            <div className="p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{selectedProduct.name}</h2>
              <p className="text-gray-600 mb-6">{selectedProduct.description}</p>
              
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Price</p>
                    <p className="text-2xl font-bold">${selectedProduct.price?.toFixed(2) || 'N/A'}</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handlePurchase(selectedProduct.id)}
                disabled={purchasing === selectedProduct.id}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg"
              >
                {purchasing === selectedProduct.id ? 'Processing...' : 'Purchase Now'}
              </button>
            </div>
          </div>
        </div>
      )}

      {purchaseResult && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setPurchaseResult(null)}>
          <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="text-center">
              <h3 className="text-3xl font-bold mb-4">🎉 Success!</h3>
              
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 mb-6">
                <p className="text-sm text-gray-600 mb-2">Your Coupon Code</p>
                <code className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  {purchaseResult.value}
                </code>
                
                <button
                  onClick={() => handleCopyCode(purchaseResult.value)}
                  className={`w-full mt-4 py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center ${
                    copiedCode === purchaseResult.value
                      ? 'bg-green-500 text-white'
                      : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700'
                  }`}
                >
                  {copiedCode === purchaseResult.value ? (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Copied!
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Copy Code
                    </>
                  )}
                </button>
              </div>
              
              <button
                onClick={() => {
                  setPurchaseResult(null);
                  setActiveTab('my-coupons');
                }}
                className="w-full bg-gray-100 text-gray-800 py-3 rounded-xl font-bold"
              >
                View My Coupons
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
