import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiSettings, FiUser, FiMail, FiPhone, FiCheck } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useUserStore } from '../store/useStore';

export default function ProfileSettings() {
  const { user, setUser } = useUserStore();
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || ''
      });
    }
  }, [user]);

  const update = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleSave = (e) => {
    e.preventDefault();
    setUser({ ...user, ...form });
    
    // Also update users array in localStorage for mock persistence
    const registeredUsers = JSON.parse(localStorage.getItem('dc_users')) || [];
    const updatedUsers = registeredUsers.map(u => u.email === user?.email ? { ...u, ...form } : u);
    localStorage.setItem('dc_users', JSON.stringify(updatedUsers));

    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full min-h-[calc(100vh-180px)] py-12 md:py-20 px-6">
      <Helmet><title>Profile Settings — Dharshini Creations</title></Helmet>
      
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex flex-col mb-8 gap-2">
          <Link to="/auth" className="text-purple-400 hover:text-white transition-colors interactive self-start text-sm font-medium">← Back to Profile</Link>
          <h1 className="font-cinzel text-3xl font-bold glow-text flex items-center gap-3 mt-2">
            <FiSettings className="text-gray-400 flex-shrink-0" /> Account Settings
          </h1>
        </motion.div>

        <motion.div className="glass-card p-6 md:p-10 relative overflow-hidden" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <form onSubmit={handleSave} className="relative z-10 space-y-6">
            <div className="flex items-center gap-6 mb-8 pb-8 border-b border-white/10">
              <div className="w-20 h-20 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                <FiUser size={40} className="text-purple-400" />
              </div>
              <div>
                <h3 className="font-poppins text-lg font-semibold text-white">Profile Picture</h3>
                <p className="text-xs text-gray-400 mt-1">Upload a new avatar. Larger images will be resized.</p>
                <div className="mt-3 flex gap-3">
                  <button type="button" className="text-xs font-semibold px-4 py-2 rounded bg-white/10 hover:bg-white/20 transition-colors interactive">Upload</button>
                  <button type="button" className="text-xs font-semibold px-4 py-2 rounded text-red-400 hover:bg-red-500/10 transition-colors interactive">Remove</button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-semibold block mb-2 text-gray-300">Full Name</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none flex items-center justify-center"><FiUser size={18} /></div>
                  <input type="text" value={form.name} onChange={e => update('name', e.target.value)} required className="w-full pr-4 py-3 rounded-xl text-sm bg-white/5 border outline-none focus:border-purple-500 transition-colors placeholder-gray-600" style={{ borderColor: 'var(--color-border-strong)', color: '#F5F5F5', paddingLeft: '2.75rem' }} />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold block mb-2 text-gray-300">Email Address</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none flex items-center justify-center"><FiMail size={18} /></div>
                  <input type="email" value={form.email} onChange={e => update('email', e.target.value)} required className="w-full pr-4 py-3 rounded-xl text-sm bg-white/5 border outline-none focus:border-purple-500 transition-colors placeholder-gray-600" style={{ borderColor: 'var(--color-border-strong)', color: '#F5F5F5', paddingLeft: '2.75rem' }} />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold block mb-2 text-gray-300">Phone Number</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none flex items-center justify-center"><FiPhone size={18} /></div>
                  <input type="tel" value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="+91 98765 43210" className="w-full pr-4 py-3 rounded-xl text-sm bg-white/5 border outline-none focus:border-purple-500 transition-colors placeholder-gray-600" style={{ borderColor: 'var(--color-border-strong)', color: '#F5F5F5', paddingLeft: '2.75rem' }} />
                </div>
              </div>
            </div>
            
            <div className="pt-6 border-t border-white/10 flex items-center justify-between">
              <div>
                {isSaved && (
                  <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-emerald-400 text-sm flex items-center gap-2 font-medium">
                    <FiCheck /> Profile updated successfully!
                  </motion.span>
                )}
              </div>
              <div className="flex gap-4">
                <Link to="/auth" className="btn-ghost interactive">Cancel</Link>
                <button type="submit" className="btn-primary interactive">Save Changes</button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
}
