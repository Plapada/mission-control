import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/lib/supabase-server';

export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabaseClient();
    const body = await request.json();
    const { agent_id, model, input_tokens = 0, output_tokens = 0, cost = 0, session_key } = body;

    if (!model) {
      return NextResponse.json({ error: 'model is required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('token_usage')
      .insert({ 
        agent_id, 
        model, 
        input_tokens, 
        output_tokens, 
        total_tokens: input_tokens + output_tokens, 
        cost, 
        session_key 
      })
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
