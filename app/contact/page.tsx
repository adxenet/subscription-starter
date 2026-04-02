import { Metadata } from 'next';
import ContactForm from '@/components/contact/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us — China Forwarders',
  description:
    'Get in touch with the China Forwarders team. Questions about freight forwarding, listing your business, or partnerships — we are here to help.'
};

export default function ContactPage() {
  return (
    <section className="bg-gradient-to-b from-brand-50 via-white to-white min-h-screen">
      <div className="max-w-5xl mx-auto px-6 pt-12 pb-20 md:pt-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold tracking-tight text-surface-900 md:text-4xl">
            Get in Touch
          </h1>
          <p className="mt-3 text-base text-surface-500 max-w-xl mx-auto">
            Have a question about our directory, need help finding a forwarder,
            or interested in listing your business? We&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="bg-white border border-surface-200 rounded-2xl shadow-sm p-6 sm:p-8">
              <h2 className="text-lg font-semibold text-surface-900 mb-6">
                Send us a message
              </h2>
              <ContactForm />
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white border border-surface-200 rounded-2xl shadow-sm p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50">
                  <svg className="w-5 h-5 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-sm font-semibold text-surface-900">Email</h3>
              </div>
              <p className="text-sm text-surface-500">
                hello@chinafreight.com
              </p>
            </div>

            <div className="bg-white border border-surface-200 rounded-2xl shadow-sm p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50">
                  <svg className="w-5 h-5 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-sm font-semibold text-surface-900">Response Time</h3>
              </div>
              <p className="text-sm text-surface-500">
                We typically respond within 24 hours on business days.
              </p>
            </div>

            <div className="bg-white border border-surface-200 rounded-2xl shadow-sm p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50">
                  <svg className="w-5 h-5 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-sm font-semibold text-surface-900">Location</h3>
              </div>
              <p className="text-sm text-surface-500">
                Serving importers and freight forwarders worldwide, with a focus on China logistics.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
