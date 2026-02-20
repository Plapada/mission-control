'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase';

export default function TeamPage() {
  const [agents, setAgents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchAgents() {
      const { data } = await supabase
        .from('agents')
        .select('*')
        .order('name');
      
      if (data) {
        // Remove duplicates by name
        const uniqueAgents = data.filter((agent, index, self) => 
          index === self.findIndex((a) => a.name === agent.name)
        );
        setAgents(uniqueAgents);
      }
      setLoading(false);
    }
    fetchAgents();
  }, []);

  const getStatusColor = (s: string) => {
    const colors: Record<string, string> = {
      sleeping: 'bg-slate-400',
      working: 'bg-emerald-500',
      blocked: 'bg-red-500',
    };
    return colors[s] || colors.sleeping;
  };

  const getStatusLabel = (s: string) => {
    const labels: Record<string, string> = {
      sleeping: '😴 Sleeping',
      working: '⚡ Working',
      blocked: '🚫 Blocked',
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
        <h1 className="text-2xl font-bold text-slate-800">🤖 Team</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {agents.map((agent) => (
          <div key={agent.id} className="glass-card p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-2xl font-bold text-white">
                  {agent.name.charAt(0)}
                </div>
                <span className={`absolute bottom-0 right-0 w-5 h-5 rounded-full border-3 border-white ${getStatusColor(agent.status)}`} />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="font-bold text-lg text-slate-800">{agent.name}</h3>
                <p className="text-sm text-slate-500">{agent.function}</p>
                <div className="mt-2">
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium text-white ${getStatusColor(agent.status)}`}>
                    {getStatusLabel(agent.status)}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100">
              <p className="text-xs text-slate-400 text-center sm:text-left">Thread ID: {agent.thread_id}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
