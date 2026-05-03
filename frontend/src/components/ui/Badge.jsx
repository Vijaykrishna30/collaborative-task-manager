const variants = {
  TODO: 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300',
  IN_PROGRESS: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400',
  DONE: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400',
  ADMIN: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400',
  MEMBER: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400',
  VIEWER: 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300',
  LOW: 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300',
  MEDIUM: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400',
  HIGH: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400',
};

const dots = {
  TODO: 'bg-slate-400',
  IN_PROGRESS: 'bg-amber-500',
  DONE: 'bg-emerald-500',
};

const labels = {
  TODO: 'To Do',
  IN_PROGRESS: 'In Progress',
  DONE: 'Done',
};

export default function Badge({ status, showDot = true }) {
  const cls = variants[status] || 'bg-slate-100 text-slate-600';
  const dot = dots[status];
  const label = labels[status] || status;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${cls}`}>
      {showDot && dot && <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />}
      {label}
    </span>
  );
}
