"use client"

import { useRouter, usePathname } from "next/navigation"
import { Category } from "../lib/types"

interface CategoryFilterProps {
  activeCategory?: Category
}

const categories: Array<{value: Category | null; label: string}> = [
  { value: null, label: "All" },
  { value: "SEDAN", label: "Sedan" },
  { value: "SUV", label: "SUV" },
  { value: "SPORTS", label: "Sports" },
  { value: "ELECTRIC", label: "Electric" },
  { value: "LUXURY", label: "Luxury" },
]

export default function CategoryFilter ({activeCategory}: CategoryFilterProps) {
  const router = useRouter()
  const pathname = usePathname()

  function handleClick(category:Category | null) {
    if (category === null){
      router.push(pathname)
      return
    }
    const params = new URLSearchParams()
    params.set("category", category)
    router.push(`${pathname}?${params.toString()}`)
  }

    return (
    <div className="flex flex-wrap gap-3">
      {categories.map((cat) => {
        const isActive =
          cat.value === null ? !activeCategory : activeCategory === cat.value;

        return (
          <button
            key={cat.label}
            onClick={() => handleClick(cat.value)}
            className={
              isActive
                ? "rounded-full bg-accent px-5 py-2 text-sm font-medium text-white transition-colors"
                : "rounded-full border border-border bg-surface px-5 py-2 text-sm font-medium text-muted transition-colors hover:border-accent hover:text-foreground"
            }
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}