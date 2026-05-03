import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, FolderKanban, CheckSquare, Users,
  LogOut, Zap, ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/projects', icon: FolderKanban, label: 'Projects' },
  { to: '/tasks', icon: CheckSquare, label: 'Tasks' },
  { to: '/users', icon: Users, label: 'Users' },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="sidebar-width fixed top-0 left-0 h-screen flex flex-col bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 z-40">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <Zap size={18} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-800 dark:text-slate-100 leading-none">TaskFlow</p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">Team Manager</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <p className="px-3 mb-2 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
          Menu
        </p>
        <ul className="space-y-1">
          {navItems.map(({ to, icon: Icon, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) => `
                  flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                  transition-all duration-200 group
                  ${isActive
                    ? 'gradient-primary text-white shadow-md shadow-indigo-500/20'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-200'
                  }
                `}
              >
                {({ isActive }) => (
                  <>
                    <Icon size={18} className={isActive ? 'text-white' : ''} />
                    <span className="flex-1">{label}</span>
                    {isActive && <ChevronRight size={14} className="text-white/70" />}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* User + Logout */}
      <div className="px-3 py-4 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 mb-2">
          <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-bold shadow">
            {user?.name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-200 truncate">
              {user?.name || 'User'}
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500 truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-500 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-all duration-200"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
