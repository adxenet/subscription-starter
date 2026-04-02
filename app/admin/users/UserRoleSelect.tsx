'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { updateUserRole } from './actions';

interface Props {
  userId: string;
  currentRole: string;
  isSelf: boolean;
}

export default function UserRoleSelect({ userId, currentRole, isSelf }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newRole = e.target.value;
    if (newRole === currentRole) return;

    if (newRole === 'admin' && !confirm('Grant admin privileges to this user?')) {
      e.target.value = currentRole;
      return;
    }

    startTransition(async () => {
      try {
        await updateUserRole(userId, newRole);
        router.refresh();
      } catch (err) {
        alert((err as Error).message);
        e.target.value = currentRole;
      }
    });
  }

  if (isSelf) {
    return (
      <span className="inline-flex px-2 py-0.5 text-xs font-medium rounded-full border bg-brand-50 text-brand-700 border-brand-200">
        {currentRole} (you)
      </span>
    );
  }

  return (
    <select
      defaultValue={currentRole}
      onChange={handleChange}
      disabled={isPending}
      className="text-xs px-2 py-1 border border-surface-200 rounded-lg bg-white text-surface-700 focus:border-brand-500 focus:ring-1 focus:ring-brand-400/20 disabled:opacity-50"
    >
      <option value="user">user</option>
      <option value="owner">owner</option>
      <option value="admin">admin</option>
    </select>
  );
}
