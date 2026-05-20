import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Package, ShoppingBag, User, ArrowRight, ShoppingCart, Clock, Loader2, Eye, ChevronDown, ChevronUp } from 'lucide-react';
import orderService from '../services/orderService';

const statusStyles = {
  pending: 'bg-warning-50 text-warning',
  confirmed: 'bg-primary-50 text-primary',
  invoiced: 'bg-accent-50 text-accent',
  completed: 'bg-accent-50 text-accent',
  cancelled: 'bg-red-50 text-red-500'
};

const statusLabels = {
  pending: 'En attente',
  confirmed: 'Confirmée',
  invoiced: 'Facturée',
  completed: 'Terminée',
  cancelled: 'Annulée'
};

const formatMAD = (v) => Number(v).toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' MAD';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    if (user?.role === 'admin') navigate('/admin', { replace: true });
    else if (user?.role === 'delivery') navigate('/delivery', { replace: true });
  }, [user, navigate]);

  useEffect(() => {
    if (user?.role === 'client') {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      const res = await orderService.getOrders();
      setOrders(res.data.data || []);
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setLoadingOrders(false);
    }
  };

  const getOrderCountByStatus = (status) => orders.filter(o => o.status === status).length;

  return (
    <div className="min-h-screen bg-gray-50">

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {user?.role === 'client' && (
          <div className="space-y-8">
            {/* Welcome card */}
            <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-8 text-white">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Bienvenue, {user?.name}!</h2>
                  <p className="text-primary-50 mt-1 text-sm">Gérez vos commandes et découvrez nos produits.</p>
                </div>
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <User className="h-8 w-8" />
                </div>
              </div>
              <div className="mt-6 flex gap-3">
                <a href="/products" className="inline-flex items-center gap-2 bg-white text-primary font-semibold px-5 py-2.5 rounded-xl hover:bg-primary-50 transition-colors text-sm">
                  Voir les produits <ArrowRight className="h-4 w-4" />
                </a>
                <a href="/cart" className="inline-flex items-center gap-2 bg-white/10 text-white font-medium px-5 py-2.5 rounded-xl hover:bg-white/20 transition-colors text-sm border border-white/10">
                  Mon panier
                </a>
              </div>
            </div>

            {/* Order stats */}
            {!loadingOrders && orders.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: 'En attente', count: getOrderCountByStatus('pending'), color: 'text-warning bg-warning-50' },
                  { label: 'Confirmées', count: getOrderCountByStatus('confirmed'), color: 'text-primary bg-primary-50' },
                  { label: 'Facturées', count: getOrderCountByStatus('invoiced'), color: 'text-accent bg-accent-50' },
                  { label: 'Terminées', count: getOrderCountByStatus('completed'), color: 'text-accent bg-accent-50' },
                ].map((s, i) => (
                  <div key={i} className={`${s.color} rounded-xl px-4 py-3 text-center`}>
                    <p className="text-2xl font-bold">{s.count}</p>
                    <p className="text-xs font-medium opacity-80">{s.label}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Orders list */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Mes commandes</h3>
                <Link to="/products" className="text-sm text-primary hover:text-primary-dark font-medium">
                  + Nouvelle commande
                </Link>
              </div>

              {loadingOrders ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              ) : orders.length === 0 ? (
                <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
                  <ShoppingCart className="h-10 w-10 text-gray-200 mx-auto mb-3" />
                  <p className="text-gray-400 font-medium">Aucune commande</p>
                  <p className="text-gray-300 text-sm mt-1">Passez votre première commande dès maintenant.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {orders.map(order => (
                    <div key={order._id} className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:border-gray-200 transition-all card-hover">
                      <div className="p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-xs font-semibold text-gray-400 uppercase">
                                Commande #{order._id.toString().slice(-8).toUpperCase()}
                              </span>
                              <span className={`inline-flex items-center text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${statusStyles[order.status]}`}>
                                {statusLabels[order.status]}
                              </span>
                            </div>
                            <div className="mt-1.5 flex items-center gap-3 text-sm text-gray-500">
                              <span className="flex items-center gap-1">
                                <Clock className="h-3.5 w-3.5" />
                                {new Date(order.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                              </span>
                              <span>•</span>
                              <span>{order.items?.length || 0} article{(order.items?.length || 0) > 1 ? 's' : ''}</span>
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="text-base font-bold text-gray-900">{formatMAD(order.total)}</p>
                            <button
                              onClick={() => setExpandedOrder(expandedOrder === order._id ? null : order._id)}
                              className="mt-1 inline-flex items-center gap-1 text-xs text-primary hover:text-primary-dark font-medium"
                            >
                              {expandedOrder === order._id ? 'Masquer' : 'Détails'}
                              {expandedOrder === order._id ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                            </button>
                          </div>
                        </div>

                        {/* Status timeline */}
                        <div className="mt-4 flex items-center gap-1.5">
                          {['pending', 'confirmed', 'invoiced', 'completed'].map((step, i) => {
                            const stepIndex = ['pending', 'confirmed', 'invoiced', 'completed'].indexOf(order.status);
                            const isActive = i <= stepIndex && order.status !== 'cancelled';
                            const isCancelled = order.status === 'cancelled';
                            return (
                              <React.Fragment key={step}>
                                {i > 0 && (
                                  <div className={`flex-1 h-0.5 rounded ${isActive && !isCancelled ? 'bg-primary' : 'bg-gray-100'}`} />
                                )}
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                                  isCancelled && i === 0 ? 'bg-red-100 text-red-500' :
                                  isActive ? 'bg-primary text-white' : 'bg-gray-100 text-gray-300'
                                }`}>
                                  {isCancelled && i === 0 ? '✕' : isActive ? '✓' : i + 1}
                                </div>
                              </React.Fragment>
                            );
                          })}
                          <span className="text-[11px] text-gray-400 ml-1.5">
                            {statusLabels[order.status]}
                          </span>
                        </div>
                      </div>

                      {/* Expanded details */}
                      {expandedOrder === order._id && (
                        <div className="border-t border-gray-50 px-4 py-3 bg-gray-50/50">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="text-xs text-gray-400 uppercase">
                                <th className="text-left pb-2 font-medium">Article</th>
                                <th className="text-center pb-2 font-medium">Qté</th>
                                <th className="text-right pb-2 font-medium">Prix</th>
                                <th className="text-right pb-2 font-medium">Total</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                              {order.items.map((item, i) => (
                                <tr key={i}>
                                  <td className="py-2 text-gray-900 font-medium">{item.name}</td>
                                  <td className="py-2 text-center text-gray-500">{item.quantity}</td>
                                  <td className="py-2 text-right text-gray-500">{formatMAD(item.price)}</td>
                                  <td className="py-2 text-right font-semibold text-gray-900">{formatMAD(item.price * item.quantity)}</td>
                                </tr>
                              ))}
                            </tbody>
                            <tfoot>
                              <tr className="border-t border-gray-100">
                                <td colSpan="3" className="pt-3 text-right font-bold text-gray-900">Total</td>
                                <td className="pt-3 text-right font-bold text-primary">{formatMAD(order.total)}</td>
                              </tr>
                            </tfoot>
                          </table>
                          <div className="mt-2 text-xs text-gray-400">
                            Paiement: {order.paymentMethod}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
