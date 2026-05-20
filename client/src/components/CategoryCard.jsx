import React from 'react';
import { Link } from 'react-router-dom';
import { Package, ArrowRight, ShoppingBag } from 'lucide-react';

const getImageUrl = (image) => {
  if (!image) return null;
  if (typeof image !== 'string') return null;
  if (image.startsWith('http://') || image.startsWith('https://')) return image;
  if (image.startsWith('/')) return `http://localhost:5000${image}`;
  return `http://localhost:5000/uploads/${encodeURIComponent(image)}`;
};

const formatMAD = (value = 0) =>
  Number(value).toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' MAD';

export default function CategoryCard({ category, stats = {} }) {
  const { productCount = 0, totalValue = 0, availableProducts = 0 } = stats;
  const imageSource = category.imageUrl || getImageUrl(category.image);

  return (
    <Link
      to={`/products?category=${category._id}`}
      className="group block bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-gray-200 hover:-translate-y-1"
    >
      {/* Image section with gradient overlay */}
      <div className="relative h-52 overflow-hidden">
        {imageSource ? (
          <>
            <img
              src={imageSource}
              alt={category.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10">
            <Package className="h-16 w-16 text-primary/30" />
          </div>
        )}

        {/* Category name on image */}
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-bold text-white drop-shadow-sm">
            {category.name}
          </h3>
          {category.description && (
            <p className="text-sm text-white/80 mt-1 line-clamp-1 drop-shadow-sm">
              {category.description}
            </p>
          )}
        </div>

        {/* Hover arrow */}
        <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
          <ArrowRight className="h-5 w-5 text-primary" />
        </div>
      </div>

      {/* Stats section */}
      <div className="p-5">
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-primary mb-0.5">
              <ShoppingBag className="h-3.5 w-3.5" />
              <span className="text-lg font-bold text-gray-900">{productCount}</span>
            </div>
            <p className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">Produits</p>
          </div>
          <div className="text-center border-x border-gray-100">
            <div className="text-lg font-bold text-accent mb-0.5">{availableProducts}</div>
            <p className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">Disponibles</p>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-gray-900 mb-0.5">
              {formatMAD(totalValue).split(' ')[0]}
            </div>
            <p className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">Valeur</p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all">
            Consulter les produits
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </div>
        </div>
      </div>
    </Link>
  );
}
