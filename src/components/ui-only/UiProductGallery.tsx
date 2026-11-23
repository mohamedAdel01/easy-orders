import { useState, useRef, useCallback, useEffect } from 'react';

export interface UiProductGalleryProps {
  images?: string[];
  thumbnails?: string[];
  isWishlisted?: boolean;
  onToggleWishlist?: () => void;
  onShare?: () => void;
}

const DEFAULT_MAIN_IMAGES = [
  '/figma-assets/89a23379-492e-4db9-b748-9b06329aec8f.png', // Image 19 in Figma node 57:1343 (Main view)
  '/figma-assets/20929a7a-8f4e-4700-a789-353527830406.png', // Image 19/20 in Figma node 57:1352 (Back view)
  '/figma-assets/aca2cc20-174c-4991-96d6-8f6dbfd80b58.png', // Image 20 in Figma node 57:1354 (Full body pose)
  '/figma-assets/9273914d-4beb-4924-ad40-8c24a86b498f.png', // Image 21 in Figma node 57:1356 (Flat lay shirt)
  '/figma-assets/25d25921-f489-449b-ad57-eee494d7a7cf.png', // Image 23 in Figma node 57:1358 (Fabric & belt detail)
];

const DEFAULT_THUMBNAIL_IMAGES = [
  '/figma-assets/d3ac9abe-7e76-48dc-b804-f02de0bbb1e8.png', // Image 22 in Figma node 57:1350 (Thumb 1)
  '/figma-assets/20929a7a-8f4e-4700-a789-353527830406.png', // Image 19/20 in Figma node 57:1352 (Thumb 2)
  '/figma-assets/aca2cc20-174c-4991-96d6-8f6dbfd80b58.png', // Image 20 in Figma node 57:1354 (Thumb 3)
  '/figma-assets/9273914d-4beb-4924-ad40-8c24a86b498f.png', // Image 21 in Figma node 57:1356 (Thumb 4)
  '/figma-assets/25d25921-f489-449b-ad57-eee494d7a7cf.png', // Image 23 in Figma node 57:1358 (Thumb 5)
];

export default function UiProductGallery({
  images = DEFAULT_MAIN_IMAGES,
  thumbnails = DEFAULT_THUMBNAIL_IMAGES,
  isWishlisted = false,
  onToggleWishlist,
  onShare,
}: UiProductGalleryProps) {
  const [activeThumb, setActiveThumb] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isClickZoomed, setIsClickZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const isZoomActive = isHovered || isClickZoomed;

  // Reset zoom when active image changes
  const switchImage = useCallback(
    (newIndex: number) => {
      setActiveThumb((newIndex + images.length) % images.length);
      setIsClickZoomed(false);
      setZoomPos({ x: 50, y: 50 });
    },
    [images.length],
  );

  const nextImage = useCallback(() => switchImage(activeThumb + 1), [switchImage, activeThumb]);
  const prevImage = useCallback(() => switchImage(activeThumb - 1), [switchImage, activeThumb]);

  // Handle mouse move for responsive magnifying zoom
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setZoomPos({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (!isClickZoomed) {
      setZoomPos({ x: 50, y: 50 });
    }
  };

  const handleMainClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setZoomPos({ x, y });
    setIsClickZoomed((prev) => !prev);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prevImage();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      nextImage();
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsClickZoomed((prev) => !prev);
    } else if (e.key === 'Escape' && (isClickZoomed || isLightboxOpen)) {
      setIsClickZoomed(false);
      setIsLightboxOpen(false);
    }
  };

  // Touch handlers for mobile swipe & tap-to-zoom
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      setTouchStart({ x: touch.clientX, y: touch.clientY });
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isZoomActive && containerRef.current && e.touches.length === 1) {
      const touch = e.touches[0];
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(100, ((touch.clientX - rect.left) / rect.width) * 100));
      const y = Math.max(0, Math.min(100, ((touch.clientY - rect.top) / rect.height) * 100));
      setZoomPos({ x, y });
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!touchStart || isZoomActive) {
      setTouchStart(null);
      return;
    }
    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStart.x;
    const deltaY = touch.clientY - touchStart.y;
    // Horizontal swipe threshold: 45px and predominantly horizontal
    if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
      if (deltaX < 0) {
        nextImage();
      } else {
        prevImage();
      }
    }
    setTouchStart(null);
  };

  // Lightbox keyboard listener
  useEffect(() => {
    if (!isLightboxOpen) return;
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsLightboxOpen(false);
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [isLightboxOpen, prevImage, nextImage]);

  return (
    <div className="flex gap-4 lg:gap-[35px] items-start w-full lg:w-[545px] shrink-0">
      {/* Main Image + Thumbnails Container: 458px wide in Figma */}
      <div className="flex flex-col gap-[24px] w-full lg:w-[458px] shrink-0">
        {/* Main Image Frame (Figma node 57:1342: 458x610px, aspect-[458/610]) */}
        <div
          ref={containerRef}
          role="region"
          aria-label="Product Image Viewport with Zoom"
          tabIndex={0}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleMainClick}
          onKeyDown={handleKeyDown}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className={`bg-[#F2F2F2] w-full aspect-[458/610] max-h-[610px] rounded-[8px] overflow-hidden relative shrink-0 select-none outline-none focus-visible:ring-2 focus-visible:ring-black ${
            isZoomActive ? 'cursor-zoom-out' : 'cursor-zoom-in'
          }`}
        >
          {images.map((img, idx) => {
            const isActive = activeThumb === idx;
            return (
              <img
                key={idx}
                src={img}
                alt={`Product view ${idx + 1}`}
                width={458}
                height={610}
                loading={idx === 0 ? 'eager' : 'lazy'}
                fetchPriority={idx === 0 ? 'high' : 'low'}
                decoding="async"
                style={{
                  transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                  transform: isActive && isZoomActive ? 'scale(2.2)' : 'scale(1)',
                  transition:
                    isActive && isZoomActive
                      ? 'transform 75ms ease-out, opacity 400ms cubic-bezier(0.4, 0, 0.2, 1)'
                      : 'transform 300ms ease-out, opacity 400ms cubic-bezier(0.4, 0, 0.2, 1)',
                }}
                className={`absolute inset-0 w-full h-full object-contain object-center will-change-transform ${
                  isActive
                    ? 'opacity-100 z-10 pointer-events-auto'
                    : 'opacity-0 z-0 pointer-events-none'
                }`}
              />
            );
          })}

          {/* Interactive Zoom Hint Pill */}
          <div
            className={`absolute bottom-3 left-3 z-20 pointer-events-none transition-all duration-300 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] font-medium backdrop-blur-md ${
              isZoomActive
                ? 'bg-black/75 text-white shadow-sm'
                : 'bg-white/80 text-[#333333] shadow-sm opacity-90 hover:opacity-100'
            }`}
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {isZoomActive ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                />
              )}
            </svg>
            <span>{isZoomActive ? 'Tap / Click to reset' : 'Hover / Tap to zoom'}</span>
          </div>

          {/* Expand to Lightbox Button (top right) */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsLightboxOpen(true);
            }}
            className="absolute top-3 right-3 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-[#333333] hover:text-black backdrop-blur-md shadow-sm transition-all active:scale-95 cursor-pointer"
            title="Expand Fullscreen"
            aria-label="Expand Fullscreen"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
              />
            </svg>
          </button>
        </div>

        {/* Thumbnails Row: 5 portrait cards, each 76x100px, exactly fitted with aspect-[76/100] and no scrollbar */}
        <div
          role="tablist"
          aria-label="Product thumbnails"
          className="flex items-center justify-between w-full lg:w-[458px] overflow-x-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden gap-2"
        >
          {thumbnails.map((img, idx) => {
            const isSelected = activeThumb === idx;
            return (
              <button
                key={idx}
                type="button"
                role="tab"
                aria-selected={isSelected}
                aria-label={`View image ${idx + 1}`}
                onClick={() => switchImage(idx)}
                className={`w-[68px] sm:w-[76px] aspect-[76/100] rounded-[8px] overflow-hidden bg-[#F2F2F2] shrink-0 transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'border-2 border-[#141414] scale-[1.03] shadow-sm'
                    : 'border border-transparent hover:border-gray-300 opacity-75 hover:opacity-100'
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  width={76}
                  height={100}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Action Buttons Column: 52px wide, 610px height (Figma node 79:664) */}
      <div className="hidden lg:flex flex-col justify-between h-[610px] w-[52px] shrink-0">
        {/* Top Cluster: Share + Wishlist (Figma node 70:666, gap 20px) */}
        <div className="flex flex-col gap-[20px] items-center">
          <button
            type="button"
            onClick={onShare || (() => alert('Link copied to clipboard!'))}
            className="size-[52px] rounded-[8px] bg-[#F2F2F2] hover:bg-[#E5E7EB] active:scale-95 flex items-center justify-center transition-all cursor-pointer"
            title="Share"
            aria-label="Share"
          >
            <img
              src="/figma-assets/9d132331-64c3-4468-bc2f-cdfab4761e58.svg"
              alt="Share"
              width={20}
              height={20}
              className="size-[20px]"
            />
          </button>

          <button
            type="button"
            onClick={onToggleWishlist}
            className="size-[52px] rounded-[8px] bg-[#F2F2F2] hover:bg-[#E5E7EB] active:scale-95 flex items-center justify-center transition-all cursor-pointer"
            title="Wishlist"
            aria-label="Wishlist"
          >
            <img
              src="/figma-assets/4014fceb-ac58-4301-8f9c-e18c613e57a6.svg"
              alt="Wishlist"
              width={20}
              height={20}
              className={`size-[20px] ${
                isWishlisted ? 'filter drop-shadow-[0_0_2px_rgba(239,68,68,0.8)]' : ''
              }`}
            />
          </button>
        </div>

        {/* Bottom Cluster: Navigation Arrows Left (<) and Right (>) (Figma node 70:665, gap 20px) */}
        <div className="flex flex-col gap-[20px] items-center">
          <button
            type="button"
            onClick={prevImage}
            className="size-[52px] rounded-[8px] bg-[#F2F2F2] hover:bg-[#E5E7EB] active:scale-95 flex items-center justify-center transition-all cursor-pointer"
            aria-label="Previous view"
          >
            <img
              src="/figma-assets/action-arrow.svg"
              alt="Previous"
              width={20}
              height={20}
              className="size-[20px] -rotate-90"
            />
          </button>

          <button
            type="button"
            onClick={nextImage}
            className="size-[52px] rounded-[8px] bg-[#F2F2F2] hover:bg-[#E5E7EB] active:scale-95 flex items-center justify-center transition-all cursor-pointer"
            aria-label="Next view"
          >
            <img
              src="/figma-assets/action-arrow.svg"
              alt="Next"
              width={20}
              height={20}
              className="size-[20px] rotate-90"
            />
          </button>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {isLightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Fullscreen Product Image"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 z-50 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all cursor-pointer"
            aria-label="Close fullscreen"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Prev in Lightbox */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all cursor-pointer"
            aria-label="Previous image"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Next in Lightbox */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all cursor-pointer"
            aria-label="Next image"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Modal Main Image */}
          <div
            className="relative max-w-[90vw] max-h-[85vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[activeThumb]}
              alt={`Fullscreen product view ${activeThumb + 1}`}
              className="max-w-full max-h-[85vh] object-contain rounded-[8px] shadow-2xl transition-all duration-300"
            />
            {/* Modal counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[13px] font-medium tracking-wide">
              {activeThumb + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
