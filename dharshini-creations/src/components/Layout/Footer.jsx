import { Link } from 'react-router-dom';
import { FiInstagram, FiMapPin, FiHeart } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import Logo from '../UI/Logo';

export default function Footer() {
  return (
    <footer className="relative" style={{ background: 'linear-gradient(180deg, #07050d, #030206)' }}>
      {/* Top dynamic gradient bar */}
      <div className="h-[2px] w-full" style={{ background: 'linear-gradient(90deg, transparent, var(--color-purple-primary), var(--color-purple-glow), var(--color-purple-primary), transparent)' }} />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 pt-12 sm:pt-20 pb-28 lg:pb-32 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-16">
          {/* Brand */}
          <div className="text-left">
            <Link to="/" className="flex items-center gap-3 mb-3 interactive group cursor-pointer">
              <Logo size={48} className="group-hover:rotate-12 transition-transform duration-500" />
              <div>
                <h3 className="font-cinzel text-2xl font-bold leading-none"
                  style={{ background: 'linear-gradient(135deg, var(--color-white), var(--color-purple-glow))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Dharshini
                </h3>
                <p className="font-cinzel text-[10px] tracking-[0.25em] mt-1" style={{ color: 'var(--color-gray-dark)' }}>CREATIONS</p>
              </div>
            </Link>
            <p className="font-great-vibes text-xl mb-4" style={{ color: 'var(--color-purple-glow)' }}>Every Stitch Tells A Story</p>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-gray-dark)' }}>
              Premium handmade embroidery and custom fabric painting, crafted with unmatched precision and creative soul in Tamil Nadu, India.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-left">
            <h4 className="font-cinzel text-xs font-semibold tracking-[0.2em] mb-6" style={{ color: 'var(--color-white)' }}>QUICK LINKS</h4>
            <div className="space-y-3.5">
              {[
                { to: '/shop', label: 'Shop' },
                { to: '/pricing', label: 'Pricing' },
                { to: '/track-order', label: 'Track Order' },
              ].map(l => (
                <Link key={l.to} to={l.to} className="block text-sm transition-all duration-300 hover:text-purple-400 interactive" style={{ color: 'var(--color-gray-dark)' }}>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="text-left">
            <h4 className="font-cinzel text-xs font-semibold tracking-[0.2em] mb-6" style={{ color: 'var(--color-white)' }}>CONTACT</h4>
            <div className="space-y-4">
              <a href="https://instagram.com/threads.by.dharshini0612" target="_blank" rel="noopener noreferrer"
                className="flex items-start sm:items-center gap-3 text-sm interactive transition-all duration-300 hover:text-purple-400 break-all sm:break-normal" style={{ color: 'var(--color-gray-dark)' }}>
                <FiInstagram size={16} color="var(--color-purple-glow)" className="flex-shrink-0 mt-0.5 sm:mt-0" /> @threads.by.dharshini0612
              </a>
              <a href="https://wa.me/918122459197?text=Hi%20Dharshini!%20I'm%20interested%20in%20your%20creations." target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm interactive transition-all duration-300 hover:text-purple-400" style={{ color: 'var(--color-gray-dark)' }}>
                <FaWhatsapp size={16} color="var(--color-purple-glow)" /> +91 81224 59197
              </a>
              <div className="flex items-center gap-3 text-sm" style={{ color: 'var(--color-gray-dark)' }}>
                <FiMapPin size={16} color="var(--color-purple-glow)" /> Tamil Nadu, India
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="text-left">
            <h4 className="font-cinzel text-xs font-semibold tracking-[0.2em] mb-6" style={{ color: 'var(--color-white)' }}>STAY UPDATED</h4>
            <p className="text-sm mb-4" style={{ color: 'var(--color-gray-dark)' }}>Subscribe for new collections & exclusive offers.</p>
            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-5 py-3 rounded-2xl text-sm bg-white/5 border outline-none focus:border-purple-500 transition-colors"
                style={{ borderColor: 'rgba(167, 139, 250, 0.25)', color: 'var(--color-white)' }}
              />
              <button className="btn-primary btn-sm w-full interactive" style={{ background: 'linear-gradient(135deg, var(--color-purple-primary), var(--color-purple-glow))' }}>
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 sm:mt-20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 text-center md:text-left"
          style={{ borderTop: '1px solid var(--color-border-light, var(--color-border-light))' }}>
          <p className="text-xs" style={{ color: 'var(--color-gray-dark)' }}>
            © 2026 Dharshini Creations. All rights reserved. Handcrafted with <FiHeart className="inline text-rose-500" size={12} /> in India.
          </p>
          <div className="flex flex-wrap justify-center md:justify-end gap-4 sm:gap-6">
            {['Privacy Policy', 'Terms of Service', 'Shipping Policy'].map(t => (
              <span key={t} className="text-xs interactive cursor-pointer hover:text-purple-400 transition-all duration-300" style={{ color: 'var(--color-gray-dark)' }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
