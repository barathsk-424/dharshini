import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiSettings, FiUser, FiMail, FiPhone, FiCheck } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { submitInquiry } from '../services/supabase';

export default function ProfileSettings() {
  const { currentUser, userData } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  useEffect(() => {
    if (userData || currentUser) {
      setForm({
        name:  userData?.name  || currentUser?.user_metadata?.name  || '',
        email: userData?.email || currentUser?.email || '',
        phone: userData?.phone || '',
      });
    }
  }, [userData, currentUser]);

  const update = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setAvatarPreview(URL.createObjectURL(file));
  };

  const handleRemovePhoto = () => {
    setAvatarPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!currentUser) return;
    setIsSaving(true);
    setError('');

    try {
      // Update customer_profiles table
      const { error: profileErr } = await supabase
        .from('customer_profiles')
        .update({ name: form.name.trim(), phone: form.phone.trim() })
        .eq('id', currentUser.id);

      if (profileErr) throw profileErr;

      // Also update users table
      await supabase
        .from('users')
        .update({ name: form.name.trim(), phone: form.phone.trim() })
        .eq('id', currentUser.id);

      // Update Supabase Auth user_metadata
      await supabase.auth.updateUser({
        data: { name: form.name.trim() }
      });

      if (currentUser?.email) {
        submitInquiry(
          `Activity: ${currentUser.email}`,
          currentUser.email,
          'Updated profile settings (name/phone).'
        );
      }

      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } catch (err) {
      setError(err.message || 'Failed to save profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
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
            {/* Profile Picture */}
            <div className="flex items-center gap-6 mb-8 pb-8 border-b border-white/10">
              <div className="w-20 h-20 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center overflow-hidden flex-shrink-0">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <FiUser size={40} className="text-purple-400" />
                )}
              </div>
              <div>
                <h3 className="font-poppins text-lg font-semibold text-white mb-1">Profile Picture</h3>
                <p className="text-xs text-gray-400 mb-3">Upload a new avatar. Larger images will be resized.</p>
                <div className="flex gap-3">
                  <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
                  <button type="button" onClick={() => fileInputRef.current?.click()} className="text-xs font-semibold px-4 py-2 rounded bg-white/10 hover:bg-white/20 transition-colors interactive">Upload</button>
                  <button type="button" onClick={handleRemovePhoto} className="text-xs font-semibold px-4 py-2 rounded text-red-400 hover:bg-red-500/10 transition-colors interactive">Remove</button>
                </div>
              </div>
            </div>

            {error && (
              <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm">
                ⚠️ {error}
              </div>
            )}

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-2">Full Name</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none flex"><FiUser size={16} /></span>
                  <input type="text" value={form.name} onChange={e => update('name', e.target.value)} required placeholder="Enter your name" className="icon-input w-full" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-2">Email Address</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none flex"><FiMail size={16} /></span>
                  <input type="email" value={form.email} disabled placeholder="Email cannot be changed here" className="icon-input w-full opacity-60 cursor-not-allowed" />
                </div>
                <p className="text-xs text-gray-500 mt-1">Email is managed through authentication</p>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-2">Phone Number</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none flex"><FiPhone size={16} /></span>
                  <input type="tel" value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="+91 81224 59197" className="icon-input w-full" />
                </div>
              </div>
            </div>
            
            {/* Actions */}
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
                <button type="submit" disabled={isSaving} className="btn-primary interactive disabled:opacity-70 flex items-center gap-2">
                  {isSaving ? <><span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" /> Saving...</> : 'Save Changes'}
                </button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
}
