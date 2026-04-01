import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Truck, MapPin, Clock, CheckCircle } from 'lucide-react';

export default function DeliveryDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const DeliveryCard = ({ icon: Icon, title, count, status }) => (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-500">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>
          <p className="text-4xl font-bold text-gray-900">{count}</p>
          <p className="text-xs text-gray-500 mt-1">{status}</p>
        </div>
        <Icon className="w-12 h-12 text-orange-400" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-orange-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div>
              <h1 className="text-2xl font-bold">Gros Products</h1>
              <p className="text-orange-100 text-sm">Delivery Dashboard</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm">{user?.name}</p>
                <p className="text-xs text-orange-100">{user?.role}</p>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-sm font-medium transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome, {user?.name}!</h2>
          <p className="text-gray-600">Manage your deliveries and track routes</p>
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <DeliveryCard
            icon={Truck}
            title="Active Deliveries"
            count="0"
            status="No deliveries assigned"
          />
          <DeliveryCard
            icon={CheckCircle}
            title="Completed Today"
            count="0"
            status="This week"
          />
          <DeliveryCard
            icon={MapPin}
            title="Total Routes"
            count="0"
            status="This month"
          />
          <DeliveryCard
            icon={Clock}
            title="Avg. Time"
            count="--"
            status="Per delivery"
          />
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Delivery Actions</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-orange-50 p-6 rounded-lg border-2 border-orange-200">
              <Truck className="w-8 h-8 text-orange-600 mb-3" />
              <h4 className="font-semibold text-orange-900 mb-2">View Active Deliveries</h4>
              <p className="text-orange-700 text-sm mb-4">See all deliveries assigned to you</p>
              <button className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition font-medium text-sm">
                View Deliveries
              </button>
            </div>

            <div className="bg-orange-50 p-6 rounded-lg border-2 border-orange-200">
              <MapPin className="w-8 h-8 text-orange-600 mb-3" />
              <h4 className="font-semibold text-orange-900 mb-2">Track Route</h4>
              <p className="text-orange-700 text-sm mb-4">View your optimized delivery route</p>
              <button className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition font-medium text-sm">
                View Route
              </button>
            </div>

            <div className="bg-orange-50 p-6 rounded-lg border-2 border-orange-200">
              <CheckCircle className="w-8 h-8 text-orange-600 mb-3" />
              <h4 className="font-semibold text-orange-900 mb-2">Update Status</h4>
              <p className="text-orange-700 text-sm mb-4">Update delivery status and add notes</p>
              <button className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition font-medium text-sm">
                Update Status
              </button>
            </div>

            <div className="bg-orange-50 p-6 rounded-lg border-2 border-orange-200">
              <Clock className="w-8 h-8 text-orange-600 mb-3" />
              <h4 className="font-semibold text-orange-900 mb-2">History</h4>
              <p className="text-orange-700 text-sm mb-4">View your delivery history</p>
              <button className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition font-medium text-sm">
                View History
              </button>
            </div>
          </div>

          {/* Info Section */}
          <div className="mt-8 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
            <p className="text-blue-900 text-sm">
              <span className="font-semibold">Note:</span> Delivery features are currently under development. 
              Check back soon for full delivery management capabilities.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
