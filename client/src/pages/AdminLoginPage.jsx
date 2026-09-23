import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { adminLogin } from '../services/api';
import SucreLogo from '../assets/SucreLogo';
import { Lock, Shield, AlertCircle } from 'lucide-react';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { loginAdmin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await adminLogin({ username, password });
      if (res.data.success) {
        loginAdmin(res.data.token, res.data.admin);
        navigate('/admin/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full bg-cathedral-card border border-gold-500/30 rounded-3xl p-8 space-y-6 shadow-cathedral-card">
        <div className="text-center space-y-3">
          <SucreLogo className="h-28 md:h-36 mx-auto" />
          <div className="text-xs uppercase font-bold tracking-widest text-gold-400">
            Protected Admin Portal
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="space-y-1.5">
            <label className="font-semibold text-cathedral-ivory">Admin Username</label>
            <input
              type="text"
              required
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-cathedral-elevated border border-cathedral-border text-cathedral-ivory placeholder:text-cathedral-muted/50 focus:border-gold-400 focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-semibold text-cathedral-ivory">Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-cathedral-elevated border border-cathedral-border text-cathedral-ivory placeholder:text-cathedral-muted/50 focus:border-gold-400 focus:outline-none"
            />
          </div>



          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-full bg-gold-gradient text-cathedral-bg font-bold text-xs uppercase tracking-widest hover:brightness-110 transition-all shadow-md flex items-center justify-center gap-2"
          >
            <Lock className="w-4 h-4" />
            {loading ? 'Authenticating...' : 'Sign In to Admin Portal'}
          </button>
        </form>
      </div>
    </div>
  );
}
