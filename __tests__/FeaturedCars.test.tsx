import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import FeaturedCars from '../app/components/FeaturedCars';
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

const mockCars: Car[] = [
  {
    id: '1',
    brand: 'Toyota',
    model: 'Camry',
    year: 2023,
    category: 'SEDAN',
    pricePerDay: 75,
    description: 'A sedan.',
    image: '/car1.jpg',
    available: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    brand: 'BMW',
    model: 'X5',
    year: 2022,
    category: 'SUV',
    pricePerDay: 150,
    description: 'An SUV.',
    image: '/car2.jpg',
    available: true,
    createdAt: new Date('2024-01-01'),
  },
];

describe('FeaturedCars', () => {
  it('renders Popular Cars heading', () => {
    render(<FeaturedCars cars={mockCars} />);
    expect(screen.getByText('Popular Cars')).toBeInTheDocument();
  });

  it('renders all car cards', () => {
    render(<FeaturedCars cars={mockCars} />);
    expect(screen.getByText('Toyota Camry')).toBeInTheDocument();
    expect(screen.getByText('BMW X5')).toBeInTheDocument();
  });

  it('renders empty list without crashing', () => {
    render(<FeaturedCars cars={[]} />);
    expect(screen.getByText('Popular Cars')).toBeInTheDocument();
  });
});
