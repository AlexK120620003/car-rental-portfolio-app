import type { Car } from '../lib/types';
import CarCard from './CarCard';

interface FeaturedCarsProps {
  cars: Car[];
}

export default function FeaturedCars({ cars }: FeaturedCarsProps) {
  return (
    <section className='bg-background py-20'>
      <div className='mx-auto max-w-7xl px-6'>
        {/* Section header */}
        <div className='mb-12 flex items-end justify-between'>
          <div>
            <span className='mb-2 block text-sm font-medium uppercase tracking-widest text-accent'>
              Featured
            </span>
            <h2 className='text-3xl font-bold text-foreground md:text-4xl'>
              Popular Cars
            </h2>
          </div>
        </div>

        {/* Cards grid */}
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
          {cars.map(car => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    </section>
  );
}
