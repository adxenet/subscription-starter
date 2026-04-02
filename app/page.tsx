import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { Metadata } from 'next';
import RouteTicker from '@/components/ui/RouteTicker';

export const metadata: Metadata = {
  title: 'China Forwarders — Trusted China Freight Forwarder Directory',
  description:
    'Find, compare, and connect with vetted China freight forwarders. Search by service, read reviews, and get freight quotes.'
};

export default async function HomePage() {
  const supabase = createClient();

  const { data: categories } = await supabase
    .from('directory_categories')
    .select('slug, name')
    .order('name');

  const { data: featured } = await supabase
    .from('directory_businesses')
    .select(
      `
      id, slug, name, short_description, city, province,
      accepting_new_clients, avg_rating, review_count, featured
    `
    )
    .eq('status', 'approved')
    .eq('featured', true)
    .order('avg_rating', { ascending: false })
    .limit(6);

  const { count: totalListings } = await supabase
    .from('directory_businesses')
    .select('id', { count: 'exact', head: true })
    .eq('status', 'approved');

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 via-white to-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(180,9,11,0.10),transparent)]" />

        <div className="relative max-w-4xl px-6 pt-20 pb-16 mx-auto text-center md:pt-28 md:pb-20">
          <Link
            href="/quote"
            className="inline-flex items-center gap-3 px-10 py-4 mb-8 text-lg font-bold text-white rounded-full bg-brand-600 hover:bg-brand-700 transition shadow-xl shadow-brand-600/30 hover:shadow-brand-600/50 hover:scale-105 transform"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Find a Forwarder
          </Link>

          <span className="block mb-6 text-xs font-medium text-surface-400">
            {totalListings ?? 0}+ verified forwarders
          </span>

          <h1 className="text-4xl font-extrabold tracking-tight text-surface-900 md:text-5xl lg:text-6xl">
            Find Trusted Freight
            <br />
            <span className="text-brand-600">Forwarders in China</span>
          </h1>

          <p className="max-w-2xl mx-auto mt-5 text-lg text-surface-500">
            Search our vetted directory of China freight forwarders.
            Compare services, read reviews, and connect with the right
            logistics partner for your business.
          </p>

          {/* Search bar */}
          <form
            action="/directory"
            method="get"
            className="flex flex-col gap-3 mt-10 sm:flex-row sm:items-center sm:gap-2 max-w-2xl mx-auto"
          >
            <input
              type="search"
              name="q"
              placeholder="Company name, city, or keyword..."
              className="flex-1 px-4 py-3 text-sm bg-white border rounded-xl border-surface-300 text-surface-900 placeholder:text-surface-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-400/20 shadow-sm"
            />

            <select
              name="category"
              defaultValue=""
              className="px-4 py-3 text-sm bg-white border rounded-xl border-surface-300 text-surface-600 focus:border-brand-500 focus:ring-2 focus:ring-brand-400/20 shadow-sm sm:w-52"
            >
              <option value="">All services</option>
              {categories?.map((cat) => (
                <option key={cat.slug} value={cat.slug}>
                  {cat.name}
                </option>
              ))}
            </select>

            <button
              type="submit"
              className="px-6 py-3 text-sm font-semibold text-white rounded-xl bg-brand-600 hover:bg-brand-700 transition shadow-sm shadow-brand-600/20"
            >
              Search
            </button>
          </form>

          {/* Quick category links */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            <span className="text-xs text-surface-400">Popular:</span>
            {[
              { slug: 'ocean-freight-fcl', name: 'Ocean FCL' },
              { slug: 'air-freight', name: 'Air Freight' },
              { slug: 'amazon-fba-prep', name: 'FBA Prep' },
              { slug: 'customs-clearance', name: 'Customs' },
              { slug: 'ecommerce-fulfillment', name: 'Ecommerce' }
            ].map((cat) => (
              <Link
                key={cat.slug}
                href={`/directory?category=${cat.slug}`}
                className="px-3 py-1 text-xs font-medium text-surface-600 bg-white border border-surface-200 rounded-full hover:border-brand-300 hover:text-brand-600 transition"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Route ticker */}
      <RouteTicker />

      {/* Trust bar */}
      <section className="border-y border-surface-100 bg-surface-50">
        <div className="max-w-5xl px-6 py-4 mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-sm text-surface-400">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Verified listings
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Honest reviews
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Free to use
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Updated regularly
            </span>
          </div>
        </div>
      </section>

      {/* Featured listings */}
      <section className="max-w-6xl px-6 py-16 mx-auto">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-surface-900">
              Featured Forwarders
            </h2>
            <p className="mt-1 text-sm text-surface-500">
              Top-rated logistics partners handpicked by our team.
            </p>
          </div>
          <Link
            href="/directory"
            className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700 transition"
          >
            View all
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {featured?.length ? (
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((biz) => (
              <li key={biz.id}>
                <Link
                  href={`/directory/${biz.slug}`}
                  className="group flex flex-col h-full p-5 bg-white border border-surface-200 rounded-xl transition hover:border-brand-300 hover:shadow-lg hover:shadow-brand-100/50"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-semibold text-surface-900 group-hover:text-brand-700 transition">
                          {biz.name}
                        </h3>
                        <span className="inline-flex items-center px-1.5 py-0.5 text-[10px] font-semibold text-amber-700 bg-amber-50 rounded">
                          Featured
                        </span>
                      </div>
                      {biz.short_description && (
                        <p className="mt-1.5 text-sm text-surface-500 line-clamp-2">
                          {biz.short_description}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-auto pt-3 border-t border-surface-100 flex items-center justify-between text-xs text-surface-400">
                    <span className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {[biz.city, biz.province].filter(Boolean).join(', ')}
                    </span>
                    <span className="flex items-center gap-2">
                      {biz.accepting_new_clients && (
                        <span className="text-green-600 font-medium">Accepting</span>
                      )}
                      {biz.review_count > 0 ? (
                        <span className="font-medium text-amber-600">
                          {Number(biz.avg_rating).toFixed(1)} ★
                        </span>
                      ) : (
                        <span className="text-surface-300">No reviews</span>
                      )}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-surface-400">
            No featured listings yet. Check back soon.
          </p>
        )}

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/directory"
            className="inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700"
          >
            View all forwarders
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-surface-100 bg-surface-50">
        <div className="max-w-3xl px-6 py-16 mx-auto text-center">
          <h2 className="text-2xl font-bold tracking-tight text-surface-900">
            Are you a freight forwarder?
          </h2>
          <p className="mt-2 text-base text-surface-500">
            Get listed in our directory and connect with importers looking for
            reliable logistics partners in China.
          </p>
          <div className="flex flex-col items-center gap-3 mt-6 sm:flex-row sm:justify-center">
            <Link
              href="/signin/signup"
              className="px-6 py-3 text-sm font-semibold text-white rounded-xl bg-brand-600 hover:bg-brand-700 transition shadow-sm"
            >
              List your business — free
            </Link>
            <Link
              href="/directory"
              className="px-6 py-3 text-sm font-medium text-surface-600 bg-white border border-surface-200 rounded-xl hover:border-surface-300 transition"
            >
              Browse directory
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
