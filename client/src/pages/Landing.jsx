import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Truck, Users, Lock, Zap, TrendingUp } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Hero Section */}
      <section className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 flex items-center justify-center px-4 py-20">
        <div className="max-w-5xl w-full text-center">
          <div className="mb-8 animate-bounce">
            <h1 className="text-6xl md:text-7xl font-extrabold mb-4 text-white drop-shadow-lg">
              Gros Products
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 font-light">
              Votre plateforme de vente en gros alimentaire au Maroc
            </p>
          </div>
          
          <p className="text-lg text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            Simplifiez votre commerce alimentaire avec notre plateforme intuitive. 
            Achetez en gros, gérez vos stocks et livrez rapidement avec des outils professionnels.
          </p>

          <div className="flex justify-center gap-4 flex-wrap mb-12">
            <Link
              to="/login"
              className="px-10 py-4 bg-white text-blue-700 rounded-xl font-bold text-lg transition hover:bg-blue-50 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Se connecter
            </Link>
            <Link
              to="/register"
              className="px-10 py-4 bg-blue-500 text-white rounded-xl font-bold text-lg transition hover:bg-blue-600 shadow-lg hover:shadow-xl transform hover:scale-105 border-2 border-white"
            >
              Créer un compte
            </Link>
          </div>

          <p className="text-sm text-blue-200">
            Rejoignez des centaines de commerçants qui font confiance à Gros Products
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-slate-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Pourquoi choisir <span className="text-blue-400">Gros Products</span> ?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-slate-700 to-slate-800 p-8 rounded-2xl border border-blue-500/20 hover:border-blue-500/50 transition hover:shadow-lg">
              <div className="bg-blue-600 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                <ShoppingCart className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Catalogue complet</h3>
              <p className="text-slate-300">
                Accédez à un large choix de produits alimentaires avec des prix compétitifs et des mises à jour en temps réel.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-slate-700 to-slate-800 p-8 rounded-2xl border border-blue-500/20 hover:border-blue-500/50 transition hover:shadow-lg">
              <div className="bg-indigo-600 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                <Truck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Livraison rapide</h3>
              <p className="text-slate-300">
                Suivi en temps réel de vos commandes et livraisons dans tout le Maroc avec un réseau de livreurs de confiance.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-slate-700 to-slate-800 p-8 rounded-2xl border border-blue-500/20 hover:border-blue-500/50 transition hover:shadow-lg">
              <div className="bg-purple-600 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                <Lock className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Sécurisé & fiable</h3>
              <p className="text-slate-300">
                Vos données et transactions sont protégées par des technologies de sécurité avancées et modernes.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-gradient-to-br from-slate-700 to-slate-800 p-8 rounded-2xl border border-blue-500/20 hover:border-blue-500/50 transition hover:shadow-lg">
              <div className="bg-cyan-600 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Support client</h3>
              <p className="text-slate-300">
                Notre équipe est disponible pour répondre à vos questions et résoudre vos problèmes rapidement.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-gradient-to-br from-slate-700 to-slate-800 p-8 rounded-2xl border border-blue-500/20 hover:border-blue-500/50 transition hover:shadow-lg">
              <div className="bg-green-600 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Interface rapide</h3>
              <p className="text-slate-300">
                Une plateforme optimisée pour une navigation fluide et une gestion efficace de vos commandes.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-gradient-to-br from-slate-700 to-slate-800 p-8 rounded-2xl border border-blue-500/20 hover:border-blue-500/50 transition hover:shadow-lg">
              <div className="bg-amber-600 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Analytics</h3>
              <p className="text-slate-300">
                Consultez vos statistiques de ventes et gérez votre inventaire avec des rapports détaillés.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Roles Section */}
      <section className="py-20 px-4 bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Adaptée à votre <span className="text-blue-400">rôle</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Client Role */}
            <div className="bg-gradient-to-br from-green-900 to-green-800 p-8 rounded-2xl border-2 border-green-500 hover:shadow-xl transition">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-green-300 mb-2">👥 Client</h3>
                <p className="text-green-100">Pour les acheteurs de produits alimentaires</p>
              </div>
              <ul className="space-y-3 text-green-100">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 font-bold">✓</span>
                  <span>Consulter le catalogue complet</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 font-bold">✓</span>
                  <span>Vérifier les prix en temps réel</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 font-bold">✓</span>
                  <span>Passer et suivre ses commandes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 font-bold">✓</span>
                  <span>Gérer son panier facilement</span>
                </li>
              </ul>
            </div>

            {/* Admin Role */}
            <div className="bg-gradient-to-br from-blue-900 to-blue-800 p-8 rounded-2xl border-2 border-blue-500 hover:shadow-xl transition">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-blue-300 mb-2">⚙️ Administrateur</h3>
                <p className="text-blue-100">Pour la gestion de la plateforme</p>
              </div>
              <ul className="space-y-3 text-blue-100">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 font-bold">✓</span>
                  <span>Ajouter/Modifier/Supprimer produits</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 font-bold">✓</span>
                  <span>Gérer les utilisateurs et rôles</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 font-bold">✓</span>
                  <span>Consulter les statistiques de ventes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 font-bold">✓</span>
                  <span>Valider les commandes</span>
                </li>
              </ul>
            </div>

            {/* Delivery Role */}
            <div className="bg-gradient-to-br from-orange-900 to-orange-800 p-8 rounded-2xl border-2 border-orange-500 hover:shadow-xl transition">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-orange-300 mb-2">🚚 Livreur</h3>
                <p className="text-orange-100">Pour la gestion des livraisons</p>
              </div>
              <ul className="space-y-3 text-orange-100">
                <li className="flex items-start gap-2">
                  <span className="text-orange-400 font-bold">✓</span>
                  <span>Voir les commandes à livrer</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-400 font-bold">✓</span>
                  <span>Mettre à jour l'état des livraisons</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-400 font-bold">✓</span>
                  <span>Gérer son itinéraire</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-400 font-bold">✓</span>
                  <span>Confirmer les livraisons complétées</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Prêt à commencer ?
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            Inscrivez-vous maintenant et découvrez comment Gros Products peut transformer votre commerce.
          </p>
          <Link
            to="/register"
            className="inline-block px-12 py-5 bg-white text-blue-700 rounded-xl font-bold text-lg transition hover:bg-blue-50 shadow-xl hover:shadow-2xl transform hover:scale-105"
          >
            Commencer gratuitement
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4 text-blue-400">Gros Products</h4>
              <p className="text-slate-400 text-sm">
                La plateforme de vente en gros alimentaire de référence au Maroc.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-blue-400">Liens utiles</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><Link to="/" className="hover:text-white">Accueil</Link></li>
                <li><Link to="/login" className="hover:text-white">Connexion</Link></li>
                <li><Link to="/register" className="hover:text-white">Inscription</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-blue-400">Contact</h4>
              <p className="text-slate-400 text-sm">
                Email: info@grosproducts.ma<br/>
                Téléphone: +212 6 12 34 56 78
              </p>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8">
            <p className="text-slate-500 text-center text-sm">
              © 2025 Gros Products. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
