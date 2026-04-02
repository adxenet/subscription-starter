import { Metadata } from 'next';
import QuoteWizard from '@/components/quote/QuoteWizard';

export const metadata: Metadata = {
  title: 'Get a Freight Quote — China Forwarders',
  description:
    'Tell us about your shipment and receive competitive quotes from vetted China freight forwarders within 24–48 hours.'
};

export default function QuotePage() {
  return (
    <section className="bg-gradient-to-b from-brand-50 via-white to-white min-h-screen">
      <div className="max-w-3xl mx-auto px-6 pt-12 pb-20 md:pt-16">
        <div className="text-center mb-10">
          <span className="inline-flex items-center px-3 py-1 mb-4 text-xs font-medium rounded-full bg-brand-100 text-brand-700">
            Free &mdash; No obligations
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-surface-900 md:text-4xl">
            Get Your Freight Quote
          </h1>
          <p className="mt-3 text-base text-surface-500 max-w-xl mx-auto">
            Answer a few questions about your shipment and we&apos;ll match you
            with the right forwarders. Most requests get 3–5 quotes within
            48&nbsp;hours.
          </p>
        </div>

        <QuoteWizard />
      </div>
    </section>
  );
}
