import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Plus, CheckSquare, ChevronRight, Trash2, Calendar, User, FolderKanban } from 'lucide-react';
import { tasksApi, projectsApi } from '../services/api';
import AppLayout from '../components/layout/AppLayout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import Input, { Select, Textarea } from '../components/ui/Input';
import Badge from '../components/ui/Badge';
import { PageLoader } from '../components/ui/Spinner';
import EmptyState from '../components/ui/EmptyState';
import { useToast } from '../components/ui/Toast';
import { useNotifications } from '../context/NotificationContext';

const STATUS_CYCLE = { TODO: 'IN_PROGRESS', IN_PROGRESS: 'DONE', DONE: 'TODO' };
const STATUS_LABEL = { TODO: 'Mark In Progress', IN_PROGRESS: 'Mark Done', DONE: 'Reset to Todo' };

export default function TasksPage() {
  const [searchParams] = useSearchParams();
  const projectIdParam = searchParams.get('projectId');
  const projectNameParam = searchParams.get('projectName');

  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(projectIdParam || '');
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', deadline: '', status: 'TODO' });
  const toast = useToast();
  const { addNotification } = useNotifications();

  // Load projects for selector
  useEffect(() => {
    projectsApi.getAll()
      .then((res) => {
        setProjects(res.data);
        if (!selectedProjectId && !projectIdParam && res.data.length > 0) {
          setSelectedProjectId(String(res.data[0].id));
        } else if (projectIdParam) {
          setSelectedProjectId(projectIdParam);
        }
      })
      .catch(() => toast('Failed to load projects', 'error'));
  }, [projectIdParam, toast]);

  // Load tasks when project changes
  useEffect(() => {
    if (!selectedProjectId) return;
    setLoading(true);
    tasksApi.getByProject(selectedProjectId)
      .then((res) => setTasks(res.data))
      .catch(() => toast('Failed to load tasks', 'error'))
      .finally(() => setLoading(false));
  }, [selectedProjectId, toast]);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!selectedProjectId) return toast('Select a project first', 'warning');
    setSubmitting(true);
    try {
      await tasksApi.create({
        title: form.title,
        description: form.description,
        status: form.status,
        deadline: form.deadline || null,
        projectId: Number(selectedProjectId),
      });
      toast('Task created!', 'success');
      addNotification(`Task created: ${form.title}`);
      setModalOpen(false);
      setForm({ title: '', description: '', deadline: '', status: 'TODO' });
      const res = await tasksApi.getByProject(selectedProjectId);
      setTasks(res.data);
    } catch (err) {
      toast(err.response?.data?.message || 'Failed to create task', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleStatusUpdate = async (task) => {
    const nextStatus = STATUS_CYCLE[task.status] || 'TODO';
    try {
      await tasksApi.updateStatus(task.id, nextStatus);
      setTasks((prev) => prev.map((t) => t.id === task.id ? { ...t, status: nextStatus } : t));
      toast(`Status updated to ${nextStatus.replace('_', ' ')}`, 'success');
    } catch {
      toast('Failed to update status', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this task?')) return;
    try {
      await tasksApi.delete(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
      toast('Task deleted', 'success');
    } catch {
      toast('Failed to delete task', 'error');
    }
  };

  const selectedProject = projects.find((p) => String(p.id) === String(selectedProjectId));

  const grouped = {
    TODO: tasks.filter((t) => t.status === 'TODO'),
    IN_PROGRESS: tasks.filter((t) => t.status === 'IN_PROGRESS'),
    DONE: tasks.filter((t) => t.status === 'DONE'),
  };

  return (
    <AppLayout>
      {/* Project Selector + Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        <div className="flex items-center gap-3 flex-1">
          <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center shadow-md shadow-indigo-500/20">
            <FolderKanban size={16} className="text-white" />
          </div>
          <select
            value={selectedProjectId}
            onChange={(e) => setSelectedProjectId(e.target.value)}
            className="flex-1 max-w-xs px-3.5 py-2 rounded-xl text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all"
          >
            {projects.length === 0 && <option value="">No projects</option>}
            {projects.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>
        <Button icon={Plus} onClick={() => setModalOpen(true)} disabled={!selectedProjectId}>
          New Task
        </Button>
      </div>

      {/* Stats row */}
      {tasks.length > 0 && (
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: 'To Do', count: grouped.TODO.length, color: 'text-slate-600 dark:text-slate-400', bg: 'bg-slate-100 dark:bg-slate-700/50' },
            { label: 'In Progress', count: grouped.IN_PROGRESS.length, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-900/20' },
            { label: 'Done', count: grouped.DONE.length, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
          ].map(({ label, count, color, bg }) => (
            <div key={label} className={`${bg} rounded-2xl px-4 py-3 text-center`}>
              <p className={`text-2xl font-bold ${color}`}>{count}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      )}

      {loading ? (
        <PageLoader />
      ) : !selectedProjectId ? (
        <Card>
          <EmptyState icon={FolderKanban} title="No project selected" description="Select a project from the dropdown above" />
        </Card>
      ) : tasks.length === 0 ? (
        <Card>
          <EmptyState
            icon={CheckSquare}
            title="No tasks yet"
            description="Create your first task for this project."
            action={<Button icon={Plus} onClick={() => setModalOpen(true)}>Add Task</Button>}
          />
        </Card>
      ) : (
        /* Table */
        <Card padding={false}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-700">
                  <th className="text-left px-6 py-3.5 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Task</th>
                  <th className="text-left px-6 py-3.5 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="text-left px-6 py-3.5 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Deadline</th>
                  <th className="text-left px-6 py-3.5 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Assigned</th>
                  <th className="text-right px-6 py-3.5 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-700/50">
                {tasks.map((task) => (
                  <tr key={task.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/20 transition-colors group">
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{task.title}</p>
                        {task.description && (
                          <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 truncate max-w-xs">{task.description}</p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge status={task.status} />
                    </td>
                    <td className="px-6 py-4">
                      {task.deadline ? (
                        <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
                          <Calendar size={13} />
                          {task.deadline}
                        </div>
                      ) : (
                        <span className="text-sm text-slate-300 dark:text-slate-600">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {task.assignedTo ? (
                        <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
                          <User size={13} />
                          {task.assignedTo.name || task.assignedTo.email}
                        </div>
                      ) : (
                        <span className="text-sm text-slate-300 dark:text-slate-600">Unassigned</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleStatusUpdate(task)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-colors"
                        >
                          <ChevronRight size={12} />
                          {STATUS_LABEL[task.status]}
                        </button>
                        <button
                          onClick={() => handleDelete(task.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Create Task Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Create New Task">
        <form onSubmit={handleCreate} className="space-y-4">
          <Input
            label="Task title"
            placeholder="e.g. Design landing page"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
            autoFocus
          />
          <Textarea
            label="Description (optional)"
            placeholder="Add more details..."
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Status"
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              <option value="TODO">To Do</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="DONE">Done</option>
            </Select>
            <Input
              label="Deadline"
              type="date"
              value={form.deadline}
              onChange={(e) => setForm({ ...form, deadline: e.target.value })}
            />
          </div>
          <div className="flex gap-3 pt-1">
            <Button type="button" variant="secondary" className="flex-1" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="flex-1" loading={submitting}>
              Create Task
            </Button>
          </div>
        </form>
      </Modal>
    </AppLayout>
  );
}
