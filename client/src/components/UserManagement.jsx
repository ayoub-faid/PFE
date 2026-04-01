import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import userService from '../services/userService';
import { Trash2, Edit2, Users, UserCheck, Truck } from 'lucide-react';

export default function UserManagement() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRole, setSelectedRole] = useState('all');
  const [stats, setStats] = useState({});
  const [editingUser, setEditingUser] = useState(null);
  const [newRole, setNewRole] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedRole === 'all') {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(users.filter(u => u.role === selectedRole));
    }
  }, [selectedRole, users]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [usersRes] = await Promise.all([
        userService.getAllUsers(),
        userService.getUserStats()
      ]);

      setUsers(usersRes.data.data || []);
      setFilteredUsers(usersRes.data.data || []);
      
      const statsObj = {};
      usersRes.data.data.forEach(u => {
        statsObj[u.role] = (statsObj[u.role] || 0) + 1;
      });
      setStats(statsObj);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load users');
      console.error('Error loading users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditRole = (u) => {
    setEditingUser(u);
    setNewRole(u.role);
    setShowEditModal(true);
  };

  const handleSaveRole = async () => {
    try {
      if (newRole === editingUser.role) {
        setShowEditModal(false);
        return;
      }

      await userService.updateUserRole(editingUser._id, newRole);
      
      const updatedUsers = users.map(u =>
        u._id === editingUser._id ? { ...u, role: newRole } : u
      );
      setUsers(updatedUsers);
      
      setShowEditModal(false);
      setEditingUser(null);
      alert('User role updated successfully');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update user role');
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await userService.deleteUser(userId);
      setUsers(users.filter(u => u._id !== userId));
      setShowDeleteConfirm(null);
      alert('User deleted successfully');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete user');
    }
  };

  const StatCard = ({ label, count, icon: Icon, color }) => (
    <div className={`bg-gradient-to-br rounded-lg shadow-md p-6 border-l-4 ${color}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium">{label}</p>
          <p className="text-4xl font-bold text-gray-900">{count || 0}</p>
        </div>
        <Icon className="w-12 h-12 text-gray-300" />
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Statistics Section */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">User Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Total Users"
            count={users.length}
            icon={Users}
            color="border-blue-500"
          />
          <StatCard
            label="Clients"
            count={stats.client}
            icon={UserCheck}
            color="border-green-500"
          />
          <StatCard
            label="Admins"
            count={stats.admin}
            icon={UserCheck}
            color="border-yellow-500"
          />
          <StatCard
            label="Delivery"
            count={stats.delivery}
            icon={Truck}
            color="border-orange-500"
          />
        </div>
      </div>

      {/* Users Management Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-900">User Roles</h3>
          
          {/* Role Filter */}
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setSelectedRole('all')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                selectedRole === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All Users
            </button>
            <button
              onClick={() => setSelectedRole('client')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                selectedRole === 'client'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Clients
            </button>
            <button
              onClick={() => setSelectedRole('admin')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                selectedRole === 'admin'
                  ? 'bg-yellow-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Admins
            </button>
            <button
              onClick={() => setSelectedRole('delivery')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                selectedRole === 'delivery'
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Delivery
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Users Table */}
        {!loading && !error && filteredUsers.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.map(u => (
                  <tr key={u._id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="font-medium text-gray-900">{u.name}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-gray-600 text-sm">{u.email}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        u.role === 'admin' ? 'bg-yellow-100 text-yellow-800' :
                        u.role === 'delivery' ? 'bg-orange-100 text-orange-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => handleEditRole(u)}
                        className="text-blue-600 hover:text-blue-900 mr-4 inline-flex items-center gap-1 font-medium"
                      >
                        <Edit2 className="w-4 h-4" /> Edit
                      </button>
                      {user?._id !== u._id && (
                        <button
                          onClick={() => setShowDeleteConfirm(u._id)}
                          className="text-red-600 hover:text-red-900 inline-flex items-center gap-1 font-medium"
                        >
                          <Trash2 className="w-4 h-4" /> Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredUsers.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No users found</p>
          </div>
        )}
      </div>

      {/* Edit Role Modal */}
      {showEditModal && editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Edit User Role</h3>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">User: <span className="font-medium">{editingUser.name}</span></p>
              <p className="text-sm text-gray-600 mb-4">Email: <span className="font-medium">{editingUser.email}</span></p>
              
              <label className="block text-sm font-medium text-gray-700 mb-2">New Role</label>
              <select
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="client">Client</option>
                <option value="admin">Admin</option>
                <option value="delivery">Delivery</option>
              </select>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveRole}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-medium"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this user? This action cannot be undone.</p>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteUser(showDeleteConfirm)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
