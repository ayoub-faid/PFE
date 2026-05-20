import React from 'react';
import { ShoppingCart, Plus, Minus, Trash2, ArrowLeft, CreditCard, Package, BadgeCheck, Truck, Shield, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const PAYMENT_METHOD = 'Paiement à la livraison';
const WHATSAPP_NUMBER = '+212696630684';
const WHATSAPP_LINK = 'https://wa.me/212696630684';

const getImageUrl = (image) => {
  if (!image) return null;
  if (typeof image !== 'string') return null;
  if (image.startsWith('http://') || image.startsWith('https://')) return image;
  if (image.startsWith('/')) return `http://localhost:5000${image}`;
  return `http://localhost:5000/uploads/${encodeURIComponent(image)}`;
};

const formatMAD = (v) => Number(v).toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' MAD';

export default function Cart() {
  const { cartItems, totalItems, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart();

  const handleCheckout = () => {
    const lines = cartItems.map((item, i) =>
      `${i + 1}. ${item.name} x${item.quantity} = ${(item.price * item.quantity).toFixed(2)} MAD`
    );
    const msg = [
      'Bonjour, je souhaite passer une commande:',
      '', ...lines, '',
      `Total articles: ${totalItems}`,
      `Montant total: ${(totalPrice * 1.1).toFixed(2)} MAD`,
      `Mode de paiement: ${PAYMENT_METHOD}`
    ].join('\n');
    window.open(`${WHATSAPP_LINK}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center max-w-sm">
          <div className="w-24 h-24 bg-gray-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <ShoppingCart className="h-12 w-12 text-gray-200" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Votre panier est vide</h1>
          <p className="text-gray-400 mb-8">Ajoutez des produits pour commencer !</p>
          <Link to="/products" className="btn-primary px-8 py-3">
            <Package className="h-5 w-5" /> Découvrir nos produits
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/products" className="text-gray-400 hover:text-gray-600 transition-colors">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Panier d'achat</h1>
              <span className="text-sm text-gray-400 bg-gray-50 px-3 py-1 rounded-full">{totalItems} articles</span>
            </div>
            <button onClick={() => { if (window.confirm('Vider le panier ?')) clearCart(); }}
              className="text-sm text-red-500 hover:text-red-600 font-medium transition-colors">
              <Trash2 className="h-4 w-4 inline mr-1" /> Vider
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map(item => (
              <div key={item._id} className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5">
                <div className="flex gap-4">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-50 rounded-xl flex-shrink-0 overflow-hidden">
                    {item.image ? (
                      <img src={getImageUrl(item.image)} alt={item.name} className="w-full h-full object-cover"
                        onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center"><Package className="h-8 w-8 text-gray-200" /></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <Link to={`/products/${item._id}`} className="text-sm font-semibold text-gray-900 hover:text-primary line-clamp-2 leading-snug">
                          {item.name}
                        </Link>
                        <p className="text-xs text-gray-400 mt-1">SKU: {item.sku}</p>
                        <p className="text-xs text-gray-400">Catégorie: {item.category?.name}</p>
                      </div>
                      <button onClick={() => removeFromCart(item._id)} className="p-1.5 text-gray-300 hover:text-red-500 transition-colors shrink-0">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-gray-200 rounded-lg">
                        <button onClick={() => updateQuantity(item._id, item.quantity - 1)}
                          className="p-1.5 hover:bg-gray-50 transition rounded-l-lg">
                          <Minus className="h-3.5 w-3.5 text-gray-500" />
                        </button>
                        <span className="px-4 py-1.5 text-sm font-semibold min-w-[2.5rem] text-center text-gray-900">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          disabled={item.quantity >= item.stock.available}
                          className="p-1.5 hover:bg-gray-50 disabled:opacity-30 transition rounded-r-lg">
                          <Plus className="h-3.5 w-3.5 text-gray-500" />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="text-base font-bold text-gray-900">{formatMAD(item.price * item.quantity)}</p>
                        <p className="text-[11px] text-gray-400">{formatMAD(item.price)} / unité</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-20">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Résumé</h2>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Sous-total ({totalItems} articles)</span>
                  <span className="font-semibold text-gray-900">{formatMAD(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Livraison</span>
                  <span className="font-semibold text-accent">Gratuite</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Taxe (10%)</span>
                  <span className="font-semibold text-gray-900">{formatMAD(totalPrice * 0.1)}</span>
                </div>
                <div className="border-t border-gray-100 pt-3 mt-3">
                  <div className="flex justify-between">
                    <span className="text-base font-bold text-gray-900">Total</span>
                    <span className="text-xl font-bold text-gray-900">{formatMAD(totalPrice * 1.1)}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 bg-primary/5 rounded-xl p-3.5 text-sm">
                <p className="font-medium text-gray-900">Mode de paiement</p>
                <p className="text-gray-500 text-xs mt-0.5">{PAYMENT_METHOD}</p>
                <p className="text-gray-400 text-xs mt-1">
                  WhatsApp:{' '}
                  <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="text-primary hover:underline">{WHATSAPP_NUMBER}</a>
                </p>
              </div>

              <button onClick={handleCheckout} className="w-full mt-5 btn-primary py-3.5 text-base">
                <CreditCard className="h-5 w-5" /> Commander via WhatsApp
              </button>

              <div className="mt-4 space-y-2">
                {[
                  { icon: Truck, text: 'Livraison gratuite' },
                  { icon: Shield, text: 'Paiement sécurisé' },
                  { icon: BadgeCheck, text: 'Qualité garantie' },
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-gray-400">
                    <f.icon className="h-3.5 w-3.5 text-accent" />
                    {f.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
