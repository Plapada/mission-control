'use client';

import { Bell, Search } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';

export function Header() {
  return (
    <header className="h-14 md:h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-6 sticky top-0 z-10">
      <div className="flex-1">
        {/* Search - hidden on small mobile */}
        <div className="hidden md:block relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <button className="relative p-2 hover:bg-slate-100 rounded-lg transition-colors">
          <Bell className="w-5 h-5 text-slate-600" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>
        
        <div className="flex items-center gap-2 md:gap-3 pl-2 md:pl-4 border-l border-slate-200">
          <div className="hidden md:block text-right">
            <p className="text-sm font-medium text-slate-700">Pedro</p>
            <p className="text-xs text-slate-500">CEO</p>
          </div>
          <Avatar fallback="P" size="sm" />
        </div>
      </div>
    </header>
  );
}
