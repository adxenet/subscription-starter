import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';

interface BusinessPageProps {
  params: { slug: string };
}

export async function generateMetadata({
  params
}: BusinessPageProps): Promise<Metadata> {
  const supabase = createClient();
  const { data: biz } = await supabase
    .from('directory_businesses')
    .select('name, short_description, city, province')
    .eq('slug', params.slug)
    .eq('status', 'approved')
    .maybeSingle();

  if (!biz) return { title: 'Business Not Found' };

  const location = [biz.city, biz.province].filter(Boolean).join(', ');

  return {
    title: `${biz.name} — China Freight Forwarder in ${location}`,
    description:
      biz.short_description ?? `${biz.name} freight forwarding services.`
  };
}

export default async function BusinessPage({ params }: BusinessPageProps) {
  const supabase = createClient();

  const { data: biz, error } = await supabase
    .from('directory_businesses')
    .select(
      `
      id, slug, name, short_description, description, website_url, phone, email,
      city, province, country, address_line1, address_line2, postal_code,
      accepting_new_clients, avg_rating, review_count, featured, created_at
    `
    )
    .eq('slug', params.slug)
    .eq('status', 'approved')
    .maybeSingle();

  if (!biz || error) notFound();

  const { data: categoryRows } = await supabase
    .from('directory_business_category_map')
    .select('category_id')
    .eq('business_id', biz.id);

  let categories: { slug: string; name: string }[] = [];
  if (categoryRows?.length) {
    const categoryIds = categoryRows.map((r) => r.category_id);
    const { data: cats } = await supabase
      .from('directory_categories')
      .select('slug, name')
      .in('id', categoryIds);
    categories = cats ?? [];
  }

  const { data: reviews } = await supabase
    .from('directory_reviews')
    .select('id, rating, title, body, created_at')
    .eq('business_id', biz.id)
    .eq('status', 'approved')
    .order('created_at', { ascending: false })
    .limit(20);

  const location = [biz.city, biz.province, biz.country]
    .filter(Boolean)
    .join(', ');

  const fullAddress = [biz.address_line1, biz.address_line2, biz.postal_code]
    .filter(Boolean)
    .join(', ');

  return (
    <main className="max-w-5xl px-6 py-8 mx-auto">
      {/* Breadcrumb */}
      <nav
        className="mb-6 text-sm text-surface-400"
        aria-label="Breadcrumb"
      >
        <Link
          href="/directory"
          className="hover:text-brand-600 transition"
        >
          Directory
        </Link>
        <span className="mx-2">/</span>
        <span className="text-surface-600 font-medium">{biz.name}</span>
      </nav>

      {/* Hero card */}
      <div className="p-6 mb-8 border rounded-xl bg-surface-50 border-surface-200 md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight text-surface-900 md:text-3xl">
                {biz.name}
              </h1>
              {biz.featured && (
                <span className="inline-flex items-center px-2 py-0.5 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 rounded-full">
                  Featured
                </span>
              )}
            </div>
            {biz.short_description && (
              <p className="mt-2 text-base text-surface-500 max-w-xl">
                {biz.short_description}
              </p>
            )}
          </div>
          {biz.accepting_new_clients && (
            <span className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-green-700 bg-green-50 border border-green-200 rounded-full">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              Accepting new clients
            </span>
          )}
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap gap-6 mt-6 pt-6 border-t border-surface-200">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-amber-50">
              <span className="text-amber-600 text-sm font-bold">
                {biz.review_count > 0
                  ? Number(biz.avg_rating).toFixed(1)
                  : '—'}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-surface-900">
                {biz.review_count > 0
                  ? `${biz.review_count} review${biz.review_count > 1 ? 's' : ''}`
                  : 'No reviews yet'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-surface-100">
              <svg
                className="w-4 h-4 text-surface-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-surface-900">
                {location}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {/* Main content */}
        <div className="md:col-span-2 space-y-8">
          {/* About */}
          {biz.description && (
            <section>
              <h2 className="mb-3 text-lg font-semibold text-surface-900">
                About
              </h2>
              <div className="p-5 border rounded-xl border-surface-200 bg-white">
                <p className="text-sm leading-relaxed text-surface-600 whitespace-pre-line">
                  {biz.description}
                </p>
              </div>
            </section>
          )}

          {/* Services */}
          {categories.length > 0 && (
            <section>
              <h2 className="mb-3 text-lg font-semibold text-surface-900">
                Services
              </h2>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/directory?category=${cat.slug}`}
                    className="inline-flex items-center px-3.5 py-2 text-sm font-medium text-surface-700 bg-white border border-surface-200 rounded-lg hover:border-brand-300 hover:text-brand-700 hover:bg-brand-50 transition"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Reviews */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-surface-900">
                Reviews
                {biz.review_count > 0 && (
                  <span className="ml-2 text-sm font-normal text-surface-400">
                    ({biz.review_count})
                  </span>
                )}
              </h2>
            </div>

            {!reviews?.length ? (
              <div className="p-6 text-center border border-dashed rounded-xl border-surface-200">
                <p className="text-sm text-surface-400">
                  No reviews yet. Be the first to leave a review.
                </p>
              </div>
            ) : (
              <ul className="space-y-3">
                {reviews.map((review) => (
                  <li
                    key={review.id}
                    className="p-4 bg-white border rounded-xl border-surface-200"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-amber-500 tracking-wide">
                        {'★'.repeat(review.rating)}
                        <span className="text-surface-200">
                          {'★'.repeat(5 - review.rating)}
                        </span>
                      </span>
                      <span className="text-xs text-surface-400">
                        {new Date(review.created_at).toLocaleDateString(
                          'en-US',
                          { year: 'numeric', month: 'short', day: 'numeric' }
                        )}
                      </span>
                    </div>
                    {review.title && (
                      <p className="text-sm font-semibold text-surface-900">
                        {review.title}
                      </p>
                    )}
                    {review.body && (
                      <p className="mt-1 text-sm text-surface-500 leading-relaxed">
                        {review.body}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-4">
          {/* Contact card */}
          <div className="p-5 bg-white border rounded-xl border-surface-200 space-y-4">
            <h3 className="text-sm font-semibold text-surface-900">
              Contact
            </h3>

            <div className="text-sm text-surface-500 space-y-1">
              {fullAddress && <p>{fullAddress}</p>}
              <p>{location}</p>
            </div>

            {biz.phone && (
              <a
                href={`tel:${biz.phone}`}
                className="flex items-center gap-2 text-sm text-brand-600 hover:text-brand-700 transition"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                {biz.phone}
              </a>
            )}

            {biz.email && (
              <a
                href={`mailto:${biz.email}`}
                className="flex items-center gap-2 text-sm text-brand-600 hover:text-brand-700 transition"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                {biz.email}
              </a>
            )}

            {biz.website_url && (
              <a
                href={biz.website_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-brand-600 hover:text-brand-700 transition"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                Visit website
              </a>
            )}
          </div>

          {/* Details card */}
          <div className="p-5 bg-white border rounded-xl border-surface-200">
            <h3 className="mb-3 text-sm font-semibold text-surface-900">
              Details
            </h3>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-surface-400">Accepting clients</dt>
                <dd className="font-medium text-surface-700">
                  {biz.accepting_new_clients ? (
                    <span className="text-green-600">Yes</span>
                  ) : (
                    'No'
                  )}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-surface-400">Location</dt>
                <dd className="font-medium text-surface-700 text-right">
                  {location}
                </dd>
              </div>
            </dl>
          </div>

          {/* CTA card */}
          <div className="p-5 bg-brand-50 border border-brand-100 rounded-xl text-center">
            <p className="text-sm font-medium text-brand-800 mb-3">
              Is this your business?
            </p>
            <Link
              href="/signin/signup"
              className="inline-flex items-center justify-center w-full px-4 py-2.5 text-sm font-medium text-white bg-brand-600 rounded-lg hover:bg-brand-700 transition"
            >
              Claim this listing
            </Link>
          </div>
        </aside>
      </div>
    </main>
  );
}
