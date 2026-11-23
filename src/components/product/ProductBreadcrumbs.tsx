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
      className="max-w-[1200px] mx-auto px-4 lg:px-0 pt-6 pb-6 text-[16px] font-sans font-medium select-none"
    >
      <ol className="flex items-center gap-2 flex-wrap">
        <li>
          <a href="/" className="text-[#8F8F8F] hover:text-[#141414] transition-colors">
            {t('Homepage')}
          </a>
        </li>
        <li className="flex items-center text-[#8F8F8F] select-none">
          <ChevronArrowIcon direction={isRtl ? 'left' : 'right'} size={12} stroke="#8F8F8F" />
        </li>
        <li>
          <a href="#" className="text-[#8F8F8F] hover:text-[#141414] transition-colors">
            {t(product.categories?.[0]?.name || 'Women')}
          </a>
        </li>
        <li className="flex items-center text-[#8F8F8F] select-none">
          <ChevronArrowIcon direction={isRtl ? 'left' : 'right'} size={12} stroke="#8F8F8F" />
        </li>
        <li>
          <a href="#" className="text-[#8F8F8F] hover:text-[#141414] transition-colors">
            {t(product.categories?.[1]?.name || "Women's Shirts & Tops")}
          </a>
        </li>
        <li className="hidden sm:flex items-center text-[#8F8F8F] select-none">
          <ChevronArrowIcon direction={isRtl ? 'left' : 'right'} size={12} stroke="#8F8F8F" />
        </li>
        <li className="hidden sm:inline text-[#292929] font-medium truncate max-w-xs sm:max-w-md">
          {t(product.name)}
        </li>
      </ol>

      {/* Mobile prominent product title above gallery */}
      <h1 className="sm:hidden text-xl font-semibold text-[#292929] mt-3 leading-snug">
        {t(product.name)}
      </h1>
    </nav>
  );
}
