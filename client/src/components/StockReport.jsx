import React, { useState, useEffect } from 'react';
import { AlertTriangle, BarChart3, Download } from 'lucide-react';
import productService from '../services/productService';

export default function StockReport() {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await productService.getStockReport();
      setReportData(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load stock report');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!reportData?.data) return;

    const csv = [
      ['Name', 'SKU', 'Category', 'Price', 'Cost Price', 'Available', 'Reserved', 'Damaged', 'Total', 'Value', 'Status'],
      ...reportData.data.map(item => [
        item.name,
        item.sku || '-',
        item.category || '-',
        item.price,
        item.costPrice,
        item.stockAvailable,
        item.stockReserved,
        item.stockDamaged,
        item.totalStock,
        item.value.toFixed(2),
        item.active ? 'Active' : 'Inactive'
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `stock-report-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  const lowStockItems = reportData?.data?.filter(p => p.stockAvailable < 10) || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-900">Stock Report</h3>
        <button
          onClick={handleDownload}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md flex items-center gap-2 transition font-medium"
        >
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <p className="text-gray-500 text-sm font-medium">Total Inventory Value</p>
          <p className="text-3xl font-bold text-gray-900">${reportData?.totals?.totalValue?.toFixed(2) || '0.00'}</p>
          <p className="text-xs text-gray-500 mt-2">Selling price</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <p className="text-gray-500 text-sm font-medium">Total Items in Stock</p>
          <p className="text-3xl font-bold text-gray-900">{reportData?.totals?.totalItems || 0}</p>
          <p className="text-xs text-gray-500 mt-2">All categories</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-500">
          <p className="text-gray-500 text-sm font-medium">Low Stock Items</p>
          <p className="text-3xl font-bold text-gray-900">{lowStockItems.length}</p>
          <p className="text-xs text-gray-500 mt-2">Below 10 units</p>
        </div>
      </div>

      {/* Low Stock Alert */}
      {lowStockItems.length > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="flex gap-3">
            <AlertTriangle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-orange-900 mb-2">Low Stock Alert</h4>
              <div className="space-y-1">
                {lowStockItems.slice(0, 5).map(item => (
                  <p key={item.id} className="text-sm text-orange-800">
                    {item.name} - Only {item.stockAvailable} units available
                  </p>
                ))}
                {lowStockItems.length > 5 && (
                  <p className="text-sm text-orange-800 font-medium">
                    +{lowStockItems.length - 5} more items
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Report Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">SKU</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Price</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Available</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Reserved</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Damaged</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Total</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Value</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {reportData?.data?.map(item => (
                <tr key={item.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-600">{item.sku || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.category || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                    ${item.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      item.stockAvailable < 10
                        ? 'bg-orange-100 text-orange-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {item.stockAvailable}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-600">
                    {item.stockReserved}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-600">
                    {item.stockDamaged}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900">
                    {item.totalStock}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900">
                    ${item.value.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      item.active
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {item.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-50 border-t-2 border-gray-200 font-semibold">
              <tr>
                <td colSpan="3" className="px-6 py-3 text-gray-900">TOTALS</td>
                <td colSpan="2" className="px-6 py-3 text-right text-gray-900"></td>
                <td colSpan="3" className="px-6 py-3 text-right text-gray-900">
                  {reportData?.totals?.totalItems} units
                </td>
                <td className="px-6 py-3 text-right text-red-600 font-bold">
                  ${reportData?.totals?.totalValue?.toFixed(2)}
                </td>
                <td className="px-6 py-3"></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Refresh Button */}
      <div className="flex justify-center">
        <button
          onClick={fetchReport}
          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition font-medium"
        >
          Refresh Report
        </button>
      </div>
    </div>
  );
}
