import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { x, y, z, confidence, dspLoad } = body;

    // Optional: Log to Supabase if confidence is high
    if (confidence > 85) {
      const { error } = await supabase
        .from('ghost_log')
        .insert([{ x, y, z, confidence, dsp_load: dspLoad, timestamp: new Date().toISOString() }]);
      
      if (error) console.error('Supabase Error:', error);
    }

    return NextResponse.json({ status: 'success' });
  } catch (error) {
    return NextResponse.json({ status: 'error', message: (error as Error).message }, { status: 400 });
  }
}
