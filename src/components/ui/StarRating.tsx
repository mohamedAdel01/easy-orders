import { memo } from 'react';
import { StarIcon } from '../icons';

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  size?: number;
  showCount?: boolean;
  count?: number;
}

function StarRating({ rating, maxStars = 5, size = 16, showCount = false, count }: StarRatingProps) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: maxStars }, (_, i) => (
        <StarIcon
          key={i}
          size={size}
          fill={i < Math.floor(rating) ? '#FFA439' : '#E5E7EB'}
        />
      ))}
      {showCount && count !== undefined && (
        <span className="text-sm text-gray-500 ms-1">({count})</span>
      )}
    </div>
  );
}

export default memo(StarRating);