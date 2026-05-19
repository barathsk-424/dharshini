import { create } from 'zustand';

export const useCartStore = create((set, get) => ({
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
    if (quantity <= 0) {
      get().removeItem(index);
      return;
    }
    const newItems = [...get().items];
    newItems[index].quantity = quantity;
    set({ items: newItems });
  },

  getTotal: () => {
    return get().items.reduce((total, item) => total + (item.basePrice || item.price || 0) * item.quantity, 0);
  },

  getItemCount: () => {
    return get().items.reduce((count, item) => count + item.quantity, 0);
  },

  toggleCart: () => set({ isOpen: !get().isOpen }),
  clearCart: () => set({ items: [] }),
}));

export const useUserStore = create((set) => ({
  user: null,
  profile: null,
  isAuthenticated: false,
  wishlist: [],

  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setProfile: (profile) => set({ profile }),
  toggleWishlist: (productId) => set((state) => ({
    wishlist: state.wishlist.includes(productId)
      ? state.wishlist.filter(id => id !== productId)
      : [...state.wishlist, productId]
  })),
  logout: () => set({ user: null, profile: null, isAuthenticated: false }),
}));

export const useUIStore = create((set) => ({
  soundEnabled: false,
  showOpeningAnimation: !localStorage.getItem('dc_visited'),
  cursorType: 'default',
  activeModal: null,

  toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
  setShowOpeningAnimation: (show) => set({ showOpeningAnimation: show }),
  setCursorType: (type) => set({ cursorType: type }),
  openModal: (modal) => set({ activeModal: modal }),
  closeModal: () => set({ activeModal: null }),
  markVisited: () => {
    localStorage.setItem('dc_visited', 'true');
    set({ showOpeningAnimation: false });
  },
}));
