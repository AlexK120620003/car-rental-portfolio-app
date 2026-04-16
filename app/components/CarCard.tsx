import Image from 'next/image'
import Link from 'next/link'
import type { Car } from "../lib/types";

interface CarCardProps {
car:Car
}

export default function CarCard({ car }: CarCardProps) {
  return (
    <Link
      href={`/cars/${car.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-colors hover:border-accent"
    >
      {/* Image container with fixed aspect ratio */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-background">
        <Image
          src={car.image}
          alt={`${car.brand} ${car.model}`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        {!car.available && (
          <span className="absolute left-3 top-3 rounded-full bg-background/80 px-3 py-1 text-xs font-medium text-muted backdrop-blur">
            Unavailable
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              {car.brand} {car.model}
            </h3>
            <p className="text-sm text-muted">{car.year}</p>
          </div>
          <span className="rounded-full border border-border px-3 py-1 text-xs uppercase tracking-wide text-muted">
            {car.category}
          </span>
        </div>

        <p className="line-clamp-2 text-sm text-muted">{car.description}</p>

        <div className="mt-auto flex items-end justify-between pt-2">
          <div>
            <span className="text-2xl font-bold text-foreground">
              ${car.pricePerDay}
            </span>
            <span className="text-sm text-muted"> / day</span>
          </div>
          <span className="text-sm font-medium text-accent">View →</span>
        </div>
      </div>
    </Link>
  );
}
