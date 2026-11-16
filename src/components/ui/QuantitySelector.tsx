import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  min?: number;
  max?: number;
  onChange: (quantity: number) => void;
}

export default function QuantitySelector({ quantity, min = 1, max = 99, onChange }: QuantitySelectorProps) {
  return (
    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden w-fit">
      <button
        onClick={() => onChange(Math.max(min, quantity - 1))}
        disabled={quantity <= min}
        className="p-2 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        aria-label="Decrease quantity"
      >
        <Minus size={16} />
      </button>
      <span className="px-4 py-2 text-sm font-medium min-w-[48px] text-center border-x border-gray-300">
        {quantity}
      </span>
      <button
        onClick={() => onChange(Math.min(max, quantity + 1))}
        disabled={quantity >= max}
        className="p-2 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        aria-label="Increase quantity"
      >
        <Plus size={16} />
      </button>
    </div>
  );
}
