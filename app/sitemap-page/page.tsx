import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Sitemap — China Forwarders',
  description:
    'Complete sitemap of China Forwarders. Browse all pages, business listings, and blog posts.'
};

export default async function SitemapPage() {
  const supabase = createClient();

  const { data: businesses } = await supabase
    .from('directory_businesses')
    .select('slug, name, city')
    .eq('status', 'approved')
    .order('name');

  const { data: categories } = await supabase
    .from('directory_categories')
    .select('slug, name')
    .order('name');

  const { data: posts } = await supabase
    .from('blog_posts')
    .select('slug, title')
    .eq('published', true)
    .order('published_at', { ascending: false });

  const mainPages = [
    { href: '/', label: 'Home' },
    { href: '/directory', label: 'Browse Directory' },
    { href: '/quote', label: 'Get Freight Quotes' },
    { href: '/blog', label: 'Blog' },
    { href: '/add-listing', label: 'Add Your Business Listing' },
    { href: '/contact', label: 'Contact Us' },
    { href: '/signin', label: 'Sign In' },
    { href: '/signin/signup', label: 'Sign Up' },
  ];

  return (
    <section className="max-w-4xl px-6 py-12 mx-auto md:py-16">
      <h1 className="text-3xl font-bold tracking-tight text-surface-900">
        Sitemap
      </h1>
      <p className="mt-2 text-sm text-surface-500">
        A complete index of all pages on China Forwarders for easy navigation and search engine discovery.
      </p>

      <div className="grid gap-10 mt-10 md:grid-cols-2">
        {/* Main pages */}
        <div>
          <h2 className="text-lg font-semibold text-surface-900 mb-4">Main Pages</h2>
          <ul className="space-y-2">
            {mainPages.map((p) => (
              <li key={p.href}>
                <Link
                  href={p.href}
                  className="text-sm text-brand-600 hover:text-brand-700 hover:underline"
                >
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Categories */}
        {categories && categories.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-surface-900 mb-4">
              Service Categories
            </h2>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/directory?category=${cat.slug}`}
                    className="text-sm text-brand-600 hover:text-brand-700 hover:underline"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Blog posts */}
        {posts && posts.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-surface-900 mb-4">
              Blog Posts
            </h2>
            <ul className="space-y-2">
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-sm text-brand-600 hover:text-brand-700 hover:underline"
                  >
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Business listings */}
        {businesses && businesses.length > 0 && (
          <div className="md:col-span-2">
            <h2 className="text-lg font-semibold text-surface-900 mb-4">
              Freight Forwarder Listings ({businesses.length})
            </h2>
            <ul className="grid gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
              {businesses.map((biz) => (
                <li key={biz.slug}>
                  <Link
                    href={`/directory/${biz.slug}`}
                    className="text-sm text-brand-600 hover:text-brand-700 hover:underline"
                  >
                    {biz.name}
                    {biz.city && (
                      <span className="text-surface-400 ml-1">— {biz.city}</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
