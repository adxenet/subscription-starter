'use client';

import { useState, FormEvent } from 'react';

const TOPICS = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'listing', label: 'List My Business' },
  { value: 'quote', label: 'Freight Quote Help' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'support', label: 'Technical Support' },
  { value: 'other', label: 'Other' }
];

export default function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch('/api/contact', {
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
        <h3 className="text-lg font-semibold text-surface-900">Message Sent</h3>
        <p className="mt-2 text-sm text-surface-500">
          Thank you for reaching out. We&apos;ll get back to you within 24 hours.
        </p>
      </div>
    );
  }

  const inputClass =
    'w-full px-4 py-2.5 text-sm bg-white border rounded-lg border-surface-300 text-surface-900 placeholder:text-surface-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-400/20 transition';

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block mb-1.5 text-sm font-medium text-surface-700">
            Name <span className="text-red-400">*</span>
          </label>
          <input type="text" id="name" name="name" required className={inputClass} placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="email" className="block mb-1.5 text-sm font-medium text-surface-700">
            Email <span className="text-red-400">*</span>
          </label>
          <input type="email" id="email" name="email" required className={inputClass} placeholder="you@company.com" />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="company" className="block mb-1.5 text-sm font-medium text-surface-700">
            Company
          </label>
          <input type="text" id="company" name="company" className={inputClass} placeholder="Company name" />
        </div>
        <div>
          <label htmlFor="topic" className="block mb-1.5 text-sm font-medium text-surface-700">
            Topic <span className="text-red-400">*</span>
          </label>
          <select id="topic" name="topic" required className={inputClass}>
            <option value="">Select a topic…</option>
            {TOPICS.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block mb-1.5 text-sm font-medium text-surface-700">
          Message <span className="text-red-400">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={`${inputClass} resize-y`}
          placeholder="How can we help you?"
        />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="px-6 py-3 text-sm font-semibold text-white rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-50 transition shadow-sm"
      >
        {submitting ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  );
}
