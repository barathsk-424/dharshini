import { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiMap, FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const initialAddresses = [
  { id: 1, type: 'Home', name: 'Jane Doe', street: '123 Creative Street, Apt 4B', city: 'Chennai', state: 'Tamil Nadu', zip: '600001', phone: '+91 9876543210', isDefault: true },
];

export default function Addresses() {
  const [addresses, setAddresses] = useState(initialAddresses);

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
          <button className="btn-primary interactive flex items-center gap-2 py-2 px-4 text-sm">
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
              className="glass-card p-6 relative overflow-hidden group"
            >
              {addr.isDefault && (
                <span className="absolute top-0 right-0 bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-bl-lg">
                  Default
                </span>
              )}
              
              <div className="mb-4">
                <span className="inline-block px-2 py-1 rounded bg-white/10 text-xs font-semibold text-gray-300 mb-3">{addr.type}</span>
                <h3 className="font-poppins text-lg font-bold text-white">{addr.name}</h3>
              </div>
              
              <div className="text-sm text-gray-400 space-y-1 mb-6">
                <p>{addr.street}</p>
                <p>{addr.city}, {addr.state} {addr.zip}</p>
                <p className="pt-2 text-gray-300">📞 {addr.phone}</p>
              </div>
              
              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <button className="flex-1 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm font-medium transition-colors interactive flex items-center justify-center gap-2">
                  <FiEdit2 size={14} /> Edit
                </button>
                <button className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors interactive">
                  <FiTrash2 size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
