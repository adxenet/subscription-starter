import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { PropsWithChildren } from 'react';
import AdminSidebar from './AdminSidebar';

export const dynamic = 'force-dynamic';

export default async function AdminLayout({ children }: PropsWithChildren) {
  const supabase = createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/signin');
  }

  const { data: profile } = await supabase
    .from('users')
    .select('role, full_name')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin') {
    redirect('/');
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar
        userName={profile.full_name || user.email || 'Admin'}
        userEmail={user.email || ''}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-14 border-b border-surface-200 bg-white flex items-center justify-between px-6 shrink-0">
          <h2 className="text-sm font-medium text-surface-500">
            Admin Dashboard
          </h2>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-xs text-surface-400 hover:text-surface-600 transition"
            >
              View Site
            </Link>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
