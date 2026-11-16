import { describe, it, expect, beforeEach } from 'vitest';
import { useProductStore } from '../store/productStore';
import type { Product } from '../types';

const mockProduct: Product = {
  id: 'prod-100',
  name: 'Achilles Pro - Genuine Suede X Leather Sneakers',
  slug: 'Sneakers12',
  description: '<p>Premium sneakers</p>',
  price: 190,
  sale_price: 160,
  quantity: 25,
  track_stock: true,
  disable_orders_for_no_stock: true,
  thumb: 'thumb.jpg',
  images: ['thumb.jpg'],
  categories: [{ id: 'cat-1', name: 'Shoes', slug: 'shoes' }],
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  store_id: 'store-1',
  variations: [
    {
      id: 'var-color',
      name: 'color',
      product_id: 'prod-100',
      type: 'image',
      props: [
        { id: 'c1', name: 'brown', value: 'brown.jpg' },
        { id: 'c2', name: 'black', value: 'black.jpg' },
      ],
    },
    {
      id: 'var-size',
      name: 'size',
      product_id: 'prod-100',
      type: 'button',
      props: [
        { id: 's1', name: '38' },
        { id: 's2', name: '40' },
      ],
    },
  ],
  variants: [
    {
      id: 'variant-brown-38',
      product_id: 'prod-100',
      price: 190,
      sale_price: 160,
      quantity: 10,
      taager_code: 'BR-38',
      variation_props: [
        { id: 'vp1', variation: 'color', variation_prop: 'brown', product_variant_id: 'v1' },
        { id: 'vp2', variation: 'size', variation_prop: '38', product_variant_id: 'v1' },
      ],
    },
    {
      id: 'variant-black-40',
      product_id: 'prod-100',
      price: 210,
      sale_price: 180,
      quantity: 5,
      taager_code: 'BL-40',
      variation_props: [
        { id: 'vp3', variation: 'color', variation_prop: 'black', product_variant_id: 'v2' },
        { id: 'vp4', variation: 'size', variation_prop: '40', product_variant_id: 'v2' },
      ],
    },
    {
      id: 'variant-brown-40',
      product_id: 'prod-100',
      price: 190,
      sale_price: 160,
      quantity: 0, // out of stock
      taager_code: 'BR-40',
      variation_props: [
        { id: 'vp5', variation: 'color', variation_prop: 'brown', product_variant_id: 'v3' },
        { id: 'vp6', variation: 'size', variation_prop: '40', product_variant_id: 'v3' },
      ],
    },
  ],
};

describe('useProductStore', () => {
  beforeEach(() => {
    useProductStore.getState().setProduct(mockProduct);
  });

  it('initializes default variations and matches initial variant', () => {
    const state = useProductStore.getState();
    expect(state.product?.name).toBe('Achilles Pro - Genuine Suede X Leather Sneakers');
    expect(state.selectedVariations['color']).toBe('brown');
    expect(state.selectedVariations['size']).toBe('38');
    expect(state.selectedVariant?.id).toBe('variant-brown-38');
    expect(state.getCurrentPrice()).toBe(160);
    expect(state.getOriginalPrice()).toBe(190);
  });

  it('switches variations and updates variant and prices', () => {
    const { setSelectedVariation } = useProductStore.getState();

    setSelectedVariation('color', 'black');
    setSelectedVariation('size', '40');

    const state = useProductStore.getState();
    expect(state.selectedVariant?.id).toBe('variant-black-40');
    expect(state.getCurrentPrice()).toBe(180);
    expect(state.getOriginalPrice()).toBe(210);
  });

  it('detects unavailable or out-of-stock combinations', () => {
    const { setSelectedVariation, isCombinationAvailable } = useProductStore.getState();

    // Select brown
    setSelectedVariation('color', 'brown');

    // Brown + 38 has quantity 10 -> available
    expect(isCombinationAvailable('size', '38')).toBe(true);

    // Brown + 40 has quantity 0 -> out of stock
    expect(isCombinationAvailable('size', '40')).toBe(false);
  });

  it('updates quantity with min constraint', () => {
    const { setQuantity } = useProductStore.getState();

    setQuantity(5);
    expect(useProductStore.getState().quantity).toBe(5);

    setQuantity(-3);
    expect(useProductStore.getState().quantity).toBe(1);
  });
});
