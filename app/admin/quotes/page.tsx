import { createClient } from '@/utils/supabase/server';

export const dynamic = 'force-dynamic';

export default async function AdminQuotesPage() {
  const supabase = createClient();

  const { data: quotes, error } = await supabase
    .from('quote_requests')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-surface-900">Quote Requests</h1>
        <p className="mt-1 text-sm text-surface-500">
          All freight quote requests submitted by visitors.
        </p>
      </div>

      {error && (
        <div className="p-4 text-sm text-red-700 border border-red-200 rounded-lg bg-red-50">
          Failed to load quotes: {error.message}
        </div>
      )}

      {quotes?.length ? (
        <div className="bg-white border border-surface-200 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-surface-50 border-b border-surface-200">
                  <th className="text-left px-4 py-3 font-medium text-surface-500">
                    Contact
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-surface-500">
                    Route
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-surface-500">
                    Cargo
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-surface-500">
                    Service
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-surface-500">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-100">
                {quotes.map((q) => (
                  <tr key={q.id} className="hover:bg-surface-50 transition">
                    <td className="px-4 py-3">
                      <p className="font-medium text-surface-900">{q.name}</p>
                      <p className="text-xs text-surface-400">
                        {q.email}
                        {q.company && ` · ${q.company}`}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-surface-600">
                      {q.origin_city && (
                        <span>
                          {q.origin_city}
                          {q.origin_country && `, ${q.origin_country}`}
                        </span>
                      )}
                      {q.origin_city && q.dest_city && ' → '}
                      {q.dest_city && (
                        <span>
                          {q.dest_city}
                          {q.dest_country && `, ${q.dest_country}`}
                        </span>
                      )}
                      {!q.origin_city && !q.dest_city && '—'}
                    </td>
                    <td className="px-4 py-3 text-surface-600">
                      <p>{q.cargo_description || '—'}</p>
                      {q.weight_kg && (
                        <p className="text-xs text-surface-400">
                          {q.weight_kg}kg
                          {q.dimensions_cm && ` · ${q.dimensions_cm}`}
                        </p>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {q.service_type && (
                        <span className="inline-flex px-2 py-0.5 text-xs font-medium rounded-full border bg-surface-50 text-surface-600 border-surface-200">
                          {q.service_type}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-xs text-surface-400">
                      {new Date(q.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-surface-200 rounded-xl p-12 text-center">
          <p className="text-sm text-surface-400">No quote requests yet.</p>
        </div>
      )}
    </div>
  );
}
