import { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { categories, faqData } from '../data/mockData';
import { FiChevronDown } from 'react-icons/fi';

export default function Pricing() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Helmet><title>Pricing — Dharshini Creations</title></Helmet>
      <section className="gradient-mesh min-h-[40vh] flex items-center justify-center">
        <div className="text-center">
          <motion.p className="font-great-vibes text-2xl mb-2" style={{ color: '#B266FF' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>Transparent & Fair</motion.p>
          <motion.h1 className="font-cinzel text-4xl md:text-5xl font-bold glow-text" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            style={{ background: 'linear-gradient(135deg, #F5F5F5, #8A2BE2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Pricing</motion.h1>
        </div>
      </section>
      <div className="section-container" style={{ paddingTop: 40 }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {categories.map((cat, i) => (
            <motion.div key={cat.id} className="glass-card overflow-hidden" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }}>
              <div className="p-6 text-center" style={{ background: 'linear-gradient(135deg, rgba(138,43,226,0.15), rgba(20,10,40,0.5))' }}>
                <div className="text-4xl mb-3">{cat.id === 1 ? '🎨' : cat.id === 2 ? '🪡' : '✨'}</div>
                <h3 className="font-cinzel text-xl font-bold" style={{ color: '#F5F5F5' }}>{cat.name}</h3>
                <p className="text-xs mt-1" style={{ color: '#B8B8B8' }}>Starting from ₹{cat.startingPrice}+</p>
              </div>
              <div className="p-6">
                {cat.items.map((item, j) => (
                  <div key={item.name} className="flex items-center justify-between py-3" style={{ borderBottom: j < cat.items.length - 1 ? '1px solid rgba(106,13,173,0.15)' : 'none' }}>
                    <span className="text-sm" style={{ color: '#F5F5F5' }}>{item.name}</span>
                    <span className="font-cinzel font-bold text-sm" style={{ color: '#B266FF' }}>{item.price}</span>
                  </div>
                ))}
                <a href="/custom-orders" className="btn-primary w-full mt-6 interactive text-center block">Order Now</a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <h2 className="section-title glow-text mb-8">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqData.map((faq, i) => (
              <motion.div key={i} className="glass-card overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left interactive">
                  <span className="font-poppins font-semibold text-sm pr-4" style={{ color: '#F5F5F5' }}>{faq.question}</span>
                  <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <FiChevronDown size={18} color="#B266FF" />
                  </motion.div>
                </button>
                <motion.div initial={false} animate={{ height: openFaq === i ? 'auto' : 0, opacity: openFaq === i ? 1 : 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                  <p className="px-5 pb-5 text-sm leading-relaxed" style={{ color: '#B8B8B8' }}>{faq.answer}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
