'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { updateListing } from '../actions';

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Props {
  listing: Record<string, any>;
  categories: Category[];
  currentCategoryIds: string[];
}

export default function ListingEditForm({
  listing,
  categories,
  currentCategoryIds
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const data: Record<string, unknown> = {
      name: form.get('name'),
      slug: form.get('slug'),
      short_description: form.get('short_description') || null,
      description: form.get('description') || null,
      website_url: form.get('website_url') || null,
      phone: form.get('phone') || null,
      email: form.get('email') || null,
      city: form.get('city') || null,
      province: form.get('province') || null,
      country: form.get('country') || 'China',
      address_line1: form.get('address_line1') || null,
      address_line2: form.get('address_line2') || null,
      postal_code: form.get('postal_code') || null,
      accepting_new_clients: form.get('accepting_new_clients') === 'on',
      featured: form.get('featured') === 'on',
      status: form.get('status')
    };

    startTransition(async () => {
      try {
        await updateListing(listing.id, data);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
        router.refresh();
      } catch (err) {
        alert('Failed to save: ' + (err as Error).message);
      }
    });
  }

  const inputClass =
    'w-full px-3 py-2 text-sm border border-surface-200 rounded-lg bg-white text-surface-900 placeholder:text-surface-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-400/20';
  const labelClass = 'block text-sm font-medium text-surface-700 mb-1';

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white border border-surface-200 rounded-xl p-6 space-y-5">
        <h3 className="text-sm font-semibold text-surface-900 pb-3 border-b border-surface-100">
          Basic Information
        </h3>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Business Name *</label>
            <input
              name="name"
              defaultValue={listing.name}
              required
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Slug *</label>
            <input
              name="slug"
              defaultValue={listing.slug}
              required
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Short Description</label>
          <input
            name="short_description"
            defaultValue={listing.short_description ?? ''}
            maxLength={300}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Full Description</label>
          <textarea
            name="description"
            defaultValue={listing.description ?? ''}
            rows={5}
            className={inputClass}
          />
        </div>
      </div>

      <div className="bg-white border border-surface-200 rounded-xl p-6 space-y-5">
        <h3 className="text-sm font-semibold text-surface-900 pb-3 border-b border-surface-100">
          Contact Details
        </h3>

        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className={labelClass}>Website</label>
            <input
              name="website_url"
              type="url"
              defaultValue={listing.website_url ?? ''}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Phone</label>
            <input
              name="phone"
              defaultValue={listing.phone ?? ''}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Email</label>
            <input
              name="email"
              type="email"
              defaultValue={listing.email ?? ''}
              className={inputClass}
            />
          </div>
        </div>
      </div>

      <div className="bg-white border border-surface-200 rounded-xl p-6 space-y-5">
        <h3 className="text-sm font-semibold text-surface-900 pb-3 border-b border-surface-100">
          Address
        </h3>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>City</label>
            <input
              name="city"
              defaultValue={listing.city ?? ''}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Province</label>
            <input
              name="province"
              defaultValue={listing.province ?? ''}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Country</label>
            <input
              name="country"
              defaultValue={listing.country ?? 'China'}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Postal Code</label>
            <input
              name="postal_code"
              defaultValue={listing.postal_code ?? ''}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Address Line 1</label>
          <input
            name="address_line1"
            defaultValue={listing.address_line1 ?? ''}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Address Line 2</label>
          <input
            name="address_line2"
            defaultValue={listing.address_line2 ?? ''}
            className={inputClass}
          />
        </div>
      </div>

      <div className="bg-white border border-surface-200 rounded-xl p-6 space-y-5">
        <h3 className="text-sm font-semibold text-surface-900 pb-3 border-b border-surface-100">
          Status & Flags
        </h3>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Status</label>
            <select
              name="status"
              defaultValue={listing.status}
              className={inputClass}
            >
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>

        <div className="flex gap-6">
          <label className="flex items-center gap-2 text-sm text-surface-700 cursor-pointer">
            <input
              type="checkbox"
              name="featured"
              defaultChecked={listing.featured}
              className="rounded border-surface-300 text-brand-600 focus:ring-brand-500"
            />
            Featured listing
          </label>
          <label className="flex items-center gap-2 text-sm text-surface-700 cursor-pointer">
            <input
              type="checkbox"
              name="accepting_new_clients"
              defaultChecked={listing.accepting_new_clients}
              className="rounded border-surface-300 text-brand-600 focus:ring-brand-500"
            />
            Accepting new clients
          </label>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="px-6 py-2.5 text-sm font-medium text-white bg-brand-600 rounded-lg hover:bg-brand-700 transition disabled:opacity-50"
        >
          {isPending ? 'Saving...' : 'Save Changes'}
        </button>
        {saved && (
          <span className="text-sm text-green-600 font-medium">
            Changes saved!
          </span>
        )}
        <a
          href={`/directory/${listing.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto text-sm text-surface-400 hover:text-surface-600 transition"
        >
          View public page &rarr;
        </a>
      </div>
    </form>
  );
}
