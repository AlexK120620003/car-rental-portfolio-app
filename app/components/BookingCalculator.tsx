'use client';
import { useState } from 'react';
import { createBooking } from '../lib/actions';

interface BookingCalculatorProps {
  pricePerDay: number;
  carId: string;
}

function getDaysInMonth(date: Date): (Date | null)[] {
  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const day: (Date | null)[] = [];

  for (let i = 0; i < firstDay.getDay(); i++) {
    day.push(null);
  }

  for (let d = 1; d <= lastDay.getDate(); d++) {
    day.push(new Date(year, month, d));
  }
  return day;
}

export default function BookingCalculator({
  pricePerDay,
  carId,
}: BookingCalculatorProps) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(
    new Date(today.getFullYear(), today.getMonth())
  );
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const days = getDaysInMonth(currentMonth);
  const totalDays =
    startDate && endDate
      ? Math.ceil(
          (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
        )
      : 0;

  const totalPrice = totalDays > 0 ? totalDays * pricePerDay : 0;

  function handleDateClick(day: Date) {
    if (!startDate || (startDate && endDate)) {
      setStartDate(day);
      setEndDate(null);
    } else if (day > startDate) {
      setEndDate(day);
    } else {
      setStartDate(day);
      setEndDate(null);
    }
  }

  function isSameDay(a: Date | null, b: Date | null): boolean {
    if (!a || !b) return false;
    return a.toDateString() === b.toDateString();
  }

  return (
    <div className='mt-8 rounded-2xl border border-muted/20 bg-card p-6'>
      <h3 className='mb-4 text-lg font-semibold text-foreground'>
        Book This Car
      </h3>

      {/* Month navigation */}
      <div className='mb-4 flex items-center justify-between'>
        <button
          onClick={() =>
            setCurrentMonth(
              new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
            )
          }
          className='rounded-lg px-3 py-1 text-muted hover:text-foreground'
        >
          &lt;
        </button>
        <span className='font-medium text-foreground'>
          {currentMonth.toLocaleString('en-US', {
            month: 'long',
            year: 'numeric',
          })}
        </span>
        <button
          onClick={() =>
            setCurrentMonth(
              new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
            )
          }
          className='rounded-lg px-3 py-1 text-muted hover:text-foreground'
        >
          &gt;
        </button>
      </div>

      {/* Day headers */}
      <div className='mb-2 grid grid-cols-7 text-center text-xs text-muted'>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
          <span key={d}>{d}</span>
        ))}
      </div>

      <div className='grid grid-cols-7 gap-1'>
        {days.map((day, index) => {
          if (day === null) return <div key={index} />;

          const isStart = isSameDay(day, startDate);
          const isEnd = isSameDay(day, endDate);

          const rangeEnd = endDate ?? (startDate ? hoverDate : null);

          const isInRange =
            startDate && rangeEnd ? day > startDate && day < rangeEnd : false;

          return (
            <button
              key={index}
              className={`rounded-lg py-2 text-sm ${
                isStart || isEnd
                  ? 'bg-accent text-white'
                  : isInRange
                    ? 'bg-accent/20 text-foreground'
                    : 'text-muted hover:bg-muted/10'
              }`}
              onClick={() => handleDateClick(day)}
              onMouseEnter={() => setHoverDate(day)}
              onMouseLeave={() => setHoverDate(null)}
            >
              {day.getDate()}
            </button>
          );
        })}
      </div>

      {totalDays > 0 && (
        <div className='mt-4 rounded-lg bg-background p-4'>
          <div className='flex justify-between text-sm text-muted'>
            <span>
              ${pricePerDay} × {totalDays} days
            </span>
            <span className='text-lg font-bold text-accent'>${totalPrice}</span>
          </div>
        </div>
      )}

      <form action={createBooking} className='mt-4'>
        <input type='hidden' name='id' value={carId} />
        <input
          type='hidden'
          name='startDate'
          value={startDate?.toISOString() ?? ''}
        />
        <input
          type='hidden'
          name='endDate'
          value={endDate?.toISOString() ?? ''}
        />
        <input type='hidden' name='totalPrice' value={totalPrice} />
        <button
          disabled={totalDays <= 0}
          className='w-full rounded-lg bg-accent py-3 font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50'
        >
          Book Now
        </button>
      </form>
    </div>
  );
}
