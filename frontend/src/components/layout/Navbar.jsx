import { useState } from 'react';
import { Bell } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { useToast } from '../../components/ui/Toast';

export default function Navbar({ title }) {
  const { user } = useAuth();
  const toast = useToast();
  const { notifications, markAllRead } = useNotifications();
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const unreadCount = notifications.filter((notification) => !notification.read).length;

  const handleBellClick = () => {
    setNotificationsOpen((open) => !open);
    markAllRead();
    toast('Notification center opened', 'success');
  };

  return (
    <header className="h-16 flex items-center justify-between px-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 sticky top-0 z-30">
      {/* Page title */}
      <div>
        <h1 className="text-lg font-bold text-slate-800 dark:text-slate-100">{title}</h1>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2 relative">
        {/* Notification bell */}
        <div className="relative">
          <button
            type="button"
            onClick={handleBellClick}
            className="relative p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Notifications"
            aria-label="Notifications"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 min-w-[18px] h-4 px-1 text-[11px] font-semibold leading-none text-white bg-red-500 rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-72 rounded-2xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900 shadow-xl p-3 z-20">
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">Notifications</p>
              {notifications.length === 0 ? (
                <p className="text-sm text-slate-500 dark:text-slate-400">No notifications</p>
              ) : (
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3">
                      <p className="text-sm text-slate-700 dark:text-slate-200">{notification.message}</p>
                      <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{new Date(notification.createdAt).toLocaleTimeString()}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* User avatar */}
        <div className="flex items-center gap-2.5 pl-2 ml-1 border-l border-slate-200 dark:border-slate-700">
          <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-bold shadow">
            {user?.name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div className="hidden sm:block">
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-200 leading-none">
              {user?.name || 'User'}
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{user?.email}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
