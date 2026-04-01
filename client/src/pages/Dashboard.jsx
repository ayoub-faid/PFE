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
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-2xl font-bold">Gros Products</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm">{user?.name} ({user?.role})</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 p-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome, {user?.name}!</h2>
            <p className="text-gray-600 mb-4">Your role: <span className="font-semibold text-blue-600">{user?.role}</span></p>
            
            <div className="space-y-4">
              {user?.role === 'admin' && (
                <div className="bg-yellow-50 p-4 rounded">
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
