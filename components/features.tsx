import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";

export function Features() {
  return (
    <section id="features" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-16">Our Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Cloud Infrastructure",
              description: "Scalable and secure cloud solutions tailored to your business needs.",
              icon: "🚀",
            },
            {
              title: "AI Integration",
              description:
                "Leverage artificial intelligence to automate processes and gain insights.",
              icon: "🧠",
            },
            {
              title: "Cyber Security",
              description:
                "Protect your business with our advanced security protocols and monitoring.",
              icon: "🔒",
            },
          ].map((feature, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                <CardDescription className="text-foreground/70">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
