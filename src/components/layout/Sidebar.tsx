/**
 * Sidebar Navigation Component
 */

import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/use-auth';
import { cn } from '../../lib/utils';

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Reports', href: '/reports', icon: FileText },
];

export function Sidebar() {
  const location = useLocation();
  const { logout } = useAuth();

  return (
    <div className="flex h-screen w-64 flex-col bg-white border-r border-slate-200">
      {/* Logo */}
      <div className="flex h-16 items-center px-6 border-b border-slate-200">
        <h1 className="text-xl font-bold text-slate-900">
          JABB <span className="text-indigo-600">Business</span>
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* User section */}
      <div className="border-t border-slate-200 p-4">
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </div>
  );
}
