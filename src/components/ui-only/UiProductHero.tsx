import { useState, useMemo } from 'react';
import type { Product } from '../../types';
import { useCartStore } from '../../store/cartStore';
import { useWishlistStore } from '../../store/wishlistStore';
import UiProductGallery from './UiProductGallery';

interface UiProductHeroProps {
  product?: Product | null;
}

const SIZES = ['6', '8', '10', '14', '18', '20'];

const COLORS = [
  { name: 'Royal Brown', color: '#534029' },
  { name: 'Off White', color: '#EBEBEB' },
  { name: 'Slate Blue', color: '#3A6A90' },
  { name: 'Dark Navy', color: '#11171D' },
];

export default function UiProductHero({ product }: UiProductHeroProps) {
  const [selectedColor, setSelectedColor] = useState<string | null>('Royal Brown');
  const [selectedSize, setSelectedSize] = useState<string | null>('8');
  const [quantity, setQuantity] = useState(1);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  // Store hooks
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);
  const isInWishlist = useWishlistStore((s) => s.isInWishlist);
  const toggleWishlistItem = useWishlistStore((s) => s.toggleItem);

  const productId = product?.id || 'prod-figma-overshirt-6';
  const isWishlisted = isInWishlist(productId);

  const brandName = product?.categories?.[0]?.name || 'John Lewis ANYDAY';
  const title = product?.name || 'Long Sleeve Overshirt, Khaki, 6';
  const priceDisplay =
    product?.sale_price != null
      ? `£${Number(product.sale_price).toFixed(2)}`
      : '£28.00';
  const originalPriceDisplay =
    product?.price != null ? `£${Number(product.price).toFixed(2)}` : '£40.00';
  const descriptionText =
    product?.description ||
    'Boba etiam ut bulla tea est potus dilectus singulari compositione saporum et textuum, quae in Taiwan annis 1980 orta sunt. Boba refert ad pilas masticas tapiocas in fundo potus inventas, quae typice lacte tea nigro sapiuntur. Boba phaenomenon in orbem terrarum diffudit, multiplicibus variantibus et saporibus omnibus gustibus accommodatis.';
  const customImages = product?.images && product.images.length > 0 ? product.images : undefined;

  // Matching variant calculation & stock constraints
  const matchingVariant = useMemo(() => {
    const variants = product?.variants;
    if (!variants || !selectedColor || !selectedSize) return null;
    return (
      variants.find((v) => {
        const hasColor = v.variation_props.some(
          (vp) =>
            vp.variation.toLowerCase() === 'color' &&
            vp.variation_prop.toLowerCase() === selectedColor.toLowerCase(),
        );
        const hasSize = v.variation_props.some(
          (vp) =>
            vp.variation.toLowerCase() === 'size' &&
            vp.variation_prop.toLowerCase() === selectedSize.toLowerCase(),
        );
        return hasColor && hasSize;
      }) || null
    );
  }, [product, selectedColor, selectedSize]);

  // Max available stock for the selected variant
  const maxStock = useMemo(() => {
    if (matchingVariant) {
      return matchingVariant.quantity;
    }
    return product?.quantity ?? 25;
  }, [matchingVariant, product]);

  const isOutOfStock = maxStock <= 0;

  // Handler for wishlist toggle
  const handleToggleWishlist = () => {
    toggleWishlistItem({
      productId,
      name: title,
      price: product?.sale_price || 28.0,
      thumb: customImages?.[0] || '/figma-assets/89a23379-492e-4db9-b748-9b06329aec8f.png',
      slug: product?.slug || 'overshirt-khaki-6',
    });
  };

  // Add To Cart with strict variation validation
  const handleAddToCart = () => {
    if (!selectedColor) {
      setValidationError('Please select a Color before adding to cart.');
      return;
    }
    if (!selectedSize) {
      setValidationError('Please select a Size before adding to cart.');
      return;
    }
    if (isOutOfStock) {
      setValidationError('This color and size combination is currently out of stock.');
      return;
    }

    setValidationError(null);

    const unitPrice = matchingVariant?.sale_price || product?.sale_price || 28.0;
    const thumb = customImages?.[0] || '/figma-assets/89a23379-492e-4db9-b748-9b06329aec8f.png';

    addItem({
      productId,
      variantId: matchingVariant?.id,
      name: title,
      price: unitPrice,
      thumb,
      quantity,
      selectedVariations: {
        Color: selectedColor,
        Size: selectedSize,
      },
      maxQuantity: maxStock,
    });

    setFeedbackMessage(`✓ Added ${quantity} item${quantity > 1 ? 's' : ''} to cart!`);
    setTimeout(() => {
      setFeedbackMessage(null);
    }, 4000);
  };

  // Checkout Now handler
  const handleCheckoutNow = () => {
    if (!selectedColor || !selectedSize || isOutOfStock) {
      handleAddToCart();
      return;
    }
    handleAddToCart();
    openCart();
  };

  return (
    <section className="max-w-[1200px] mx-auto px-4 lg:px-6 xl:px-0 pt-0 pb-16 font-['Clash_Grotesk'] select-none">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-[60px] xl:gap-[135px]">
        {/* Left: Product Image Gallery & Controls (Figma node 79:665: 545px wide) */}
        <UiProductGallery
          images={customImages}
          isWishlisted={isWishlisted}
          onToggleWishlist={handleToggleWishlist}
          onShare={() => alert('Link copied to clipboard!')}
        />

        {/* Right: Product Info and CTA (Figma node 79:666: 520px wide) */}
        <div className="w-full lg:w-[520px] shrink-0 flex flex-col">
          {/* Brand Subtitle: 16px Medium #8F8F8F */}
          <div className="mb-[12px]">
            <span className="font-medium text-[16px] text-[#8F8F8F] tracking-[0.16px] leading-[1.2]">
              {brandName}
            </span>
          </div>

          {/* Product Title: 36px Semibold #292929 */}
          <h1 className="font-semibold text-[28px] sm:text-[36px] text-[#292929] leading-[1.2] tracking-[-0.18px] mb-[20px]">
            {title}
          </h1>

          {/* Pricing & Rating Row (Figma node 57:1370) */}
          <div className="flex items-center justify-between pb-[24px] mb-[28px] border-b border-dashed border-[#E6E6E6]">
            {/* Prices */}
            <div className="flex items-center gap-[16px]">
              <span className="font-medium text-[18px] text-[#666666] line-through leading-[1.2]">
                {originalPriceDisplay}
              </span>
              <span className="font-semibold text-[28px] text-[#141414] leading-[1.2]">
                {priceDisplay}
              </span>
            </div>

            {/* Sold & Stars */}
            <div className="flex items-center gap-[8px]">
              <span className="font-normal text-[18px] sm:text-[20px] text-[#666666] leading-none">
                1,238 Sold
              </span>
              <img
                src="/figma-assets/3a0d024e-8334-4250-ae36-43b6690b631c.svg"
                alt=""
                className="size-[6px]"
              />
              <div className="flex items-center gap-[4px]">
                <img
                  src="/figma-assets/883316f7-af7f-4f4c-b692-d1de88354f1c.svg"
                  alt="Rating"
                  className="size-[24px]"
                />
                <span className="font-semibold text-[22px] sm:text-[24px] text-[#141414] leading-none">
                  4.5
                </span>
              </div>
            </div>
          </div>

          {/* Description Block (Figma node 57:1382) */}
          <div className="mb-[40px]">
            <h3 className="font-['Raleway'] font-bold text-[20px] text-[#292929] leading-[1.2] mb-[10px]">
              Description:
            </h3>
            <p className="font-normal text-[16px] text-[#666666] leading-[1.3]">
              {showFullDesc || descriptionText.length < 240 ? (
                descriptionText
              ) : (
                <>
                  {`${descriptionText.slice(0, 240)}... `}
                  <button
                    type="button"
                    onClick={() => setShowFullDesc(true)}
                    className="font-medium text-black hover:underline inline cursor-pointer"
                  >
                    See More....
                  </button>
                </>
              )}
            </p>
          </div>

          {/* Color Selector (Figma node 57:1385) */}
          <div className="mb-[36px]">
            <div className="text-[20px] leading-[1.2] mb-[18px]">
              <span className="font-['Raleway'] font-semibold text-[#8F8F8F]">Color: </span>
              <span className="font-semibold text-[#292929]">{selectedColor || 'None selected'}</span>
            </div>

            <div className="flex items-center gap-[14px] flex-wrap">
              {COLORS.map((swatch) => {
                const isSelected = selectedColor === swatch.name;
                return (
                  <button
                    key={swatch.name}
                    type="button"
                    onClick={() => {
                      setSelectedColor(swatch.name);
                      setValidationError(null);
                    }}
                    aria-label={`Select color ${swatch.name}`}
                    className={`w-[75px] h-[40px] rounded-[8px] transition-all cursor-pointer flex items-center justify-center ${
                      isSelected
                        ? 'bg-white border-2 border-[#141414] shadow-xs'
                        : 'border border-transparent hover:opacity-90'
                    }`}
                    style={!isSelected ? { backgroundColor: swatch.color } : undefined}
                  >
                    {isSelected && (
                      <div
                        className="w-[63px] h-[28px] rounded-[6px]"
                        style={{ backgroundColor: swatch.color }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Size Selector (Figma node 57:1394) */}
          <div className="mb-[40px]">
            <div className="flex items-center justify-between text-[20px] leading-[1.2] mb-[18px]">
              <div>
                <span className="font-['Raleway'] font-semibold text-[#8F8F8F]">Size: </span>
                <span className="font-semibold text-[#292929]">{selectedSize || 'None selected'}</span>
              </div>
              <button
                type="button"
                className="font-medium text-[16px] text-[#525252] underline hover:text-black cursor-pointer"
                onClick={() => alert('UK Regular Standard Sizing: 6, 8, 10, 14, 18, 20')}
              >
                View Size Chart
              </button>
            </div>

            <div className="flex items-center gap-[14px] flex-wrap">
              {SIZES.map((size) => {
                const isSelected = selectedSize === size;
                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => {
                      setSelectedSize(size);
                      setValidationError(null);
                    }}
                    aria-label={`Select size ${size}`}
                    className={`w-[75px] h-[40px] rounded-[8px] font-semibold text-[20px] leading-[1.2] flex items-center justify-center transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#EBEBEB] text-[#141414] border-2 border-[#141414]'
                        : 'bg-white text-[#525252] border border-[#E6E6E6] hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantity Selector & Stock Indicator */}
          <div className="flex items-center justify-between mb-[28px]">
            <div className="flex items-center gap-[14px]">
              <span className="font-['Raleway'] font-semibold text-[18px] text-[#8F8F8F]">
                Quantity:
              </span>
              <div className="flex items-center border border-[#E6E6E6] rounded-[8px] bg-white h-[44px] overflow-hidden select-none shadow-xs">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1 || isOutOfStock}
                  className="w-[40px] h-full flex items-center justify-center text-[#141414] hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors text-[20px] font-medium"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="w-[46px] text-center font-semibold text-[17px] text-[#141414]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(maxStock, q + 1))}
                  disabled={quantity >= maxStock || isOutOfStock}
                  className="w-[40px] h-full flex items-center justify-center text-[#141414] hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors text-[20px] font-medium"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            <div className="text-[14px] text-right">
              {isOutOfStock ? (
                <span className="text-red-600 font-semibold">Out of Stock</span>
              ) : maxStock <= 5 ? (
                <span className="text-amber-600 font-medium">Only {maxStock} left in stock!</span>
              ) : (
                <span className="text-[#7A7A7A] font-medium">{maxStock} in stock</span>
              )}
            </div>
          </div>

          {/* Validation Error Message */}
          {validationError && (
            <div
              role="alert"
              className="mb-[18px] p-3 rounded-[8px] bg-red-50 border border-red-200 text-red-700 text-[14px] font-medium flex items-center gap-2"
            >
              <svg className="size-4 shrink-0 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{validationError}</span>
            </div>
          )}

          {/* Success Feedback Notification */}
          {feedbackMessage && (
            <div
              role="status"
              className="mb-[18px] p-3 rounded-[8px] bg-emerald-50 border border-emerald-200 text-emerald-800 text-[14px] font-medium flex items-center justify-between gap-2 shadow-xs"
            >
              <div className="flex items-center gap-2">
                <svg className="size-5 shrink-0 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{feedbackMessage}</span>
              </div>
              <button
                type="button"
                onClick={openCart}
                className="text-emerald-900 underline font-semibold hover:text-emerald-950 cursor-pointer text-[13px]"
              >
                View Cart
              </button>
            </div>
          )}

          {/* Purchase CTA Buttons (Figma node 57:1411: Add To Cart 296x58 + Checkout Now 200x58, gap 24px) */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-[24px] mb-[24px]">
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`w-full sm:w-[296px] h-[58px] rounded-[8px] font-semibold text-[20px] leading-[1.2] flex items-center justify-center transition-all cursor-pointer ${
                isOutOfStock
                  ? 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
                  : 'bg-[#141414] hover:bg-neutral-800 active:scale-[0.99] text-white shadow-sm'
              }`}
            >
              {isOutOfStock ? 'Out of Stock' : 'Add To Cart'}
            </button>

            <button
              type="button"
              onClick={handleCheckoutNow}
              disabled={isOutOfStock}
              className={`w-full sm:w-[200px] h-[58px] rounded-[8px] font-medium text-[20px] leading-[1.2] flex items-center justify-center transition-all cursor-pointer ${
                isOutOfStock
                  ? 'bg-gray-100 border border-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-white border border-[#B8B8B8] hover:bg-gray-50 active:scale-[0.99] text-[#333333]'
              }`}
            >
              Checkout Now
            </button>
          </div>

          {/* Delivery T&C (Figma node 57:1418: 16px Medium #7A7A7A underline) */}
          <div>
            <a
              href="#delivery"
              onClick={(e) => {
                e.preventDefault();
                alert('Delivery Terms & Conditions: Free standard delivery on orders over £50.');
              }}
              className="font-medium text-[16px] text-[#7A7A7A] underline hover:text-black transition-colors"
            >
              Delivery T&amp;C
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
