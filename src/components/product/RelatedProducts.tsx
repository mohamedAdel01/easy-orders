import { useMemo } from 'react';
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

  const products = useMemo(() => {
    const available = apiProducts.filter((p) => p.id !== currentProductId);
    return available.length >= 5 ? available.slice(0, 5) : RELATED_PRODUCTS_DATA;
  }, [apiProducts, currentProductId]);

  return (
    <section className="max-w-[1200px] mx-auto px-4 lg:px-0 py-12">
      <div className="flex items-end justify-between mb-[24px]">
        <h2 className="font-sans font-semibold text-[28px] text-[#141414] leading-[1.2] tracking-tight">
          {t('Related Product')}
        </h2>
        <a
          href="#"
          className="font-sans font-medium text-[16px] text-[#525252] underline hover:text-[#141414] transition-colors"
        >
          {t('View All')}
        </a>
      </div>

      {/* Responsive Grid: 2 columns on mobile, 5 columns on desktop with 35px gap matching Figma node 57:1447 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-[35px]">
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

  const products = useMemo(() => {
    const available = apiProducts.filter((p) => p.id !== currentProductId);
    return available.length >= 10 ? available.slice(5, 10) : POPULAR_THIS_WEEK_DATA;
  }, [apiProducts, currentProductId]);

  return (
    <section className="max-w-[1200px] mx-auto px-4 lg:px-0 py-12">
      <div className="flex items-end justify-between mb-[24px]">
        <h2 className="font-sans font-semibold text-[28px] text-[#141414] leading-[1.2] tracking-tight">
          {t('Popular this week')}
        </h2>
        <a
          href="#"
          className="font-sans font-medium text-[16px] text-[#525252] underline hover:text-[#141414] transition-colors"
        >
          {t('View All')}
        </a>
      </div>

      {/* Responsive Grid: 2 columns on mobile, 5 columns on desktop with 35px gap matching Figma */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-[35px]">
        {products.slice(0, 5).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default RelatedProducts;
