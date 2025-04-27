import { Contact } from "@/components/contact";
import { Hero } from "@/components/hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function Home(): React.JSX.Element {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <Hero />

      {/* About */}
      <section id="about" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">About Misty Step</h2>
            <p className="text-foreground/70 mb-6">
              Founded in 2023, Misty Step is dedicated to helping businesses harness the power of
              technology to achieve their goals. Our team of experts combines deep technical
              knowledge with business acumen to deliver solutions that drive growth and efficiency.
            </p>
            <p className="text-foreground/70">
              We believe in partnering with our clients to understand their unique challenges and
              opportunities, enabling us to provide tailored solutions that deliver real value.
            </p>
          </div>
        </div>
      </section>

      <Contact />

      <SiteFooter />
    </div>
  );
}
