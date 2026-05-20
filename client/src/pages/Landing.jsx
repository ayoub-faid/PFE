import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingCart, Truck, Users, Shield, Zap,
  ArrowRight, Check, Star, Package, ChevronRight,
  Clock, MapPin, BarChart3, Phone
} from 'lucide-react';

const groceryPacks = [
  {
    name: "Pack Epicerie Essentiel",
    target: "Petites epiceries de quartier",
    price: "2 450",
    items: ["Riz premium 25kg", "Sucre cristallise 10kg", "Farine patissiere 10kg", "Conserves mixtes (x12)"],
    popular: false,
    color: "from-accent to-[#7a4a24]",
    badge: "Démarrage"
  },
  {
    name: "Pack Epicerie Pro",
    target: "Commerces à fort débit",
    price: "4 980",
    items: ["Huiles alimentaires 5L (x4)", "Légumineuses assorties 15kg", "Épices gros conditionnement", "Boissons gazeuses (x24)"],
    popular: true,
    color: "from-primary to-primary-dark",
    badge: "Populaire"
  },
  {
    name: "Pack Epicerie Maxi",
    target: "Grossistes et semi-grossistes",
    price: "8 900",
    items: ["Produits secs vrac 50kg", "Produits entretien lot x12", "Snacking & confiserie", "Produits saisonniers"],
    popular: false,
    color: "from-primary to-primary-dark",
    badge: "Volume"
  },
];

const stats = [
  { icon: Package, value: "+2 500", label: "Produits référencés" },
  { icon: Users, value: "+850", label: "Clients professionnels" },
  { icon: Truck, value: "24h", label: "Livraison rapide" },
  { icon: Star, value: "4.8/5", label: "Satisfaction client" },
];

const features = [
  { icon: ShoppingCart, title: "Catalogue B2B complet", desc: "Accédez à un catalogue exhaustif de produits alimentaires en gros avec fiches techniques, prix professionnels et stocks en temps réel." },
  { icon: Truck, title: "Logistique intégrée", desc: "Suivi en temps réel des commandes, coordination des livraisons vers magasins, restaurants et points de vente partout au Maroc." },
  { icon: Shield, title: "Plateforme sécurisée", desc: "Données chiffrées, accès par rôles (client, gestionnaire, livreur) et historique complet des transactions." },
  { icon: Users, title: "Support dédié grossiste", desc: "Une équipe commerciale dédiée vous accompagne dans la gestion de vos approvisionnements et le développement de votre activité." },
  { icon: Zap, title: "Commande express", desc: "Processus de commande optimisé en 3 clics depuis votre tableau de bord, avec réapprovisionnement automatique possible." },
  { icon: BarChart3, title: "Rapports & analytics", desc: "Analysez vos ventes, suivez les rotations de stock et pilotez votre activité avec des tableaux de bord détaillés." },
];

const testimonials = [
  { name: "Ahmed Bennani", role: "Épicier de quartier, Casablanca", text: "Depuis que j'utilise Gros Products, je gagne un temps considérable sur mes commandes. Les prix sont compétitifs et la livraison est toujours à l'heure.", rating: 5 },
  { name: "Fatima Zahra", role: "Gérante de restaurant, Rabat", text: "Une plateforme vraiment adaptée aux besoins des professionnels. Le catalogue est vaste et la qualité des produits est constante.", rating: 5 },
  { name: "Karim Ouali", role: "Semi-grossiste, Marrakech", text: "Le pack Maxi me permet d'optimiser mes coûts d'approvisionnement. Le suivi des commandes est impeccable.", rating: 4 },
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div>
      {/* ========== HERO ========== */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#f5f0e6] via-primary-50/30 to-primary-50" />

        {/* Background image pattern — dot grid */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #622B14 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />

        {/* Decorative SVG background shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <svg className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px]" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="100" fill="#622B14" opacity="0.04" />
            <circle cx="50" cy="50" r="40" fill="#995F2F" opacity="0.03" />
          </svg>
          <svg className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="50" fill="#978F66" opacity="0.04" />
          </svg>
          <svg className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="50" fill="#E4D6A9" opacity="0.08" />
          </svg>
        </div>

        {/* Gradient fade at edges */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#f5f0e6] via-transparent to-transparent" />

        <div className="relative text-center px-4 sm:px-6 max-w-3xl mx-auto pt-20 pb-16">
          <h1 className="font-['Playfair_Display',serif] text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-gray-900 leading-[1.1] tracking-tight">
            Gros Products
          </h1>
          <p className="mt-5 text-lg sm:text-xl text-gray-500 leading-relaxed max-w-xl mx-auto font-light">
            L'approvisionnement en gros simplifié pour les professionnels de l'alimentaire au Maroc.
          </p>
          <div className="mt-10">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-7 py-3.5 rounded-xl hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/25 active:scale-[0.97]"
            >
              Parcourir les produits
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========== PACKS ========== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-flex items-center gap-1.5 bg-primary/5 text-primary text-xs font-semibold px-3 py-1.5 rounded-full">
              <Package className="h-3.5 w-3.5" /> Packs prêts à commander
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
              Des packs adaptés à votre volume
            </h2>
            <p className="mt-3 text-gray-500">
              Choisissez le pack correspondant à votre activité et gagnez du temps sur vos approvisionnements.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {groceryPacks.map((pack, i) => (
              <div
                key={i}
                className={`relative bg-white rounded-2xl border-2 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                  pack.popular ? 'border-primary shadow-lg' : 'border-gray-100'
                }`}
              >
                {/* Color bar */}
                <div className={`h-2 bg-gradient-to-r ${pack.color}`} />

                {pack.popular && (
                  <div className="absolute top-3 right-3 z-10">
                    <span className="bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-sm">
                      {pack.badge}
                    </span>
                  </div>
                )}

                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{pack.name}</h3>
                      <p className="text-xs text-gray-400 mt-0.5">{pack.target}</p>
                    </div>
                    <span className="badge badge-success text-[10px]">Disponible</span>
                  </div>

                  <p className="text-3xl font-extrabold text-gray-900 mb-5">
                    {pack.price}<span className="text-base font-medium text-gray-400"> DH</span>
                  </p>

                  <ul className="space-y-2.5 mb-6">
                    {pack.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-sm text-gray-600">
                        <Check className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/products"
                    className={`w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all ${
                      pack.popular
                        ? 'bg-primary text-white hover:bg-primary-dark shadow-md'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    Voir le pack <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FEATURES ========== */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-flex items-center gap-1.5 bg-accent/5 text-accent text-xs font-semibold px-3 py-1.5 rounded-full">
              <Zap className="h-3.5 w-3.5" /> Pourquoi Gros Products ?
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
              Tout pour simplifier votre activité
            </h2>
            <p className="mt-3 text-gray-500">
              Une plateforme conçue avec des professionnels du secteur pour répondre aux exigences du marché marocain.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <div
                  key={i}
                  className="group bg-white rounded-xl border border-gray-100 p-6 transition-all duration-300 hover:shadow-md hover:border-gray-200 hover:-translate-y-0.5"
                >
                  <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-base font-bold text-gray-900 mb-2">{feat.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{feat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== ROLES ========== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-flex items-center gap-1.5 bg-primary/5 text-primary text-xs font-semibold px-3 py-1.5 rounded-full">
              <Users className="h-3.5 w-3.5" /> Une interface par rôle
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
              Adaptée à chaque métier
            </h2>
            <p className="mt-3 text-gray-500">
              Que vous soyez acheteur, gestionnaire de stock ou livreur, retrouvez les fonctionnalités essentielles à votre activité.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                role: 'Client',
                color: 'accent',
                bg: 'bg-accent/5',
                border: 'border-accent/20',
                iconBg: 'bg-accent/10',
                iconColor: 'text-accent',
                items: ['Catalogue produits complet', 'Prix et stocks en temps réel', 'Commandes en un clic', 'Suivi des livraisons'],
              },
              {
                role: 'Gestionnaire',
                color: 'primary',
                bg: 'bg-primary/5',
                border: 'border-primary/20',
                iconBg: 'bg-primary/10',
                iconColor: 'text-primary',
                popular: true,
                items: ['Gestion catalogue produits', 'Suivi des stocks et réassort', 'Tableaux de bord analytics', 'Validation des commandes'],
              },
              {
                role: 'Livreur',
                color: 'accent',
                bg: 'bg-accent/5',
                border: 'border-accent/20',
                iconBg: 'bg-accent/10',
                iconColor: 'text-accent',
                items: ['Planning livraisons', 'Itinéraire optimisé', 'Mise à jour statuts', 'Historique complet'],
              },
            ].map((r, i) => (
              <div
                key={i}
                className={`bg-white rounded-2xl border-2 p-7 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                  r.popular ? 'border-primary shadow-md' : 'border-gray-100'
                }`}
              >
                {r.popular && (
                  <div className="inline-flex bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full mb-4">
                    Le plus utilisé
                  </div>
                )}
                <div className={`w-14 h-14 ${r.iconBg} rounded-2xl flex items-center justify-center mb-5`}>
                  {i === 0 && <ShoppingCart className={`h-7 w-7 ${r.iconColor}`} />}
                  {i === 1 && <Shield className={`h-7 w-7 ${r.iconColor}`} />}
                  {i === 2 && <Truck className={`h-7 w-7 ${r.iconColor}`} />}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{r.role}</h3>
                <p className="text-sm text-gray-400 mb-5">
                  {i === 0 && 'Pour les acheteurs professionnels'}
                  {i === 1 && 'Pour les grossistes et gestionnaires'}
                  {i === 2 && 'Pour la gestion des livraisons'}
                </p>
                <ul className="space-y-3">
                  {r.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm text-gray-600">
                      <Check className={`h-4 w-4 ${r.iconColor} mt-0.5 shrink-0`} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== TESTIMONIALS ========== */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-flex items-center gap-1.5 bg-primary/5 text-primary text-xs font-semibold px-3 py-1.5 rounded-full">
              <Star className="h-3.5 w-3.5" /> Ils nous font confiance
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
              Ce que disent nos clients
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-6 transition-shadow hover:shadow-md">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 text-accent fill-accent" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-5 italic">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white ${
                    i === 0 ? 'bg-primary' : i === 1 ? 'bg-accent' : 'bg-warning'
                  }`}>
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary-dark to-primary" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Prêt à développer votre activité ?
          </h2>
          <p className="mt-4 text-lg text-primary-50 max-w-xl mx-auto">
            Rejoignez les centaines de professionnels qui optimisent leurs achats en gros avec Gros Products.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 bg-white text-primary font-bold px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
            >
              Créer un compte gratuit
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-white/10 text-white font-semibold px-8 py-4 rounded-xl border border-white/20 hover:bg-white/20 transition-all"
            >
              Voir le catalogue
            </Link>
          </div>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="bg-gray-900 text-gray-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center font-bold text-white text-sm">GP</div>
                <span className="font-bold text-white text-lg">Gros Products</span>
              </div>
              <p className="text-sm leading-relaxed">
                La plateforme de vente en gros alimentaire de référence au Maroc. Des milliers de produits aux meilleurs prix pour les professionnels.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4 text-sm">Liens rapides</h4>
              <ul className="space-y-2.5 text-sm">
                <li><Link to="/" className="hover:text-white transition-colors">Accueil</Link></li>
                <li><Link to="/products" className="hover:text-white transition-colors">Produits</Link></li>
                <li><Link to="/categories" className="hover:text-white transition-colors">Catégories</Link></li>
                <li><Link to="/register" className="hover:text-white transition-colors">Inscription</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4 text-sm">Compte</h4>
              <ul className="space-y-2.5 text-sm">
                <li><Link to="/login" className="hover:text-white transition-colors">Connexion</Link></li>
                <li><Link to="/register" className="hover:text-white transition-colors">Créer un compte</Link></li>
                <li><Link to="/cart" className="hover:text-white transition-colors">Panier</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4 text-sm">Contact</h4>
              <ul className="space-y-2.5 text-sm">
                <li className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5" /> Casablanca, Maroc</li>
                <li className="flex items-center gap-2"><Phone className="h-3.5 w-3.5" /> +212 6 12 34 56 78</li>
                <li className="flex items-center gap-2"><Clock className="h-3.5 w-3.5" /> Lun-Sam 8h-19h</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            &copy; {new Date().getFullYear()} Gros Products. Tous droits réservés.
          </div>
        </div>
      </footer>
    </div>
  );
}
