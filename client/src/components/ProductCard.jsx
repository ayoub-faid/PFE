import React from 'react';
import { ShoppingCart, Package, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const getImageUrl = (image) => {
  if (!image) return null;
  if (image.startsWith('http://') || image.startsWith('https://')) return image;
  if (image.startsWith('/')) return `http://localhost:5000${image}`;
  return `http://localhost:5000/uploads/${image}`;
};

export default function ProductCard({ product, onAddToCart, cartItemCount = 0 }) {
  const isOutOfStock = product.stock.available === 0;

  return (
    <div className="bg-[#FFF3E0]/95 rounded-2xl shadow-sm border border-[#FFD54F]/20 overflow-hidden hover:shadow-lg transition-shadow">
      {/* Product Image */}
      <div className="aspect-square bg-[#FFD54F]/20 relative">
        {product.image ? (
          <img
            src={getImageUrl(product.image)}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package className="h-12 w-12 text-[#FFD54F]/60" />
          </div>
        )}

        {/* Stock Status Badge */}
        <div className="absolute top-2 right-2">
          {!isOutOfStock ? (
            <span className="bg-[#FFC107] text-[#3E2723] text-xs px-2 py-1 rounded-full font-semibold">
              En stock
            </span>
          ) : (
            <span className="bg-[#FFD54F]/60 text-[#3E2723] text-xs px-2 py-1 rounded-full font-semibold">
              Rupture
            </span>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="mb-2">
          <span className="text-xs text-[#3E2723] bg-[#FFD54F]/20 px-2 py-1 rounded-full font-semibold">
            {product.category?.name || 'Uncategorized'}
          </span>
        </div>

        <h3 className="font-semibold text-[#3E2723] mb-1 line-clamp-2">
          {product.name}
        </h3>

        <p className="text-sm text-[#5A3F31]/85 mb-2 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-[#FFC107]">
              ${product.price.toFixed(2)}
            </span>
            {product.costPrice && (
              <span className="text-sm text-[#5A3F31]/60 line-through">
                ${product.costPrice.toFixed(2)}
              </span>
            )}
          </div>

          <span className="text-sm text-[#5A3F31]/70">
            SKU: {product.sku}
          </span>
        </div>

        {/* Stock Info */}
        <div className="text-sm text-[#5A3F31]/80 mb-4">
          Disponible: {product.stock.available} unités
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Link
            to={`/products/${product._id}`}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-[#FFD54F]/30 text-[#3E2723] rounded-lg hover:bg-[#FFF3E0] hover:border-[#FFC107] transition-colors font-medium"
          >
            <Eye className="h-4 w-4" />
            Détails
          </Link>

          <button
            onClick={() => onAddToCart(product)}
            disabled={isOutOfStock}
            className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-colors font-medium ${
              !isOutOfStock
                ? 'bg-[#FFD54F] hover:bg-[#FFC107] text-[#3E2723]'
                : 'bg-[#FFD54F]/40 text-[#3E2723]/50 cursor-not-allowed'
            }`}
          >
            <ShoppingCart className="h-4 w-4" />
            {cartItemCount > 0 ? 'Ajouter plus' : 'Ajouter au panier'}
          </button>
        </div>
      </div>
    </div>
  );
}
