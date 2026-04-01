import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const activeClass = 'text-white bg-blue-600 rounded-md px-3 py-2';
const normalClass = 'text-gray-300 hover:text-white px-3 py-2 rounded-md';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const roleLabel = user ? user.role.toUpperCase() : null;

  return (
    <nav className="bg-slate-900 text-slate-100 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <NavLink to="/" className="flex items-center gap-3 hover:opacity-90">
            <div className="bg-blue-600 p-2 rounded-lg shadow-md">
              <span className="text-white font-bold text-xl">G</span>
            </div>
            <div>
              <span className="text-white font-bold text-xl tracking-tight">Gros Products</span>
              <p className="text-xs text-slate-400">Grossiste alimentaire Maroc</p>
            </div>
          </NavLink>

          <div className="hidden md:flex md:items-center md:space-x-2">
            <NavLink to="/" className={({ isActive }) => (isActive ? activeClass : normalClass)}>
              Home
            </NavLink>
            {isAuthenticated && user?.role === 'admin' && (
              <NavLink
                to="/admin"
                className={({ isActive }) => (isActive ? activeClass : normalClass)}
              >
                Admin Panel
              </NavLink>
            )}
            {isAuthenticated && user?.role === 'delivery' && (
              <NavLink
                to="/delivery"
                className={({ isActive }) => (isActive ? activeClass : normalClass)}
              >
                Delivery Panel
              </NavLink>
            )}
            {isAuthenticated && user?.role === 'client' && (
              <NavLink
                to="/dashboard"
                className={({ isActive }) => (isActive ? activeClass : normalClass)}
              >
                My Products
              </NavLink>
            )}
          </div>

          <div className="hidden md:flex items-center gap-2">
            {!isAuthenticated ? (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) => (isActive ? activeClass : normalClass)}
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className={({ isActive }) => (isActive ? activeClass : normalClass)}
                >
                  Register
                </NavLink>
              </>
            ) : (
              <>
                <span className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-md text-sm text-slate-300">
                  {roleLabel}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 bg-red-600 hover:bg-red-700 rounded-md text-white text-sm"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
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
              Home
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
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) => (isActive ? activeClass : normalClass)}
                >
                  Register
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
