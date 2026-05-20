import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Package, ShoppingBag, User, ArrowRight } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === 'admin') navigate('/admin', { replace: true });
    else if (user?.role === 'delivery') navigate('/delivery', { replace: true });
  }, [user, navigate]);

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

            {/* Quick actions */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Actions rapides</h3>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { icon: ShoppingBag, title: 'Catalogue', desc: 'Parcourez nos produits', color: 'bg-accent/5 text-accent', href: '/products' },
                  { icon: Package, title: 'Commandes', desc: 'Suivez vos commandes', color: 'bg-primary/5 text-primary', href: '#' },
                  { icon: User, title: 'Profil', desc: 'Gérez vos informations', color: 'bg-accent/5 text-accent', href: '#' },
                ].map((a, i) => (
                  <a key={i} href={a.href}
                    className="bg-white rounded-xl border border-gray-100 p-5 card-hover flex items-start gap-4">
                    <div className={`w-12 h-12 ${a.color} rounded-xl flex items-center justify-center shrink-0`}>
                      <a.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">{a.title}</h4>
                      <p className="text-xs text-gray-400 mt-0.5">{a.desc}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
