'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showInstructions, setShowInstructions] = useState(true);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:3000/auth/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok && data.access_token) {
        // Save token to localStorage
        localStorage.setItem('adminToken', data.access_token);
        localStorage.setItem('refreshToken', data.refresh_token);
        
        // Redirect to admin panel
        router.push('/admin');
      } else {
        setError(data.message || 'Login failed. Check your credentials.');
      }
    } catch (err) {
      setError('Connection error. Make sure the backend is running on port 3000.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Login Form */}
          <div className="bg-white rounded-3xl shadow-2xl p-10">
            <div className="text-center mb-10">
              <div className="w-20 h-20 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Admin Login</h1>
              <p className="text-gray-600 text-lg">Digital Coupon Marketplace</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors text-lg"
                  placeholder="Enter username"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors text-lg"
                  placeholder="Enter password"
                  required
                />
              </div>

              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-xl animate-pulse">
                  <p className="text-red-700 text-sm font-bold">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-5 rounded-xl font-bold text-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                    Logging in...
                  </div>
                ) : (
                  'Login to Admin Panel'
                )}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={() => setShowInstructions(!showInstructions)}
                className="w-full text-indigo-600 hover:text-indigo-700 font-bold text-base flex items-center justify-center group"
              >
                <svg className="w-6 h-6 mr-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {showInstructions ? 'Hide' : 'Show'} Instructions
              </button>
            </div>
          </div>

          {/* Instructions Panel */}
          <div className={`bg-white rounded-3xl shadow-2xl p-10 overflow-y-auto max-h-[700px] transition-all duration-300 ${showInstructions ? 'opacity-100' : 'opacity-50'}`}>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
              <span className="text-4xl mr-3">📚</span>
              Admin Access Guide
            </h2>

            <div className="space-y-6">
              {/* Default Credentials */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-indigo-200 shadow-md">
                <h3 className="font-bold text-xl text-indigo-900 mb-4 flex items-center">
                  <span className="text-2xl mr-2">🔑</span>
                  Default Credentials
                </h3>
                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-4 flex items-center justify-between shadow-sm">
                    <div>
                      <p className="text-xs text-gray-600 font-bold mb-1">Username</p>
                      <code className="text-xl font-mono text-gray-900 font-bold">admin</code>
                    </div>
                    <button
                      onClick={() => copyToClipboard('admin')}
                      className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg"
                    >
                      📋 Copy
                    </button>
                  </div>
                  <div className="bg-white rounded-lg p-4 flex items-center justify-between shadow-sm">
                    <div>
                      <p className="text-xs text-gray-600 font-bold mb-1">Password</p>
                      <code className="text-xl font-mono text-gray-900 font-bold">admin123</code>
                    </div>
                    <button
                      onClick={() => copyToClipboard('admin123')}
                      className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg"
                    >
                      📋 Copy
                    </button>
                  </div>
                </div>
                <p className="text-sm text-indigo-800 mt-4 italic font-semibold">
                  ⚠️ These are seeded in the database. Change in production!
                </p>
              </div>

              {/* Using Terminal */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200 shadow-md">
                <h3 className="font-bold text-xl text-green-900 mb-4 flex items-center">
                  <span className="text-2xl mr-2">💻</span>
                  Get Token via Terminal
                </h3>
                <p className="text-sm text-gray-700 mb-4 font-semibold">
                  Alternative: Run this script to get your JWT token directly:
                </p>
                <div className="bg-gray-900 rounded-lg p-5 mb-4 shadow-inner">
                  <code className="text-green-400 text-base font-mono font-bold">
                    ./get-admin-token.sh
                  </code>
                </div>
                <p className="text-sm text-green-800 italic font-semibold">
                  💾 The token will be saved to <code className="bg-green-200 px-2 py-1 rounded font-mono">admin-token.txt</code>
                </p>
              </div>

              {/* Using curl */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200 shadow-md">
                <h3 className="font-bold text-xl text-purple-900 mb-4 flex items-center">
                  <span className="text-2xl mr-2">🔧</span>
                  Using curl
                </h3>
                <div className="bg-gray-900 rounded-lg p-5 mb-4 overflow-x-auto shadow-inner">
                  <code className="text-purple-400 text-xs font-mono block whitespace-pre font-semibold">
{`curl -X POST http://localhost:3000/auth/admin/login \\
  -H "Content-Type: application/json" \\
  -d '{"username":"admin","password":"admin123"}'`}
                  </code>
                </div>
                <button
                  onClick={() => copyToClipboard(`curl -X POST http://localhost:3000/auth/admin/login -H "Content-Type: application/json" -d '{"username":"admin","password":"admin123"}'`)}
                  className="w-full px-5 py-3 bg-purple-600 text-white text-base rounded-lg hover:bg-purple-700 flex items-center justify-center font-bold shadow-md hover:shadow-lg transition-all"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy curl command
                </button>
              </div>

              {/* Testing Instructions */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 border-2 border-amber-200 shadow-md">
                <h3 className="font-bold text-xl text-amber-900 mb-4 flex items-center">
                  <span className="text-2xl mr-2">🧪</span>
                  For Testers
                </h3>
                <ol className="space-y-3 text-base text-gray-700">
                  <li className="flex items-start">
                    <span className="font-bold text-amber-600 mr-3 text-lg">1.</span>
                    <span className="font-semibold">Use credentials: <code className="bg-amber-200 px-3 py-1 rounded text-sm font-mono">admin/admin123</code></span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold text-amber-600 mr-3 text-lg">2.</span>
                    <span className="font-semibold">After login, you'll get a JWT token automatically</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold text-amber-600 mr-3 text-lg">3.</span>
                    <span className="font-semibold">Token is saved to localStorage (no manual entry needed)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold text-amber-600 mr-3 text-lg">4.</span>
                    <span className="font-semibold">Access admin panel to manage products & coupons</span>
                  </li>
                </ol>
              </div>

              {/* API Docs */}
              <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-6 border-2 border-cyan-200 shadow-md">
                <h3 className="font-bold text-xl text-cyan-900 mb-4 flex items-center">
                  <span className="text-2xl mr-2">📖</span>
                  API Documentation
                </h3>
                <p className="text-base text-gray-700 mb-4 font-semibold">
                  Full API documentation with Swagger UI:
                </p>
                <a
                  href="http://localhost:3000/api/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full px-6 py-4 bg-cyan-600 text-white text-center rounded-lg hover:bg-cyan-700 font-bold text-lg shadow-md hover:shadow-xl transition-all"
                >
                  🚀 Open Swagger Docs
                </a>
                <p className="text-sm text-cyan-800 mt-3 italic font-semibold">
                  Use the "Authorize" button in Swagger with your token
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Shop */}
        <div className="text-center mt-8">
          <a
            href="/"
            className="inline-flex items-center text-white hover:text-gray-200 font-bold text-lg group"
          >
            <svg className="w-6 h-6 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Customer Shop
          </a>
        </div>
      </div>
    </div>
  );
}
