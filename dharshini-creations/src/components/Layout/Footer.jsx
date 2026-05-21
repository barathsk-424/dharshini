import { Link } from 'react-router-dom';
import { FiInstagram, FiMapPin, FiHeart } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import Logo from '../UI/Logo';

export default function Footer() {
  return (
    <footer className="relative" style={{ background: 'linear-gradient(180deg, #07050d, #030206)' }}>
      {/* Top dynamic gradient bar */}
      <div className="h-[2px] w-full" style={{ background: 'linear-gradient(90deg, transparent, #7C3AED, #A78BFA, #7C3AED, transparent)' }} />

      <div className="max-w-[1280px] mx-auto px-6 pt-20 pb-28 lg:pb-32 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          {/* Brand */}
          <div className="text-left">
            <a href="/" className="flex items-center gap-3 mb-3 interactive group cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = '/';
              }}>
              <Logo size={48} className="group-hover:rotate-12 transition-transform duration-500" />
              <div>
                <h3 className="font-cinzel text-2xl font-bold leading-none"
                  style={{ background: 'linear-gradient(135deg, #FAFAFA, #A78BFA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Dharshini
                </h3>
                <p className="font-cinzel text-[10px] tracking-[0.25em] mt-1" style={{ color: '#9CA3AF' }}>CREATIONS</p>
              </div>
            </a>
            <p className="font-great-vibes text-xl mb-4" style={{ color: '#A78BFA' }}>Every Stitch Tells A Story</p>
            <p className="text-sm leading-relaxed" style={{ color: '#9CA3AF' }}>
              Premium handmade embroidery and custom fabric painting, crafted with unmatched precision and creative soul in Tamil Nadu, India.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-left">
            <h4 className="font-cinzel text-xs font-semibold tracking-[0.2em] mb-6" style={{ color: '#FAFAFA' }}>QUICK LINKS</h4>
            <div className="space-y-3.5">
              {[
                { to: '/shop', label: 'Shop' },
                { to: '/custom-orders', label: 'Custom Orders' },
                { to: '/pricing', label: 'Pricing' },
                { to: '/track-order', label: 'Track Order' },
              ].map(l => (
                <Link key={l.to} to={l.to} className="block text-sm transition-all duration-300 hover:text-purple-400 interactive" style={{ color: '#9CA3AF' }}>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="text-left">
            <h4 className="font-cinzel text-xs font-semibold tracking-[0.2em] mb-6" style={{ color: '#FAFAFA' }}>CONTACT</h4>
            <div className="space-y-4">
              <a href="https://instagram.com/threads.by.dharshini0612" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm interactive transition-all duration-300 hover:text-purple-400" style={{ color: '#9CA3AF' }}>
                <FiInstagram size={16} color="#A78BFA" /> @threads.by.dharshini0612
              </a>
              <a href="https://wa.me/919876543210?text=Hi%20Dharshini!%20I'm%20interested%20in%20your%20creations." target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm interactive transition-all duration-300 hover:text-purple-400" style={{ color: '#9CA3AF' }}>
                <FaWhatsapp size={16} color="#A78BFA" /> +91 98765 43210
              </a>
              <div className="flex items-center gap-3 text-sm" style={{ color: '#9CA3AF' }}>
                <FiMapPin size={16} color="#A78BFA" /> Tamil Nadu, India
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="text-left">
            <h4 className="font-cinzel text-xs font-semibold tracking-[0.2em] mb-6" style={{ color: '#FAFAFA' }}>STAY UPDATED</h4>
            <p className="text-sm mb-4" style={{ color: '#9CA3AF' }}>Subscribe for new collections & exclusive offers.</p>
            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-5 py-3 rounded-2xl text-sm bg-white/5 border outline-none focus:border-purple-500 transition-colors"
                style={{ borderColor: 'rgba(167, 139, 250, 0.25)', color: '#FAFAFA' }}
              />
              <button className="btn-primary btn-sm w-full interactive" style={{ background: 'linear-gradient(135deg, #7C3AED, #A78BFA)' }}>
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-20 pt-8 flex flex-col md:flex-row items-center justify-between gap-6"
          style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
          <p className="text-xs" style={{ color: '#4B5563' }}>
            © 2026 Dharshini Creations. All rights reserved. Handcrafted with <FiHeart className="inline text-rose-500" size={12} /> in India.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Shipping Policy'].map(t => (
              <span key={t} className="text-xs interactive cursor-pointer hover:text-purple-400 transition-all duration-300" style={{ color: '#4B5563' }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
