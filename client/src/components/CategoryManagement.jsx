import React, { useState, useEffect } from 'react';
import { Trash2, Edit2, Plus, FolderOpen, X, Loader2, Circle } from 'lucide-react';
import categoryService from '../services/categoryService';

export default function CategoryManagement() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [showDelete, setShowDelete] = useState(null);
  const [form, setForm] = useState({ name: '', description: '', active: true, image: null });

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try { setLoading(true); setError(null);
      const r = await categoryService.getAllCategories();
      setCategories(r.data.data || []);
    } catch (err) { setError(err.response?.data?.message || 'Erreur'); }
    finally { setLoading(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const d = new FormData();
      d.append('name', form.name); d.append('description', form.description); d.append('active', form.active);
      if (form.image) d.append('image', form.image);
      if (editing) await categoryService.updateCategory(editing._id, d);
      else await categoryService.createCategory(d);
      setShowModal(false); setForm({ name: '', description: '', active: true, image: null });
      fetchData();
    } catch (err) { alert(err.response?.data?.message || 'Erreur'); }
  };

  const Modal = ({ children, onClose }) => (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full" onClick={e => e.stopPropagation()}>{children}</div>
    </div>
  );

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900">Catégories <span className="text-gray-400 font-normal">({categories.length})</span></h3>
        <button onClick={() => { setEditing(null); setForm({ name: '', description: '', active: true, image: null }); setShowModal(true); }} className="btn-primary text-sm">
          <Plus className="w-4 h-4" /> Ajouter
        </button>
      </div>

      {loading && <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 text-primary animate-spin" /></div>}
      {error && <div className="bg-red-50 border border-red-100 rounded-xl p-4 text-sm text-red-600">{error}</div>}

      {!loading && !error && categories.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map(c => (
            <div key={c._id} className="bg-white rounded-xl border border-gray-200 overflow-hidden card-hover">
              {c.image && <img src={`http://localhost:5000/uploads/${c.image}`} alt="" className="w-full h-36 object-cover" />}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{c.name}</h4>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${c.active ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-400'}`}>{c.active ? 'Actif' : 'Inactif'}</span>
                </div>
                <p className="text-sm text-gray-400 line-clamp-2 mb-3">{c.description}</p>
                <div className="flex gap-2">
                  <button onClick={() => { setEditing(c); setForm({ name: c.name, description: c.description, active: c.active, image: null }); setShowModal(true); }}
                    className="flex-1 text-xs font-medium text-primary hover:bg-primary/5 py-2 rounded-lg transition flex items-center justify-center gap-1">
                    <Edit2 className="w-3.5 h-3.5" /> Modifier
                  </button>
                  <button onClick={() => setShowDelete(c._id)}
                    className="flex-1 text-xs font-medium text-red-500 hover:bg-red-50 py-2 rounded-lg transition flex items-center justify-center gap-1">
                    <Trash2 className="w-3.5 h-3.5" /> Supprimer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && !error && categories.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4"><FolderOpen className="h-8 w-8 text-gray-300" /></div>
          <p className="text-gray-500 mb-4">Aucune catégorie</p>
          <button onClick={() => setShowModal(true)} className="btn-primary text-sm">Créer</button>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">{editing ? 'Modifier' : 'Nouvelle catégorie'}</h3>
              <button onClick={() => setShowModal(false)} className="p-1.5 hover:bg-gray-100 rounded-lg"><X className="h-5 w-5 text-gray-400" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
                <input type="text" name="name" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} required className="input-field" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea name="description" value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} rows="3" className="input-field" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                <input type="file" name="image" onChange={e => setForm(p => ({ ...p, image: e.target.files[0] }))} accept="image/*" className="input-field" /></div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="cat-active" checked={form.active} onChange={e => setForm(p => ({ ...p, active: e.target.checked }))} className="h-4 w-4 rounded border-gray-300 text-primary" />
                <label htmlFor="cat-active" className="text-sm text-gray-700">Active</label>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 btn-secondary">Annuler</button>
                <button type="submit" className="flex-1 btn-primary">{editing ? 'Mettre à jour' : 'Créer'}</button>
              </div>
            </form>
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
              <button onClick={() => { categoryService.deleteCategory(showDelete); setCategories(c => c.filter(x => x._id !== showDelete)); setShowDelete(null); }} className="flex-1 bg-red-500 text-white rounded-xl py-2.5 font-medium hover:bg-red-600 transition">Supprimer</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
