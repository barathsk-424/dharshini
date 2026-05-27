import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

// ── Sync profile to customer_profiles table ──────────────────
// Uses upsert so it works for both new and returning users.
// Never stores passwords — auth is handled entirely by Supabase Auth.
async function syncProfile(user) {
  if (!user) return null;
  try {
    const profile = {
      id:     user.id,
      name:   user.user_metadata?.name || user.email?.split('@')[0] || 'User',
      email:  user.email,
      role:   user.user_metadata?.role || 'user',
      status: 'Active',
    };

    const { data, error } = await supabase
      .from('customer_profiles')
      .upsert(profile, { onConflict: 'id', ignoreDuplicates: false })
      .select()
      .maybeSingle();

    if (error) {
      console.warn('Profile sync error (non-fatal):', error.message);
      return profile; // return local object so UI still works
    }
    return data ?? profile;
  } catch (e) {
    console.warn('syncProfile error (non-fatal):', e.message);
    return null;
  }
}

// ── Map Supabase error codes to user-friendly messages ───────
function friendlyAuthError(error) {
  const msg = error?.message || '';
  const code = error?.code || '';

  if (code === 'invalid_credentials' || msg.includes('Invalid login credentials')) {
    return 'Invalid email or password. Please check your credentials and try again.';
  }
  if (code === 'email_not_confirmed' || msg.includes('Email not confirmed')) {
    return 'Your email address has not been confirmed. Please check your inbox.';
  }
  if (code === 'user_already_exists' || msg.includes('User already registered')) {
    return 'This email is already registered. Please sign in instead.';
  }
  if (msg.includes('Password should be at least')) {
    return 'Password must be at least 6 characters long.';
  }
  if (msg.includes('Unable to validate email address')) {
    return 'Please enter a valid email address.';
  }
  if (msg.includes('signup_disabled')) {
    return 'New registrations are currently disabled. Please contact support.';
  }
  return msg || 'Authentication failed. Please try again.';
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData]       = useState(null);
  const [loading, setLoading]         = useState(true);

  // ── Sign up ──────────────────────────────────────────────
  async function signup(email, password, name) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },  // stored in user_metadata — no password in metadata
      },
    });
    if (error) throw new Error(friendlyAuthError(error));
    // If email confirmation is disabled, user is immediately active
    // If enabled, data.user will exist but session will be null
    return data.user;
  }

  // ── Sign in ──────────────────────────────────────────────
  async function login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw new Error(friendlyAuthError(error));
    return data.user;
  }

  // ── Sign out ─────────────────────────────────────────────
  async function logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }

  // ── Auth state listener ──────────────────────────────────
  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      const user = session?.user ?? null;
      setCurrentUser(user);
      if (user) {
        const profile = await syncProfile(user);
        setUserData(profile);
      }
      setLoading(false);
    });

    // Listen for auth changes (login, logout, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const user = session?.user ?? null;
        setCurrentUser(user);
        if (user) {
          const profile = await syncProfile(user);
          setUserData(profile);
        } else {
          setUserData(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const value = { currentUser, userData, signup, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
