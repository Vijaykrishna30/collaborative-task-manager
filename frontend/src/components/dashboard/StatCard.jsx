export default function StatCard({ title, value, icon: Icon, gradient, change }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl p-6 text-white ${gradient} shadow-lg card-hover`}>
      {/* Background decoration */}
      <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-white/10" />
      <div className="absolute -right-2 -bottom-6 w-32 h-32 rounded-full bg-white/5" />

      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <Icon size={20} className="text-white" />
          </div>
          {change !== undefined && (
            <span className="text-xs font-medium bg-white/20 px-2 py-1 rounded-full">
              {change >= 0 ? '+' : ''}{change}%
            </span>
          )}
        </div>
        <p className="text-3xl font-bold mb-1">{value ?? '—'}</p>
        <p className="text-sm text-white/80 font-medium">{title}</p>
      </div>
    </div>
  );
}
