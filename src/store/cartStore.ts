import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { CartState } from '../types';

const generateCartItemId = (productId: string, selectedVariations: Record<string, string>): string => {
  const varKey = Object.entries(selectedVariations)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}:${v}`)
    .join('|');
  return `${productId}__${varKey}`;
};

export const useCartStore = create<CartState>()(
  persist(
    immer((set, get) => ({
      items: [],
      isOpen: false,

      addItem: (item) => {
        const id = generateCartItemId(item.productId, item.selectedVariations);
        set((state) => {
          const existingIndex = state.items.findIndex((i) => i.id === id);
          if (existingIndex >= 0) {
            const existing = state.items[existingIndex];
            const newQty = existing.quantity + item.quantity;
            existing.quantity = item.maxQuantity ? Math.min(newQty, item.maxQuantity) : newQty;
          } else {
            state.items.push({ ...item, id });
          }
          state.isOpen = true;
        });
      },

      removeItem: (id) => {
        set((state) => {
          state.items = state.items.filter((item) => item.id !== id);
        });
      },

      updateQuantity: (id, quantity) => {
        set((state) => {
          const item = state.items.find((i) => i.id === id);
          if (item) {
            if (quantity <= 0) {
              state.items = state.items.filter((i) => i.id !== id);
            } else {
              item.quantity = quantity;
            }
          }
        });
      },

      clearCart: () => {
        set((state) => {
          state.items = [];
        });
      },

      toggleCart: () => {
        set((state) => {
          state.isOpen = !state.isOpen;
        });
      },

      openCart: () => {
        set((state) => {
          state.isOpen = true;
        });
      },

      closeCart: () => {
        set((state) => {
          state.isOpen = false;
        });
      },

      getTotalItems: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      },
    })),
    {
      name: 'easy-order-cart',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    }
  )
);
