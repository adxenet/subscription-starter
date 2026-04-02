'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

async function requireAdmin() {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { data: profile } = await supabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin') throw new Error('Not authorized');
  return supabase;
}

export async function updateListingStatus(id: string, status: string) {
  const supabase = await requireAdmin();

  const { error } = await supabase
    .from('directory_businesses')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) throw new Error(error.message);

  revalidatePath('/admin/listings');
  revalidatePath('/admin');
  revalidatePath('/directory');
}

export async function updateListing(id: string, data: Record<string, unknown>) {
  const supabase = await requireAdmin();

  const allowedFields = [
    'name',
    'slug',
    'short_description',
    'description',
    'website_url',
    'phone',
    'email',
    'city',
    'province',
    'country',
    'address_line1',
    'address_line2',
    'postal_code',
    'accepting_new_clients',
    'featured',
    'status'
  ];

  const filtered: Record<string, unknown> = { updated_at: new Date().toISOString() };
  for (const key of allowedFields) {
    if (key in data) filtered[key] = data[key];
  }

  const { error } = await supabase
    .from('directory_businesses')
    .update(filtered)
    .eq('id', id);

  if (error) throw new Error(error.message);

  revalidatePath('/admin/listings');
  revalidatePath(`/admin/listings/${id}`);
  revalidatePath('/admin');
  revalidatePath('/directory');
}

export async function createListing(data: Record<string, unknown>) {
  const supabase = await requireAdmin();

  const slug =
    (data.slug as string) ||
    (data.name as string)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

  const row: Record<string, unknown> = {
    name: data.name,
    slug,
    short_description: data.short_description || null,
    description: data.description || null,
    website_url: data.website_url || null,
    phone: data.phone || null,
    email: data.email || null,
    city: data.city || null,
    province: data.province || null,
    country: (data.country as string) || 'China',
    address_line1: data.address_line1 || null,
    address_line2: data.address_line2 || null,
    postal_code: data.postal_code || null,
    accepting_new_clients: data.accepting_new_clients ?? true,
    featured: data.featured ?? false,
    status: (data.status as string) || 'approved'
  };

  const { data: created, error } = await supabase
    .from('directory_businesses')
    .insert(row)
    .select('id')
    .single();

  if (error) throw new Error(error.message);

  revalidatePath('/admin/listings');
  revalidatePath('/admin');
  revalidatePath('/directory');

  return created.id;
}

export async function deleteListing(id: string) {
  const supabase = await requireAdmin();

  const { error } = await supabase
    .from('directory_businesses')
    .delete()
    .eq('id', id);

  if (error) throw new Error(error.message);

  revalidatePath('/admin/listings');
  revalidatePath('/admin');
  revalidatePath('/directory');
}
