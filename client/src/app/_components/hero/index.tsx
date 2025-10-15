import CardsContainer from "./components/cards-container";
import Header from "./components/header";

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="flex h-[747px] flex-col justify-center space-y-8 bg-[url('/hero-background.png')] bg-cover"
      style={{ backgroundPosition: "center calc(50% + 100px)" }}
    >
      <Header />
      <CardsContainer />
    </section>
  );
}
