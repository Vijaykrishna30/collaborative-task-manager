export default function Card({ children, className = '', hover = false, padding = true }) {
  return (
    <div
      className={`
        bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700
        shadow-sm dark:shadow-slate-900/20
        ${hover ? 'card-hover cursor-pointer' : ''}
        ${padding ? 'p-6' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export function CardHeader({ title, subtitle, action }) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100">{title}</h3>
        {subtitle && <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
