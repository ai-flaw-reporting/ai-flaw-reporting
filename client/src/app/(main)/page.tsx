import Hero from "./_components/hero";
import PartnersCarousel from "./_components/partners-carousel";

export default function HomePage() {
  return (
    <main className="flex-1 bg-[#F2F4F7] dark:bg-gray-900">
      <Hero />
      <PartnersCarousel />
    </main>
  );
}
