import CardsContainer from "./components/cards-container";
import Header from "./components/header";

export default function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="flex flex-col items-center justify-center space-y-8 bg-[url('/images/hero-background-mobile.png')] bg-cover bg-top px-4 py-8 md:bg-[url('/images/hero-background.png')] md:py-9 lg:min-h-[678px] lg:px-0 lg:[background-position:center_calc(50%_+_100px)] dark:bg-gray-900 dark:bg-none"
    >
      <Header />
      <CardsContainer />
    </section>
  );
}
