'use client';
import { useRouter, usePathname } from 'next/navigation';
import { Category } from '../lib/types';

interface CategoryFilterProps {
  activeCategory?: Category;
}

export default function CategoryFilter({
  activeCategory,
}: CategoryFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const categories = Object.values(Category);

  function handleClick(category: Category | null) {
    const params = new URLSearchParams();

    if (!category || category === activeCategory) {
      params.delete('category');
    } else {
      params.set('category', category);
    }
    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className='flex gap-2 flex-wrap'>
      {categories.map(category => (
        <button
          key={category}
          onClick={() => handleClick(category)}
          className={`px-4 py-2 rounded-full border transition-colors ${
            category === activeCategory
              ? 'bg-black text-white'
              : 'bg-white text-black hover:bg-gray-100'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
