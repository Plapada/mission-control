import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { agent_id, action, details = {} } = body;

    if (!agent_id || !action) {
      return NextResponse.json(
        { error: 'agent_id and action are required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('activity_logs')
      .insert({ agent_id, action, details })
      .select('*, agent:agents(*)')
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
