import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#3E2723] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-[#FFF3E0]/95 ring-1 ring-[#FFD54F]/30 rounded-[2rem] p-8 shadow-[0_30px_60px_rgba(0,0,0,0.18)]">
        <div className="text-center">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-[#3E2723]">
            Connexion à Gros Products
          </h2>
          <p className="mt-2 text-sm text-[#5A3F31]/90">
            Accédez à votre espace grossiste pour gérer vos commandes et vos stocks.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-2xl bg-[#FFD54F]/15 border border-[#FFC107]/40 p-4">
              <p className="text-sm text-[#3E2723]">{error}</p>
            </div>
          )}

          <div className="rounded-[1.5rem] shadow-sm overflow-hidden ring-1 ring-[#3E2723]/10">
            <div className="bg-white/90 px-4 py-3">
              <label htmlFor="email" className="block text-sm font-medium text-[#5A3F31]">
                Adresse email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1 block w-full rounded-2xl border border-[#D7CCC8] bg-[#FFF3E0] px-3 py-2 text-[#3E2723] shadow-sm focus:border-[#FFC107] focus:ring-[#FFC107]/60 sm:text-sm"
                placeholder="votre email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="bg-white/90 px-4 py-3">
              <label htmlFor="password" className="block text-sm font-medium text-[#5A3F31]">
                Mot de passe
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="mt-1 block w-full rounded-2xl border border-[#D7CCC8] bg-[#FFF3E0] px-3 py-2 text-[#3E2723] shadow-sm focus:border-[#FFC107] focus:ring-[#FFC107]/60 sm:text-sm"
                placeholder="mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 rounded-3xl bg-[#FFD54F] text-[#3E2723] text-sm font-semibold shadow-lg shadow-[#00000020] transition hover:bg-[#FFC107] disabled:opacity-60"
            >
              {loading ? 'Connexion en cours...' : 'Se connecter'}
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-[#5A3F31]/80">
              Pas encore de compte ?{' '}
              <Link to="/register" className="font-semibold text-[#3E2723] hover:text-[#000]">
                Créez-en un
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
