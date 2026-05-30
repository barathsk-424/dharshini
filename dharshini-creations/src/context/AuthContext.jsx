import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useUserStore } from '../store/useStore';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

function normalizeRole(role) {
  return String(role || '').trim().toLowerCase();
}

// ── Read profile from DB (never creates/upserts) ─────────────
async function readProfile(userId) {
  if (!userId) return null;

  // Try up to 3 times with increasing delays
  for (let i = 0; i < 3; i++) {
    if (i > 0) await new Promise(r => setTimeout(r, i * 400));

    try {
      const [{ data: cp }, { data: up }] = await Promise.all([
        supabase.from('customer_profiles').select('id, name, email, role, status, password').eq('id', userId).maybeSingle(),
        supabase.from('users').select('id, name, email, role, status, password').eq('id', userId).maybeSingle(),
      ]);

      if (cp || up) {
        const cRole = normalizeRole(cp?.role);
        const uRole = normalizeRole(up?.role);
        const isAdmin = cRole === 'admin' || uRole === 'admin';
        const resolvedRole = isAdmin ? 'admin' : (cRole || uRole || 'user');
        const profile = { ...(cp || up), role: resolvedRole };
        try { localStorage.setItem('dc_user_role', resolvedRole); } catch {}
        return profile;
      }
    } catch (e) {
      console.warn(`[Auth] Profile read attempt ${i + 1} failed:`, e.message);
    }
  }

  // All retries failed — use cached role
  const cachedRole = localStorage.getItem('dc_user_role') || 'user';
  return { id: userId, role: cachedRole, status: 'Active' };
}

// ── Friendly auth errors ─────────────────────────────────────
function friendlyAuthError(error) {
  const msg = error?.message || '';
  const code = error?.code || '';
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
  return msg || 'Authentication failed. Please try again.';
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const setWishlist = useUserStore(s => s.setWishlist);

  // Load wishlist
  async function loadWishlist(userId) {
    try {
      const { data } = await supabase.from('wishlist').select('product_id').eq('user_id', userId);
      setWishlist(data?.map(w => w.product_id) || []);
    } catch {}
  }

  // ── Sign up ────────────────────────────────────────────────
  async function signup(email, password, name) {
    const { data, error } = await supabase.auth.signUp({
      email, password, options: { data: { name } },
    });
    if (error) throw new Error(friendlyAuthError(error));

    const user = data.user;
    if (user) {
      const row = {
        id: user.id, name: name || email.split('@')[0],
        email, role: 'user', status: 'Active', password,
      };
      await Promise.allSettled([
        supabase.from('customer_profiles').upsert(row, { onConflict: 'id' }),
        supabase.from('users').upsert(row, { onConflict: 'id' }),
      ]);
      try { localStorage.setItem('dc_user_role', 'user'); } catch {}
    }
    return user;
  }

  // ── Sign in ────────────────────────────────────────────────
  async function login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error(friendlyAuthError(error));
    const profile = await readProfile(data.user.id);
    return { user: data.user, profile };
  }

  // ── Logout ─────────────────────────────────────────────────
  async function logout() {
    setCurrentUser(null);
    setUserData(null);
    setWishlist([]);
    try {
      localStorage.removeItem('dc_user_role');
      const keys = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.includes('-auth-token')) keys.push(k);
      }
      keys.forEach(k => localStorage.removeItem(k));
    } catch {}
    try {
      await Promise.race([
        supabase.auth.signOut(),
        new Promise((_, r) => setTimeout(() => r(), 2000)),
      ]);
    } catch {}
  }

  // ── Single auth listener — handles EVERYTHING ──────────────
  useEffect(() => {
    let cancelled = false;
    let initialDone = false;

    async function handleUser(user) {
      if (cancelled) return;
      setCurrentUser(user);

      if (user) {
        const profile = await readProfile(user.id);
        if (cancelled) return;
        setUserData(profile);
        await loadWishlist(user.id);
      } else {
        setUserData(null);
        setWishlist([]);
      }

      if (cancelled) return;
      setLoading(false);
    }

    // 1) Restore session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (cancelled) return;
      initialDone = true;
      handleUser(session?.user ?? null);
    });

    // 2) Listen for auth changes (login, logout, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (cancelled) return;
        // Skip INITIAL_SESSION since getSession handles the initial load
        if (event === 'INITIAL_SESSION') return;
        handleUser(session?.user ?? null);
      }
    );

    // 3) Safety: if nothing fires within 4s, stop loading
    const timer = setTimeout(() => {
      if (!cancelled) setLoading(false);
    }, 4000);

    return () => {
      cancelled = true;
      subscription.unsubscribe();
      clearTimeout(timer);
    };
  }, []);

  // ── isAdmin ────────────────────────────────────────────────
  const isAdmin = Boolean(
    currentUser && !loading && normalizeRole(userData?.role) === 'admin'
  );

  return (
    <AuthContext.Provider value={{
      currentUser, userData, loading, isAdmin,
      signup, login, logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
}
