import React, { useState, useEffect } from 'react';
import { Package, Search, Eye, Download, Send, CheckCircle, XCircle, Clock, Loader2, ChevronRight, FileText, Filter } from 'lucide-react';
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

export default function OrdersManagement() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [actionLoading, setActionLoading] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await orderService.getOrders(statusFilter || undefined);
      setOrders(res.data.data || []);
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOrders(); }, [statusFilter]);

  const handleConfirm = async (id) => {
    setActionLoading(id);
    try { await orderService.updateStatus(id, 'confirmed'); await fetchOrders(); }
    catch (err) { console.error(err); }
    finally { setActionLoading(null); }
  };

  const handleGenerateInvoice = async (id) => {
    setActionLoading(id);
    try {
      await orderService.generateInvoice(id);
      await fetchOrders();
    } catch (err) { console.error(err); }
    finally { setActionLoading(null); }
  };

  const handleDownloadInvoice = async (id) => {
    try {
      const res = await orderService.downloadInvoice(id);
      const blob = new Blob([res.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `facture-${id.slice(-8).toUpperCase()}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error downloading invoice:', err);
    }
  };

  const handleSendWhatsApp = (order) => {
    const phone = order.phone || order.user?.phone || '';
    const digits = phone.replace(/\D/g, '');
    if (!digits) return alert('Aucun numéro WhatsApp client disponible.');
    const country = digits.startsWith('212') ? '' : '212';
    const full = country + digits.replace(/^0+/, '');
    const msg = [
      `Bonjour ${order.user?.name || 'client'},`,
      '',
      `Votre commande N°${order._id.toString().slice(-8).toUpperCase()} a été traitée.`,
      `Montant total: ${formatMAD(order.total)}`,
      '',
      'Merci de votre confiance !',
      'Gros Products'
    ].join('\n');
    window.open(`https://wa.me/${full}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const filters = [
    { label: 'Toutes', value: '' },
    { label: 'En attente', value: 'pending' },
    { label: 'Confirmée', value: 'confirmed' },
    { label: 'Facturée', value: 'invoiced' },
    { label: 'Terminée', value: 'completed' },
    { label: 'Annulée', value: 'cancelled' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {filters.map(f => (
          <button key={f.value} onClick={() => setStatusFilter(f.value)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              statusFilter === f.value
                ? 'bg-primary text-white'
                : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
            }`}>
            {f.label}
          </button>
        ))}
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-16">
          <Package className="h-12 w-12 text-gray-200 mx-auto mb-4" />
          <p className="text-gray-400 font-medium">Aucune commande</p>
          <p className="text-gray-300 text-sm mt-1">Aucune commande trouvée avec ce filtre.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map(order => (
            <div key={order._id} className="bg-white border border-gray-100 rounded-xl p-4 hover:border-gray-200 transition-all card-hover">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="text-xs font-semibold text-gray-400 uppercase">
                      #{order._id.toString().slice(-8).toUpperCase()}
                    </span>
                    <span className={`inline-flex items-center text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${statusStyles[order.status]}`}>
                      {statusLabels[order.status]}
                    </span>
                  </div>
                  <div className="mt-1.5 flex items-center gap-2 text-sm">
                    <span className="font-semibold text-gray-900">{order.user?.name}</span>
                    <span className="text-gray-300">•</span>
                    <span className="text-gray-400">{order.user?.email}</span>
                  </div>
                  <div className="mt-1 flex items-center gap-3 text-xs text-gray-400">
                    <span>{new Date(order.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    <span className="text-gray-300">•</span>
                    <span>{order.items?.length || 0} article{(order.items?.length || 0) > 1 ? 's' : ''}</span>
                    <span className="text-gray-300">•</span>
                    <span className="font-semibold text-gray-900">{formatMAD(order.total)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  {/* Details toggle */}
                  <button onClick={() => setSelectedOrder(selectedOrder === order._id ? null : order._id)}
                    className="p-2 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                    title="Détails">
                    <Eye className="h-4 w-4" />
                  </button>

                  {/* Confirm */}
                  {order.status === 'pending' && (
                    <button onClick={() => handleConfirm(order._id)} disabled={actionLoading === order._id}
                      className="p-2 text-accent hover:bg-accent/5 rounded-lg transition-colors" title="Confirmer">
                      {actionLoading === order._id ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle className="h-4 w-4" />}
                    </button>
                  )}

                  {/* Generate invoice */}
                  {['confirmed', 'pending'].includes(order.status) && (
                    <button onClick={() => handleGenerateInvoice(order._id)} disabled={actionLoading === order._id}
                      className="p-2 text-primary hover:bg-primary/5 rounded-lg transition-colors" title="Générer facture">
                      {actionLoading === order._id ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileText className="h-4 w-4" />}
                    </button>
                  )}

                  {/* Download invoice */}
                  {order.invoicePath && (
                    <button onClick={() => handleDownloadInvoice(order._id)}
                      className="p-2 text-accent hover:bg-accent/5 rounded-lg transition-colors" title="Télécharger facture">
                      <Download className="h-4 w-4" />
                    </button>
                  )}

                  {/* Send via WhatsApp */}
                  {order.status === 'invoiced' && (
                    <button onClick={() => handleSendWhatsApp(order)}
                      className="p-2 text-primary hover:bg-primary/5 rounded-lg transition-colors" title="Envoyer sur WhatsApp">
                      <Send className="h-4 w-4" />
                    </button>
                  )}

                  {/* Complete */}
                  {order.status === 'invoiced' && (
                    <button onClick={() => handleConfirm(order._id)} disabled={actionLoading === order._id}
                      className="p-2 text-accent hover:bg-accent/5 rounded-lg transition-colors" title="Marquer terminée">
                      {actionLoading === order._id ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle className="h-4 w-4" />}
                    </button>
                  )}

                  {/* Cancel */}
                  {['pending', 'confirmed'].includes(order.status) && (
                    <button onClick={async () => { if (window.confirm('Annuler cette commande ?')) { await orderService.updateStatus(order._id, 'cancelled'); fetchOrders(); } }}
                      className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors" title="Annuler">
                      <XCircle className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Order details */}
              {selectedOrder === order._id && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-xs text-gray-400 uppercase">
                        <th className="text-left pb-2 font-medium">Article</th>
                        <th className="text-center pb-2 font-medium">Qté</th>
                        <th className="text-right pb-2 font-medium">Prix</th>
                        <th className="text-right pb-2 font-medium">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
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

                  <div className="mt-3 text-xs text-gray-400 flex flex-wrap gap-x-4 gap-y-1">
                    <span>Paiement: {order.paymentMethod}</span>
                    <span>Tel: {order.phone || order.user?.phone || 'Non renseigné'}</span>
                    <span>Créée: {new Date(order.createdAt).toLocaleString('fr-FR')}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
