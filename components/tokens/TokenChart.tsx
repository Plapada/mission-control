'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card } from '@/components/ui/Card';
import { TokenUsageByModel } from '@/types';

interface TokenChartProps {
  data: TokenUsageByModel[];
}

const COLORS = ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981', '#94a3b8'];

export function TokenChart({ data }: TokenChartProps) {
  const chartData = data.map(item => ({
    name: item.model,
    value: item.totalTokens,
    cost: item.totalCost,
    percentage: item.percentage,
  }));

  return (
    <Card>
      <h3 className="font-semibold text-slate-700 mb-4">Spending by Model</h3>
      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={4}
              dataKey="value"
            >
              {chartData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: number, name: string, props: any) => [
                `${(props.payload.percentage).toFixed(1)}% - $${props.payload.cost.toFixed(2)}`,
                name
              ]}
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid rgba(226, 232, 240, 0.8)',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              }}
            />
            <Legend 
              formatter={(value, entry: any) => {
                const item = data.find(d => d.model === value);
                return `${value} (${item?.percentage.toFixed(0)}%)`;
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
