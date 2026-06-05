/**
 * Reusable loading spinner with size variants.
 * Usage: <LoadingSpinner size="md" color="primary" fullScreen />
 */
const LoadingSpinner = ({ size = 'md', color = 'primary', fullScreen = false, label = '' }) => {
  const sizes = { sm: 'w-5 h-5 border-2', md: 'w-9 h-9 border-3', lg: 'w-14 h-14 border-4' };
  const colors = {
    primary: 'border-primary-200 border-t-primary-600',
    white: 'border-white/30 border-t-white',
    gray: 'border-gray-200 border-t-gray-500',
  };

  const spinner = (
    <div className="flex flex-col items-center gap-3">
      <div className={`${sizes[size]} ${colors[color]} rounded-full animate-spin`} />
      {label && <p className="text-sm text-gray-500 font-body">{label}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        {spinner}
      </div>
    );
  }

  return spinner;
};

export default LoadingSpinner;
