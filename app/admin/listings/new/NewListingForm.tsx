'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { createListing } from '../actions';

export default function NewListingForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const data: Record<string, unknown> = {
      name: form.get('name'),
      slug: form.get('slug') || undefined,
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
        const id = await createListing(data);
        router.push(`/admin/listings/${id}`);
      } catch (err) {
        alert('Failed to create: ' + (err as Error).message);
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
            <input name="name" required className={inputClass} placeholder="e.g. Shanghai Express Logistics" />
          </div>
          <div>
            <label className={labelClass}>Slug (auto-generated if empty)</label>
            <input name="slug" className={inputClass} placeholder="shanghai-express-logistics" />
          </div>
        </div>
        <div>
          <label className={labelClass}>Short Description</label>
          <input name="short_description" maxLength={300} className={inputClass} placeholder="Brief one-line description" />
        </div>
        <div>
          <label className={labelClass}>Full Description</label>
          <textarea name="description" rows={5} className={inputClass} placeholder="Detailed description of services..." />
        </div>
      </div>

      <div className="bg-white border border-surface-200 rounded-xl p-6 space-y-5">
        <h3 className="text-sm font-semibold text-surface-900 pb-3 border-b border-surface-100">
          Contact Details
        </h3>
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className={labelClass}>Website</label>
            <input name="website_url" type="url" className={inputClass} placeholder="https://example.com" />
          </div>
          <div>
            <label className={labelClass}>Phone</label>
            <input name="phone" className={inputClass} placeholder="+86 123 4567 890" />
          </div>
          <div>
            <label className={labelClass}>Email</label>
            <input name="email" type="email" className={inputClass} placeholder="contact@example.com" />
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
            <input name="city" className={inputClass} placeholder="Shanghai" />
          </div>
          <div>
            <label className={labelClass}>Province</label>
            <input name="province" className={inputClass} placeholder="Shanghai" />
          </div>
          <div>
            <label className={labelClass}>Country</label>
            <input name="country" defaultValue="China" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Postal Code</label>
            <input name="postal_code" className={inputClass} />
          </div>
        </div>
        <div>
          <label className={labelClass}>Address Line 1</label>
          <input name="address_line1" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Address Line 2</label>
          <input name="address_line2" className={inputClass} />
        </div>
      </div>

      <div className="bg-white border border-surface-200 rounded-xl p-6 space-y-5">
        <h3 className="text-sm font-semibold text-surface-900 pb-3 border-b border-surface-100">
          Status & Flags
        </h3>
        <div>
          <label className={labelClass}>Status</label>
          <select name="status" defaultValue="approved" className={inputClass}>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
          </select>
        </div>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 text-sm text-surface-700 cursor-pointer">
            <input type="checkbox" name="featured" className="rounded border-surface-300 text-brand-600 focus:ring-brand-500" />
            Featured listing
          </label>
          <label className="flex items-center gap-2 text-sm text-surface-700 cursor-pointer">
            <input type="checkbox" name="accepting_new_clients" defaultChecked className="rounded border-surface-300 text-brand-600 focus:ring-brand-500" />
            Accepting new clients
          </label>
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="px-6 py-2.5 text-sm font-medium text-white bg-brand-600 rounded-lg hover:bg-brand-700 transition disabled:opacity-50"
      >
        {isPending ? 'Creating...' : 'Create Listing'}
      </button>
    </form>
  );
}
