import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import Header from '../app/components/Header';

vi.mock('next/link', () => ({
  default: ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => <a href={href}>{children}</a>,
}));

vi.mock('next-auth/react', () => ({
  useSession: () => ({ data: null }),
  signOut: vi.fn(),
}));

describe('Header', () => {
  it('renders Rentola brand name', () => {
    render(<Header />);
    expect(screen.getByText('Rentola')).toBeInTheDocument();
  });

  it('renders nav links', () => {
    render(<Header />);
    expect(screen.getByRole('link', { name: 'Cars' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Contact' })).toBeInTheDocument();
  });

  it('renders Login link when not authenticated', () => {
    render(<Header />);
    expect(screen.getByRole('link', { name: 'Login' })).toBeInTheDocument();
  });
});
