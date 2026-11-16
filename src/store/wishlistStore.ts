import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export interface WishlistItem {
  productId: string;
  name: string;
  price: number;
  thumb: string;
  slug?: string;
  addedAt: string;
}

interface WishlistState {
  items: WishlistItem[];
  isOpen: boolean;
  addItem: (item: Omit<WishlistItem, 'addedAt'>) => void;
  removeItem: (productId: string) => void;
  toggleItem: (item: Omit<WishlistItem, 'addedAt'>) => boolean; // returns true if added, false if removed
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
  getTotalItems: () => number;
  openWishlist: () => void;
  closeWishlist: () => void;
  toggleWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    immer((set, get) => ({
      items: [],
      isOpen: false,

      openWishlist: () => set((state) => { state.isOpen = true; }),
      closeWishlist: () => set((state) => { state.isOpen = false; }),
      toggleWishlist: () => set((state) => { state.isOpen = !state.isOpen; }),

      addItem: (item) => {
        set((state) => {
          if (!state.items.some((i) => i.productId === item.productId)) {
            state.items.push({ ...item, addedAt: new Date().toISOString() });
          }
        });
      },

      removeItem: (productId) => {
        set((state) => {
          state.items = state.items.filter((i) => i.productId !== productId);
        });
      },

      toggleItem: (item) => {
        const isPresent = get().isInWishlist(item.productId);
        if (isPresent) {
          get().removeItem(item.productId);
          return false;
        } else {
          get().addItem(item);
          return true;
        }
      },

      isInWishlist: (productId) => {
        return get().items.some((i) => i.productId === productId);
      },

      clearWishlist: () => {
        set((state) => {
          state.items = [];
        });
      },

      getTotalItems: () => {
        return get().items.length;
      },
    })),
    {
      name: 'easy-order-wishlist',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
