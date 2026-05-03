import { useState, useEffect } from 'react';
import { FolderKanban, CheckSquare, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { dashboardApi } from '../services/api';
import AppLayout from '../components/layout/AppLayout';
import StatCard from '../components/dashboard/StatCard';
import Card, { CardHeader } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { PageLoader } from '../components/ui/Spinner';
import EmptyState from '../components/ui/EmptyState';

const PIE_COLORS = ['#6366f1', '#f59e0b', '#10b981'];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 shadow-lg text-xs">
        <p className="font-semibold text-slate-700 dark:text-slate-200 mb-1">{label}</p>
        {payload.map((p) => (
          <p key={p.name} style={{ color: p.color }}>{p.name}: {p.value}</p>
        ))}
      </div>
    );
  }
  return null;
};

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    dashboardApi.get()
      .then((res) => setData(res.data))
      .catch(() => setError('Failed to load dashboard data'))
      .finally(() => setLoading(false));
  }, []);

  const pieData = data ? [
    { name: 'To Do', value: data.todoTasks || 0 },
    { name: 'In Progress', value: data.inProgressTasks || 0 },
    { name: 'Done', value: data.completedTasks || 0 },
  ] : [];

  const barData = data?.projectSummaries?.slice(0, 6).map((p) => ({
    name: p.name?.length > 12 ? p.name.slice(0, 12) + '…' : p.name,
    Total: p.totalTasks,
    Done: p.completedTasks,
  })) || [];

  return (
    <AppLayout>
      {loading ? (
        <PageLoader />
      ) : error ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-red-500 font-medium">{error}</p>
            <p className="text-sm text-slate-500 mt-1">Make sure the backend is running on port 8081</p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            <StatCard
              title="Total Projects"
              value={data?.totalProjects ?? 0}
              icon={FolderKanban}
              gradient="gradient-primary"
            />
            <StatCard
              title="Total Tasks"
              value={data?.totalTasks ?? 0}
              icon={CheckSquare}
              gradient="gradient-info"
            />
            <StatCard
              title="Completed"
              value={data?.completedTasks ?? 0}
              icon={CheckCircle}
              gradient="gradient-success"
            />
            <StatCard
              title="In Progress"
              value={data?.inProgressTasks ?? 0}
              icon={Clock}
              gradient="gradient-warning"
            />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
            {/* Bar Chart */}
            <Card className="xl:col-span-2">
              <CardHeader title="Tasks by Project" subtitle="Completed vs total tasks per project" />
              {barData.length === 0 ? (
                <EmptyState icon={TrendingUp} title="No project data yet" description="Create projects and tasks to see the chart" />
              ) : (
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={barData} barSize={10} barGap={4}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />
                    <Bar dataKey="Total" fill="#e0e7ff" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Done" fill="#6366f1" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </Card>

            {/* Pie Chart */}
            <Card>
              <CardHeader title="Task Status" subtitle="Distribution overview" />
              {pieData.every((d) => d.value === 0) ? (
                <EmptyState icon={CheckSquare} title="No tasks yet" description="Add tasks to see the breakdown" />
              ) : (
                <ResponsiveContainer width="100%" height={240}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="45%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {pieData.map((_, i) => (
                        <Cell key={i} fill={PIE_COLORS[i]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v, n) => [v, n]} />
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </Card>
          </div>

          {/* Recent Tasks */}
          <Card padding={false}>
            <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-700">
              <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100">Recent Tasks</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Latest activity across all projects</p>
            </div>
            {!data?.recentTasks?.length ? (
              <EmptyState icon={CheckSquare} title="No tasks yet" description="Tasks will appear here once created" />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-slate-700">
                      <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Task</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Project</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Deadline</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 dark:divide-slate-700/50">
                    {data.recentTasks.map((task) => (
                      <tr key={task.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/20 transition-colors">
                        <td className="px-6 py-4 text-sm font-medium text-slate-700 dark:text-slate-200">{task.title}</td>
                        <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">{task.projectName}</td>
                        <td className="px-6 py-4"><Badge status={task.status} /></td>
                        <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                          {task.deadline || '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </div>
      )}
    </AppLayout>
  );
}
