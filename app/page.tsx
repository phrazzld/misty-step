import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image 
              src="/images/logo.svg" 
              alt="Misty Step Logo" 
              width={40} 
              height={40} 
              className="rounded-md"
            />
            <span className="font-bold text-xl">Misty Step</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-foreground/80 hover:text-foreground transition">Features</a>
            <a href="#solutions" className="text-foreground/80 hover:text-foreground transition">Solutions</a>
            <a href="#about" className="text-foreground/80 hover:text-foreground transition">About</a>
            <a href="#contact" className="text-foreground/80 hover:text-foreground transition">Contact</a>
          </nav>
          <a 
            href="#contact" 
            className="rounded-md bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 transition-colors"
          >
            Get Started
          </a>
        </div>
      </header>

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
            <a 
              href="#contact" 
              className="rounded-md bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 text-lg font-medium transition-colors"
            >
              Get Started
            </a>
            <a 
              href="#solutions" 
              className="rounded-md border border-border hover:bg-muted px-6 py-3 text-lg font-medium transition-colors"
            >
              Explore Solutions
            </a>
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
              <div key={index} className="bg-card p-6 rounded-lg border border-border hover:shadow-md transition-shadow">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-foreground/70">{feature.description}</p>
              </div>
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
              <div key={index} className="bg-card p-8 rounded-lg border border-border">
                <h3 className="text-2xl font-semibold mb-4">{solution.title}</h3>
                <p className="text-foreground/70 mb-6">{solution.description}</p>
                <ul className="space-y-2">
                  {solution.points.map((point, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="text-primary">✓</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
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
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full p-3 rounded-md border border-input bg-background"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full p-3 rounded-md border border-input bg-background"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block mb-2 text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full p-3 rounded-md border border-input bg-background"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
              </div>
              <button
                type="submit"
                className="w-full rounded-md bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 font-medium transition-colors"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-6 md:mb-0">
              <Image 
                src="/images/logo.svg" 
                alt="Misty Step Logo" 
                width={32} 
                height={32} 
                className="rounded-md"
              />
              <span className="font-bold">Misty Step</span>
            </div>
            <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-sm text-foreground/70">
              <a href="#features" className="hover:text-foreground transition">Features</a>
              <a href="#solutions" className="hover:text-foreground transition">Solutions</a>
              <a href="#about" className="hover:text-foreground transition">About</a>
              <a href="#contact" className="hover:text-foreground transition">Contact</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-foreground/50">
            © {new Date().getFullYear()} Misty Step. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}