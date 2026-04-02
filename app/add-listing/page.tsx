import { Metadata } from 'next';
import AddListingForm from '@/components/listing/AddListingForm';

export const metadata: Metadata = {
  title: 'Add Your Business — China Forwarders',
  description:
    'List your freight forwarding company in our trusted directory. Reach importers looking for reliable logistics partners in China.'
};

export default function AddListingPage() {
  return (
    <section className="bg-gradient-to-b from-brand-50 via-white to-white min-h-screen">
      <div className="max-w-3xl mx-auto px-6 pt-12 pb-20 md:pt-16">
        <div className="text-center mb-10">
          <span className="inline-flex items-center px-3 py-1 mb-4 text-xs font-medium rounded-full bg-green-100 text-green-700">
            Free listing
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-surface-900 md:text-4xl">
            Add Your Business
          </h1>
          <p className="mt-3 text-base text-surface-500 max-w-xl mx-auto">
            Get your freight forwarding company listed in our directory and
            connect with importers looking for reliable logistics partners.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="bg-white border border-surface-200 rounded-2xl shadow-sm p-6 sm:p-8">
              <AddListingForm />
            </div>
          </div>

          <div className="space-y-5">
            <div className="bg-white border border-surface-200 rounded-2xl shadow-sm p-5">
              <h3 className="text-sm font-semibold text-surface-900 mb-3">Why list with us?</h3>
              <ul className="space-y-3">
                {[
                  'Reach importers actively searching for forwarders',
                  'Showcase your services and specialties',
                  'Collect reviews and build trust',
                  'Completely free — no hidden fees'
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-surface-600">
                    <svg className="w-4 h-4 mt-0.5 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white border border-surface-200 rounded-2xl shadow-sm p-5">
              <h3 className="text-sm font-semibold text-surface-900 mb-2">What happens next?</h3>
              <ol className="space-y-2 text-sm text-surface-500">
                <li className="flex items-start gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-100 text-brand-700 text-xs font-bold shrink-0">1</span>
                  Submit your business details
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-100 text-brand-700 text-xs font-bold shrink-0">2</span>
                  Our team reviews your listing
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-100 text-brand-700 text-xs font-bold shrink-0">3</span>
                  Your business goes live in the directory
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
