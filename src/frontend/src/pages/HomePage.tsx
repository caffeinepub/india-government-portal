import HeroSection from '../components/home/HeroSection';
import FeaturedUpdates from '../components/home/FeaturedUpdates';

export default function HomePage() {
  return (
    <div className="w-full">
      <HeroSection />
      <FeaturedUpdates />
    </div>
  );
}
