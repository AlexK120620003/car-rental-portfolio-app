'use client';
import { useState, useEffect, useCallback } from 'react';
import { createBooking } from '../lib/actions';
import {
  getDaysInMonth,
  calculateTotalDays,
  calculateTotalPrice,
} from '../lib/unit';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  pricePerDay: number;
  carId: string;
  carBrand: string;
  carModel: string;
  carImage: string;
}

const TIME_SLOTS = [
  '8:00 am',
  '9:00 am',
  '10:00 am',
  '11:00 am',
  '12:00 pm',
  '1:00 pm',
  '2:00 pm',
  '3:00 pm',
  '4:00 pm',
  '5:00 pm',
  '6:00 pm',
];

function isSameDay(a: Date | null, b: Date | null): boolean {
  if (!a || !b) return false;
  return a.toDateString() === b.toDateString();
}

function isPast(day: Date): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return day < today;
}

function isToday(day: Date): boolean {
  return isSameDay(day, new Date());
}

function fmtShort(d: Date) {
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function fmtMonthYear(d: Date) {
  return d.toLocaleString('en-US', { month: 'long', year: 'numeric' });
}

/* ─── Left Info Panel ─── */
function InfoPanel({
  carBrand,
  carModel,
  carImage,
  pricePerDay,
  startDate,
  endDate,
  pickupTime,
  returnTime,
}: {
  carBrand: string;
  carModel: string;
  carImage: string;
  pricePerDay: number;
  startDate: Date | null;
  endDate: Date | null;
  pickupTime: string | null;
  returnTime: string | null;
}) {
  const totalDays = calculateTotalDays(startDate, endDate);
  const totalPrice = calculateTotalPrice(totalDays, pricePerDay);

  return (
    <div className='flex flex-col gap-5 border-b border-border p-4 lg:w-64 lg:flex-shrink-0 lg:gap-5 lg:border-b-0 lg:border-r lg:p-6'>
      {/* Car thumbnail */}
      <div className='overflow-hidden rounded-xl'>
        <img
          src={carImage}
          alt={`${carBrand} ${carModel}`}
          className='h-36 w-full object-cover'
        />
      </div>

      <div>
        <p className='text-xs font-semibold uppercase tracking-widest text-muted'>
          Your ride
        </p>
        <h3 className='mt-1 text-lg font-bold text-foreground'>
          {carBrand} {carModel}
        </h3>
        <div className='mt-1 flex items-baseline gap-1'>
          <span className='text-xl font-bold text-accent'>${pricePerDay}</span>
          <span className='text-sm text-muted'>/ day</span>
        </div>
      </div>

      <div className='h-px bg-border' />

      {/* Features list */}
      <ul className='flex flex-col gap-3 text-sm text-muted'>
        {[
          { icon: '🚗', text: 'Premium fleet vehicle' },
          { icon: '📍', text: 'City & airport pickup' },
          { icon: '🕐', text: 'Free cancellation 24h prior' },
        ].map(({ icon, text }) => (
          <li key={text} className='flex items-center gap-2'>
            <span>{icon}</span>
            <span>{text}</span>
          </li>
        ))}
      </ul>

      {/* Summary — appears once dates selected */}
      {totalDays > 0 && (
        <>
          <div className='h-px bg-border' />
          <div className='flex items-center gap-2'>
            <span className='rounded-full bg-[var(--accent)]/10 px-3 py-1 text-xs font-semibold text-accent'>
              {totalDays} day{totalDays > 1 ? 's' : ''}
            </span>
            {startDate && endDate && (
              <span className='text-xs text-muted'>
                {fmtShort(startDate)} – {fmtShort(endDate)}
              </span>
            )}
          </div>
          <div className='rounded-xl bg-surface-alt p-4 text-sm'>
            <div className='mb-2 flex justify-between text-muted'>
              <span>Duration</span>
              <span className='font-medium text-foreground'>
                {totalDays} day{totalDays > 1 ? 's' : ''}
              </span>
            </div>
            <div className='mb-2 flex justify-between text-muted'>
              <span>Pick-up</span>
              <span className='text-foreground'>
                {startDate && fmtShort(startDate)}
                {pickupTime ? `, ${pickupTime}` : ''}
              </span>
            </div>
            <div className='mb-3 flex justify-between text-muted'>
              <span>Return</span>
              <span className='text-foreground'>
                {endDate && fmtShort(endDate)}
                {returnTime ? `, ${returnTime}` : ''}
              </span>
            </div>
            <div className='flex justify-between border-t border-border pt-3'>
              <span className='font-semibold text-foreground'>Total</span>
              <span className='text-lg font-bold text-accent'>
                ${totalPrice.toLocaleString()}
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

/* ─── Center Calendar Panel ─── */
function CalendarPanel({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}: {
  startDate: Date | null;
  endDate: Date | null;
  setStartDate: (d: Date | null) => void;
  setEndDate: (d: Date | null) => void;
}) {
  const today = new Date();
  const [month, setMonth] = useState(
    new Date(today.getFullYear(), today.getMonth())
  );
  const [hover, setHover] = useState<Date | null>(null);

  const nextMonth = new Date(month.getFullYear(), month.getMonth() + 1);
  const days = getDaysInMonth(month);
  const nextDays = getDaysInMonth(nextMonth);

  const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  function handleClick(day: Date) {
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

  function isInRange(day: Date): boolean {
    const rangeEnd = endDate ?? (startDate ? hover : null);
    return !!(startDate && rangeEnd && day > startDate && day < rangeEnd);
  }

  function MonthGrid({ m, daysArr }: { m: Date; daysArr: (Date | null)[] }) {
    return (
      <div className='min-w-[260px] flex-1'>
        <p className='mb-4 text-center text-sm font-semibold text-foreground'>
          {fmtMonthYear(m)}
        </p>
        <div className='mb-2 grid grid-cols-7 text-center'>
          {weekDays.map(d => (
            <span
              key={d}
              className='pb-1 text-[10px] font-semibold uppercase tracking-wider text-muted'
            >
              {d}
            </span>
          ))}
        </div>
        <div className='grid grid-cols-7 gap-[3px]'>
          {daysArr.map((day, i) => {
            if (!day) return <div key={i} />;
            const isStart = isSameDay(day, startDate);
            const isEnd = isSameDay(day, endDate);
            const inRange = isInRange(day);
            const past = isPast(day);
            const todayFlag = isToday(day);
            const active = isStart || isEnd;

            return (
              <button
                key={i}
                disabled={past}
                onClick={() => !past && handleClick(day)}
                onMouseEnter={() => !past && setHover(day)}
                onMouseLeave={() => setHover(null)}
                style={{
                  borderRadius: isStart
                    ? '10px 3px 3px 10px'
                    : isEnd
                      ? '3px 10px 10px 3px'
                      : inRange
                        ? '3px'
                        : '10px',
                  background: active
                    ? 'var(--accent)'
                    : inRange
                      ? 'color-mix(in srgb, var(--accent) 15%, transparent)'
                      : 'transparent',
                  color: active
                    ? '#fff'
                    : past
                      ? 'var(--border)'
                      : inRange
                        ? 'var(--accent)'
                        : todayFlag
                          ? 'var(--accent)'
                          : 'var(--foreground)',
                }}
                className={[
                  'relative flex aspect-square w-full items-center justify-center text-sm transition-all duration-100',
                  !active && !inRange && !past ? 'hover:bg-surface-alt' : '',
                  past ? 'cursor-default' : 'cursor-pointer',
                  active ? 'font-bold' : '',
                ].join(' ')}
              >
                {day.getDate()}
                {todayFlag && !active && (
                  <span className='absolute bottom-1 left-1/2 h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-accent' />
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-1 flex-col p-6'>
      {/* Navigation */}
      <div className='mb-6 flex items-center justify-between'>
        <button
          onClick={() =>
            setMonth(new Date(month.getFullYear(), month.getMonth() - 1))
          }
          className='flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:border-accent hover:text-accent'
        >
          <svg
            width='16'
            height='16'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2.5'
            strokeLinecap='round'
          >
            <polyline points='15 18 9 12 15 6' />
          </svg>
        </button>
        <span className='text-base font-semibold text-foreground'>
          <span className='lg:hidden'>{fmtMonthYear(month)}</span>
          <span className='hidden lg:inline'>
            {fmtMonthYear(month)} – {fmtMonthYear(nextMonth)}
          </span>
        </span>
        <button
          onClick={() =>
            setMonth(new Date(month.getFullYear(), month.getMonth() + 1))
          }
          className='flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:border-accent hover:text-accent'
        >
          <svg
            width='16'
            height='16'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2.5'
            strokeLinecap='round'
          >
            <polyline points='9 6 15 12 9 18' />
          </svg>
        </button>
      </div>

      {/* Two-month grid */}
      <div className='flex gap-8'>
        <MonthGrid m={month} daysArr={days} />
        <div className='hidden lg:contents'>
          <MonthGrid m={nextMonth} daysArr={nextDays} />
        </div>
      </div>

      {startDate && !endDate && (
        <p className='mt-4 text-center text-xs text-muted'>
          Select your return date
        </p>
      )}
    </div>
  );
}

/* ─── Right Time Slots Panel ─── */
function TimeSlotsPanel({
  selectedDate,
  pickupTime,
  setPickupTime,
  returnTime,
  setReturnTime,
  mode,
  setMode,
  canConfirm,
  carId,
  startDate,
  endDate,
  totalPrice,
  onSuccess,
}: {
  selectedDate: Date | null;
  pickupTime: string | null;
  setPickupTime: (t: string) => void;
  returnTime: string | null;
  setReturnTime: (t: string) => void;
  mode: 'pickup' | 'return';
  setMode: (m: 'pickup' | 'return') => void;
  canConfirm: boolean;
  carId: string;
  startDate: Date | null;
  endDate: Date | null;
  totalPrice: number;
  onSuccess: () => void;
}) {
  const activeTime = mode === 'pickup' ? pickupTime : returnTime;
  const setActiveTime = mode === 'pickup' ? setPickupTime : setReturnTime;

  async function handleBooking() {
    if (!canConfirm || !startDate || !endDate) return;
    const fd = new FormData();
    fd.append('id', carId);
    fd.append('startDate', startDate.toISOString());
    fd.append('endDate', endDate.toISOString());
    fd.append('totalPrice', String(totalPrice));
    await createBooking(fd);
    onSuccess();
  }

  return (
    <div className='flex w-full flex-shrink-0 flex-col gap-4 border-t border-border p-4 lg:w-52 lg:border-l lg:border-t-0 lg:p-5'>
      {selectedDate ? (
        <>
          <div>
            <p className='text-base font-bold text-foreground'>
              {selectedDate.toLocaleDateString('en-US', { weekday: 'short' })}{' '}
              {selectedDate.getDate()}
            </p>
            <p className='text-xs text-muted'>
              {selectedDate.toLocaleString('en-US', {
                month: 'long',
                year: 'numeric',
              })}
            </p>
          </div>

          {/* Pickup / Return toggle */}
          <div className='flex overflow-hidden rounded-lg border border-border text-xs font-semibold'>
            {(['pickup', 'return'] as const).map(m => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={[
                  'flex-1 py-2 transition-colors',
                  mode === m
                    ? 'bg-surface-alt text-foreground'
                    : 'text-muted hover:text-foreground',
                ].join(' ')}
              >
                {m === 'pickup' ? 'Pick-up' : 'Return'}
              </button>
            ))}
          </div>

          {/* Time slots */}
          <div className='flex flex-1 flex-col gap-1.5 overflow-y-auto pr-1'>
            {TIME_SLOTS.map(slot => {
              const active = activeTime === slot;
              return (
                <button
                  key={slot}
                  onClick={() => setActiveTime(slot)}
                  className={[
                    'w-full rounded-lg border py-2.5 text-sm transition-all',
                    active
                      ? 'border-accent bg-accent font-semibold text-white'
                      : 'border-border bg-surface-alt text-foreground hover:border-accent',
                  ].join(' ')}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </>
      ) : (
        <div className='flex flex-1 items-center justify-center text-center'>
          <p className='text-xs leading-relaxed text-muted'>
            Select a date on the calendar to see available times
          </p>
        </div>
      )}

      {/* Confirm button */}
      <form action={handleBooking}>
        <button
          type='submit'
          disabled={!canConfirm}
          className={[
            'flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold transition-all',
            canConfirm
              ? 'bg-accent text-white hover:bg-accent-hover'
              : 'cursor-default bg-border text-muted',
          ].join(' ')}
        >
          <svg
            width='16'
            height='16'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2.5'
            strokeLinecap='round'
          >
            <polyline points='20 6 9 17 4 12' />
          </svg>
          Book Now
          <svg
            width='14'
            height='14'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
          >
            <line x1='5' y1='12' x2='19' y2='12' />
            <polyline points='14 7 19 12 14 17' />
          </svg>
        </button>
      </form>
    </div>
  );
}

/* ─── Confirmation Screen ─── */
function ConfirmationScreen({ onClose }: { onClose: () => void }) {
  return (
    <div className='flex flex-1 flex-col items-center justify-center p-10 text-center'>
      <div className='mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--accent)]/10'>
        <svg
          width='32'
          height='32'
          viewBox='0 0 24 24'
          fill='none'
          stroke='var(--accent)'
          strokeWidth='2.5'
          strokeLinecap='round'
        >
          <polyline points='20 6 9 17 4 12' />
        </svg>
      </div>
      <h2 className='mb-2 text-2xl font-bold text-foreground'>
        Booking Confirmed!
      </h2>
      <p className='mb-6 max-w-xs text-sm leading-relaxed text-muted'>
        Your rental is set. You can view it in your bookings dashboard.
      </p>
      <button
        onClick={onClose}
        className='rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-85'
      >
        View My Bookings
      </button>
    </div>
  );
}

/* ─── Main Modal ─── */
export default function BookingModal({
  isOpen,
  onClose,
  pricePerDay,
  carId,
  carBrand,
  carModel,
  carImage,
}: BookingModalProps) {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [pickupTime, setPickupTime] = useState<string | null>(null);
  const [returnTime, setReturnTime] = useState<string | null>(null);
  const [timeMode, setTimeMode] = useState<'pickup' | 'return'>('pickup');
  const [confirmed, setConfirmed] = useState(false);

  const totalDays = calculateTotalDays(startDate, endDate);
  const totalPrice = calculateTotalPrice(totalDays, pricePerDay);
  const canConfirm = !!(startDate && endDate && pickupTime && returnTime);
  const slotDate = timeMode === 'pickup' ? startDate : endDate;

  const handleClose = useCallback(() => {
    onClose();
    setTimeout(() => {
      setStartDate(null);
      setEndDate(null);
      setPickupTime(null);
      setReturnTime(null);
      setTimeMode('pickup');
      setConfirmed(false);
    }, 300);
  }, [onClose]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    if (isOpen) document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, handleClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className='fixed inset-0 z-[200] flex items-center justify-center p-4'
      style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(6px)' }}
      onClick={handleClose}
    >
      <div
        className='animate-scale-in relative flex max-h-[90vh] w-full max-w-5xl flex-col overflow-y-auto rounded-2xl border border-border bg-surface shadow-2xl lg:min-h-[540px] lg:flex-row lg:overflow-hidden'
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className='absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-lg bg-surface-alt text-muted transition-colors hover:text-foreground'
        >
          <svg
            width='14'
            height='14'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2.5'
            strokeLinecap='round'
          >
            <path d='M18 6L6 18M6 6l12 12' />
          </svg>
        </button>

        {confirmed ? (
          <ConfirmationScreen
            onClose={() => {
              handleClose();
              window.location.href = '/dashboard/bookings';
            }}
          />
        ) : (
          <>
            {/* Left: info */}
            <InfoPanel
              carBrand={carBrand}
              carModel={carModel}
              carImage={carImage}
              pricePerDay={pricePerDay}
              startDate={startDate}
              endDate={endDate}
              pickupTime={pickupTime}
              returnTime={returnTime}
            />

            {/* Center: calendar */}
            <div className='flex-1 lg:overflow-y-auto'>
              <CalendarPanel
                startDate={startDate}
                endDate={endDate}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
              />
            </div>

            {/* Right: time slots */}
            <TimeSlotsPanel
              selectedDate={slotDate}
              pickupTime={pickupTime}
              setPickupTime={setPickupTime}
              returnTime={returnTime}
              setReturnTime={setReturnTime}
              mode={timeMode}
              setMode={setTimeMode}
              canConfirm={canConfirm}
              carId={carId}
              startDate={startDate}
              endDate={endDate}
              totalPrice={totalPrice}
              onSuccess={() => setConfirmed(true)}
            />
          </>
        )}
      </div>
    </div>
  );
}
