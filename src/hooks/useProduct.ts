import { useQuery } from '@tanstack/react-query';
import type { Product } from '../types';
import { globalStore } from '../store/globalStore';

const BASE_URL = 'https://api.easy-orders.net/api/v1';

const PRODUCT_BY_SLUG = async (theme: string, slug: string): Promise<Product> => {
  globalStore.setLoading(['PRODUCT_BY_SLUG', true]);
  try {
    const url = `${BASE_URL}/products/slug/${theme}/${slug}?join=reviews`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch product: ${response.status}`);
    return (await response.json()) as Product;
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
