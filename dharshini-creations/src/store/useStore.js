import { create } from 'zustand';
import { supabase } from '../lib/supabase';

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
  isLoading: true,

  initializeAuth: () => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      set({ 
        user: session?.user || null, 
        isAuthenticated: !!session?.user,
        isLoading: false
      });
      if (session?.user) {
        // Fetch profile
        supabase.from('profiles').select('*').eq('id', session.user.id).single()
          .then(({ data }) => {
            if (data) set({ profile: data });
          });
      }
    });

    // Listen for auth changes
    supabase.auth.onAuthStateChange((_event, session) => {
      set({ 
        user: session?.user || null, 
        isAuthenticated: !!session?.user,
        isLoading: false
      });
      if (!session?.user) {
        set({ profile: null, wishlist: [] });
      }
    });
  },

  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setProfile: (profile) => set({ profile }),
  toggleWishlist: (productId) => set((state) => ({
    wishlist: state.wishlist.includes(productId)
      ? state.wishlist.filter(id => id !== productId)
      : [...state.wishlist, productId]
  })),
  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null, profile: null, isAuthenticated: false });
  },
}));

export const useUIStore = create((set) => ({
  soundEnabled: false,
  showOpeningAnimation: true,
  cursorType: 'default',
  activeModal: null,

  toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
  setShowOpeningAnimation: (show) => set({ showOpeningAnimation: show }),
  setCursorType: (type) => set({ cursorType: type }),
  openModal: (modal) => set({ activeModal: modal }),
  closeModal: () => set({ activeModal: null }),
  markVisited: () => {
    sessionStorage.setItem('dc_visited', 'true');
    set({ showOpeningAnimation: false });
  },
}));

export const useOrderStore = create((set, get) => ({
  orders: JSON.parse(localStorage.getItem('dc_orders')) || [],
  placeOrder: (orderData) => {
    const newOrder = {
      ...orderData,
      id: `DC-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleDateString(),
      status: 'packed',
      dest: `${orderData.shippingAddress.city}, ${orderData.shippingAddress.state}`,
      est: '5 days',
      items: orderData.items.map(item => `${item.name} × ${item.quantity}`).join(', '),
      rawItems: orderData.items,
      total: orderData.total
    };
    
    const updatedOrders = [newOrder, ...get().orders];
    localStorage.setItem('dc_orders', JSON.stringify(updatedOrders));
    set({ orders: updatedOrders });
    
    return newOrder;
  },
  clearOrders: () => {
    localStorage.removeItem('dc_orders');
    set({ orders: [] });
  }
}));

export const useCustomizationStore = create((set, get) => ({
  draft: JSON.parse(localStorage.getItem('dc_customization_draft')) || null,
  
  saveDraft: (productId, data) => {
    const draftData = { productId, ...data, updatedAt: new Date().toISOString() };
    localStorage.setItem('dc_customization_draft', JSON.stringify(draftData));
    set({ draft: draftData });
  },
  
  clearDraft: () => {
    localStorage.removeItem('dc_customization_draft');
    set({ draft: null });
  }
}));
