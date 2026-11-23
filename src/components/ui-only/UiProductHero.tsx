import { useState } from 'react';
import UiProductGallery from './UiProductGallery';

const SIZES = ['6', '8', '10', '14', '18', '20'];

const COLORS = [
  { name: 'Royal Brown', color: '#534029' },
  { name: 'Off White', color: '#EBEBEB' },
  { name: 'Slate Blue', color: '#3A6A90' },
  { name: 'Dark Navy', color: '#11171D' },
];

export default function UiProductHero() {
  const [selectedColor, setSelectedColor] = useState('Royal Brown');
  const [selectedSize, setSelectedSize] = useState('8');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);

  return (
    <section className="max-w-[1200px] mx-auto px-4 lg:px-6 xl:px-0 pt-0 pb-16 font-['Clash_Grotesk'] select-none">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-[60px] xl:gap-[135px]">
        {/* Left: Product Image Gallery & Controls (Figma node 79:665: 545px wide) */}
        <UiProductGallery
          isWishlisted={isWishlisted}
          onToggleWishlist={() => setIsWishlisted(!isWishlisted)}
          onShare={() => alert('Link copied to clipboard!')}
        />

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
