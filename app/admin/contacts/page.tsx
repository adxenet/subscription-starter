import { createClient } from '@/utils/supabase/server';

export const dynamic = 'force-dynamic';

export default async function AdminContactsPage() {
  const supabase = createClient();

  const { data: contacts, error } = await supabase
    .from('contact_submissions')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-surface-900">
          Contact Messages
        </h1>
        <p className="mt-1 text-sm text-surface-500">
          All messages submitted via the contact form.
        </p>
      </div>

      {error && (
        <div className="p-4 text-sm text-red-700 border border-red-200 rounded-lg bg-red-50">
          Failed to load contacts: {error.message}
        </div>
      )}

      {contacts?.length ? (
        <div className="space-y-4">
          {contacts.map((msg) => (
            <div
              key={msg.id}
              className="bg-white border border-surface-200 rounded-xl p-5 space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-surface-900">
                    {msg.name}
                  </h3>
                  <p className="text-xs text-surface-400">
                    {msg.email}
                    {msg.company && ` · ${msg.company}`}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="inline-flex px-2 py-0.5 text-xs font-medium rounded-full border bg-blue-50 text-blue-700 border-blue-200">
                    {msg.topic}
                  </span>
                  <p className="text-xs text-surface-400 mt-1">
                    {new Date(msg.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
              <p className="text-sm text-surface-600 whitespace-pre-wrap leading-relaxed">
                {msg.message}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-surface-200 rounded-xl p-12 text-center">
          <p className="text-sm text-surface-400">No contact messages yet.</p>
        </div>
      )}
    </div>
  );
}
