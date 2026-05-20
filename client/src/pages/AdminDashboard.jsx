import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import userService from '../services/userService';
import { Users, BarChart3, FolderOpen, Package, ShoppingCart } from 'lucide-react';
import UserManagement from '../components/UserManagement';
import CategoryManagement from '../components/CategoryManagement';
import ProductManagement from '../components/ProductManagement';
import StockReport from '../components/StockReport';
import OrdersManagement from '../components/OrdersManagement';

export default function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('users');
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await userService.getUserStats();
        const obj = {};
        response.data.data.forEach(s => { obj[s._id] = s.count; });
        setStats(obj);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetchStats();
  }, []);

  const tabs = [
    { id: 'users', label: 'Utilisateurs', icon: Users },
    { id: 'categories', label: 'Catégories', icon: FolderOpen },
    { id: 'products', label: 'Produits', icon: Package },
    { id: 'stock', label: 'Rapport stock', icon: BarChart3 },
    { id: 'orders', label: 'Commandes', icon: ShoppingCart },
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Tabs */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-6">
          <div className="flex overflow-x-auto">
            {tabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-3.5 text-sm font-medium whitespace-nowrap border-b-2 transition-all ${
                    isActive
                      ? 'text-primary border-primary bg-primary/5'
                      : 'text-gray-400 border-transparent hover:text-gray-600 hover:bg-gray-50'
                  }`}>
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          {activeTab === 'users' && <UserManagement />}
          {activeTab === 'categories' && <CategoryManagement />}
          {activeTab === 'products' && <ProductManagement />}
          {activeTab === 'stock' && <StockReport />}
          {activeTab === 'orders' && <OrdersManagement />}
        </div>
      </main>
    </div>
  );
}
