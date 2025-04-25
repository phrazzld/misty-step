import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { Contact } from "@/components/contact";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      
      <Hero />
      
      <Features />

      {/* Solutions */}
      <section id="solutions" className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-6">Solutions</h2>
          <p className="text-foreground/70 text-center max-w-2xl mx-auto mb-16">
            Tailored technology solutions for businesses of all sizes.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {[
              {
                title: "Digital Transformation",
                description: "Modernize your business with our comprehensive digital transformation strategies.",
                points: ["Legacy System Migration", "Process Automation", "Cloud Adoption"]
              },
              {
                title: "Data Analytics",
                description: "Turn your data into actionable insights with our advanced analytics solutions.",
                points: ["Real-time Dashboards", "Predictive Analytics", "Data Visualization"]
              }
            ].map((solution, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-2xl">{solution.title}</CardTitle>
                  <CardDescription className="text-foreground/70">{solution.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {solution.points.map((point, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="text-primary">✓</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">About Misty Step</h2>
            <p className="text-foreground/70 mb-6">
              Founded in 2023, Misty Step is dedicated to helping businesses harness the power of technology to achieve their goals. 
              Our team of experts combines deep technical knowledge with business acumen to deliver solutions that drive growth and efficiency.
            </p>
            <p className="text-foreground/70">
              We believe in partnering with our clients to understand their unique challenges and opportunities, 
              enabling us to provide tailored solutions that deliver real value.
            </p>
          </div>
        </div>
      </section>

      <Contact />

      <SiteFooter />
    </div>
  );
}