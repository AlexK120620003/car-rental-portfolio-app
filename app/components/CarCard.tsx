import Image from 'next/image';
import Link from 'next/link';
import type { Car } from '../lib/types';

const categoryColors: Record<string, string> = {
  LUXURY: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
  SUPERCAR: 'text-red-400 bg-red-400/10 border-red-400/20',
  ELECTRIC: 'text-green-400 bg-green-400/10 border-green-400/20',
  SPORT: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  SPORTS: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  SUV: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
  SEDAN: 'text-muted bg-surface-alt border-border',
  CHAUFFEUR: 'text-accent bg-accent/10 border-accent/20',
};

interface CarCardProps {
  car: Car;
}

export default function CarCard({ car }: CarCardProps) {
  const catClass =
    categoryColors[car.category] ?? 'text-muted bg-surface-alt border-border';

  return (
    <Link
      href={`/cars/${car.id}`}
      className='group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-xl hover:shadow-black/20'
    >
      {/* Image */}
      <div
        className='relative overflow-hidden'
        style={{ aspectRatio: '16/10' }}
      >
        {car.image ? (
          <Image
            src={car.image}
            alt={`${car.brand} ${car.model}`}
            fill
            className='object-cover transition-transform duration-500 group-hover:scale-105'
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw'
          />
        ) : (
          <div className='flex h-full w-full items-center justify-center bg-surface-alt'>
            <svg
              width='48'
              height='48'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='1'
              className='text-muted'
              aria-hidden='true'
            >
              <rect x='3' y='3' width='18' height='18' rx='2' />
              <circle cx='8.5' cy='8.5' r='1.5' />
              <polyline points='21 15 16 10 5 21' />
            </svg>
          </div>
        )}
        {!car.available && (
          <span className='absolute left-3 top-3 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white backdrop-blur'>
            Unavailable
          </span>
        )}
        <span className='absolute right-3 top-3 rounded-full bg-accent px-3 py-1 text-xs font-bold text-white'>
          ${car.pricePerDay}/day
        </span>
      </div>

      {/* Content */}
      <div className='flex flex-1 flex-col p-5'>
        <div className='flex items-start justify-between gap-2'>
          <div>
            <h3 className='text-base font-bold text-foreground transition-colors group-hover:text-accent'>
              {car.brand} {car.model}
            </h3>
            <p className='text-xs text-muted'>{car.year}</p>
          </div>
          <span
            className={`shrink-0 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${catClass}`}
          >
            {car.category}
          </span>
        </div>

        {car.description && (
          <p className='mt-3 line-clamp-2 text-xs leading-relaxed text-muted'>
            {car.description}
          </p>
        )}

        <div className='mt-auto flex items-center justify-between pt-4'>
          <div className='flex items-baseline gap-1'>
            <span className='text-xl font-extrabold text-foreground'>
              ${car.pricePerDay}
            </span>
            <span className='text-xs text-muted'>/ day</span>
          </div>
          <span className='flex items-center gap-1 text-xs font-semibold text-accent transition-all group-hover:gap-2'>
            View
            <svg
              width='12'
              height='12'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2.5'
              strokeLinecap='round'
            >
              <line x1='5' y1='12' x2='19' y2='12' />
              <polyline points='12 5 19 12 12 19' />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
