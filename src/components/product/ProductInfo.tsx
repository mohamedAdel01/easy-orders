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
    <div className="flex flex-col select-none">
      {/* Brand Subtitle from endpoint or fallback */}
      <div className="mb-1.5">
        <span className="text-xs sm:text-sm text-gray-400 font-normal">
          {t(brandName)}
        </span>
      </div>

      {/* Product Title fetched dynamically from endpoint */}
      <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight tracking-tight mb-4">
        {t(title)}
      </h1>

      {/* Price & Rating Row */}
      <div className="flex items-center justify-between pb-4 border-b border-dashed border-gray-200 mb-5">
        <div className="flex items-baseline gap-3">
          {hasDiscount && (
            <span className="text-sm sm:text-base text-gray-400 line-through font-normal">
              £{originalPrice}.00
            </span>
          )}
          <span className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            £{currentPrice}.00
          </span>
        </div>

        {/* 1,238 Sold · ★ 4.5 matching Figma */}
        <div className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-500">
          <span className="font-medium text-gray-500">1,238 {t('Sold')}</span>
          <span className="text-gray-300 font-bold">·</span>
          <div className="flex items-center gap-1">
            <StarIcon size={16} fill="#FFA439" />
            <span className="font-bold text-gray-900 text-sm">4.5</span>
          </div>
        </div>
      </div>

      {/* Description Section fetched dynamically from endpoint */}
      <div className="mb-6">
        <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-1.5">{t('Description:')}</h3>
        {product.description ? (
          <div>
            <div
              className={`text-xs text-gray-500 leading-relaxed font-light [&_ul]:list-disc [&_ul]:ms-4 [&_li]:mb-0.5 [&_p]:mb-1 transition-all ${
                showFullDesc ? 'max-h-none' : 'max-h-16 overflow-hidden'
              }`}
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
            <button
              type="button"
              onClick={() => setShowFullDesc(!showFullDesc)}
              className="text-xs font-bold text-gray-900 hover:underline mt-1.5 inline-block cursor-pointer"
            >
              {showFullDesc ? t('See Less') : t('See More....')}
            </button>
          </div>
        ) : (
          <p className="text-xs text-gray-400 leading-relaxed font-light">
            {showFullDesc ? (
              t(
                'Boba etiam ut bulla tea est potus dilectus singulari compositione saporum et textuum, quae in Taiwan annis 1980 orta sunt. Boba refert ad pilas mastoicas tapiocas in fundo potus inventas, quae typice lacte tea nigro sapiuntur. Boba phaenomenon in orbem terrarum diffudit, multiplicibus variantibus et saporibus omnibus gustibus accommodatis.'
              )
            ) : (
              <>
                {t(
                  'Boba etiam ut bulla tea est potus dilectus singulari compositione saporum et textuum, quae in Taiwan annis 1980 orta sunt. Boba refert ad pilas mastoicas tapiocas in fundo potus inventas, quae typice lacte tea nigro sapiuntur. Boba phaenomenon.'
                )}{' '}
                <button
                  type="button"
                  onClick={() => setShowFullDesc(true)}
                  className="font-bold text-gray-900 hover:underline inline cursor-pointer"
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
        <div className="space-y-5 mb-5">
          {product.variations.map((v) => (
            <VariationSelector key={v.id || v.name} variation={v} />
          ))}
        </div>
      ) : null}

      {/* Action Buttons: Add To Cart & Checkout Now */}
      <div className="flex flex-row gap-3 sm:gap-4 mt-6 mb-3">
        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={`flex-1 min-h-[52px] sm:min-h-[56px] py-4 px-6 rounded-[14px] text-xs sm:text-sm font-bold tracking-wide transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-none ${
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
          className="flex-1 min-h-[52px] sm:min-h-[56px] py-4 px-6 rounded-[14px] text-xs sm:text-sm font-bold tracking-wide border border-gray-300 text-gray-900 bg-white hover:bg-gray-50 active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-none"
        >
          {t('Checkout Now')}
        </button>
      </div>

      {/* Delivery T&C Link with Underline matching Figma */}
      <div className="pt-2 pb-2">
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
          className="text-xs text-[#818B9C] underline hover:text-black font-normal transition-colors"
        >
          {t('Delivery T&C')}
        </a>
      </div>
    </div>
  );
}
