import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import BookingCalculator from '../app/components/BookingCalculator';

vi.mock('../app/lib/actions', () => ({
  createBooking: vi.fn(),
}));

describe('BookingCalculator', () => {
  it('renders Book This Car heading', () => {
    render(<BookingCalculator pricePerDay={80} carId='car-1' />);
    expect(screen.getByText('Book This Car')).toBeInTheDocument();
  });

  it('renders month navigation buttons', () => {
    render(<BookingCalculator pricePerDay={80} carId='car-1' />);
    expect(screen.getByText('<')).toBeInTheDocument();
    expect(screen.getByText('>')).toBeInTheDocument();
  });

  it('renders day headers', () => {
    render(<BookingCalculator pricePerDay={80} carId='car-1' />);
    expect(screen.getByText('Mon')).toBeInTheDocument();
    expect(screen.getByText('Sat')).toBeInTheDocument();
  });

  it('Book Now button is disabled when no dates selected', () => {
    render(<BookingCalculator pricePerDay={80} carId='car-1' />);
    expect(screen.getByText('Book Now')).toBeDisabled();
  });

  it('navigates to next month on > click', () => {
    render(<BookingCalculator pricePerDay={80} carId='car-1' />);
    const before = screen.getByText(/\w+ \d{4}/).textContent;
    fireEvent.click(screen.getByText('>'));
    const after = screen.getByText(/\w+ \d{4}/).textContent;
    expect(after).not.toBe(before);
  });

  it('enables Book Now after selecting start and end date', () => {
    render(<BookingCalculator pricePerDay={100} carId='car-1' />);
    const dayBtns = screen
      .getAllByRole('button')
      .filter(btn => /^\d+$/.test(btn.textContent ?? ''));
    fireEvent.click(dayBtns[0]);
    fireEvent.click(dayBtns[5]);
    expect(screen.getByText('Book Now')).not.toBeDisabled();
  });
});
