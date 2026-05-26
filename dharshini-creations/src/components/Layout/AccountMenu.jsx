// src/components/Layout/AccountMenu.jsx

import { FiShoppingBag, FiMapPin, FiPenTool, FiHeart, FiSettings, FiActivity, FiBell, FiMap, FiHelpCircle, FiLogOut } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { useUserStore } from '../../store/useStore';

/**
 * Premium account navigation menu displayed on the profile dashboard.
 * Each item links to a relevant section (pages may be created later).
 */
export default function AccountMenu() {
  const menuItems = [
    { to: '/orders', label: 'My Orders', icon: <FiShoppingBag size={18} /> },
    { to: '/track-order', label: 'Order Tracking', icon: <FiMapPin size={18} /> },
    { to: '/wishlist', label: 'Wishlist', icon: <FiHeart size={18} /> },
    { to: '/profile-settings', label: 'Profile Settings', icon: <FiSettings size={18} /> },
    { to: '/activity', label: 'Recent Activity', icon: <FiActivity size={18} /> },
    { to: '/notifications', label: 'Notifications', icon: <FiBell size={18} /> },
    { to: '/addresses', label: 'Saved Addresses', icon: <FiMap size={18} /> },
    { to: '/support', label: 'Help & Support', icon: <FiHelpCircle size={18} /> },
  ];

  const logout = useUserStore(s => s.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  return (
    <div className="mt-8 space-y-4">
      {menuItems.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors interactive"
        >
          {item.icon}
          <span className="text-sm font-medium text-white" style={{ color: 'var(--color-gray-dark)' }}>{item.label}</span>
        </Link>
      ))}
      
      <button
        onClick={handleLogout}
        className="w-full flex items-center gap-3 p-3 rounded-xl bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition-colors interactive mt-4 text-red-400"
      >
        <FiLogOut size={18} />
        <span className="text-sm font-medium">Log Out</span>
      </button>
    </div>
  );
}
