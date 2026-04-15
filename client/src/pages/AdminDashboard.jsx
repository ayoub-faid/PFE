import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import userService from '../services/userService';
import { Users, Settings, BarChart3, FolderOpen, Package, ShoppingCart } from 'lucide-react';
import UserManagement from '../components/UserManagement';
import CategoryManagement from '../components/CategoryManagement';
import ProductManagement from '../components/ProductManagement';
import StockReport from '../components/StockReport';

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('users');
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await userService.getUserStats();
        const statsObj = {};
        response.data.data.forEach(stat => {
          statsObj[stat._id] = stat.count;
        });
        setStats(statsObj);
      } catch (err) {
        console.error('Error loading stats:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const tabs = [
    { id: 'users', label: 'Users', icon: Users },
    { id: 'categories', label: 'Categories', icon: FolderOpen },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'stock', label: 'Stock Report', icon: BarChart3 }
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Navbar */}
      <nav className="bg-gray-900 text-white border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div>
              <h1 className="text-2xl font-bold text-red-500">Gros Products</h1>
              <p className="text-red-300 text-sm">Admin Dashboard</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-300">{user?.name}</p>
                <p className="text-xs text-red-300">{user?.role}</p>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-sm font-medium transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-700">
            <div className="flex gap-0">
              {tabs.map(tab => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 px-4 py-4 flex items-center justify-center gap-2 font-medium transition border-b-2 ${
                      isActive
                        ? 'bg-red-900/20 text-red-400 border-red-500'
                        : 'bg-gray-800 text-gray-400 border-gray-600 hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          {activeTab === 'users' && <UserManagement />}
          {activeTab === 'categories' && <CategoryManagement />}
          {activeTab === 'products' && <ProductManagement />}
          {activeTab === 'stock' && <StockReport />}
        </div>
      </main>
    </div>
  );
}
