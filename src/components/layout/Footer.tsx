import { useI18n } from '../../hooks/useI18n';
import {
  ChevronArrowIcon,
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  MailIcon,
} from '../icons';

export default function Footer() {
  const { t, toggleLanguage, language, isRtl } = useI18n();

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
    <footer className="bg-[#F2F2F2] text-[#666666] mt-20 select-none font-sans">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-0 pt-[72px] pb-[32px]">
        {/* Main Section: Left Brand/Newsletter + Right 3 Link Columns */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-[60px] pb-14 items-start justify-between">
          {/* Left Column: Logo, Underline Newsletter Input, and 4 Social Circles (310px wide) */}
          <div className="w-full lg:w-[310px] space-y-6 shrink-0">
            {/* Logo: 170x32px */}
            <div>
              <a href="/" className="inline-block">
                <img
                  src="/logo.png"
                  alt="John Lewis & Partners"
                  className="h-[32px] w-[170px] object-contain"
                />
              </a>
            </div>

            {/* Newsletter Underline Input with Black Squircle Arrow Button matching Figma */}
            <form onSubmit={(e) => e.preventDefault()} className="max-w-sm pt-2">
              <div className="flex items-end border-b border-[#A3A3A3] focus-within:border-black transition-colors pb-1 gap-2">
                <input
                  type="email"
                  placeholder={t('Get latest offers to your inbox')}
                  className="w-full bg-transparent font-sans font-medium text-[16px] text-[#141414] placeholder-[#787A7C] outline-none py-1 pe-2"
                />
                <button
                  type="submit"
                  className="w-[52px] h-[36px] bg-[#141414] hover:bg-black text-white rounded-[8px] flex items-center justify-center transition-colors shrink-0 cursor-pointer shadow-sm"
                  aria-label={t('Subscribe')}
                >
                  <ChevronArrowIcon
                    direction={isRtl ? 'left' : 'right'}
                    size={14}
                    stroke="#ffffff"
                  />
                </button>
              </div>
            </form>

            {/* 4 Circular White Social Buttons matching Figma: 36x36px */}
            <div className="flex items-center gap-[16px] pt-2">
              <a
                href="#"
                aria-label="Facebook"
                className="w-[36px] h-[36px] rounded-full bg-white shadow-sm flex items-center justify-center text-[#141414] hover:scale-105 transition-all"
              >
                <FacebookIcon size={16} fill="#141414" />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="w-[36px] h-[36px] rounded-full bg-white shadow-sm flex items-center justify-center text-[#141414] hover:scale-105 transition-all"
              >
                <InstagramIcon size={16} stroke="#141414" />
              </a>

              <a
                href="#"
                aria-label="Twitter"
                className="w-[36px] h-[36px] rounded-full bg-white shadow-sm flex items-center justify-center text-[#141414] hover:scale-105 transition-all"
              >
                <TwitterIcon size={16} fill="#141414" />
              </a>

              <a
                href="#"
                aria-label="Mail"
                className="w-[36px] h-[36px] rounded-full bg-white shadow-sm flex items-center justify-center text-[#141414] hover:scale-105 transition-all"
              >
                <MailIcon size={16} stroke="#141414" />
              </a>
            </div>
          </div>

          {/* Right Area: 3 Columns matching Figma: Shop, Information, Company (gap 60-120px) */}
          <div className="grid grid-cols-3 gap-6 sm:gap-12 lg:gap-[120px] shrink-0">
            {/* 1. Shop */}
            <div className="w-[110px] sm:w-[134px]">
              <h4 className="font-sans font-semibold text-[14px] text-[#121212] tracking-tight mb-4">
                {t('Shop')}
              </h4>
              <ul className="space-y-[12px] font-sans font-normal text-[14px] leading-[22px] text-[#141414]">
                {shopLinks.map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-black transition-colors">
                      {t(item)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* 2. Information */}
            <div className="w-[110px] sm:w-[134px]">
              <h4 className="font-sans font-semibold text-[14px] text-[#121212] tracking-tight mb-4">
                {t('Information')}
              </h4>
              <ul className="space-y-[12px] font-sans font-normal text-[14px] leading-[22px] text-[#141414]">
                {infoLinks.map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-black transition-colors">
                      {t(item)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3. Company */}
            <div className="w-[110px] sm:w-[134px]">
              <h4 className="font-sans font-semibold text-[14px] text-[#121212] tracking-tight mb-4">
                {t('Company')}
              </h4>
              <ul className="space-y-[12px] font-sans font-normal text-[14px] leading-[22px] text-[#141414]">
                {companyLinks.map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-black transition-colors">
                      {t(item)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Dashed border #A3A3A3, height 46px */}
        <div className="border-t border-dashed border-[#A3A3A3] pt-5 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-[14px] text-[#3E3E59]">
          <p className="font-normal text-[#3E3E59]">
            {t('© John Lewis plc 2001 - 2024')}
          </p>

          <div className="flex items-center gap-[32px] text-[#121212] font-medium">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 hover:opacity-70 transition-opacity cursor-pointer"
            >
              <span className="text-base">{language === 'ar' ? '🇪🇬' : '🇬🇧'}</span>
              <span>{language === 'ar' ? 'العربية' : 'English'}</span>
              <ChevronArrowIcon direction="down" size={10} stroke="#121212" />
            </button>

            {/* Currency */}
            <div className="flex items-center gap-1.5 hover:opacity-70 transition-opacity cursor-pointer">
              <span>{language === 'ar' ? 'EGP' : 'USD'}</span>
              <ChevronArrowIcon direction="down" size={10} stroke="#121212" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
