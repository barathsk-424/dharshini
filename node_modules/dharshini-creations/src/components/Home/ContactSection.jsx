import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiInstagram, FiMail, FiMapPin } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

const contactCards = [
  { icon: FiInstagram, title: 'Instagram', desc: '@dharshini_creations', link: 'https://instagram.com/dharshini_creations', color: 'linear-gradient(135deg, #833AB4, #E1306C, #F77737)' },
  { icon: FaWhatsapp, title: 'WhatsApp', desc: '+91 98765 43210', link: 'https://wa.me/919876543210?text=Hi%20Dharshini!', color: 'linear-gradient(135deg, #25D366, #128C7E)' },
  { icon: FiMail, title: 'Email', desc: 'hello@dharshinicreations.com', link: 'mailto:hello@dharshinicreations.com?subject=Inquiry', color: 'linear-gradient(135deg, #8A2BE2, #B266FF)' },
];

export default function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative">
      <div className="section-container">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}>
          <p className="section-subtitle">Let's Connect</p>
          <h2 className="section-title glow-text">Get In Touch</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 max-w-4xl mx-auto">
          {contactCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.a key={card.title} href={card.link} target="_blank" rel="noopener noreferrer"
                className="glass-card p-8 text-center group interactive" initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.15 }} whileHover={{ y: -8 }}>
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-transform group-hover:scale-110"
                  style={{ background: card.color, boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
                  <Icon size={28} color="white" />
                </div>
                <h4 className="font-cinzel font-semibold text-lg mb-2" style={{ color: '#F5F5F5' }}>{card.title}</h4>
                <p className="text-sm" style={{ color: '#B8B8B8' }}>{card.desc}</p>
              </motion.a>
            );
          })}
        </div>

        {/* Map placeholder */}
        <motion.div className="mt-12 max-w-4xl mx-auto glass-card overflow-hidden" initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.4 }}>
          <div className="relative h-64 flex items-center justify-center" style={{ background: 'rgba(138,43,226,0.05)' }}>
            <div className="text-center">
              <FiMapPin size={40} color="#B266FF" className="mx-auto mb-3" />
              <p className="font-cinzel font-semibold" style={{ color: '#F5F5F5' }}>Dharshini Creations Studio</p>
              <p className="text-sm mt-1" style={{ color: '#B8B8B8' }}>Tamil Nadu, India 🇮🇳</p>
              <p className="text-xs mt-2" style={{ color: '#666' }}>Handcrafted with love from South India</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
