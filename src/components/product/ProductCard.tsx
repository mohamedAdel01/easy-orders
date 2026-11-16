import { StarIcon } from '../icons';
import type { Product } from '../../types';
import { useI18n } from '../../hooks/useI18n';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { t } = useI18n();
  const brandName = product.categories?.[0]?.name || 'John Lewis ANYDAY';
  const displayPrice = product.sale_price > 0 ? product.sale_price : product.price;

  // Realistic rating & sold data matching Figma
  const rating = 4.5;
  const soldCount = 1238;

  return (
    <div className="group cursor-pointer flex flex-col select-none">
      {/* Product Image */}
      <div className="relative aspect-[3/4] w-full rounded-md overflow-hidden bg-[#f4f4f4] mb-2.5">
        <img
          src={product.thumb}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>

      {/* Brand */}
      <h4 className="text-xs sm:text-sm font-bold text-gray-900 truncate">
        {t(brandName)}
      </h4>

      {/* Price */}
      <div className="text-xs sm:text-sm font-bold text-gray-900 mt-0.5">
        ${displayPrice}
      </div>

      {/* Product Title / Subtitle */}
      <p className="text-[11px] sm:text-xs text-gray-500 line-clamp-1 mt-0.5">
        {t(product.name)}
      </p>

      {/* Star rating & Sold Count */}
      <div className="flex items-center gap-1.5 mt-1 text-[11px] text-gray-500">
        <StarIcon size={13} fill="#FFA439" className="flex-shrink-0" />
        <span className="font-bold text-gray-800">{rating}</span>
        <span className="text-gray-300">·</span>
        <span className="text-gray-400">{soldCount} {t('Sold')}</span>
      </div>
    </div>
  );
}
