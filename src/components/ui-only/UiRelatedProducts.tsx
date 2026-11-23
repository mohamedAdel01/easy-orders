const CARDS = [
  {
    image: '/figma-assets/01c69624-8f62-4aeb-b912-56261c15890b.png',
    brand: 'Whistle',
    price: '$26',
    title: 'Wide Leg Cropped Jeans, Denim',
    rating: '4,8',
  },
  {
    image: '/figma-assets/419d6aad-65c5-4d90-a312-c88b0d6c688d.png',
    brand: 'Whistle',
    price: '$32',
    title: 'Wide Leg Cropped Jeans, Denim',
    rating: '4,8',
  },
  {
    image: '/figma-assets/048454ca-1053-4b21-8c7f-22c855f8f8ff.png',
    brand: 'Whistle',
    price: '$40',
    title: 'Wide Leg Cropped Jeans, Denim',
    rating: '4,8',
  },
  {
    image: '/figma-assets/f37e3ef8-06dd-417b-b634-c11e0300faec.png',
    brand: 'Whistle',
    price: '$79',
    title: 'Wide Leg Cropped Jeans, Denim',
    rating: '4,8',
  },
  {
    image: '/figma-assets/1cd25a4a-f20f-4ced-90e0-6edf9371674e.png',
    brand: 'Whistle',
    price: '$26',
    title: 'Wide Leg Cropped Jeans, Denim',
    rating: '4,8',
  },
];

export default function UiRelatedProducts() {
  return (
    <section className="max-w-[1200px] mx-auto px-4 lg:px-0 py-12 font-['Clash_Grotesk'] select-none">
      {/* Header (Figma node 57:1442) */}
      <div className="flex items-end justify-between mb-[24px]">
        <h2 className="font-semibold text-[28px] text-[#141414] leading-[1.2]">
          Related Product
        </h2>
        <a
          href="#view-all"
          className="font-medium text-[16px] text-[#525252] underline hover:text-[#141414] transition-colors"
        >
          View All
        </a>
      </div>

      {/* Row of 5 Cards (Figma node 57:1447: gap 35px, card 212px) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-[35px]">
        {CARDS.map((card, idx) => (
          <div key={idx} className="w-full lg:w-[212px] flex flex-col gap-[16px] group cursor-pointer">
            {/* Image: 212x284px, rounded-[8px], bg-[#F2F2F2] */}
            <div className="bg-[#F2F2F2] w-full lg:w-[212px] h-[260px] sm:h-[284px] rounded-[8px] overflow-hidden shrink-0">
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Info Block (Figma node 57:1451) */}
            <div className="flex flex-col gap-[8px] w-full">
              <div className="flex flex-col gap-[6px] w-full">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[18px] text-[#292929] leading-[1.4] tracking-[-0.2px]">
                    {card.brand}
                  </span>
                  <span className="font-semibold text-[20px] text-[#141414] leading-[1.4]">
                    {card.price}
                  </span>
                </div>
                <p className="font-normal text-[16px] text-[#7A7A7A] leading-[1.2] line-clamp-2">
                  {card.title}
                </p>
              </div>

              {/* Star + 4,8 */}
              <div className="flex items-center gap-[8px]">
                <img
                  src="/figma-assets/0f8facbc-1c04-4c1f-a8e7-6a3d896b9c3d.svg"
                  alt="Star"
                  className="size-[20px]"
                />
                <span className="font-normal text-[16px] text-[#0B0F0E] leading-[1.6]">
                  {card.rating}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
