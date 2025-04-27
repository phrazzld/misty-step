import { describe, it, expect, vi } from "vitest";

import { ServiceOffering } from "@/lib/content/services";
import { render, screen } from "@/test/utils";

import { Services } from "./services";

// Mock lib/content/services.ts
vi.mock("@/lib/content/services", () => ({
  coreServices: [
    {
      id: "mock-service-1",
      title: "Mock Service 1",
      description: "This is a mock service description for testing.",
      points: ["Point 1", "Point 2", "Point 3"],
    },
    {
      id: "mock-service-2",
      title: "Mock Service 2",
      description: "Another mock service for testing purposes.",
      points: ["Feature A", "Feature B"],
    },
  ] as ServiceOffering[],
}));

// Mock UI Card components
vi.mock("@/components/ui/card", () => ({
  Card: ({ className, children, ...props }: React.PropsWithChildren<{ className?: string }>) => (
    <div data-testid="card-component" className={className} {...props}>
      {children}
    </div>
  ),
  CardHeader: ({
    className,
    children,
    ...props
  }: React.PropsWithChildren<{ className?: string }>) => (
    <div data-testid="card-header-component" className={className} {...props}>
      {children}
    </div>
  ),
  CardTitle: ({
    className,
    children,
    ...props
  }: React.PropsWithChildren<{ className?: string }>) => (
    <div data-testid="card-title-component" className={className} {...props}>
      {children}
    </div>
  ),
  CardDescription: ({
    className,
    children,
    ...props
  }: React.PropsWithChildren<{ className?: string }>) => (
    <div data-testid="card-description-component" className={className} {...props}>
      {children}
    </div>
  ),
  CardContent: ({
    className,
    children,
    ...props
  }: React.PropsWithChildren<{ className?: string }>) => (
    <div data-testid="card-content-component" className={className} {...props}>
      {children}
    </div>
  ),
}));

describe("Services", () => {
  // Basic test to verify mocks are working
  it("renders the component", () => {
    render(<Services />);

    // This test is just to verify the mocks are working
    // More detailed tests will be implemented in T017 and T018
    expect(screen.getByText("Our Services")).toBeInTheDocument();
  });
});
