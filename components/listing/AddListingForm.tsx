'use client';

import { useState, FormEvent } from 'react';

const SERVICES = [
  'Ocean Freight (FCL)',
  'Ocean Freight (LCL)',
  'Air Freight',
  'Rail Freight',
  'Trucking / Road',
  'Customs Clearance',
  'Warehousing',
  'Amazon FBA Prep',
  'Ecommerce Fulfillment',
  'Dangerous Goods',
  'Cold Chain / Reefer',
  'Project Cargo',
  'Consolidation',
  'Door-to-Door',
  'Insurance'
];

export default function AddListingForm() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  function toggleService(s: string) {
    setSelectedServices((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    const form = e.currentTarget;
    const data = {
      ...Object.fromEntries(new FormData(form)),
      services: selectedServices
    };

    try {
      const res = await fetch('/api/listing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error('Failed');
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
          <svg className="h-7 w-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-surface-900">Listing Submitted!</h3>
        <p className="mt-2 text-sm text-surface-500">
          Thank you! Our team will review your submission and your business
          will be live within 48 hours.
        </p>
        <a
          href="/"
          className="inline-block mt-6 px-6 py-3 text-sm font-semibold text-white rounded-xl bg-brand-600 hover:bg-brand-700 transition"
        >
          Back to Home
        </a>
      </div>
    );
  }

  const inputClass =
    'w-full px-4 py-2.5 text-sm bg-white border rounded-lg border-surface-300 text-surface-900 placeholder:text-surface-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-400/20 transition';

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-base font-semibold text-surface-900 mb-4">Company Information</h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="company_name" className="block mb-1.5 text-sm font-medium text-surface-700">
              Company Name <span className="text-red-400">*</span>
            </label>
            <input type="text" id="company_name" name="company_name" required className={inputClass} placeholder="Your company name" />
          </div>

          <div>
            <label htmlFor="description" className="block mb-1.5 text-sm font-medium text-surface-700">
              Company Description <span className="text-red-400">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              required
              rows={4}
              className={`${inputClass} resize-y`}
              placeholder="Tell importers about your company, experience, and what sets you apart..."
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="website" className="block mb-1.5 text-sm font-medium text-surface-700">
                Website
              </label>
              <input type="url" id="website" name="website" className={inputClass} placeholder="https://yourcompany.com" />
            </div>
            <div>
              <label htmlFor="year_established" className="block mb-1.5 text-sm font-medium text-surface-700">
                Year Established
              </label>
              <input type="number" id="year_established" name="year_established" className={inputClass} placeholder="e.g. 2010" />
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-surface-100 pt-6">
        <h3 className="text-base font-semibold text-surface-900 mb-4">Location</h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="address" className="block mb-1.5 text-sm font-medium text-surface-700">
              Address
            </label>
            <input type="text" id="address" name="address" className={inputClass} placeholder="Street address" />
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label htmlFor="city" className="block mb-1.5 text-sm font-medium text-surface-700">
                City <span className="text-red-400">*</span>
              </label>
              <input type="text" id="city" name="city" required className={inputClass} placeholder="e.g. Shenzhen" />
            </div>
            <div>
              <label htmlFor="province" className="block mb-1.5 text-sm font-medium text-surface-700">
                Province
              </label>
              <input type="text" id="province" name="province" className={inputClass} placeholder="e.g. Guangdong" />
            </div>
            <div>
              <label htmlFor="country" className="block mb-1.5 text-sm font-medium text-surface-700">
                Country <span className="text-red-400">*</span>
              </label>
              <input type="text" id="country" name="country" required className={inputClass} placeholder="e.g. China" />
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-surface-100 pt-6">
        <h3 className="text-base font-semibold text-surface-900 mb-4">Services Offered</h3>
        <div className="flex flex-wrap gap-2">
          {SERVICES.map((svc) => {
            const active = selectedServices.includes(svc);
            return (
              <button
                key={svc}
                type="button"
                onClick={() => toggleService(svc)}
                className={`px-3 py-1.5 text-xs font-medium rounded-full border transition ${
                  active
                    ? 'bg-brand-600 text-white border-brand-600'
                    : 'bg-white text-surface-600 border-surface-300 hover:border-brand-400 hover:text-brand-600'
                }`}
              >
                {svc}
              </button>
            );
          })}
        </div>
      </div>

      <div className="border-t border-surface-100 pt-6">
        <h3 className="text-base font-semibold text-surface-900 mb-4">Contact Details</h3>
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="contact_name" className="block mb-1.5 text-sm font-medium text-surface-700">
                Contact Person <span className="text-red-400">*</span>
              </label>
              <input type="text" id="contact_name" name="contact_name" required className={inputClass} placeholder="Full name" />
            </div>
            <div>
              <label htmlFor="contact_email" className="block mb-1.5 text-sm font-medium text-surface-700">
                Email <span className="text-red-400">*</span>
              </label>
              <input type="email" id="contact_email" name="contact_email" required className={inputClass} placeholder="you@company.com" />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="contact_phone" className="block mb-1.5 text-sm font-medium text-surface-700">
                Phone
              </label>
              <input type="tel" id="contact_phone" name="contact_phone" className={inputClass} placeholder="+86 138 0000 0000" />
            </div>
            <div>
              <label htmlFor="contact_wechat" className="block mb-1.5 text-sm font-medium text-surface-700">
                WeChat ID
              </label>
              <input type="text" id="contact_wechat" name="contact_wechat" className={inputClass} placeholder="WeChat ID" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-start gap-2 pt-2">
        <input type="checkbox" id="agree" name="agree" required className="mt-1 h-4 w-4 rounded border-surface-300 text-brand-600 focus:ring-brand-400/40" />
        <label htmlFor="agree" className="text-sm text-surface-500">
          I confirm the information provided is accurate and I have the authority
          to list this business. <span className="text-red-400">*</span>
        </label>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="w-full px-6 py-3 text-sm font-semibold text-white rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-50 transition shadow-sm"
      >
        {submitting ? 'Submitting…' : 'Submit Listing'}
      </button>
    </form>
  );
}
