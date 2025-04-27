import { Card } from "@/components/ui/card";
import { coreServices } from "@/lib/content/services";

export function Services(): React.JSX.Element {
  return (
    <section id="services" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {coreServices.map((service) => (
            <Card key={service.id}>{/* Card content will be added in T013 */}</Card>
          ))}
        </div>
      </div>
    </section>
  );
}
