'use client';

import { TokenUsage } from '@/types';
import { Avatar } from '@/components/ui/Avatar';
import { formatRelativeTime, formatCurrency, formatNumber } from '@/lib/utils';

interface TransactionsTableProps {
  transactions: TokenUsage[];
}

export function TransactionsTable({ transactions }: TransactionsTableProps) {
  if (transactions.length === 0) {
    return (
      <div className="glass-card p-8 text-center">
        <p className="text-slate-400">No transactions yet</p>
      </div>
    );
  }

  return (
    <div className="glass-card overflow-hidden">
      <div className="p-4 border-b border-slate-100">
        <h3 className="font-semibold text-slate-700">Recent Transactions</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Agent
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Model
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Tokens
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Cost
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Time
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {transactions.map((tx) => (
              <tr key={tx.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Avatar 
                      fallback={tx.agent?.name?.charAt(0) || '?'} 
                      size="sm" 
                    />
                    <span className="text-sm font-medium text-slate-700">
                      {tx.agent?.name || 'Unknown'}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-slate-600">{tx.model}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-slate-600">
                    +{formatNumber(tx.total_tokens)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm font-medium text-emerald-600">
                    {formatCurrency(tx.cost)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-xs text-slate-400">
                    {formatRelativeTime(tx.timestamp)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
