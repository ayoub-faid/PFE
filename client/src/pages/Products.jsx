import React, { useState, useEffect } from 'react';
import { Package, Filter, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';
import productService from '../services/productService';
import categoryService from '../services/categoryService';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const { addToCart, getCartItemCount } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Read category from URL parameters
    const categoryParam = searchParams.get('category');
    if (categoryParam && categoryParam !== selectedCategory) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [productsRes, categoriesRes] = await Promise.all([
        productService.getAllProducts(null, true), // Only active products
        categoryService.getAllCategories(true) // Only active categories
      ]);
      setProducts(productsRes.data.data || []);
      setCategories(categoriesRes.data.data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load products');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(product => {
    const productCategoryId = product?.category?._id || product?.category;
    const matchesCategory = selectedCategory === 'all' || productCategoryId === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (product.sku || '').toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (product) => {
    addToCart(product, 1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-300">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Package className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Error Loading Products</h2>
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
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white">Our Products</h1>
              <p className="text-gray-300 mt-1">Discover our wide range of quality products</p>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent w-full sm:w-64 bg-gray-800 text-white placeholder-gray-400"
                />
              </div>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-700 text-gray-300 hover:text-white"
              >
                <Filter className="h-5 w-5" />
                Filters
              </button>
          </div>

          {/* Category Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-700">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchParams({});
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    selectedCategory === 'all'
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  All Categories
                </button>
                {categories.map(category => (
                  <button
                    key={category._id}
                    onClick={() => {
                      setSelectedCategory(category._id);
                      setSearchParams({ category: category._id });
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-medium ${
                      selectedCategory === category._id
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-white mb-2">No products found</h3>
            <p className="text-gray-300">
              {searchTerm || selectedCategory !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Products will be available soon'
              }
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-gray-300">
                Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
                {selectedCategory !== 'all' && ` in ${categories.find(c => c._id === selectedCategory)?.name}`}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product._id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  cartItemCount={getCartItemCount(product._id)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}