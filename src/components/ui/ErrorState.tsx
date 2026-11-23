interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
  onFallback?: () => void;
}

export default function ErrorState({ message, onRetry, onFallback }: ErrorStateProps) {
  const handleRetry = onRetry || (() => window.location.reload());

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 text-center select-none font-['Clash_Grotesk']">
      <div className="text-red-500 text-6xl mb-4">⚠️</div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">Something went wrong</h2>
      <p className="text-gray-500 mb-6">{message || 'Failed to load product. Please try again.'}</p>
      <div className="flex items-center justify-center gap-4 flex-wrap">
        <button
          onClick={handleRetry}
          className="px-6 py-3 bg-[#141414] text-white rounded-lg hover:bg-neutral-800 active:scale-95 transition-all cursor-pointer font-medium"
        >
          Try Again
        </button>
        {onFallback && (
          <button
            onClick={onFallback}
            className="px-6 py-3 bg-white border border-[#B8B8B8] text-[#333333] rounded-lg hover:bg-gray-50 active:scale-95 transition-all cursor-pointer font-medium"
          >
            View Demo Product
          </button>
        )}
      </div>
    </div>
  );
}
