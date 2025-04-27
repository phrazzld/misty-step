/**
 * Represents a service offering provided by Misty Step consulting.
 * Used to display service cards on the marketing site.
 */
export interface ServiceOffering {
  /**
   * Unique identifier for the service, using kebab-case formatting.
   * Example: "custom-software-development"
   */
  readonly id: string;

  /**
   * The display title of the service.
   * Example: "Custom Software Development"
   */
  readonly title: string;

  /**
   * A brief description of the service that explains its value proposition.
   * This should be concise and compelling, suitable for a card format.
   */
  readonly description: string;

  /**
   * Key points describing the service offering.
   * These are displayed as bullet points in the service card.
   * Each point should be a concise, complete statement.
   */
  readonly points: readonly string[];
}

/**
 * Core services offered by Misty Step.
 * These represent our primary areas of expertise and service offerings.
 * Icons are handled directly in the Services component.
 */
export const coreServices: readonly ServiceOffering[] = [
  {
    id: "strategic-technology-consulting",
    title: "Strategic Technology Consulting",
    description:
      "We provide expert guidance to help you navigate complex technology decisions, optimize your IT landscape, and align technology effectively with your strategic business goals.",
    points: [
      "Technology roadmap definition and future-proof architecture design",
      "Digital transformation strategy formulation and implementation planning",
      "Codebase audits, quality assessments, and technical due diligence",
      "Development process optimization (Agile, DevOps) and best-practice implementation",
      "Cloud strategy, vendor selection, and technology stack evaluation",
    ],
  },
  {
    id: "custom-software-development",
    title: "Custom Software Development",
    description:
      "We design, build, deploy, and scale bespoke software solutions tailored precisely to your unique business needs, driving efficiency and competitive advantage.",
    points: [
      "Bespoke web, mobile, and enterprise application development using modern stacks",
      "Scalable, cloud-native architectures designed for performance and growth",
      "User-centric design (UX/UI) principles integrated throughout the agile process",
      "Seamless integration with existing systems, APIs, and third-party services",
      "Ongoing maintenance, support, and strategic evolution of applications",
    ],
  },
  {
    id: "cloud-devops-solutions",
    title: "Cloud & DevOps Solutions",
    description:
      "Accelerate your cloud journey and streamline software delivery with our expertise in cloud architecture, migration, automation, and modern DevOps practices.",
    points: [
      "Cloud strategy, migration planning, and execution across major providers (AWS, Azure, GCP)",
      "Infrastructure as Code (IaC) implementation for consistency and repeatability (Terraform, CloudFormation)",
      "CI/CD pipeline design, automation, and optimization for faster, reliable releases",
      "Containerization (Docker, Kubernetes) strategy, implementation, and management",
      "Observability setup (monitoring, logging, alerting) and Site Reliability Engineering (SRE) practices",
    ],
  },
  {
    id: "data-analytics-ai",
    title: "Data Analytics & AI",
    description:
      "Unlock actionable insights from your data. We help define data strategies, build robust analytics platforms, and leverage AI/ML to drive smarter business decisions.",
    points: [
      "Data strategy development, governance frameworks, and architecture design (lakes, warehouses)",
      "ETL/ELT pipeline implementation and data quality management",
      "Business Intelligence (BI) solutions, dashboard creation, and data visualization",
      "Custom Machine Learning (ML) model development, deployment, and integration",
      "AI feasibility studies, Proof-of-Concept (PoC) development, and implementation",
    ],
  },
];
