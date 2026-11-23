import { useQuery } from '@tanstack/react-query';
import type { Product } from '../types';
import { globalStore } from '../store/globalStore';
import { buildProductUrl } from '../services';

const PRODUCT_BY_SLUG = async (theme: string, slug: string): Promise<Product> => {
  globalStore.setLoading(['PRODUCT_BY_SLUG', true]);
  try {
    const url = `${buildProductUrl(theme, slug)}?join=reviews`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch product: ${response.status} ${response.statusText}`.trim());
    }
    const data = await response.json();
    if (!data || typeof data !== 'object' || !('id' in data) || !('name' in data)) {
      const msg =
        (data && typeof data === 'object' && 'message' in data && String((data as { message: unknown }).message)) ||
        'Invalid product data received from API';
      throw new Error(msg);
    }
    return data as Product;
  } finally {
    globalStore.setLoading(['PRODUCT_BY_SLUG', false]);
  }
};

export const useProduct = (theme: string, slug: string) => {
  return useQuery({
    queryKey: ['product', theme, slug],
    queryFn: () => PRODUCT_BY_SLUG(theme, slug),
    staleTime: 5 * 60 * 1000,
    enabled: Boolean(theme && slug),
  });
};
