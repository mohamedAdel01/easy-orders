import { describe, it, expect, beforeEach } from 'vitest';
import { useCartStore } from '../store/cartStore';

describe('useCartStore', () => {
  beforeEach(() => {
    useCartStore.getState().clearCart();
  });

  it('adds an item to the cart', () => {
    const { addItem } = useCartStore.getState();

    addItem({
      productId: 'prod-1',
      name: 'Long Sleeve Overshirt',
      price: 28,
      thumb: 'test.jpg',
      quantity: 1,
      selectedVariations: { color: 'Royal Brown', size: '8' },
      maxQuantity: 10,
    });

    const state = useCartStore.getState();
    expect(state.items).toHaveLength(1);
    expect(state.items[0].name).toBe('Long Sleeve Overshirt');
    expect(state.items[0].quantity).toBe(1);
    expect(state.items[0].price).toBe(28);
  });

  it('increments quantity when adding same variation combination', () => {
    const { addItem } = useCartStore.getState();

    addItem({
      productId: 'prod-1',
      name: 'Long Sleeve Overshirt',
      price: 28,
      thumb: 'test.jpg',
      quantity: 1,
      selectedVariations: { color: 'Royal Brown', size: '8' },
      maxQuantity: 10,
    });

    addItem({
      productId: 'prod-1',
      name: 'Long Sleeve Overshirt',
      price: 28,
      thumb: 'test.jpg',
      quantity: 2,
      selectedVariations: { color: 'Royal Brown', size: '8' },
      maxQuantity: 10,
    });

    const state = useCartStore.getState();
    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(3);
  });

  it('creates separate items for different variation combinations', () => {
    const { addItem } = useCartStore.getState();

    addItem({
      productId: 'prod-1',
      name: 'Long Sleeve Overshirt',
      price: 28,
      thumb: 'test.jpg',
      quantity: 1,
      selectedVariations: { color: 'Royal Brown', size: '8' },
      maxQuantity: 10,
    });

    addItem({
      productId: 'prod-1',
      name: 'Long Sleeve Overshirt',
      price: 28,
      thumb: 'test.jpg',
      quantity: 1,
      selectedVariations: { color: 'Off White', size: '10' },
      maxQuantity: 10,
    });

    const state = useCartStore.getState();
    expect(state.items).toHaveLength(2);
    expect(state.getTotalItems()).toBe(2);
  });

  it('updates quantity of an existing item', () => {
    const { addItem, updateQuantity } = useCartStore.getState();

    addItem({
      productId: 'prod-1',
      name: 'Long Sleeve Overshirt',
      price: 28,
      thumb: 'test.jpg',
      quantity: 1,
      selectedVariations: {},
      maxQuantity: 10,
    });

    const itemId = useCartStore.getState().items[0].id;
    updateQuantity(itemId, 5);

    expect(useCartStore.getState().items[0].quantity).toBe(5);
  });

  it('removes an item by id', () => {
    const { addItem, removeItem } = useCartStore.getState();

    addItem({
      productId: 'prod-1',
      name: 'Long Sleeve Overshirt',
      price: 28,
      thumb: 'test.jpg',
      quantity: 1,
      selectedVariations: {},
      maxQuantity: 10,
    });

    const itemId = useCartStore.getState().items[0].id;
    removeItem(itemId);

    expect(useCartStore.getState().items).toHaveLength(0);
  });

  it('calculates total price correctly', () => {
    const { addItem, getTotalPrice } = useCartStore.getState();

    addItem({
      productId: 'prod-1',
      name: 'Item 1',
      price: 20,
      thumb: 'test.jpg',
      quantity: 2,
      selectedVariations: {},
    });

    addItem({
      productId: 'prod-2',
      name: 'Item 2',
      price: 35,
      thumb: 'test.jpg',
      quantity: 1,
      selectedVariations: {},
    });

    expect(getTotalPrice()).toBe(75); // (20 * 2) + (35 * 1) = 75
  });

  it('clears all items from the cart', () => {
    const { addItem, clearCart } = useCartStore.getState();

    addItem({
      productId: 'prod-1',
      name: 'Item 1',
      price: 20,
      thumb: 'test.jpg',
      quantity: 1,
      selectedVariations: {},
    });

    clearCart();
    expect(useCartStore.getState().items).toHaveLength(0);
  });
});