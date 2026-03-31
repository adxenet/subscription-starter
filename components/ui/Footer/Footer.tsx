import Link from 'next/link';
import Logo from '@/components/icons/Logo';

export default function Footer() {
  return (
    <footer className="border-t border-surface-200 bg-surface-50">
      <div className="max-w-6xl px-6 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold text-surface-900">
              <Logo />
              <span className="text-lg tracking-tight">ChinaFreight</span>
            </Link>
            <p className="mt-3 text-sm text-surface-500 leading-relaxed">
              The trusted directory for China freight forwarders. Find, compare, and connect with vetted logistics partners.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold tracking-wider uppercase text-surface-400 mb-3">
              Platform
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/directory" className="text-sm text-surface-600 hover:text-brand-600 transition">
                  Browse Directory
                </Link>
              </li>
              <li>
                <Link href="/" className="text-sm text-surface-600 hover:text-brand-600 transition">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/signin/signup" className="text-sm text-surface-600 hover:text-brand-600 transition">
                  List Your Business
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold tracking-wider uppercase text-surface-400 mb-3">
              Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-surface-600 hover:text-brand-600 transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/" className="text-sm text-surface-600 hover:text-brand-600 transition">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold tracking-wider uppercase text-surface-400 mb-3">
              Support
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-surface-600 hover:text-brand-600 transition">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/" className="text-sm text-surface-600 hover:text-brand-600 transition">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 mt-8 text-center border-t border-surface-200">
          <p className="text-xs text-surface-400">
            &copy; {new Date().getFullYear()} ChinaFreight. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
