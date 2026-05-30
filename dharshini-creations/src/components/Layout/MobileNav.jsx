import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHome, FiShoppingBag, FiHeart, FiUser } from 'react-icons/fi';
import { MdDashboard } from 'react-icons/md';
import { useAuth } from '../../context/AuthContext';

const userTabs = [
  { path: '/',     icon: FiHome,        label: 'Home' },
  { path: '/shop', icon: FiShoppingBag, label: 'Shop' },
  { path: '/shop?wishlist=true', icon: FiHeart, label: 'Wishlist' },
  { path: '/auth', icon: FiUser,        label: 'Profile' },
];

export default function MobileNav() {
  const location  = useLocation();
  const { currentUser, isAdmin } = useAuth();

  // Admins get an extra Dashboard tab
  const tabs = currentUser && isAdmin
    ? [...userTabs, { path: '/admin', icon: MdDashboard, label: 'Admin' }]
    : userTabs;

  // Hide mobile nav inside the admin dashboard
  if (location.pathname.startsWith('/admin')) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 lg:hidden"
      style={{
        background:   'rgba(5, 5, 5, 0.92)',
        backdropFilter: 'blur(20px)',
        borderTop:    '1px solid rgba(106, 13, 173, 0.2)',
      }}
    >
      <div className="flex items-center justify-around py-2 px-2 max-w-md mx-auto">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path ||
            (tab.path === '/admin' && location.pathname.startsWith('/admin'));
          const Icon = tab.icon;
          return (
            <Link
              key={tab.label}
              to={tab.path}
              className="flex flex-col items-center gap-1 py-1 px-3 relative interactive"
            >
              {isActive && (
                <motion.div
                  className="absolute -top-1 w-8 h-1 rounded-full"
                  style={{ background: 'linear-gradient(90deg, #8A2BE2, #B266FF)' }}
                  layoutId="mobileNavIndicator"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <Icon
                size={20}
                color={isActive ? '#B266FF' : 'var(--color-gray-dark)'}
                style={{ filter: isActive && tab.label === 'Admin' ? 'drop-shadow(0 0 4px rgba(178,102,255,0.7))' : 'none' }}
              />
              <span
                className="text-[10px] font-poppins font-medium"
                style={{ color: isActive ? '#B266FF' : 'var(--color-gray-dark)' }}
              >
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
