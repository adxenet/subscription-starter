'use client';

import Link from 'next/link';
import { SignOut } from '@/utils/auth-helpers/server';
import { handleRequest } from '@/utils/auth-helpers/client';
import Logo from '@/components/icons/Logo';
import { usePathname, useRouter } from 'next/navigation';
import { getRedirectMethod } from '@/utils/auth-helpers/settings';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import s from './Navbar.module.css';

interface NavlinksProps {
  user?: any;
}

function MobileMenu({
  user,
  pathname,
  onClose,
  router
}: {
  user?: any;
  pathname: string;
  onClose: () => void;
  router: any;
}) {
  return createPortal(
    <div className="fixed inset-0 z-[9999] md:hidden">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="absolute top-0 right-0 h-full w-72 bg-white shadow-2xl flex flex-col animate-slide-in">
        <div className="flex items-center justify-between px-5 py-4 border-b border-surface-200">
          <span className="text-base font-bold text-surface-900">Menu</span>
          <button
            type="button"
            onClick={onClose}
            className="flex items-center justify-center w-9 h-9 rounded-lg text-surface-500 hover:bg-surface-100 transition"
            aria-label="Close menu"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col flex-1 px-4 py-4 gap-1 overflow-y-auto">
          <Link href="/" className={s.mobileLink} onClick={onClose}>
            Home
          </Link>
          <Link href="/directory" className={s.mobileLink} onClick={onClose}>
            Directory
          </Link>
          <Link href="/quote" className={s.mobileLink} onClick={onClose}>
            Get Quotes
          </Link>
          <Link href="/blog" className={s.mobileLink} onClick={onClose}>
            Blog
          </Link>
          <Link href="/contact" className={s.mobileLink} onClick={onClose}>
            Contact
          </Link>
          <Link href="/add-listing" className={s.mobileLink} onClick={onClose}>
            Add Listing
          </Link>
          {user && (
            <Link href="/account" className={s.mobileLink} onClick={onClose}>
              Account
            </Link>
          )}
        </nav>

        <div className="px-4 py-4 border-t border-surface-200">
          {user ? (
            <form onSubmit={(e) => handleRequest(e, SignOut, router)}>
              <input type="hidden" name="pathName" value={pathname} />
              <button
                type="submit"
                className="w-full px-4 py-2.5 text-sm font-medium text-surface-600 bg-surface-100 rounded-lg hover:bg-surface-200 transition"
              >
                Sign out
              </button>
            </form>
          ) : (
            <Link
              href="/signin"
              onClick={onClose}
              className="block w-full px-4 py-2.5 text-sm font-medium text-center text-white bg-brand-600 rounded-lg hover:bg-brand-700 transition"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function Navlinks({ user }: NavlinksProps) {
  const router = getRedirectMethod() === 'client' ? useRouter() : null;
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

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
          <Link href="/" className={s.link}>
            Home
          </Link>
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
          <span className="hidden sm:inline">Add Listing</span>
          <span className="sm:hidden">List</span>
        </Link>

        <div className="hidden md:flex items-center gap-2">
          {user ? (
            <form onSubmit={(e) => handleRequest(e, SignOut, router)}>
              <input type="hidden" name="pathName" value={pathname} />
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

        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg text-surface-600 hover:bg-surface-100 transition"
          aria-label="Open menu"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {menuOpen && (
        <MobileMenu
          user={user}
          pathname={pathname}
          onClose={() => setMenuOpen(false)}
          router={router}
        />
      )}
    </div>
  );
}
