import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

// ── Sync profile to customer_profiles table ──────────────────
// Uses .maybeSingle() — returns null instead of throwing 406
// when no row exists yet.
async function syncProfile(user) {
  if (!user) return null;
  try {
    // Check if profile already exists
    const { data: existing, error: fetchError } = await supabase
      .from('customer_profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();   // ← won't throw 406 if row is missing

    if (fetchError) {
      console.warn('Profile fetch error:', fetchError.message);
    }

    if (existing) return existing;

    // Create profile for new user
    const profile = {
      id:       user.id,
      name:     user.user_metadata?.name || user.email?.split('@')[0] || 'User',
      email:    user.email,
      role:     'user',
      status:   'Active',
      password: user.user_metadata?.password || null,
    };

    const { data: inserted, error: insertError } = await supabase
      .from('customer_profiles')
      .insert(profile)
      .select()
      .maybeSingle();

    if (insertError) {
      console.warn('Profile insert error (non-fatal):', insertError.message);
      return profile; // return local object so UI still works
    }
    return inserted ?? profile;
  } catch (e) {
    console.warn('syncProfile error (non-fatal):', e.message);
    return null;
  }
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
      options: { data: { name, password } },  // stored in user_metadata for profile sync
    });
    if (error) {
      console.error('Signup error:', error);
      throw new Error(error.message || 'Signup failed. Please try again.');
    }
    return data.user;
  }

  // ── Sign in ──────────────────────────────────────────────
  async function login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.error('Login error:', error);
      throw new Error(error.message || 'Login failed. Please check your credentials.');
    }
    return data.user;
  }

  // ── Sign out ─────────────────────────────────────────────
  async function logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }

  // ── Auth state listener ──────────────────────────────────
  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      const user = session?.user ?? null;
      setCurrentUser(user);
      if (user) {
        const profile = await syncProfile(user);
        setUserData(profile);
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
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
