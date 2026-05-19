import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore, useUIStore } from '../../store/useStore';
import { FiShoppingBag, FiHeart, FiMenu, FiX, FiVolume2, FiVolumeX } from 'react-icons/fi';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/shop', label: 'Shop' },
  { path: '/custom-orders', label: 'Custom Orders' },
  { path: '/pricing', label: 'Pricing' },
  { path: '/reviews', label: 'Reviews' },
  { path: '/track-order', label: 'Track Order' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const itemCount = useCartStore(s => s.getItemCount());
  const { soundEnabled, toggleSound } = useUIStore();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location.pathname]);

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled
            ? 'rgba(5, 5, 5, 0.85)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(106, 13, 173, 0.2)' : 'none',
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 interactive">
            <div className="relative">
              <span className="font-cinzel text-xl md:text-2xl font-bold"
                style={{
                  background: 'linear-gradient(135deg, #8A2BE2, #B266FF)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                Dharshini
              </span>
              <span className="font-cinzel text-xs tracking-[0.25em] block"
                style={{ color: '#B8B8B8' }}>
                CREATIONS
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-4">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className="interactive px-2 xl:px-3 py-2 text-[13px] xl:text-sm font-poppins rounded-lg transition-all duration-300 relative whitespace-nowrap"
                style={{
                  color: location.pathname === link.path ? '#B266FF' : '#B8B8B8',
                }}
              >
                {link.label}
                {location.pathname === link.path && (
                  <motion.div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full"
                    style={{ background: 'linear-gradient(90deg, #8A2BE2, #B266FF)', width: '60%' }}
                    layoutId="navIndicator"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <button onClick={toggleSound} className="interactive p-2 rounded-full hover:bg-white/5 transition-colors" title="Toggle Sound">
              {soundEnabled
                ? <FiVolume2 size={18} color="#B266FF" />
                : <FiVolumeX size={18} color="#666" />
              }
            </button>
            <Link to="/shop" className="interactive p-2 rounded-full hover:bg-white/5 transition-colors relative" title="Wishlist">
              <FiHeart size={18} color="#B8B8B8" />
            </Link>
            <button className="interactive p-2 rounded-full hover:bg-white/5 transition-colors relative" title="Cart">
              <FiShoppingBag size={18} color="#B8B8B8" />
              {itemCount > 0 && (
                <motion.span
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center text-white"
                  style={{ background: 'linear-gradient(135deg, #8A2BE2, #B266FF)' }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500 }}
                >
                  {itemCount}
                </motion.span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden interactive p-2 rounded-full hover:bg-white/5 transition-colors"
            >
              {mobileOpen ? <FiX size={22} color="#B266FF" /> : <FiMenu size={22} color="#B8B8B8" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setMobileOpen(false)} />
            <motion.div
              className="absolute right-0 top-0 bottom-0 w-72 pt-24 px-6"
              style={{
                background: 'linear-gradient(180deg, rgba(10,5,20,0.98), rgba(5,5,5,0.98))',
                borderLeft: '1px solid rgba(106, 13, 173, 0.3)',
              }}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={link.path}
                    className="block py-3 text-base font-poppins border-b transition-colors"
                    style={{
                      color: location.pathname === link.path ? '#B266FF' : '#B8B8B8',
                      borderColor: 'rgba(106, 13, 173, 0.15)',
                    }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
