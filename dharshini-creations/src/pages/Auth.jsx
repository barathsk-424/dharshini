import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiUser, FiMail, FiLock, FiArrowRight } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/useStore';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const setUser = useUserStore(s => s.setUser);
  const navigate = useNavigate();

  const update = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock authentication
    setUser({ name: form.name || 'User', email: form.email });
    navigate(-1); // Go back to the previous page (like checkout or product)
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setForm({ name: '', email: '', password: '' });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen pt-32 pb-20 flex items-center justify-center px-6" style={{ background: 'radial-gradient(circle at 50% -20%, rgba(138,43,226,0.15), transparent 60%)' }}>
      <Helmet><title>{isLogin ? 'Sign In' : 'Create Account'} — Dharshini Creations</title></Helmet>
      
      <div className="w-full max-w-md">
        <motion.div 
          className="glass-card p-8 md:p-10 relative overflow-hidden"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Decorative elements */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 text-center mb-8">
            <div className="w-16 h-16 mx-auto bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(138,43,226,0.3)]">
              <FiUser size={30} color="var(--color-purple-glow)" />
            </div>
            <h1 className="font-cinzel text-3xl font-bold mb-2 glow-text" style={{ background: 'linear-gradient(135deg, var(--color-white), var(--color-purple-glow))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {isLogin ? 'Welcome Back' : 'Join Us'}
            </h1>
            <p className="text-sm" style={{ color: 'var(--color-gray-dark)' }}>
              {isLogin ? 'Sign in to access your custom orders and wishlist' : 'Create an account to start your journey with us'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="relative z-10 space-y-5">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  key="name-input"
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginTop: '1.25rem' }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <label className="text-xs font-semibold block mb-2" style={{ color: '#E5E7EB' }}>Full Name</label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      <FiUser size={18} />
                    </div>
                    <input 
                      type="text" 
                      value={form.name} 
                      onChange={e => update('name', e.target.value)} 
                      placeholder="Jane Doe"
                      required={!isLogin}
                      className="w-full pl-11 pr-4 py-3 rounded-xl text-sm bg-white/5 border outline-none focus:border-purple-500 transition-colors placeholder-gray-600" 
                      style={{ borderColor: 'var(--color-border-strong)', color: '#F5F5F5' }} 
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label className="text-xs font-semibold block mb-2" style={{ color: '#E5E7EB' }}>Email Address</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <FiMail size={18} />
                </div>
                <input 
                  type="email" 
                  value={form.email} 
                  onChange={e => update('email', e.target.value)} 
                  placeholder="jane@example.com"
                  required
                  className="w-full pl-11 pr-4 py-3 rounded-xl text-sm bg-white/5 border outline-none focus:border-purple-500 transition-colors placeholder-gray-600" 
                  style={{ borderColor: 'var(--color-border-strong)', color: '#F5F5F5' }} 
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold block" style={{ color: '#E5E7EB' }}>Password</label>
                {isLogin && (
                  <a href="#" className="text-xs hover:text-purple-400 transition-colors" style={{ color: 'var(--color-purple-glow)' }}>Forgot?</a>
                )}
              </div>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <FiLock size={18} />
                </div>
                <input 
                  type="password" 
                  value={form.password} 
                  onChange={e => update('password', e.target.value)} 
                  placeholder="••••••••"
                  required
                  className="w-full pl-11 pr-4 py-3 rounded-xl text-sm bg-white/5 border outline-none focus:border-purple-500 transition-colors placeholder-gray-600" 
                  style={{ borderColor: 'var(--color-border-strong)', color: '#F5F5F5' }} 
                />
              </div>
            </div>

            <button type="submit" className="btn-primary w-full interactive flex items-center justify-center gap-2 mt-8 py-3.5 shadow-[0_0_20px_rgba(138,43,226,0.3)]">
              {isLogin ? 'Sign In' : 'Create Account'} <FiArrowRight size={18} />
            </button>
          </form>

          <div className="mt-8 text-center relative z-10">
            <p className="text-sm" style={{ color: 'var(--color-gray-dark)' }}>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button onClick={toggleMode} className="font-semibold hover:text-white transition-colors" style={{ color: 'var(--color-purple-glow)' }}>
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
