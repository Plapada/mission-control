'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase';
import Link from 'next/link';
import { ListTodo, Users, Coins, Settings } from 'lucide-react';

const navItems = [
  { href: '/', label: 'Dashboard', icon: null },
  { href: '/tasks', label: 'Tasks', icon: ListTodo },
  { href: '/team', label: 'Team', icon: Users },
  { href: '/tokens', label: 'Tokens', icon: Coins },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export default function TasksPage() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchTasks() {
      const { data } = await supabase
        .from('tasks')
        .select('*, agent:agents(*)')
        .order('created_at', { ascending: false });
      if (data) setTasks(data);
      setLoading(false);
    }
    fetchTasks();
  }, []);

  const getPriorityColor = (p: string) => {
    const colors: Record<string, string> = {
      low: 'bg-slate-400',
      medium: 'bg-blue-500',
      high: 'bg-amber-500',
      urgent: 'bg-red-500',
    };
    return colors[p] || colors.medium;
  };

  const getStatusLabel = (s: string) => {
    const labels: Record<string, string> = {
      todo: 'To Do',
      in_progress: 'In Progress',
      review: 'Review',
      done: 'Done',
    };
    return labels[s] || s;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">📋 Tasks</h1>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors">
          + New Task
        </button>
      </div>

      <div className="grid gap-4">
        {tasks.map((task) => (
          <div key={task.id} className="glass-card p-4 flex items-center gap-4">
            <div className={`px-3 py-1 rounded-full text-white text-sm font-medium ${getPriorityColor(task.priority)}`}>
              {task.priority}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-slate-800">{task.title}</h3>
              {task.description && (
                <p className="text-sm text-slate-500 mt-1">{task.description}</p>
              )}
            </div>
            <div className="text-sm text-slate-500">{getStatusLabel(task.status)}</div>
            {task.agent && (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-sm font-medium">
                  {task.agent.name.charAt(0)}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
