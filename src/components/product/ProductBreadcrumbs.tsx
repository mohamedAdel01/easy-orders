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
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 sm:pt-4 pb-1 sm:pb-2 text-xs text-gray-400 select-none"
    >
      <ol className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
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
        <li className="hidden sm:flex items-center text-gray-400 select-none">
          <ChevronArrowIcon direction={isRtl ? 'left' : 'right'} size={11} stroke="#818B9C" />
        </li>
        <li className="hidden sm:inline text-gray-900 font-semibold truncate max-w-xs sm:max-w-md">
          {t(product.name)}
        </li>
      </ol>

      {/* Mobile-only prominent product title above gallery matching Figma Mobile */}
      <h1 className="sm:hidden text-lg font-bold text-gray-900 mt-2 leading-snug">
        {t(product.name)}
      </h1>
    </nav>
  );
}
