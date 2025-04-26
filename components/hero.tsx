import { Button } from "@/components/ui/button";

export function Hero(): React.JSX.Element {
  return (
    <section className="flex-grow flex items-center justify-center bg-gradient-to-b from-background to-accent/10 py-20">
      <div className="container mx-auto px-4 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          Teleport Your Business <span className="text-primary">Into The Future</span>
        </h1>
        <p className="text-foreground/70 text-xl max-w-2xl mb-10">
          Innovative technology solutions that help modern businesses achieve digital transformation
          quickly and efficiently.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg">
            <a href="#contact">Get Started</a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href="#solutions">Explore Solutions</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
