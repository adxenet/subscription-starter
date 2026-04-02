import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';

export default async function AdminDashboard() {
  const supabase = createClient();

  const [
    { count: totalListings },
    { count: pendingListings },
    { count: approvedListings },
    { count: totalBlogPosts },
    { count: totalContacts },
    { count: totalQuotes },
    { count: totalUsers },
    { data: recentListings },
    { data: recentContacts }
  ] = await Promise.all([
    supabase.from('directory_businesses').select('*', { count: 'exact', head: true }),
    supabase.from('directory_businesses').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
    supabase.from('directory_businesses').select('*', { count: 'exact', head: true }).eq('status', 'approved'),
    supabase.from('blog_posts').select('*', { count: 'exact', head: true }),
    supabase.from('contact_submissions').select('*', { count: 'exact', head: true }),
    supabase.from('quote_requests').select('*', { count: 'exact', head: true }),
    supabase.from('users').select('*', { count: 'exact', head: true }),
    supabase
      .from('directory_businesses')
      .select('id, name, status, city, created_at')
      .order('created_at', { ascending: false })
      .limit(5),
    supabase
      .from('contact_submissions')
      .select('id, name, email, topic, created_at')
      .order('created_at', { ascending: false })
      .limit(5)
  ]);

  const stats = [
    {
      label: 'Total Listings',
      value: totalListings ?? 0,
      href: '/admin/listings',
      color: 'bg-blue-50 text-blue-700 border-blue-200'
    },
    {
      label: 'Pending Review',
      value: pendingListings ?? 0,
      href: '/admin/listings?status=pending',
      color: 'bg-amber-50 text-amber-700 border-amber-200'
    },
    {
      label: 'Approved',
      value: approvedListings ?? 0,
      href: '/admin/listings?status=approved',
      color: 'bg-green-50 text-green-700 border-green-200'
    },
    {
      label: 'Blog Posts',
      value: totalBlogPosts ?? 0,
      href: '/admin/blog',
      color: 'bg-purple-50 text-purple-700 border-purple-200'
    },
    {
      label: 'Contact Messages',
      value: totalContacts ?? 0,
      href: '/admin/contacts',
      color: 'bg-pink-50 text-pink-700 border-pink-200'
    },
    {
      label: 'Quote Requests',
      value: totalQuotes ?? 0,
      href: '/admin/quotes',
      color: 'bg-indigo-50 text-indigo-700 border-indigo-200'
    },
    {
      label: 'Users',
      value: totalUsers ?? 0,
      href: '/admin/users',
      color: 'bg-teal-50 text-teal-700 border-teal-200'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-surface-900">Dashboard</h1>
        <p className="mt-1 text-sm text-surface-500">
          Overview of your China Forwarders directory.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className={`p-4 rounded-xl border transition hover:shadow-md ${stat.color}`}
          >
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-xs font-medium mt-1 opacity-70">{stat.label}</p>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="bg-white rounded-xl border border-surface-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-surface-100 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-surface-900">
              Recent Listings
            </h3>
            <Link
              href="/admin/listings"
              className="text-xs text-brand-600 hover:text-brand-700 font-medium"
            >
              View all
            </Link>
          </div>
          <div className="divide-y divide-surface-100">
            {recentListings?.length ? (
              recentListings.map((listing) => (
                <Link
                  key={listing.id}
                  href={`/admin/listings/${listing.id}`}
                  className="flex items-center justify-between px-5 py-3 hover:bg-surface-50 transition"
                >
                  <div>
                    <p className="text-sm font-medium text-surface-900">
                      {listing.name}
                    </p>
                    <p className="text-xs text-surface-400">
                      {listing.city ?? 'No city'} &middot;{' '}
                      {new Date(listing.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <StatusBadge status={listing.status} />
                </Link>
              ))
            ) : (
              <p className="px-5 py-8 text-sm text-surface-400 text-center">
                No listings yet
              </p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-surface-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-surface-100 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-surface-900">
              Recent Contact Messages
            </h3>
            <Link
              href="/admin/contacts"
              className="text-xs text-brand-600 hover:text-brand-700 font-medium"
            >
              View all
            </Link>
          </div>
          <div className="divide-y divide-surface-100">
            {recentContacts?.length ? (
              recentContacts.map((contact) => (
                <div
                  key={contact.id}
                  className="px-5 py-3"
                >
                  <p className="text-sm font-medium text-surface-900">
                    {contact.name}
                  </p>
                  <p className="text-xs text-surface-400">
                    {contact.email} &middot; {contact.topic} &middot;{' '}
                    {new Date(contact.created_at).toLocaleDateString()}
                  </p>
                </div>
              ))
            ) : (
              <p className="px-5 py-8 text-sm text-surface-400 text-center">
                No messages yet
              </p>
            )}
          </div>
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
