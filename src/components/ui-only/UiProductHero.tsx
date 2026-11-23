import { useState } from 'react';

const MAIN_IMAGES = [
  '/figma-assets/89a23379-492e-4db9-b748-9b06329aec8f.png', // Image 19 in Figma node 57:1343 (Main view)
  '/figma-assets/20929a7a-8f4e-4700-a789-353527830406.png', // Image 19/20 in Figma node 57:1352 (Back view)
  '/figma-assets/aca2cc20-174c-4991-96d6-8f6dbfd80b58.png', // Image 20 in Figma node 57:1354 (Full body pose)
  '/figma-assets/9273914d-4beb-4924-ad40-8c24a86b498f.png', // Image 21 in Figma node 57:1356 (Flat lay shirt)
  '/figma-assets/25d25921-f489-449b-ad57-eee494d7a7cf.png', // Image 23 in Figma node 57:1358 (Fabric & belt detail)
];

const THUMBNAIL_IMAGES = [
  '/figma-assets/d3ac9abe-7e76-48dc-b804-f02de0bbb1e8.png', // Image 22 in Figma node 57:1350 (Thumb 1)
  '/figma-assets/20929a7a-8f4e-4700-a789-353527830406.png', // Image 19/20 in Figma node 57:1352 (Thumb 2)
  '/figma-assets/aca2cc20-174c-4991-96d6-8f6dbfd80b58.png', // Image 20 in Figma node 57:1354 (Thumb 3)
  '/figma-assets/9273914d-4beb-4924-ad40-8c24a86b498f.png', // Image 21 in Figma node 57:1356 (Thumb 4)
  '/figma-assets/25d25921-f489-449b-ad57-eee494d7a7cf.png', // Image 23 in Figma node 57:1358 (Thumb 5)
];

const SIZES = ['6', '8', '10', '14', '18', '20'];

const COLORS = [
  { name: 'Royal Brown', color: '#534029' },
  { name: 'Off White', color: '#EBEBEB' },
  { name: 'Slate Blue', color: '#3A6A90' },
  { name: 'Dark Navy', color: '#11171D' },
];

export default function UiProductHero() {
  const [activeThumb, setActiveThumb] = useState(0);
  const [selectedColor, setSelectedColor] = useState('Royal Brown');
  const [selectedSize, setSelectedSize] = useState('8');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);

  return (
    <section className="max-w-[1200px] mx-auto px-4 lg:px-6 xl:px-0 pt-0 pb-16 font-['Clash_Grotesk'] select-none">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-[60px] xl:gap-[135px]">
        {/* Left: Product Image & Buttons (Figma node 79:665: 545px wide) */}
        <div className="flex gap-4 lg:gap-[35px] items-start w-full lg:w-[545px] shrink-0">
          {/* Main Image + Thumbnails (458px wide) */}
          <div className="flex flex-col gap-[24px] w-full lg:w-[458px] shrink-0">
            {/* Main Image: 458x610px with smooth transition (Figma node 57:1342) */}
            <div className="bg-[#F2F2F2] w-full lg:w-[458px] h-[400px] sm:h-[500px] lg:h-[610px] rounded-[8px] overflow-hidden relative shrink-0">
              {MAIN_IMAGES.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Product main view ${idx + 1}`}
                  className={`absolute inset-0 w-full h-full object-contain object-center transition-all duration-400 ease-out ${
                    activeThumb === idx
                      ? 'opacity-100 scale-100 z-10 pointer-events-auto'
                      : 'opacity-0 scale-[1.015] z-0 pointer-events-none'
                  }`}
                />
              ))}
            </div>

            {/* Thumbnails Row: 5 portrait cards, each 76x100px, exactly fitted with no scrollbar */}
            <div className="flex items-center justify-between w-full lg:w-[458px] overflow-x-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {THUMBNAIL_IMAGES.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveThumb(idx)}
                  className={`w-[68px] sm:w-[76px] h-[90px] sm:h-[100px] rounded-[8px] overflow-hidden bg-[#F2F2F2] shrink-0 transition-all duration-300 cursor-pointer ${
                    activeThumb === idx
                      ? 'border-2 border-[#141414] scale-[1.02]'
                      : 'border border-transparent hover:border-gray-300 opacity-80 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons Column: 52px wide, 610px height (Figma node 79:664) */}
          <div className="hidden lg:flex flex-col justify-between h-[610px] w-[52px] shrink-0">
            {/* Top Cluster: Share + Wishlist (Figma node 70:666, gap 20px) */}
            <div className="flex flex-col gap-[20px] items-center">
              <button
                type="button"
                onClick={() => alert('Link copied to clipboard!')}
                className="size-[52px] rounded-[8px] bg-[#F2F2F2] hover:bg-[#E5E7EB] active:scale-95 flex items-center justify-center transition-all cursor-pointer"
                title="Share"
                aria-label="Share"
              >
                <img
                  src="/figma-assets/9d132331-64c3-4468-bc2f-cdfab4761e58.svg"
                  alt="Share"
                  className="size-[20px]"
                />
              </button>

              <button
                type="button"
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="size-[52px] rounded-[8px] bg-[#F2F2F2] hover:bg-[#E5E7EB] active:scale-95 flex items-center justify-center transition-all cursor-pointer"
                title="Wishlist"
                aria-label="Wishlist"
              >
                <img
                  src="/figma-assets/4014fceb-ac58-4301-8f9c-e18c613e57a6.svg"
                  alt="Wishlist"
                  className={`size-[20px] ${isWishlisted ? 'filter drop-shadow-[0_0_2px_rgba(239,68,68,0.8)]' : ''}`}
                />
              </button>
            </div>

            {/* Bottom Cluster: Navigation Arrows Left (<) and Right (>) (Figma node 70:665, gap 20px) */}
            <div className="flex flex-col gap-[20px] items-center">
              <button
                type="button"
                onClick={() => setActiveThumb((t) => (t - 1 + MAIN_IMAGES.length) % MAIN_IMAGES.length)}
                className="size-[52px] rounded-[8px] bg-[#F2F2F2] hover:bg-[#E5E7EB] active:scale-95 flex items-center justify-center transition-all cursor-pointer"
                aria-label="Previous view"
              >
                <img
                  src="/figma-assets/action-arrow.svg"
                  alt="Previous"
                  className="size-[20px] -rotate-90"
                />
              </button>

              <button
                type="button"
                onClick={() => setActiveThumb((t) => (t + 1) % MAIN_IMAGES.length)}
                className="size-[52px] rounded-[8px] bg-[#F2F2F2] hover:bg-[#E5E7EB] active:scale-95 flex items-center justify-center transition-all cursor-pointer"
                aria-label="Next view"
              >
                <img
                  src="/figma-assets/action-arrow.svg"
                  alt="Next"
                  className="size-[20px] rotate-90"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Right: Product Info and CTA (Figma node 79:666: 520px wide) */}
        <div className="w-full lg:w-[520px] shrink-0 flex flex-col">
          {/* Brand Subtitle: 16px Medium #8F8F8F */}
          <div className="mb-[12px]">
            <span className="font-medium text-[16px] text-[#8F8F8F] tracking-[0.16px] leading-[1.2]">
              John Lewis ANYDAY
            </span>
          </div>

          {/* Product Title: 36px Semibold #292929 */}
          <h1 className="font-semibold text-[28px] sm:text-[36px] text-[#292929] leading-[1.2] tracking-[-0.18px] mb-[20px]">
            Long Sleeve Overshirt, Khaki, 6
          </h1>

          {/* Pricing & Rating Row (Figma node 57:1370) */}
          <div className="flex items-center justify-between pb-[24px] mb-[28px] border-b border-dashed border-[#E6E6E6]">
            {/* Prices */}
            <div className="flex items-center gap-[16px]">
              <span className="font-medium text-[18px] text-[#666666] line-through leading-[1.2]">
                £40.00
              </span>
              <span className="font-semibold text-[28px] text-[#141414] leading-[1.2]">
                £28.00
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
              {showFullDesc ? (
                'Boba etiam ut bulla tea est potus dilectus singulari compositione saporum et textuum, quae in Taiwan annis 1980 orta sunt. Boba refert ad pilas masticas tapiocas in fundo potus inventas, quae typice lacte tea nigro sapiuntur. Boba phaenomenon in orbem terrarum diffudit, multiplicibus variantibus et saporibus omnibus gustibus accommodatis.'
              ) : (
                <>
                  {`Boba etiam ut bulla tea est potus dilectus singulari compositione saporum et textuum, quae in Taiwan annis 1980 orta sunt. Boba refert ad pilas masticas tapiocas in fundo potus inventas, quae typice lacte tea nigro sapiuntur. Boba phaenomenon. `}
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
              <span className="font-semibold text-[#292929]">{selectedColor}</span>
            </div>

            <div className="flex items-center gap-[14px] flex-wrap">
              {COLORS.map((swatch) => {
                const isSelected = selectedColor === swatch.name;
                return (
                  <button
                    key={swatch.name}
                    type="button"
                    onClick={() => setSelectedColor(swatch.name)}
                    className={`w-[75px] h-[40px] rounded-[8px] transition-all cursor-pointer flex items-center justify-center ${
                      isSelected
                        ? 'bg-white border border-[#141414]'
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
          <div className="mb-[56px]">
            <div className="flex items-center justify-between text-[20px] leading-[1.2] mb-[18px]">
              <div>
                <span className="font-['Raleway'] font-semibold text-[#8F8F8F]">Size: </span>
                <span className="font-semibold text-[#292929]">{selectedSize}</span>
              </div>
              <button
                type="button"
                className="font-medium text-[16px] text-[#525252] underline hover:text-black cursor-pointer"
                onClick={() => alert('UK Regular Standard Sizing')}
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
                    onClick={() => setSelectedSize(size)}
                    className={`w-[75px] h-[40px] rounded-[8px] font-semibold text-[20px] leading-[1.2] flex items-center justify-center transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#EBEBEB] text-[#141414] border border-[#333333]'
                        : 'bg-white text-[#525252] border border-[#E6E6E6] hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Purchase CTA Buttons (Figma node 57:1411: Add To Cart 296x58 + Checkout Now 200x58, gap 24px) */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-[24px] mb-[24px]">
            <button
              type="button"
              onClick={() => alert('Added to cart!')}
              className="w-full sm:w-[296px] h-[58px] bg-[#141414] hover:bg-neutral-800 active:scale-[0.99] rounded-[8px] font-semibold text-[20px] leading-[1.2] text-white flex items-center justify-center transition-all cursor-pointer"
            >
              Add To Cart
            </button>

            <button
              type="button"
              onClick={() => alert('Proceeding to checkout!')}
              className="w-full sm:w-[200px] h-[58px] bg-white border border-[#B8B8B8] hover:bg-gray-50 active:scale-[0.99] rounded-[8px] font-medium text-[20px] leading-[1.2] text-[#333333] flex items-center justify-center transition-all cursor-pointer"
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
                alert('Delivery Terms & Conditions');
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
