import { useState, useEffect } from 'react';
import { Plus, FolderKanban, Trash2, ArrowRight, User } from 'lucide-react';
import { projectsApi } from '../services/api';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import Input from '../components/ui/Input';
import { PageLoader } from '../components/ui/Spinner';
import EmptyState from '../components/ui/EmptyState';
import { useToast } from '../components/ui/Toast';
import { useNotifications } from '../context/NotificationContext';

function ProjectCard({ project, onDelete, onClick }) {
  return (
    <div
      className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm p-5 card-hover cursor-pointer group"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-md shadow-indigo-500/20">
          <FolderKanban size={18} className="text-white" />
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(project.id); }}
          className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
        >
          <Trash2 size={14} />
        </button>
      </div>

      <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-1 truncate">{project.name}</h3>
      <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-4">
        <User size={12} />
        <span className="truncate">{project.createdBy?.name || project.createdBy?.email || 'Unknown'}</span>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-700">
        <span className="text-xs text-slate-400 dark:text-slate-500">View tasks</span>
        <ArrowRight size={14} className="text-indigo-500 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ name: '' });
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const { addNotification } = useNotifications();

  const fetchProjects = () => {
    setLoading(true);
    projectsApi.getAll()
      .then((res) => setProjects(res.data))
      .catch(() => toast('Failed to load projects', 'error'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchProjects(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    setSubmitting(true);
    try {
      await projectsApi.create({ name: form.name });
      toast('Project created!', 'success');
      addNotification(`Project created: ${form.name}`);
      setModalOpen(false);
      setForm({ name: '' });
      fetchProjects();
    } catch {
      toast('Failed to create project', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this project? All tasks will be removed.')) return;
    try {
      await projectsApi.delete(id);
      toast('Project deleted', 'success');
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch {
      toast('Failed to delete project', 'error');
    }
  };

  return (
    <AppLayout>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {projects.length} project{projects.length !== 1 ? 's' : ''} total
          </p>
        </div>
        <Button icon={Plus} onClick={() => setModalOpen(true)}>
          New Project
        </Button>
      </div>

      {loading ? (
        <PageLoader />
      ) : projects.length === 0 ? (
        <Card>
          <EmptyState
            icon={FolderKanban}
            title="No projects yet"
            description="Create your first project to start organizing tasks for your team."
            action={
              <Button icon={Plus} onClick={() => setModalOpen(true)}>
                Create Project
              </Button>
            }
          />
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onDelete={handleDelete}
              onClick={() => navigate(`/tasks?projectId=${project.id}&projectName=${encodeURIComponent(project.name)}`)}
            />
          ))}
        </div>
      )}

      {/* Create Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Create New Project">
        <form onSubmit={handleCreate} className="space-y-5">
          <Input
            label="Project name"
            placeholder="e.g. Website Redesign"
            value={form.name}
            onChange={(e) => setForm({ name: e.target.value })}
            required
            autoFocus
          />
          <div className="flex gap-3 pt-1">
            <Button type="button" variant="secondary" className="flex-1" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="flex-1" loading={submitting}>
              Create Project
            </Button>
          </div>
        </form>
      </Modal>
    </AppLayout>
  );
}
