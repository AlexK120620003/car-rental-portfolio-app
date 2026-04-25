export const dynamic = 'force-dynamic';
import { getCarById } from '@/app/lib/cars';
import { notFound } from 'next/navigation';
import BookingCalculator from '@/app/components/BookingCalculator';
import CarGallery from '@/app/components/CarGallery';
import type { Metadata } from 'next';

interface CarPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: CarPageProps): Promise<Metadata> {
  const { id } = await params;
  const car = await getCarById(id);
  if (!car) return { title: 'Car not found' };
  return {
    title: `${car.brand} ${car.model} - Rentola`,
    description: car.description,
  };
}

const categoryColors: Record<string, string> = {
  LUXURY:    'text-yellow-400 bg-yellow-400/10',
  SUPERCAR:  'text-red-400 bg-red-400/10',
  ELECTRIC:  'text-green-400 bg-green-400/10',
  SPORT:     'text-blue-400 bg-blue-400/10',
  SPORTS:    'text-blue-400 bg-blue-400/10',
  SUV:       'text-purple-400 bg-purple-400/10',
  SEDAN:     'text-muted bg-surface-alt',
  CHAUFFEUR: 'text-accent bg-accent/10',
};

const StarIcon = () => (
  <svg width='14' height='14' viewBox='0 0 24 24' fill='#FFB800' stroke='none'>
    <polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2'/>
  </svg>
);
const CheckIcon = () => (
  <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round'>
    <polyline points='20 6 9 17 4 12'/>
  </svg>
);

const SpeedIcon = () => (
  <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round'>
    <circle cx='12' cy='12' r='10'/><polyline points='12 6 12 12 16 10'/>
  </svg>
);
const FuelIcon = () => (
  <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round'>
    <path d='M3 22V4a2 2 0 012-2h8a2 2 0 012 2v18'/><path d='M15 10h2a2 2 0 012 2v2a2 2 0 002 2'/><path d='M7 10h4'/>
  </svg>
);
const SeatIcon = () => (
  <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round'>
    <path d='M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2'/><circle cx='12' cy='7' r='4'/>
  </svg>
);
const GearIcon = () => (
  <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round'>
    <circle cx='12' cy='12' r='3'/>
    <path d='M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z'/>
  </svg>
);

const FEATURES = [
  'GPS Navigation',
  'Bluetooth Audio',
  'Climate Control',
  'Parking Sensors',
  'Leather Seats',
  'Keyless Entry',
];

export default async function CarPage({ params }: CarPageProps) {
  const { id } = await params;
  const car = await getCarById(id);
  if (!car) notFound();

  const catClass = categoryColors[car.category] ?? 'text-muted bg-surface-alt';

  // Specs derived from category since DB has no separate fields
  const specs = [
    { icon: <SpeedIcon />, label: 'Category', value: car.category.charAt(0) + car.category.slice(1).toLowerCase() },
    { icon: <FuelIcon />,  label: 'Year',     value: String(car.year) },
    { icon: <SeatIcon />,  label: 'Status',   value: car.available ? 'Available' : 'Unavailable' },
    { icon: <GearIcon />,  label: 'Pricing',  value: `$${car.pricePerDay} / day` },
  ];

  return (
    <div className='min-h-screen bg-background pt-20 pb-20'>
      <div className='mx-auto max-w-7xl px-6'>
        <div className='grid gap-10 lg:grid-cols-[1fr_380px]'>

          {/* ── Left column ── */}
          <div>
            {/* Gallery */}
            <CarGallery image={car.image} alt={`${car.brand} ${car.model}`} />

            {/* Meta row */}
            <div className='mt-6 flex flex-wrap items-center gap-3'>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${catClass}`}>
                {car.category}
              </span>
              <span className='flex items-center gap-1.5 text-sm text-muted'>
                <StarIcon /> 4.9 <span className='text-muted/60'>(47 reviews)</span>
              </span>
              {!car.available && (
                <span className='rounded-full bg-red-soft px-3 py-1 text-xs font-semibold text-red'>
                  Unavailable
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className='mt-3 text-4xl font-extrabold text-foreground md:text-5xl'>
              {car.brand} {car.model}
            </h1>
            <p className='mt-1 text-lg text-muted'>{car.year}</p>

            {/* Price */}
            <div className='mt-4 flex items-baseline gap-2'>
              <span className='text-4xl font-extrabold text-accent'>${car.pricePerDay}</span>
              <span className='text-muted'>/ day</span>
            </div>

            {/* Description */}
            <p className='mt-6 max-w-xl leading-relaxed text-muted'>{car.description}</p>

            {/* Specifications */}
            <h2 className='mt-10 mb-4 text-lg font-bold text-foreground'>Specifications</h2>
            <div className='grid grid-cols-2 gap-3 sm:grid-cols-4'>
              {specs.map((s, i) => (
                <div
                  key={i}
                  className='flex items-center gap-3 rounded-2xl border border-border bg-surface p-4'
                >
                  <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent'>
                    {s.icon}
                  </div>
                  <div>
                    <p className='text-xs text-muted'>{s.label}</p>
                    <p className='text-sm font-semibold text-foreground'>{s.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Features */}
            <h2 className='mt-10 mb-4 text-lg font-bold text-foreground'>Features</h2>
            <div className='grid grid-cols-2 gap-3 sm:grid-cols-3'>
              {FEATURES.map(f => (
                <div key={f} className='flex items-center gap-2.5 text-sm text-foreground'>
                  <span className='text-green'>
                    <CheckIcon />
                  </span>
                  {f}
                </div>
              ))}
            </div>
          </div>

          {/* ── Right column — sticky booking panel ── */}
          <div className='lg:sticky lg:top-24 lg:self-start'>
            <BookingCalculator
              pricePerDay={car.pricePerDay}
              carId={car.id}
              carBrand={car.brand}
              carModel={car.model}
              carImage={car.image}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
