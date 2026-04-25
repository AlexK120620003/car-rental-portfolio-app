import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import BookingCalculator from '../app/components/BookingCalculator';

vi.mock('../app/lib/actions', () => ({
  createBooking: vi.fn(),
}));

const DEFAULT_PROPS = {
  pricePerDay: 80,
  carId: 'car-1',
  carBrand: 'Lamborghini',
  carModel: 'Huracan',
  carImage: 'https://example.com/car.jpg',
};

describe('BookingCalculator', () => {
  it('renders Book This Car heading', () => {
    render(<BookingCalculator {...DEFAULT_PROPS} />);
    expect(screen.getByText('Book This Car')).toBeInTheDocument();
  });

  it('renders the price per day', () => {
    render(<BookingCalculator {...DEFAULT_PROPS} />);
    expect(screen.getByText('$80')).toBeInTheDocument();
  });

  it('renders the Select Dates & Book button', () => {
    render(<BookingCalculator {...DEFAULT_PROPS} />);
    expect(screen.getByText('Select Dates & Book')).toBeInTheDocument();
  });

  it('opens the booking modal when button is clicked', () => {
    render(<BookingCalculator {...DEFAULT_PROPS} />);
    fireEvent.click(screen.getByText('Select Dates & Book'));
    expect(screen.getByText('Your ride')).toBeInTheDocument();
  });

  it('modal shows car brand and model', () => {
    render(<BookingCalculator {...DEFAULT_PROPS} />);
    fireEvent.click(screen.getByText('Select Dates & Book'));
    expect(screen.getByText('Lamborghini Huracan')).toBeInTheDocument();
  });

  it('Book Now button in modal is disabled when no dates selected', () => {
    render(<BookingCalculator {...DEFAULT_PROPS} />);
    fireEvent.click(screen.getByText('Select Dates & Book'));
    expect(screen.getByText('Book Now')).toBeDisabled();
  });
});
