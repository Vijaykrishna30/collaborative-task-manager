const variants = {
  primary: 'gradient-primary text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:opacity-90',
  secondary: 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700',
  danger: 'bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/25',
  ghost: 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800',
  success: 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-500/25',
};

const sizes = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-2.5 text-sm',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  loading = false,
  icon: Icon,
  ...props
}) {
  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2 font-medium rounded-xl
        transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]} ${sizes[size]} ${className}
      `}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : Icon ? (
        <Icon size={14} />
      ) : null}
      {children}
    </button>
  );
}
