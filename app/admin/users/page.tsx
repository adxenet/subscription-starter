import { createClient } from '@/utils/supabase/server';
import UserRoleSelect from './UserRoleSelect';

export const dynamic = 'force-dynamic';

export default async function AdminUsersPage() {
  const supabase = createClient();

  const {
    data: { user: currentUser }
  } = await supabase.auth.getUser();

  const { data: users, error } = await supabase
    .from('users')
    .select('id, full_name, role')
    .order('role', { ascending: true });

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-surface-900">Users</h1>
        <p className="mt-1 text-sm text-surface-500">
          Manage user accounts and roles.
        </p>
      </div>

      {error && (
        <div className="p-4 text-sm text-red-700 border border-red-200 rounded-lg bg-red-50">
          Failed to load users: {error.message}
        </div>
      )}

      <div className="bg-white border border-surface-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface-50 border-b border-surface-200">
                <th className="text-left px-4 py-3 font-medium text-surface-500">
                  Name
                </th>
                <th className="text-left px-4 py-3 font-medium text-surface-500">
                  User ID
                </th>
                <th className="text-left px-4 py-3 font-medium text-surface-500">
                  Role
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100">
              {users?.length ? (
                users.map((u) => (
                  <tr key={u.id} className="hover:bg-surface-50 transition">
                    <td className="px-4 py-3">
                      <p className="font-medium text-surface-900">
                        {u.full_name || 'Unnamed'}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <code className="text-xs text-surface-400 bg-surface-50 px-1.5 py-0.5 rounded">
                        {u.id}
                      </code>
                    </td>
                    <td className="px-4 py-3">
                      <UserRoleSelect
                        userId={u.id}
                        currentRole={u.role}
                        isSelf={u.id === currentUser?.id}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={3}
                    className="px-4 py-12 text-center text-surface-400"
                  >
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="p-4 bg-surface-50 border border-surface-200 rounded-xl">
        <h3 className="text-sm font-semibold text-surface-700 mb-2">
          Role Permissions
        </h3>
        <dl className="grid gap-2 text-xs text-surface-500">
          <div className="flex gap-2">
            <dt className="font-medium text-surface-700 w-14">user</dt>
            <dd>Standard account. Can browse directory and submit reviews.</dd>
          </div>
          <div className="flex gap-2">
            <dt className="font-medium text-surface-700 w-14">owner</dt>
            <dd>Business owner. Can edit their own listing and respond to reviews.</dd>
          </div>
          <div className="flex gap-2">
            <dt className="font-medium text-surface-700 w-14">admin</dt>
            <dd>Full access. Can manage all listings, blog posts, users, and settings.</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
