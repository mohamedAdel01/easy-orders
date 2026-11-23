import { useState, useMemo, useCallback } from 'react';
import { StarIcon, LikeIcon, DislikeIcon, ChevronArrowIcon, TickSquareIcon, TickSquareFilledIcon, RatingScoreArc } from '../icons';
import type { Review } from '../../types';
import { FIGMA_REVIEWS } from '../../utils/mockData';
import { useI18n } from '../../hooks/useI18n';

interface ReviewsSectionProps {
  reviews?: Review[];
}

const REVIEWS_PER_PAGE = 4;

export default function ReviewsSection({ reviews: propReviews = [] }: ReviewsSectionProps) {
  const reviews = propReviews && propReviews.length > 0 ? propReviews : FIGMA_REVIEWS;
  const { t, isRtl } = useI18n();

  const [activeTab, setActiveTab] = useState<'all' | 'photo' | 'description'>('all');
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [ratingOpen, setRatingOpen] = useState(true);
  const [topicsOpen, setTopicsOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const avgRating = 4.5;

  const RATING_TOPICS = [
    { name: 'Product Quality', count: t('125k Reviews') },
    { name: 'Seller Services', count: null },
    { name: 'Product Price', count: t('4 Reviews') },
    { name: 'Shipment', count: null },
    { name: 'Match with Description', count: null },
  ];

  const distribution = [
    { star: '5.0', count: '2823', pct: 84 },
    { star: '4.0', count: '38', pct: 47 },
    { star: '3.0', count: '4', pct: 15 },
    { star: '2.0', count: '0', pct: 0 },
    { star: '1.0', count: '0', pct: 0 },
  ];

  const filtered = useMemo(() => {
    return reviews.filter((r) => {
      if (selectedRatings.length > 0 && !selectedRatings.includes(Math.floor(r.rating))) return false;
      return true;
    });
  }, [reviews, selectedRatings]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / REVIEWS_PER_PAGE));
  const paginated = useMemo(() => {
    return filtered.slice((currentPage - 1) * REVIEWS_PER_PAGE, currentPage * REVIEWS_PER_PAGE);
  }, [filtered, currentPage]);

  const toggleRating = useCallback((star: number) => {
    setSelectedRatings((prev) =>
      prev.includes(star) ? prev.filter((s) => s !== star) : [...prev, star]
    );
    setCurrentPage(1);
  }, []);

  const toggleTopic = (topic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
    setCurrentPage(1);
  };

  return (
    <section className="max-w-[1200px] mx-auto px-4 lg:px-0 py-14 font-sans select-none">
      <h2 className="font-sans font-semibold text-[28px] text-[#141414] leading-[1.2] mb-6 tracking-tight">
        {t('Product Reviews')}
      </h2>

      {/* Top Rating Summary Card: Dashed Border matching Figma node 57:1638 */}
      <div className="border border-dashed border-[#B8B8B8] rounded-[8px] p-6 lg:p-[24px] mb-10 bg-white grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Overall Score Circle & Star Summary */}
        <div className="lg:col-span-4 flex items-center gap-[16px] justify-center lg:justify-start">
          <RatingScoreArc score={avgRating} size={84} trackColor="#E4E9EE" fillColor="#292929" />

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <StarIcon key={s} size={20} fill="#FFA439" />
              ))}
            </div>
            <p className="font-sans font-normal text-[16px] text-[#525252] leading-[1.6]">
              {t('from 1,25k reviews')}
            </p>
          </div>
        </div>

        {/* Right: Star Distribution Horizontal Bars (Figma node 57:1652) */}
        <div className="lg:col-span-8 space-y-3">
          {distribution.map(({ star, count, pct }) => (
            <div key={star} className="flex items-center gap-3 text-[16px]">
              <div className="flex items-center gap-1 w-12 shrink-0">
                <span className="font-sans font-medium text-[#0B0F0E]">{star}</span>
                <StarIcon size={16} fill="#FFA439" className="shrink-0" />
              </div>
              <div className="flex-1 bg-[#E4E9EE] rounded-[8px] h-[8px] overflow-hidden">
                <div
                  className="bg-[#292929] h-[8px] rounded-[8px] transition-all duration-300"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="w-12 text-end font-sans font-normal text-[#818B9C]">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Two Columns: Sidebar Filter + Review Lists */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-[32px] items-start w-full">
        {/* LEFT SIDEBAR: Reviews Filter (Figma node 57:1531: 278px wide, dashed border #BBB, rounded-[8px]) */}
        <aside className="w-full lg:w-[278px] border border-dashed border-[#BBBBBB] rounded-[8px] p-[24px] bg-white space-y-6 shrink-0">
          <h3 className="font-sans font-semibold text-[20px] text-[#292929] tracking-[-0.2px]">
            {t('Reviews Filter')}
          </h3>

          {/* Rating Section */}
          <div className="border-b border-gray-100 pb-5">
            <button
              onClick={() => setRatingOpen(!ratingOpen)}
              className="flex items-center justify-between w-full text-[14px] font-sans font-semibold text-[#292929] uppercase tracking-wider mb-3 cursor-pointer"
            >
              <span>{t('Rating')}</span>
              <ChevronArrowIcon direction={ratingOpen ? 'up' : 'down'} size={12} stroke="#6B7280" />
            </button>

            {ratingOpen && (
              <div className="space-y-3">
                {[5, 4, 3, 2, 1].map((star) => {
                  const isChecked = selectedRatings.includes(star);
                  return (
                    <div
                      key={star}
                      onClick={() => toggleRating(star)}
                      className="flex items-center gap-2.5 text-[16px] text-gray-700 cursor-pointer select-none"
                    >
                      {isChecked ? (
                        <TickSquareFilledIcon size={20} color="#141414" />
                      ) : (
                        <TickSquareIcon size={20} stroke="#C4C8CC" />
                      )}
                      <div className="flex items-center gap-1.5">
                        <StarIcon size={18} fill="#FFA439" />
                        <span className="font-sans font-medium text-[#0B0F0E]">{star}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Review Topics Section */}
          <div>
            <button
              onClick={() => setTopicsOpen(!topicsOpen)}
              className="flex items-center justify-between w-full text-[14px] font-sans font-semibold text-[#292929] uppercase tracking-wider mb-3 cursor-pointer"
            >
              <span>{t('Review Topics')}</span>
              <ChevronArrowIcon direction={topicsOpen ? 'up' : 'down'} size={12} stroke="#6B7280" />
            </button>

            {topicsOpen && (
              <div className="space-y-3">
                {RATING_TOPICS.map((topic) => {
                  const isChecked = selectedTopics.includes(topic.name);
                  return (
                    <div
                      key={topic.name}
                      onClick={() => toggleTopic(topic.name)}
                      className="flex items-start gap-2.5 text-[15px] cursor-pointer select-none"
                    >
                      <div className="mt-0.5 shrink-0">
                        {isChecked ? (
                          <TickSquareFilledIcon size={20} color="#141414" />
                        ) : (
                          <TickSquareIcon size={20} stroke="#C4C8CC" />
                        )}
                      </div>
                      <div>
                        <div className="font-sans font-medium text-[#0B0F0E]">{t(topic.name)}</div>
                        {topic.count && (
                          <div className="font-sans text-[12px] text-[#818B9C] mt-0.5">{topic.count}</div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </aside>

        {/* RIGHT AREA: Review Lists (Figma node 79:669) */}
        <div className="flex-1 w-full">
          {/* Header & Filter Tabs */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-100">
            <h4 className="font-sans font-semibold text-[20px] text-[#292929]">{t('Review Lists')}</h4>

            <div className="flex items-center gap-2 flex-wrap">
              {[
                { key: 'all', label: 'All Reviews' },
                { key: 'photo', label: 'With Photo & Video' },
                { key: 'description', label: 'With Description' },
              ].map(({ key, label }) => {
                const isActive = activeTab === key;
                return (
                  <button
                    key={key}
                    onClick={() => {
                      setActiveTab(key as typeof activeTab);
                      setCurrentPage(1);
                    }}
                    className={`px-4 py-2 rounded-[8px] text-[14px] font-sans font-medium transition-colors cursor-pointer border ${
                      isActive
                        ? 'bg-[#EBEBEB] text-[#141414] border-[#333333]'
                        : 'bg-white text-[#666666] border-[#E6E6E6] hover:border-gray-400'
                    }`}
                  >
                    {t(label)}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Reviews List with dashed separators matching Figma */}
          <div className="divide-y divide-dashed divide-[#E6E6E6]">
            {paginated.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>

          {/* Pagination (Figma: 44x44px rounded-[8px] buttons) */}
          <div className="flex items-center justify-center gap-2 mt-10 pt-6 border-t border-gray-100">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-[44px] h-[44px] rounded-[8px] border border-[#E6E6E6] flex items-center justify-center text-[#141414] hover:border-black disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
              aria-label={t('Previous page')}
            >
              <ChevronArrowIcon direction={isRtl ? 'right' : 'left'} size={14} stroke="#141414" />
            </button>

            <button
              onClick={() => setCurrentPage(1)}
              className={`w-[44px] h-[44px] rounded-[8px] text-[16px] font-sans font-semibold flex items-center justify-center transition-colors border cursor-pointer ${
                currentPage === 1
                  ? 'border-[#141414] bg-[#141414] text-white'
                  : 'border-[#E6E6E6] bg-white text-[#525252] hover:border-gray-400'
              }`}
            >
              1
            </button>

            <button
              onClick={() => setCurrentPage(2)}
              className={`w-[44px] h-[44px] rounded-[8px] text-[16px] font-sans font-semibold flex items-center justify-center transition-colors border cursor-pointer ${
                currentPage === 2
                  ? 'border-[#141414] bg-[#141414] text-white'
                  : 'border-[#E6E6E6] bg-white text-[#525252] hover:border-gray-400'
              }`}
            >
              2
            </button>

            <span className="w-[44px] h-[44px] flex items-center justify-center text-[16px] text-gray-400">...</span>

            <button
              onClick={() => setCurrentPage(10)}
              className="w-[44px] h-[44px] rounded-[8px] text-[16px] font-sans font-semibold flex items-center justify-center transition-colors border border-[#E6E6E6] bg-white text-[#525252] hover:border-gray-400 cursor-pointer"
            >
              10
            </button>

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="w-[44px] h-[44px] rounded-[8px] border border-[#E6E6E6] flex items-center justify-center text-[#141414] hover:border-black disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
              aria-label={t('Next page')}
            >
              <ChevronArrowIcon direction={isRtl ? 'left' : 'right'} size={14} stroke="#141414" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const { t } = useI18n();
  const [likes, setLikes] = useState(123);
  const [dislikes, setDislikes] = useState(0);
  const [userVoted, setUserVoted] = useState<'like' | 'dislike' | null>(null);

  const handleVote = (type: 'like' | 'dislike') => {
    if (userVoted === type) {
      setUserVoted(null);
      if (type === 'like') setLikes((l) => l - 1);
      else setDislikes((d) => d - 1);
    } else {
      if (userVoted === 'like') setLikes((l) => l - 1);
      if (userVoted === 'dislike') setDislikes((d) => d - 1);
      setUserVoted(type);
      if (type === 'like') setLikes((l) => l + 1);
      else setDislikes((d) => d + 1);
    }
  };

  const authorInitials = review.author
    ? review.author
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'U';

  return (
    <div className="py-6 first:pt-0 last:pb-0 font-sans">
      {/* 5 Stars (20x20 gold) */}
      <div className="flex items-center gap-1 text-amber-400 mb-2">
        {Array.from({ length: 5 }, (_, i) => (
          <StarIcon key={i} size={20} fill="#FFA439" />
        ))}
      </div>

      {/* Review Title: 18px Semibold #141414 */}
      <h5 className="font-sans font-semibold text-[18px] text-[#141414] tracking-[-0.2px] mb-1">
        {t('This is amazing product I have.')}
      </h5>

      {/* Date: 16px Regular #818B9C */}
      <p className="font-sans font-normal text-[16px] text-[#818B9C] mb-4">
        {new Date(review.created_at || '2020-07-02T15:29:00Z').toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })}
      </p>

      {/* Author and Like/Dislike footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-[32px] h-[32px] rounded-full bg-gradient-to-tr from-gray-700 to-gray-500 text-white flex items-center justify-center text-[12px] font-sans font-semibold shrink-0">
            {authorInitials}
          </div>
          <span className="font-sans font-medium text-[16px] text-[#0B0F0E]">
            {review.author || t('Customer')}
          </span>
        </div>

        {/* Upvote / Downvote actions in bordered pill (Figma node 57:1561) */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleVote('like')}
            className={`border border-[#E4E9EE] rounded-[8px] px-3.5 py-1.5 flex items-center gap-2 transition-all cursor-pointer ${
              userVoted === 'like' ? 'bg-gray-50 border-gray-400' : 'hover:border-gray-300'
            }`}
            aria-label="Helpful review"
          >
            <LikeIcon
              size={18}
              variant={userVoted === 'like' ? 'bold' : 'linear'}
              color={userVoted === 'like' ? '#141414' : '#6B7280'}
            />
            <span className="font-sans font-normal text-[14px] text-[#0B0F0E]">{likes}</span>
          </button>

          <button
            onClick={() => handleVote('dislike')}
            className={`border border-[#E4E9EE] rounded-[8px] px-3.5 py-1.5 flex items-center gap-2 transition-all cursor-pointer ${
              userVoted === 'dislike' ? 'bg-gray-50 border-gray-400' : 'hover:border-gray-300'
            }`}
            aria-label="Unhelpful review"
          >
            <DislikeIcon
              size={18}
              variant={userVoted === 'dislike' ? 'bold' : 'linear'}
              color={userVoted === 'dislike' ? '#141414' : '#6B7280'}
            />
            {dislikes > 0 && (
              <span className="font-sans font-normal text-[14px] text-[#0B0F0E]">{dislikes}</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
