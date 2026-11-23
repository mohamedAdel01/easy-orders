import type { Variation } from '../../types';
import { useProductStore } from '../../store/productStore';
import { useI18n } from '../../hooks/useI18n';

interface VariationSelectorProps {
  variation: Variation;
}

const DEFAULT_COLOR_SWATCHES = [
  { name: 'Royal Brown', color: '#534029' },
  { name: 'Off White', color: '#EBEBEB' },
  { name: 'Slate Blue', color: '#3A6A90' },
  { name: 'Dark Navy', color: '#11171D' },
];

const COLOR_HEX_MAP: Record<string, string> = {
  brown: '#534029',
  'royal brown': '#534029',
  black: '#11171D',
  'dark navy': '#11171D',
  biege: '#d4c3b3',
  beige: '#d4c3b3',
  'off white': '#EBEBEB',
  'slate blue': '#3A6A90',
  white: '#ffffff',
  blue: '#3A6A90',
  navy: '#11171D',
  khaki: '#6b6644',
};

export default function VariationSelector({ variation }: VariationSelectorProps) {
  const { selectedVariations, setSelectedVariation, isCombinationAvailable } = useProductStore();
  const { t } = useI18n();
  const selected = selectedVariations[variation.name];

  const isColor =
    variation.name.toLowerCase().includes('color') ||
    variation.type === 'image' ||
    variation.type === 'color';
  const isSize =
    variation.name.toLowerCase().includes('size') ||
    variation.type === 'button';

  if (isColor) {
    const hasApiProps = variation.props && variation.props.length > 0;
    const defaultColor = hasApiProps ? variation.props[0].name : 'Royal Brown';
    const activeColor = selected || defaultColor;

    return (
      <div className="space-y-[18px]">
        {/* Color Label (Figma node 57:1387: 20px Medium & Semibold) */}
        <div className="text-[20px] font-sans leading-[1.2]">
          <span className="font-medium text-[#8F8F8F]">{t('Color:')} </span>
          <span className="font-semibold text-[#292929] capitalize">{t(activeColor)}</span>
        </div>

        {/* Swatches Row (Figma node 57:1388: 75x40px, rounded-[8px], 14px gap) */}
        <div className="flex items-center gap-[14px] flex-wrap">
          {hasApiProps
            ? variation.props.map((prop) => {
                const isSelected = activeColor.toLowerCase() === prop.name.toLowerCase();
                const fallbackColor = COLOR_HEX_MAP[prop.name.toLowerCase()] || '#534029';
                const isAvailable = isCombinationAvailable(variation.name, prop.name);

                return (
                  <button
                    key={prop.id || prop.name}
                    type="button"
                    disabled={!isAvailable}
                    onClick={() => setSelectedVariation(variation.name, prop.name)}
                    title={!isAvailable ? `${t(prop.name)} (${t('Out of Stock')})` : t(prop.name)}
                    className={`w-[75px] h-[40px] rounded-[8px] transition-all relative cursor-pointer overflow-hidden flex items-center justify-center ${
                      !isAvailable
                        ? 'opacity-30 cursor-not-allowed border border-gray-200'
                        : isSelected
                        ? 'bg-white border border-[#141414]'
                        : 'border border-transparent hover:opacity-90'
                    }`}
                    style={!isSelected ? { backgroundColor: fallbackColor } : undefined}
                  >
                    {isSelected ? (
                      <div
                        className="w-[63px] h-[28px] rounded-[6px]"
                        style={{ backgroundColor: fallbackColor }}
                      />
                    ) : null}
                    {prop.value && prop.value.startsWith('http') && (
                      <img
                        src={prop.value}
                        alt={prop.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    )}
                    {!isAvailable && (
                      <span className="absolute inset-0 flex items-center justify-center bg-white/40">
                        <span className="w-full h-0.5 bg-red-500 rotate-45 transform origin-center"></span>
                      </span>
                    )}
                  </button>
                );
              })
            : DEFAULT_COLOR_SWATCHES.map((swatch) => {
                const isSelected = activeColor.toLowerCase() === swatch.name.toLowerCase();
                const isAvailable = isCombinationAvailable(variation.name, swatch.name);

                return (
                  <button
                    key={swatch.name}
                    type="button"
                    disabled={!isAvailable}
                    onClick={() => setSelectedVariation(variation.name, swatch.name)}
                    title={!isAvailable ? `${t(swatch.name)} (${t('Out of Stock')})` : t(swatch.name)}
                    className={`w-[75px] h-[40px] rounded-[8px] transition-all relative cursor-pointer overflow-hidden flex items-center justify-center ${
                      !isAvailable
                        ? 'opacity-30 cursor-not-allowed border border-gray-200'
                        : isSelected
                        ? 'bg-white border border-[#141414]'
                        : 'border border-transparent hover:opacity-90'
                    }`}
                    style={!isSelected ? { backgroundColor: swatch.color } : undefined}
                  >
                    {isSelected && (
                      <div
                        className="w-[63px] h-[28px] rounded-[6px]"
                        style={{ backgroundColor: swatch.color }}
                      />
                    )}
                  </button>
                );
              })}
        </div>
      </div>
    );
  }

  if (isSize) {
    const hasApiProps = variation.props && variation.props.length > 0;
    const displaySizes = hasApiProps
      ? variation.props.map((p) => p.name)
      : ['6', '8', '10', '14', '18', '20'];
    const activeSize = selected || displaySizes[0];

    return (
      <div className="space-y-[18px]">
        {/* Size Label & "View Size Chart" Link (Figma node 57:1395) */}
        <div className="flex items-center justify-between text-[20px] font-sans leading-[1.2] w-full">
          <div>
            <span className="font-medium text-[#8F8F8F]">{t('Size:')} </span>
            <span className="font-semibold text-[#292929]">{activeSize}</span>
          </div>

          <button
            type="button"
            className="text-[16px] text-[#525252] underline hover:text-black font-sans font-medium transition-colors cursor-pointer"
            onClick={() => alert(t('Size Chart: Standard UK regular sizing'))}
          >
            {t('View Size Chart')}
          </button>
        </div>

        {/* Size Buttons Row (Figma node 57:1398: 75x40px, rounded-[8px], 14px gap) */}
        <div className="flex items-center gap-[14px] flex-wrap">
          {displaySizes.map((size) => {
            const isSelected = activeSize === size;
            const isAvailable = isCombinationAvailable(variation.name, size);

            return (
              <button
                key={size}
                type="button"
                disabled={!isAvailable}
                onClick={() => setSelectedVariation(variation.name, size)}
                title={!isAvailable ? `${size} (${t('Out of Stock')})` : undefined}
                className={`w-[75px] h-[40px] rounded-[8px] font-sans font-semibold text-[20px] leading-[1.2] transition-all flex items-center justify-center cursor-pointer ${
                  !isAvailable
                    ? 'bg-gray-50 text-gray-300 border border-gray-100 cursor-not-allowed line-through'
                    : isSelected
                    ? 'bg-[#EBEBEB] text-[#141414] border border-[#333333]'
                    : 'bg-white text-[#525252] border border-[#E6E6E6] hover:border-gray-400'
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return null;
}
