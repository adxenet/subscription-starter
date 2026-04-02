import { Metadata } from 'next';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog — China Forwarders',
  description:
    'Freight forwarding tips, China logistics news, and importing guides from the China Forwarders team.'
};

export default async function BlogPage() {
  const supabase = createClient();

  const { data: posts } = await supabase
    .from('blog_posts')
    .select('id, slug, title, excerpt, cover_image_url, published_at, author_name, reading_time_min')
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  return (
    <section className="bg-gradient-to-b from-brand-50 via-white to-white min-h-screen">
      <div className="max-w-5xl mx-auto px-6 pt-12 pb-20 md:pt-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold tracking-tight text-surface-900 md:text-4xl">
            Blog
          </h1>
          <p className="mt-3 text-base text-surface-500 max-w-xl mx-auto">
            Insights, guides, and news about China freight forwarding and
            international logistics.
          </p>
        </div>

        {posts?.length ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group flex flex-col bg-white border border-surface-200 rounded-2xl overflow-hidden transition hover:border-brand-300 hover:shadow-lg hover:shadow-brand-100/50"
              >
                {post.cover_image_url ? (
                  <div className="aspect-[16/9] bg-surface-100 overflow-hidden">
                    <img
                      src={post.cover_image_url}
                      alt={post.title}
                      className="w-full h-full object-cover transition group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="aspect-[16/9] bg-gradient-to-br from-brand-50 to-brand-100 flex items-center justify-center">
                    <svg className="w-10 h-10 text-brand-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                  </div>
                )}
                <div className="flex flex-col flex-1 p-5">
                  <h2 className="text-base font-semibold text-surface-900 group-hover:text-brand-700 transition line-clamp-2">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="mt-2 text-sm text-surface-500 line-clamp-3">
                      {post.excerpt}
                    </p>
                  )}
                  <div className="mt-auto pt-4 flex items-center justify-between text-xs text-surface-400">
                    <span>{post.author_name ?? 'China Forwarders'}</span>
                    <span className="flex items-center gap-2">
                      {post.reading_time_min && (
                        <span>{post.reading_time_min} min read</span>
                      )}
                      {post.published_at && (
                        <span>
                          {new Date(post.published_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                      )}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-surface-100">
              <svg className="w-8 h-8 text-surface-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-surface-900">Coming Soon</h2>
            <p className="mt-2 text-sm text-surface-500">
              We&apos;re working on great content about China freight forwarding. Check back soon!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
