import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import {
  ShoppingCart,
  Home,
  Package,
  Grid3X3,
  Shield,
  Truck,
  LayoutDashboard,
  LogIn,
  UserPlus,
  LogOut,
  Menu,
  X,
  Search,
  ChevronDown,
  Store,
  Phone,
  ChevronRight
} from 'lucide-react';

const linkClass = ({ isActive }) =>
  `relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
    isActive
      ? 'text-primary bg-primary/5 after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:bg-primary after:rounded-full'
      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
  }`;

const mobileLinkClass = ({ isActive }) =>
  `flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
    isActive
      ? 'text-primary bg-primary/5'
      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
  }`;

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      {/* Main nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 gap-2">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2.5 flex-shrink-0 group">
            <div className="w-9 h-9 bg-gradient-to-br from-primary to-primary-dark text-white rounded-xl flex items-center justify-center font-bold text-base shadow-sm transition-transform group-hover:scale-105">
              GP
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-gray-900 text-base tracking-tight">Gros Products</span>
              <p className="text-[10px] text-gray-400 -mt-0.5">Grossiste alimentaire Maroc</p>
            </div>
          </NavLink>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-0.5 ml-6">
            <NavLink to="/" className={linkClass}>
              <span className="flex items-center gap-1.5">
                <Home className="h-4 w-4" />
                Accueil
              </span>
            </NavLink>
            <NavLink to="/products" className={linkClass}>
              <span className="flex items-center gap-1.5">
                <Package className="h-4 w-4" />
                Produits
              </span>
            </NavLink>
            <NavLink to="/categories" className={linkClass}>
              <span className="flex items-center gap-1.5">
                <Grid3X3 className="h-4 w-4" />
                Catégories
              </span>
            </NavLink>
            {isAuthenticated && user?.role === 'admin' && (
              <NavLink to="/admin" className={linkClass}>
                <span className="flex items-center gap-1.5">
                  <Shield className="h-4 w-4" />
                  Admin
                </span>
              </NavLink>
            )}
            {isAuthenticated && user?.role === 'delivery' && (
              <NavLink to="/delivery" className={linkClass}>
                <span className="flex items-center gap-1.5">
                  <Truck className="h-4 w-4" />
                  Livraisons
                </span>
              </NavLink>
            )}
            {isAuthenticated && user?.role === 'client' && (
              <NavLink to="/dashboard" className={linkClass}>
                <span className="flex items-center gap-1.5">
                  <LayoutDashboard className="h-4 w-4" />
                  Tableau de bord
                </span>
              </NavLink>
            )}
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Right side */}
          <div className="hidden md:flex items-center gap-1.5">
            {/* Search toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Cart */}
            <NavLink
              to="/cart"
              className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-primary text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-sm ring-2 ring-white">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </NavLink>

            {/* Auth */}
            {!isAuthenticated ? (
              <div className="flex items-center gap-1.5 ml-2">
                <NavLink
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Connexion
                </NavLink>
                <NavLink
                  to="/register"
                  className="px-4 py-2 text-sm font-semibold bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors shadow-sm"
                >
                  Inscription
                </NavLink>
              </div>
            ) : (
              <div className="flex items-center gap-2 ml-2">
                <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-1.5">
                  <div className="w-7 h-7 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">
                      {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </span>
                  </div>
                  <div className="hidden lg:block">
                    <p className="text-xs font-medium text-gray-900 leading-tight">{user?.name}</p>
                    <p className="text-[10px] text-gray-400 capitalize">{user?.role}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  title="Déconnexion"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          {/* Mobile: search + cart + menu */}
          <div className="flex md:hidden items-center gap-1">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <Search className="h-5 w-5" />
            </button>
            <NavLink to="/cart" className="relative p-2 text-gray-500 hover:text-gray-700 rounded-lg">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-primary text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center ring-2 ring-white">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </NavLink>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Search bar */}
      {searchOpen && (
        <div className="border-t border-gray-100 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un produit (riz, huile, épices...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors"
              >
                Chercher
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          {/* User info if authenticated */}
          {isAuthenticated && (
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">{user?.name?.charAt(0)?.toUpperCase()}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-400 capitalize">{user?.role}</p>
                </div>
              </div>
            </div>
          )}

          <div className="px-3 py-2 space-y-0.5">
            <NavLink to="/" onClick={() => setMenuOpen(false)} className={mobileLinkClass}>
              <Home className="h-4 w-4" /> Accueil
            </NavLink>
            <NavLink to="/products" onClick={() => setMenuOpen(false)} className={mobileLinkClass}>
              <Package className="h-4 w-4" /> Produits
            </NavLink>
            <NavLink to="/categories" onClick={() => setMenuOpen(false)} className={mobileLinkClass}>
              <Grid3X3 className="h-4 w-4" /> Catégories
            </NavLink>
            <NavLink to="/cart" onClick={() => setMenuOpen(false)} className={mobileLinkClass}>
              <ShoppingCart className="h-4 w-4" /> Panier {totalItems > 0 && <span className="ml-auto bg-primary text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center">{totalItems}</span>}
            </NavLink>

            {isAuthenticated && user?.role === 'admin' && (
              <NavLink to="/admin" onClick={() => setMenuOpen(false)} className={mobileLinkClass}>
                <Shield className="h-4 w-4" /> Administration
              </NavLink>
            )}
            {isAuthenticated && user?.role === 'delivery' && (
              <NavLink to="/delivery" onClick={() => setMenuOpen(false)} className={mobileLinkClass}>
                <Truck className="h-4 w-4" /> Livraisons
              </NavLink>
            )}
            {isAuthenticated && user?.role === 'client' && (
              <NavLink to="/dashboard" onClick={() => setMenuOpen(false)} className={mobileLinkClass}>
                <LayoutDashboard className="h-4 w-4" /> Tableau de bord
              </NavLink>
            )}
          </div>

          <div className="border-t border-gray-100 px-3 py-2">
            {!isAuthenticated ? (
              <div className="space-y-1">
                <NavLink to="/login" onClick={() => setMenuOpen(false)} className={mobileLinkClass}>
                  <LogIn className="h-4 w-4" /> Connexion
                </NavLink>
                <NavLink to="/register" onClick={() => setMenuOpen(false)} className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-semibold bg-primary text-white">
                  <UserPlus className="h-4 w-4" /> Inscription
                </NavLink>
              </div>
            ) : (
              <button
                onClick={() => { handleLogout(); setMenuOpen(false); }}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="h-4 w-4" /> Déconnexion
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
