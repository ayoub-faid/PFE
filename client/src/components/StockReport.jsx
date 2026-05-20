import React, { useState, useEffect } from 'react';
import { AlertTriangle, Download, RefreshCw, Loader2, Circle, TrendingUp, Package, DollarSign } from 'lucide-react';
import productService from '../services/productService';

const formatMAD = (v) => Number(v).toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' MAD';

export default function StockReport() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => { fetchReport(); }, []);

  const fetchReport = async () => {
    try { setLoading(true); setError(null);
      const r = await productService.getStockReport();
      setData(r.data);
    } catch (err) { setError(err.response?.data?.message || 'Erreur'); }
    finally { setLoading(false); }
  };

  const handleDownload = () => {
    if (!data?.data) return;
    const h = `<tr>${['Produit','SKU','Catégorie','Prix','Disponible','Réservé','Endom.','Total','Valeur','Statut'].map(c => `<th>${c}</th>`).join('')}</tr>`;
    const b = data.data.map(i => `<tr><td>${i.name}</td><td>${i.sku||'-'}</td><td>${i.category||'-'}</td><td>${Number(i.price).toFixed(2)}</td><td>${i.stockAvailable}</td><td>${i.stockReserved}</td><td>${i.stockDamaged}</td><td>${i.totalStock}</td><td>${Number(i.value).toFixed(2)}</td><td>${i.active?'Actif':'Inactif'}</td></tr>`).join('');
    const blob = new Blob([`<html><table border="1">${h}${b}</table></html>`], { type: 'application/vnd.ms-excel' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `stock-${new Date().toISOString().split('T')[0]}.xls`; a.click();
  };

  if (loading) return <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 text-primary animate-spin" /></div>;
  if (error) return <div className="bg-red-50 border border-red-100 rounded-xl p-4 text-sm text-red-600">{error}</div>;

  const lowStock = data?.data?.filter(p => p.stockAvailable < 10) || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900">Rapport de stock</h3>
        <div className="flex gap-2">
          <button onClick={fetchReport} className="btn-secondary text-sm py-1.5"><RefreshCw className="w-4 h-4" /> Actualiser</button>
          <button onClick={handleDownload} className="btn-primary text-sm py-1.5"><Download className="w-4 h-4" /> Export</button>
        </div>
      </div>

      {/* Summary */}
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { icon: DollarSign, label: 'Valeur totale', value: formatMAD(data?.totals?.totalValue), sub: 'Prix de vente', color: 'from-primary to-primary-dark' },
          { icon: Package, label: 'Articles en stock', value: data?.totals?.totalItems || 0, sub: 'Toutes catégories', color: 'from-accent to-[#7a4a24]' },
          { icon: AlertTriangle, label: 'Stock faible', value: lowStock.length, sub: 'Moins de 10 unités', color: 'from-warning to-[#7a7450]' },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">{s.label}</p>
              <div className={`w-9 h-9 bg-gradient-to-br ${s.color} rounded-xl flex items-center justify-center shadow-sm`}>
                <s.icon className="h-4 w-4 text-white" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{s.value}</p>
            <p className="text-xs text-gray-400 mt-0.5">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Low stock alert */}
      {lowStock.length > 0 && (
        <div className="bg-warning-50 border border-warning/20 rounded-xl p-5">
          <div className="flex gap-3">
            <div className="w-10 h-10 bg-warning-50 rounded-xl flex items-center justify-center shrink-0">
              <AlertTriangle className="h-5 w-5 text-warning" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Alertes stock faible</h4>
              <div className="space-y-1.5">
                {lowStock.slice(0, 5).map(item => (
                  <div key={item.id} className="flex items-center gap-2 text-sm text-gray-600">
                    <Circle className="h-1.5 w-1.5 fill-warning text-warning shrink-0" />
                    <span className="font-medium text-gray-900">{item.name}</span>
                    <span className="text-warning font-semibold">{item.stockAvailable} unités</span>
                  </div>
                ))}
                {lowStock.length > 5 && <p className="text-sm text-gray-400 font-medium">+{lowStock.length - 5} autres articles</p>}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="bg-gray-50 border-b border-gray-200">
              {['Produit','SKU','Catégorie','Prix','Dispo.','Rés.','End.','Total','Valeur','Statut'].map(c => (
                <th key={c} className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">{c}</th>
              ))}
            </tr></thead>
            <tbody className="divide-y divide-gray-100">
              {data?.data?.map(item => (
                <tr key={item.id} className="hover:bg-gray-50 transition text-sm">
                  <td className="px-4 py-3 font-medium text-gray-900">{item.name}</td>
                  <td className="px-4 py-3 font-mono text-gray-400">{item.sku || '-'}</td>
                  <td className="px-4 py-3 text-gray-400">{item.category || '-'}</td>
                  <td className="px-4 py-3 text-gray-900">{formatMAD(item.price)}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${
                      item.stockAvailable < 10 ? 'bg-warning-50 text-warning' : 'bg-accent-50 text-accent'
                    }`}>
                      <Circle className={`h-1.5 w-1.5 fill-current ${item.stockAvailable < 10 ? 'text-warning' : 'text-accent'}`} />
                      {item.stockAvailable}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-400">{item.stockReserved}</td>
                  <td className="px-4 py-3 text-gray-400">{item.stockDamaged}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">{item.totalStock}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">{formatMAD(item.value)}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${item.active ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                      {item.active ? 'Actif' : 'Inactif'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-50 border-t-2 border-gray-200">
              <tr className="font-semibold text-sm">
                <td colSpan="3" className="px-4 py-3 text-gray-900">TOTAUX</td>
                <td colSpan="2" className="px-4 py-3"></td>
                <td colSpan="3" className="px-4 py-3 text-right text-gray-900">{data?.totals?.totalItems} unités</td>
                <td className="px-4 py-3 text-primary font-bold">{formatMAD(data?.totals?.totalValue)}</td>
                <td className="px-4 py-3"></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
