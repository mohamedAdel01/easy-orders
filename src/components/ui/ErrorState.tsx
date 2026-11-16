interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export default function ErrorState({ message, onRetry }: ErrorStateProps) {
  const handleRetry = onRetry || (() => window.location.reload());

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 text-center select-none">
      <div className="text-red-500 text-6xl mb-4">⚠️</div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">Something went wrong</h2>
      <p className="text-gray-500 mb-6">{message || 'Failed to load product. Please try again.'}</p>
      <button
        onClick={handleRetry}
        className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-700 active:scale-95 transition-all cursor-pointer font-medium"
      >
        Try Again
      </button>
    </div>
  );
}
