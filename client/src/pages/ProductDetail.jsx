import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Package, Truck, Shield, Star, Plus, Minus, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import productService from '../services/productService';
import categoryService from '../services/categoryService';

const getImageUrl = (image) => {
  if (!image) return null;
  if (image.startsWith('http://') || image.startsWith('https://')) return image;
  if (image.startsWith('/')) return `http://localhost:5000${image}`;
  return `http://localhost:5000/uploads/${image}`;
};

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, getCartItemCount } = useCart();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch product details
      const productRes = await productService.getProductById(id);
      const productData = productRes.data.data;
      setProduct(productData);

      // Fetch related products from same category
      if (productData.category) {
        const relatedRes = await productService.getAllProducts(productData.category._id, true);
        const filtered = relatedRes.data.data.filter(p => p._id !== id).slice(0, 4);
        setRelatedProducts(filtered);
      }

    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load product');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product.stock.available) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Package className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Product Not Found</h1>
          <p className="text-gray-400 mb-6">{error || 'The product you\'re looking for doesn\'t exist.'}</p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const cartItemCount = getCartItemCount(product._id);
  const isInCart = cartItemCount > 0;

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Breadcrumb */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-400">
            <Link to="/" className="hover:text-red-400">Home</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-red-400">Products</Link>
            <span>/</span>
            <Link to={`/products?category=${product.category._id}`} className="hover:text-red-400">
              {product.category.name}
            </Link>
            <span>/</span>
            <span className="text-white font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              {product.image ? (
                <img
                  src={getImageUrl(product.image)}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Package className="h-24 w-24 text-gray-400" />
                </div>
              )}
            </div>

            {/* Thumbnail images would go here if you have multiple images */}
            <div className="flex gap-2">
              {/* For now, just show the main image thumbnail */}
              <button
                onClick={() => setSelectedImage(0)}
                className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                  selectedImage === 0 ? 'border-blue-500' : 'border-gray-200'
                }`}
              >
                {product.image ? (
                  <img
                    src={getImageUrl(product.image)}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <Package className="h-8 w-8 text-gray-400" />
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                  {product.category.name}
                </span>
                {product.active ? (
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                    Active
                  </span>
                ) : (
                  <span className="px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full">
                    Inactive
                  </span>
                )}
              </div>

              <h1 className="text-3xl font-bold text-white mb-4">{product.name}</h1>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-white">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.costPrice && (
                    <span className="text-lg text-gray-400 line-through">
                      ${product.costPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                  <span className="text-sm text-gray-600 ml-1">(4.5)</span>
                </div>
              </div>

              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                {product.description}
              </p>
            </div>

            {/* Stock Information */}
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium text-white">Stock Status</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  product.stock.available > 0
                    ? 'bg-green-900/20 text-green-400 border border-green-800'
                    : 'bg-red-900/20 text-red-400 border border-red-800'
                }`}>
                  {product.stock.available > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Available:</span>
                  <span className="font-medium text-white ml-1">{product.stock.available}</span>
                </div>
                <div>
                  <span className="text-gray-400">Reserved:</span>
                  <span className="font-medium text-white ml-1">{product.stock.reserved}</span>
                </div>
                <div>
                  <span className="text-gray-400">Damaged:</span>
                  <span className="font-medium text-white ml-1">{product.stock.damaged}</span>
                </div>
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            {product.stock.available > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="font-medium text-white">Quantity:</span>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      className="p-3 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-4 py-3 text-center min-w-[3rem]">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      className="p-3 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={quantity >= product.stock.available}
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <span className="text-sm text-gray-600">
                    Max: {product.stock.available}
                  </span>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    {isInCart ? `Add More (${cartItemCount} in cart)` : 'Add to Cart'}
                  </button>

                  <button
                    onClick={handleBuyNow}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
                  >
                    Buy Now
                  </button>

                  <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={`p-3 rounded-lg border transition-colors ${
                      isWishlisted
                        ? 'bg-red-50 border-red-200 text-red-600'
                        : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>
            )}

            {/* Product Details */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-white mb-4">Product Details</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">SKU:</span>
                  <span className="font-medium text-gray-900 ml-1">{product.sku}</span>
                </div>
                <div>
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium text-gray-900 ml-1">{product.category.name}</span>
                </div>
                {product.costPrice && (
                  <>
                    <div>
                      <span className="text-gray-600">Cost Price:</span>
                      <span className="font-medium text-gray-900 ml-1">${product.costPrice.toFixed(2)}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Profit Margin:</span>
                      <span className="font-medium text-green-600 ml-1">
                        {(((product.price - product.costPrice) / product.costPrice) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Features */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Why Choose This Product?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Truck className="h-5 w-5 text-blue-600" />
                  <span className="text-sm text-gray-600">Fast Delivery</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <span className="text-sm text-gray-600">Quality Guarantee</span>
                </div>
                <div className="flex items-center gap-3">
                  <Package className="h-5 w-5 text-blue-600" />
                  <span className="text-sm text-gray-600">Secure Packaging</span>
                </div>
                <div className="flex items-center gap-3">
                  <Star className="h-5 w-5 text-blue-600" />
                  <span className="text-sm text-gray-600">Premium Quality</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 border-t pt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(relatedProduct => (
                <Link
                  key={relatedProduct._id}
                  to={`/products/${relatedProduct._id}`}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="aspect-square bg-gray-100">
                    {relatedProduct.image ? (
                      <img
                        src={`http://localhost:5000${relatedProduct.image}`}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="h-12 w-12 text-gray-400" />
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      ${relatedProduct.price.toFixed(2)}
                    </p>
                    <div className="flex items-center gap-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <span className="text-xs text-gray-600 ml-1">(4.2)</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}