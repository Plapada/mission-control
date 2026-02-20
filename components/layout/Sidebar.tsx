'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  ListTodo, 
  Users, 
  Coins, 
  Settings,
  Rocket,
  Menu,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/tasks', label: 'Tasks', icon: ListTodo },
  { href: '/team', label: 'Team', icon: Users },
  { href: '/tokens', label: 'Tokens', icon: Coins },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {/* Mobile toggle button */}
      <button 
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg border border-slate-200"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-6 h-6 text-slate-700" /> : <Menu className="w-6 h-6 text-slate-700" />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
          style={{ backdropFilter: 'blur(4px)' }}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "w-64 glass-sidebar min-h-screen fixed left-0 top-0 flex flex-col z-45 transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="p-6 border-b border-slate-200/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-violet-500 rounded-xl flex items-center justify-center">
              <Rocket className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-slate-800">Mission Control</h1>
              <p className="text-xs text-slate-500">Dashboard</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200',
                      isActive
                        ? 'bg-blue-500 text-white shadow-md'
                        : 'text-slate-600 hover:bg-slate-100'
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-slate-200/60">
          <div className="glass rounded-xl p-4">
            <p className="text-xs text-slate-500 mb-2">System Status</p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-slate-700">All Systems Operational</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
