import React, { useState, useEffect } from 'react';
import { Trash2, Edit2, Plus, Package, AlertCircle, X, Search, Loader2, ChevronDown, Circle } from 'lucide-react';
import productService from '../services/productService';
import categoryService from '../services/categoryService';

const formatMAD = (v) => `${Number(v).toFixed(2)} MAD`;

export default function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [showStockModal, setShowStockModal] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categorySearch, setCategorySearch] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '', category: '', price: '', costPrice: '', sku: '', active: true, image: null });
  const [stockData, setStockData] = useState({ available: 0, reserved: 0, damaged: 0 });

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      setLoading(true); setError(null);
      const [pr, cr] = await Promise.all([productService.getAllProducts(), categoryService.getAllCategories()]);
      setProducts(pr.data.data || []); setCategories(cr.data.data || []);
    } catch (err) { setError(err.response?.data?.message || 'Erreur'); }
    finally { setLoading(false); }
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData(p => ({ ...p, [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value }));
  };

  const handleStockChange = (e) => {
    const { name, value } = e.target;
    setStockData(p => ({ ...p, [name]: Math.max(0, parseInt(value) || 0) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const d = new FormData();
      Object.entries(formData).forEach(([k, v]) => { if (k !== 'image') d.append(k, v); });
      if (formData.image) d.append('image', formData.image);
      if (editingProduct) await productService.updateProduct(editingProduct._id, d);
      else await productService.createProduct(d);
      setShowModal(false);
      setFormData({ name: '', description: '', category: '', price: '', costPrice: '', sku: '', active: true, image: null });
      fetchData();
    } catch (err) { alert(err.response?.data?.message || 'Erreur'); }
  };

  const filteredProducts = selectedCategory === 'all' ? products : products.filter(p => p.category?._id === selectedCategory);
  const filteredCats = categories.filter(c => c.name.toLowerCase().includes(categorySearch.toLowerCase()));

  const Modal = ({ children, onClose }) => (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900">Produits <span className="text-gray-400 font-normal">({products.length})</span></h3>
        <button onClick={() => { setEditingProduct(null); setFormData({ name: '', description: '', category: '', price: '', costPrice: '', sku: '', active: true, image: null }); setShowModal(true); }} className="btn-primary text-sm">
          <Plus className="w-4 h-4" /> Ajouter
        </button>
      </div>

      <div className="flex gap-2">
        <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)} className="input-field w-auto text-sm">
          <option value="all">Toutes les catégories</option>
          {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
        </select>
      </div>

      {loading && <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 text-primary animate-spin" /></div>}
      {error && <div className="bg-red-50 border border-red-100 rounded-xl p-4 text-sm text-red-600">{error}</div>}

      {!loading && !error && filteredProducts.length > 0 && (
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full">
            <thead><tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Produit</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Catégorie</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-400 uppercase">Prix</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-400 uppercase">Stock</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-400 uppercase">Statut</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-400 uppercase">Actions</th>
            </tr></thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProducts.map(p => (
                <tr key={p._id} className="hover:bg-gray-50 transition text-sm">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {p.image && <img src={`http://localhost:5000/uploads/${p.image}`} alt="" className="w-9 h-9 rounded-lg object-cover bg-gray-50" />}
                      <span className="font-medium text-gray-900">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-400">{p.category?.name}</td>
                  <td className="px-4 py-3 text-right font-medium text-gray-900">{formatMAD(p.price)}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${
                      p.stock.available < 10 ? 'bg-warning-50 text-warning' : 'bg-accent-50 text-accent'
                    }`}>
                      <Circle className={`h-1.5 w-1.5 fill-current ${p.stock.available < 10 ? 'text-warning' : 'text-accent'}`} />
                      {p.stock.available}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      p.active ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-400'
                    }`}>{p.active ? 'Actif' : 'Inactif'}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => { setShowStockModal(p._id); setStockData({ available: p.stock.available, reserved: p.stock.reserved, damaged: p.stock.damaged }); }}
                        className="px-3 py-1.5 text-xs font-medium text-accent hover:bg-accent/5 rounded-lg transition">Stock</button>
                      <button onClick={() => { setEditingProduct(p); setFormData({ name: p.name, description: p.description, category: p.category._id, price: p.price, costPrice: p.costPrice, sku: p.sku || '', active: p.active, image: null }); setShowModal(true); }}
                        className="px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/5 rounded-lg transition">Modifier</button>
                      <button onClick={() => setShowDeleteConfirm(p._id)}
                        className="px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50 rounded-lg transition">Suppr.</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && !error && filteredProducts.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4"><Package className="h-8 w-8 text-gray-300" /></div>
          <p className="text-gray-500 mb-4">Aucun produit</p>
          <button onClick={() => setShowModal(true)} className="btn-primary text-sm">Ajouter un produit</button>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">{editingProduct ? 'Modifier' : 'Nouveau produit'}</h3>
              <button onClick={() => setShowModal(false)} className="p-1.5 hover:bg-gray-100 rounded-lg"><X className="h-5 w-5 text-gray-400" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required className="input-field" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Catégorie *</label>
                  <select name="category" value={formData.category} onChange={handleChange} required className="input-field">
                    <option value="">Sélectionner</option>
                    {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                  </select></div>
              </div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} rows="3" className="input-field" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Prix *</label>
                  <input type="number" name="price" value={formData.price} onChange={handleChange} step="0.01" min="0" required className="input-field" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Prix revient</label>
                  <input type="number" name="costPrice" value={formData.costPrice} onChange={handleChange} step="0.01" min="0" className="input-field" /></div>
              </div>
              <button type="button" onClick={() => setShowAdvanced(!showAdvanced)} className="text-sm text-primary font-medium">
                {showAdvanced ? 'Masquer' : 'Afficher'} les champs avancés
              </button>
              {showAdvanced && (
                <div className="space-y-4">
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
                    <input type="text" name="sku" value={formData.sku} onChange={handleChange} className="input-field" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                    <input type="file" name="image" onChange={handleChange} accept="image/*" className="input-field" /></div>
                </div>
              )}
              <div className="flex items-center gap-2">
                <input type="checkbox" id="p-active" name="active" checked={formData.active} onChange={handleChange} className="h-4 w-4 rounded border-gray-300 text-primary" />
                <label htmlFor="p-active" className="text-sm text-gray-700">Actif</label>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 btn-secondary">Annuler</button>
                <button type="submit" className="flex-1 btn-primary">{editingProduct ? 'Mettre à jour' : 'Créer'}</button>
              </div>
            </form>
          </div>
        </Modal>
      )}

      {/* Stock Modal */}
      {showStockModal && (
        <Modal onClose={() => setShowStockModal(null)}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Stock</h3>
              <button onClick={() => setShowStockModal(null)} className="p-1.5 hover:bg-gray-100 rounded-lg"><X className="h-5 w-5 text-gray-400" /></button>
            </div>
            <div className="space-y-4">
              {[
                { key: 'available', label: 'Disponible' },
                { key: 'reserved', label: 'Réservé' },
                { key: 'damaged', label: 'Endommagé' },
              ].map(f => (
                <div key={f.key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
                  <input type="number" name={f.key} value={stockData[f.key]} onChange={handleStockChange} min="0" className="input-field" />
                </div>
              ))}
              <div className="bg-gray-50 rounded-xl p-3 text-sm"><span className="font-semibold">Total:</span> {stockData.available + stockData.reserved + stockData.damaged}</div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowStockModal(null)} className="flex-1 btn-secondary">Annuler</button>
                <button onClick={() => { productService.updateStock(showStockModal, stockData); setShowStockModal(null); fetchData(); }} className="flex-1 bg-accent text-white rounded-xl py-2.5 font-medium hover:bg-accent/90 transition">Enregistrer</button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Delete Confirm */}
      {showDeleteConfirm && (
        <Modal onClose={() => setShowDeleteConfirm(null)}>
          <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center"><AlertCircle className="h-6 w-6 text-red-500" /></div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Confirmer</h3>
                <p className="text-sm text-gray-400">Cette action est irréversible.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowDeleteConfirm(null)} className="flex-1 btn-secondary">Annuler</button>
              <button onClick={() => { productService.deleteProduct(showDeleteConfirm); setProducts(p => p.filter(x => x._id !== showDeleteConfirm)); setShowDeleteConfirm(null); }} className="flex-1 bg-red-500 text-white rounded-xl py-2.5 font-medium hover:bg-red-600 transition">Supprimer</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
