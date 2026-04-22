import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Menu, X } from 'lucide-react';

const activeClass = 'text-[#3E2723] bg-[#FFD54F] rounded-md px-3 py-2 font-semibold';
const normalClass = 'text-[#FFF3E0] hover:text-white hover:bg-[#5D4037] px-3 py-2 rounded-md transition';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const roleLabel = user ? user.role.toUpperCase() : null;

  return (
    <nav className="bg-[#3E2723] text-[#FFF3E0] shadow-lg sticky top-0 z-50 border-b border-[#FFD54F]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-3 hover:opacity-90 flex-shrink-0">
            <div className="bg-[#FFD54F] p-2 rounded-lg shadow-md shadow-[#00000033]">
              <span className="text-[#3E2723] font-bold text-xl">G</span>
            </div>
            <div>
              <span className="text-[#FFD54F] font-bold text-xl tracking-tight">Gros Products</span>
              <p className="text-xs text-[#FFF3E0]/80">Grossiste alimentaire Maroc</p>
            </div>
          </NavLink>

          {/* Center Navigation - Hidden on mobile */}
          <div className="hidden md:flex md:items-center md:space-x-2">
            <NavLink to="/" className={({ isActive }) => (isActive ? activeClass : normalClass)}>
              Accueil
            </NavLink>
            <NavLink to="/products" className={({ isActive }) => (isActive ? activeClass : normalClass)}>
              Produits
            </NavLink>
            <NavLink to="/categories" className={({ isActive }) => (isActive ? activeClass : normalClass)}>
              Catégories
            </NavLink>
            {isAuthenticated && user?.role === 'admin' && (
              <NavLink
                to="/admin"
                className={({ isActive }) => (isActive ? activeClass : normalClass)}
              >
                Admin
              </NavLink>
            )}
            {isAuthenticated && user?.role === 'delivery' && (
              <NavLink
                to="/delivery"
                className={({ isActive }) => (isActive ? activeClass : normalClass)}
              >
                Livraisons
              </NavLink>
            )}
            {isAuthenticated && user?.role === 'client' && (
              <NavLink
                to="/dashboard"
                className={({ isActive }) => (isActive ? activeClass : normalClass)}
              >
                Tableau de bord
              </NavLink>
            )}
          </div>

          {/* Right side - Cart and Auth - stays on right */}
          <div className="hidden md:flex md:items-center md:space-x-3 md:ml-auto">
            {/* Cart Icon */}
            <NavLink
              to="/cart"
              className="relative p-2 text-[#FFF3E0] hover:text-white rounded-md"
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#FFC107] text-[#3E2723] text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-md">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </NavLink>

            {!isAuthenticated ? (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) => (isActive ? activeClass : normalClass)}
                >
                  Connexion
                </NavLink>
                <NavLink
                  to="/register"
                  className={({ isActive }) => (isActive ? activeClass : normalClass)}
                >
                  Inscription
                </NavLink>
              </>
            ) : (
              <>
               
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 bg-[#FFD54F] hover:bg-[#FFC107] rounded-md text-[#3E2723] text-sm font-semibold"
                >
                  Déconnexion
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-[#FFF3E0] hover:text-white hover:bg-[#5D4037] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#FFC107]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-controls="mobile-menu"
            aria-expanded={menuOpen}
          >
            <span className="sr-only">Open main menu</span>
            {menuOpen ? (
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink
              to="/"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) => (isActive ? activeClass : normalClass)}
            >
              Accueil
            </NavLink>
            <NavLink
              to="/products"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) => (isActive ? activeClass : normalClass)}
            >
              Produits
            </NavLink>
            <NavLink
              to="/categories"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) => (isActive ? activeClass : normalClass)}
            >
              Catégories
            </NavLink>
            <NavLink
              to="/cart"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) => (isActive ? activeClass : normalClass) + ' flex items-center gap-2'}
            >
              <ShoppingCart className="h-4 w-4" />
              Panier {totalItems > 0 && `(${totalItems})`}
            </NavLink>
            {isAuthenticated && user?.role === 'admin' && (
              <NavLink
                to="/admin"
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) => (isActive ? activeClass : normalClass)}
              >
                Admin Panel
              </NavLink>
            )}
            {isAuthenticated && user?.role === 'delivery' && (
              <NavLink
                to="/delivery"
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) => (isActive ? activeClass : normalClass)}
              >
                Delivery Panel
              </NavLink>
            )}
            {isAuthenticated && user?.role === 'client' && (
              <NavLink
                to="/dashboard"
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) => (isActive ? activeClass : normalClass)}
              >
                My Products
              </NavLink>
            )}
            {!isAuthenticated ? (
              <>
                <NavLink
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) => (isActive ? activeClass : normalClass)}
                >
                  Connexion
                </NavLink>
                <NavLink
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) => (isActive ? activeClass : normalClass)}
                >
                  Inscription
                </NavLink>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="w-full text-left text-gray-300 hover:text-white px-3 py-2 rounded-md transition bg-red-600 hover:bg-red-700"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
