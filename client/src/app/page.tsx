import { ThemeToggle } from "~/components/theme-toggle";

export default function HomePage() {
  return (
    <main className="bg-background min-h-screen p-8">
      <div className="flex flex-col gap-2">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Landing Page</h1>
          <ThemeToggle />
        </div>
      </div>
    </main>
  );
}
