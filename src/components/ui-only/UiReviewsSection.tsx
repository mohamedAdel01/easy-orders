import { useState } from 'react';

const REVIEWS_DATA = [
  {
    id: 1,
    author: 'Darrell Steward',
    avatar: '/figma-assets/0be0644f-1aec-44b2-a8cb-1185fc81399c.png',
    date: 'July 2, 2020 03:29 PM',
    title: 'This is amazing product I have.',
    likes: 123,
  },
  {
    id: 2,
    author: 'Darlene Robertson',
    avatar: '/figma-assets/93f9845b-677e-473d-847a-98e24275cbd6.png',
    date: 'July 2, 2020 03:29 PM',
    title: 'This is amazing product I have.',
    likes: 123,
  },
  {
    id: 3,
    author: 'Kathryn Murphy',
    avatar: '/figma-assets/b29a5aa9-fa9d-48bb-a6ed-2f59a9b617cb.png',
    date: 'July 2, 2020 03:29 PM',
    title: 'This is amazing product I have.',
    likes: 123,
  },
  {
    id: 4,
    author: 'Ronald Richards',
    avatar: '/figma-assets/18ef8d6e-447c-4106-97ef-429c427fe26f.png',
    date: 'July 2, 2020 03:29 PM',
    title: 'This is amazing product I have.',
    likes: 123,
  },
];

const TOPICS = [
  { name: 'Product Quality', count: '125k Reviews' },
  { name: 'Seller Services', count: null },
  { name: 'Product Price', count: '4 Reviews' },
  { name: 'Shipment', count: null },
  { name: 'Match with Description', count: null },
];

export default function UiReviewsSection() {
  const [activeTab, setActiveTab] = useState<'all' | 'photo' | 'desc'>('all');
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [ratingOpen, setRatingOpen] = useState(true);
  const [topicsOpen, setTopicsOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const toggleRating = (r: number) => {
    setSelectedRatings((prev) =>
      prev.includes(r) ? prev.filter((x) => x !== r) : [...prev, r]
    );
  };

  const toggleTopic = (t: string) => {
    setSelectedTopics((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );
  };

  return (
    <section className="max-w-[1200px] mx-auto px-4 lg:px-0 py-14 font-['Clash_Grotesk'] select-none">
      {/* Section Title (Figma node 57:1637: 28px Semibold #141414) */}
      <h2 className="font-semibold text-[28px] text-[#141414] leading-[1.2] mb-[24px]">
        Product Reviews
      </h2>

      {/* Review Chart Container: 1200x226, border 0.8px dashed #B8B8B8, rounded-[8px] (Figma node 57:1638) */}
      <div className="border border-dashed border-[#B8B8B8] rounded-[8px] p-6 lg:p-[24px] mb-[32px] bg-white flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Left: Overall Score Circle & Star Summary */}
        <div className="flex items-center gap-[16px]">
          {/* Dual SVG Ellipse Circle (84x84px) */}
          <div className="relative size-[84px] shrink-0 flex items-center justify-center">
            <img
              src="/figma-assets/cd1c6800-dd95-459e-afe1-86a91f05c241.svg"
              alt=""
              className="absolute inset-0 size-full"
            />
            <img
              src="/figma-assets/8d05e04a-12b7-4da5-abf1-e63ece2921ad.svg"
              alt=""
              className="absolute inset-0 size-full"
            />
            <span className="font-semibold text-[20px] text-[#0B0F0E] relative z-10">
              4.5
            </span>
          </div>

          {/* Stars & Text */}
          <div className="flex flex-col gap-[8px]">
            <div className="flex items-center gap-[4px]">
              {[1, 2, 3, 4, 5].map((s) => (
                <img
                  key={s}
                  src="/figma-assets/e4926573-273e-4760-bac3-996725bba53c.svg"
                  alt="Star"
                  className="size-[20px]"
                />
              ))}
            </div>
            <p className="font-normal text-[16px] text-[#525252] leading-[1.6]">
              from 1,25k reviews
            </p>
          </div>
        </div>

        {/* Right: Star Distribution Bars (Figma node 57:1652: track 669px #E4E9EE, fill #292929) */}
        <div className="w-full lg:w-[804px] space-y-[12px]">
          {/* 5.0 */}
          <div className="flex items-center justify-between gap-3 text-[16px]">
            <div className="flex items-center gap-[4px] w-[50px] shrink-0">
              <span className="font-medium text-[#0B0F0E]">5.0</span>
              <img
                src="/figma-assets/e4926573-273e-4760-bac3-996725bba53c.svg"
                alt=""
                className="size-[20px]"
              />
            </div>
            <div className="flex-1 max-w-[669px] bg-[#E4E9EE] h-[8px] rounded-[8px] overflow-hidden">
              <div className="bg-[#292929] h-[8px] rounded-[8px] w-[84%]" />
            </div>
            <span className="w-[50px] text-right font-normal text-[#818B9C]">2823</span>
          </div>

          {/* 4.0 */}
          <div className="flex items-center justify-between gap-3 text-[16px]">
            <div className="flex items-center gap-[4px] w-[50px] shrink-0">
              <span className="font-medium text-[#0B0F0E]">4.0</span>
              <img
                src="/figma-assets/e4926573-273e-4760-bac3-996725bba53c.svg"
                alt=""
                className="size-[20px]"
              />
            </div>
            <div className="flex-1 max-w-[669px] bg-[#E4E9EE] h-[8px] rounded-[8px] overflow-hidden">
              <div className="bg-[#292929] h-[8px] rounded-[8px] w-[47%]" />
            </div>
            <span className="w-[50px] text-right font-normal text-[#818B9C]">38</span>
          </div>

          {/* 3.0 */}
          <div className="flex items-center justify-between gap-3 text-[16px]">
            <div className="flex items-center gap-[4px] w-[50px] shrink-0">
              <span className="font-medium text-[#0B0F0E]">3.0</span>
              <img
                src="/figma-assets/e4926573-273e-4760-bac3-996725bba53c.svg"
                alt=""
                className="size-[20px]"
              />
            </div>
            <div className="flex-1 max-w-[669px] bg-[#E4E9EE] h-[8px] rounded-[8px] overflow-hidden">
              <div className="bg-[#292929] h-[8px] rounded-[8px] w-[15%]" />
            </div>
            <span className="w-[50px] text-right font-normal text-[#818B9C]">4</span>
          </div>

          {/* 2.0 */}
          <div className="flex items-center justify-between gap-3 text-[16px]">
            <div className="flex items-center gap-[4px] w-[50px] shrink-0">
              <span className="font-medium text-[#0B0F0E]">2.0</span>
              <img
                src="/figma-assets/e4926573-273e-4760-bac3-996725bba53c.svg"
                alt=""
                className="size-[20px]"
              />
            </div>
            <div className="flex-1 max-w-[669px] bg-[#E4E9EE] h-[8px] rounded-[8px] overflow-hidden">
              <div className="bg-[#292929] h-[8px] rounded-[8px] w-0" />
            </div>
            <span className="w-[50px] text-right font-normal text-[#818B9C]">0</span>
          </div>

          {/* 1.0 */}
          <div className="flex items-center justify-between gap-3 text-[16px]">
            <div className="flex items-center gap-[4px] w-[50px] shrink-0">
              <span className="font-medium text-[#0B0F0E]">1.0</span>
              <img
                src="/figma-assets/e4926573-273e-4760-bac3-996725bba53c.svg"
                alt=""
                className="size-[20px]"
              />
            </div>
            <div className="flex-1 max-w-[669px] bg-[#E4E9EE] h-[8px] rounded-[8px] overflow-hidden">
              <div className="bg-[#292929] h-[8px] rounded-[8px] w-0" />
            </div>
            <span className="w-[50px] text-right font-normal text-[#818B9C]">0</span>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Sidebar Filter + Review Lists (Figma node 79:674) */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-[32px] items-start w-full">
        {/* Left: Reviews Filter (Figma node 57:1531: 278px wide, border 0.8px dashed #BBB, rounded-[8px]) */}
        <aside className="w-full lg:w-[278px] border border-dashed border-[#BBBBBB] rounded-[8px] p-[24px] bg-white space-y-6 shrink-0">
          <h3 className="font-semibold text-[20px] text-[#292929] tracking-[-0.2px]">
            Reviews Filter
          </h3>

          {/* Rating Section */}
          <div className="border-b border-gray-100 pb-5">
            <button
              type="button"
              onClick={() => setRatingOpen(!ratingOpen)}
              className="flex items-center justify-between w-full text-[14px] font-semibold text-[#292929] uppercase tracking-wider mb-3 cursor-pointer"
            >
              <span>Rating</span>
              <img
                src="/figma-assets/chevron-down.svg"
                alt=""
                className={`size-[16px] transition-transform duration-200 ${ratingOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {ratingOpen && (
              <div className="space-y-3">
                {[5, 4, 3, 2, 1].map((star) => {
                  const isChecked = selectedRatings.includes(star);
                  return (
                    <div
                      key={star}
                      onClick={() => toggleRating(star)}
                      className="flex items-center gap-[10px] text-[16px] text-gray-700 cursor-pointer select-none"
                    >
                      <div className="size-[20px] rounded-[5px] border border-[#C4C8CC] flex items-center justify-center shrink-0">
                        {isChecked && (
                          <div className="size-[12px] bg-[#141414] rounded-[2px]" />
                        )}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <img
                          src="/figma-assets/61fb16c0-31e8-4428-9380-003d8c1152f6.svg"
                          alt=""
                          className="size-[18px]"
                        />
                        <span className="font-medium text-[#0B0F0E]">{star}</span>
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
              type="button"
              onClick={() => setTopicsOpen(!topicsOpen)}
              className="flex items-center justify-between w-full text-[14px] font-semibold text-[#292929] uppercase tracking-wider mb-3 cursor-pointer"
            >
              <span>Review Topics</span>
              <img
                src="/figma-assets/chevron-down.svg"
                alt=""
                className={`size-[16px] transition-transform duration-200 ${topicsOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {topicsOpen && (
              <div className="space-y-3">
                {TOPICS.map((topic) => {
                  const isChecked = selectedTopics.includes(topic.name);
                  return (
                    <div
                      key={topic.name}
                      onClick={() => toggleTopic(topic.name)}
                      className="flex items-start gap-[10px] text-[15px] cursor-pointer select-none"
                    >
                      <div className="size-[20px] rounded-[5px] border border-[#C4C8CC] flex items-center justify-center shrink-0 mt-0.5">
                        {isChecked && (
                          <div className="size-[12px] bg-[#141414] rounded-[2px]" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-[#0B0F0E]">{topic.name}</div>
                        {topic.count && (
                          <div className="text-[12px] text-[#818B9C] mt-0.5">{topic.count}</div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </aside>

        {/* Right: Review Lists (Figma node 79:669) */}
        <div className="flex-1 w-full">
          {/* Header & Filter Tabs */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-100">
            <h4 className="font-semibold text-[20px] text-[#292929]">Review Lists</h4>

            {/* Filter Tabs: 42px tall, rounded-[8px] */}
            <div className="flex items-center gap-[8px] flex-wrap">
              {[
                { key: 'all', label: 'All Reviews' },
                { key: 'photo', label: 'With Photo & Video' },
                { key: 'desc', label: 'With Description' },
              ].map(({ key, label }) => {
                const isActive = activeTab === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActiveTab(key as typeof activeTab)}
                    className={`h-[42px] px-[16px] rounded-[8px] text-[14px] font-medium transition-all cursor-pointer border ${
                      isActive
                        ? 'bg-[#EBEBEB] text-[#141414] border-[#333333]'
                        : 'bg-white text-[#666666] border-[#E6E6E6] hover:border-gray-400'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Review Cards (4 exact reviews from Figma) */}
          <div className="divide-y divide-dashed divide-[#E6E6E6]">
            {REVIEWS_DATA.map((review) => (
              <div key={review.id} className="py-6 first:pt-0 last:pb-0">
                {/* 5 Stars */}
                <div className="flex items-center gap-[4px] mb-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <img
                      key={s}
                      src="/figma-assets/e4926573-273e-4760-bac3-996725bba53c.svg"
                      alt="Star"
                      className="size-[20px]"
                    />
                  ))}
                </div>

                {/* Review Title: 18px Semibold #141414 */}
                <h5 className="font-semibold text-[18px] text-[#141414] tracking-[-0.2px] mb-1">
                  {review.title}
                </h5>

                {/* Date: 16px Regular #818B9C */}
                <p className="font-normal text-[16px] text-[#818B9C] mb-4">
                  {review.date}
                </p>

                {/* Reviewer avatar, name, and like buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-[12px]">
                    <img
                      src={review.avatar}
                      alt={review.author}
                      className="size-[32px] rounded-full object-cover shrink-0"
                    />
                    <span className="font-medium text-[16px] text-[#0B0F0E]">
                      {review.author}
                    </span>
                  </div>

                  {/* Like & Dislike Bordered Box (Figma: 80x50 rounded-[8px] border #E4E9EE) */}
                  <div className="flex items-center gap-[12px]">
                    <button
                      type="button"
                      className="border border-[#E4E9EE] hover:border-gray-400 rounded-[8px] px-3.5 py-1.5 flex items-center gap-2 cursor-pointer transition-colors"
                      aria-label="Like"
                    >
                      <img
                        src="/figma-assets/2f1a41d6-5fb2-4fe4-ab6c-6dd5a1427d77.svg"
                        alt="Like"
                        className="size-[18px]"
                      />
                      <span className="font-normal text-[14px] text-[#0B0F0E]">
                        {review.likes}
                      </span>
                    </button>

                    <button
                      type="button"
                      className="border border-[#E4E9EE] hover:border-gray-400 rounded-[8px] px-3 py-1.5 flex items-center justify-center cursor-pointer transition-colors"
                      aria-label="Dislike"
                    >
                      <img
                        src="/figma-assets/c3d9fe16-bbfa-420c-a403-b6672be9b993.svg"
                        alt="Dislike"
                        className="size-[18px] -scale-y-100"
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination: 44x44px rounded-[8px] buttons (Figma node 57:1561) */}
          <div className="flex items-center justify-center gap-[8px] mt-10 pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="size-[44px] rounded-[8px] border border-[#E6E6E6] flex items-center justify-center text-[#141414] hover:border-black disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
              aria-label="Previous page"
            >
              <img
                src="/figma-assets/breadcrumb-arrow.svg"
                alt=""
                className="size-[12px] rotate-180"
              />
            </button>

            <button
              type="button"
              onClick={() => setCurrentPage(1)}
              className={`size-[44px] rounded-[8px] text-[16px] font-semibold flex items-center justify-center transition-colors cursor-pointer ${
                currentPage === 1
                  ? 'border border-[#141414] bg-[#141414] text-white'
                  : 'border border-[#E6E6E6] bg-white text-[#525252] hover:border-gray-400'
              }`}
            >
              1
            </button>

            <button
              type="button"
              onClick={() => setCurrentPage(2)}
              className={`size-[44px] rounded-[8px] text-[16px] font-semibold flex items-center justify-center transition-colors cursor-pointer ${
                currentPage === 2
                  ? 'border border-[#141414] bg-[#141414] text-white'
                  : 'border border-[#E6E6E6] bg-white text-[#525252] hover:border-gray-400'
              }`}
            >
              2
            </button>

            <span className="size-[44px] flex items-center justify-center text-[16px] text-gray-400">
              ...
            </span>

            <button
              type="button"
              onClick={() => setCurrentPage(10)}
              className="size-[44px] rounded-[8px] text-[16px] font-semibold flex items-center justify-center transition-colors border border-[#E6E6E6] bg-white text-[#525252] hover:border-gray-400 cursor-pointer"
            >
              10
            </button>

            <button
              type="button"
              onClick={() => setCurrentPage((p) => p + 1)}
              className="size-[44px] rounded-[8px] border border-[#E6E6E6] flex items-center justify-center text-[#141414] hover:border-black transition-colors cursor-pointer"
              aria-label="Next page"
            >
              <img
                src="/figma-assets/breadcrumb-arrow.svg"
                alt=""
                className="size-[12px]"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
