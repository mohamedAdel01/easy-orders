export default function UiBreadcrumbs() {
  return (
    <nav
      aria-label="Breadcrumb"
      className="max-w-[1200px] mx-auto px-4 lg:px-0 pt-6 pb-6 select-none font-['Clash_Grotesk'] text-[16px] font-medium"
    >
      <div className="flex items-center gap-[8px] flex-wrap">
        <a href="#homepage" className="text-[#8F8F8F] hover:text-[#141414] transition-colors leading-[1.6]">
          Homepage
        </a>
        <div className="size-[12px] shrink-0 flex items-center justify-center">
          <img
            src="/figma-assets/breadcrumb-arrow.svg"
            alt=""
            className="size-[12px]"
          />
        </div>
        <a href="#women" className="text-[#8F8F8F] hover:text-[#141414] transition-colors leading-[1.6]">
          Women
        </a>
        <div className="size-[12px] shrink-0 flex items-center justify-center">
          <img
            src="/figma-assets/breadcrumb-arrow.svg"
            alt=""
            className="size-[12px]"
          />
        </div>
        <a href="#shirts" className="text-[#8F8F8F] hover:text-[#141414] transition-colors leading-[1.6]">
          Women's Shirts &amp; Tops
        </a>
        <div className="size-[12px] shrink-0 flex items-center justify-center">
          <img
            src="/figma-assets/breadcrumb-arrow.svg"
            alt=""
            className="size-[12px]"
          />
        </div>
        <span className="text-[#292929] leading-[1.6] font-medium">
          Long Sleeve Overshirt, Khaki, 6
        </span>
      </div>
    </nav>
  );
}
