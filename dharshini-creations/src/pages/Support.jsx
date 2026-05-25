import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiHelpCircle, FiMessageCircle, FiMail, FiChevronDown } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { faqData } from '../data/mockData';

export default function Support() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full min-h-[calc(100vh-180px)] py-12 md:py-20 px-6">
      <Helmet><title>Help & Support — Dharshini Creations</title></Helmet>
      
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex items-center gap-4 mb-8">
          <Link to="/auth" className="text-purple-400 hover:text-white transition-colors interactive">← Back to Profile</Link>
          <h1 className="font-cinzel text-3xl font-bold glow-text flex items-center gap-3">
            <FiHelpCircle className="text-purple-400" /> Help & Support
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            <h2 className="text-xl font-cinzel font-bold text-white mb-6">Frequently Asked Questions</h2>
            {faqData.map((faq, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card overflow-hidden"
              >
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left interactive"
                >
                  <span className="font-semibold text-white text-sm pr-4">{faq.question}</span>
                  <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }}>
                    <FiChevronDown className="text-purple-400" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden bg-white/[0.02]"
                    >
                      <p className="p-5 pt-0 text-sm text-gray-400 leading-relaxed">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-cinzel font-bold text-white mb-6">Contact Us</h2>
            
            <motion.a 
              href="https://wa.me/919876543210" 
              target="_blank" 
              rel="noreferrer"
              className="glass-card p-6 flex flex-col items-center text-center group interactive hover:-translate-y-1 transition-all"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FiMessageCircle className="text-emerald-400" size={24} />
              </div>
              <h3 className="font-semibold text-white mb-1">WhatsApp</h3>
              <p className="text-xs text-gray-400">Fastest response for custom orders and queries.</p>
            </motion.a>

            <motion.a 
              href="mailto:support@dharshinicreations.com" 
              className="glass-card p-6 flex flex-col items-center text-center group interactive hover:-translate-y-1 transition-all"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FiMail className="text-blue-400" size={24} />
              </div>
              <h3 className="font-semibold text-white mb-1">Email Us</h3>
              <p className="text-xs text-gray-400">For business inquiries and detailed support.</p>
            </motion.a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
