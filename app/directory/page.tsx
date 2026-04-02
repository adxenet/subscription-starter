import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Browse China Freight Forwarders — China Forwarders Directory',
  description:
    'Search and compare vetted freight forwarders across China by service and availability.'
};

const PAGE_SIZE = 12;

interface DirectorySearchParams {
  q?: string;
  category?: string;
  accepting?: string;
  page?: string;
}

export default async function DirectoryPage({
  searchParams
}: {
  searchParams: DirectorySearchParams;
}) {
  const supabase = createClient();

  const page = Math.max(parseInt(searchParams.page ?? '1', 10) || 1, 1);
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const q = (searchParams.q ?? '').trim();
  const categorySlug = (searchParams.category ?? '').trim() || undefined;
  const acceptingNew = searchParams.accepting === 'true' ? true : undefined;

  const { data: allCategories } = await supabase
    .from('directory_categories')
    .select('slug, name')
    .order('name');

  let query = supabase
    .from('directory_businesses')
    .select(
      `
      id,
      slug,
      name,
      short_description,
      city,
      province,
      accepting_new_clients,
      avg_rating,
      review_count,
      featured
    `,
      { count: 'exact' }
    )
    .eq('status', 'approved');

  if (q) {
    query = query.textSearch('search_tsv', q, { type: 'websearch' });
  }

  if (acceptingNew !== undefined) {
    query = query.eq('accepting_new_clients', acceptingNew);
  }

  if (categorySlug) {
    const { data: category } = await supabase
      .from('directory_categories')
      .select('id')
      .eq('slug', categorySlug)
      .maybeSingle();

    if (category?.id) {
      const { data: mappedBusinesses } = await supabase
        .from('directory_business_category_map')
        .select('business_id')
        .eq('category_id', category.id);

      const mappedIds =
        mappedBusinesses?.map((item) => item.business_id) ?? [];

      if (mappedIds.length) {
        query = query.in('id', mappedIds);
      } else {
        query = query.in('id', ['00000000-0000-0000-0000-000000000000']);
      }
    }
  }

  const { data, count, error } = await query
    .order('featured', { ascending: false })
    .order('avg_rating', { ascending: false })
    .order('name', { ascending: true })
    .range(from, to);

  if (error) {
    console.error('Error loading directory', error);
  }

  const total = count ?? 0;
  const totalPages = total ? Math.ceil(total / PAGE_SIZE) : 1;

  function buildFilterUrl(overrides: Record<string, string | undefined>) {
    const base: Record<string, string> = {};
    if (q) base.q = q;
    if (categorySlug) base.category = categorySlug;
    if (acceptingNew) base.accepting = 'true';

    const merged: Record<string, string> = { ...base };
    for (const [k, v] of Object.entries(overrides)) {
      if (v) merged[k] = v;
      else delete merged[k];
    }

    const params = new URLSearchParams(merged);
    return `/directory?${params.toString()}`;
  }

  return (
    <main className="max-w-6xl px-6 py-8 mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-surface-900 md:text-4xl">
          China Freight Forwarders
        </h1>
        <p className="mt-2 text-base text-surface-500 max-w-2xl">
          Search vetted freight forwarders by service type and
          availability. Every listing is reviewed for quality.
        </p>
      </header>

      <div className="flex flex-col gap-4 p-4 mb-8 border rounded-xl bg-surface-50 border-surface-200 md:flex-row md:items-center">
        <form className="flex items-center flex-1 gap-2">
          <input
            type="search"
            name="q"
            placeholder="Search by name, city, service..."
            defaultValue={q}
            className="w-full px-4 py-2.5 text-sm border rounded-lg border-surface-300 bg-white text-surface-900 placeholder:text-surface-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-400/20"
          />
          <button
            type="submit"
            className="px-5 py-2.5 text-sm font-medium text-white rounded-lg bg-brand-600 hover:bg-brand-700 transition whitespace-nowrap"
          >
            Search
          </button>
        </form>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={buildFilterUrl({
              accepting: acceptingNew ? undefined : 'true',
              page: undefined
            })}
            className={`px-3 py-1.5 text-xs font-medium rounded-full border transition ${
              acceptingNew
                ? 'bg-green-600 text-white border-green-600'
                : 'bg-white text-surface-600 border-surface-300 hover:border-green-400 hover:text-green-600'
            }`}
          >
            Accepting clients
          </Link>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-4">
        <aside className="hidden lg:block">
          <h3 className="mb-3 text-xs font-semibold tracking-wider uppercase text-surface-400">
            Categories
          </h3>
          <ul className="space-y-1">
            <li>
              <Link
                href={buildFilterUrl({
                  category: undefined,
                  page: undefined
                })}
                className={`block px-3 py-2 text-sm rounded-lg transition ${
                  !categorySlug
                    ? 'bg-brand-50 text-brand-700 font-medium'
                    : 'text-surface-600 hover:bg-surface-100 hover:text-surface-900'
                }`}
              >
                All Categories
              </Link>
            </li>
            {allCategories?.map((cat) => (
              <li key={cat.slug}>
                <Link
                  href={buildFilterUrl({
                    category: cat.slug,
                    page: undefined
                  })}
                  className={`block px-3 py-2 text-sm rounded-lg transition ${
                    categorySlug === cat.slug
                      ? 'bg-brand-50 text-brand-700 font-medium'
                      : 'text-surface-600 hover:bg-surface-100 hover:text-surface-900'
                  }`}
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        <section className="lg:col-span-3" aria-label="Directory results">
          {error && (
            <div className="p-4 mb-4 text-sm text-red-700 border border-red-200 rounded-lg bg-red-50">
              <p className="font-medium">We couldn&apos;t load forwarders. Please try again.</p>
              <pre className="mt-2 text-xs text-red-500 whitespace-pre-wrap">{error.message} ({error.code})</pre>
            </div>
          )}

          {!data?.length && !error ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 mb-4 rounded-full bg-surface-100 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-surface-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <p className="text-surface-500">
                No forwarders match your filters.
              </p>
              <Link
                href="/directory"
                className="mt-3 text-sm font-medium text-brand-600 hover:text-brand-700"
              >
                Clear all filters
              </Link>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-surface-500">
                  <span className="font-medium text-surface-900">{total}</span>{' '}
                  forwarder{total !== 1 ? 's' : ''} found
                </p>
              </div>

              <ul className="grid gap-4 sm:grid-cols-2">
                {data?.map((biz) => (
                  <li key={biz.id}>
                    <Link
                      href={`/directory/${biz.slug}`}
                      className="group flex flex-col h-full p-5 bg-white border border-surface-200 rounded-xl transition hover:border-brand-300 hover:shadow-md hover:shadow-brand-100/50"
                    >
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h2 className="text-base font-semibold text-surface-900 group-hover:text-brand-700 transition">
                              {biz.name}
                            </h2>
                            {biz.featured && (
                              <span className="inline-flex items-center px-1.5 py-0.5 text-[10px] font-semibold text-amber-700 bg-amber-50 rounded">
                                Featured
                              </span>
                            )}
                          </div>
                          {biz.short_description && (
                            <p className="mt-1 text-sm text-surface-500 line-clamp-2">
                              {biz.short_description}
                            </p>
                          )}
                        </div>
                        {biz.accepting_new_clients && (
                          <span className="flex-shrink-0 inline-flex items-center px-2 py-1 text-[10px] font-semibold text-green-700 bg-green-50 border border-green-100 rounded-full">
                            Accepting
                          </span>
                        )}
                      </div>

                      <div className="mt-auto pt-3 border-t border-surface-100 flex items-center justify-between text-xs text-surface-400">
                        <span className="flex items-center gap-1">
                          <svg
                            className="w-3.5 h-3.5"
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
                          {[biz.city, biz.province]
                            .filter(Boolean)
                            .join(', ')}
                        </span>
                        <span className="flex items-center gap-2">
                          {biz.review_count > 0 ? (
                            <span className="font-medium text-amber-600">
                              {Number(biz.avg_rating).toFixed(1)} ★
                            </span>
                          ) : (
                            <span className="text-surface-300">
                              No reviews
                            </span>
                          )}
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}

          {totalPages > 1 && (
            <nav
              className="flex items-center justify-center mt-8 gap-x-1"
              aria-label="Pagination"
            >
              {Array.from({ length: totalPages }).map((_, idx) => {
                const pageNum = idx + 1;
                const params = new URLSearchParams({
                  ...Object.fromEntries(
                    Object.entries(searchParams).filter(
                      ([key, value]) =>
                        key !== 'page' && value !== undefined
                    )
                  ),
                  page: pageNum.toString()
                });

                const isCurrent = pageNum === page;

                return (
                  <Link
                    key={pageNum}
                    href={`/directory?${params.toString()}`}
                    aria-current={isCurrent ? 'page' : undefined}
                    className={`px-3.5 py-2 text-sm font-medium rounded-lg transition ${
                      isCurrent
                        ? 'bg-brand-600 text-white'
                        : 'text-surface-600 hover:bg-surface-100'
                    }`}
                  >
                    {pageNum}
                  </Link>
                );
              })}
            </nav>
          )}
        </section>
      </div>
    </main>
  );
}
