'use client';
import { useState } from 'react';
interface BookingCalculatorProps {
  pricePerDay: number;
}

export default function BookingCalculator({
  pricePerDay,
}: BookingCalculatorProps) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const start = new Date(startDate);
  const end = new Date(endDate);
  const days =
    startDate && endDate
      ? Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
      : 0;

  const totalPrice = days > 0 ? days * pricePerDay : 0;

  return (
    <div className='mt-8 rounded-2xl border border-muted/20 bg-card p-6'>
      <h3 className='mb-4 text-lg font-semibold text-foreground'>
        Book This Car
      </h3>

      <div className='space-y-4'>
        <div>
          <label className='mb-1 block text-sm text-muted'>Start Date</label>
          <input
            type='date'
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            className='w-full rounded-lg border border-muted/30 bg-background px-4 py-2 text-foreground'
          />
        </div>

        <div>
          <label className='mb-1 block text-sm text-muted'>End Date</label>
          <input
            type='date'
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            className='w-full rounded-lg border border-muted/30 bg-background px-4 py-2 text-foreground'
          />
        </div>

        {days > 0 && (
          <div className='rounded-lg bg-background p-4'>
            <div className='flex justify-between text-sm text-muted'>
              <span>
                ${pricePerDay} × {days} days
              </span>
              <span className='text-lg font-bold text-accent'>
                ${totalPrice}
              </span>
            </div>
          </div>
        )}

        <button
          disabled={days <= 0}
          className='w-full rounded-lg bg-accent py-3 font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50'
        >
          Book Now
        </button>
      </div>
    </div>
  );
}
