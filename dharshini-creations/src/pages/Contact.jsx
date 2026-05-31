import { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiInstagram, FiMail, FiMapPin, FiSend } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { submitInquiry } from '../services/supabase';

const contactCards = [
  { icon: FiInstagram, title: 'Instagram', desc: '@threads.by.dharshini0612', link: 'https://instagram.com/threads.by.dharshini0612', gradient: 'linear-gradient(135deg, #833AB4, #E1306C, #F77737)' },
  { icon: FaWhatsapp, title: 'WhatsApp', desc: '+91 81224 59197', link: 'https://wa.me/918122459197?text=Hi%20Dharshini!', gradient: 'linear-gradient(135deg, #25D366, #128C7E)' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const update = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) {
      setError('Please fill in your name and message.');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      const result = await submitInquiry(form.name.trim(), form.email.trim(), form.message.trim());
      if (result.success) {
        setSubmitted(true);
      } else {
        setError(result.error || 'Failed to send message. Please try again.');
      }
    } catch (err) {
      setError('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Helmet><title>Contact — Dharshini Creations</title></Helmet>
      <section className="gradient-mesh min-h-[40vh] flex items-center justify-center px-4">
        <div className="text-center w-full max-w-lg">
          <motion.p className="font-great-vibes text-2xl mb-2" style={{ color: '#B266FF' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>Let's Connect</motion.p>
          <motion.h1 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold glow-text" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            style={{ background: 'linear-gradient(135deg, #F5F5F5, #8A2BE2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Contact Us</motion.h1>
        </div>
      </section>
      <div className="section-container" style={{ paddingTop: 40 }}>
        {/* Contact cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 max-w-2xl mx-auto">
          {contactCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.a key={card.title} href={card.link} target="_blank" rel="noopener noreferrer"
                className="glass-card p-8 text-center group interactive" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }} whileHover={{ y: -8 }}>
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-transform group-hover:scale-110" style={{ background: card.gradient, boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
                  <Icon size={28} color="white" />
                </div>
                <h4 className="font-cinzel font-semibold text-lg mb-2" style={{ color: '#F5F5F5' }}>{card.title}</h4>
                <p className="text-sm" style={{ color: '#E5E7EB' }}>{card.desc}</p>
              </motion.a>
            );
          })}
        </div>

        {/* Contact form */}
        <div className="max-w-2xl mx-auto">
          <h2 className="section-title glow-text mb-8">Send a Message</h2>
          {submitted ? (
            <motion.div className="glass-card p-12 text-center" initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
              <div className="text-6xl mb-4">💌</div>
              <h3 className="font-cinzel text-2xl font-bold mb-2" style={{ color: '#F5F5F5' }}>Message Sent!</h3>
              <p className="text-sm" style={{ color: '#E5E7EB' }}>Thank you for reaching out. We'll get back to you within 24 hours.</p>
              <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', message: '' }); }} className="btn-primary mt-6 interactive">Send Another</button>
            </motion.div>
          ) : (
            <form className="glass-card p-4 sm:p-6 md:p-8" onSubmit={handleSubmit}>
              {error && (
                <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm">
                  ⚠️ {error}
                </div>
              )}
              <div className="mb-6">
                <label className="text-xs font-semibold block mb-2" style={{ color: '#E5E7EB' }}>Your Name *</label>
                <input value={form.name} onChange={e => update('name', e.target.value)} placeholder="Full name" required
                  className="w-full px-4 py-3 rounded-xl text-sm bg-white/5 border outline-none focus:border-purple-500 transition-colors" style={{ borderColor: 'rgba(106,13,173,0.3)', color: '#F5F5F5' }} />
              </div>
              <div className="mb-6">
                <label className="text-xs font-semibold block mb-2" style={{ color: '#E5E7EB' }}>Email Address</label>
                <input value={form.email} onChange={e => update('email', e.target.value)} type="email" placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-xl text-sm bg-white/5 border outline-none focus:border-purple-500 transition-colors" style={{ borderColor: 'rgba(106,13,173,0.3)', color: '#F5F5F5' }} />
              </div>
              <div className="mb-6">
                <label className="text-xs font-semibold block mb-2" style={{ color: '#E5E7EB' }}>Message *</label>
                <textarea value={form.message} onChange={e => update('message', e.target.value)} rows={5} required placeholder="Tell us about your project, question, or just say hello..."
                  className="w-full px-4 py-3 rounded-xl text-sm bg-white/5 border outline-none focus:border-purple-500 resize-none transition-colors" style={{ borderColor: 'rgba(106,13,173,0.3)', color: '#F5F5F5' }} />
              </div>
              <button type="submit" disabled={isLoading} className="btn-primary w-full interactive flex items-center justify-center gap-2 disabled:opacity-70">
                {isLoading ? (
                  <><span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" /> Sending...</>
                ) : (
                  <><FiSend size={16} /> Send Message</>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Map with beautiful vector styling */}
        <motion.div className="mt-16 max-w-4xl mx-auto glass-card overflow-hidden" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <div className="relative h-56 sm:h-72 flex items-center justify-center overflow-hidden" style={{ background: 'rgba(5, 3, 10, 0.95)' }}>
            {/* Fine Gridlines Background */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(rgba(138,43,226,0.4) 1px, transparent 0)', backgroundSize: '24px 24px' }} />
            
            {/* Glowing Concentric Rings */}
            <div className="absolute map-rings-lg rounded-full border border-purple-500/10 animate-pulse-glow" style={{ animationDuration: '4s' }} />
            <div className="absolute map-rings-md rounded-full border border-purple-500/20 animate-pulse-glow" style={{ animationDuration: '3s' }} />
            <div className="absolute map-rings-sm rounded-full border border-purple-500/30 animate-pulse-glow" style={{ animationDuration: '2s' }} />
            
            {/* Pulsating Glowing Map Marker */}
            <div className="relative z-10 text-center px-6">
              <div className="relative mx-auto mb-4 w-12 h-12 flex items-center justify-center">
                <span className="absolute inset-0 rounded-full bg-purple-500/30 animate-ping" />
                <span className="absolute inset-2 rounded-full bg-purple-500/60 animate-pulse" />
                <FiMapPin size={32} color="#B266FF" className="relative z-10 drop-shadow-[0_0_12px_rgba(178,102,255,0.8)]" />
              </div>
              <h3 className="font-cinzel text-lg sm:text-xl font-bold tracking-widest mb-1 px-2" style={{ color: '#F5F5F5' }}>Dharshini Creations Studio</h3>
              <p className="text-sm font-semibold tracking-wider" style={{ color: '#B266FF' }}>Tamil Nadu, India 🇮🇳</p>
              <p className="text-xs max-w-sm mx-auto mt-2 leading-relaxed" style={{ color: '#E5E7EB' }}>
                Our artisan embroidery and custom painting workshop. Serving clients globally with premium express shipping.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
