export const dynamic = 'force-dynamic';
import Hero from './components/Hero';
import FeaturedCars from './components/FeaturedCars';
import ComfortSection from './components/ComfortSection';
import ReviewsSection from './components/ReviewsSection';
import CTASection from './components/CTASection';
import { getCars } from './lib/cars';

export default async function Home() {
  const cars = await getCars();
  const featured = cars.slice(0, 4);

  return (
    <>
      <Hero />
      <FeaturedCars cars={featured} />
      <ComfortSection />
      <ReviewsSection />
      <CTASection />
    </>
  );
}
