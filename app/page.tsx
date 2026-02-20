'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase';
import { KanbanBoard } from '@/components/kanban/KanbanBoard';
import { AgentList } from '@/components/agents/AgentList';
import { ActivityFeed } from '@/components/feed/ActivityFeed';
import { TokenStats } from '@/components/tokens/TokenStats';
import { TokenChart } from '@/components/tokens/TokenChart';
import { UsageChart } from '@/components/tokens/UsageChart';
import { TransactionsTable } from '@/components/tokens/TransactionsTable';
import { Task, Agent, ActivityLog, TokenUsage, TokenStats as TokenStatsType, TokenUsageByModel, MonthlyUsage } from '@/types';

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [tokenStats, setTokenStats] = useState<TokenStatsType>({
    totalSpend: 127.50,
    monthlyBudget: 200,
    avgPerSession: 2.35,
    usagePercentage: 63.7,
  });
  const [tokenByModel, setTokenByModel] = useState<TokenUsageByModel[]>([]);
  const [monthlyUsage, setMonthlyUsage] = useState<MonthlyUsage[]>([]);
  const [transactions, setTransactions] = useState<TokenUsage[]>([]);
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch agents
        const { data: agentsData } = await supabase
          .from('agents')
          .select('*')
          .order('name');
        
        if (agentsData) {
          // Remove duplicates
          const uniqueAgents = agentsData.filter((agent, index, self) => 
            index === self.findIndex((a) => a.name === agent.name)
          );
          setAgents(uniqueAgents);
        }

        // Fetch tasks
        const { data: tasksData } = await supabase
          .from('tasks')
          .select('*, agent:agents(*)')
          .order('created_at', { ascending: false });
        
        if (tasksData) setTasks(tasksData);

        // Fetch activities
        const { data: activitiesData } = await supabase
          .from('activity_logs')
          .select('*, agent:agents(*)')
          .order('timestamp', { ascending: false })
          .limit(100);
        
        if (activitiesData) setActivities(activitiesData);

        // Fetch token usage
        const { data: tokenData } = await supabase
          .from('token_usage')
          .select('*, agent:agents(*)')
          .order('timestamp', { ascending: false })
          .limit(20);
        
        if (tokenData) setTransactions(tokenData);

        // Calculate stats from token data
        if (tokenData && tokenData.length > 0) {
          const total = tokenData.reduce((sum, t) => sum + t.cost, 0);
          setTokenStats(prev => ({
            ...prev,
            totalSpend: total,
            usagePercentage: (total / prev.monthlyBudget) * 100,
          }));

          // Group by model
          const byModel: Record<string, { tokens: number; cost: number }> = {};
          tokenData.forEach(t => {
            if (!byModel[t.model]) byModel[t.model] = { tokens: 0, cost: 0 };
            byModel[t.model].tokens += t.total_tokens;
            byModel[t.model].cost += t.cost;
          });
          
          const totalTokens = Object.values(byModel).reduce((sum, v) => sum + v.tokens, 0);
          setTokenByModel(
            Object.entries(byModel).map(([model, v]) => ({
              model,
              totalTokens: v.tokens,
              totalCost: v.cost,
              percentage: totalTokens > 0 ? (v.tokens / totalTokens) * 100 : 0,
            }))
          );
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    // Realtime subscriptions
    const tasksChannel = supabase
      .channel('tasks')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tasks' }, (payload) => {
        if (payload.eventType === 'INSERT') {
          setTasks(prev => [payload.new as Task, ...prev]);
        } else if (payload.eventType === 'UPDATE') {
          setTasks(prev => prev.map(t => t.id === payload.new.id ? { ...t, ...payload.new } : t));
        }
      })
      .subscribe();

    const agentsChannel = supabase
      .channel('agents')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'agents' }, (payload) => {
        if (payload.eventType === 'UPDATE') {
          setAgents(prev => prev.map(a => a.id === payload.new.id ? { ...a, ...payload.new } : a));
        }
      })
      .subscribe();

    const logsChannel = supabase
      .channel('logs')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'activity_logs' }, (payload) => {
        setActivities(prev => [payload.new as ActivityLog, ...prev].slice(0, 100));
      })
      .subscribe();

    return () => {
      supabase.removeChannel(tasksChannel);
      supabase.removeChannel(agentsChannel);
      supabase.removeChannel(logsChannel);
    };
  }, []);

  const handleTaskMove = async (taskId: string, newStatus: string) => {
    await supabase
      .from('tasks')
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq('id', taskId);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-500">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Token Stats */}
      <section>
        <h2 className="text-lg font-semibold text-slate-700 mb-4">💰 Token Spending</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <TokenStats stats={tokenStats} />
        </div>
      </section>

      {/* Token Charts - Hidden on mobile */}
      <section className="hidden lg:grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TokenChart data={tokenByModel} />
        <UsageChart data={monthlyUsage} />
      </section>

      {/* Kanban Board */}
      <section>
        <h2 className="text-lg font-semibold text-slate-700 mb-4">📋 Tasks</h2>
        <div className="overflow-x-auto -mx-4 px-4">
          <KanbanBoard initialTasks={tasks} onTaskMove={handleTaskMove} />
        </div>
      </section>

      {/* Agents & Activity */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-semibold text-slate-700 mb-4">🤖 Team</h2>
          <AgentList agents={agents} />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-slate-700 mb-4">📡 Activity Feed</h2>
          <ActivityFeed activities={activities} />
        </div>
      </section>

      {/* Transactions - Hidden on mobile */}
      <section className="hidden lg:block">
        <h2 className="text-lg font-semibold text-slate-700 mb-4">💳 Recent Transactions</h2>
        <TransactionsTable transactions={transactions} />
      </section>
    </div>
  );
}
