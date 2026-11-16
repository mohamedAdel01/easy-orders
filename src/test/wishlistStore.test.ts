import { describe, it, expect, beforeEach } from 'vitest';
import { useWishlistStore } from '../store/wishlistStore';

describe('useWishlistStore', () => {
  beforeEach(() => {
    useWishlistStore.getState().clearWishlist();
  });

  it('adds an item to the wishlist', () => {
    const { addItem } = useWishlistStore.getState();

    addItem({
      productId: 'prod-1',
      name: 'Achilles Pro Sneakers',
      price: 160,
      thumb: 'test-sneaker.jpg',
      slug: 'Sneakers12',
    });

    const state = useWishlistStore.getState();
    expect(state.items).toHaveLength(1);
    expect(state.items[0].productId).toBe('prod-1');
    expect(state.items[0].name).toBe('Achilles Pro Sneakers');
    expect(state.isInWishlist('prod-1')).toBe(true);
  });

  it('does not duplicate items when adding existing item', () => {
    const { addItem } = useWishlistStore.getState();

    addItem({
      productId: 'prod-1',
      name: 'Achilles Pro Sneakers',
      price: 160,
      thumb: 'test-sneaker.jpg',
    });

    addItem({
      productId: 'prod-1',
      name: 'Achilles Pro Sneakers',
      price: 160,
      thumb: 'test-sneaker.jpg',
    });

    expect(useWishlistStore.getState().items).toHaveLength(1);
  });

  it('removes an item from the wishlist', () => {
    const { addItem, removeItem } = useWishlistStore.getState();

    addItem({
      productId: 'prod-1',
      name: 'Achilles Pro Sneakers',
      price: 160,
      thumb: 'test.jpg',
    });

    removeItem('prod-1');
    expect(useWishlistStore.getState().items).toHaveLength(0);
    expect(useWishlistStore.getState().isInWishlist('prod-1')).toBe(false);
  });

  it('toggles item in wishlist (adds if absent, removes if present)', () => {
    const { toggleItem } = useWishlistStore.getState();

    const added = toggleItem({
      productId: 'prod-2',
      name: 'Wide Leg Cropped Jeans',
      price: 75,
      thumb: 'jeans.jpg',
    });

    expect(added).toBe(true);
    expect(useWishlistStore.getState().isInWishlist('prod-2')).toBe(true);

    const removed = toggleItem({
      productId: 'prod-2',
      name: 'Wide Leg Cropped Jeans',
      price: 75,
      thumb: 'jeans.jpg',
    });

    expect(removed).toBe(false);
    expect(useWishlistStore.getState().isInWishlist('prod-2')).toBe(false);
  });

  it('controls wishlist drawer open and close state', () => {
    const { openWishlist, closeWishlist, toggleWishlist } = useWishlistStore.getState();

    expect(useWishlistStore.getState().isOpen).toBe(false);

    openWishlist();
    expect(useWishlistStore.getState().isOpen).toBe(true);

    closeWishlist();
    expect(useWishlistStore.getState().isOpen).toBe(false);

    toggleWishlist();
    expect(useWishlistStore.getState().isOpen).toBe(true);
  });
});
