import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Truck, MapPin, Clock, CheckCircle, ArrowRight, Package } from 'lucide-react';

export default function DeliveryDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const cards = [
    { icon: Truck, title: 'Livraisons actives', count: '0', status: 'Aucune assignée', color: 'from-primary to-primary-dark' },
    { icon: CheckCircle, title: 'Complétées ajd', count: '0', status: 'Cette semaine', color: 'from-accent to-[#7a4a24]' },
    { icon: MapPin, title: 'Itinéraires', count: '0', status: 'Ce mois', color: 'from-warning to-[#7a7450]' },
    { icon: Clock, title: 'Temps moyen', count: '--', status: 'Par livraison', color: 'from-primary to-primary-dark' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Bienvenue, {user?.name}!</h2>
          <p className="text-gray-400 text-sm mt-1">Gérez vos livraisons et suivez vos itinéraires.</p>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {cards.map((card, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 p-5 card-hover">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">{card.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{card.count}</p>
                  <p className="text-[11px] text-gray-400 mt-1">{card.status}</p>
                </div>
                <div className={`w-12 h-12 bg-gradient-to-br ${card.color} rounded-xl flex items-center justify-center shadow-sm`}>
                  <card.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Actions</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: Truck, title: 'Livraisons actives', desc: 'Consultez vos livraisons assignées', color: 'bg-primary/5', iconColor: 'text-primary', btn: 'btn-primary' },
              { icon: MapPin, title: 'Suivre itinéraire', desc: 'Visualisez votre route optimisée', color: 'bg-accent/5', iconColor: 'text-accent', btn: 'bg-accent text-white hover:bg-accent/90' },
              { icon: CheckCircle, title: 'Mettre à jour statut', desc: 'Actualisez l\'état des livraisons', color: 'bg-warning/5', iconColor: 'text-warning', btn: 'bg-warning text-white hover:bg-[#7a7450]' },
              { icon: Clock, title: 'Historique', desc: 'Consultez votre historique complet', color: 'bg-gray-50', iconColor: 'text-gray-500', btn: 'btn-secondary' },
            ].map((a, i) => (
              <div key={i} className={`${a.color} rounded-xl p-5 border border-transparent hover:border-gray-200 transition-all card-hover`}>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mb-3 shadow-sm">
                      <a.icon className={`h-5 w-5 ${a.iconColor}`} />
                    </div>
                    <h4 className="font-semibold text-gray-900">{a.title}</h4>
                    <p className="text-sm text-gray-400 mt-1">{a.desc}</p>
                  </div>
                </div>
                <button className={`mt-4 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${a.btn}`}>
                  Accéder <ArrowRight className="h-3.5 w-3.5 inline ml-1" />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-warning-50 border border-warning/20 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <Package className="h-5 w-5 text-warning mt-0.5 shrink-0" />
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-gray-900">Note:</span> Les fonctionnalités de livraison sont en cours de développement.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
