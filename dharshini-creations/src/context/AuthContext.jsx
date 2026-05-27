import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { upsertUserProfile, fetchUserProfile } from '../services/supabase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
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
      options: { data: { name } },
    });
    if (error) throw error;

    // Create profile row
    if (data.user) {
      await upsertUserProfile({
        id:    data.user.id,
        name,
        email,
        role:  'user',
      });
    }
    return data.user;
  }

  // ── Sign in ──────────────────────────────────────────────
  async function login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
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
    supabase.auth.getSession().then(({ data: { session } }) => {
      const user = session?.user ?? null;
      setCurrentUser(user);
      if (user) {
        fetchUserProfile(user.id).then(setUserData);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const user = session?.user ?? null;
        setCurrentUser(user);
        if (user) {
          const profile = await fetchUserProfile(user.id);
          setUserData(profile);
        } else {
          setUserData(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const value = {
    currentUser,
    userData,
    signup,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
