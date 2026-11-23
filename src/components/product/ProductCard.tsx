import { memo } from 'react';
import { StarIcon } from '../icons';
import type { Product } from '../../types';
import { useI18n } from '../../hooks/useI18n';

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const { t } = useI18n();
  const brandName = product.categories?.[0]?.name || 'John Lewis ANYDAY';
  const displayPrice = product.sale_price > 0 ? product.sale_price : product.price;

  // Rating & Sold matching Figma card specs (node 57:1448)
  const rating = 4.8;
  const soldCount = 1238;

  return (
    <div className="group cursor-pointer flex flex-col gap-[16px] select-none w-full lg:w-[212px]">
      {/* Product Image: 212x284px, rounded-[8px], bg-[#F2F2F2] */}
      <div className="relative w-full lg:w-[212px] h-[260px] sm:h-[284px] rounded-[8px] overflow-hidden bg-[#F2F2F2] shrink-0">
        <img
          src={product.thumb}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* Card Info Content (Figma node 57:1451) */}
      <div className="flex flex-col gap-[8px] w-full">
        <div className="flex flex-col gap-[6px] w-full">
          {/* Brand & Price */}
          <div className="flex items-center justify-between gap-2">
            <h4 className="font-sans font-semibold text-[18px] text-[#292929] leading-[1.4] tracking-[-0.2px] truncate">
              {t(brandName)}
            </h4>
            <span className="font-sans font-semibold text-[20px] text-[#141414] leading-[1.4] shrink-0">
              ${displayPrice}
            </span>
          </div>

          {/* Product Name / Subtitle: 16px Regular #7A7A7A */}
          <p className="font-sans font-normal text-[16px] text-[#7A7A7A] leading-[1.2] line-clamp-2">
            {t(product.name)}
          </p>
        </div>

        {/* Rating row: Star + 4.8 + Dot + Sold count (Figma node 57:1457) */}
        <div className="flex items-center gap-[8px] mt-1 text-[16px] font-sans">
          <StarIcon size={20} fill="#FFA439" className="shrink-0" />
          <span className="font-normal text-[#0B0F0E]">{rating}</span>
          <span className="size-[4px] rounded-full bg-[#8F8F8F] shrink-0 inline-block" />
          <span className="font-normal text-[#818B9C] text-[14px] sm:text-[16px] truncate">
            {soldCount} {t('Sold')}
          </span>
        </div>
      </div>
    </div>
  );
}

export default memo(ProductCard);
