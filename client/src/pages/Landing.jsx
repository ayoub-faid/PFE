import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Truck, Users, Lock, Zap, TrendingUp, Search } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-brand-deep text-[#FFF3E0]">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 px-4">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,213,79,0.18),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(255,192,7,0.22),_transparent_30%)] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative flex flex-col gap-12 lg:flex-row items-center">
          <div className="w-full lg:w-6/12">
            <span className="inline-flex items-center gap-3 rounded-full border border-[#FFD54F]/40 bg-[#FFD54F]/20 px-4 py-2 text-sm font-semibold text-[#FFF3E0] shadow-[0_20px_40px_rgba(0,0,0,0.1)]">
              <span className="h-2.5 w-2.5 rounded-full bg-[#FFC107]"></span>
              Grossiste alimentaire Maroc
            </span>

            <h1 className="mt-8 text-5xl font-extrabold leading-tight tracking-[-0.05em] text-[#FFF3E0] md:text-6xl">
              Gros Products, votre <span className="text-[#FFC107]">plateforme de vente en gros</span> alimentaire.
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-relaxed text-[#FFF3E0]/85 md:text-xl">
              Gérez vos commandes en gros, suivez vos stocks de produits alimentaires et organisez les livraisons B2B avec une interface dédiée aux grossistes marocains.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/products"
                className="inline-flex items-center justify-center rounded-3xl bg-[#FFD54F] px-8 py-4 text-base font-semibold text-[#3E2723] shadow-[0_18px_40px_rgba(255,213,79,0.24)] transition hover:bg-[#FFC107]"
              >
                Parcourir les produits
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center justify-center rounded-3xl border border-[#FFD54F] bg-white/95 px-8 py-4 text-base font-semibold text-[#3E2723] transition hover:bg-white"
              >
                Créer un compte
              </Link>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[2rem] border border-[#3E2723]/15 bg-[#FFF3E0] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.12)]">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-[#3E2723]/70 font-semibold">
                  Stock rapide
                  <span className="rounded-full bg-[#3E2723] px-3 py-1 text-[#FFD54F]">24h</span>
                </div>
                <p className="mt-4 text-[#3E2723]/90">
                  Gestion instantanée du stock avec visibilité sur les meilleures ventes et les priorités de réapprovisionnement.
                </p>
              </div>
              <div className="rounded-[2rem] border border-[#FFD54F]/25 bg-[#3E2723]/90 p-6 shadow-[0_24px_60px_rgba(0,0,0,0.18)]">
                <p className="text-xs uppercase tracking-[0.3em] text-[#FFD54F] font-semibold">Performance</p>
                <h2 className="mt-4 text-3xl font-bold text-white">+1200</h2>
                <p className="mt-2 text-[#FFF3E0]/80">
                  Commandes B2B traitées chaque mois par des grossistes, distributeurs et commerces alimentaires.
                </p>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-6/12">
            <div className="relative overflow-hidden rounded-[2.5rem] border border-[#FFD54F]/20 bg-[#FFF3E0]/95 p-10 shadow-[0_40px_90px_rgba(62,39,35,0.18)]">
              <div className="absolute -left-12 top-12 h-28 w-28 rounded-full bg-[#FFC107]/20 blur-2xl"></div>
              <div className="absolute -right-10 bottom-8 h-24 w-24 rounded-full bg-[#FFD54F]/20 blur-2xl"></div>

              <div className="mb-8 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-[#3E2723]/70">Best Seller</p>
                  <h3 className="mt-3 text-3xl font-bold text-[#3E2723]">Pack Épicerie</h3>
                </div>
                <span className="rounded-full bg-[#3E2723] px-4 py-2 text-sm font-semibold text-[#FFD54F]">
                  Stock chaud
                </span>
              </div>

              <div className="space-y-5">
                <div className="flex items-center gap-4 rounded-3xl border border-[#3E2723]/10 bg-[#3E2723]/10 p-4">
                  <div className="grid h-16 w-16 place-items-center rounded-3xl bg-[#3E2723] text-[#FFD54F] text-2xl shadow-[0_16px_30px_rgba(0,0,0,0.12)]">
                    🧂
                  </div>
                  <div>
                    <p className="font-semibold text-[#3E2723]">Farine premium</p>
                    <p className="text-sm text-[#3E2723]/80">48 sacs disponibles</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 rounded-3xl border border-[#FFD54F]/20 bg-[#FFD54F]/15 p-4">
                  <div className="grid h-16 w-16 place-items-center rounded-3xl bg-[#FFD54F] text-[#3E2723] text-2xl shadow-[0_16px_30px_rgba(0,0,0,0.12)]">
                    🍯
                  </div>
                  <div>
                    <p className="font-semibold text-[#3E2723]">Huile d'olive</p>
                    <p className="text-sm text-[#3E2723]/80">Meilleur prix du marché</p>
                  </div>
                </div>
                <div className="rounded-3xl border border-[#3E2723]/10 bg-white/90 p-4">
                  <div className="flex items-center gap-3 text-[#3E2723]">
                    <Search className="h-5 w-5" />
                    <p className="text-sm font-semibold">Rechercher un produit</p>
                  </div>
                  <div className="mt-4 rounded-2xl bg-[#FFF3E0] p-4 text-[#3E2723]">
                    <p className="text-sm">Riz premium, épices, conserves, sucre...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-[#FFF3E0] text-[#3E2723]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Pourquoi choisir <span className="text-[#3E2723]">Gros Products</span> ?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="rounded-[2rem] border border-[#3E2723]/10 bg-white/90 p-8 shadow-[0_24px_60px_rgba(62,39,35,0.08)]">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-[#FFD54F] text-[#3E2723] mb-4 shadow-[0_12px_24px_rgba(255,213,79,0.24)]">
                <ShoppingCart className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#3E2723]">Catalogue complet</h3>
              <p className="text-[#5A3F31]/85">
                Accédez à un catalogue de produits alimentaires en gros, avec des prix professionnels et des fiches produits adaptées aux revendeurs.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="rounded-[2rem] border border-[#3E2723]/10 bg-white/90 p-8 shadow-[0_24px_60px_rgba(62,39,35,0.08)]">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-[#3E2723] text-[#FFD54F] mb-4 shadow-[0_12px_24px_rgba(62,39,35,0.2)]">
                <Truck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#3E2723]">Livraison rapide</h3>
              <p className="text-[#5A3F31]/85">
                Suivi en temps réel des commandes en gros et coordination des livraisons vers les magasins, restaurants et points de vente.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="rounded-[2rem] border border-[#3E2723]/10 bg-white/90 p-8 shadow-[0_24px_60px_rgba(62,39,35,0.08)]">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-[#FFC107] text-[#3E2723] mb-4 shadow-[0_12px_24px_rgba(255,192,7,0.24)]">
                <Lock className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#3E2723]">Sécurisé & fiable</h3>
              <p className="text-[#5A3F31]/85">
                Vos commandes, stocks et données clients restent sécurisés, avec un accès personnalisé par rôle selon votre activité.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="rounded-[2rem] border border-[#3E2723]/10 bg-white/90 p-8 shadow-[0_24px_60px_rgba(62,39,35,0.08)]">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-[#FFD54F] text-[#3E2723] mb-4 shadow-[0_12px_24px_rgba(255,213,79,0.24)]">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#3E2723]">Support grossiste</h3>
              <p className="text-[#5A3F31]/85">
                Notre équipe vous accompagne pour gérer vos commandes en gros, vos clients professionnels et vos livraisons sur mesure.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="rounded-[2rem] border border-[#3E2723]/10 bg-white/90 p-8 shadow-[0_24px_60px_rgba(62,39,35,0.08)]">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-[#3E2723] text-[#FFD54F] mb-4 shadow-[0_12px_24px_rgba(62,39,35,0.2)]">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#3E2723]">Flux de commandes</h3>
              <p className="text-[#5A3F31]/85">
                Une navigation conçue pour les opérations B2B, avec un accès rapide aux produits, au panier et à la validation des commandes.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="rounded-[2rem] border border-[#3E2723]/10 bg-white/90 p-8 shadow-[0_24px_60px_rgba(62,39,35,0.08)]">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-[#FFC107] text-[#3E2723] mb-4 shadow-[0_12px_24px_rgba(255,192,7,0.24)]">
                <TrendingUp className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#3E2723]">Rapports de stock</h3>
              <p className="text-[#5A3F31]/85">
                Analysez les ventes, suivez les mouvements de stock et prenez des décisions rapides pour vos approvisionnements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Roles Section */}
      <section className="py-20 px-4 bg-[#FFF3E0] text-[#3E2723]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Adaptée à votre <span className="text-[#3E2723]">rôle</span>
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
            <div className="bg-gradient-to-br from-[#5D4037] to-[#4E342E] p-8 rounded-2xl border-2 border-[#FFD54F]/30 hover:shadow-xl transition">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-[#FFD54F] mb-2">⚙️ Gestionnaire</h3>
                <p className="text-[#FFF3E0]/90">Pour les grossistes et gestionnaires de stock</p>
              </div>
              <ul className="space-y-3 text-[#FFF3E0]/90">
                <li className="flex items-start gap-2">
                  <span className="text-[#FFD54F] font-bold">✓</span>
                  <span>Ajouter/Modifier/Supprimer des références alimentaires</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FFD54F] font-bold">✓</span>
                  <span>Organiser les flux de stock et de réassort</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FFD54F] font-bold">✓</span>
                  <span>Suivre les ventes en gros et les marges</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FFD54F] font-bold">✓</span>
                  <span>Valider les commandes clients professionnels</span>
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
      <section className="py-20 px-4 bg-gradient-to-r from-[#3E2723] via-[#5D4037] to-[#3E2723]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#FFF3E0]">
            Prêt à commander en gros ?
          </h2>
          <p className="text-xl text-[#FFF3E0]/85 mb-10">
            Inscrivez-vous dès maintenant pour accéder à votre catalogue B2B et gérer vos livraisons alimentaires avec efficacité.
          </p>
          <Link
            to="/register"
            className="inline-block px-12 py-5 bg-[#FFD54F] text-[#3E2723] rounded-xl font-bold text-lg transition hover:bg-[#FFC107] shadow-xl hover:shadow-2xl transform hover:scale-105"
          >
            Créer un compte grossiste
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#3E2723] py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4 text-[#FFD54F]">Gros Products</h4>
              <p className="text-[#FFF3E0]/85 text-sm">
                La plateforme de vente en gros alimentaire de référence au Maroc.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-[#FFD54F]">Liens utiles</h4>
              <ul className="space-y-2 text-[#FFF3E0]/80 text-sm">
                <li><Link to="/" className="hover:text-white">Accueil</Link></li>
                <li><Link to="/login" className="hover:text-white">Connexion</Link></li>
                <li><Link to="/register" className="hover:text-white">Inscription</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-[#FFD54F]">Contact</h4>
              <p className="text-[#FFF3E0]/80 text-sm">
                Email: info@grosproducts.ma<br/>
                Téléphone: +212 6 12 34 56 78
              </p>
            </div>
          </div>
          <div className="border-t border-[#FFD54F]/20 pt-8">
            <p className="text-[#FFF3E0]/70 text-center text-sm">
              © {new Date().getFullYear()} Gros Products. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
