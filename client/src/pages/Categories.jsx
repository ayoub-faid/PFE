import React, { useState, useEffect } from 'react';
import { Grid3X3, Package } from 'lucide-react';
import categoryService from '../services/categoryService';
import productService from '../services/productService';
import CategoryCard from '../components/CategoryCard';

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

      // Fetch categories and products
      const [categoriesRes, productsRes] = await Promise.all([
        categoryService.getAllCategories(true), // Only active categories
        productService.getAllProducts(null, true) // Only active products
      ]);

      const categoriesData = categoriesRes.data.data || [];
      const productsData = productsRes.data.data || [];

      setCategories(categoriesData);

      // Calculate stats for each category
      const stats = {};
      categoriesData.forEach(category => {
        const categoryProducts = productsData.filter(product => product.category._id === category._id);
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
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-300">Loading categories...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Grid3X3 className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Error Loading Categories</h2>
          <p className="text-gray-300 mb-4">{error}</p>
          <button
            onClick={fetchData}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 shadow-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white">Product Categories</h1>
            <p className="text-gray-300 mt-1">Explore our organized product categories</p>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {categories.length === 0 ? (
          <div className="text-center py-12">
            <Grid3X3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-white mb-2">No categories found</h3>
            <p className="text-gray-300">Categories will be available soon</p>
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
          <div className="mt-12 bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Category Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {categories.length}
                </div>
                <div className="text-sm text-gray-600">Total Categories</div>
              </div>

              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {Object.values(categoryStats).reduce((sum, stats) => sum + stats.productCount, 0)}
                </div>
                <div className="text-sm text-gray-600">Total Products</div>
              </div>

              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  ${Object.values(categoryStats).reduce((sum, stats) => sum + stats.totalValue, 0).toFixed(2)}
                </div>
                <div className="text-sm text-gray-600">Total Inventory Value</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}