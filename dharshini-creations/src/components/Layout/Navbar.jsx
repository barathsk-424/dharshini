import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore, useUserStore } from '../../store/useStore';
import { useAuth } from '../../context/AuthContext';
import { FiShoppingBag, FiHeart, FiMenu, FiX, FiUser, FiSettings } from 'react-icons/fi';
import { MdDashboard } from 'react-icons/md';
import Logo from '../UI/Logo';

const navLinks = [
  { path: '/',            label: 'Home' },
  { path: '/shop',        label: 'Shop' },
  { path: '/pricing',     label: 'Pricing' },
  { path: '/reviews',     label: 'Reviews' },
  { path: '/track-order', label: 'Track Order' },
  { path: '/about',       label: 'About' },
  { path: '/contact',     label: 'Contact' },
];

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const location = useLocation();

  const itemCount    = useCartStore(s => s.getItemCount());
  const toggleCart   = useCartStore(s => s.toggleCart);
  const wishlistCount = useUserStore(s => s.wishlist.length);

  // ── Use AuthContext for role — this is the single source of truth ──
  const { currentUser, isAdmin, loading, userData } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location.pathname]);

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background:       scrolled ? 'rgba(3, 2, 6, 0.75)' : 'transparent',
          backdropFilter:   scrolled ? 'blur(24px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(24px)' : 'none',
          borderBottom:     scrolled ? '1px solid rgba(255, 255, 255, 0.05)' : 'none',
          boxShadow:        scrolled ? '0 10px 30px -10px rgba(0,0,0,0.5)' : 'none',
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 interactive group">
            <Logo size={40} className="flex-shrink-0 group-hover:rotate-12 transition-transform duration-500" />
            <div className="relative leading-tight">
              <span
                className="font-cinzel text-lg md:text-xl font-black tracking-wider block transition-all duration-300 group-hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, var(--color-white), var(--color-purple-glow))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Dharshini
              </span>
              <span
                className="font-cinzel text-[9px] tracking-[0.3em] block font-semibold transition-all duration-300 group-hover:text-purple-400"
                style={{ color: 'var(--color-gray-dark)' }}
              >
                CREATIONS
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden xl:flex items-center gap-1 xl:gap-2">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className="interactive px-3 py-2 text-[13px] xl:text-[14px] font-medium font-poppins rounded-full transition-all duration-300 relative whitespace-nowrap"
                style={{
                  color:      location.pathname === link.path ? 'var(--color-white)' : 'var(--color-gray-dark)',
                  background: location.pathname === link.path ? 'rgba(255,255,255,0.03)' : 'transparent',
                }}
              >
                {link.label}
                {location.pathname === link.path && (
                  <motion.div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full"
                    style={{ background: 'linear-gradient(90deg, var(--color-purple-primary), var(--color-purple-glow))', width: '40%' }}
                    layoutId="navIndicator"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-1">

            {/* Admin Dashboard icon — only shown to admins */}
            {currentUser && isAdmin && (
              <Link
                to="/admin"
                className="interactive p-2.5 rounded-full transition-all duration-300 relative group"
                title="Admin Dashboard"
                style={{ background: location.pathname.startsWith('/admin') ? 'rgba(139,92,246,0.15)' : 'transparent' }}
              >
                <MdDashboard
                  size={20}
                  style={{
                    color: location.pathname.startsWith('/admin')
                      ? 'var(--color-purple-glow)'
                      : 'var(--color-gray-soft)',
                    filter: location.pathname.startsWith('/admin')
                      ? 'drop-shadow(0 0 6px rgba(178,102,255,0.7))'
                      : 'none',
                  }}
                />
                {/* Tooltip */}
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-semibold bg-purple-900/90 text-purple-200 px-2 py-0.5 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  Admin
                </span>
              </Link>
            )}

            {/* User / Profile */}
            <Link
              to="/auth"
              className="interactive p-2.5 rounded-full hover:bg-white/5 transition-all duration-300 relative"
              title={currentUser ? 'My Profile' : 'Sign In'}
            >
              <FiUser
                size={18}
                color={currentUser ? 'var(--color-purple-glow)' : 'var(--color-gray-soft)'}
                style={{ filter: currentUser ? 'drop-shadow(0 0 4px rgba(178,102,255,0.5))' : 'none' }}
              />
              {/* Green dot when logged in */}
              {currentUser && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-400 border border-black" />
              )}
            </Link>

            {/* Wishlist */}
            <Link
              to="/shop?wishlist=true"
              className="interactive p-2.5 rounded-full hover:bg-white/5 transition-all duration-300 relative"
              title="Wishlist"
            >
              <FiHeart size={18} color="var(--color-gray-soft)" />
              {wishlistCount > 0 && (
                <motion.span
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center text-white"
                  style={{ background: 'linear-gradient(135deg, #EC4899, #F472B6)', boxShadow: '0 0 10px rgba(236,72,153,0.5)' }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500 }}
                >
                  {wishlistCount}
                </motion.span>
              )}
            </Link>

            {/* Cart */}
            <button
              onClick={toggleCart}
              className="interactive p-2.5 rounded-full hover:bg-white/5 transition-all duration-300 relative"
              title="Cart"
            >
              <FiShoppingBag size={18} color="var(--color-gray-soft)" />
              {itemCount > 0 && (
                <motion.span
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center text-white"
                  style={{ background: 'linear-gradient(135deg, var(--color-purple-primary), var(--color-purple-glow))', boxShadow: '0 0 10px rgba(124,58,237,0.5)' }}
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
              className="xl:hidden interactive p-2.5 rounded-full hover:bg-white/5 transition-all duration-300"
            >
              {mobileOpen
                ? <FiX    size={22} color="var(--color-purple-glow)" />
                : <FiMenu size={22} color="var(--color-gray-soft)" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 xl:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/85 backdrop-blur-lg" onClick={() => setMobileOpen(false)} />
            <motion.div
              className="absolute right-0 top-0 bottom-0 w-80 pt-24 px-6 flex flex-col gap-1"
              style={{
                background:  'linear-gradient(180deg, rgba(12,8,22,0.98), rgba(3,2,6,0.98))',
                borderLeft:  '1px solid rgba(255,255,255,0.05)',
                boxShadow:   '-10px 0 30px rgba(0,0,0,0.5)',
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
                  transition={{ delay: i * 0.04 }}
                >
                  <Link
                    to={link.path}
                    className="block py-3.5 px-4 text-base font-medium font-poppins rounded-xl transition-all duration-300"
                    style={{
                      color:      location.pathname === link.path ? 'var(--color-white)' : 'var(--color-gray-dark)',
                      background: location.pathname === link.path ? 'rgba(255,255,255,0.04)' : 'transparent',
                    }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              {/* Admin link in mobile menu — only for admins */}
              {currentUser && isAdmin && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.04 }}
                >
                  <Link
                    to="/admin"
                    className="block py-3.5 px-4 text-base font-medium font-poppins rounded-xl transition-all duration-300 flex items-center gap-3 mt-2"
                    style={{
                      color:      'var(--color-purple-glow)',
                      background: 'rgba(139,92,246,0.08)',
                      border:     '1px solid rgba(139,92,246,0.2)',
                    }}
                  >
                    <MdDashboard size={18} />
                    Admin Dashboard
                  </Link>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
