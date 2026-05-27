import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

// ── Fetch or create profile in customer_profiles ─────────────
// Reads first — preserves any role/status set by admin.
// Only inserts on first-ever login for a new user.
async function syncProfile(user) {
  if (!user) return null;
  try {
    const { data: existing, error: readError } = await supabase
      .from('customer_profiles')
      .select('id, name, email, role, status')
      .eq('id', user.id)
      .maybeSingle();

    if (readError) {
      console.warn('Profile read error (non-fatal):', readError.message);
    }

    // Profile exists — return it unchanged (preserves admin role)
    if (existing) return existing;

    // New user — insert with default 'user' role
    const newProfile = {
      id:     user.id,
      name:   user.user_metadata?.name || user.email?.split('@')[0] || 'User',
      email:  user.email,
      role:   'user',
      status: 'Active',
    };

    const { data: inserted, error: insertError } = await supabase
      .from('customer_profiles')
      .insert(newProfile)
      .select('id, name, email, role, status')
      .maybeSingle();

    if (insertError) {
      console.warn('Profile insert error (non-fatal):', insertError.message);
      return newProfile; // fallback so UI still works
    }
    return inserted ?? newProfile;
  } catch (e) {
    console.warn('syncProfile error (non-fatal):', e.message);
    return null;
  }
}

// ── Map Supabase error codes → user-friendly messages ────────
function friendlyAuthError(error) {
  const msg  = error?.message || '';
  const code = error?.code    || '';

  if (code === 'invalid_credentials' || msg.includes('Invalid login credentials'))
    return 'Invalid email or password. Please check your credentials and try again.';
  if (code === 'email_not_confirmed' || msg.includes('Email not confirmed'))
    return 'Your email address has not been confirmed. Please check your inbox.';
  if (code === 'user_already_exists' || msg.includes('User already registered'))
    return 'This email is already registered. Please sign in instead.';
  if (msg.includes('Password should be at least'))
    return 'Password must be at least 6 characters long.';
  if (msg.includes('Unable to validate email address'))
    return 'Please enter a valid email address.';
  if (msg.includes('signup_disabled'))
    return 'New registrations are currently disabled. Please contact support.';
  return msg || 'Authentication failed. Please try again.';
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData,    setUserData]    = useState(null);
  // authLoading: true while we don't yet know if a session exists
  // profileLoading: true while we're fetching the profile after a session is found
  const [authLoading,    setAuthLoading]    = useState(true);
  const [profileLoading, setProfileLoading] = useState(false);

  // Convenience: are we still resolving anything?
  const loading = authLoading || profileLoading;

  // ── Sign up ──────────────────────────────────────────────
  async function signup(email, password, name) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });
    if (error) throw new Error(friendlyAuthError(error));
    return data.user;
  }

  // ── Sign in — returns the profile so the caller can redirect ─
  async function login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error(friendlyAuthError(error));
    // onAuthStateChange will fire and set currentUser + userData,
    // but we also return the profile here so Auth.jsx can redirect immediately.
    const profile = await syncProfile(data.user);
    return { user: data.user, profile };
  }

  // ── Sign out ─────────────────────────────────────────────
  async function logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }

  // ── Auth state listener ──────────────────────────────────
  useEffect(() => {
    // Resolve the initial session (page load / refresh)
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      const user = session?.user ?? null;
      setCurrentUser(user);
      if (user) {
        setProfileLoading(true);
        const profile = await syncProfile(user);
        setUserData(profile);
        setProfileLoading(false);
      }
      setAuthLoading(false);
    });

    // React to sign-in / sign-out / token-refresh events
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const user = session?.user ?? null;
        setCurrentUser(user);
        if (user) {
          setProfileLoading(true);
          const profile = await syncProfile(user);
          setUserData(profile);
          setProfileLoading(false);
        } else {
          setUserData(null);
        }
        setAuthLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // Helper: is the current user an admin?
  const isAdmin = userData?.role === 'admin';

  const value = {
    currentUser,
    userData,
    loading,
    isAdmin,
    signup,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {/* Don't render children until we know the auth state */}
      {!loading && children}
    </AuthContext.Provider>
  );
}
