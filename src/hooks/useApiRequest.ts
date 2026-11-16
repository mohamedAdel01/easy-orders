import { useCallback } from 'react';
import { globalStore } from '../store/globalStore';

interface ApiRequestOptions {
  service: string;
  urlSuffix?: string;
  params?: Record<string, string>;
  payload?: unknown;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
}

interface ApiResult<T> {
  data: T | null;
  error: string | null;
  status: number | null;
}

const BASE_URL = 'https://api.easy-orders.net/api/v1';

const SERVICE_MAP: Record<string, string> = {
  PRODUCT_BY_SLUG: `${BASE_URL}/products/slug`,
  RELATED_PRODUCTS: `${BASE_URL}/products`,
};

export const useApiRequest = () => {
  const apiRequest = useCallback(async <T>(options: ApiRequestOptions): Promise<ApiResult<T>> => {
    const { service, urlSuffix = '', params = {}, payload, method = 'GET' } = options;

    const baseUrl = SERVICE_MAP[service] || service;
    const url = new URL(`${baseUrl}${urlSuffix}`);

    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });

    globalStore.setLoading([service, true]);

    try {
      const response = await fetch(url.toString(), {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: method !== 'GET' && payload ? JSON.stringify(payload) : undefined,
      });

      if (!response.ok) {
        return {
          data: null,
          error: `HTTP error! status: ${response.status}`,
          status: response.status,
        };
      }

      const data = await response.json() as T;
      return { data, error: null, status: response.status };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      return { data: null, error: errorMessage, status: null };
    } finally {
      globalStore.setLoading([service, false]);
    }
  }, []);

  return { apiRequest };
};
