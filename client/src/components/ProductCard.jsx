import React from 'react';
import { ShoppingCart, Eye, Star, Package } from 'lucide-react';
import { Link } from 'react-router-dom';

const getImageUrl = (image) => {
  if (!image) return null;
  if (image.startsWith('http://') || image.startsWith('https://')) return image;
  if (image.startsWith('/')) return `http://localhost:5000${image}`;
  return `http://localhost:5000/uploads/${image}`;
};

const formatMAD = (value = 0) =>
  Number(value).toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' MAD';

export default function ProductCard({ product, onAddToCart, cartItemCount = 0 }) {
  const isOutOfStock = product.stock.available === 0;

  return (
    <div className="group bg-white rounded-xl border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-gray-200 hover:-translate-y-0.5">
      {/* Image container */}
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        {product.image ? (
          <img
            src={getImageUrl(product.image)}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package className="h-16 w-16 text-gray-200" />
          </div>
        )}

        {/* Top badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.stock.available > 0 && product.stock.available < 10 && (
            <span className="bg-accent text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm">
              Stock limité
            </span>
          )}
          {product.costPrice && product.costPrice > 0 && (
            <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm">
              -{Math.round((1 - product.costPrice / product.price) * 100)}%
            </span>
          )}
        </div>

        {/* Quick actions overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300">
          <div className="absolute bottom-3 right-3 flex gap-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <Link
              to={`/products/${product._id}`}
              className="w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <Eye className="h-4 w-4 text-gray-600" />
            </Link>
            <button
              onClick={() => onAddToCart(product)}
              disabled={isOutOfStock}
              className="w-9 h-9 bg-primary text-white rounded-full shadow-md flex items-center justify-center hover:bg-primary-dark transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <ShoppingCart className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Out of stock overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
            <span className="bg-gray-900 text-white text-xs font-bold px-4 py-1.5 rounded-full">
              Rupture de stock
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category tag */}
        <div className="mb-2">
          <span className="text-[10px] font-semibold text-primary bg-primary/5 px-2 py-0.5 rounded-full uppercase tracking-wider">
            {product.category?.name || 'Non catégorisé'}
          </span>
        </div>

        {/* Product name */}
        <Link to={`/products/${product._id}`}>
          <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-1.5 hover:text-primary transition-colors leading-snug">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-2.5">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-3 w-3 text-accent fill-accent" />
            ))}
          </div>
          <span className="text-[11px] text-gray-400">(4.5)</span>
        </div>

        {/* Stock progress bar */}
        {!isOutOfStock && (
          <div className="mb-3">
            <div className="flex items-center justify-between text-[11px] text-gray-400 mb-1">
              <span>{product.stock.available} unités</span>
              <span className="text-accent">
                {product.stock.available > 50 ? 'Bien approvisionné' : product.stock.available > 10 ? 'Stock correct' : 'Bientôt épuisé'}
              </span>
            </div>
            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  product.stock.available > 50
                    ? 'bg-accent'
                    : product.stock.available > 10
                    ? 'bg-accent'
                    : 'bg-red-400'
                }`}
                style={{ width: `${Math.min((product.stock.available / 100) * 100, 100)}%` }}
              />
            </div>
          </div>
        )}

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-lg font-bold text-gray-900">
            {formatMAD(product.price)}
          </span>
          {product.costPrice && (
            <span className="text-sm text-gray-400 line-through">
              {formatMAD(product.costPrice)}
            </span>
          )}
        </div>

        {/* Add to cart button */}
        <button
          onClick={() => onAddToCart(product)}
          disabled={isOutOfStock}
          className={`w-full py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200 ${
            isOutOfStock
              ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
              : cartItemCount > 0
              ? 'bg-accent/10 text-accent hover:bg-accent/15 border border-accent/20'
              : 'bg-primary text-white hover:bg-primary-dark shadow-sm hover:shadow-md active:scale-[0.98]'
          }`}
        >
          <ShoppingCart className="h-4 w-4" />
          {isOutOfStock
            ? 'Indisponible'
            : cartItemCount > 0
            ? `${cartItemCount} dans le panier`
            : 'Ajouter au panier'}
        </button>
      </div>
    </div>
  );
}
