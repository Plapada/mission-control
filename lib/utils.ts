import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatRelativeTime(date: string | Date): string {
  const now = new Date();
  const then = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - then.getTime()) / 1000);

  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}min ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  
  return then.toLocaleDateString('pt-BR');
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}

export function formatNumber(value: number): string {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
  return value.toString();
}

export function getPriorityColor(priority: string): string {
  const colors: Record<string, string> = {
    low: 'bg-slate-400 text-white',
    medium: 'bg-blue-500 text-white',
    high: 'bg-amber-500 text-white',
    urgent: 'bg-red-500 text-white',
  };
  return colors[priority] || colors.medium;
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    sleeping: 'bg-slate-400 text-white',
    working: 'bg-emerald-500 text-white',
    blocked: 'bg-red-500 text-white',
    todo: 'bg-slate-400 text-white',
    in_progress: 'bg-blue-500 text-white',
    review: 'bg-amber-500 text-white',
    done: 'bg-emerald-500 text-white',
  };
  return colors[status] || colors.todo;
}

export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    sleeping: 'Sleeping 😴',
    working: 'Working ⚡',
    blocked: 'Blocked 🚫',
    todo: 'To Do',
    in_progress: 'In Progress',
    review: 'Review',
    done: 'Done',
  };
  return labels[status] || status;
}
