'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase';
import { DollarSign, TrendingUp, Activity, Coins } from 'lucide-react';
import { Card } from '@/components/ui/Card';

export default function TokensPage() {
  const [stats, setStats] = useState<any>(null);
  const [usage, setUsage] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchData() {
      // Get token stats
      const { data: tokenData } = await supabase
        .from('token_usage')
        .select('*, agent:agents(*)');

      if (tokenData) {
        const totalSpend = tokenData.reduce((sum, t) => sum + t.cost, 0);
        const totalTokens = tokenData.reduce((sum, t) => sum + t.total_tokens, 0);
        
        setStats({
          totalSpend,
          monthlyBudget: 200,
          avgPerSession: totalSpend / (tokenData.length || 1),
          usagePercentage: (totalSpend / 200) * 100,
          totalTokens,
        });

        // Group by model
        const byModel: Record<string, { tokens: number; cost: number }> = {};
        tokenData.forEach(t => {
          if (!byModel[t.model]) byModel[t.model] = { tokens: 0, cost: 0 };
          byModel[t.model].tokens += t.total_tokens;
          byModel[t.model].cost += t.cost;
        });

        setUsage(Object.entries(byModel).map(([model, v]) => ({
          model,
          totalTokens: v.tokens,
          totalCost: v.cost,
        })));

        setTransactions(tokenData.slice(0, 20));
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  const formatCurrency = (v: number) => `$${v.toFixed(2)}`;
  const formatNumber = (v: number) => {
    if (v >= 1000000) return `${(v / 1000000).toFixed(1)}M`;
    if (v >= 1000) return `${(v / 1000).toFixed(1)}K`;
    return v.toString();
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
      <h1 className="text-2xl font-bold text-slate-800">💰 Token Spending</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-violet-100 rounded-xl">
              <DollarSign className="w-6 h-6 text-violet-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Total Spend</p>
              <p className="text-2xl font-bold text-slate-800">{formatCurrency(stats?.totalSpend || 0)}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-100 rounded-xl">
              <TrendingUp className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Monthly Budget</p>
              <p className="text-2xl font-bold text-slate-800">{formatCurrency(stats?.monthlyBudget || 0)}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-xl">
              <Activity className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Avg per Session</p>
              <p className="text-2xl font-bold text-slate-800">{formatCurrency(stats?.avgPerSession || 0)}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Usage by Model */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <h3 className="font-semibold text-slate-700 mb-4">Usage by Model</h3>
          <div className="space-y-3">
            {usage?.map((item: any) => (
              <div key={item.model} className="flex items-center justify-between">
                <span className="text-sm text-slate-600">{item.model}</span>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-slate-500">{formatNumber(item.totalTokens)} tokens</span>
                  <span className="text-sm font-medium text-emerald-600">{formatCurrency(item.totalCost)}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="font-semibold text-slate-700 mb-4">Budget Progress</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-600">Used</span>
                <span className="text-slate-800 font-medium">{formatCurrency(stats?.totalSpend || 0)}</span>
              </div>
              <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-violet-500 rounded-full"
                  style={{ width: `${Math.min(stats?.usagePercentage || 0, 100)}%` }}
                />
              </div>
              <p className="text-xs text-slate-500 mt-1">{stats?.usagePercentage?.toFixed(1)}% used</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Transactions */}
      <Card>
        <h3 className="font-semibold text-slate-700 mb-4">Recent Transactions</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500">Agent</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500">Model</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500">Tokens</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500">Cost</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-sm">
                        {tx.agent?.name?.charAt(0) || '?'}
                      </div>
                      <span className="text-sm text-slate-700">{tx.agent?.name || 'Unknown'}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">{tx.model}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">+{formatNumber(tx.total_tokens)}</td>
                  <td className="px-4 py-3 text-sm font-medium text-emerald-600">{formatCurrency(tx.cost)}</td>
                  <td className="px-4 py-3 text-xs text-slate-400">
                    {new Date(tx.timestamp).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
