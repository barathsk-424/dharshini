import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiActivity, FiShoppingCart, FiHeart, FiLogIn, FiCheckCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const activities = [
  { id: 1, type: 'login', title: 'Logged In', desc: 'Successfully logged into your account from Chennai, India.', date: 'Today, 10:42 AM', icon: FiLogIn, color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { id: 2, type: 'order', title: 'Order Delivered', desc: 'Your order DC-002 was successfully delivered.', date: 'Yesterday, 2:15 PM', icon: FiCheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { id: 3, type: 'wishlist', title: 'Added to Wishlist', desc: 'You added "Custom Anime Tee" to your wishlist.', date: 'May 22, 5:30 PM', icon: FiHeart, color: 'text-pink-400', bg: 'bg-pink-500/10' },
  { id: 4, type: 'cart', title: 'Cart Updated', desc: 'You added 2 items to your shopping cart.', date: 'May 20, 11:20 AM', icon: FiShoppingCart, color: 'text-purple-400', bg: 'bg-purple-500/10' },
];

export default function Activity() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full min-h-[calc(100vh-180px)] py-12 md:py-20 px-6">
      <Helmet><title>Recent Activity — Dharshini Creations</title></Helmet>
      
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex items-center gap-4 mb-8">
          <Link to="/auth" className="text-purple-400 hover:text-white transition-colors interactive">← Back to Profile</Link>
          <h1 className="font-cinzel text-3xl font-bold glow-text flex items-center gap-3">
            <FiActivity className="text-blue-400" /> Recent Activity
          </h1>
        </motion.div>

        <motion.div className="glass-card p-6 md:p-10 relative overflow-hidden" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative border-l border-white/10 ml-4 md:ml-6 space-y-8 pb-4">
            {activities.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + (i * 0.1) }}
                  className="relative pl-8 md:pl-10"
                >
                  <div className={`absolute -left-[20px] top-0.5 w-10 h-10 rounded-full ${item.bg} border border-white/10 flex items-center justify-center shadow-lg backdrop-blur-md`}>
                    <Icon className={item.color} size={18} />
                  </div>
                  <div>
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-1">
                      <h4 className="font-poppins font-semibold text-white">{item.title}</h4>
                      <span className="text-xs text-gray-400">{item.date}</span>
                    </div>
                    <p className="text-sm text-gray-300">{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
          
          <div className="pt-8 text-center border-t border-white/5 mt-4">
            <button className="text-sm font-semibold text-purple-400 hover:text-white transition-colors interactive">
              Load More Activity
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
