import { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiSearch, FiPackage, FiTruck, FiCheckCircle } from 'react-icons/fi';

const steps = [
  { key: 'packed', label: 'Order Packed', emoji: '📦' },
  { key: 'shipped', label: 'Shipped', emoji: '🚚' },
  { key: 'out', label: 'Out for Delivery', emoji: '🏍️' },
  { key: 'delivered', label: 'Delivered', emoji: '✅' },
];

const mockTracking = {
  'DC-001': { status: 'shipped', dest: 'Mumbai, Maharashtra', est: '3 days', items: 'Floral Embroidery T-shirt × 1' },
  'DC-002': { status: 'delivered', dest: 'New Delhi', est: 'Delivered', items: 'Custom Anime Tee × 2' },
  'DC-003': { status: 'packed', dest: 'Bangalore, Karnataka', est: '5 days', items: 'Couple Portrait Set × 1' },
};

export default function TrackOrder() {
  const [orderId, setOrderId] = useState('');
  const [tracking, setTracking] = useState(null);
  const [error, setError] = useState('');

  const handleTrack = () => {
    const result = mockTracking[orderId.toUpperCase()];
    if (result) { setTracking(result); setError(''); }
    else { setTracking(null); setError('Order not found. Try DC-001, DC-002, or DC-003'); }
  };

  const statusIndex = tracking ? steps.findIndex(s => s.key === tracking.status) : -1;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Helmet><title>Track Order — Dharshini Creations</title></Helmet>
      <section className="gradient-mesh min-h-[40vh] flex items-center justify-center">
        <div className="text-center">
          <motion.p className="font-great-vibes text-2xl mb-2" style={{ color: '#B266FF' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>Where's My Order?</motion.p>
          <motion.h1 className="font-cinzel text-4xl md:text-5xl font-bold glow-text" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            style={{ background: 'linear-gradient(135deg, #F5F5F5, #8A2BE2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Track Order</motion.h1>
        </div>
      </section>
      <div className="section-container max-w-3xl mx-auto" style={{ paddingTop: 40 }}>
        <div className="glass-card p-8">
          <div className="flex gap-3 mb-8">
            <input type="text" value={orderId} onChange={e => setOrderId(e.target.value)} placeholder="Enter Order ID (e.g. DC-001)"
              className="flex-1 px-5 py-4 rounded-xl text-base bg-white/5 border outline-none focus:border-purple-500 transition-colors"
              style={{ borderColor: 'rgba(106,13,173,0.3)', color: '#F5F5F5' }} onKeyDown={e => e.key === 'Enter' && handleTrack()} />
            <button onClick={handleTrack} className="btn-primary px-8 interactive flex items-center gap-2"><FiSearch size={18} /> Track</button>
          </div>
          {error && <p className="text-sm text-center mb-6" style={{ color: '#ef4444' }}>{error}</p>}
          {tracking && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              {/* Map */}
              <div className="relative mb-10 p-8 rounded-2xl" style={{ background: 'rgba(138,43,226,0.05)' }}>
                <svg viewBox="0 0 400 300" className="w-full max-h-56">
                  <defs><linearGradient id="routeGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#8A2BE2" /><stop offset="100%" stopColor="#B266FF" /></linearGradient></defs>
                  <path d="M180 30 L220 25 L260 40 L280 60 L290 90 L300 120 L290 150 L280 170 L260 200 L240 230 L220 260 L200 280 L190 270 L180 250 L160 230 L140 200 L120 170 L110 150 L105 120 L110 90 L130 60 L150 40 Z"
                    fill="rgba(20,10,40,0.6)" stroke="#6A0DAD" strokeWidth="1" />
                  <circle cx="200" cy="250" r="6" fill="#8A2BE2"><animate attributeName="r" values="4;8;4" dur="2s" repeatCount="indefinite" /></circle>
                  <text x="215" y="255" fill="#B8B8B8" fontSize="9">Tamil Nadu</text>
                  <circle cx="200" cy={tracking.dest.includes('Mumbai') ? 150 : tracking.dest.includes('Delhi') ? 80 : 200} r="5" fill="#B266FF" />
                  <text x="215" y={tracking.dest.includes('Mumbai') ? 155 : tracking.dest.includes('Delhi') ? 85 : 205} fill="#B266FF" fontSize="9">{tracking.dest.split(',')[0]}</text>
                  <motion.line x1="200" y1="250" x2="200" y2={tracking.dest.includes('Mumbai') ? 150 : tracking.dest.includes('Delhi') ? 80 : 200}
                    stroke="url(#routeGrad)" strokeWidth="2.5" strokeDasharray="6 3"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5 }} />
                </svg>
              </div>
              {/* Timeline */}
              <div className="flex items-center justify-between relative mb-10">
                <div className="absolute top-6 left-0 right-0 h-0.5" style={{ background: 'rgba(106,13,173,0.3)' }} />
                <motion.div className="absolute top-6 left-0 h-0.5" style={{ background: 'linear-gradient(90deg, #8A2BE2, #B266FF)' }}
                  initial={{ width: 0 }} animate={{ width: `${((statusIndex + 1) / steps.length) * 100}%` }} transition={{ duration: 1.2 }} />
                {steps.map((step, i) => (
                  <div key={step.key} className="relative z-10 flex flex-col items-center gap-2">
                    <motion.div className="w-12 h-12 rounded-full flex items-center justify-center text-xl"
                      style={{ background: i <= statusIndex ? 'linear-gradient(135deg, #8A2BE2, #B266FF)' : 'rgba(20,10,40,0.8)', border: `2px solid ${i <= statusIndex ? '#B266FF' : '#6A0DAD'}` }}
                      initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.15 }}>{step.emoji}</motion.div>
                    <span className="text-xs font-poppins text-center max-w-[80px]" style={{ color: i <= statusIndex ? '#B266FF' : '#666' }}>{step.label}</span>
                  </div>
                ))}
              </div>
              {/* Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl" style={{ background: 'rgba(138,43,226,0.08)' }}>
                  <p className="text-xs mb-1" style={{ color: '#666' }}>Order ID</p>
                  <p className="font-cinzel font-bold" style={{ color: '#B266FF' }}>{orderId.toUpperCase()}</p>
                </div>
                <div className="p-4 rounded-xl" style={{ background: 'rgba(138,43,226,0.08)' }}>
                  <p className="text-xs mb-1" style={{ color: '#666' }}>Destination</p>
                  <p className="text-sm font-semibold" style={{ color: '#F5F5F5' }}>{tracking.dest}</p>
                </div>
                <div className="p-4 rounded-xl" style={{ background: 'rgba(138,43,226,0.08)' }}>
                  <p className="text-xs mb-1" style={{ color: '#666' }}>Est. Delivery</p>
                  <p className="text-sm font-semibold" style={{ color: '#4ade80' }}>{tracking.est}</p>
                </div>
              </div>
            </motion.div>
          )}
          {!tracking && !error && (
            <div className="text-center py-12">
              <div className="text-5xl mb-4">📦</div>
              <p className="text-sm" style={{ color: '#B8B8B8' }}>Enter your order ID to track your handcrafted creation</p>
              <p className="text-xs mt-2" style={{ color: '#666' }}>Demo IDs: DC-001, DC-002, DC-003</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
