'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/cars', label: 'Cars' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeMenu = () => setIsOpen(false);
  const { data: session } = useSession();
  const pathname = usePathname();

  // Pages with a dark hero banner — use white nav text until scrolled
  const heroPages = ['/', '/cars'];
  const useWhiteText = heroPages.includes(pathname) && !scrolled;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-border bg-surface/90 backdrop-blur-lg shadow-sm'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className='mx-auto flex max-w-7xl items-center justify-between px-6 py-4'>
        <Link
          href='/'
          onClick={closeMenu}
          className='text-xl font-bold text-accent transition-opacity hover:opacity-80'
        >
          Rentola
        </Link>

        {/* Desktop nav */}
        <div className='hidden items-center gap-8 md:flex'>
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors ${
                useWhiteText
                  ? 'text-white/80 hover:text-white'
                  : 'text-muted hover:text-foreground'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop actions */}
        <div className='hidden items-center gap-3 md:flex'>
          <ThemeToggle />

          {session ? (
            <>
              <Link
                href={session.user?.role === 'ADMIN' ? '/admin' : '/dashboard'}
                className={`text-sm transition-colors ${
                  useWhiteText
                    ? 'text-white/80 hover:text-white'
                    : 'text-muted hover:text-foreground'
                }`}
              >
                {session.user?.name}
              </Link>
              <button
                onClick={() => signOut()}
                className='rounded-full border border-accent px-5 py-2 text-sm text-accent transition-colors hover:bg-accent hover:text-white'
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href='/login'
                className='rounded-full border border-accent px-5 py-2 text-sm text-accent transition-colors hover:bg-accent hover:text-white'
              >
                Login
              </Link>
              <Link
                href='/register'
                className='rounded-full bg-accent px-5 py-2 text-sm text-white transition-all hover:opacity-90'
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile burger */}
        <button
          type='button'
          className={`rounded-md p-2 transition-colors hover:bg-accent/10 md:hidden ${
            useWhiteText
              ? 'text-white/80 hover:text-white'
              : 'text-muted hover:text-foreground'
          }`}
          onClick={() => setIsOpen(prev => !prev)}
          aria-expanded={isOpen}
          aria-controls='mobile-menu'
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              className='h-6 w-6'
              aria-hidden='true'
            >
              <path d='M6 6l12 12M18 6l-12 12' />
            </svg>
          ) : (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              className='h-6 w-6'
              aria-hidden='true'
            >
              <path d='M4 6h16M4 12h16M4 18h16' />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div
          id='mobile-menu'
          className='border-t border-border bg-surface px-6 pb-6 pt-4 md:hidden'
        >
          <div className='flex flex-col gap-3'>
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className='text-sm text-muted transition-colors hover:text-foreground'
              >
                {link.label}
              </Link>
            ))}

            <div className='mt-2 flex items-center gap-3'>
              <ThemeToggle />
              <span className='text-sm text-muted'>Toggle theme</span>
            </div>

            {session ? (
              <>
                <span className='text-sm text-muted'>{session.user?.name}</span>
                <button
                  onClick={() => {
                    signOut();
                    closeMenu();
                  }}
                  className='inline-flex justify-center rounded-full border border-accent px-5 py-2 text-sm text-accent transition-colors hover:bg-accent hover:text-white'
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href='/login'
                  onClick={closeMenu}
                  className='inline-flex justify-center rounded-full border border-accent px-5 py-2 text-sm text-accent transition-colors hover:bg-accent hover:text-white'
                >
                  Login
                </Link>
                <Link
                  href='/register'
                  onClick={closeMenu}
                  className='inline-flex justify-center rounded-full bg-accent px-5 py-2 text-sm text-white transition-all hover:opacity-90'
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
