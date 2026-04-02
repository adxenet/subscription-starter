import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import ListingActions from './ListingActions';

export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: { status?: string; q?: string };
}

export default async function AdminListingsPage({ searchParams }: PageProps) {
  const supabase = createClient();
  const statusFilter = searchParams.status || '';
  const query = (searchParams.q || '').trim();

  let dbQuery = supabase
    .from('directory_businesses')
    .select('id, name, slug, city, province, status, featured, accepting_new_clients, avg_rating, review_count, created_at, updated_at')
    .order('created_at', { ascending: false });

  if (statusFilter) {
    dbQuery = dbQuery.eq('status', statusFilter);
  }

  if (query) {
    dbQuery = dbQuery.textSearch('search_tsv', query, { type: 'websearch' });
  }

  const { data: listings, error } = await dbQuery;

  const statuses = ['', 'pending', 'approved', 'rejected', 'suspended'];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">Listings</h1>
          <p className="mt-1 text-sm text-surface-500">
            Manage all directory business listings.
          </p>
        </div>
        <Link
          href="/admin/listings/new"
          className="px-4 py-2 text-sm font-medium text-white bg-brand-600 rounded-lg hover:bg-brand-700 transition"
        >
          + Add Listing
        </Link>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <form className="flex-1 flex gap-2">
          <input
            type="search"
            name="q"
            placeholder="Search listings..."
            defaultValue={query}
            className="w-full max-w-sm px-3 py-2 text-sm border border-surface-200 rounded-lg bg-white text-surface-900 placeholder:text-surface-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-400/20"
          />
          {statusFilter && (
            <input type="hidden" name="status" value={statusFilter} />
          )}
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-brand-600 rounded-lg hover:bg-brand-700 transition"
          >
            Search
          </button>
        </form>

        <div className="flex gap-1">
          {statuses.map((s) => (
            <Link
              key={s || 'all'}
              href={`/admin/listings${s ? `?status=${s}` : ''}${query ? `${s ? '&' : '?'}q=${query}` : ''}`}
              className={`px-3 py-1.5 text-xs font-medium rounded-full border transition ${
                statusFilter === s
                  ? 'bg-brand-600 text-white border-brand-600'
                  : 'bg-white text-surface-600 border-surface-200 hover:border-surface-300'
              }`}
            >
              {s || 'All'}
            </Link>
          ))}
        </div>
      </div>

      {error && (
        <div className="p-4 text-sm text-red-700 border border-red-200 rounded-lg bg-red-50">
          Failed to load listings: {error.message}
        </div>
      )}

      <div className="bg-white border border-surface-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface-50 border-b border-surface-200">
                <th className="text-left px-4 py-3 font-medium text-surface-500">
                  Business
                </th>
                <th className="text-left px-4 py-3 font-medium text-surface-500">
                  Location
                </th>
                <th className="text-left px-4 py-3 font-medium text-surface-500">
                  Status
                </th>
                <th className="text-left px-4 py-3 font-medium text-surface-500">
                  Rating
                </th>
                <th className="text-left px-4 py-3 font-medium text-surface-500">
                  Created
                </th>
                <th className="text-right px-4 py-3 font-medium text-surface-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100">
              {listings?.length ? (
                listings.map((listing) => (
                  <tr key={listing.id} className="hover:bg-surface-50 transition">
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/listings/${listing.id}`}
                        className="font-medium text-surface-900 hover:text-brand-600 transition"
                      >
                        {listing.name}
                      </Link>
                      <div className="flex gap-1.5 mt-1">
                        {listing.featured && (
                          <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
                            Featured
                          </span>
                        )}
                        {listing.accepting_new_clients && (
                          <span className="text-[10px] font-semibold text-green-700 bg-green-50 px-1.5 py-0.5 rounded">
                            Accepting
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-surface-500">
                      {[listing.city, listing.province]
                        .filter(Boolean)
                        .join(', ') || '—'}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={listing.status} />
                    </td>
                    <td className="px-4 py-3 text-surface-500">
                      {listing.review_count > 0 ? (
                        <span>
                          {Number(listing.avg_rating).toFixed(1)} ★{' '}
                          <span className="text-surface-400">
                            ({listing.review_count})
                          </span>
                        </span>
                      ) : (
                        <span className="text-surface-300">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-surface-400 text-xs">
                      {new Date(listing.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <ListingActions
                        id={listing.id}
                        currentStatus={listing.status}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-surface-400">
                    No listings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending: 'bg-amber-50 text-amber-700 border-amber-200',
    approved: 'bg-green-50 text-green-700 border-green-200',
    rejected: 'bg-red-50 text-red-700 border-red-200',
    suspended: 'bg-surface-100 text-surface-500 border-surface-200'
  };

  return (
    <span
      className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full border ${styles[status] ?? styles.pending}`}
    >
      {status}
    </span>
  );
}
