import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const agent_id = searchParams.get('agent_id');

    let query = supabase
      .from('tasks')
      .select('*, agent:agents(*)')
      .order('created_at', { ascending: false });

    if (status) {
      query = query.eq('status', status);
    }
    if (agent_id) {
      query = query.eq('agent_id', agent_id);
    }

    const { data, error } = await query;

    if (error) throw error;

    return NextResponse.json(data || []);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, priority = 'medium', agent_id, status = 'todo' } = body;

    if (!title) {
      return NextResponse.json(
        { error: 'title is required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('tasks')
      .insert({ title, description, priority, agent_id, status })
      .select('*, agent:agents(*)')
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
