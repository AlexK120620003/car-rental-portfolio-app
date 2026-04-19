'use client';

import { useState } from 'react';
import Link from 'next/link';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/cars', label: 'Cars' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className='bg-surface border-b border-border'>
      <nav className='mx-auto flex max-w-7xl items-center justify-between px-6 py-4'>
        <Link
          href='/'
          onClick={closeMenu}
          className='text-xl font-bold text-accent'
        >
          Rentola
        </Link>

        <div className='hidden items-center gap-8 md:flex'>
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className='text-sm text-muted transition-colors hover:text-foreground'
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link
          href='/login'
          className='hidden rounded-full border border-accent px-5 py-2 text-sm text-accent transition-colors hover:bg-accent hover:text-white md:inline-flex'
        >
          Login
        </Link>

        <button
          type='button'
          className='rounded-md p-2 text-muted transition-colors hover:bg-accent/10 hover:text-foreground md:hidden'
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

      {isOpen && (
        <div
          id='mobile-menu'
          className='border-t border-border px-6 pb-6 pt-4 md:hidden'
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

            <Link
              href='/login'
              onClick={closeMenu}
              className='mt-2 inline-flex justify-center rounded-full border border-accent px-5 py-2 text-sm text-accent transition-colors hover:bg-accent hover:text-white'
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
