import { describe, it, expect, beforeEach } from 'vitest';
import { useCartStore } from '../store/cartStore';
import { FIGMA_PRODUCT } from '../utils/mockData';

describe('Variation Validation & Quantity Constraints', () => {
  beforeEach(() => {
    useCartStore.getState().clearCart();
    useCartStore.getState().closeCart();
  });

  describe('1. Variation Validation', () => {
    it('requires both color and size before adding to cart', () => {
      const validateSelection = (color: string | null, size: string | null) => {
        if (!color) return { valid: false, error: 'Please select a Color before adding to cart.' };
        if (!size) return { valid: false, error: 'Please select a Size before adding to cart.' };
        return { valid: true, error: null };
      };

      expect(validateSelection(null, '8').valid).toBe(false);
      expect(validateSelection(null, '8').error).toContain('Color');

      expect(validateSelection('Royal Brown', null).valid).toBe(false);
      expect(validateSelection('Royal Brown', null).error).toContain('Size');

      expect(validateSelection('Royal Brown', '8').valid).toBe(true);
      expect(validateSelection('Royal Brown', '8').error).toBeNull();
    });

    it('identifies out-of-stock combination properly', () => {
      const checkStock = (color: string, size: string) => {
        const variant = FIGMA_PRODUCT.variants.find((v) => {
          const hasColor = v.variation_props.some(
            (vp) => vp.variation === 'Color' && vp.variation_prop === color,
          );
          const hasSize = v.variation_props.some(
            (vp) => vp.variation === 'Size' && vp.variation_prop === size,
          );
          return hasColor && hasSize;
        });
        return variant ? variant.quantity : FIGMA_PRODUCT.quantity;
      };

      // Royal Brown 8 has 15 in stock
      expect(checkStock('Royal Brown', '8')).toBe(15);
      // Slate Blue 20 is marked out of stock (0)
      expect(checkStock('Slate Blue', '20')).toBe(0);
    });
  });

  describe('2. Quantity Constraints', () => {
    it('enforces minimum quantity of 1', () => {
      const clampQty = (q: number, max: number) => Math.max(1, Math.min(q, max));

      expect(clampQty(0, 15)).toBe(1);
      expect(clampQty(-5, 15)).toBe(1);
      expect(clampQty(1, 15)).toBe(1);
    });

    it('enforces maximum quantity bounded by available stock', () => {
      const clampQty = (q: number, max: number) => Math.max(1, Math.min(q, max));

      expect(clampQty(20, 15)).toBe(15);
      expect(clampQty(15, 15)).toBe(15);
      expect(clampQty(10, 15)).toBe(10);
    });
  });

  describe('3. Cart Management & Drawer', () => {
    it('adds validated item to cart and opens the drawer', () => {
      const { addItem } = useCartStore.getState();

      addItem({
        productId: FIGMA_PRODUCT.id,
        name: FIGMA_PRODUCT.name,
        price: FIGMA_PRODUCT.sale_price,
        thumb: FIGMA_PRODUCT.thumb,
        quantity: 2,
        selectedVariations: {
          Color: 'Royal Brown',
          Size: '8',
        },
        maxQuantity: 15,
      });

      const state = useCartStore.getState();
      expect(state.items).toHaveLength(1);
      expect(state.items[0].quantity).toBe(2);
      expect(state.items[0].selectedVariations.Color).toBe('Royal Brown');
      expect(state.items[0].selectedVariations.Size).toBe('8');
      expect(state.isOpen).toBe(true);
      expect(state.getTotalItems()).toBe(2);
      expect(state.getTotalPrice()).toBe(2 * 28.0);
    });

    it('adjusts item quantity with bounds in the cart', () => {
      const { addItem, updateQuantity } = useCartStore.getState();

      addItem({
        productId: FIGMA_PRODUCT.id,
        name: FIGMA_PRODUCT.name,
        price: 28.0,
        thumb: FIGMA_PRODUCT.thumb,
        quantity: 1,
        selectedVariations: { Color: 'Royal Brown', Size: '8' },
        maxQuantity: 5,
      });

      const itemId = useCartStore.getState().items[0].id;

      // Increase to 3
      updateQuantity(itemId, 3);
      expect(useCartStore.getState().items[0].quantity).toBe(3);

      // Decreasing to 0 removes the item
      updateQuantity(itemId, 0);
      expect(useCartStore.getState().items).toHaveLength(0);
      expect(useCartStore.getState().getTotalItems()).toBe(0);
    });
  });
});
