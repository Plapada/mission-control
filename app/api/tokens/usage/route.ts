import { NextResponse } from 'next/server';
import { getSupabaseClient } from '@/lib/supabase-server';

export async function GET() {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('token_usage')
      .select('*, agent:agents(*)')
      .order('timestamp', { ascending: false });

    if (error) throw error;

    const byModel: Record<string, { tokens: number; cost: number }> = {};
    const monthlyData: Record<string, number> = {};

    data?.forEach((t: any) => {
      if (!byModel[t.model]) byModel[t.model] = { tokens: 0, cost: 0 };
      byModel[t.model].tokens += t.total_tokens;
      byModel[t.model].cost += t.cost;

      const month = new Date(t.timestamp).toLocaleDateString('en-US', { month: 'short' });
      if (!monthlyData[month]) monthlyData[month] = 0;
      monthlyData[month] += t.total_tokens;
    });

    const totalTokens = Object.values(byModel).reduce((sum, v) => sum + v.tokens, 0);

    const byModelResult = Object.entries(byModel).map(([model, v]) => ({
      model,
      totalTokens: v.tokens,
      totalCost: v.cost,
      percentage: totalTokens > 0 ? (v.tokens / totalTokens) * 100 : 0,
    }));

    const monthlyResult = Object.entries(monthlyData).map(([month, tokens]) => ({
      month,
      tokens,
    }));

    return NextResponse.json({ byModel: byModelResult, monthly: monthlyResult });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
