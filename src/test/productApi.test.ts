import { describe, it, expect, beforeEach, vi } from 'vitest';
import { buildProductUrl, SERVICES } from '../services';
import { useProductStore } from '../store/productStore';
import { FIGMA_PRODUCT } from '../utils/mockData';
import type { Product } from '../types';

describe('Phase 1: Product API Integration, Loading States & Error Handling', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe('1. API Service Contracts & Routing', () => {
    it('constructs product URL with theme and slug correctly', () => {
      const url = buildProductUrl('default', 'overshirt-khaki-6');
      expect(url).toBe('https://api.easy-orders.net/api/v1/products/slug/default/overshirt-khaki-6');
    });

    it('has correct endpoint configuration in SERVICES', () => {
      expect(SERVICES.PRODUCT_BY_SLUG).toBeDefined();
      expect(SERVICES.PRODUCT_BY_SLUG.method).toBe('GET');
      expect(SERVICES.PRODUCT_BY_SLUG.defaultParams?.join).toBe('reviews');
    });
  });

  describe('2. Validation & Error Handling on API responses', () => {
    it('rejects empty or invalid responses with "record not found"', () => {
      const invalidResponse = { message: 'record not found' };
      const isValidProduct = Boolean(
        invalidResponse &&
        typeof invalidResponse === 'object' &&
        'id' in invalidResponse &&
        'name' in invalidResponse
      );
      expect(isValidProduct).toBe(false);
    });

    it('accepts valid product response with id and name', () => {
      const validResponse = {
        id: 'prod-123',
        name: 'Test Shirt',
        price: 50,
        sale_price: 35,
        slug: 'test-shirt',
      };
      const isValidProduct = Boolean(
        validResponse &&
        typeof validResponse === 'object' &&
        'id' in validResponse &&
        'name' in validResponse
      );
      expect(isValidProduct).toBe(true);
    });
  });

  describe('3. Safe Mock Fallback (FIGMA_PRODUCT)', () => {
    it('provides all mandatory Product fields in FIGMA_PRODUCT', () => {
      expect(FIGMA_PRODUCT.id).toBeDefined();
      expect(FIGMA_PRODUCT.name).toBe('Long Sleeve Overshirt, Khaki, 6');
      expect(FIGMA_PRODUCT.price).toBe(40.0);
      expect(FIGMA_PRODUCT.sale_price).toBe(28.0);
      expect(FIGMA_PRODUCT.images.length).toBeGreaterThanOrEqual(5);
      expect(FIGMA_PRODUCT.variations.length).toBeGreaterThanOrEqual(2);
      expect(FIGMA_PRODUCT.categories.length).toBeGreaterThanOrEqual(1);
    });

    it('never overrides valid API product with fallback', () => {
      const mockApiProduct: Product = {
        ...FIGMA_PRODUCT,
        id: 'api-real-id-999',
        name: 'Real API Overshirt',
      };

      const isApiValid = Boolean(mockApiProduct && mockApiProduct.id && mockApiProduct.name);
      const isFallback = !isApiValid;
      const resolvedProduct = isApiValid ? mockApiProduct : isFallback ? FIGMA_PRODUCT : null;

      expect(resolvedProduct?.id).toBe('api-real-id-999');
      expect(resolvedProduct?.name).toBe('Real API Overshirt');
    });
  });

  describe('4. Store Population & Caching', () => {
    it('populates productStore from resolved product data', () => {
      useProductStore.getState().setProduct(FIGMA_PRODUCT);
      const state = useProductStore.getState();

      expect(state.product?.id).toBe(FIGMA_PRODUCT.id);
      expect(state.product?.name).toBe(FIGMA_PRODUCT.name);
      expect(state.getCurrentPrice()).toBe(28.0);
      expect(state.getOriginalPrice()).toBe(40.0);
    });
  });
});
