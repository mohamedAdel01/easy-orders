import { useState, useCallback } from 'react';
import { StarIcon } from '../icons';
import type { Product } from '../../types';
import { useProductStore } from '../../store/productStore';
import { useCartStore } from '../../store/cartStore';
import { useI18n } from '../../hooks/useI18n';
import VariationSelector from './VariationSelector';

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [addedToCart, setAddedToCart] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const quantity = 1;
  const { t } = useI18n();

  const { selectedVariations, selectedVariant, getCurrentPrice, getOriginalPrice } = useProductStore();
  const { addItem, openCart } = useCartStore();

  const brandName = product.categories?.[0]?.name || 'John Lewis ANYDAY';
  const title = product.name || 'Long Sleeve Overshirt, Khaki, 6';

  const originalPrice = getOriginalPrice() || 40;
  const currentPrice = getCurrentPrice() || 28;
  const hasDiscount = originalPrice > currentPrice && currentPrice > 0;

  // Stock status from selectedVariant or product
  const stockCount = selectedVariant ? selectedVariant.quantity : (product.quantity ?? 15);
  const isOutOfStock = product.track_stock && stockCount <= 0;
  const maxStock = product.track_stock ? Math.max(1, stockCount) : 99;

  const validateVariations = useCallback((): boolean => {
    if (product.variations && product.variations.length > 0) {
      const missing = product.variations.filter((v) => !selectedVariations[v.name]);
      if (missing.length > 0) {
        alert(`${t('Please select')}: ${missing.map((m) => t(m.name)).join(', ')}`);
        return false;
      }
    }
    return true;
  }, [product.variations, selectedVariations, t]);

  const handleAddToCart = useCallback(() => {
    if (!validateVariations()) return;
    if (isOutOfStock) return;

    addItem({
      productId: product.id,
      name: title,
      price: currentPrice,
      thumb: product.thumb,
      quantity,
      selectedVariations,
      maxQuantity: maxStock,
    });

    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  }, [validateVariations, isOutOfStock, addItem, product.id, product.thumb, title, currentPrice, quantity, selectedVariations, maxStock]);

  const handleCheckoutNow = useCallback(() => {
    if (!validateVariations()) return;
    if (isOutOfStock) return;
    handleAddToCart();
    openCart();
  }, [validateVariations, isOutOfStock, handleAddToCart, openCart]);

  return (
    <div className="flex flex-col select-none w-full lg:w-[520px] shrink-0 font-sans">
      {/* Brand Subtitle (Figma node 57:1368: 16px Medium #8F8F8F) */}
      <div className="mb-2">
        <span className="font-sans font-medium text-[16px] text-[#8F8F8F] tracking-[0.16px]">
          {t(brandName)}
        </span>
      </div>

      {/* Product Title (Figma node 57:1369: 36px Semibold #292929) */}
      <h1 className="font-sans font-semibold text-[28px] sm:text-[36px] text-[#292929] leading-[1.2] tracking-[-0.18px] mb-5">
        {t(title)}
      </h1>

      {/* Price & Rating Row (Figma node 57:1370) */}
      <div className="flex items-center justify-between pb-5 border-b border-dashed border-[#E6E6E6] mb-7">
        <div className="flex items-center gap-[16px]">
          {hasDiscount && (
            <span className="font-sans font-medium text-[18px] text-[#666666] line-through leading-[1.2]">
              £{originalPrice}.00
            </span>
          )}
          <span className="font-sans font-semibold text-[28px] text-[#141414] leading-[1.2]">
            £{currentPrice}.00
          </span>
        </div>

        {/* 1,238 Sold · ★ 4.5 (Figma node 57:1374) */}
        <div className="flex items-center gap-[8px]">
          <span className="font-sans font-normal text-[16px] sm:text-[20px] text-[#666666] leading-none">
            1,238 {t('Sold')}
          </span>
          <span className="size-[6px] rounded-full bg-[#666666] inline-block" />
          <div className="flex items-center gap-[4px]">
            <StarIcon size={22} fill="#FFA439" />
            <span className="font-sans font-semibold text-[20px] sm:text-[24px] text-[#141414] leading-none">
              4.5
            </span>
          </div>
        </div>
      </div>

      {/* Description Section (Figma node 57:1382) */}
      <div className="mb-7">
        <h3 className="font-raleway font-bold text-[20px] text-[#292929] leading-[1.2] mb-[10px]">
          {t('Description:')}
        </h3>
        {product.description ? (
          <div>
            <div
              className={`font-sans font-normal text-[16px] text-[#666666] leading-[1.3] [&_ul]:list-disc [&_ul]:ms-4 [&_li]:mb-0.5 [&_p]:mb-1 transition-all ${
                showFullDesc ? 'max-h-none' : 'max-h-20 overflow-hidden'
              }`}
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
            <button
              type="button"
              onClick={() => setShowFullDesc(!showFullDesc)}
              className="font-sans font-medium text-[16px] text-black hover:underline mt-2 inline-block cursor-pointer"
            >
              {showFullDesc ? t('See Less') : t('See More....')}
            </button>
          </div>
        ) : (
          <p className="font-sans font-normal text-[16px] text-[#666666] leading-[1.3]">
            {showFullDesc ? (
              t(
                'Boba etiam ut bulla tea est potus dilectus singulari compositione saporum et textuum, quae in Taiwan annis 1980 orta sunt. Boba refert ad pilas masticas tapiocas in fundo potus inventas, quae typice lacte tea nigro sapiuntur. Boba phaenomenon in orbem terrarum diffudit, multiplicibus variantibus et saporibus omnibus gustibus accommodatis.'
              )
            ) : (
              <>
                {t(
                  'Boba etiam ut bulla tea est potus dilectus singulari compositione saporum et textuum, quae in Taiwan annis 1980 orta sunt. Boba refert ad pilas masticas tapiocas in fundo potus inventas, quae typice lacte tea nigro sapiuntur. Boba phaenomenon.'
                )}{' '}
                <button
                  type="button"
                  onClick={() => setShowFullDesc(true)}
                  className="font-sans font-medium text-black hover:underline inline cursor-pointer"
                >
                  {t('See More....')}
                </button>
              </>
            )}
          </p>
        )}
      </div>

      {/* Variations dynamically from endpoint */}
      {product.variations && product.variations.length > 0 ? (
        <div className="space-y-6 mb-7">
          {product.variations.map((v) => (
            <VariationSelector key={v.id || v.name} variation={v} />
          ))}
        </div>
      ) : null}

      {/* Action Buttons: Add To Cart (296px) & Checkout Now (200px) (Figma node 57:1411) */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-[24px] mt-6 mb-4">
        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={`w-full sm:w-[296px] h-[58px] rounded-[8px] font-sans font-semibold text-[20px] leading-[1.2] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center ${
            addedToCart
              ? 'bg-emerald-600 text-white'
              : 'bg-[#141414] text-white hover:bg-neutral-800 active:scale-[0.99]'
          }`}
        >
          {addedToCart ? `✓ ${t('Added To Cart')}` : t('Add To Cart')}
        </button>

        <button
          onClick={handleCheckoutNow}
          disabled={isOutOfStock}
          className="w-full sm:w-[200px] h-[58px] rounded-[8px] font-sans font-medium text-[20px] leading-[1.2] text-[#333333] bg-white border border-[#B8B8B8] hover:bg-gray-50 active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {t('Checkout Now')}
        </button>
      </div>

      {/* Delivery T&C Link with Underline matching Figma (node 57:1418) */}
      <div className="pt-1 pb-2">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            alert(
              t(
                'Delivery Terms & Conditions: Free standard delivery in 2-4 business days.'
              )
            );
          }}
          className="font-sans font-medium text-[16px] text-[#7A7A7A] underline hover:text-black transition-colors"
        >
          {t('Delivery T&C')}
        </a>
      </div>
    </div>
  );
}
