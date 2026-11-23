import { useState } from 'react';

export default function UiNavbar() {
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  return (
    <>
      {/* 1. Offers / Announcement Bar (Figma node 57:1524: 1512x42, bg #141414) */}
      <div className="bg-[#141414] h-[42px] w-full flex items-center justify-center px-4 select-none">
        <div className="flex items-center justify-center gap-[16px] text-center">
          <p className="font-['Clash_Grotesk'] font-medium text-[14px] text-white leading-[1.2] whitespace-pre m-0">
            {`New season coming!  Discount 10% for all product!  Checkout Now!`}
          </p>
          <div className="bg-[#383838] w-[49px] h-[18px] rounded-[23px] flex items-center justify-center shrink-0">
            <span className="font-['Clash_Grotesk'] font-medium text-[12px] text-white leading-none">
              20:40
            </span>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Header (Figma node 57:1307: 1200x32 inside 1512 canvas, 94px header) */}
      <header className="sticky top-0 z-40 bg-white select-none border-b border-dashed border-[#A3A3A3]">
        <div className="max-w-[1200px] mx-auto px-4 lg:px-0">
          <div className="flex items-center justify-between h-[64px] lg:h-[94px]">
            {/* Logo: 170x32px */}
            <div className="shrink-0 flex items-center">
              <a href="/" className="block">
                <img
                  src="/figma-assets/2e679084-5e76-42a0-95cf-a72506234eaf.png"
                  alt="John Lewis & Partners"
                  className="h-[28px] lg:h-[32px] w-auto lg:w-[170px] object-contain"
                />
              </a>
            </div>

            {/* Right Navigation Controls: exact 32px gap across all items */}
            <div className="flex items-center gap-4 sm:gap-6 lg:gap-[32px] text-[16px]">
              {/* Search Icon (Figma node 57:1326: 20x20) */}
              <button
                type="button"
                className="size-[20px] hover:opacity-70 transition-opacity cursor-pointer flex items-center justify-center"
                aria-label="Search"
              >
                <img
                  src="/figma-assets/306af342-811b-4a2d-b1cf-a34ed573fa5a.svg"
                  alt="Search"
                  className="size-[20px]"
                />
              </button>

              {/* Categories (Figma node 57:1309: 16px Medium #141414 + 20x20 chevron) */}
              <div className="relative hidden md:block">
                <button
                  type="button"
                  onClick={() => setCategoriesOpen(!categoriesOpen)}
                  className="flex items-center gap-[4px] font-['Clash_Grotesk'] font-medium text-[16px] text-[#141414] hover:opacity-70 transition-opacity py-1 cursor-pointer"
                >
                  <span className="leading-[1.6]">Categories</span>
                  <img
                    src="/figma-assets/chevron-down.svg"
                    alt="Dropdown"
                    className={`size-[20px] transition-transform duration-200 ${categoriesOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {categoriesOpen && (
                  <div className="absolute end-0 mt-2 w-48 bg-white rounded-[8px] shadow-lg border border-[#E6E6E6] py-2 z-50 text-[14px] font-['Clash_Grotesk']">
                    <a href="#womenswear" className="block px-4 py-2 hover:bg-[#F2F2F2] text-[#141414]">
                      Womenswear
                    </a>
                    <a href="#menswear" className="block px-4 py-2 hover:bg-[#F2F2F2] text-[#141414]">
                      Menswear
                    </a>
                    <a href="#shoes" className="block px-4 py-2 hover:bg-[#F2F2F2] text-[#141414]">
                      Shoes
                    </a>
                  </div>
                )}
              </div>

              {/* Sign in (Figma node 57:1319: 20x20 icon + 16px Medium #141414) */}
              <div className="hidden sm:flex items-center gap-[4px] cursor-pointer hover:opacity-70 transition-opacity">
                <img
                  src="/figma-assets/25a839fa-75c7-4ed2-91b1-5245eb3493b8.svg"
                  alt="User"
                  className="size-[20px]"
                />
                <span className="font-['Clash_Grotesk'] font-medium text-[16px] text-[#141414] leading-[1.6]">
                  Sign in
                </span>
              </div>

              {/* Wishlist (Figma node 57:1313: 20x20 heart icon) */}
              <button
                type="button"
                className="size-[20px] hover:opacity-70 transition-opacity cursor-pointer flex items-center justify-center"
                aria-label="Wishlist"
              >
                <img
                  src="/figma-assets/e06ba56f-c3fe-473a-96b0-09a3eae8ebbd.svg"
                  alt="Wishlist"
                  className="size-[20px]"
                />
              </button>

              {/* Cart Bag + Badge (Figma node 57:1315 & 57:1330: 20x20 bag + 13x13 badge) */}
              <div className="relative cursor-pointer hover:opacity-70 transition-opacity flex items-center justify-center">
                <img
                  src="/figma-assets/7b1aff53-e39a-4ee8-b49b-a30dbb0810c5.svg"
                  alt="Cart"
                  className="size-[20px]"
                />
                <div className="absolute -top-[3px] -right-[4px] size-[13px] rounded-full bg-[#141414] flex items-center justify-center">
                  <span className="font-['Clash_Grotesk'] font-medium text-[8px] text-white leading-none">
                    1
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
