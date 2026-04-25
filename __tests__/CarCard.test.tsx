import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import CarCard from '../app/components/CarCard';
import type { Car } from '../app/lib/types';

vi.mock('next/image', () => ({
  default: ({ alt }: { alt: string }) => <img alt={alt} />,
}));

vi.mock('next/link', () => ({
  default: ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => <a href={href}>{children}</a>,
}));

const mockCar: Car = {
  id: 'car-1',
  brand: 'Toyota',
  model: 'Camry',
  year: 2023,
  category: 'SEDAN',
  pricePerDay: 75,
  description: 'A reliable sedan.',
  image: '/cars/toyota-camry.jpg',
  available: true,
  createdAt: new Date('2024-01-01'),
};

describe('CarCard', () => {
  it('renders car brand and model', () => {
    render(<CarCard car={mockCar} />);
    expect(screen.getByText('Toyota Camry')).toBeInTheDocument();
  });

  it('renders price per day', () => {
    render(<CarCard car={mockCar} />);
    expect(screen.getByText('$75')).toBeInTheDocument();
  });

  it('renders category', () => {
    render(<CarCard car={mockCar} />);
    expect(screen.getByText('SEDAN')).toBeInTheDocument();
  });

  it('links to correct car page', () => {
    render(<CarCard car={mockCar} />);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/cars/car-1');
  });

  it('shows Unavailable badge when car is not available', () => {
    render(<CarCard car={{ ...mockCar, available: false }} />);
    expect(screen.getByText('Unavailable')).toBeInTheDocument();
  });

  it('does not show Unavailable when car is available', () => {
    render(<CarCard car={mockCar} />);
    expect(screen.queryByText('Unavailable')).not.toBeInTheDocument();
  });
});
