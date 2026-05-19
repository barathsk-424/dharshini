import { Link } from 'react-router-dom';
import { FiInstagram, FiMail, FiMapPin, FiHeart } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="relative" style={{ background: 'linear-gradient(180deg, #050505, #0a0510)' }}>
      {/* Top gradient line */}
      <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, #8A2BE2, #B266FF, #8A2BE2, transparent)' }} />

      <div className="max-w-[1280px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <h3 className="font-cinzel text-2xl font-bold mb-2"
              style={{ background: 'linear-gradient(135deg, #8A2BE2, #B266FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Dharshini
            </h3>
            <p className="font-cinzel text-xs tracking-[0.2em] mb-4" style={{ color: '#B8B8B8' }}>CREATIONS</p>
            <p className="font-great-vibes text-lg mb-4" style={{ color: '#B266FF' }}>Every Stitch Tells A Story</p>
            <p className="text-sm leading-relaxed" style={{ color: '#B8B8B8' }}>
              Premium handmade embroidery and fabric painting, crafted with love and passion in Tamil Nadu, India.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-cinzel text-sm font-semibold tracking-widest mb-6" style={{ color: '#F5F5F5' }}>QUICK LINKS</h4>
            <div className="space-y-3">
              {[
                { to: '/shop', label: 'Shop' },
                { to: '/gallery', label: 'Gallery' },
                { to: '/custom-orders', label: 'Custom Orders' },
                { to: '/pricing', label: 'Pricing' },
                { to: '/track-order', label: 'Track Order' },
              ].map(l => (
                <Link key={l.to} to={l.to} className="block text-sm transition-colors hover:text-purple-400 interactive" style={{ color: '#B8B8B8' }}>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-cinzel text-sm font-semibold tracking-widest mb-6" style={{ color: '#F5F5F5' }}>CONTACT</h4>
            <div className="space-y-4">
              <a href="https://instagram.com/dharshini_creations" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm interactive transition-colors hover:text-purple-400" style={{ color: '#B8B8B8' }}>
                <FiInstagram size={16} color="#B266FF" /> @dharshini_creations
              </a>
              <a href="https://wa.me/919876543210?text=Hi%20Dharshini!%20I'm%20interested%20in%20your%20creations." target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm interactive transition-colors hover:text-purple-400" style={{ color: '#B8B8B8' }}>
                <FaWhatsapp size={16} color="#B266FF" /> +91 98765 43210
              </a>
              <a href="mailto:hello@dharshinicreations.com?subject=Inquiry%20from%20Website"
                className="flex items-center gap-3 text-sm interactive transition-colors hover:text-purple-400" style={{ color: '#B8B8B8' }}>
                <FiMail size={16} color="#B266FF" /> hello@dharshinicreations.com
              </a>
              <div className="flex items-center gap-3 text-sm" style={{ color: '#B8B8B8' }}>
                <FiMapPin size={16} color="#B266FF" /> Tamil Nadu, India
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-cinzel text-sm font-semibold tracking-widest mb-6" style={{ color: '#F5F5F5' }}>STAY UPDATED</h4>
            <p className="text-sm mb-4" style={{ color: '#B8B8B8' }}>Subscribe for new collections & exclusive offers.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2.5 rounded-full text-sm bg-white/5 border outline-none focus:border-purple-500 transition-colors"
                style={{ borderColor: 'rgba(106,13,173,0.3)', color: '#F5F5F5' }}
              />
              <button className="px-5 py-2.5 rounded-full text-sm font-semibold text-white interactive transition-all hover:shadow-lg"
                style={{ background: 'linear-gradient(135deg, #8A2BE2, #B266FF)' }}>
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(106, 13, 173, 0.2)' }}>
          <p className="text-xs" style={{ color: '#666' }}>
            © 2025 Dharshini Creations. All rights reserved. Handcrafted with <FiHeart className="inline text-purple-500" size={12} /> in India.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Shipping Policy'].map(t => (
              <span key={t} className="text-xs interactive cursor-pointer hover:text-purple-400 transition-colors" style={{ color: '#666' }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
