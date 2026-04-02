'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { deleteBlogPost } from './actions';

interface Props {
  id: string;
  slug: string;
}

export default function BlogPostActions({ id, slug }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [showConfirm, setShowConfirm] = useState(false);

  function handleDelete() {
    startTransition(async () => {
      await deleteBlogPost(id);
      router.refresh();
      setShowConfirm(false);
    });
  }

  return (
    <div className="flex items-center justify-end gap-1">
      <Link
        href={`/admin/blog/${id}`}
        className="px-2 py-1 text-xs font-medium text-brand-700 bg-brand-50 border border-brand-200 rounded hover:bg-brand-100 transition"
      >
        Edit
      </Link>
      <a
        href={`/blog/${slug}`}
        target="_blank"
        rel="noopener noreferrer"
        className="px-2 py-1 text-xs font-medium text-surface-600 bg-surface-50 border border-surface-200 rounded hover:bg-surface-100 transition"
      >
        View
      </a>
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
