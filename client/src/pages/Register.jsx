import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserPlus, Mail, Lock, User, Loader2, Eye, EyeOff } from 'lucide-react';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', confirmPassword: '', role: 'client'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (formData.password !== formData.confirmPassword) { setError('Les mots de passe ne correspondent pas'); return; }
    if (formData.password.length < 6) { setError('Le mot de passe doit contenir au moins 6 caractères'); return; }
    setLoading(true);
    try {
      await register(formData.name, formData.email, formData.password, formData.role);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || "Échec de l'inscription.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 bg-gradient-to-br from-gray-50 via-white to-primary-50/30">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-primary/20">
              <UserPlus className="h-7 w-7 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Inscription</h2>
            <p className="text-gray-400 mt-1.5 text-sm">
              Créez votre compte grossiste
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              </div>
            )}

            {[
              { id: 'name', label: 'Nom complet', icon: User, type: 'text', placeholder: 'Votre nom complet' },
              { id: 'email', label: 'Adresse email', icon: Mail, type: 'email', placeholder: 'votre@email.com' },
            ].map(f => (
              <div key={f.id}>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">{f.label}</label>
                <div className="relative">
                  <f.icon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300" />
                  <input
                    type={f.type} name={f.id} value={formData[f.id]} onChange={handleChange}
                    required placeholder={f.placeholder}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all"
                  />
                </div>
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Rôle</label>
              <select name="role" value={formData.role} disabled
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-500 cursor-not-allowed">
                <option value="client">Client (par défaut)</option>
              </select>
              <p className="text-xs text-gray-400 mt-1.5">Les rôles admin et livreur sont attribués par l'administrateur.</p>
            </div>

            {[
              { id: 'password', label: 'Mot de passe', placeholder: 'Min 6 caractères' },
              { id: 'confirmPassword', label: 'Confirmer le mot de passe', placeholder: 'Confirmez' },
            ].map(f => (
              <div key={f.id}>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">{f.label}</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300" />
                  <input
                    type={showPassword ? 'text' : 'password'} name={f.id} value={formData[f.id]}
                    onChange={handleChange} required placeholder={f.placeholder}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all"
                  />
                </div>
              </div>
            ))}

            <div className="flex items-center gap-2">
              <input type="checkbox" id="showPass" checked={showPassword} onChange={() => setShowPassword(!showPassword)}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
              <label htmlFor="showPass" className="text-xs text-gray-400">Afficher les mots de passe</label>
            </div>

            <button type="submit" disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-xl hover:from-primary-dark hover:to-primary-dark transition-all shadow-lg shadow-primary/20 disabled:opacity-60 flex items-center justify-center gap-2">
              {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Inscription...</> : 'Créer un compte'}
            </button>

            <p className="text-center text-sm text-gray-400">
              Vous avez déjà un compte ?{' '}
              <Link to="/login" className="font-semibold text-primary hover:text-primary-dark">Connectez-vous</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
