export default function UiFooter() {
  const shopLinks = ['My account', 'Login', 'Wishlist', 'Cart'];
  const infoLinks = [
    'Shipping Policy',
    'Returns & Refunds',
    'Cookies Policy',
    'Frequently asked',
  ];
  const companyLinks = [
    'About us',
    'Privacy Policy',
    'Terms & Conditions',
    'Contact Us',
  ];

  return (
    <footer className="bg-[#F2F2F2] text-[#666666] select-none font-['Clash_Grotesk'] w-full">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-0 pt-[72px] pb-[32px]">
        {/* Main Columns (Figma node 57:3766: left 310px, right 3 columns x 134px) */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-[60px] pb-14 items-start justify-between">
          {/* Left Column: Logo + Newsletter + Social Icons */}
          <div className="w-full lg:w-[310px] space-y-[24px] shrink-0">
            {/* Logo: 170x32px */}
            <div>
              <a href="/" className="inline-block">
                <img
                  src="/figma-assets/ea88df05-ade4-4e43-b91a-12ee366a4b98.png"
                  alt="John Lewis & Partners"
                  className="h-[32px] w-[170px] object-contain"
                />
              </a>
            </div>

            {/* Newsletter Input + Submit Arrow Button (Figma node 57:2167) */}
            <form onSubmit={(e) => e.preventDefault()} className="max-w-sm pt-2">
              <div className="flex items-end border-b border-[#A3A3A3] pb-1 gap-2">
                <input
                  type="email"
                  placeholder="Get latest offers to your inbox"
                  className="w-full bg-transparent font-medium text-[16px] text-[#141414] placeholder-[#787A7C] outline-none py-1 pe-2"
                />
                <button
                  type="submit"
                  className="w-[52px] h-[36px] bg-[#141414] hover:bg-black rounded-[8px] flex items-center justify-center shrink-0 cursor-pointer shadow-sm transition-colors"
                  aria-label="Subscribe"
                >
                  <img
                    src="/figma-assets/newsletter-arrow.svg"
                    alt=""
                    className="size-[16px] rotate-90"
                  />
                </button>
              </div>
            </form>

            {/* Social Icons (Figma node 57:2182: 4 white circles, 36x36px, gap 16px) */}
            <div className="flex items-center gap-[16px] pt-1">
              <a
                href="#facebook"
                aria-label="Facebook"
                className="size-[36px] rounded-full bg-white shadow-sm flex items-center justify-center hover:scale-105 transition-all"
              >
                <img
                  src="/figma-assets/83d80113-919b-47b7-acec-5d4aa131697f.svg"
                  alt="Facebook"
                  className="size-[18px]"
                />
              </a>

              <a
                href="#instagram"
                aria-label="Instagram"
                className="size-[36px] rounded-full bg-white shadow-sm flex items-center justify-center hover:scale-105 transition-all"
              >
                <img
                  src="/figma-assets/ee892911-577d-45d2-89ea-ba1ce1b69477.svg"
                  alt="Instagram"
                  className="size-[18px]"
                />
              </a>

              <a
                href="#twitter"
                aria-label="Twitter"
                className="size-[36px] rounded-full bg-white shadow-sm flex items-center justify-center hover:scale-105 transition-all"
              >
                <img
                  src="/figma-assets/52d922e7-aec8-4fa8-afa7-3f0155dd4a58.svg"
                  alt="Twitter"
                  className="size-[18px]"
                />
              </a>

              <a
                href="#email"
                aria-label="Email"
                className="size-[36px] rounded-full bg-white shadow-sm flex items-center justify-center hover:scale-105 transition-all"
              >
                <img
                  src="/figma-assets/a2893c4f-3483-423b-9d48-96f9da861ea6.svg"
                  alt="Email"
                  className="size-[18px]"
                />
              </a>
            </div>
          </div>

          {/* Right Columns: Shop, Information, Company (134px wide each, gap 120px) */}
          <div className="grid grid-cols-3 gap-6 sm:gap-12 lg:gap-[120px] shrink-0">
            {/* 1. Shop */}
            <div className="w-[110px] sm:w-[134px]">
              <h4 className="font-semibold text-[14px] text-[#121212] tracking-tight mb-[16px]">
                Shop
              </h4>
              <ul className="space-y-[12px] font-normal text-[14px] leading-[22px] text-[#141414]">
                {shopLinks.map((item) => (
                  <li key={item}>
                    <a href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-black transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* 2. Information */}
            <div className="w-[110px] sm:w-[134px]">
              <h4 className="font-semibold text-[14px] text-[#121212] tracking-tight mb-[16px]">
                Information
              </h4>
              <ul className="space-y-[12px] font-normal text-[14px] leading-[22px] text-[#141414]">
                {infoLinks.map((item) => (
                  <li key={item}>
                    <a href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-black transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3. Company */}
            <div className="w-[110px] sm:w-[134px]">
              <h4 className="font-semibold text-[14px] text-[#121212] tracking-tight mb-[16px]">
                Company
              </h4>
              <ul className="space-y-[12px] font-normal text-[14px] leading-[22px] text-[#141414]">
                {companyLinks.map((item) => (
                  <li key={item}>
                    <a href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-black transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Dashed Divider #A3A3A3 (Figma node 57:3766) */}
        <div className="border-t border-dashed border-[#A3A3A3] pt-[20px] flex flex-col sm:flex-row items-center justify-between gap-4 text-[14px] text-[#3E3E59]">
          <p className="font-normal text-[#3E3E59]">
            © John Lewis plc 2001 - 2024
          </p>

          <div className="flex items-center gap-[32px] text-[#121212] font-medium text-[14px]">
            {/* Language with USA Flag */}
            <div className="flex items-center gap-[8px] cursor-pointer hover:opacity-80 transition-opacity">
              <div className="w-[18px] h-[14px] overflow-hidden shrink-0 relative">
                <img
                  src="/figma-assets/us-flag.svg"
                  alt="USA Flag"
                  className="w-[25.65px] h-[14px] max-w-none absolute left-0 top-0"
                />
              </div>
              <span className="leading-[24px]">English</span>
              <img
                src="/figma-assets/chevron-down.svg"
                alt=""
                className="size-[18px] shrink-0"
              />
            </div>

            {/* Currency */}
            <div className="flex items-center gap-[4px] cursor-pointer hover:opacity-80 transition-opacity">
              <span className="leading-[24px]">USD</span>
              <img
                src="/figma-assets/chevron-down.svg"
                alt=""
                className="size-[18px] shrink-0"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
