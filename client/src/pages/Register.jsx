import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'client'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await register(formData.name, formData.email, formData.password, formData.role);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#3E2723] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-[#FFF3E0]/95 ring-1 ring-[#FFD54F]/30 rounded-[2rem] p-8 shadow-[0_30px_60px_rgba(0,0,0,0.18)]">
        <div className="text-center">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-[#3E2723]">
            Inscription à Gros Products
          </h2>
          <p className="mt-2 text-sm text-[#5A3F31]/90">
            Créez votre compte grossiste pour commander en gros et suivre vos livraisons.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-2xl bg-[#FFD54F]/15 border border-[#FFC107]/40 p-4">
              <p className="text-sm text-[#3E2723]">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            <div className="bg-white/90 rounded-2xl px-4 py-4 shadow-sm ring-1 ring-[#3E2723]/10">
              <label htmlFor="name" className="block text-sm font-medium text-[#5A3F31]">
                Nom complet
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="mt-1 block w-full rounded-2xl border border-[#D7CCC8] bg-[#FFF3E0] px-3 py-2 text-[#3E2723] focus:border-[#FFC107] focus:ring-[#FFC107]/60 sm:text-sm"
                placeholder="Votre nom complet"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="bg-white/90 rounded-2xl px-4 py-4 shadow-sm ring-1 ring-[#3E2723]/10">
              <label htmlFor="email" className="block text-sm font-medium text-[#5A3F31]">
                Adresse email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 block w-full rounded-2xl border border-[#D7CCC8] bg-[#FFF3E0] px-3 py-2 text-[#3E2723] focus:border-[#FFC107] focus:ring-[#FFC107]/60 sm:text-sm"
                placeholder="Votre adresse email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="bg-white/90 rounded-2xl px-4 py-4 shadow-sm ring-1 ring-[#3E2723]/10">
              <label htmlFor="role" className="block text-sm font-medium text-[#5A3F31]">
                Rôle
              </label>
              <select
                id="role"
                name="role"
                className="mt-1 block w-full rounded-2xl border border-[#D7CCC8] bg-[#FFF3E0] px-3 py-2 text-[#3E2723] focus:border-[#FFC107] focus:ring-[#FFC107]/60 sm:text-sm cursor-not-allowed"
                value={formData.role}
                onChange={handleChange}
                disabled
              >
                <option value="client">Client (par défaut)</option>
              </select>
              <p className="mt-1 text-xs text-[#5A3F31]/70">
                Les rôles administrateur et livreur sont attribués par l'administrateur après validation.
              </p>
            </div>

            <div className="bg-white/90 rounded-2xl px-4 py-4 shadow-sm ring-1 ring-[#3E2723]/10">
              <label htmlFor="password" className="block text-sm font-medium text-[#5A3F31]">
                Mot de passe
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1 block w-full rounded-2xl border border-[#D7CCC8] bg-[#FFF3E0] px-3 py-2 text-[#3E2723] focus:border-[#FFC107] focus:ring-[#FFC107]/60 sm:text-sm"
                placeholder="Mot de passe (min 6 caractères)"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="bg-white/90 rounded-2xl px-4 py-4 shadow-sm ring-1 ring-[#3E2723]/10">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#5A3F31]">
                Confirmer le mot de passe
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="mt-1 block w-full rounded-2xl border border-[#D7CCC8] bg-[#FFF3E0] px-3 py-2 text-[#3E2723] focus:border-[#FFC107] focus:ring-[#FFC107]/60 sm:text-sm"
                placeholder="Confirmez le mot de passe"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 rounded-3xl bg-[#FFD54F] text-[#3E2723] text-sm font-semibold shadow-lg shadow-[#00000020] transition hover:bg-[#FFC107] disabled:opacity-60"
            >
              {loading ? 'Enregistrement...' : 'Créer un compte'}
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-[#5A3F31]/80">
              Vous avez déjà un compte ?{' '}
              <Link to="/login" className="font-semibold text-[#3E2723] hover:text-[#000]">
                Connectez-vous
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
