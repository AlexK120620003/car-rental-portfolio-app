import Link from 'next/link';

const footerLinks = {
  Company: [
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ],
  Legal: [
    { href: '#', label: 'Privacy Policy' },
    { href: '#', label: 'Terms of Service' },
  ],
};

export default function Footer() {
  return (
    <footer className='border-t border-border bg-surface'>
      <div className='mx-auto max-w-7xl px-6 py-12'>
        <div className='grid gap-10 sm:grid-cols-2 md:grid-cols-4'>
          {/* Brand */}
          <div className='sm:col-span-2'>
            <Link href='/' className='text-xl font-extrabold text-accent'>
              Rentola
            </Link>
            <p className='mt-3 max-w-xs text-sm leading-relaxed text-muted'>
              Premium car rental at transparent prices. No hidden fees, just great cars and great service.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4 className='mb-4 text-xs font-bold uppercase tracking-widest text-muted'>
                {group}
              </h4>
              <ul className='flex flex-col gap-2'>
                {links.map(link => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className='text-sm text-muted transition-colors hover:text-foreground'
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className='mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row'>
          <p className='text-xs text-muted'>
            &copy; {new Date().getFullYear()} Rentola. All rights reserved.
          </p>
          <div className='flex gap-5'>
            {['About', 'Cars', 'Contact'].map(label => (
              <Link
                key={label}
                href={`/${label.toLowerCase()}`}
                className='text-xs text-muted transition-colors hover:text-foreground'
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
