import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiMap, FiPlus, FiEdit2, FiTrash2, FiX, FiCheck, FiAlertCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { submitInquiry } from '../services/supabase';

const initialAddresses = [
  { id: 1, type: 'Home', name: 'Jane Doe', street: '123 Creative Street, Apt 4B', city: 'Chennai', state: 'Tamil Nadu', zip: '600001', phone: '+91 81224 59197', isDefault: true },
];

function loadSavedAddresses() {
  try {
    const parsed = JSON.parse(localStorage.getItem('dc_saved_addresses') || 'null');
    return Array.isArray(parsed) ? parsed : initialAddresses;
  } catch {
    return initialAddresses;
  }
}

export default function Addresses() {
  const [addresses, setAddresses] = useState(loadSavedAddresses);
  const { currentUser } = useAuth();

  const persistAddresses = (next) => {
    setAddresses(next);
    try {
      localStorage.setItem('dc_saved_addresses', JSON.stringify(next));
    } catch {
      // non-fatal local storage failure
    }
  };
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const [formData, setFormData] = useState({
    type: 'Home', name: '', street: '', city: 'Chennai', state: 'Tamil Nadu', zip: '', phone: ''
  });

  const openAddModal = () => {
    setCurrentEditId(null);
    setFormData({ type: 'Home', name: '', street: '', city: 'Chennai', state: 'Tamil Nadu', zip: '', phone: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (addr) => {
    setCurrentEditId(addr.id);
    setFormData({ ...addr });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (currentEditId !== null) {
      persistAddresses(addresses.map(a => a.id === currentEditId ? { ...formData, id: currentEditId, isDefault: a.isDefault } : a));
    } else {
      const newId = Math.max(0, ...addresses.map(a => a.id)) + 1;
      persistAddresses([...addresses, { ...formData, id: newId, isDefault: addresses.length === 0 }]);
    }

    if (currentUser?.email) {
      submitInquiry(
        `Activity: ${currentUser.email}`,
        currentUser.email,
        `${currentEditId ? 'Updated' : 'Added'} address (${formData.type}) in account settings.`
      );
    }
    closeModal();
  };

  const confirmDelete = () => {
    persistAddresses(addresses.filter(a => a.id !== deleteId));
    if (currentUser?.email) {
      submitInquiry(
        `Activity: ${currentUser.email}`,
        currentUser.email,
        'Deleted a saved address in account settings.'
      );
    }
    setDeleteId(null);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full min-h-[calc(100vh-180px)] py-12 md:py-20 px-6">
      <Helmet><title>Saved Addresses — Dharshini Creations</title></Helmet>
      
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Link to="/auth" className="text-purple-400 hover:text-white transition-colors interactive">← Back to Profile</Link>
            <h1 className="font-cinzel text-3xl font-bold glow-text flex items-center gap-3">
              <FiMap className="text-emerald-400" /> Saved Addresses
            </h1>
          </div>
          <button onClick={openAddModal} className="btn-primary interactive flex items-center gap-2 py-2 px-4 text-sm shadow-[0_0_15px_rgba(168,85,247,0.4)]">
            <FiPlus /> Add New Address
          </button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map((addr, i) => (
            <motion.div 
              key={addr.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + (i * 0.1) }}
              className="glass-card p-6 relative overflow-hidden group hover:border-purple-500/30 transition-all duration-300"
            >
              {addr.isDefault && (
                <span className="absolute top-0 right-0 bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-bl-lg shadow-sm">
                  Default
                </span>
              )}
              
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-gray-200 mb-3 shadow-inner">{addr.type}</span>
                  <h3 className="font-poppins text-lg font-bold text-white tracking-wide">{addr.name}</h3>
                </div>
              </div>
              
              <div className="text-sm text-gray-400 space-y-1.5 mb-6">
                <p className="text-gray-300">{addr.street}</p>
                <p>{addr.city}, {addr.state} {addr.zip}</p>
                <p className="pt-2 text-gray-300 flex items-center gap-2">
                  <span className="text-emerald-400">📞</span> {addr.phone}
                </p>
              </div>
              
              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <button onClick={() => openEditModal(addr)} className="flex-1 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm font-medium transition-all interactive flex items-center justify-center gap-2 text-gray-300 hover:text-white">
                  <FiEdit2 size={14} /> Edit
                </button>
                <button onClick={() => setDeleteId(addr.id)} className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all interactive shadow-sm">
                  <FiTrash2 size={16} />
                </button>
              </div>
            </motion.div>
          ))}
          
          {addresses.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full py-12 text-center border border-dashed border-white/20 rounded-2xl bg-white/5">
              <FiMap className="mx-auto text-4xl text-gray-500 mb-4" />
              <h3 className="text-xl font-cinzel text-white mb-2">No Saved Addresses</h3>
              <p className="text-gray-400 mb-6 text-sm">Add an address for a quicker checkout experience.</p>
              <button onClick={openAddModal} className="btn-primary interactive">Add Address Now</button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Modern Modal Overlay for Add/Edit */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20, opacity: 0 }} 
              animate={{ scale: 1, y: 0, opacity: 1 }} 
              exit={{ scale: 0.95, y: 20, opacity: 0 }} 
              className="glass-card w-full max-w-lg p-6 relative overflow-hidden shadow-2xl"
            >
              <div className="absolute -top-32 -right-32 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
              
              <div className="flex justify-between items-center mb-6 relative z-10">
                <h2 className="font-cinzel text-2xl font-bold text-white">
                  {currentEditId ? 'Edit Address' : 'Add New Address'}
                </h2>
                <button onClick={closeModal} className="text-gray-400 hover:text-white transition-colors p-1 rounded-md hover:bg-white/10">
                  <FiX size={24} />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4 relative z-10">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 sm:col-span-1">
                    <label className="text-xs font-semibold block mb-1 text-gray-300">Address Type</label>
                    <select 
                      value={formData.type} 
                      onChange={e => setFormData({...formData, type: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl text-sm bg-white/5 border border-white/10 outline-none focus:border-purple-500 transition-colors text-white appearance-none"
                    >
                      <option value="Home" className="bg-gray-900">Home</option>
                      <option value="Work" className="bg-gray-900">Work</option>
                      <option value="Other" className="bg-gray-900">Other</option>
                    </select>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="text-xs font-semibold block mb-1 text-gray-300">Full Name</label>
                    <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 rounded-xl text-sm bg-white/5 border border-white/10 outline-none focus:border-purple-500 transition-colors text-white placeholder-gray-500" placeholder="Jane Doe" />
                  </div>
                  <div className="col-span-2">
                    <label className="text-xs font-semibold block mb-1 text-gray-300">Street Address</label>
                    <input required type="text" value={formData.street} onChange={e => setFormData({...formData, street: e.target.value})} className="w-full px-4 py-3 rounded-xl text-sm bg-white/5 border border-white/10 outline-none focus:border-purple-500 transition-colors text-white placeholder-gray-500" placeholder="123 Creative Street, Apt 4B" />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="text-xs font-semibold block mb-1 text-gray-300">City</label>
                    <input required type="text" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} className="w-full px-4 py-3 rounded-xl text-sm bg-white/5 border border-white/10 outline-none focus:border-purple-500 transition-colors text-white placeholder-gray-500" placeholder="City" />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="text-xs font-semibold block mb-1 text-gray-300">State / Province</label>
                    <input required type="text" value={formData.state} onChange={e => setFormData({...formData, state: e.target.value})} className="w-full px-4 py-3 rounded-xl text-sm bg-white/5 border border-white/10 outline-none focus:border-purple-500 transition-colors text-white placeholder-gray-500" placeholder="State" />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="text-xs font-semibold block mb-1 text-gray-300">Postal Code</label>
                    <input required type="text" value={formData.zip} onChange={e => setFormData({...formData, zip: e.target.value})} className="w-full px-4 py-3 rounded-xl text-sm bg-white/5 border border-white/10 outline-none focus:border-purple-500 transition-colors text-white placeholder-gray-500" placeholder="123456" />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="text-xs font-semibold block mb-1 text-gray-300">Phone Number</label>
                    <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-3 rounded-xl text-sm bg-white/5 border border-white/10 outline-none focus:border-purple-500 transition-colors text-white placeholder-gray-500" placeholder="+91 81224 59197" />
                  </div>
                </div>
                
                <div className="pt-6 flex items-center justify-end gap-4 border-t border-white/10 mt-2">
                  <button type="button" onClick={closeModal} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-300 hover:text-white hover:bg-white/10 transition-colors">
                    Cancel
                  </button>
                  <button type="submit" className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-purple-500 text-white hover:bg-purple-600 transition-colors shadow-lg shadow-purple-500/30 flex items-center gap-2">
                    <FiCheck /> {currentEditId ? 'Update Address' : 'Save Address'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteId && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.95, opacity: 0 }} 
              className="glass-card max-w-sm w-full p-6 text-center border border-red-500/20"
            >
              <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4 border border-red-500/20">
                <FiAlertCircle className="text-red-400 text-3xl" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 font-poppins">Delete Address?</h3>
              <p className="text-sm text-gray-400 mb-6">This action cannot be undone. Are you sure you want to remove this address permanently?</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-colors">
                  Keep It
                </button>
                <button onClick={confirmDelete} className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 shadow-lg shadow-red-500/30 transition-colors">
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
