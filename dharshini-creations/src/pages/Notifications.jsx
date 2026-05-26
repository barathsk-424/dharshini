import { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiBell, FiGift, FiTruck, FiInfo } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const initialNotifications = [
  { id: 1, type: 'promo', title: 'Flash Sale! 🎉', desc: 'Get 20% off on all Combo Works this weekend only. Use code COMBO20 at checkout.', date: '2 hours ago', icon: FiGift, color: 'text-amber-400', bg: 'bg-amber-500/10', unread: true },
  { id: 2, type: 'order', title: 'Order Shipped', desc: 'Good news! Your order DC-003 has been shipped and is on its way to you.', date: 'Yesterday', icon: FiTruck, color: 'text-emerald-400', bg: 'bg-emerald-500/10', unread: true },
  { id: 3, type: 'system', title: 'Welcome to Dharshini Creations', desc: 'Thank you for joining our community! Explore our handcrafted collections.', date: 'May 10', icon: FiInfo, color: 'text-blue-400', bg: 'bg-blue-500/10', unread: false },
];

export default function Notifications() {
  const [notifs, setNotifs] = useState(initialNotifications);

  const markAllAsRead = () => {
    setNotifs(notifs.map(n => ({ ...n, unread: false })));
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full min-h-[calc(100vh-180px)] py-12 md:py-20 px-6">
      <Helmet><title>Notifications — Dharshini Creations</title></Helmet>
      
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Link to="/auth" className="text-purple-400 hover:text-white transition-colors interactive">← Back</Link>
            <h1 className="font-cinzel text-3xl font-bold glow-text flex items-center gap-3">
              <FiBell className="text-amber-400" /> Notifications
            </h1>
          </div>
          <button onClick={markAllAsRead} className="text-sm text-gray-400 hover:text-white transition-colors interactive">Mark all as read</button>
        </motion.div>

        <motion.div className="glass-card p-4 md:p-6 relative overflow-hidden" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-3">
            {notifs.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + (i * 0.05) }}
                  className={`p-4 rounded-xl border flex gap-4 transition-colors ${item.unread ? 'bg-white/[0.05] border-white/20' : 'bg-transparent border-white/5'}`}
                >
                  <div className={`w-12 h-12 rounded-full ${item.bg} flex items-center justify-center flex-shrink-0`}>
                    <Icon className={item.color} size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className={`font-poppins text-sm ${item.unread ? 'font-bold text-white' : 'font-semibold text-gray-300'}`}>{item.title}</h4>
                      <span className="text-[10px] text-gray-400 whitespace-nowrap ml-2">{item.date}</span>
                    </div>
                    <p className={`text-sm ${item.unread ? 'text-gray-300' : 'text-gray-400'}`}>{item.desc}</p>
                  </div>
                  {item.unread && (
                    <div className="w-2 h-2 rounded-full bg-amber-400 mt-2 flex-shrink-0 shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
