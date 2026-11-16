import { useState, useMemo, useCallback } from 'react';
import { StarIcon, LikeIcon, DislikeIcon, ChevronArrowIcon } from '../icons';
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
    { star: 5, count: 2823, pct: 90 },
    { star: 4, count: 38, pct: 52 },
    { star: 3, count: 4, pct: 12 },
    { star: 2, count: 0, pct: 0 },
    { star: 1, count: 0, pct: 0 },
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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-100">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-8 tracking-tight">
        {t('Product Reviews')}
      </h2>

      {/* Top Rating Summary Card: Enclosed with Dashed Border matching Figma */}
      <div className="border border-dashed border-gray-300 rounded-2xl p-6 sm:p-8 mb-10 bg-white grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        {/* Left: Overall Score Circle */}
        <div className="flex items-center gap-5 justify-center md:justify-start">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-amber-400 flex items-center justify-center flex-shrink-0">
            <span className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">{avgRating}</span>
          </div>

          <div>
            <div className="flex items-center gap-1 text-amber-400">
              {[1, 2, 3, 4, 5].map((s) => (
                <StarIcon key={s} size={15} fill="#FFA439" />
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-1">{t('from 125k reviews')}</p>
          </div>
        </div>

        {/* Right: Distribution Horizontal Bars */}
        <div className="col-span-1 md:col-span-2 space-y-2">
          {distribution.map(({ star, count, pct }) => (
            <div key={star} className="flex items-center gap-3 text-xs text-gray-600 font-medium">
              <span className="w-7 text-right font-mono">{star}.0</span>
              <StarIcon size={12} fill="#FFA439" className="flex-shrink-0" />
              <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-neutral-800 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="w-10 text-right text-gray-500 font-normal font-mono">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Two Columns: Sidebar Filter + Review Lists */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
        {/* LEFT SIDEBAR: Reviews Filter */}
        <aside className="border border-gray-200 rounded-xl p-5 bg-white space-y-6">
          <h3 className="text-xs sm:text-sm font-bold text-gray-900">{t('Reviews Filter')}</h3>

          {/* Rating Section */}
          <div className="border-b border-gray-100 pb-5">
            <button
              onClick={() => setRatingOpen(!ratingOpen)}
              className="flex items-center justify-between w-full text-xs font-semibold text-gray-800 uppercase tracking-wider mb-3"
            >
              <span>{t('Rating')}</span>
              <ChevronArrowIcon direction={ratingOpen ? 'up' : 'down'} size={11} stroke="#6B7280" />
            </button>

            {ratingOpen && (
              <div className="space-y-2.5">
                {[5, 4, 3, 2, 1].map((star) => (
                  <label key={star} className="flex items-center gap-2.5 text-xs text-gray-700 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={selectedRatings.includes(star)}
                      onChange={() => toggleRating(star)}
                      className="w-3.5 h-3.5 rounded border-gray-300 text-black focus:ring-0 cursor-pointer"
                    />
                    <div className="flex items-center gap-1 text-amber-400">
                      <StarIcon size={13} fill="#FFA439" />
                      <span className="text-gray-800 font-medium">{star}</span>
                    </div>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Review Topics Section */}
          <div>
            <button
              onClick={() => setTopicsOpen(!topicsOpen)}
              className="flex items-center justify-between w-full text-xs font-semibold text-gray-800 uppercase tracking-wider mb-3"
            >
              <span>{t('Review Topics')}</span>
              <ChevronArrowIcon direction={topicsOpen ? 'up' : 'down'} size={11} stroke="#6B7280" />
            </button>

            {topicsOpen && (
              <div className="space-y-3">
                {RATING_TOPICS.map((topic) => (
                  <label key={topic.name} className="flex items-start gap-2.5 text-xs text-gray-700 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={selectedTopics.includes(topic.name)}
                      onChange={() => toggleTopic(topic.name)}
                      className="w-3.5 h-3.5 mt-0.5 rounded border-gray-300 text-black focus:ring-0 cursor-pointer"
                    />
                    <div>
                      <div className="text-gray-800 font-medium">{t(topic.name)}</div>
                      {topic.count && <div className="text-[11px] text-gray-400 mt-0.5">{topic.count}</div>}
                    </div>
                  </label>
                ))}
              </div>
            )}
          </div>
        </aside>

        {/* RIGHT AREA: Review Lists */}
        <div className="md:col-span-3">
          {/* Header & Filter Tabs */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-100">
            <h4 className="text-xs sm:text-sm font-bold text-gray-900">{t('Review Lists')}</h4>

            <div className="flex items-center gap-2 flex-wrap">
              {[
                { key: 'all', label: 'All Reviews' },
                { key: 'photo', label: 'With Photo & Video' },
                { key: 'description', label: 'With Description' },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => {
                    setActiveTab(key as typeof activeTab);
                    setCurrentPage(1);
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors border ${
                    activeTab === key
                      ? 'bg-neutral-900 text-white border-neutral-900'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
                  }`}
                >
                  {t(label)}
                </button>
              ))}
            </div>
          </div>

          {/* Reviews List with dashed separators */}
          <div className="divide-y divide-dashed divide-gray-200">
            {paginated.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>

          {/* Pagination with directional arrows based on isRtl */}
          <div className="flex items-center justify-center gap-1.5 mt-10 pt-6 border-t border-gray-100">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-8 h-8 rounded border border-gray-200 flex items-center justify-center text-gray-600 hover:border-black disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label={t('Previous page')}
            >
              <ChevronArrowIcon direction={isRtl ? 'right' : 'left'} size={12} stroke="#141414" />
            </button>

            <button
              onClick={() => setCurrentPage(1)}
              className={`w-8 h-8 rounded text-xs font-semibold flex items-center justify-center transition-colors border ${
                currentPage === 1
                  ? 'border-black bg-black text-white'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-gray-400'
              }`}
            >
              1
            </button>

            <button
              onClick={() => setCurrentPage(2)}
              className={`w-8 h-8 rounded text-xs font-semibold flex items-center justify-center transition-colors border ${
                currentPage === 2
                  ? 'border-black bg-black text-white'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-gray-400'
              }`}
            >
              2
            </button>

            <span className="w-8 h-8 flex items-center justify-center text-xs text-gray-400">...</span>

            <button
              onClick={() => setCurrentPage(10)}
              className="w-8 h-8 rounded text-xs font-semibold flex items-center justify-center transition-colors border border-gray-200 bg-white text-gray-700 hover:border-gray-400"
            >
              10
            </button>

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="w-8 h-8 rounded border border-gray-200 flex items-center justify-center text-gray-600 hover:border-black disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label={t('Next page')}
            >
              <ChevronArrowIcon direction={isRtl ? 'left' : 'right'} size={12} stroke="#141414" />
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
    <div className="py-6 first:pt-0 last:pb-0">
      {/* 5 Stars */}
      <div className="flex items-center gap-1 text-amber-400 mb-2">
        {Array.from({ length: 5 }, (_, i) => (
          <StarIcon key={i} size={15} fill="#FFA439" />
        ))}
      </div>

      {/* Review Title */}
      <h5 className="text-xs sm:text-sm font-bold text-gray-900 mb-1">
        {t('This is amazing product I have.')}
      </h5>

      {/* Date */}
      <p className="text-[11px] text-gray-400 mb-3">
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
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-gray-700 to-gray-500 text-white flex items-center justify-center text-[10px] font-bold">
            {authorInitials}
          </div>
          <span className="text-xs font-semibold text-gray-800">{review.author || t('Customer')}</span>
        </div>

        {/* Upvote / Downvote actions using Figma Vuesax Like & Dislike Icons */}
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <button
            onClick={() => handleVote('like')}
            className={`flex items-center gap-1.5 transition-colors ${
              userVoted === 'like' ? 'text-black font-bold' : 'hover:text-black'
            }`}
            aria-label="Helpful review"
          >
            <LikeIcon
              size={16}
              variant={userVoted === 'like' ? 'bold' : 'linear'}
              color={userVoted === 'like' ? '#141414' : '#6B7280'}
            />
            <span>{likes}</span>
          </button>

          <button
            onClick={() => handleVote('dislike')}
            className={`flex items-center gap-1.5 transition-colors ${
              userVoted === 'dislike' ? 'text-black font-bold' : 'hover:text-black'
            }`}
            aria-label="Unhelpful review"
          >
            <DislikeIcon
              size={16}
              variant={userVoted === 'dislike' ? 'bold' : 'linear'}
              color={userVoted === 'dislike' ? '#141414' : '#6B7280'}
            />
            {dislikes > 0 && <span>{dislikes}</span>}
          </button>
        </div>
      </div>
    </div>
  );
}
