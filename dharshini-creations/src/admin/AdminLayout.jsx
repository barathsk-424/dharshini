import React from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { FiLogOut, FiSettings, FiUser, FiShoppingBag, FiBarChart2, FiMessageSquare, FiInbox } from 'react-icons/fi';
import { FaBell } from 'react-icons/fa';
import { HelmetProvider } from 'react-helmet-async';

export default function AdminLayout() {
  const location = useLocation();
  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: <FiBarChart2 /> },
    { name: 'Users', path: '/admin/users', icon: <FiUser /> },
    { name: 'Orders', path: '/admin/orders', icon: <FiShoppingBag /> },
    { name: 'Products', path: '/admin/products', icon: <FiInbox /> },
    { name: 'Analytics', path: '/admin/analytics', icon: <FiBarChart2 /> },
    { name: 'Messages', path: '/admin/messages', icon: <FiMessageSquare /> },
    { name: 'Settings', path: '/admin/settings', icon: <FiSettings /> },
    { name: 'Logout', path: '/admin/logout', icon: <FiLogOut /> },
  ];

  return (
    <HelmetProvider>
      <div className="flex min-h-screen bg-gray-900 text-white">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-800 p-4 flex flex-col">
          <div className="flex items-center mb-8">
            <h1 className="text-2xl font-bold" style={{ background: 'linear-gradient(135deg, #8A2BE2, #B266FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Admin</h1>
          </div>
          <nav className="flex-1 space-y-2">
            {menuItems.map(item => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-3 p-2 rounded transition-colors ${isActive ? 'bg-purple-700' : 'hover:bg-gray-700'}
                `}
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.name}</span>
              </NavLink>
            ))}
          </nav>
        </aside>
        {/* Main content */}
        <main className="flex-1 flex flex-col">
          {/* Top navbar */}
          <header className="flex items-center justify-between bg-gray-800 p-4 shadow-md">
            <div className="text-lg font-medium">{location.pathname.replace('/admin', '') || 'Dashboard'}</div>
            <div className="flex items-center space-x-4">
              <button className="relative">
                <FaBell className="text-xl" />
                {/* Notification badge placeholder */}
                <span className="absolute -top-1 -right-1 inline-flex h-2 w-2 rounded-full bg-red-600"></span>
              </button>
              <div className="flex items-center space-x-2">
                <img src="/dharshini/assets/logo.png" alt="Admin" className="h-8 w-8 rounded-full" />
                <span className="font-medium">Admin</span>
              </div>
            </div>
          </header>
          {/* Page outlet */}
          <section className="p-6 overflow-auto bg-gray-900 flex-1">
            <Outlet />
          </section>
        </main>
      </div>
    </HelmetProvider>
  );
}
