// src/pages/Auth.jsx

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiUser, FiMail, FiLock, FiArrowRight, FiLogOut, FiShoppingBag } from 'react-icons/fi';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useUserStore, useOrderStore } from '../store/useStore';
import auth from '../services/auth';
import AccountMenu from '../components/Layout/AccountMenu';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const { user, isAuthenticated, setUser, logout } = useUserStore();
  const { orders } = useOrderStore();
  const navigate = useNavigate();
  const location = useLocation();

  const update = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const registeredUsers = JSON.parse(localStorage.getItem('dc_users')) || [];

    if (isLogin) {
      // SIGN IN using auth service
      try {
        const result = await auth.login({ email: form.email, password: form.password });
        setUser({ name: result.user.email.split('@')[0], email: result.user.email });
        const from = location.state?.from || '/';
        navigate(from);
      } catch (err) {
        setError(err.message || 'Login failed');
      }
    } else {
      // SIGN UP – mock registration
      const userExists = registeredUsers.some(u => u.email.toLowerCase() === form.email.toLowerCase());
      if (userExists) {
        setError('Email address already registered. Please sign in.');
        return;
      }
      const newUser = { name: form.name, email: form.email, password: form.password };
      const updatedUsers = [...registeredUsers, newUser];
      localStorage.setItem('dc_users', JSON.stringify(updatedUsers));

      const result = await auth.signup(newUser);
      setUser({ name: newUser.name, email: newUser.email });
      const from = location.state?.from || '/';
      navigate(from);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setForm({ name: '', email: '', password: '' });
  };

  // If user is logged in, show the profile dashboard
  if (isAuthenticated) {
    const handleLogout = () => {
      logout();
      auth.logout();
      navigate('/auth');
    };
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="w-full min-h-[calc(100vh-180px)] flex items-center justify-center py-12 md:py-20 px-6"
        style={{ background: 'radial-gradient(circle at 50% -20%, rgba(138,43,226,0.15), transparent 60%)' }}
      >
        <Helmet><title>My Profile — Dharshini Creations</title></Helmet>
        <div className="w-full max-w-4xl animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left: User Profile Summary Card */}
            <div className="md:col-span-1">
              <motion.div
                className="glass-card p-6 md:p-8 relative overflow-hidden h-full flex flex-col justify-between"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="relative z-10 text-center">
                  <div className="w-20 h-20 mx-auto bg-purple-500/10 border border-purple-500/20 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(138,43,226,0.2)]">
                    <FiUser size={40} className="text-purple-400" />
                  </div>
                  <h2 className="font-cinzel text-xl font-bold text-white mb-1 truncate">{user?.name}</h2>
                  <p className="text-xs text-purple-400 font-semibold mb-6 truncate">{user?.email}</p>
                  <div className="border-t border-white/10 pt-6 text-left space-y-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">Account Status:</span>
                      <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">Active</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">Total Orders:</span>
                      <span className="text-white font-bold">{orders.length}</span>
                    </div>
                  </div>
                  <button onClick={handleLogout} className="btn-ghost w-full interactive flex items-center justify-center gap-2 mt-8 py-3.5 border-purple-500/30 text-purple-400 hover:text-white">
                    <FiLogOut size={16} /> Log Out
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Right: Order History Card + Account Menu */}
            <div className="md:col-span-2">
              <motion.div
                className="glass-card p-6 md:p-8 relative overflow-hidden h-full"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
                <h2 className="font-cinzel text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4 glow-text">Order History</h2>
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                  {orders.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-12 h-12 mx-auto rounded-full bg-white/5 flex items-center justify-center mb-4">
                        <FiShoppingBag className="text-gray-400" size={20} />
                      </div>
                      <p className="text-sm text-gray-400">You haven't placed any orders yet.</p>
                      <Link to="/shop" className="btn-primary mt-6 btn-sm interactive">Start Shopping</Link>
                    </div>
                  ) : (
                    orders.map(order => (
                      <div key={order.id} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="text-left">
                          <div className="flex items-center gap-3">
                            <span className="font-cinzel font-bold text-white text-sm">{order.id}</span>
                            <span className="text-xs text-gray-400">• {order.date}</span>
                          </div>
                          <p className="text-xs text-gray-400 mt-1 line-clamp-1 max-w-md">
                            {Array.isArray(order.items) ? order.items.map(i => `${i.name} × ${i.quantity}`).join(', ') : order.items}
                          </p>
                          <span className="font-cinzel text-sm font-bold text-purple-300 block mt-2">₹{order.total}</span>
                        </div>
                        <div className="flex items-center justify-between md:justify-end gap-4">
                          <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded" style={{ background: order.status === 'delivered' ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)', color: order.status === 'delivered' ? 'var(--color-success)' : 'var(--color-gold)' }}>{order.status}</span>
                          <Link to="/track-order" className="text-xs text-purple-400 hover:text-purple-300 font-semibold interactive">Track</Link>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                {/* Account navigation menu */}
                <AccountMenu />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full min-h-[calc(100vh-180px)] flex items-center justify-center py-12 md:py-20 px-6" style={{ background: 'radial-gradient(circle at 50% -20%, rgba(138,43,226,0.15), transparent 60%)' }}>
      <Helmet><title>{isLogin ? 'Sign In' : 'Create Account'} — Dharshini Creations</title></Helmet>
      <div className="w-full max-w-md animate-fade-in">
        <motion.div className="glass-card p-8 md:p-10 relative overflow-hidden" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
          {/* Decorative elements */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 text-center mb-8">
            <div className="w-16 h-16 mx-auto bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(138,43,226,0.3)]">
              <FiUser size={30} color="var(--color-purple-glow)" />
            </div>
            <h1 className="font-cinzel text-3xl font-bold mb-2 glow-text" style={{ background: 'linear-gradient(135deg, var(--color-white), var(--color-purple-glow))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{isLogin ? 'Welcome Back' : 'Join Us'}</h1>
            <p className="text-sm" style={{ color: 'var(--color-gray-dark)' }}>{isLogin ? 'Sign in to access your custom orders and wishlist' : 'Create an account to start your journey with us'}</p>
          </div>
          <form onSubmit={handleSubmit} className="relative z-10">
            {error && (
              <div className="mb-5 p-3.5 rounded-xl border border-red-500/20 bg-red-500/10 text-red-300 text-xs font-semibold text-center">⚠️ {error}</div>
            )}
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div key="name-input" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden mb-5">
                  <label className="text-xs font-semibold block mb-2" style={{ color: '#E5E7EB' }}>Full Name</label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400 z-10 pointer-events-none"><FiUser size={16} /></div>
                    <input type="text" value={form.name} onChange={e => update('name', e.target.value)} placeholder="Jane Doe" required={!isLogin} className="w-full pl-11 pr-4 py-3 rounded-xl text-sm border outline-none focus:border-purple-500 transition-colors placeholder-gray-600" style={{ borderColor: 'var(--color-border-strong)', color: '#F5F5F5', background: 'rgba(255,255,255,0.05)', WebkitBoxShadow: '0 0 0 1000px rgba(12,8,22,0.9) inset', WebkitTextFillColor: '#F5F5F5' }} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="mb-5">
              <label className="text-xs font-semibold block mb-2" style={{ color: '#E5E7EB' }}>Email Address</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400 z-10 pointer-events-none"><FiMail size={16} /></div>
                <input type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="jane@example.com" required className="w-full pl-11 pr-4 py-3 rounded-xl text-sm border outline-none focus:border-purple-500 transition-colors placeholder-gray-600" style={{ borderColor: 'var(--color-border-strong)', color: '#F5F5F5', background: 'rgba(255,255,255,0.05)', WebkitBoxShadow: '0 0 0 1000px rgba(12,8,22,0.9) inset', WebkitTextFillColor: '#F5F5F5' }} />
              </div>
            </div>
            <div className="mb-5">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold block" style={{ color: '#E5E7EB' }}>Password</label>
                {isLogin && (<a href="#" className="text-xs hover:text-purple-400 transition-colors" style={{ color: 'var(--color-purple-glow)' }}>Forgot?</a>)}
              </div>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400 z-10 pointer-events-none"><FiLock size={16} /></div>
                <input type="password" value={form.password} onChange={e => update('password', e.target.value)} placeholder="••••••••" required className="w-full pl-11 pr-4 py-3 rounded-xl text-sm border outline-none focus:border-purple-500 transition-colors placeholder-gray-600" style={{ borderColor: 'var(--color-border-strong)', color: '#F5F5F5', background: 'rgba(255,255,255,0.05)', WebkitBoxShadow: '0 0 0 1000px rgba(12,8,22,0.9) inset', WebkitTextFillColor: '#F5F5F5' }} />
              </div>
            </div>
            <button type="submit" className="btn-primary w-full interactive flex items-center justify-center gap-2 mt-4 py-3.5 shadow-[0_0_20px_rgba(138,43,226,0.3)]">{isLogin ? 'Sign In' : 'Create Account'} <FiArrowRight size={18} /></button>
          </form>
          <div className="mt-8 text-center relative z-10">
            <p className="text-sm" style={{ color: 'var(--color-gray-dark)' }}>{isLogin ? "Don't have an account? " : "Already have an account? "}<button onClick={toggleMode} className="font-semibold hover:text-white transition-colors" style={{ color: 'var(--color-purple-glow)' }}>{isLogin ? 'Sign up' : 'Sign in'}</button></p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
