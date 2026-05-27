import React, { useState, useEffect, useRef } from 'react';
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiOutlineViewGrid, 
  HiOutlineUsers, 
  HiOutlineShoppingCart, 
  HiOutlineCube, 
  HiOutlineChartBar, 
  HiOutlineChatAlt2, 
  HiOutlineCog, 
  HiOutlineLogout,
  HiOutlineMenuAlt2,
  HiOutlineX
} from 'react-icons/hi';
import { RiShieldStarFill } from 'react-icons/ri';
import { useAuth } from '../context/AuthContext';
import './admin.css';

export default function AdminLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/auth');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: HiOutlineViewGrid, end: true },
    { name: 'Orders', path: '/admin/orders', icon: HiOutlineShoppingCart },
    { name: 'Products', path: '/admin/products', icon: HiOutlineCube },
    { name: 'Users', path: '/admin/users', icon: HiOutlineUsers },
    { name: 'Analytics', path: '/admin/analytics', icon: HiOutlineChartBar },
    { name: 'Messages', path: '/admin/messages', icon: HiOutlineChatAlt2 },
    { name: 'Settings', path: '/admin/settings', icon: HiOutlineCog },
  ];

  const getPageTitle = () => {
    const path = location.pathname.replace('/admin', '');
    if (!path || path === '/') return 'Dashboard';
    return path.substring(1).charAt(0).toUpperCase() + path.substring(2).split('/')[0];
  };

  const SidebarContent = () => (
    <>
      <div className="flex items-center gap-3 px-2 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-500 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(139,92,246,0.3)]">
          <RiShieldStarFill className="text-white text-2xl" />
        </div>
        <div>
          <h2 className="text-xl font-bold font-cinzel tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Admin</h2>
          <p className="text-xs text-gray-500 tracking-widest uppercase font-semibold">Workspace</p>
        </div>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.end}
              className={({ isActive }) => `
                relative flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 group overflow-hidden
                ${isActive 
                  ? 'active-nav-link text-white shadow-[0_4px_20px_rgba(0,0,0,0.2)]' 
                  : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
                }
              `}
            >
              {/* Active Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-fuchsia-600/10 opacity-0 [.active-nav-link_&]:opacity-100 transition-opacity" />
              
              {/* Active Indicator Line */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-violet-500 to-fuchsia-500 rounded-r-full shadow-[0_0_10px_rgba(139,92,246,0.8)] opacity-0 [.active-nav-link_&]:opacity-100 transition-opacity" />
              
              <Icon className="text-xl relative z-10 shrink-0 transition-transform duration-300 group-hover:scale-110 [.active-nav-link_&]:text-violet-400" />
              
              <span className="font-medium relative z-10 transition-transform duration-300 group-hover:translate-x-1">
                {item.name}
              </span>
            </NavLink>
          );
        })}
      </nav>

      <div className="mt-8 pt-6 border-t border-white/[0.06]">
        <button
          onClick={handleLogout}
          className="flex items-center gap-4 px-4 py-3.5 rounded-xl text-gray-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all duration-300 group w-full"
        >
          <HiOutlineLogout className="text-xl shrink-0 transition-transform duration-300 group-hover:-translate-x-1" />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </>
  );

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8 md:py-12 relative min-h-[85vh]">
      {/* Background ambient glows specific to admin */}
      <div className="absolute top-20 right-20 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-[600px] h-[600px] bg-fuchsia-600/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Mobile Header / Toggle */}
      <div className="lg:hidden flex items-center justify-between mb-6 bg-white/[0.02] border border-white/[0.05] backdrop-blur-xl p-4 rounded-2xl">
        <div className="flex items-center gap-3">
          <RiShieldStarFill className="text-violet-400 text-2xl" />
          <h1 className="text-lg font-bold font-cinzel">{getPageTitle()}</h1>
        </div>
        <button 
          onClick={() => setMobileMenuOpen(true)}
          className="p-2 text-gray-400 hover:text-white bg-white/[0.05] rounded-xl transition-colors"
        >
          <HiOutlineMenuAlt2 className="text-xl" />
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 relative z-10">
        
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex flex-col w-72 shrink-0 bg-[#0c0e16]/60 backdrop-blur-2xl border border-white/[0.05] rounded-3xl p-6 shadow-2xl h-[calc(100vh-140px)] sticky top-24">
          <SidebarContent />
        </aside>

        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] lg:hidden"
                onClick={() => setMobileMenuOpen(false)}
              />
              <motion.aside 
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed top-0 left-0 bottom-0 w-72 bg-[#0c0e16] border-r border-white/[0.05] p-6 z-[101] lg:hidden flex flex-col shadow-2xl"
              >
                <div className="flex justify-end mb-4">
                  <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-gray-400 hover:text-white rounded-lg bg-white/[0.05]">
                    <HiOutlineX className="text-xl" />
                  </button>
                </div>
                <SidebarContent />
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0">
          <div className="hidden lg:flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold font-cinzel text-white tracking-wide">{getPageTitle()}</h1>
            <div className="flex items-center gap-4">
              <div className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.05] text-sm text-gray-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Live Systems
              </div>
            </div>
          </div>
          
          <div className="bg-[#0c0e16]/40 backdrop-blur-xl border border-white/[0.05] rounded-3xl p-6 md:p-8 shadow-2xl min-h-[60vh]">
            <Outlet />
          </div>
        </main>

      </div>
    </div>
  );
}
