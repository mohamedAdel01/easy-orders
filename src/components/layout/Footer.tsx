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
    <footer className="bg-[#F2F2F2] text-gray-600 mt-20 border-t border-gray-200 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">
        {/* Main Section: Left Brand/Newsletter + Right 3 Link Columns sitting side-by-side */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 pb-12 items-start">
          {/* Left Column: Logo, Underline Newsletter Input, and 4 Social Circles */}
          <div className="lg:col-span-5 space-y-6">
            {/* Logo */}
            <div>
              <a href="/" className="inline-block">
                <img
                  src="/logo.png"
                  alt="John Lewis & Partners"
                  className="h-6 sm:h-7 w-auto object-contain"
                />
              </a>
            </div>

            {/* Newsletter Underline Input with Black Squircle Arrow Button matching Figma */}
            <form onSubmit={(e) => e.preventDefault()} className="max-w-sm pt-2">
              <div className="flex items-end border-b border-gray-400 focus-within:border-black transition-colors pb-1 gap-2">
                <input
                  type="email"
                  placeholder={t('Get latest offers to your inbox')}
                  className="w-full bg-transparent text-xs text-gray-800 placeholder-gray-500 outline-none py-1 pe-2 font-normal"
                />
                <button
                  type="submit"
                  className="w-9 h-8 bg-[#141414] hover:bg-black text-white rounded-lg flex items-center justify-center transition-colors flex-shrink-0 cursor-pointer shadow-sm"
                  aria-label={t('Subscribe')}
                >
                  <ChevronArrowIcon
                    direction={isRtl ? 'left' : 'right'}
                    size={12}
                    stroke="#ffffff"
                  />
                </button>
              </div>
            </form>

            {/* 4 Circular White Social Buttons matching Figma: Facebook, Instagram, Twitter, Mail */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-800 hover:text-black hover:scale-105 transition-all"
              >
                <FacebookIcon size={13} fill="#141414" />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-800 hover:text-black hover:scale-105 transition-all"
              >
                <InstagramIcon size={14} stroke="#141414" />
              </a>

              <a
                href="#"
                aria-label="Twitter"
                className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-800 hover:text-black hover:scale-105 transition-all"
              >
                <TwitterIcon size={13} fill="#141414" />
              </a>

              <a
                href="#"
                aria-label="Mail"
                className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-800 hover:text-black hover:scale-105 transition-all"
              >
                <MailIcon size={14} stroke="#141414" />
              </a>
            </div>
          </div>

          {/* Right Area: 3 Columns matching Figma: Shop, Information, Company */}
          <div className="lg:col-span-7 grid grid-cols-3 gap-6 sm:gap-10">
            {/* 1. Shop */}
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-gray-900 tracking-tight mb-4">
                {t('Shop')}
              </h4>
              <ul className="space-y-3 text-xs text-gray-600 font-normal">
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
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-gray-900 tracking-tight mb-4">
                {t('Information')}
              </h4>
              <ul className="space-y-3 text-xs text-gray-600 font-normal">
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
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-gray-900 tracking-tight mb-4">
                {t('Company')}
              </h4>
              <ul className="space-y-3 text-xs text-gray-600 font-normal">
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

        {/* Bottom Bar matching Figma: 1200 x 46 Hug */}
        <div className="border-t border-gray-300/70 pt-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p className="font-normal text-gray-500">
            {t('© John Lewis plc 2001 - 2024')}
          </p>

          <div className="flex items-center gap-6 text-gray-700 text-xs font-normal">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 hover:text-black transition-colors cursor-pointer"
            >
              <span className="text-sm">{language === 'ar' ? '🇪🇬' : '🇺🇸'}</span>
              <span>{language === 'ar' ? 'العربية' : 'English'}</span>
              <ChevronArrowIcon direction="down" size={10} stroke="#6B7280" />
            </button>

            {/* Currency */}
            <div className="flex items-center gap-1.5 hover:text-black transition-colors cursor-pointer">
              <span>{language === 'ar' ? 'EGP' : 'USD'}</span>
              <ChevronArrowIcon direction="down" size={10} stroke="#6B7280" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
