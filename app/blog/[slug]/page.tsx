import { createClient } from '@supabase/supabase-js';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { fetch: (url, init) => fetch(url, { ...init, cache: 'no-store' }) } }
  );
}

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const supabase = getSupabase();
  const { data: post } = await supabase
    .from('blog_posts')
    .select('title, excerpt')
    .eq('slug', params.slug)
    .eq('status', 'published')
    .maybeSingle();

  if (!post) return { title: 'Post Not Found — China Forwarders' };

  return {
    title: `${post.title} — China Forwarders Blog`,
    description: post.excerpt ?? undefined
  };
}

export default async function BlogPostPage({ params }: Props) {
  const supabase = getSupabase();

  const { data: post } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', params.slug)
    .eq('status', 'published')
    .maybeSingle();

  if (!post) notFound();

  return (
    <section className="bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-6 pt-12 pb-20 md:pt-16">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-sm text-surface-500 hover:text-brand-600 transition mb-8"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Blog
        </Link>

        <article>
          <header className="mb-8">
            <h1 className="text-3xl font-extrabold tracking-tight text-surface-900 md:text-4xl">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 mt-4 text-sm text-surface-400">
              <span>{post.author_name ?? 'China Forwarders'}</span>
              {post.published_at && (
                <span>
                  {new Date(post.published_at).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
              )}
              {post.reading_time_min && (
                <span>{post.reading_time_min} min read</span>
              )}
            </div>
          </header>

          {post.cover_image_url && (
            <div className="mb-8 rounded-2xl overflow-hidden">
              <img
                src={post.cover_image_url}
                alt={post.title}
                className="w-full aspect-[2/1] object-cover"
              />
            </div>
          )}

          <div
            className="prose prose-surface max-w-none prose-headings:font-bold prose-headings:text-surface-900 prose-p:text-surface-600 prose-a:text-brand-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl"
            dangerouslySetInnerHTML={{ __html: post.body_html ?? '' }}
          />
        </article>
      </div>
    </section>
  );
}
