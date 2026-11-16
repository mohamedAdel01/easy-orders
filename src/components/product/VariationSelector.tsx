import type { Variation } from '../../types';
import { useProductStore } from '../../store/productStore';
import { useI18n } from '../../hooks/useI18n';

interface VariationSelectorProps {
  variation: Variation;
}

const DEFAULT_COLOR_SWATCHES = [
  { name: 'Royal Brown', color: '#56442b' },
  { name: 'Off White', color: '#eae8e4' },
  { name: 'Slate Blue', color: '#3b688c' },
  { name: 'Dark Navy', color: '#171e28' },
];

const COLOR_HEX_MAP: Record<string, string> = {
  brown: '#56442b',
  'royal brown': '#56442b',
  black: '#171e28',
  'dark navy': '#171e28',
  biege: '#d4c3b3',
  beige: '#d4c3b3',
  'off white': '#eae8e4',
  'slate blue': '#3b688c',
  white: '#ffffff',
  blue: '#2563eb',
  navy: '#171e28',
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
      <div className="space-y-2.5">
        {/* Color Label */}
        <div className="text-xs sm:text-sm">
          <span className="text-gray-400 font-normal">{t('Color:')} </span>
          <span className="font-bold text-gray-900 capitalize">{t(activeColor)}</span>
        </div>

        {/* Swatches Row matching Figma curves, padding and border styling */}
        <div className="flex items-center gap-3">
          {hasApiProps
            ? variation.props.map((prop) => {
                const isSelected = activeColor.toLowerCase() === prop.name.toLowerCase();
                const fallbackColor = COLOR_HEX_MAP[prop.name.toLowerCase()] || '#666';
                const isAvailable = isCombinationAvailable(variation.name, prop.name);

                return (
                  <button
                    key={prop.id || prop.name}
                    type="button"
                    disabled={!isAvailable}
                    onClick={() => setSelectedVariation(variation.name, prop.name)}
                    title={!isAvailable ? `${t(prop.name)} (${t('Out of Stock')})` : t(prop.name)}
                    className={`w-14 h-8 p-[2px] rounded-[10px] transition-all relative cursor-pointer ${
                      !isAvailable
                        ? 'opacity-30 cursor-not-allowed border border-gray-200'
                        : isSelected
                        ? 'border-2 border-black'
                        : 'border border-transparent hover:border-gray-300'
                    }`}
                  >
                    <div
                      className="w-full h-full rounded-[6px] overflow-hidden bg-gray-100 relative"
                      style={{ backgroundColor: fallbackColor }}
                    >
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
                    </div>
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
                    className={`w-14 h-8 p-[2px] rounded-[10px] transition-all relative cursor-pointer ${
                      !isAvailable
                        ? 'opacity-30 cursor-not-allowed border border-gray-200'
                        : isSelected
                        ? 'border-2 border-black'
                        : 'border border-transparent hover:border-gray-300'
                    }`}
                  >
                    <div
                      className="w-full h-full rounded-[6px] overflow-hidden"
                      style={{ backgroundColor: swatch.color }}
                    />
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
      <div className="space-y-2.5">
        {/* Size Label & "View Size Chart" Link matching Figma */}
        <div className="flex items-center justify-between text-xs sm:text-sm">
          <div>
            <span className="text-gray-400 font-normal">{t('Size:')} </span>
            <span className="font-bold text-gray-900">{activeSize}</span>
          </div>

          <button
            type="button"
            className="text-xs text-[#818B9C] underline hover:text-black font-normal transition-colors cursor-pointer"
            onClick={() => alert(t('Size Chart: Standard UK regular sizing'))}
          >
            {t('View Size Chart')}
          </button>
        </div>

        {/* Size Buttons Row with exact Figma curves & borders */}
        <div className="flex items-center gap-3 flex-wrap">
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
                className={`min-w-[54px] sm:min-w-[58px] h-11 sm:h-12 px-4 py-2.5 rounded-[10px] text-xs sm:text-sm font-semibold transition-all relative cursor-pointer ${
                  !isAvailable
                    ? 'bg-gray-50 text-gray-300 border border-gray-100 cursor-not-allowed line-through'
                    : isSelected
                    ? 'bg-[#EAEAEA] text-gray-900 border border-gray-400 font-bold shadow-none'
                    : 'bg-white text-gray-800 border border-[#E5E7EB] hover:border-gray-400'
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
