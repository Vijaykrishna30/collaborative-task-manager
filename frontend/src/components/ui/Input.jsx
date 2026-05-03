export default function Input({ label, error, className = '', ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
        </label>
      )}
      <input
        className={`
          w-full px-3.5 py-2.5 rounded-xl text-sm
          bg-slate-50 dark:bg-slate-900/50
          border ${error ? 'border-red-400' : 'border-slate-200 dark:border-slate-700'}
          text-slate-800 dark:text-slate-100
          placeholder:text-slate-400 dark:placeholder:text-slate-500
          focus:outline-none focus:ring-2 ${error ? 'focus:ring-red-400/30' : 'focus:ring-indigo-500/30'} focus:border-indigo-400
          transition-all duration-200
          ${className}
        `}
        {...props}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

export function Select({ label, error, children, className = '', ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
        </label>
      )}
      <select
        className={`
          w-full px-3.5 py-2.5 rounded-xl text-sm
          bg-slate-50 dark:bg-slate-900/50
          border ${error ? 'border-red-400' : 'border-slate-200 dark:border-slate-700'}
          text-slate-800 dark:text-slate-100
          focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400
          transition-all duration-200
          ${className}
        `}
        {...props}
      >
        {children}
      </select>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

export function Textarea({ label, error, className = '', ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
        </label>
      )}
      <textarea
        rows={3}
        className={`
          w-full px-3.5 py-2.5 rounded-xl text-sm resize-none
          bg-slate-50 dark:bg-slate-900/50
          border ${error ? 'border-red-400' : 'border-slate-200 dark:border-slate-700'}
          text-slate-800 dark:text-slate-100
          placeholder:text-slate-400 dark:placeholder:text-slate-500
          focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400
          transition-all duration-200
          ${className}
        `}
        {...props}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
