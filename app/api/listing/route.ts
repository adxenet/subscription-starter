import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (
      !body.company_name ||
      !body.description ||
      !body.city ||
      !body.country ||
      !body.contact_name ||
      !body.contact_email
    ) {
      return NextResponse.json(
        { error: 'Required fields are missing' },
        { status: 400 }
      );
    }

    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded?.split(',')[0]?.trim();

    const services = Array.isArray(body.services)
      ? body.services.map((s: unknown) => String(s).slice(0, 100))
      : [];

    const { error } = await supabaseAdmin
      .from('listing_submissions')
      .insert({
        company_name: String(body.company_name).slice(0, 300),
        description: String(body.description).slice(0, 5000),
        website: body.website ? String(body.website).slice(0, 500) : null,
        year_established: body.year_established
          ? parseInt(String(body.year_established), 10) || null
          : null,
        address: body.address ? String(body.address).slice(0, 500) : null,
        city: String(body.city).slice(0, 200),
        province: body.province ? String(body.province).slice(0, 200) : null,
        country: String(body.country).slice(0, 200),
        services,
        contact_name: String(body.contact_name).slice(0, 200),
        contact_email: String(body.contact_email).slice(0, 200),
        contact_phone: body.contact_phone
          ? String(body.contact_phone).slice(0, 50)
          : null,
        contact_wechat: body.contact_wechat
          ? String(body.contact_wechat).slice(0, 100)
          : null,
        ip_address: ip || null,
        user_agent: request.headers.get('user-agent')?.slice(0, 500) ?? null
      });

    if (error) {
      console.error('Listing insert error:', error);
      return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Listing API error:', err);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
