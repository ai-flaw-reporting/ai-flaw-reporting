import HeroHeader from "./components/header";

export default function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="bg-[#F2F4F7] bg-[url('/images/hero-background-mobile.png')] bg-cover bg-top md:bg-[url('/images/hero-background.png')] dark:bg-gray-900 dark:bg-none"
    >
      <div className="mx-auto flex max-w-[1440px] items-center px-6 py-20 lg:min-h-[678px] lg:px-21 lg:py-24">
        <HeroHeader />
      </div>
    </section>
  );
}
