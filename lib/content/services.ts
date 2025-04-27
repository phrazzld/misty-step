import { ReactNode } from "react";

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
   * Optional icon to display with the service.
   * Can be a React component (e.g., from lucide-react) or emoji string.
   */
  readonly icon?: ReactNode;

  /**
   * Key points describing the service offering.
   * These are displayed as bullet points in the service card.
   * Each point should be a concise, complete statement.
   */
  readonly points: readonly string[];
}

/**
 * Placeholder core services data.
 * This will be replaced with the final, approved services content.
 * Currently contains example data for development and testing.
 */
export const coreServices: readonly ServiceOffering[] = [
  {
    id: "custom-software-development",
    title: "Custom Software Development",
    description:
      "End-to-end software solutions tailored to your specific business needs, challenges, and growth objectives.",
    // Icon to be determined based on C002 decision
    points: [
      "Bespoke web and mobile applications built with modern technologies",
      "Scalable architecture designed for your business growth",
      "User-focused design process with iterative development and feedback",
      "Ongoing maintenance and support options to ensure long-term success",
    ],
  },
  {
    id: "technical-consulting",
    title: "Technical Consulting",
    description:
      "Strategic technology guidance to help you make informed decisions, optimize processes, and achieve your business goals.",
    // Icon to be determined based on C002 decision
    points: [
      "Technology stack selection and architectural design",
      "Code quality assessments and optimization recommendations",
      "Development process improvements and best practices",
      "Cloud infrastructure planning and migration strategies",
      "Security audits and implementation guidance",
    ],
  },
];
