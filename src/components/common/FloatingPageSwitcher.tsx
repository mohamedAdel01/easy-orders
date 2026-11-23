import { useState } from 'react';
import { Link } from 'react-router-dom';

interface FloatingPageSwitcherProps {
  current: 'dynamic' | 'ui-only';
}

export default function FloatingPageSwitcher({ current }: FloatingPageSwitcherProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isUiOnly = current === 'ui-only';
  const targetUrl = isUiOnly ? '/dynamic' : '/';

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Tooltip Pill */}
      <div
        className={`bg-[#141414]/95 text-white text-xs font-['Clash_Grotesk'] font-medium px-3.5 py-2 rounded-full shadow-2xl border border-white/10 backdrop-blur-md transition-all duration-300 pointer-events-none select-none flex items-center gap-2 ${
          isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
        }`}
      >
        <span
          className={`size-2 rounded-full ${
            isUiOnly ? 'bg-amber-400' : 'bg-emerald-400'
          } animate-pulse`}
        />
        <span>
          {isUiOnly
            ? 'الانتقال إلى النسخة التفاعلية (Dynamic API)'
            : 'الانتقال إلى الصفحة الرئيسية (Pixel-Perfect)'}
        </span>
      </div>

      {/* Floating Gear Button */}
      <Link
        to={targetUrl}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative size-14 rounded-full bg-[#141414] hover:bg-black text-white shadow-2xl border-2 border-white/20 hover:border-white/60 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group cursor-pointer"
        aria-label="Toggle Page Mode"
        title={isUiOnly ? 'Switch to Dynamic API' : 'Switch to Pixel Perfect'}
      >
        <svg
          className="size-6 text-white group-hover:rotate-90 transition-transform duration-500 ease-out"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
          <circle cx="12" cy="12" r="3" />
        </svg>

        {/* Small Mode Indicator Dot */}
        <span
          className={`absolute top-0 right-0 size-3.5 rounded-full border-2 border-[#141414] ${
            isUiOnly ? 'bg-emerald-400' : 'bg-blue-400'
          }`}
        />
      </Link>
    </div>
  );
}
