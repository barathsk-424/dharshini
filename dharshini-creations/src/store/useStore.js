import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// NOTE: supabase is NOT imported here at module level to avoid circular deps.
// Wishlist sync is handled by AuthContext which owns the supabase client.

export const useCartStore = create(persist((set, get) => ({
  items: [],
  isOpen: false,

  addItem: (product, options = {}) => {
    const { items } = get();
    const existingIndex = items.findIndex(
      item => item.id === product.id && JSON.stringify(item.options) === JSON.stringify(options)
    );
    if (existingIndex > -1) {
      const newItems = [...items];
      newItems[existingIndex].quantity += 1;
      set({ items: newItems });
    } else {
      set({ items: [...items, { ...product, options, quantity: 1 }] });
    }
  },

  removeItem: (index) => {
    set({ items: get().items.filter((_, i) => i !== index) });
  },

  updateQuantity: (index, quantity) => {
    if (quantity <= 0) { get().removeItem(index); return; }
    const newItems = [...get().items];
    newItems[index].quantity = quantity;
    set({ items: newItems });
  },

  getTotal: () =>
    get().items.reduce((total, item) => total + (item.basePrice || item.base_price || item.price || 0) * item.quantity, 0),

  getItemCount: () =>
    get().items.reduce((count, item) => count + item.quantity, 0),

  toggleCart: () => set({ isOpen: !get().isOpen }),
  clearCart:  () => set({ items: [] }),
}), {
  name: 'dc-cart-store',
  storage: createJSONStorage(() => localStorage),
  partialize: (state) => ({ items: state.items }),
}));


export const useUserStore = create((set, get) => ({
  user:            null,
  profile:         null,
  isAuthenticated: false,
  wishlist:        [],   // array of product_id numbers
  isLoading:       true,

  setUser:     (user)    => set({ user, isAuthenticated: !!user, isLoading: false }),
  setProfile:  (profile) => set({ profile }),
  setWishlist: (ids)     => set({ wishlist: ids }),

  // Simple local toggle — Supabase sync is done in the component/context that calls this
  toggleWishlist: (productId) => {
    const { wishlist } = get();
    set({
      wishlist: wishlist.includes(productId)
        ? wishlist.filter(id => id !== productId)
        : [...wishlist, productId],
    });
  },

  logout: () => set({ user: null, profile: null, isAuthenticated: false, wishlist: [] }),
}));


export const useUIStore = create((set) => ({
  soundEnabled:         false,
  showOpeningAnimation: true,
  cursorType:           'default',
  activeModal:          null,

  toggleSound:             () => set(s => ({ soundEnabled: !s.soundEnabled })),
  setShowOpeningAnimation: (show) => set({ showOpeningAnimation: show }),
  setCursorType:           (type) => set({ cursorType: type }),
  openModal:               (modal) => set({ activeModal: modal }),
  closeModal:              () => set({ activeModal: null }),
  markVisited: () => {
    sessionStorage.setItem('dc_visited', 'true');
    set({ showOpeningAnimation: false });
  },
}));


export const useCustomizationStore = create((set) => ({
  draft: (() => {
    try { return JSON.parse(localStorage.getItem('dc_customization_draft')) || null; }
    catch { return null; }
  })(),

  saveDraft: (productId, data) => {
    const draftData = { productId, ...data, updatedAt: new Date().toISOString() };
    try { localStorage.setItem('dc_customization_draft', JSON.stringify(draftData)); } catch {}
    set({ draft: draftData });
  },

  clearDraft: () => {
    try { localStorage.removeItem('dc_customization_draft'); } catch {}
    set({ draft: null });
  },
}));


// ── ORDER STORE ──────────────────────────────────────────────
export const useOrderStore = create(persist((set, get) => ({
  orders: [],
  checkoutForm: {
    fullName: '', email: '', phone: '', address: '', city: '', state: '', pincode: ''
  },

  setOrders: (orders) => set({ orders }),
  setCheckoutForm: (form) => set({ checkoutForm: form }),

  placeOrder: (orderData) => {
    const id = 'DC' + Date.now().toString(36).toUpperCase();
    const newOrder = {
      id,
      date:   new Date().toLocaleDateString('en-IN'),
      status: 'pending',
      ...orderData,
    };
    set({ orders: [newOrder, ...get().orders] });
    return newOrder;
  },
}), {
  name: 'dc-order-store',
  storage: createJSONStorage(() => localStorage),
}));
