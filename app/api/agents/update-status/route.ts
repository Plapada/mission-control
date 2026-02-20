import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/lib/supabase-server';

export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabaseClient();
    const body = await request.json();
    const { agent_id, status } = body;

    if (!agent_id || !status) {
      return NextResponse.json(
        { error: 'agent_id and status are required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('agents')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', agent_id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
