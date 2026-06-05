import LoadingSpinner from './LoadingSpinner';

/**
 * Reusable Button with variants, sizes, and loading state.
 */
const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  onClick,
  type = 'button',
  className = '',
}) => {
  const base =
    'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary:
      'bg-primary-600 hover:bg-primary-700 text-white shadow-lg shadow-primary-200/40 hover:shadow-primary-300/40 focus:ring-primary-500',
    secondary:
      'bg-white border-2 border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-400',
    danger:
      'bg-red-500 hover:bg-red-600 text-white shadow-sm focus:ring-red-400',
    ghost:
      'bg-transparent text-gray-600 hover:bg-gray-100 focus:ring-gray-300',
  };

  const sizes = {
    sm: 'text-xs px-3 py-2',
    md: 'text-sm px-5 py-3',
    lg: 'text-base px-8 py-4',
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {loading && <LoadingSpinner size="sm" color="white" />}
      {children}
    </button>
  );
};

export default Button;
