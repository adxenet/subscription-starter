'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

async function requireAdmin() {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { data: profile } = await supabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin') throw new Error('Not authorized');
  return { supabase, currentUserId: user.id };
}

export async function updateUserRole(userId: string, role: string) {
  const { supabase, currentUserId } = await requireAdmin();

  if (userId === currentUserId) {
    throw new Error('Cannot change your own role');
  }

  if (!['user', 'owner', 'admin'].includes(role)) {
    throw new Error('Invalid role');
  }

  const { error } = await supabase
    .from('users')
    .update({ role })
    .eq('id', userId);

  if (error) throw new Error(error.message);

  revalidatePath('/admin/users');
}
