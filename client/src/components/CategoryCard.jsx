import React from 'react';
import { Link } from 'react-router-dom';
import { Package, ArrowRight } from 'lucide-react';

const getImageUrl = (image) => {
  if (!image) return null;
  if (image.startsWith('http://') || image.startsWith('https://')) return image;
  if (image.startsWith('/')) return `http://localhost:5000${image}`;
  return `http://localhost:5000/uploads/${image}`;
};

export default function CategoryCard({ category, stats = {} }) {
  const { productCount = 0, totalValue = 0, availableProducts = 0 } = stats;

  return (
    <Link
      to={`/products?category=${category._id}`}
      className="group bg-[#FFF3E0]/95 rounded-2xl shadow-sm border border-[#FFD54F]/20 overflow-hidden hover:shadow-lg hover:border-[#FFC107] transition-all duration-200"
    >
      {/* Category Image */}
      <div className="aspect-video bg-[#FFD54F]/20 relative overflow-hidden">
        {category.image ? (
          <img
            src={getImageUrl(category.image)}
            alt={category.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package className="h-12 w-12 text-[#FFD54F]/60" />
          </div>
        )}

        {/* Overlay with arrow */}
        <div className="absolute inset-0 bg-[#3E2723] bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
          <ArrowRight className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        </div>
      </div>

      {/* Category Info */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-[#3E2723] mb-2 group-hover:text-[#FFC107] transition-colors">
          {category.name}
        </h3>

        {category.description && (
          <p className="text-[#5A3F31]/85 mb-4 line-clamp-2">
            {category.description}
          </p>
        )}

        {/* Stats */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-[#5A3F31]/80">Produits:</span>
            <span className="font-medium text-[#3E2723]">{productCount}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-[#5A3F31]/80">Disponibles:</span>
            <span className="font-medium text-[#FFC107]">{availableProducts}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-[#5A3F31]/80">Valeur:</span>
            <span className="font-medium text-[#3E2723]">${totalValue.toFixed(2)}</span>
          </div>
        </div>

        {/* Call to action */}
        <div className="mt-4 pt-4 border-t border-[#FFD54F]/20">
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#3E2723] font-medium">
              Consulter les produits
            </span>
            <ArrowRight className="h-4 w-4 text-[#FFC107] group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
}
