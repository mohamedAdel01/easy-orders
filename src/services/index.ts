const BASE_URL = 'https://api.easy-orders.net/api/v1';

export interface ServiceConfig {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  defaultParams?: Record<string, string>;
}

export const SERVICES: Record<string, ServiceConfig> = {
  PRODUCT_BY_SLUG: {
    url: `${BASE_URL}/products/slug`,
    method: 'GET',
    defaultParams: { join: 'reviews' },
  },
  RELATED_PRODUCTS: {
    url: `${BASE_URL}/products`,
    method: 'GET',
  },
};

export type ServiceName = keyof typeof SERVICES;

export interface FetchProductParams {
  theme: string;
  slug: string;
}

export const buildProductUrl = (theme: string, slug: string): string => {
  return `${SERVICES.PRODUCT_BY_SLUG.url}/${theme}/${slug}`;
};
