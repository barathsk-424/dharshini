// src/components/Layout/RequireAuth.jsx

import { Navigate, useLocation } from 'react-router-dom';
import { useUserStore } from '../../store/useStore';

/**
 * Wraps protected routes. If user is not authenticated, redirects to sign‑in page.
 * Preserves the intended destination via location.state so we can navigate back after login.
 */
export default function RequireAuth({ children }) {
  const { isAuthenticated } = useUserStore();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/auth?mode=sign-in" replace state={{ from: location }} />;
  }

  return children;
}
