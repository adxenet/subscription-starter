import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.name || !body.email || !body.topic || !body.message) {
      return NextResponse.json(
        { error: 'Name, email, topic, and message are required' },
        { status: 400 }
      );
    }

    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded?.split(',')[0]?.trim();

    const { error } = await supabaseAdmin
      .from('contact_submissions')
      .insert({
        name: String(body.name).slice(0, 200),
        email: String(body.email).slice(0, 200),
        company: body.company ? String(body.company).slice(0, 200) : null,
        topic: String(body.topic).slice(0, 50),
        message: String(body.message).slice(0, 5000),
        ip_address: ip || null,
        user_agent: request.headers.get('user-agent')?.slice(0, 500) ?? null
      });

    if (error) {
      console.error('Contact insert error:', error);
      return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
