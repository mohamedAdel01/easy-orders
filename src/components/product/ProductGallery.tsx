import { useState, useCallback } from 'react';
import { ChevronArrowIcon, ShareIcon, WishlistIcon } from '../icons';
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
    <div className="flex flex-col gap-6 select-none w-full lg:w-[545px] shrink-0">
      {/* Top Container: Main Image + Action Buttons Column */}
      <div className="flex gap-4 lg:gap-[35px] items-start w-full">
        {/* Main Image Container */}
        <div
          className="relative w-full lg:w-[458px] h-[400px] sm:h-[500px] lg:h-[610px] rounded-[8px] overflow-hidden bg-[#F2F2F2] cursor-zoom-in group select-none shrink-0"
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
                className={`absolute inset-0 w-full h-full object-contain object-center transition-opacity duration-300 ease-in-out ${
                  isActive ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
                }`}
                style={
                  isActive && isZoomed
                    ? {
                        transform: 'scale(2.2)',
                        transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                        transition: 'transform 0.12s ease-out, opacity 0.3s ease-in-out',
                      }
                    : {
                        transform: 'scale(1)',
                        transition: 'transform 0.3s ease-out, opacity 0.3s ease-in-out',
                      }
                }
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
                fetchPriority={index === 0 ? 'high' : 'auto'}
              />
            );
          })}

          {/* Mobile Overlay: Floating Share & Wishlist Buttons */}
          <div className="lg:hidden absolute top-3 end-3 z-20 flex items-center gap-2">
            <button
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
                alert(t('Product link copied to clipboard!'));
              }}
              className="w-9 h-9 rounded-[8px] bg-white/90 backdrop-blur-sm shadow-sm flex items-center justify-center text-gray-800 active:scale-95 transition-all cursor-pointer border border-gray-100"
              title={t('Share')}
              aria-label={t('Share')}
            >
              <ShareIcon size={18} stroke="#141414" />
            </button>

            <button
              onClick={handleToggleWishlist}
              className="w-9 h-9 rounded-[8px] bg-white/90 backdrop-blur-sm shadow-sm flex items-center justify-center text-gray-800 active:scale-95 transition-all cursor-pointer border border-gray-100"
              title={isWishlisted ? t('Added to wishlist') : t('Add to wishlist')}
              aria-label={isWishlisted ? t('Added to wishlist') : t('Add to wishlist')}
            >
              <WishlistIcon
                size={18}
                stroke={isWishlisted ? '#EF4444' : '#141414'}
                className={isWishlisted ? 'fill-red-500 text-red-500' : ''}
              />
            </button>
          </div>

          {/* Mobile Overlay: Floating Prev & Next Arrows */}
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

        {/* Action Buttons Column (Figma node 79:664: 52px wide, exactly 610px height on desktop) */}
        <div className="hidden lg:flex flex-col justify-between h-[610px] w-[52px] shrink-0">
          {/* Top Cluster: Wishlist & Share */}
          <div className="flex flex-col gap-[20px] items-center">
            <button
              onClick={handleToggleWishlist}
              className="w-[52px] h-[52px] rounded-[8px] bg-[#F2F2F2] hover:bg-[#E5E7EB] active:scale-[0.96] flex items-center justify-center text-[#141414] transition-all cursor-pointer"
              title={isWishlisted ? t('Added to wishlist') : t('Add to wishlist')}
              aria-label={isWishlisted ? t('Added to wishlist') : t('Add to wishlist')}
            >
              <WishlistIcon
                size={20}
                stroke={isWishlisted ? '#EF4444' : '#141414'}
                className={isWishlisted ? 'fill-red-500' : ''}
              />
            </button>

            <button
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
                alert(t('Product link copied to clipboard!'));
              }}
              className="w-[52px] h-[52px] rounded-[8px] bg-[#F2F2F2] hover:bg-[#E5E7EB] active:scale-[0.96] flex items-center justify-center text-[#141414] transition-all cursor-pointer"
              title={t('Share')}
              aria-label={t('Share')}
            >
              <ShareIcon size={20} stroke="#141414" />
            </button>
          </div>

          {/* Bottom Cluster: Prev & Next Arrows */}
          <div className="flex flex-col gap-[20px] items-center">
            <button
              onClick={prev}
              className="w-[52px] h-[52px] rounded-[8px] bg-[#F2F2F2] hover:bg-[#E5E7EB] active:scale-[0.96] flex items-center justify-center text-[#141414] transition-all cursor-pointer"
              aria-label={t('Previous image')}
            >
              <ChevronArrowIcon direction={isRtl ? 'right' : 'left'} size={14} stroke="#141414" />
            </button>

            <button
              onClick={next}
              className="w-[52px] h-[52px] rounded-[8px] bg-[#F2F2F2] hover:bg-[#E5E7EB] active:scale-[0.96] flex items-center justify-center text-[#141414] transition-all cursor-pointer"
              aria-label={t('Next image')}
            >
              <ChevronArrowIcon direction={isRtl ? 'left' : 'right'} size={14} stroke="#141414" />
            </button>
          </div>
        </div>
      </div>

      {/* Thumbnails Row: 5 items, each 76x100px rounded-[8px] matching Figma node 57:1348 */}
      {images.length > 1 && (
        <div className="flex items-center justify-between w-full lg:w-[458px] overflow-x-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {images.slice(0, 5).map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIndex(i)}
              className={`w-[68px] sm:w-[76px] h-[90px] sm:h-[100px] shrink-0 rounded-[8px] overflow-hidden bg-[#F2F2F2] transition-all duration-300 cursor-pointer ${
                i === activeIndex
                  ? 'border-2 border-[#141414] scale-[1.02]'
                  : 'border border-transparent hover:border-gray-300 opacity-80 hover:opacity-100'
              }`}
            >
              <img
                src={img}
                alt={`${product.name} thumbnail ${i + 1}`}
                className="w-full h-full object-cover"
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
