import React, { useState, useEffect } from 'react';
import { Grid3X3, Package, Loader2 } from 'lucide-react';
import categoryService from '../services/categoryService';
import productService from '../services/productService';
import CategoryCard from '../components/CategoryCard';

const formatMAD = (value = 0) => `${Number(value).toFixed(2)} MAD`;

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [categoryStats, setCategoryStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [categoriesRes, productsRes] = await Promise.all([
        categoryService.getAllCategories(true),
        productService.getAllProducts(null, true)
      ]);

      const categoriesData = categoriesRes.data.data || [];
      const productsData = productsRes.data.data || [];

      setCategories(categoriesData);

      const stats = {};
      categoriesData.forEach(category => {
        const categoryProducts = productsData.filter(product => product.category && product.category._id === category._id);
        stats[category._id] = {
          productCount: categoryProducts.length,
          totalValue: categoryProducts.reduce((sum, product) => sum + (product.price * product.stock.available), 0),
          availableProducts: categoryProducts.filter(product => product.stock.available > 0).length
        };
      });
      setCategoryStats(stats);

    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load categories');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 text-primary animate-spin mx-auto mb-3" />
          <p className="text-gray-500 text-sm">Chargement des catégories...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <Grid3X3 className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Erreur</h2>
          <p className="text-gray-500 mb-4">{error}</p>
          <button onClick={fetchData} className="btn-primary">
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  const totalProducts = Object.values(categoryStats).reduce((sum, stats) => sum + stats.productCount, 0);
  const totalValue = Object.values(categoryStats).reduce((sum, stats) => sum + stats.totalValue, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Catégories de produits</h1>
            <p className="text-gray-500 mt-1">Explorez nos catégories de produits organisées</p>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {categories.length === 0 ? (
          <div className="text-center py-16">
            <Grid3X3 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">Aucune catégorie trouvée</h3>
            <p className="text-gray-500">Les catégories seront bientôt disponibles</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map(category => {
              const stats = categoryStats[category._id] || { productCount: 0, totalValue: 0, availableProducts: 0 };
              return (
                <CategoryCard
                  key={category._id}
                  category={category}
                  stats={stats}
                />
              );
            })}
          </div>
        )}

        {/* Summary Stats */}
        {categories.length > 0 && (
          <div className="mt-12 bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Aperçu des catégories</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center bg-primary-50 rounded-xl p-4">
                <div className="text-2xl font-bold text-primary">{categories.length}</div>
                <div className="text-sm text-gray-500">Catégories totales</div>
              </div>
              <div className="text-center bg-accent/5 rounded-xl p-4">
                <div className="text-2xl font-bold text-accent">{totalProducts}</div>
                <div className="text-sm text-gray-500">Produits totaux</div>
              </div>
              <div className="text-center bg-warning/5 rounded-xl p-4">
                <div className="text-2xl font-bold text-warning">{formatMAD(totalValue)}</div>
                <div className="text-sm text-gray-500">Valeur totale du stock</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
