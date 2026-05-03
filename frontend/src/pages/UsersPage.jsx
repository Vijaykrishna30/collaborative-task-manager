import { useState, useEffect } from 'react';
import { Plus, Users, Mail, Shield } from 'lucide-react';
import { usersApi } from '../services/api';
import AppLayout from '../components/layout/AppLayout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import Input from '../components/ui/Input';
import { PageLoader } from '../components/ui/Spinner';
import EmptyState from '../components/ui/EmptyState';
import { useToast } from '../components/ui/Toast';

function UserRow({ user, index }) {
  const colors = [
    'from-indigo-500 to-purple-500',
    'from-blue-500 to-cyan-500',
    'from-emerald-500 to-teal-500',
    'from-orange-500 to-amber-500',
    'from-pink-500 to-rose-500',
  ];
  const gradient = colors[index % colors.length];

  return (
    <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-700/20 transition-colors">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-sm font-bold shadow-sm`}>
            {user.name?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase() || '?'}
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{user.name || '—'}</p>
            <p className="text-xs text-slate-400 dark:text-slate-500">ID #{user.id}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-300">
          <Mail size={13} className="text-slate-400" />
          {user.email}
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-1.5">
          <Shield size={13} className={user.role === 'ADMIN' ? 'text-purple-500' : 'text-blue-500'} />
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
            user.role === 'ADMIN'
              ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400'
              : 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400'
          }`}>
            {user.role || 'MEMBER'}
          </span>
        </div>
      </td>
    </tr>
  );
}

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const toast = useToast();

  const fetchUsers = () => {
    setLoading(true);
    usersApi.getAll()
      .then((res) => setUsers(res.data))
      .catch(() => toast('Failed to load users', 'error'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await usersApi.create(form);
      toast('User created!', 'success');
      setModalOpen(false);
      setForm({ name: '', email: '', password: '' });
      fetchUsers();
    } catch (err) {
      toast(err.response?.data?.message || 'Failed to create user', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AppLayout>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {users.length} user{users.length !== 1 ? 's' : ''} registered
        </p>
        <Button icon={Plus} onClick={() => setModalOpen(true)}>
          Add User
        </Button>
      </div>

      {loading ? (
        <PageLoader />
      ) : users.length === 0 ? (
        <Card>
          <EmptyState
            icon={Users}
            title="No users yet"
            description="Add team members to collaborate on projects."
            action={<Button icon={Plus} onClick={() => setModalOpen(true)}>Add User</Button>}
          />
        </Card>
      ) : (
        <Card padding={false}>
          <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <Users size={15} className="text-white" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Team Members</h3>
              <p className="text-xs text-slate-400 dark:text-slate-500">{users.length} total</p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-700">
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">User</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Email</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-700/50">
                {users.map((user, i) => (
                  <UserRow key={user.id} user={user} index={i} />
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Create User Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Add New User">
        <form onSubmit={handleCreate} className="space-y-4">
          <Input
            label="Full name"
            placeholder="John Doe"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            autoFocus
          />
          <Input
            label="Email address"
            type="email"
            placeholder="john@company.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <Input
            label="Password"
            type="password"
            placeholder="Min. 6 characters"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
            minLength={6}
          />
          <div className="flex gap-3 pt-1">
            <Button type="button" variant="secondary" className="flex-1" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="flex-1" loading={submitting}>
              Add User
            </Button>
          </div>
        </form>
      </Modal>
    </AppLayout>
  );
}
