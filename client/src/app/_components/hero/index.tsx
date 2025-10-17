import CardsContainer from "./components/cards-container";
import Header from "./components/header";

export default function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="flex h-[747px] flex-col justify-center space-y-8 bg-[url('/images/hero-background.png')] bg-cover dark:bg-gray-900 dark:bg-none"
      style={{ backgroundPosition: "center calc(50% + 100px)" }}
    >
      <Header />
      <CardsContainer />
    </section>
  );
}
