import { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiInstagram, FiMail, FiMapPin, FiSend } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

const contactCards = [
  { icon: FiInstagram, title: 'Instagram', desc: '@dharshini_creations', link: 'https://instagram.com/dharshini_creations', gradient: 'linear-gradient(135deg, #833AB4, #E1306C, #F77737)' },
  { icon: FaWhatsapp, title: 'WhatsApp', desc: '+91 98765 43210', link: 'https://wa.me/919876543210?text=Hi%20Dharshini!', gradient: 'linear-gradient(135deg, #25D366, #128C7E)' },
  { icon: FiMail, title: 'Email', desc: 'hello@dharshinicreations.com', link: 'mailto:hello@dharshinicreations.com?subject=Inquiry', gradient: 'linear-gradient(135deg, #8A2BE2, #B266FF)' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const update = (k, v) => setForm(p => ({ ...p, [k]: v }));

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Helmet><title>Contact — Dharshini Creations</title></Helmet>
      <section className="gradient-mesh min-h-[40vh] flex items-center justify-center">
        <div className="text-center">
          <motion.p className="font-great-vibes text-2xl mb-2" style={{ color: '#B266FF' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>Let's Connect</motion.p>
          <motion.h1 className="font-cinzel text-4xl md:text-5xl font-bold glow-text" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            style={{ background: 'linear-gradient(135deg, #F5F5F5, #8A2BE2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Contact Us</motion.h1>
        </div>
      </section>
      <div className="section-container" style={{ paddingTop: 40 }}>
        {/* Contact cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto">
          {contactCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.a key={card.title} href={card.link} target="_blank" rel="noopener noreferrer"
                className="glass-card p-8 text-center group interactive" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }} whileHover={{ y: -8 }}>
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-transform group-hover:scale-110" style={{ background: card.gradient, boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
                  <Icon size={28} color="white" />
                </div>
                <h4 className="font-cinzel font-semibold text-lg mb-2" style={{ color: '#F5F5F5' }}>{card.title}</h4>
                <p className="text-sm" style={{ color: '#B8B8B8' }}>{card.desc}</p>
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
              <p className="text-sm" style={{ color: '#B8B8B8' }}>Thank you for reaching out. We'll get back to you within 24 hours.</p>
              <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', message: '' }); }} className="btn-primary mt-6 interactive">Send Another</button>
            </motion.div>
          ) : (
            <div className="glass-card p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="text-xs font-semibold block mb-2" style={{ color: '#B8B8B8' }}>Your Name</label>
                  <input value={form.name} onChange={e => update('name', e.target.value)} placeholder="Full name"
                    className="w-full px-4 py-3 rounded-xl text-sm bg-white/5 border outline-none focus:border-purple-500 transition-colors" style={{ borderColor: 'rgba(106,13,173,0.3)', color: '#F5F5F5' }} />
                </div>
                <div>
                  <label className="text-xs font-semibold block mb-2" style={{ color: '#B8B8B8' }}>Email</label>
                  <input value={form.email} onChange={e => update('email', e.target.value)} placeholder="your@email.com" type="email"
                    className="w-full px-4 py-3 rounded-xl text-sm bg-white/5 border outline-none focus:border-purple-500 transition-colors" style={{ borderColor: 'rgba(106,13,173,0.3)', color: '#F5F5F5' }} />
                </div>
              </div>
              <div className="mb-6">
                <label className="text-xs font-semibold block mb-2" style={{ color: '#B8B8B8' }}>Message</label>
                <textarea value={form.message} onChange={e => update('message', e.target.value)} rows={5} placeholder="Tell us about your project, question, or just say hello..."
                  className="w-full px-4 py-3 rounded-xl text-sm bg-white/5 border outline-none focus:border-purple-500 resize-none transition-colors" style={{ borderColor: 'rgba(106,13,173,0.3)', color: '#F5F5F5' }} />
              </div>
              <button onClick={() => setSubmitted(true)} className="btn-primary w-full interactive flex items-center justify-center gap-2">
                <FiSend size={16} /> Send Message
              </button>
            </div>
          )}
        </div>

        {/* Map with beautiful vector styling */}
        <motion.div className="mt-16 max-w-4xl mx-auto glass-card overflow-hidden" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <div className="relative h-72 flex items-center justify-center overflow-hidden" style={{ background: 'rgba(5, 3, 10, 0.95)' }}>
            {/* Fine Gridlines Background */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(rgba(138,43,226,0.4) 1px, transparent 0)', backgroundSize: '24px 24px' }} />
            
            {/* Glowing Concentric Rings */}
            <div className="absolute w-96 h-96 rounded-full border border-purple-500/10 animate-pulse-glow" style={{ animationDuration: '4s' }} />
            <div className="absolute w-64 h-64 rounded-full border border-purple-500/20 animate-pulse-glow" style={{ animationDuration: '3s' }} />
            <div className="absolute w-40 h-40 rounded-full border border-purple-500/30 animate-pulse-glow" style={{ animationDuration: '2s' }} />
            
            {/* Pulsating Glowing Map Marker */}
            <div className="relative z-10 text-center px-6">
              <div className="relative mx-auto mb-4 w-12 h-12 flex items-center justify-center">
                <span className="absolute inset-0 rounded-full bg-purple-500/30 animate-ping" />
                <span className="absolute inset-2 rounded-full bg-purple-500/60 animate-pulse" />
                <FiMapPin size={32} color="#B266FF" className="relative z-10 drop-shadow-[0_0_12px_rgba(178,102,255,0.8)]" />
              </div>
              <h3 className="font-cinzel text-xl font-bold tracking-widest mb-1" style={{ color: '#F5F5F5' }}>Dharshini Creations Studio</h3>
              <p className="text-sm font-semibold tracking-wider" style={{ color: '#B266FF' }}>Tamil Nadu, India 🇮🇳</p>
              <p className="text-xs max-w-sm mx-auto mt-2 leading-relaxed" style={{ color: '#B8B8B8' }}>
                Our artisan embroidery and custom painting workshop. Serving clients globally with premium express shipping.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
