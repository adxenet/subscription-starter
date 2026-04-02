import { Metadata } from 'next';
import Footer from '@/components/ui/Footer';
import Navbar from '@/components/ui/Navbar';
import { Toaster } from '@/components/ui/Toasts/toaster';
import { PropsWithChildren, Suspense } from 'react';
import { getURL } from '@/utils/helpers';
import { headers } from 'next/headers';
import 'styles/main.css';

const title = 'China Forwarders — Trusted China Freight Forwarder Directory';
const description =
  'Find, compare, and connect with vetted China freight forwarders. Search by service, read reviews, and get freight quotes.';

export const metadata: Metadata = {
  metadataBase: new URL(getURL()),
  title: title,
  description: description,
  openGraph: {
    title: title,
    description: description
  }
};

export default async function RootLayout({ children }: PropsWithChildren) {
  const headersList = headers();
  const pathname = headersList.get('x-pathname') ?? '';
  const isAdmin = pathname.startsWith('/admin');

  return (
    <html lang="en">
      <body className={isAdmin ? 'bg-surface-50 text-surface-900' : 'bg-white text-surface-900'}>
        {!isAdmin && <Navbar />}
        {isAdmin ? (
          children
        ) : (
          <main
            id="skip"
            className="min-h-[calc(100dvh-4rem)] md:min-h[calc(100dvh-5rem)]"
          >
            {children}
          </main>
        )}
        {!isAdmin && <Footer />}
        <Suspense>
          <Toaster />
        </Suspense>
      </body>
    </html>
  );
}
