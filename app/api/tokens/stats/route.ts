import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET() {
  try {
    // Get total spend
    const { data: tokenData } = await supabase
      .from('token_usage')
      .select('cost, total_tokens');

    const totalSpend = tokenData?.reduce((sum, t) => sum + t.cost, 0) || 0;
    const monthlyBudget = 200; // Configurável
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
