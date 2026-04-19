import { getCarById } from '@/app/lib/cars';
import { notFound } from 'next/navigation';
import BookingCalculator from '@/app/components/BookingCalculator';
import Image from 'next/image';
import type { Metadata } from 'next';

interface СarPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: СarPageProps): Promise<Metadata> {
  const { id } = await params;
  const car = await getCarById(id);

  if (!car) {
    return { title: 'Car not found' };
  }

  return {
    title: `${car.brand} ${car.model} - Rentola`,
    description: car.description,
  };
}

export default async function CarPage({ params }: СarPageProps) {
  const { id } = await params;
  const car = await getCarById(id);

  if (!car) {
    notFound();
  }

  return (
    <section className='bg-background py-16'>
      <div className='mx-auto max-w-7xl px-6'>
        <div className='grid gap-12 lg:grid-cols-2'>
          {/* Car image */}
          <div className='relative aspect-[16/10] w-full overflow-hidden bg-background'>
            <Image
              src={car.image}
              alt={`${car.brand} ${car.model}`}
              fill
              priority
              sizes='(min-width: 1024px) 50vw, 100vw'
              className='object-cover'
            />
          </div>

          {/* Car details */}
          <div>
            <span className='mb-2 inline-block rounded-full border border-muted/30 px-3 py-1 text-xs font-medium text-muted'>
              {car.category}
            </span>
            <h1 className='mt-2 text-4xl font-bold text-foreground'>
              {car.brand} {car.model}
            </h1>
            <p className='mt-1 text-lg text-muted'>{car.year}</p>
            <p className='mt-6 leading-relaxed text-muted'>{car.description}</p>

            <div className='mt-8 flex items-baseline gap-2'>
              <span className='text-4xl font-bold text-accent'>
                ${car.pricePerDay}
              </span>
              <span className='text-muted'>/ day</span>
            </div>

            {!car.available && (
              <p className='mt-4 font-medium text-red-500'>
                Currently unavailable
              </p>
            )}

            <BookingCalculator pricePerDay={car.pricePerDay} />
          </div>
        </div>
      </div>
    </section>
  );
}
