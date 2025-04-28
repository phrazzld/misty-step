import React from "react";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import {
  StrategicConsultingIcon,
  SoftwareDevelopmentIcon,
  CloudDevOpsIcon,
  DataAnalyticsIcon,
} from "@/lib/content/service-icons";
import { coreServices } from "@/lib/content/services";

export function Services(): React.JSX.Element {
  // Map of service IDs to their icon components
  const iconMap: Record<string, React.ReactNode> = {
    "strategic-technology-consulting": <StrategicConsultingIcon />,
    "custom-software-development": <SoftwareDevelopmentIcon />,
    "cloud-devops-solutions": <CloudDevOpsIcon />,
    "data-analytics-ai": <DataAnalyticsIcon />,
  };

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-muted/50 to-muted">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Our Services</h2>
          <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
            Tailored solutions to address your unique business challenges with expert consulting and
            development.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {coreServices.map((service) => (
            <Card
              key={service.id}
              className="border border-border/40 transition-all duration-300 hover:shadow-lg hover:border-border/80"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center mb-3">
                  {/* Render icon based on service ID from the iconMap */}
                  {iconMap[service.id]}
                  <CardTitle className="text-xl font-bold ml-3">{service.title}</CardTitle>
                </div>
                <CardDescription className="text-foreground/70 text-base">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {service.points.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <span className="text-primary text-lg mt-0.5">✓</span>
                      <span className="text-foreground/80">{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
