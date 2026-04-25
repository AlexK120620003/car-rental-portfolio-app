'use client';
import { useState, useMemo } from 'react';
import CarCard from './CarCard';
import type { Car } from '../lib/types';
import { Category } from '../lib/types';

const CATEGORIES = Object.values(Category);
const ALL = 'ALL';

const SearchIcon = () => (
  <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round'>
    <circle cx='11' cy='11' r='8'/><line x1='21' y1='21' x2='16.65' y2='16.65'/>
  </svg>
);

export default function CatalogClient({ cars }: { cars: Car[] }) {
  const [category, setCategory] = useState<string>(ALL);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('default');

  const filtered = useMemo(() => {
    let list = [...cars];
    if (category !== ALL) list = list.filter(c => c.category === category);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(c => `${c.brand} ${c.model}`.toLowerCase().includes(q));
    }
    if (sort === 'price-low') list.sort((a, b) => a.pricePerDay - b.pricePerDay);
    if (sort === 'price-high') list.sort((a, b) => b.pricePerDay - a.pricePerDay);
    return list;
  }, [cars, category, search, sort]);

  return (
    <div>
      {/* Category pills */}
      <div className='mb-4 flex flex-wrap gap-2'>
        <button
          onClick={() => setCategory(ALL)}
          className={[
            'rounded-full px-5 py-2 text-sm font-semibold transition-all',
            category === ALL
              ? 'bg-accent text-white'
              : 'border border-border text-muted hover:border-accent hover:text-foreground',
          ].join(' ')}
        >
          All Cars
        </button>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={[
              'rounded-full px-5 py-2 text-sm font-semibold transition-all',
              category === cat
                ? 'bg-accent text-white'
                : 'border border-border text-muted hover:border-accent hover:text-foreground',
            ].join(' ')}
          >
            {cat.charAt(0) + cat.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      {/* Search + sort row */}
      <div className='mb-8 flex flex-wrap items-center gap-3'>
        <div className='relative'>
          <span className='absolute left-3 top-1/2 -translate-y-1/2 text-muted'>
            <SearchIcon />
          </span>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder='Search by brand or model...'
            className='h-10 w-64 rounded-xl border border-border bg-surface-alt pl-9 pr-4 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none'
          />
        </div>

        <select
          value={sort}
          onChange={e => setSort(e.target.value)}
          className='h-10 rounded-xl border border-border bg-surface-alt px-4 text-sm text-foreground focus:border-accent focus:outline-none'
        >
          <option value='default'>Sort by</option>
          <option value='price-low'>Price: Low → High</option>
          <option value='price-high'>Price: High → Low</option>
        </select>
      </div>

      {/* Count */}
      <p className='mb-6 text-sm text-muted'>
        Showing{' '}
        <span className='font-semibold text-foreground'>{filtered.length}</span>{' '}
        car{filtered.length !== 1 ? 's' : ''}
        {category !== ALL && (
          <>
            {' '}in{' '}
            <span className='font-semibold text-accent'>
              {category.charAt(0) + category.slice(1).toLowerCase()}
            </span>
          </>
        )}
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {filtered.map(car => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      ) : (
        <div className='py-20 text-center'>
          <p className='text-lg font-semibold text-foreground'>No cars found</p>
          <p className='mt-2 text-sm text-muted'>Try adjusting your filters</p>
        </div>
      )}
    </div>
  );
}
