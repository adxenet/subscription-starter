'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { updateListingStatus, deleteListing } from './actions';
import Link from 'next/link';

interface Props {
  id: string;
  currentStatus: string;
}

export default function ListingActions({ id, currentStatus }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [showConfirm, setShowConfirm] = useState(false);

  function handleStatusChange(newStatus: string) {
    startTransition(async () => {
      await updateListingStatus(id, newStatus);
      router.refresh();
    });
  }

  function handleDelete() {
    startTransition(async () => {
      await deleteListing(id);
      router.refresh();
      setShowConfirm(false);
    });
  }

  return (
    <div className="flex items-center justify-end gap-1">
      {currentStatus === 'pending' && (
        <button
          onClick={() => handleStatusChange('approved')}
          disabled={isPending}
          className="px-2 py-1 text-xs font-medium text-green-700 bg-green-50 border border-green-200 rounded hover:bg-green-100 transition disabled:opacity-50"
        >
          Approve
        </button>
      )}
      {currentStatus === 'pending' && (
        <button
          onClick={() => handleStatusChange('rejected')}
          disabled={isPending}
          className="px-2 py-1 text-xs font-medium text-red-700 bg-red-50 border border-red-200 rounded hover:bg-red-100 transition disabled:opacity-50"
        >
          Reject
        </button>
      )}
      {currentStatus === 'approved' && (
        <button
          onClick={() => handleStatusChange('suspended')}
          disabled={isPending}
          className="px-2 py-1 text-xs font-medium text-surface-600 bg-surface-50 border border-surface-200 rounded hover:bg-surface-100 transition disabled:opacity-50"
        >
          Suspend
        </button>
      )}
      {(currentStatus === 'rejected' || currentStatus === 'suspended') && (
        <button
          onClick={() => handleStatusChange('approved')}
          disabled={isPending}
          className="px-2 py-1 text-xs font-medium text-green-700 bg-green-50 border border-green-200 rounded hover:bg-green-100 transition disabled:opacity-50"
        >
          Approve
        </button>
      )}

      <Link
        href={`/admin/listings/${id}`}
        className="px-2 py-1 text-xs font-medium text-brand-700 bg-brand-50 border border-brand-200 rounded hover:bg-brand-100 transition"
      >
        Edit
      </Link>

      {showConfirm ? (
        <div className="flex items-center gap-1">
          <button
            onClick={handleDelete}
            disabled={isPending}
            className="px-2 py-1 text-xs font-medium text-white bg-red-600 rounded hover:bg-red-700 transition disabled:opacity-50"
          >
            Confirm
          </button>
          <button
            onClick={() => setShowConfirm(false)}
            className="px-2 py-1 text-xs font-medium text-surface-600 bg-surface-100 rounded hover:bg-surface-200 transition"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          onClick={() => setShowConfirm(true)}
          className="px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-50 rounded transition"
        >
          Delete
        </button>
      )}
    </div>
  );
}
