import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Package, Truck, Shield, Star, Plus, Minus, Heart, Check, Loader2, Share2, BadgeCheck, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import productService from '../services/productService';

const getImageUrl = (image) => {
  if (!image) return null;
  if (image.startsWith('http://') || image.startsWith('https://')) return image;
  if (image.startsWith('/')) return `http://localhost:5000${image}`;
  return `http://localhost:5000/uploads/${image}`;
};

const formatMAD = (value = 0) =>
  Number(value).toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' MAD';

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
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => { fetchProduct(); }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError(null);
      const productRes = await productService.getProductById(id);
      const productData = productRes.data.data;
      setProduct(productData);
      if (productData.category) {
        const relatedRes = await productService.getAllProducts(productData.category._id, true);
        setRelatedProducts(relatedRes.data.data.filter(p => p._id !== id).slice(0, 4));
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = (change) => {
    const n = quantity + change;
    if (n >= 1 && n <= product.stock.available) setQuantity(n);
  };

  const handleAddToCart = () => addToCart(product, quantity);
  const handleBuyNow = () => { addToCart(product, quantity); navigate('/cart'); };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 text-primary animate-spin mx-auto mb-3" />
          <p className="text-gray-400 text-sm">Chargement...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <Package className="h-16 w-16 text-gray-200 mx-auto mb-4" />
          <h1 className="text-xl font-bold text-gray-900 mb-2">Produit introuvable</h1>
          <p className="text-gray-400 mb-6">{error || "Ce produit n'existe pas."}</p>
          <Link to="/products" className="btn-primary">
            <ArrowLeft className="h-4 w-4" /> Retour aux produits
          </Link>
        </div>
      </div>
    );
  }

  const cartItemCount = getCartItemCount(product._id);
  const isInCart = cartItemCount > 0;
  const images = product.image ? [product.image, product.image, product.image] : [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1.5 text-sm text-gray-400">
            <Link to="/" className="hover:text-primary">Accueil</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link to="/products" className="hover:text-primary">Produits</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link to={`/products?category=${product.category._id}`} className="hover:text-primary">{product.category.name}</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-gray-900 font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* LEFT - Images */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-square bg-white rounded-2xl border border-gray-200 overflow-hidden">
              {product.image ? (
                <img src={getImageUrl(product.image)} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center"><Package className="h-24 w-24 text-gray-200" /></div>
              )}
              {product.stock.available > 0 && product.stock.available < 10 && (
                <div className="absolute top-4 left-4 bg-accent text-white text-xs font-bold px-3 py-1 rounded-lg shadow-sm">
                  Stock limité
                </div>
              )}
              <button className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors">
                <Share2 className="h-4 w-4 text-gray-600" />
              </button>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-2">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === i ? 'border-primary shadow-sm' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img src={getImageUrl(img)} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT - Info */}
          <div className="lg:col-span-6 space-y-6">
            {/* Category & status */}
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="inline-flex items-center gap-1 bg-primary/5 text-primary text-xs font-semibold px-3 py-1 rounded-full">
                <Package className="h-3 w-3" /> {product.category.name}
              </span>
              {product.active ? (
                <span className="inline-flex items-center gap-1 bg-accent/5 text-accent text-xs font-semibold px-3 py-1 rounded-full">
                  <BadgeCheck className="h-3 w-3" /> Actif
                </span>
              ) : (
                <span className="badge badge-danger">Inactif</span>
              )}
              {product.stock.available > 0 ? (
                <span className="inline-flex items-center gap-1 bg-accent/5 text-accent text-xs font-semibold px-3 py-1 rounded-full">
                  <Check className="h-3 w-3" /> En stock
                </span>
              ) : (
                <span className="badge badge-danger">Rupture</span>
              )}
            </div>

            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-5 w-5 ${i < 4 ? 'text-accent fill-accent' : 'text-gray-200'}`} />
                ))}
              </div>
              <span className="text-sm text-gray-500">4.5 (12 avis)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl lg:text-4xl font-bold text-gray-900">{formatMAD(product.price)}</span>
              {product.costPrice && (
                <span className="text-xl text-gray-400 line-through">{formatMAD(product.costPrice)}</span>
              )}
              {product.costPrice && (
                <span className="bg-red-50 text-red-500 text-xs font-bold px-2.5 py-1 rounded-md">
                  -{Math.round((1 - product.costPrice / product.price) * 100)}%
                </span>
              )}
            </div>

            <p className="text-gray-500 leading-relaxed">{product.description}</p>

            {/* Stock details */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center justify-between mb-4">
                <span className="font-semibold text-gray-900">Détails du stock</span>
                <span className={`badge ${product.stock.available > 0 ? 'badge-success' : 'badge-danger'}`}>
                  {product.stock.available > 0 ? 'En stock' : 'Rupture'}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'Disponible', value: product.stock.available, color: 'text-accent' },
                  { label: 'Réservé', value: product.stock.reserved, color: 'text-accent' },
                  { label: 'Endommagé', value: product.stock.damaged, color: 'text-red-500' },
                ].map((s, i) => (
                  <div key={i} className="bg-gray-50 rounded-xl p-4 text-center">
                    <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quantity & CTA */}
            {product.stock.available > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-semibold text-gray-700">Quantité:</span>
                  <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl">
                    <button onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}
                      className="p-2.5 hover:bg-gray-100 disabled:opacity-30 transition rounded-l-xl">
                      <Minus className="h-4 w-4 text-gray-600" />
                    </button>
                    <span className="px-5 py-2.5 text-center min-w-[3rem] font-semibold text-gray-900">{quantity}</span>
                    <button onClick={() => handleQuantityChange(1)} disabled={quantity >= product.stock.available}
                      className="p-2.5 hover:bg-gray-100 disabled:opacity-30 transition rounded-r-xl">
                      <Plus className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                  <span className="text-xs text-gray-400">Max: {product.stock.available}</span>
                </div>

                <div className="flex gap-3">
                  <button onClick={handleAddToCart} className="flex-1 btn-primary py-3.5 text-base">
                    <ShoppingCart className="h-5 w-5" />
                    {isInCart ? `Ajouter plus (${cartItemCount})` : 'Ajouter au panier'}
                  </button>
                  <button onClick={handleBuyNow}
                    className="flex-1 bg-accent hover:bg-accent/90 text-white py-3.5 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm">
                    <Check className="h-5 w-5" /> Acheter
                  </button>
                  <button onClick={() => setIsWishlisted(!isWishlisted)}
                    className={`p-3.5 rounded-xl border transition-all ${
                      isWishlisted ? 'bg-red-50 border-red-200 text-red-500' : 'border-gray-200 text-gray-400 hover:bg-gray-50'
                    }`}>
                    <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>
            )}

            {/* Tabs */}
            <div className="border-t border-gray-200 pt-6">
              <div className="flex gap-6 border-b border-gray-100">
                {['description', 'details', 'livraison'].map(tab => (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === tab ? 'text-primary border-primary' : 'text-gray-400 border-transparent hover:text-gray-600'
                    }`}>
                    {tab === 'description' ? 'Description' : tab === 'details' ? 'Détails' : 'Livraison'}
                  </button>
                ))}
              </div>
              <div className="py-5">
                {activeTab === 'description' && (
                  <p className="text-sm text-gray-500 leading-relaxed">{product.description}</p>
                )}
                {activeTab === 'details' && (
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <span className="text-gray-400 text-xs">SKU</span>
                      <p className="font-medium text-gray-900 mt-0.5">{product.sku}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <span className="text-gray-400 text-xs">Catégorie</span>
                      <p className="font-medium text-gray-900 mt-0.5">{product.category.name}</p>
                    </div>
                    {product.costPrice && (
                      <>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <span className="text-gray-400 text-xs">Prix de revient</span>
                          <p className="font-medium text-gray-900 mt-0.5">{formatMAD(product.costPrice)}</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <span className="text-gray-400 text-xs">Marge</span>
                          <p className="font-medium text-accent mt-0.5">
                            {(((product.price - product.costPrice) / product.costPrice) * 100).toFixed(1)}%
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                )}
                {activeTab === 'livraison' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { icon: Truck, title: 'Livraison rapide', desc: 'Sous 24-48h partout au Maroc' },
                      { icon: Shield, title: 'Qualité garantie', desc: 'Produits contrôlés et certifiés' },
                      { icon: Package, title: 'Emballage pro', desc: 'Conditionnement adapté au transport' },
                      { icon: Star, title: 'Service client', desc: 'Support dédié 6j/7' },
                    ].map((f, i) => (
                      <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-xl p-3.5">
                        <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center shrink-0">
                          <f.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{f.title}</p>
                          <p className="text-xs text-gray-400">{f.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 border-t border-gray-200 pt-10">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Produits similaires</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
              {relatedProducts.map(rp => (
                <Link key={rp._id} to={`/products/${rp._id}`} className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-all hover:-translate-y-0.5">
                  <div className="aspect-square bg-gray-50">
                    {rp.image ? (
                      <img src={`http://localhost:5000${rp.image}`} alt={rp.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center"><Package className="h-10 w-10 text-gray-200" /></div>
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="text-xs font-semibold text-gray-900 line-clamp-2 mb-1.5">{rp.name}</h3>
                    <p className="text-sm font-bold text-gray-900">{formatMAD(rp.price)}</p>
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
