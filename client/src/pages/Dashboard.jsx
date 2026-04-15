import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Redirect based on role
  useEffect(() => {
    if (user?.role === 'admin') {
      navigate('/admin', { replace: true });
    } else if (user?.role === 'delivery') {
      navigate('/delivery', { replace: true });
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <nav className="bg-gray-900 text-white border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-2xl font-bold text-red-500">Gros Products</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-300">{user?.name} ({user?.role})</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-700 rounded-lg h-96 p-4 bg-gray-800">
            <h2 className="text-2xl font-bold text-white mb-4">Welcome, {user?.name}!</h2>
            <p className="text-gray-300 mb-4">Your role: <span className="font-semibold text-red-400">{user?.role}</span></p>
            
            <div className="space-y-4">
              {user?.role === 'admin' && (
                <div className="bg-red-900/20 border border-red-800 p-4 rounded">
                  <h3 className="font-semibold text-yellow-900 mb-2">Admin Dashboard</h3>
                  <p className="text-yellow-700">Redirecting to admin panel...</p>
                </div>
              )}

              {user?.role === 'client' && (
                <div className="bg-green-50 p-4 rounded">
                  <h3 className="font-semibold text-green-900 mb-2">Client Actions</h3>
                  <ul className="text-green-700 space-y-1">
                    <li>✓ Browse and purchase products</li>
                    <li>✓ Track your orders</li>
                    <li>✓ View order history</li>
                    <li>✓ Manage your profile</li>
                  </ul>
                </div>
              )}

              {user?.role === 'delivery' && (
                <div className="bg-orange-50 p-4 rounded">
                  <h3 className="font-semibold text-orange-900 mb-2">Delivery Dashboard</h3>
                  <p className="text-orange-700">Redirecting to delivery panel...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
