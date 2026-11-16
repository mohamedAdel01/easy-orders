import { useState, useCallback } from 'react';
import { Heart } from 'lucide-react';
import { ChevronArrowIcon, ShareIcon } from '../icons';
import type { Product } from '../../types';
import { getAllImages } from '../../utils';
import { useI18n } from '../../hooks/useI18n';
import { useWishlistStore } from '../../store/wishlistStore';

interface ProductGalleryProps {
  product: Product;
}

export default function ProductGallery({ product }: ProductGalleryProps) {
  const images = getAllImages(product);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const { t, isRtl } = useI18n();
  const { toggleItem, isInWishlist } = useWishlistStore();
  const isWishlisted = isInWishlist(product.id);

  const handleToggleWishlist = () => {
    toggleItem({
      productId: product.id,
      name: product.name,
      price: product.sale_price > 0 ? product.sale_price : product.price,
      thumb: product.thumb,
      slug: product.slug,
    });
  };

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  }, [isZoomed]);

  const prev = () => setActiveIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setActiveIndex((i) => (i + 1) % images.length);

  return (
    <div className="flex flex-col gap-4 select-none">
      {/* Top Container: Main Image + External Floating Actions Strip */}
      <div className="flex gap-3 sm:gap-4 items-stretch">
        {/* Main Image with rounded-2xl & Smooth Crossfade Transitions */}
        <div
          className="flex-1 relative aspect-[3/4] sm:aspect-[4/5] rounded-2xl overflow-hidden bg-[#f4f4f4] cursor-zoom-in group select-none w-full"
          onMouseEnter={() => setIsZoomed(true)}
          onMouseLeave={() => setIsZoomed(false)}
          onMouseMove={handleMouseMove}
        >
          {images.map((img, index) => {
            const isActive = index === activeIndex;
            return (
              <img
                key={img}
                src={img}
                alt={`${product.name} - view ${index + 1}`}
                className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-500 ease-in-out ${
                  isActive ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
                }`}
                style={
                  isActive && isZoomed
                    ? {
                        transform: 'scale(2.2)',
                        transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                        transition: 'transform 0.12s ease-out, opacity 0.5s ease-in-out',
                      }
                    : {
                        transform: 'scale(1)',
                        transition: 'transform 0.3s ease-out, opacity 0.5s ease-in-out',
                      }
                }
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
                fetchPriority={index === 0 ? 'high' : 'auto'}
              />
            );
          })}

          {/* Mobile Overlay: Floating Share & Wishlist Buttons (hidden on desktop) */}
          <div className="lg:hidden absolute top-3 end-3 z-20 flex items-center gap-2">
            <button
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
                alert(t('Product link copied to clipboard!'));
              }}
              className="w-9 h-9 rounded-xl bg-white/90 backdrop-blur-sm shadow-sm flex items-center justify-center text-gray-800 active:scale-95 transition-all cursor-pointer border border-gray-100"
              title={t('Share')}
              aria-label={t('Share')}
            >
              <ShareIcon size={16} stroke="#141414" />
            </button>

            <button
              onClick={handleToggleWishlist}
              className="w-9 h-9 rounded-xl bg-white/90 backdrop-blur-sm shadow-sm flex items-center justify-center text-gray-800 active:scale-95 transition-all cursor-pointer border border-gray-100"
              title={isWishlisted ? t('Added to wishlist') : t('Add to wishlist')}
              aria-label={isWishlisted ? t('Added to wishlist') : t('Add to wishlist')}
            >
              <Heart
                size={16}
                className={isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-800'}
              />
            </button>
          </div>

          {/* Mobile Overlay: Floating Prev & Next Arrows (hidden on desktop) */}
          <button
            onClick={prev}
            className="lg:hidden absolute start-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/85 backdrop-blur-sm shadow-sm flex items-center justify-center text-gray-800 active:scale-95 transition-all cursor-pointer border border-gray-100"
            aria-label={t('Previous image')}
          >
            <ChevronArrowIcon direction={isRtl ? 'right' : 'left'} size={12} stroke="#141414" />
          </button>

          <button
            onClick={next}
            className="lg:hidden absolute end-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/85 backdrop-blur-sm shadow-sm flex items-center justify-center text-gray-800 active:scale-95 transition-all cursor-pointer border border-gray-100"
            aria-label={t('Next image')}
          >
            <ChevronArrowIcon direction={isRtl ? 'left' : 'right'} size={12} stroke="#141414" />
          </button>
        </div>

        {/* EXTERNAL Action Buttons Strip (Desktop Only: lg:flex, hidden on mobile so image is never squeezed) */}
        <div className="hidden lg:flex flex-col justify-between py-1 flex-shrink-0">
          {/* Top buttons: Share & Wishlist */}
          <div className="flex flex-col gap-3">
            <button
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
                alert(t('Product link copied to clipboard!'));
              }}
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-[14px] bg-[#F2F4F7] hover:bg-[#E5E7EB] active:scale-[0.96] flex items-center justify-center text-gray-800 transition-all shadow-none border-0 cursor-pointer"
              title={t('Share')}
              aria-label={t('Share')}
            >
              <ShareIcon size={20} stroke="#141414" />
            </button>

            <button
              onClick={handleToggleWishlist}
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-[14px] bg-[#F2F4F7] hover:bg-[#E5E7EB] active:scale-[0.96] flex items-center justify-center text-gray-800 transition-all shadow-none border-0 cursor-pointer"
              title={isWishlisted ? t('Added to wishlist') : t('Add to wishlist')}
              aria-label={isWishlisted ? t('Added to wishlist') : t('Add to wishlist')}
            >
              <Heart
                size={18}
                className={isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-800 stroke-[1.75]'}
              />
            </button>
          </div>

          {/* Bottom buttons: Previous & Next arrows (direction adjusted via isRtl) */}
          <div className="flex flex-col gap-3">
            <button
              onClick={prev}
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-[14px] bg-[#F2F4F7] hover:bg-[#E5E7EB] active:scale-[0.96] flex items-center justify-center text-gray-800 transition-all shadow-none border-0 cursor-pointer"
              aria-label={t('Previous image')}
            >
              <ChevronArrowIcon direction={isRtl ? 'right' : 'left'} size={14} stroke="#141414" />
            </button>

            <button
              onClick={next}
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-[14px] bg-[#F2F4F7] hover:bg-[#E5E7EB] active:scale-[0.96] flex items-center justify-center text-gray-800 transition-all shadow-none border-0 cursor-pointer"
              aria-label={t('Next image')}
            >
              <ChevronArrowIcon direction={isRtl ? 'left' : 'right'} size={14} stroke="#141414" />
            </button>
          </div>
        </div>
      </div>

      {/* Thumbnails Row: 5 portrait cards with rounded-xl and smooth transitions */}
      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-2 sm:gap-3">
          {images.slice(0, 5).map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIndex(i)}
              className={`aspect-[3/4] rounded-xl overflow-hidden bg-[#f4f4f4] transition-all duration-300 transform active:scale-95 cursor-pointer ${
                i === activeIndex
                  ? 'border-2 border-black ring-1 ring-black shadow-sm scale-[1.02]'
                  : 'border border-transparent hover:border-gray-300 opacity-70 hover:opacity-100 hover:scale-[1.01]'
              }`}
            >
              <img
                src={img}
                alt={`${product.name} thumbnail ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-300"
                loading="lazy"
                decoding="async"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
