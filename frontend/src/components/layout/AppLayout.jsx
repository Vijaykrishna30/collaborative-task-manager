import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const pageTitles = {
  '/dashboard': 'Dashboard',
  '/projects': 'Projects',
  '/tasks': 'Tasks',
  '/users': 'Users',
};

export default function AppLayout({ children }) {
  const { pathname } = useLocation();
  const title = pageTitles[pathname] || 'TaskFlow';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Sidebar />
      <div className="main-content flex flex-col min-h-screen">
        <Navbar title={title} />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
