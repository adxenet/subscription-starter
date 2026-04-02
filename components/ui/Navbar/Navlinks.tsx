'use client';

import Link from 'next/link';
import { SignOut } from '@/utils/auth-helpers/server';
import { handleRequest } from '@/utils/auth-helpers/client';
import Logo from '@/components/icons/Logo';
import { usePathname, useRouter } from 'next/navigation';
import { getRedirectMethod } from '@/utils/auth-helpers/settings';
import s from './Navbar.module.css';

interface NavlinksProps {
  user?: any;
}

export default function Navlinks({ user }: NavlinksProps) {
  const router = getRedirectMethod() === 'client' ? useRouter() : null;

  return (
    <div className="relative flex flex-row justify-between py-3 align-center md:py-4">
      <div className="flex items-center flex-1 gap-1">
        <Link href="/" className={s.logo} aria-label="Logo">
          <Logo />
        </Link>
        <span className="ml-2 mr-6 text-lg font-bold tracking-tight text-surface-900">
          China Forwarders
        </span>
        <nav className="hidden md:flex items-center gap-1">
          <Link href="/directory" className={s.link}>
            Directory
          </Link>
          <Link href="/quote" className={s.link}>
            Get Quotes
          </Link>
          <Link href="/blog" className={s.link}>
            Blog
          </Link>
          <Link href="/contact" className={s.link}>
            Contact
          </Link>
          {user && (
            <Link href="/account" className={s.link}>
              Account
            </Link>
          )}
        </nav>
      </div>
      <div className="flex items-center gap-2">
        <Link
          href="/add-listing"
          className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white transition rounded-lg bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-green-400/40 focus:outline-none shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Listing
        </Link>
        {user ? (
          <form onSubmit={(e) => handleRequest(e, SignOut, router)}>
            <input type="hidden" name="pathName" value={usePathname()} />
            <button type="submit" className={s.link}>
              Sign out
            </button>
          </form>
        ) : (
          <Link href="/signin" className={s.link}>
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
}
