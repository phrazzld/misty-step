import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      {/* Hero Section */}
      <section className="flex-grow flex items-center justify-center bg-gradient-to-b from-background to-accent/10 py-20">
        <div className="container mx-auto px-4 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Teleport Your Business <span className="text-primary">Into The Future</span>
          </h1>
          <p className="text-foreground/70 text-xl max-w-2xl mb-10">
            Innovative technology solutions that help modern businesses achieve digital transformation quickly and efficiently.
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

      {/* Features */}
      <section id="features" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Our Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Cloud Infrastructure",
                description: "Scalable and secure cloud solutions tailored to your business needs.",
                icon: "🚀"
              },
              {
                title: "AI Integration",
                description: "Leverage artificial intelligence to automate processes and gain insights.",
                icon: "🧠"
              },
              {
                title: "Cyber Security",
                description: "Protect your business with our advanced security protocols and monitoring.",
                icon: "🔒"
              }
            ].map((feature, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                  <CardDescription className="text-foreground/70">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

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

      {/* Contact */}
      <section id="contact" className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Get In Touch</h2>
          <div className="max-w-md mx-auto">
            <div className="bg-background p-8 rounded-lg border border-border">
              <div className="grid gap-4 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    Name
                  </Label>
                  <Input
                    type="text"
                    id="name"
                    placeholder="Your name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    rows={4}
                    placeholder="How can we help you?"
                  />
                </div>
              </div>
              <Button type="submit" size="lg" className="w-full">
                Send Message
              </Button>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}