import type { Product } from '../../types';
import { ChevronArrowIcon } from '../icons';
import { useI18n } from '../../hooks/useI18n';

interface ProductBreadcrumbsProps {
  product: Product;
}

export default function ProductBreadcrumbs({ product }: ProductBreadcrumbsProps) {
  const { t, isRtl } = useI18n();

  return (
    <nav
      aria-label="Breadcrumb"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-xs text-gray-400"
    >
      <ol className="flex items-center gap-2 flex-wrap">
        <li>
          <a href="#" className="hover:text-black transition-colors">
            {t('Homepage')}
          </a>
        </li>
        <li className="flex items-center text-gray-400 select-none">
          <ChevronArrowIcon direction={isRtl ? 'left' : 'right'} size={11} stroke="#818B9C" />
        </li>
        <li>
          <a href="#" className="hover:text-black transition-colors">
            {t(product.categories?.[0]?.name || 'Women')}
          </a>
        </li>
        <li className="flex items-center text-gray-400 select-none">
          <ChevronArrowIcon direction={isRtl ? 'left' : 'right'} size={11} stroke="#818B9C" />
        </li>
        <li>
          <a href="#" className="hover:text-black transition-colors">
            {t(product.categories?.[1]?.name || "Women's Shirts & Tops")}
          </a>
        </li>
        <li className="flex items-center text-gray-400 select-none">
          <ChevronArrowIcon direction={isRtl ? 'left' : 'right'} size={11} stroke="#818B9C" />
        </li>
        <li className="text-gray-900 font-semibold truncate max-w-xs sm:max-w-md">
          {t(product.name)}
        </li>
      </ol>
    </nav>
  );
}
