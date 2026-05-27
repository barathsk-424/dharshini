import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiShoppingBag, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useOrderStore } from '../store/useStore';
import { useAuth } from '../context/AuthContext';
import { fetchUserOrders } from '../services/supabase';

export default function Orders() {
  const localOrders = useOrderStore(s => s.orders);
  const setOrders   = useOrderStore(s => s.setOrders);
  const { currentUser } = useAuth();
  const [orders, setLocalOrders] = useState(localOrders);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      setLocalOrders(localOrders);
      setIsLoading(false);
      return;
    }
    fetchUserOrders(currentUser.id).then(data => {
      if (data && data.length > 0) {
        // Normalise for display
        const normalised = data.map(o => ({
          ...o,
          date:   new Date(o.created_at).toLocaleDateString('en-IN'),
          status: o.status,
        }));
        setLocalOrders(normalised);
        setOrders(normalised);
      } else {
        setLocalOrders(localOrders);
      }
      setIsLoading(false);
    });
  }, [currentUser]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full min-h-[calc(100vh-180px)] py-12 md:py-20 px-6">
      <Helmet><title>My Orders — Dharshini Creations</title></Helmet>
      
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex items-center gap-4 mb-8">
          <Link to="/auth" className="text-purple-400 hover:text-white transition-colors interactive">← Back to Profile</Link>
          <h1 className="font-cinzel text-3xl font-bold glow-text">My Orders</h1>
        </motion.div>

        <motion.div className="glass-card p-6 md:p-8 relative overflow-hidden" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-4">
            {isLoading ? (
              <div className="text-center py-16">
                <div className="w-8 h-8 mx-auto rounded-full border-2 border-purple-500/30 border-t-purple-500 animate-spin mb-4" />
                <p className="text-sm text-gray-400">Loading your orders...</p>
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 mx-auto rounded-full bg-white/5 flex items-center justify-center mb-6">
                  <FiShoppingBag className="text-gray-400" size={24} />
                </div>
                <h3 className="font-cinzel text-xl text-white mb-2">No Orders Yet</h3>
                <p className="text-sm text-gray-400 mb-8 max-w-sm mx-auto">Looks like you haven't made your first purchase yet. Discover our handcrafted collection!</p>
                <Link to="/shop" className="btn-primary inline-flex items-center gap-2 interactive">
                  Browse Shop <FiArrowRight />
                </Link>
              </div>
            ) : (
              orders.map((order, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + (i * 0.05) }}
                  key={order.id} 
                  className="p-5 md:p-6 rounded-xl bg-white/[0.02] border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-white/[0.04] transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-cinzel font-bold text-white text-lg">{order.id}</span>
                      <span className="text-xs text-gray-400 px-2 py-1 bg-white/5 rounded-md">{order.date}</span>
                    </div>
                    <p className="text-sm text-gray-300 line-clamp-2 leading-relaxed">
                      {Array.isArray(order.items)
                        ? order.items.map(i => `${i.name} × ${i.quantity}`).join(', ')
                        : order.items}
                    </p>
                    <div className="flex items-center gap-4 mt-4">
                      <span className="font-cinzel text-lg font-bold text-purple-300">₹{order.total}</span>
                      <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded"
                        style={{
                          background: order.status === 'delivered' ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)',
                          color: order.status === 'delivered' ? 'var(--color-success)' : 'var(--color-gold)'
                        }}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 md:flex-col md:items-end md:w-32">
                    <Link to={`/track-order?id=${order.id}`} className="btn-ghost w-full justify-center interactive text-sm py-2">Track</Link>
                    {order.status === 'delivered' && (
                      <Link to={`/review/${order.id}`} className="text-xs text-purple-400 hover:text-white transition-colors interactive">Leave Review</Link>
                    )}
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
