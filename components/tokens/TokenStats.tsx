'use client';

import { Coins, TrendingUp, DollarSign, Activity } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { TokenStats as TokenStatsType } from '@/types';
import { formatCurrency, formatNumber } from '@/lib/utils';

interface TokenStatsProps {
  stats: TokenStatsType;
}

export function TokenStats({ stats }: TokenStatsProps) {
  const budgetPercentage = (stats.totalSpend / stats.monthlyBudget) * 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Total Spend */}
      <Card className="relative overflow-hidden">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-slate-500 mb-1">Total Spend</p>
            <p className="text-3xl font-bold text-slate-800">
              {formatCurrency(stats.totalSpend)}
            </p>
          </div>
          <div className="p-3 bg-violet-100 rounded-xl">
            <DollarSign className="w-5 h-5 text" />
          -violet-600</div>
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Monthly Budget</span>
            <span>{formatCurrency(stats.monthlyBudget)}</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-violet-500 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(budgetPercentage, 100)}%` }}
            />
          </div>
        </div>
      </Card>

      {/* Monthly Budget */}
      <Card className="relative overflow-hidden">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-slate-500 mb-1">Monthly Budget</p>
            <p className="text-3xl font-bold text-slate-800">
              {formatCurrency(stats.monthlyBudget)}
            </p>
          </div>
          <div className="p-3 bg-emerald-100 rounded-xl">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm text-emerald-600 font-medium">
            {formatCurrency(stats.monthlyBudget - stats.totalSpend)} remaining
          </p>
        </div>
      </Card>

      {/* Avg per Session */}
      <Card className="relative overflow-hidden">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-slate-500 mb-1">Avg per Session</p>
            <p className="text-3xl font-bold text-slate-800">
              {formatCurrency(stats.avgPerSession)}
            </p>
          </div>
          <div className="p-3 bg-blue-100 rounded-xl">
            <Activity className="w-5 h-5 text-blue-600" />
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm text-slate-500">
            Based on {Math.round(stats.totalSpend / stats.avgPerSession)} sessions
          </p>
        </div>
      </Card>
    </div>
  );
}
