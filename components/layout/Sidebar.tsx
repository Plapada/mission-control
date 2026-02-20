'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
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

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {/* Mobile Toggle Button - Fixed position */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2.5 bg-white rounded-lg shadow-md border border-slate-200 hover:bg-slate-50 transition-colors"
        aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <X className="w-5 h-5 text-slate-700" />
        ) : (
          <Menu className="w-5 h-5 text-slate-700" />
        )}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/60 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar - Always visible on lg, slide on mobile */}
      <aside className={`
        fixed top-0 left-0 h-full w-64 bg-white border-r border-slate-200 z-45
        transform transition-transform duration-200 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        {/* Header */}
        <div className="h-16 flex items-center gap-3 px-4 border-b border-slate-200">
          <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-violet-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <Rocket className="w-4 h-4 text-white" />
          </div>
          <div className="min-w-0">
            <h1 className="font-bold text-slate-800 text-sm truncate">Mission Control</h1>
            <p className="text-xs text-slate-500 truncate">Dashboard</p>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="p-3">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`
                      flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                      ${isActive 
                        ? 'bg-blue-500 text-white' 
                        : 'text-slate-600 hover:bg-slate-100'
                      }
                    `}
                  >
                    <item.icon className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-slate-200">
          <div className="bg-slate-50 rounded-lg p-3">
            <p className="text-xs text-slate-500 mb-1.5">System Status</p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full" />
              <span className="text-xs font-medium text-slate-700">Online</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
