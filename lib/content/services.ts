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
