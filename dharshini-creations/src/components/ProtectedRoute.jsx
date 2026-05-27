import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Wraps any route that requires the user to be logged in.
 * Redirects to /auth if not authenticated, preserving the intended destination.
 */
export default function ProtectedRoute({ children }) {
  const { currentUser, loading } = useAuth();
  const location = useLocation();

  // Still resolving session — render nothing (AuthProvider already blocks
  // the whole tree, but this guard is here for safety)
  if (loading) return null;

  if (!currentUser) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return children;
}
