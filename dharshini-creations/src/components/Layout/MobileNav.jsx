import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHome, FiImage, FiShoppingBag, FiHeart, FiUser } from 'react-icons/fi';

const tabs = [
  { path: '/', icon: FiHome, label: 'Home' },
  { path: '/shop', icon: FiShoppingBag, label: 'Orders' },
  { path: '/shop', icon: FiHeart, label: 'Wishlist' },
  { path: '/auth', icon: FiUser, label: 'Profile' },
];

export default function MobileNav() {
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden"
      style={{
        background: 'rgba(5, 5, 5, 0.92)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(106, 13, 173, 0.2)',
      }}
    >
      <div className="flex items-center justify-around py-2 px-2 max-w-md mx-auto">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;
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
              <Icon size={20} color={isActive ? '#B266FF' : '#9CA3AF'} />
              <span className="text-[10px] font-poppins" style={{ color: isActive ? '#B266FF' : '#9CA3AF' }}>
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
