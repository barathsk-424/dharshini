import { useState, useRef, useEffect } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { pricingRules } from '../../data/mockData';

function AnimatedNumber({ value }) {
  const [display, setDisplay] = useState(value);
  useEffect(() => {
    const controls = animate(display, value, { duration: 0.5, onUpdate: v => setDisplay(Math.round(v)) });
    return () => controls.stop();
  }, [value]);
  return <span>{display}</span>;
}

// Unique color per add-on type
const addonColors = {
  name_embroidery: { accent: '#38BDF8', bg: 'rgba(56,189,248,0.12)', border: '#38BDF8', activeBg: 'rgba(56,189,248,0.2)' },
  sleeve_embroidery: { accent: '#F472B6', bg: 'rgba(244,114,182,0.12)', border: '#F472B6', activeBg: 'rgba(244,114,182,0.2)' },
  fabric_paint: { accent: '#FB923C', bg: 'rgba(251,146,60,0.12)', border: '#FB923C', activeBg: 'rgba(251,146,60,0.2)' },
  custom_embroidery: { accent: '#818CF8', bg: 'rgba(129,140,248,0.12)', border: '#818CF8', activeBg: 'rgba(129,140,248,0.2)' },
};

export default function PriceCalculator() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [shirtType, setShirtType] = useState('tshirt');
  const [addons, setAddons] = useState({ name_embroidery: false, sleeve_embroidery: false, fabric_paint: false, custom_embroidery: false });
  const [pincode, setPincode] = useState('');
  const [shipping, setShipping] = useState(null);
  const basePrice = shirtType === 'tshirt' ? 199 : 399;
  const addonsTotal = Object.entries(addons).filter(([_, e]) => e).reduce((sum, [type]) => {
    const rule = pricingRules.find(r => r.itemType === type && r.shirtType === shirtType);
    return sum + (rule?.price || 0);
  }, 0);
  const total = basePrice + addonsTotal;
  const calculateShipping = () => { if (pincode.length === 6) setShipping({ cost: 50 + Math.floor(Math.random() * 30), days: 3 + Math.floor(Math.random() * 4) }); };
  const addonLabels = { name_embroidery: { label: 'Name Embroidery', emoji: '✏️' }, sleeve_embroidery: { label: 'Sleeve Embroidery', emoji: '💫' }, fabric_paint: { label: 'Fabric Painting', emoji: '🎨' }, custom_embroidery: { label: 'Custom Embroidery', emoji: '🪡' } };

  return (
    <section ref={ref} className="relative">
      <div className="section-container">
        <motion.div className="text-center" initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}>
          <p className="section-subtitle" style={{ color: '#34D399' }}>Transparent Pricing</p>
          <h2 className="section-title glow-text">Live Price Calculator</h2>
        </motion.div>
        <motion.div className="max-w-3xl mx-auto mt-8 glass-card p-8" initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}>
          <div className="mb-8">
            <h4 className="font-cinzel text-sm font-semibold tracking-widest mb-4 text-left" style={{ color: '#B8B8B8' }}>SHIRT TYPE</h4>
            <div className="flex gap-4">
              {[{ value: 'tshirt', label: 'T-Shirt', price: '₹199', emoji: '👕', color: '#2DD4BF' }, { value: 'shirt', label: 'Formal Shirt', price: '₹399', emoji: '👔', color: '#F59E0B' }].map(type => (
                <button key={type.value} onClick={() => setShirtType(type.value)} className="flex-1 p-5 rounded-xl text-center interactive transition-all"
                  style={{ background: shirtType === type.value ? `rgba(${type.value === 'tshirt' ? '45,212,191' : '245,158,11'},0.15)` : 'rgba(138,43,226,0.05)', border: `2px solid ${shirtType === type.value ? type.color : 'rgba(106,13,173,0.2)'}` }}>
                  <div className="text-3xl mb-2">{type.emoji}</div>
                  <p className="font-poppins font-semibold text-sm" style={{ color: shirtType === type.value ? '#F5F5F5' : '#B8B8B8' }}>{type.label}</p>
                  <p className="text-xs mt-1" style={{ color: type.color }}>{type.price}</p>
                </button>
              ))}
            </div>
          </div>
          <div className="mb-8">
            <h4 className="font-cinzel text-sm font-semibold tracking-widest mb-4 text-left" style={{ color: '#B8B8B8' }}>ADD-ONS</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.entries(addonLabels).map(([key, { label, emoji }]) => {
                const rule = pricingRules.find(r => r.itemType === key && r.shirtType === shirtType);
                const colors = addonColors[key];
                return (
                  <label key={key} className="flex items-center gap-3 p-4 rounded-xl interactive cursor-pointer transition-all"
                    style={{ background: addons[key] ? colors.activeBg : colors.bg, border: `1px solid ${addons[key] ? colors.border : 'rgba(106,13,173,0.15)'}` }}>
                    <input type="checkbox" checked={addons[key]} onChange={() => setAddons(p => ({ ...p, [key]: !p[key] }))} className="w-4 h-4 accent-purple-500" />
                    <span className="text-lg">{emoji}</span>
                    <span className="flex-1 text-sm font-poppins text-left" style={{ color: '#F5F5F5' }}>{label}</span>
                    <span className="font-cinzel font-bold text-sm" style={{ color: colors.accent }}>+₹{rule?.price || 0}</span>
                  </label>
                );
              })}
            </div>
          </div>
          <div className="mb-8">
            <h4 className="font-cinzel text-sm font-semibold tracking-widest mb-4 text-left" style={{ color: '#B8B8B8' }}>SHIPPING</h4>
            <div className="flex gap-3">
              <input type="text" value={pincode} onChange={e => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))} placeholder="Enter pincode" className="flex-1" />
              <button onClick={calculateShipping} className="btn-primary px-8 interactive">Calculate</button>
            </div>
            {shipping && (
              <motion.div className="mt-3 p-3 rounded-xl flex justify-between" style={{ background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.3)' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <span className="text-sm" style={{ color: '#4ade80' }}>📦 ₹{shipping.cost}</span>
                <span className="text-sm" style={{ color: '#4ade80' }}>🕐 {shipping.days} days</span>
              </motion.div>
            )}
          </div>
          <div className="p-6 rounded-2xl text-center" style={{ background: 'linear-gradient(135deg, rgba(52,211,153,0.15), rgba(45,212,191,0.08))' }}>
            <p className="text-xs font-poppins tracking-widest mb-2" style={{ color: '#B8B8B8' }}>ESTIMATED TOTAL</p>
            <div className="price-display" style={{ background: 'linear-gradient(135deg, #34D399, #F5F5F5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>₹<AnimatedNumber value={total + (shipping?.cost || 0)} /></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
