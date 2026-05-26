import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiSettings, FiUser, FiMail, FiPhone, FiCheck } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useUserStore } from '../store/useStore';

export default function ProfileSettings() {
  const { user, setUser } = useUserStore();
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [isSaved, setIsSaved] = useState(false);
  const fileInputRef = useRef(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarPreview(url);
    }
  };

  const handleRemovePhoto = () => {
    setAvatarPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

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
          
          <form onSubmit={handleSave} className="relative z-10">
            {/* Profile Picture Section */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '32px', paddingBottom: '32px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Avatar Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <FiUser size={40} className="text-purple-400" />
                )}
              </div>
              <div>
                <h3 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '18px', fontWeight: 600, color: '#fff', margin: '0 0 4px 0' }}>Profile Picture</h3>
                <p style={{ fontSize: '12px', color: '#9ca3af', margin: '0 0 12px 0' }}>Upload a new avatar. Larger images will be resized.</p>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
                  <button type="button" onClick={() => fileInputRef.current?.click()} className="text-xs font-semibold px-4 py-2 rounded bg-white/10 hover:bg-white/20 transition-colors interactive">Upload</button>
                  <button type="button" onClick={handleRemovePhoto} className="text-xs font-semibold px-4 py-2 rounded text-red-400 hover:bg-red-500/10 transition-colors interactive">Remove</button>
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '24px' }}>
              {/* Full Name */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#d1d5db', marginBottom: '8px' }}>Full Name</label>
                <div style={{ position: 'relative', width: '100%' }}>
                  <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', pointerEvents: 'none', display: 'flex' }}>
                    <FiUser size={16} />
                  </span>
                  <input
                    type="text"
                    value={form.name}
                    onChange={e => update('name', e.target.value)}
                    required
                    placeholder="Enter your name"
                    className="icon-input w-full"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#d1d5db', marginBottom: '8px' }}>Email Address</label>
                <div style={{ position: 'relative', width: '100%' }}>
                  <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', pointerEvents: 'none', display: 'flex' }}>
                    <FiMail size={16} />
                  </span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => update('email', e.target.value)}
                    required
                    placeholder="Enter your email"
                    className="icon-input w-full"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#d1d5db', marginBottom: '8px' }}>Phone Number</label>
                <div style={{ position: 'relative', width: '100%' }}>
                  <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', pointerEvents: 'none', display: 'flex' }}>
                    <FiPhone size={16} />
                  </span>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={e => update('phone', e.target.value)}
                    placeholder="+91 98765 43210"
                    className="icon-input w-full"
                  />
                </div>
              </div>
            </div>
            
            {/* Actions */}
            <div style={{ paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                {isSaved && (
                  <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} style={{ color: '#34d399', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 500 }}>
                    <FiCheck /> Profile updated successfully!
                  </motion.span>
                )}
              </div>
              <div style={{ display: 'flex', gap: '16px' }}>
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
