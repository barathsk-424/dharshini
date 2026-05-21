import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiInstagram, FiMail, FiMapPin } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

const contactCards = [
  { icon: FiInstagram, title: 'Instagram', desc: '@threads.by.dharshini0612', link: 'https://instagram.com/threads.by.dharshini0612', color: 'linear-gradient(135deg, #833AB4, #E1306C, #F77737)', accent: '#E1306C' },
  { icon: FaWhatsapp, title: 'WhatsApp', desc: '+91 98765 43210', link: 'https://wa.me/919876543210?text=Hi%20Dharshini!', color: 'linear-gradient(135deg, #25D366, #128C7E)', accent: '#25D366' },
  { icon: FiMail, title: 'Email', desc: 'hello@dharshinicreations.com', link: 'mailto:hello@dharshinicreations.com?subject=Inquiry', color: 'linear-gradient(135deg, #38BDF8, #818CF8)', accent: '#818CF8' },
];

export default function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative">
      <div className="section-container">
        <motion.div className="text-center" initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}>
          <p className="section-subtitle" style={{ color: '#818CF8' }}>Let's Connect</p>
          <h2 className="section-title glow-text">Get In Touch</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 max-w-4xl mx-auto">
          {contactCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.a key={card.title} href={card.link} target="_blank" rel="noopener noreferrer"
                className="glass-card p-8 text-center group interactive"
                style={{ borderColor: `${card.accent}40` }}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.15 }} whileHover={{ y: -8 }}>
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-transform group-hover:scale-110"
                  style={{ background: card.color, boxShadow: `0 4px 20px ${card.accent}4d` }}>
                  <Icon size={28} color="white" />
                </div>
                <h4 className="font-cinzel font-semibold text-lg mb-2" style={{ color: '#F5F5F5' }}>{card.title}</h4>
                <p className="text-sm" style={{ color: card.accent }}>{card.desc}</p>
              </motion.a>
            );
          })}
        </div>

        {/* Map placeholder with beautiful vector styling */}
        <motion.div className="mt-12 max-w-4xl mx-auto glass-card overflow-hidden" initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.4 }}>
          <div className="relative h-72 flex items-center justify-center overflow-hidden" style={{ background: 'rgba(5, 3, 10, 0.95)' }}>
            {/* Fine Gridlines Background */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(rgba(129,140,248,0.4) 1px, transparent 0)', backgroundSize: '24px 24px' }} />
            
            {/* Glowing Concentric Rings */}
            <div className="absolute w-96 h-96 rounded-full border animate-pulse-glow" style={{ borderColor: 'rgba(129,140,248,0.1)', animationDuration: '4s' }} />
            <div className="absolute w-64 h-64 rounded-full border animate-pulse-glow" style={{ borderColor: 'rgba(129,140,248,0.2)', animationDuration: '3s' }} />
            <div className="absolute w-40 h-40 rounded-full border animate-pulse-glow" style={{ borderColor: 'rgba(129,140,248,0.3)', animationDuration: '2s' }} />
            
            {/* Pulsating Glowing Map Marker */}
            <div className="relative z-10 text-center px-6">
              <div className="relative mx-auto mb-4 w-12 h-12 flex items-center justify-center">
                <span className="absolute inset-0 rounded-full animate-ping" style={{ background: 'rgba(129,140,248,0.3)' }} />
                <span className="absolute inset-2 rounded-full animate-pulse" style={{ background: 'rgba(129,140,248,0.6)' }} />
                <FiMapPin size={32} color="#818CF8" className="relative z-10" style={{ filter: 'drop-shadow(0 0 12px rgba(129,140,248,0.8))' }} />
              </div>
              <h3 className="font-cinzel text-xl font-bold tracking-widest mb-1" style={{ color: '#F5F5F5' }}>Dharshini Creations Studio</h3>
              <p className="text-sm font-semibold tracking-wider" style={{ color: '#818CF8' }}>Tamil Nadu, India 🇮🇳</p>
              <p className="text-xs max-w-sm mx-auto mt-2 leading-relaxed" style={{ color: '#E5E7EB' }}>
                Our artisan embroidery and custom painting workshop. Serving clients globally with premium express shipping.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
