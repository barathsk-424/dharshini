import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiSearch, FiPackage, FiTruck, FiCheckCircle } from 'react-icons/fi';

const steps = [
  { key: 'packed', label: 'Order Packed', icon: FiPackage, emoji: '📦', color: '#38BDF8' },
  { key: 'shipped', label: 'Shipped', icon: FiTruck, emoji: '🚚', color: '#818CF8' },
  { key: 'out', label: 'Out for Delivery', icon: FiTruck, emoji: '🏍️', color: '#FB923C' },
  { key: 'delivered', label: 'Delivered', icon: FiCheckCircle, emoji: '✅', color: '#34D399' },
];

const mockTracking = {
  'DC-001': { status: 'shipped', dest: 'Mumbai', est: '3 days' },
  'DC-002': { status: 'delivered', dest: 'Delhi', est: 'Delivered' },
  'DC-003': { status: 'packed', dest: 'Bangalore', est: '5 days' },
};

export default function ShippingTracker() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
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
    <section ref={ref} className="relative">
      <div className="section-container">
        <motion.div className="text-center" initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}>
          <p className="section-subtitle" style={{ color: '#38BDF8' }}>Where's My Order?</p>
          <h2 className="section-title glow-text">Shipping Tracker</h2>
        </motion.div>

        <motion.div className="max-w-3xl mx-auto mt-8" initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}>
          <div className="glass-card p-8">
            <div className="flex gap-3 mb-8">
              <input type="text" value={orderId} onChange={e => setOrderId(e.target.value)} placeholder="Enter Order ID (e.g. DC-001)"
                className="flex-1 px-5 py-3 rounded-xl text-sm bg-white/5 border outline-none focus:border-purple-500 transition-colors"
                style={{ borderColor: 'rgba(56,189,248,0.3)', color: '#F5F5F5' }} onKeyDown={e => e.key === 'Enter' && handleTrack()} />
              <button onClick={handleTrack} className="btn-primary px-6 interactive" style={{ background: 'linear-gradient(135deg, #0EA5E9, #38BDF8)' }}><FiSearch size={16} /></button>
            </div>

            {error && <p className="text-sm text-center mb-4" style={{ color: '#ef4444' }}>{error}</p>}

            {tracking && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                {/* India map simplified */}
                <div className="relative mb-8 p-6 rounded-2xl" style={{ background: 'rgba(56,189,248,0.05)' }}>
                  <svg viewBox="0 0 400 300" className="w-full max-h-48">
                    <defs>
                      <linearGradient id="mapGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#0EA5E9" />
                        <stop offset="100%" stopColor="#38BDF8" />
                      </linearGradient>
                    </defs>
                    {/* Simplified India outline */}
                    <path d="M180 30 L220 25 L260 40 L280 60 L290 90 L300 120 L290 150 L280 170 L260 200 L240 230 L220 260 L200 280 L190 270 L180 250 L160 230 L140 200 L120 170 L110 150 L105 120 L110 90 L130 60 L150 40 Z"
                      fill="rgba(20,10,40,0.6)" stroke="#0EA5E9" strokeWidth="1" />
                    {/* Source: Tamil Nadu */}
                    <circle cx="200" cy="250" r="6" fill="#0EA5E9">
                      <animate attributeName="r" values="4;8;4" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <text x="210" y="255" fill="#E5E7EB" fontSize="9" fontFamily="Poppins">Tamil Nadu</text>
                    {/* Destination */}
                    <circle cx="200" cy={tracking.dest === 'Mumbai' ? 150 : tracking.dest === 'Delhi' ? 80 : 200} r="5" fill="#38BDF8" />
                    <text x="210" y={tracking.dest === 'Mumbai' ? 155 : tracking.dest === 'Delhi' ? 85 : 205} fill="#38BDF8" fontSize="9" fontFamily="Poppins">{tracking.dest}</text>
                    {/* Animated line */}
                    <motion.line x1="200" y1="250" x2="200" y2={tracking.dest === 'Mumbai' ? 150 : tracking.dest === 'Delhi' ? 80 : 200}
                      stroke="url(#mapGrad)" strokeWidth="2" strokeDasharray="6 3"
                      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, ease: 'easeInOut' }} />
                  </svg>
                </div>

                {/* Status timeline */}
                <div className="flex items-center justify-between relative">
                  <div className="absolute top-5 left-0 right-0 h-0.5" style={{ background: 'rgba(56,189,248,0.2)' }} />
                  <motion.div className="absolute top-5 left-0 h-0.5" style={{ background: 'linear-gradient(90deg, #0EA5E9, #38BDF8)', width: `${((statusIndex + 1) / steps.length) * 100}%` }}
                    initial={{ width: 0 }} animate={{ width: `${((statusIndex + 1) / steps.length) * 100}%` }} transition={{ duration: 1 }} />
                  {steps.map((step, i) => (
                    <div key={step.key} className="relative z-10 flex flex-col items-center gap-2">
                      <motion.div className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
                        style={{
                          background: i <= statusIndex ? `linear-gradient(135deg, ${step.color}cc, ${step.color})` : 'rgba(20,10,40,0.8)',
                          border: `2px solid ${i <= statusIndex ? step.color : 'rgba(56,189,248,0.3)'}`,
                        }}
                        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.2 }}>
                        {step.emoji}
                      </motion.div>
                      <span className="text-[10px] font-poppins text-center max-w-[70px]" style={{ color: i <= statusIndex ? step.color : '#9CA3AF' }}>{step.label}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 text-center">
                  <p className="text-sm" style={{ color: '#E5E7EB' }}>Destination: <span style={{ color: '#38BDF8' }}>{tracking.dest}</span></p>
                  <p className="text-sm" style={{ color: '#E5E7EB' }}>Est. Delivery: <span style={{ color: '#4ade80' }}>{tracking.est}</span></p>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
