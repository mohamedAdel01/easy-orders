import React from 'react';

export interface IconProps {
  className?: string;
  size?: number;
  color?: string;
  stroke?: string;
  fill?: string;
}

// 1. Search Icon (from Figma: Frame 7.svg)
export const SearchIcon: React.FC<IconProps> = ({
  className = '',
  size = 20,
  stroke = 'currentColor',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M14.5835 14.5833L18.3335 18.3333"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      stroke={stroke}
    />
    <path
      d="M16.6665 9.16669C16.6665 5.02455 13.3087 1.66669 9.1665 1.66669C5.02437 1.66669 1.6665 5.02455 1.6665 9.16669C1.6665 13.3089 5.02437 16.6667 9.1665 16.6667C13.3087 16.6667 16.6665 13.3089 16.6665 9.16669Z"
      strokeWidth="1.5"
      strokeLinejoin="round"
      stroke={stroke}
    />
  </svg>
);

// 2. User / Sign In Icon (from Figma: Frame.svg)
export const UserIcon: React.FC<IconProps> = ({
  className = '',
  size = 20,
  stroke = 'currentColor',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M5.48131 12.9013C4.30234 13.6033 1.21114 15.0367 3.09389 16.8305C4.01359 17.7066 5.03791 18.3333 6.32573 18.3333H13.6743C14.9621 18.3333 15.9864 17.7066 16.9061 16.8305C18.7888 15.0367 15.6977 13.6033 14.5187 12.9013C11.754 11.2551 8.24599 11.2551 5.48131 12.9013Z"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      stroke={stroke}
    />
    <path
      d="M13.75 5.41669C13.75 7.48775 12.0711 9.16669 10 9.16669C7.92893 9.16669 6.25 7.48775 6.25 5.41669C6.25 3.34562 7.92893 1.66669 10 1.66669C12.0711 1.66669 13.75 3.34562 13.75 5.41669Z"
      strokeWidth="1.25"
      stroke={stroke}
    />
  </svg>
);

// 3. Star Icon (from Figma: star.svg)
export const StarIcon: React.FC<IconProps> = ({
  className = '',
  size = 20,
  fill = '#FFA439',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M13.7299 3.51014L15.4899 7.03014C15.7299 7.52014 16.3699 7.99014 16.9099 8.08014L20.0999 8.61014C22.1399 8.95014 22.6199 10.4301 21.1499 11.8901L18.6699 14.3701C18.2499 14.7901 18.0199 15.6001 18.1499 16.1801L18.8599 19.2501C19.4199 21.6801 18.1299 22.6201 15.9799 21.3501L12.9899 19.5801C12.4499 19.2601 11.5599 19.2601 11.0099 19.5801L8.01991 21.3501C5.87991 22.6201 4.57991 21.6701 5.13991 19.2501L5.84991 16.1801C5.97991 15.6001 5.74991 14.7901 5.32991 14.3701L2.84991 11.8901C1.38991 10.4301 1.85991 8.95014 3.89991 8.61014L7.08991 8.08014C7.61991 7.99014 8.25991 7.52014 8.49991 7.03014L10.2599 3.51014C11.2199 1.60014 12.7799 1.60014 13.7299 3.51014Z"
      fill={fill}
    />
  </svg>
);

// 4. Like Icon (from Figma: vuesax/linear/like.svg & vuesax/bold/like.svg)
export interface LikeIconProps extends IconProps {
  variant?: 'linear' | 'bold';
}

export const LikeIcon: React.FC<LikeIconProps> = ({
  className = '',
  size = 20,
  variant = 'linear',
  color = '#141414',
}) => {
  if (variant === 'bold') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-hidden="true"
      >
        <path
          d="M8.39014 18.49V8.32998C8.39014 7.92998 8.51014 7.53998 8.73014 7.20998L11.4601 3.14998C11.8901 2.49998 12.9601 2.03998 13.8701 2.37998C14.8501 2.70998 15.5001 3.80997 15.2901 4.78997L14.7701 8.05998C14.7301 8.35998 14.8101 8.62998 14.9801 8.83998C15.1501 9.02998 15.4001 9.14997 15.6701 9.14997H19.7801C20.5701 9.14997 21.2501 9.46997 21.6501 10.03C22.0301 10.57 22.1001 11.27 21.8501 11.98L19.3901 19.47C19.0801 20.71 17.7301 21.72 16.3901 21.72H12.4901C11.8201 21.72 10.8801 21.49 10.4501 21.06L9.17014 20.07C8.68014 19.7 8.39014 19.11 8.39014 18.49Z"
          fill={color}
        />
        <path
          d="M5.21 6.37988H4.18C2.63 6.37988 2 6.97988 2 8.45988V18.5199C2 19.9999 2.63 20.5999 4.18 20.5999H5.21C6.76 20.5999 7.39 19.9999 7.39 18.5199V8.45988C7.39 6.97988 6.76 6.37988 5.21 6.37988Z"
          fill={color}
        />
      </svg>
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M7.47998 5.65003L10.58 3.25003C10.98 2.85003 11.88 2.65003 12.48 2.65003H16.28C17.48 2.65003 18.78 3.55003 19.08 4.75003L21.48 12.05C21.98 13.45 21.08 14.65 19.58 14.65H15.58C14.98 14.65 14.48 15.15 14.58 15.85L15.08 19.05C15.28 19.95 14.68 20.95 13.78 21.25C12.98 21.55 11.98 21.15 11.58 20.55L7.47998 14.45"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        stroke={color}
      />
      <path
        d="M2.37988 5.6501V15.4501C2.37988 16.8501 2.97988 17.3501 4.37988 17.3501H5.37988C6.77988 17.3501 7.37988 16.8501 7.37988 15.4501V5.6501C7.37988 4.2501 6.77988 3.7501 5.37988 3.7501H4.37988C2.97988 3.7501 2.37988 4.2501 2.37988 5.6501Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke={color}
      />
    </svg>
  );
};

// 5. Dislike Icon (Flipped 180deg Like Icon)
export const DislikeIcon: React.FC<LikeIconProps> = (props) => (
  <LikeIcon {...props} className={`${props.className || ''} rotate-180`} />
);

// 6. Figma Chevron Arrow (12x12)
export interface ChevronArrowIconProps extends IconProps {
  direction?: 'right' | 'left' | 'down' | 'up';
}

export const ChevronArrowIcon: React.FC<ChevronArrowIconProps> = ({
  className = '',
  size = 12,
  stroke = '#818B9C',
  direction = 'right',
}) => {
  const rotation = {
    right: '',
    left: 'rotate-180',
    down: 'rotate-90',
    up: '-rotate-90',
  }[direction];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${rotation} ${className} transition-transform inline-block`}
      aria-hidden="true"
    >
      <path
        d="M4.45508 9.96004L7.71508 6.70004C8.10008 6.31504 8.10008 5.68504 7.71508 5.30004L4.45508 2.04004"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke={stroke}
      />
    </svg>
  );
};

// 7. Figma Share Icon (20x20)
export const ShareIcon: React.FC<IconProps> = ({
  className = '',
  size = 20,
  stroke = 'currentColor',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M15 5.83337C15.6454 5.96719 16.1323 6.19053 16.5237 6.56328C17.5 7.49322 17.5 8.98996 17.5 11.9834C17.5 14.9768 17.5 16.4735 16.5237 17.4035C15.5474 18.3334 13.976 18.3334 10.8333 18.3334H9.16667C6.02397 18.3334 4.45262 18.3334 3.47631 17.4035C2.5 16.4735 2.5 14.9768 2.5 11.9834C2.5 8.98996 2.5 7.49322 3.47631 6.56328C3.86765 6.19053 4.35458 5.96719 5 5.83337"
      strokeWidth="1.25"
      strokeLinecap="round"
      stroke={stroke}
    />
    <path
      d="M10.0211 1.66706L10 11.6666M12.5 4.10735C12.5 4.10735 11.1276 2.45027 10.3723 1.81253C10.2635 1.7206 10.1426 1.6721 10.0211 1.66706C9.88558 1.66145 9.74925 1.70989 9.62775 1.8124C8.87242 2.45001 7.5 4.10735 7.5 4.10735"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      stroke={stroke}
    />
  </svg>
);

// 8. Social Icons for Footer
export const FacebookIcon: React.FC<IconProps> = ({
  size = 14,
  className = '',
  fill = '#141414',
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} className={className} aria-hidden="true">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

export const InstagramIcon: React.FC<IconProps> = ({
  size = 14,
  className = '',
  stroke = '#141414',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={stroke}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export const TwitterIcon: React.FC<IconProps> = ({
  size = 14,
  className = '',
  fill = '#141414',
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} className={className} aria-hidden="true">
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.936 9.936 0 0024 4.59z" />
  </svg>
);

export const MailIcon: React.FC<IconProps> = ({
  size = 14,
  className = '',
  stroke = '#141414',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={stroke}
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

// 9. Official Figma Shopping Cart / Basket Icon
export const CartIcon: React.FC<IconProps> = ({
  className = '',
  size = 20,
  stroke = '#141414',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M9.58317 6.66669H16.8298C17.3505 6.66669 17.6108 6.66669 17.8014 6.75072C18.6445 7.12244 18.2676 8.05898 18.1258 8.73202C18.1003 8.85294 18.0173 8.95585 17.9012 9.01102C17.4193 9.23969 17.0817 9.67344 16.9931 10.1779L16.4993 12.9899C16.282 14.2271 16.2078 15.9953 15.1235 16.8669C14.328 17.5 13.1818 17.5 10.8894 17.5H9.11026C6.81786 17.5 5.67167 17.5 4.87617 16.8669C3.79194 15.9952 3.71766 14.2271 3.50039 12.9899L3.00656 10.1779C2.91798 9.67344 2.58045 9.23969 2.09851 9.01102C1.98231 8.95585 1.89944 8.85294 1.87396 8.73202C1.73212 8.05898 1.35517 7.12244 2.19827 6.75072C2.38887 6.66669 2.64919 6.66669 3.16981 6.66669H6.24984"
      strokeWidth="1.5"
      strokeLinecap="round"
      stroke={stroke}
    />
    <path
      d="M11.6668 10H8.3335"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      stroke={stroke}
    />
    <path
      d="M5.4165 9.16667L8.33317 2.5M12.4998 2.5L14.5832 6.66667"
      strokeWidth="1.5"
      strokeLinecap="round"
      stroke={stroke}
    />
  </svg>
);

// 10. Official Figma Wishlist Heart Icon
export const WishlistIcon: React.FC<IconProps> = ({
  className = '',
  size = 20,
  stroke = '#141414',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M16.2188 3.32846C13.9841 1.95769 12.0337 2.51009 10.862 3.39001C10.3815 3.7508 10.1413 3.93119 10 3.93119C9.85867 3.93119 9.6185 3.7508 9.138 3.39001C7.96635 2.51009 6.01591 1.95769 3.7812 3.32846C0.848392 5.12745 0.184768 11.0624 6.94961 16.0695C8.2381 17.0232 8.88233 17.5 10 17.5C11.1177 17.5 11.7619 17.0232 13.0504 16.0695C19.8152 11.0624 19.1516 5.12745 16.2188 3.32846Z"
      strokeWidth="1.5"
      strokeLinecap="round"
      stroke={stroke}
    />
  </svg>
);

// 11. Official Figma 20x20 Chevron Down Icon for Navbar
export const NavChevronDownIcon: React.FC<IconProps> = ({
  className = '',
  size = 20,
  stroke = '#141414',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M5 8C5 8 8.68233 13 10 13C11.3176 13 15 8 15 8"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      stroke={stroke}
    />
  </svg>
);

// 12. Official Figma TickSquare Checkbox Icons
export const TickSquareIcon: React.FC<IconProps> = ({
  size = 20,
  stroke = '#C4C8CC',
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <rect
      x="1"
      y="1"
      width="18"
      height="18"
      rx="4.5"
      stroke={stroke}
      strokeWidth="1.5"
    />
  </svg>
);

export const TickSquareFilledIcon: React.FC<IconProps> = ({
  size = 20,
  color = '#141414',
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <rect width="20" height="20" rx="5" fill={color} />
    <path
      d="M5.5 10L8.5 13L14.5 7"
      stroke="white"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// 13. Official Figma Score Circle Arc Component
export const RatingScoreArc: React.FC<{
  score: number;
  maxScore?: number;
  size?: number;
  trackColor?: string;
  fillColor?: string;
}> = ({ score, maxScore = 5, size = 84, trackColor = '#E4E9EE', fillColor = '#292929' }) => {
  const radius = 37;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(1, Math.max(0, score / maxScore));
  const offset = circumference - progress * circumference;

  return (
    <div className="relative flex items-center justify-center shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 84 84" className="rotate-[-90deg]">
        <circle
          cx="42"
          cy="42"
          r={radius}
          fill="none"
          stroke={trackColor}
          strokeWidth={strokeWidth}
        />
        <circle
          cx="42"
          cy="42"
          r={radius}
          fill="none"
          stroke={fillColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-sans font-semibold text-[20px] text-[#0B0F0E]">
          {score.toFixed(1)}
        </span>
      </div>
    </div>
  );
};


