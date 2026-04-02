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

export async function updateBlogPost(id: string, data: Record<string, unknown>) {
  const supabase = await requireAdmin();

  const allowedFields = [
    'title',
    'slug',
    'excerpt',
    'body_html',
    'cover_image_url',
    'author_name',
    'reading_time_min',
    'seo_title',
    'seo_description',
    'status'
  ];

  const filtered: Record<string, unknown> = { updated_at: new Date().toISOString() };
  for (const key of allowedFields) {
    if (key in data) filtered[key] = data[key];
  }

  if (data.status === 'published' && !data.published_at) {
    filtered.published_at = new Date().toISOString();
  }

  const { error } = await supabase
    .from('blog_posts')
    .update(filtered)
    .eq('id', id);

  if (error) throw new Error(error.message);

  revalidatePath('/admin/blog');
  revalidatePath('/blog');
}

export async function createBlogPost(data: Record<string, unknown>) {
  const supabase = await requireAdmin();

  const slug =
    (data.slug as string) ||
    (data.title as string)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

  const row: Record<string, unknown> = {
    title: data.title,
    slug,
    excerpt: data.excerpt || null,
    body_html: data.body_html || null,
    cover_image_url: data.cover_image_url || null,
    author_name: data.author_name || 'China Forwarders',
    reading_time_min: data.reading_time_min ? Number(data.reading_time_min) : null,
    seo_title: data.seo_title || null,
    seo_description: data.seo_description || null,
    status: (data.status as string) || 'draft'
  };

  if (data.status === 'published') {
    row.published_at = new Date().toISOString();
  }

  const { data: created, error } = await supabase
    .from('blog_posts')
    .insert(row)
    .select('id')
    .single();

  if (error) throw new Error(error.message);

  revalidatePath('/admin/blog');
  revalidatePath('/blog');

  return created.id;
}

export async function deleteBlogPost(id: string) {
  const supabase = await requireAdmin();

  const { error } = await supabase.from('blog_posts').delete().eq('id', id);
  if (error) throw new Error(error.message);

  revalidatePath('/admin/blog');
  revalidatePath('/blog');
}
