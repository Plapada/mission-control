import { NextResponse } from 'next/server';
import { getSupabaseClient } from '@/lib/supabase-server';

export async function GET() {
  try {
    const supabase = getSupabaseClient();
    const { data: tokenData } = await supabase
      .from('token_usage')
      .select('cost, total_tokens');

    const totalSpend = tokenData?.reduce((sum, t) => sum + t.cost, 0) || 0;
    const monthlyBudget = 200;
    const totalTokens = tokenData?.reduce((sum, t) => sum + t.total_tokens, 0) || 0;
    const sessionCount = tokenData?.length || 1;

    return NextResponse.json({
      totalSpend,
      monthlyBudget,
      avgPerSession: totalSpend / sessionCount,
      usagePercentage: (totalSpend / monthlyBudget) * 100,
      totalTokens,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
