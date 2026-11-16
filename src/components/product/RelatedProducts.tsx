import { useQuery } from '@tanstack/react-query';
import type { Product } from '../../types';
import ProductCard from './ProductCard';
import { RELATED_PRODUCTS_DATA, POPULAR_THIS_WEEK_DATA } from '../../utils/mockData';
import { useI18n } from '../../hooks/useI18n';

const FETCH_STORE_PRODUCTS = async (storeId: string): Promise<Product[]> => {
  try {
    const response = await fetch(
      `https://api.easy-orders.net/api/v1/products?store_id=${storeId}&limit=12`
    );
    if (!response.ok) return [];
    const data = await response.json();
    if (Array.isArray(data) && data.length > 0) return data;
    if (data.data && Array.isArray(data.data) && data.data.length > 0) return data.data;
    return [];
  } catch {
    return [];
  }
};

interface SectionProps {
  currentProductId: string;
  storeId: string;
}

// 1. Related Product Section (renders before Reviews)
export function RelatedProducts({ currentProductId, storeId }: SectionProps) {
  const { t } = useI18n();
  const { data: apiProducts = [] } = useQuery({
    queryKey: ['store-products-related', storeId],
    queryFn: () => FETCH_STORE_PRODUCTS(storeId),
    staleTime: 10 * 60 * 1000,
  });

  const available = apiProducts.filter((p) => p.id !== currentProductId);
  const products = available.length >= 5 ? available.slice(0, 5) : RELATED_PRODUCTS_DATA;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-t border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
          {t('Related Product')}
        </h2>
        <a
          href="#"
          className="text-xs font-semibold text-gray-900 underline hover:text-gray-600 transition-colors"
        >
          {t('View All')}
        </a>
      </div>

      {/* Responsive Grid: 2 columns on mobile, 5 columns on desktop matching Figma */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 sm:gap-6">
        {products.slice(0, 5).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

// 2. Popular this week Section (renders after Reviews)
export function PopularProducts({ currentProductId, storeId }: SectionProps) {
  const { t } = useI18n();
  const { data: apiProducts = [] } = useQuery({
    queryKey: ['store-products-popular', storeId],
    queryFn: () => FETCH_STORE_PRODUCTS(storeId),
    staleTime: 10 * 60 * 1000,
  });

  const available = apiProducts.filter((p) => p.id !== currentProductId);
  const products = available.length >= 10 ? available.slice(5, 10) : POPULAR_THIS_WEEK_DATA;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-t border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
          {t('Popular this week')}
        </h2>
        <a
          href="#"
          className="text-xs font-semibold text-gray-900 underline hover:text-gray-600 transition-colors"
        >
          {t('View All')}
        </a>
      </div>

      {/* Responsive Grid: 2 columns on mobile, 5 columns on desktop matching Figma */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 sm:gap-6">
        {products.slice(0, 5).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default RelatedProducts;
