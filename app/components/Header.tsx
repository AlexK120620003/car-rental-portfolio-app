import Link from 'next/link';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/cars', label: 'Cars' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  return (
    <header className='bg-surface border-b border-border'>
      <nav className='mx-auto flex max-w-7xl items-center justify-between px-6 py-4'>
        <Link href='/' className='text-xl font-bold text-accent'>
          Rentola
        </Link>

        <div className='flex items-center gap-8'>
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
          className='rounded-full border border-accent px-5 py-2 text-sm text-accent transition-colors hover:bg-accent hover:text-white'
        >
          Login
        </Link>
      </nav>
    </header>
  );
}
