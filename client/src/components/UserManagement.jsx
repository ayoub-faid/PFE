import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import userService from '../services/userService';
import { Trash2, Edit2, Users, UserCheck, Truck, Shield, X, Loader2, Circle, Search } from 'lucide-react';

const roleConfig = {
  admin: { label: 'Admin', color: 'bg-primary/5 text-primary', dot: 'bg-primary' },
  delivery: { label: 'Livreur', color: 'bg-accent-50 text-accent', dot: 'bg-accent' },
  client: { label: 'Client', color: 'bg-accent/5 text-accent', dot: 'bg-accent' },
};

export default function UserManagement() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRole, setSelectedRole] = useState('all');
  const [editingUser, setEditingUser] = useState(null);
  const [newRole, setNewRole] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDelete, setShowDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => { fetchData(); }, []);

  useEffect(() => {
    let f = users;
    if (selectedRole !== 'all') f = f.filter(u => u.role === selectedRole);
    if (searchTerm) f = f.filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredUsers(f);
  }, [selectedRole, users, searchTerm]);

  const fetchData = async () => {
    try {
      setLoading(true); setError(null);
      const [r] = await Promise.all([userService.getAllUsers(), userService.getUserStats()]);
      setUsers(r.data.data || []); setFilteredUsers(r.data.data || []);
    } catch (err) { setError(err.response?.data?.message || 'Erreur'); }
    finally { setLoading(false); }
  };

  const stats = {};
  users.forEach(u => { stats[u.role] = (stats[u.role] || 0) + 1; });

  const Modal = ({ children, onClose }) => (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full" onClick={e => e.stopPropagation()}>{children}</div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total', count: users.length, icon: Users, color: 'bg-primary' },
          { label: 'Clients', count: stats.client || 0, icon: UserCheck, color: 'bg-accent' },
          { label: 'Admins', count: stats.admin || 0, icon: Shield, color: 'bg-primary' },
          { label: 'Livreurs', count: stats.delivery || 0, icon: Truck, color: 'bg-accent' },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400 font-medium">{s.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-0.5">{s.count}</p>
              </div>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${s.color}15` }}>
                <s.icon className="h-5 w-5" style={{ color: s.color.replace('bg-', '').replace('-500', '').replace('-', '') || '#622B14' }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-1.5">
          {[
            { id: 'all', label: 'Tous' },
            { id: 'client', label: 'Clients' },
            { id: 'admin', label: 'Admins' },
            { id: 'delivery', label: 'Livreurs' },
          ].map(r => (
            <button key={r.id} onClick={() => setSelectedRole(r.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedRole === r.id ? 'bg-primary text-white shadow-sm' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}>
              {r.label} ({r.id === 'all' ? users.length : stats[r.id] || 0})
            </button>
          ))}
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-300" />
          <input type="text" placeholder="Rechercher..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
            className="pl-9 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
      </div>

      {loading && <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 text-primary animate-spin" /></div>}
      {error && <div className="bg-red-50 border border-red-100 rounded-xl p-4 text-sm text-red-600">{error}</div>}

      {!loading && !error && filteredUsers.length > 0 && (
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full">
            <thead><tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Nom</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Email</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-400 uppercase">Rôle</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Inscrit</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-400 uppercase">Actions</th>
            </tr></thead>
            <tbody className="divide-y divide-gray-100">
              {filteredUsers.map(u => {
                const rc = roleConfig[u.role] || roleConfig.client;
                return (
                  <tr key={u._id} className="hover:bg-gray-50 transition text-sm">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                          <span className="text-xs font-bold text-gray-500">{u.name.charAt(0).toUpperCase()}</span>
                        </div>
                        <span className="font-medium text-gray-900">{u.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-400">{u.email}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${rc.color}`}>
                        <Circle className={`h-1.5 w-1.5 fill-current ${rc.dot}`} />
                        {rc.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-400">{new Date(u.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-3 text-right">
                      <button onClick={() => { setEditingUser(u); setNewRole(u.role); setShowEditModal(true); }}
                        className="text-xs font-medium text-primary hover:bg-primary/5 px-2.5 py-1.5 rounded-lg transition">
                        <Edit2 className="w-3.5 h-3.5 inline mr-1" />Rôle
                      </button>
                      {user?._id !== u._id && (
                        <button onClick={() => setShowDelete(u._id)}
                          className="text-xs font-medium text-red-500 hover:bg-red-50 px-2.5 py-1.5 rounded-lg transition ml-1">
                          <Trash2 className="w-3.5 h-3.5 inline mr-1" />Suppr.
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {!loading && !error && filteredUsers.length === 0 && (
        <div className="text-center py-12"><Users className="h-12 w-12 text-gray-200 mx-auto mb-3" /><p className="text-gray-400 text-sm">Aucun utilisateur</p></div>
      )}

      {/* Edit Role Modal */}
      {showEditModal && editingUser && (
        <Modal onClose={() => setShowEditModal(false)}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Modifier le rôle</h3>
              <button onClick={() => setShowEditModal(false)} className="p-1.5 hover:bg-gray-100 rounded-lg"><X className="h-5 w-5 text-gray-400" /></button>
            </div>
            <div className="mb-4">
              <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-sm font-bold text-gray-500">{editingUser.name.charAt(0).toUpperCase()}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{editingUser.name}</p>
                  <p className="text-xs text-gray-400">{editingUser.email}</p>
                </div>
              </div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nouveau rôle</label>
              <select value={newRole} onChange={e => setNewRole(e.target.value)} className="input-field">
                <option value="client">Client</option>
                <option value="admin">Admin</option>
                <option value="delivery">Livreur</option>
              </select>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowEditModal(false)} className="flex-1 btn-secondary">Annuler</button>
              <button onClick={async () => {
                if (newRole === editingUser.role) { setShowEditModal(false); return; }
                await userService.updateUserRole(editingUser._id, newRole);
                setUsers(users.map(u => u._id === editingUser._id ? { ...u, role: newRole } : u));
                setShowEditModal(false);
              }} className="flex-1 btn-primary">Enregistrer</button>
            </div>
          </div>
        </Modal>
      )}

      {/* Delete */}
      {showDelete && (
        <Modal onClose={() => setShowDelete(null)}>
          <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center"><Trash2 className="h-6 w-6 text-red-500" /></div>
              <div><h3 className="text-lg font-bold text-gray-900">Confirmer</h3><p className="text-sm text-gray-400">Action irréversible.</p></div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowDelete(null)} className="flex-1 btn-secondary">Annuler</button>
              <button onClick={() => { userService.deleteUser(showDelete); setUsers(users.filter(u => u._id !== showDelete)); setShowDelete(null); }} className="flex-1 bg-red-500 text-white rounded-xl py-2.5 font-medium hover:bg-red-600 transition">Supprimer</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
