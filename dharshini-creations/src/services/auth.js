// src/services/auth.js

/**
 * Simple mock authentication service using localStorage.
 * In a real app replace with proper API calls.
 */
const TOKEN_KEY = 'authToken';

export const auth = {
  /**
   * Mock sign‑up – accepts user data and returns a fake token.
   */
  signup: async (userData) => {
    // Here you would normally send a request to your backend.
    // For demo purposes we just store a token.
    const fakeToken = btoa(JSON.stringify({ ...userData, id: Date.now() }));
    localStorage.setItem(TOKEN_KEY, fakeToken);
    return { token: fakeToken, user: userData };
  },

  /**
   * Mock sign‑in – checks stored token for matching email.
   */
  login: async ({ email, password }) => {
    // In a real app verify credentials via API.
    // We'll just generate a token if email & password are non‑empty.
    if (!email || !password) throw new Error('Missing credentials');
    const fakeToken = btoa(JSON.stringify({ email, id: Date.now() }));
    localStorage.setItem(TOKEN_KEY, fakeToken);
    return { token: fakeToken, user: { email } };
  },

  /**
   * Remove token from storage.
   */
  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
  },

  /**
   * Retrieve current user info from token.
   */
  getCurrentUser: () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return null;
    try {
      return JSON.parse(atob(token));
    } catch (e) {
      return null;
    }
  },

  /**
   * Helper to check auth status.
   */
  isAuthenticated: () => !!localStorage.getItem(TOKEN_KEY),
};

export default auth;
