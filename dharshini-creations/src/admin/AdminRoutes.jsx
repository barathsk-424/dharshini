import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AdminLayout from './AdminLayout';
import Dashboard  from './pages/Dashboard';
import Users      from './pages/Users';
import Orders     from './pages/Orders';
import Products   from './pages/Products';
import Analytics  from './pages/Analytics';
import Messages   from './pages/Messages';
import Settings   from './pages/Settings';

/**
 * Guards every /admin/* route.
 *
 * Rules:
 *  - Not logged in          → redirect to /auth (with return path)
 *  - Logged in, not admin   → redirect to / (access denied)
 *  - Logged in, is admin    → render children
 */
function AdminGuard({ children }) {
  const { currentUser, isAdmin, loading } = useAuth();
  const location = useLocation();

  // Auth state still resolving — show nothing (avoids flash of redirect)
  if (loading) return null;

  // Not authenticated at all
  if (!currentUser) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // Authenticated but not an admin — silently redirect to home
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default function AdminRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AdminGuard>
            <AdminLayout />
          </AdminGuard>
        }
      >
        <Route index          element={<Dashboard />} />
        <Route path="users"    element={<Users />} />
        <Route path="orders"   element={<Orders />} />
        <Route path="products" element={<Products />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="messages" element={<Messages />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}
