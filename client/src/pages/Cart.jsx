import React from 'react';
import { ShoppingCart, Plus, Minus, Trash2, ArrowLeft, CreditCard, Package } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const PAYMENT_METHOD = 'Cash on Delivery';
const WHATSAPP_NUMBER = '+212696630684';
const WHATSAPP_LINK = 'https://wa.me/212696630684';

const getImageUrl = (image) => {
  if (!image) return null;
  if (image.startsWith('http://') || image.startsWith('https://')) return image;
  if (image.startsWith('/')) return `http://localhost:5000${image}`;
  return `http://localhost:5000/uploads/${image}`;
};

export default function Cart() {
  const { cartItems, totalItems, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart();

  const handleQuantityChange = (productId, newQuantity) => {
    updateQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId) => {
    if (window.confirm('Are you sure you want to remove this item from your cart?')) {
      removeFromCart(productId);
    }
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your entire cart?')) {
      clearCart();
    }
  };

  const handleCheckout = () => {
    const orderLines = cartItems.map((item, index) => {
      const lineTotal = (item.price * item.quantity).toFixed(2);
      return `${index + 1}. ${item.name} x${item.quantity} = $${lineTotal}`;
    });

    const message = [
      'Hello, I want to place an order:',
      '',
      ...orderLines,
      '',
      `Total items: ${totalItems}`,
      `Total amount: $${(totalPrice * 1.1).toFixed(2)}`,
      `Payment method: ${PAYMENT_METHOD}`
    ].join('\n');

    const whatsappUrl = `${WHATSAPP_LINK}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#FFF3E0] flex items-center justify-center">
        <div className="text-center">
          <ShoppingCart className="h-24 w-24 text-[#FFD54F]/60 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-[#3E2723] mb-4">Votre panier est vide</h1>
          <p className="text-[#5A3F31]/80 mb-8">Ajoutez des produits pour commencer !</p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-[#FFD54F] hover:bg-[#FFC107] text-[#3E2723] px-6 py-3 rounded-lg font-medium transition-colors"
          >
            <Package className="h-5 w-5" />
            Consulter les produits
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF3E0]">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-[#FFD54F]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <Link
                to="/products"
                className="flex items-center gap-2 text-[#5A3F31] hover:text-[#3E2723] text-sm sm:text-base"
              >
                <ArrowLeft className="h-5 w-5" />
                Continuer vos achats
              </Link>
              <div className="hidden sm:block h-6 w-px bg-[#FFD54F]/30"></div>
              <h1 className="text-xl sm:text-2xl font-bold text-[#3E2723]">Panier d'achat</h1>
            </div>

            <button
              onClick={handleClearCart}
              className="text-[#FFC107] hover:text-[#3E2723] text-sm font-medium self-start sm:self-auto"
            >
              Vider le panier
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-[#FFD54F]/20">
              <div className="p-6 border-b border-[#FFD54F]/20">
                <h2 className="text-lg font-semibold text-[#3E2723]">
                  Articles ({totalItems})
                </h2>
              </div>

              <div className="divide-y divide-[#FFD54F]/20">
                {cartItems.map(item => (
                  <div key={item._id} className="p-6">
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="w-20 h-20 bg-[#FFD54F]/20 rounded-lg flex-shrink-0 overflow-hidden">
                        {item.image ? (
                          <img
                            src={getImageUrl(item.image)}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Package className="h-8 w-8 text-[#FFD54F]/60" />
                          </div>
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <div className="min-w-0 flex-1">
                            <Link
                              to={`/products/${item._id}`}
                              className="text-lg font-medium text-[#3E2723] hover:text-[#FFC107] transition-colors block"
                            >
                              <span className="line-clamp-2 leading-tight">
                                {item.name}
                              </span>
                            </Link>
                            <p className="text-sm text-[#5A3F31]/80 mt-1 truncate">
                              Catégorie: {item.category?.name}
                            </p>
                            <p className="text-sm text-[#5A3F31]/80 truncate">
                              SKU: {item.sku}
                            </p>
                          </div>

                          <button
                            onClick={() => handleRemoveItem(item._id)}
                            className="text-[#FFC107] hover:text-[#3E2723] p-1 flex-shrink-0 ml-2"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>

                        {/* Quantity and Price */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-4 gap-3">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                            <div className="flex items-center border border-[#FFD54F]/20 rounded-lg">
                              <button
                                onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                                className="p-2 hover:bg-[#FFF3E0]"
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="px-4 py-2 text-center min-w-[3rem] text-[#3E2723]">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                                disabled={item.quantity >= item.stock.available}
                                className="p-2 hover:bg-[#FFF3E0] disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>

                            <span className="text-sm text-[#5A3F31]/80">
                              Stock: {item.stock.available}
                            </span>
                          </div>

                          <div className="text-right sm:text-right">
                            <div className="text-lg font-semibold text-[#FFC107]">
                              ${(item.price * item.quantity).toFixed(2)}
                            </div>
                            <div className="text-sm text-[#5A3F31]/70">
                              ${item.price.toFixed(2)} chacun
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-[#FFD54F]/20 p-6 sticky top-6">
              <h2 className="text-lg font-semibold text-[#3E2723] mb-6">Résumé de la commande</h2>

              <div className="space-y-4">
                <div className="rounded-lg border border-[#FFD54F]/30 bg-[#FFF8D9] p-4">
                  <p className="text-sm font-medium text-[#3E2723]">
                    Mode de paiement: <span className="text-[#FFC107]">{PAYMENT_METHOD}</span>
                  </p>
                  <p className="mt-2 text-sm text-[#5A3F31]">
                    WhatsApp commande:{' '}
                    <a
                      href={WHATSAPP_LINK}
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium text-[#FFC107] hover:text-[#3E2723]"
                    >
                      {WHATSAPP_NUMBER}
                    </a>
                  </p>
                </div>

                <div className="flex justify-between">
                  <span className="text-[#5A3F31]/80">Articles ({totalItems})</span>
                  <span className="font-medium text-[#3E2723]">${totalPrice.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-[#5A3F31]/80">Livraison</span>
                  <span className="font-medium text-[#3E2723]">Gratuite</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-[#5A3F31]/80">Taxe</span>
                  <span className="font-medium text-[#3E2723]">${(totalPrice * 0.1).toFixed(2)}</span>
                </div>

                <div className="border-t border-[#FFD54F]/20 pt-4">
                  <div className="flex justify-between text-lg font-semibold text-[#3E2723]">
                    <span>Total</span>
                    <span>${(totalPrice * 1.1).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full mt-6 bg-[#FFD54F] hover:bg-[#FFC107] text-[#3E2723] py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <CreditCard className="h-5 w-5" />
                Procéder au paiement
              </button>

              <p className="text-xs text-[#5A3F31]/60 text-center mt-4">
                Paiement sécurisé par chiffrement standard de l'industrie
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}