import {getCars} from '../lib/cars'
import { Category  }from '../lib/types'
import CarCard from '../components/CarCard'
import CategoryFilter from '../components/CategoryFilter'

interface CarPageProps {
  searchParams: Promise<{category?: string}>
}

function isValidCategory(value:string | undefined): value is Category {
  if(!value) return false
  return Object.values(Category).includes(value as  Category)
}

export default async function CarsPage({searchParams}: CarPageProps) {
  const {category} = await searchParams
  const validCategory = isValidCategory(category) ? category : undefined
  const cars = await getCars(validCategory)

  return (
  <section className="bg-background py-16">
    <div className="mx-auto max-w-7xl px-6">
      <div className="mb-12">
        <span className="mb-2 block text-sm font-medium uppercase tracking-widest text-accent">
          Our Fleet
        </span>
        <h1 className="text-4xl font-bold text-foreground md:text-5xl">
          Cars Collection
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          Browse our full collection of premium vehicles. Find the perfect
          car for your next trip.
        </p>
      </div>

      <CategoryFilter activeCategory={validCategory} />

      <p className="mb-8 mt-8 text-sm text-muted">
        Showing <span className="font-medium text-foreground">{cars.length}</span> cars
        {validCategory && (
          <>
            {" "}in <span className="font-medium text-accent">{validCategory}</span>
          </>
        )}
      </p>

      {cars.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {cars.map((car) => (
            <CarCard key={car.id} car={car}/>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted">No cars found in this category.</p>
      )}
    </div>
  </section>
)
}

