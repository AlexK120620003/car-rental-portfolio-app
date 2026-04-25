'use client';
import { useState } from 'react';
import BookingModal from './BookingModal';

interface BookingCalculatorProps {
  pricePerDay: number;
  carId: string;
  carBrand: string;
  carModel: string;
  carImage: string;
}

export default function BookingCalculator({
  pricePerDay,
  carId,
  carBrand,
  carModel,
  carImage,
}: BookingCalculatorProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className='mt-8 rounded-2xl border border-border bg-card p-6'>
        <h3 className='mb-2 text-lg font-semibold text-foreground'>Book This Car</h3>
        <p className='mb-5 text-sm text-muted'>
          Choose your pick-up and return dates, select a time, and confirm in seconds.
        </p>

        <div className='mb-5 flex flex-col gap-3 text-sm text-muted'>
          {[
            { icon: '📍', text: 'City center & airport pick-up' },
            { icon: '❌', text: 'Free cancellation 24h before' },
            { icon: '💳', text: 'No hidden fees — transparent pricing' },
          ].map(({ icon, text }) => (
            <div key={text} className='flex items-center gap-2'>
              <span>{icon}</span>
              <span>{text}</span>
            </div>
          ))}
        </div>

        <div className='flex items-baseline gap-2 mb-5'>
          <span className='text-2xl font-bold text-accent'>${pricePerDay}</span>
          <span className='text-sm text-muted'>/ day</span>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className='flex w-full items-center justify-center gap-2 rounded-xl bg-accent py-3.5 text-sm font-bold text-white transition-all hover:bg-accent-hover'
        >
          <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round'>
            <rect x='3' y='4' width='18' height='18' rx='2' />
            <line x1='16' y1='2' x2='16' y2='6' />
            <line x1='8' y1='2' x2='8' y2='6' />
            <line x1='3' y1='10' x2='21' y2='10' />
          </svg>
          Select Dates & Book
        </button>
      </div>

      <BookingModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        pricePerDay={pricePerDay}
        carId={carId}
        carBrand={carBrand}
        carModel={carModel}
        carImage={carImage}
      />
    </>
  );
}
