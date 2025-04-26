import { describe, it, expect } from "vitest";

import { render, screen } from "@/test/utils";

import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
} from "./card";

describe("Card", () => {
  it("renders correctly with default props", () => {
    render(<Card data-testid="card">Card Content</Card>);
    const card = screen.getByTestId("card");
    expect(card).toBeInTheDocument();
    expect(card).toHaveTextContent("Card Content");
    expect(card).toHaveClass("bg-card");
    expect(card).toHaveAttribute("data-slot", "card");
  });

  it("applies additional className to Card", () => {
    render(
      <Card data-testid="card" className="test-class">
        Card Content
      </Card>
    );
    const card = screen.getByTestId("card");
    expect(card).toHaveClass("test-class");
  });

  it("renders CardHeader correctly", () => {
    render(<CardHeader data-testid="card-header">Header Content</CardHeader>);
    const header = screen.getByTestId("card-header");
    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent("Header Content");
    expect(header).toHaveAttribute("data-slot", "card-header");
  });

  it("renders CardTitle correctly", () => {
    render(<CardTitle data-testid="card-title">Title Content</CardTitle>);
    const title = screen.getByTestId("card-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Title Content");
    expect(title).toHaveAttribute("data-slot", "card-title");
    expect(title).toHaveClass("font-semibold");
  });

  it("renders CardDescription correctly", () => {
    render(<CardDescription data-testid="card-desc">Description Content</CardDescription>);
    const desc = screen.getByTestId("card-desc");
    expect(desc).toBeInTheDocument();
    expect(desc).toHaveTextContent("Description Content");
    expect(desc).toHaveAttribute("data-slot", "card-description");
    expect(desc).toHaveClass("text-muted-foreground");
  });

  it("renders CardAction correctly", () => {
    render(<CardAction data-testid="card-action">Action Content</CardAction>);
    const action = screen.getByTestId("card-action");
    expect(action).toBeInTheDocument();
    expect(action).toHaveTextContent("Action Content");
    expect(action).toHaveAttribute("data-slot", "card-action");
  });

  it("renders CardContent correctly", () => {
    render(<CardContent data-testid="card-content">Content</CardContent>);
    const content = screen.getByTestId("card-content");
    expect(content).toBeInTheDocument();
    expect(content).toHaveTextContent("Content");
    expect(content).toHaveAttribute("data-slot", "card-content");
    expect(content).toHaveClass("px-6");
  });

  it("renders CardFooter correctly", () => {
    render(<CardFooter data-testid="card-footer">Footer</CardFooter>);
    const footer = screen.getByTestId("card-footer");
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveTextContent("Footer");
    expect(footer).toHaveAttribute("data-slot", "card-footer");
    expect(footer).toHaveClass("flex items-center");
  });

  it("passes additional props to all card components", () => {
    render(
      <div>
        <Card data-custom="card">Card</Card>
        <CardHeader data-custom="header">Header</CardHeader>
        <CardTitle data-custom="title">Title</CardTitle>
        <CardDescription data-custom="desc">Description</CardDescription>
        <CardAction data-custom="action">Action</CardAction>
        <CardContent data-custom="content">Content</CardContent>
        <CardFooter data-custom="footer">Footer</CardFooter>
      </div>
    );

    expect(screen.getByText("Card")).toHaveAttribute("data-custom", "card");
    expect(screen.getByText("Header")).toHaveAttribute("data-custom", "header");
    expect(screen.getByText("Title")).toHaveAttribute("data-custom", "title");
    expect(screen.getByText("Description")).toHaveAttribute("data-custom", "desc");
    expect(screen.getByText("Action")).toHaveAttribute("data-custom", "action");
    expect(screen.getByText("Content")).toHaveAttribute("data-custom", "content");
    expect(screen.getByText("Footer")).toHaveAttribute("data-custom", "footer");
  });

  it("renders a complete card with all components", () => {
    render(
      <Card data-testid="complete-card">
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
          <CardAction>
            <button>Action</button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    );

    const card = screen.getByTestId("complete-card");
    expect(card).toBeInTheDocument();
    expect(screen.getByText("Card Title")).toBeInTheDocument();
    expect(screen.getByText("Card Description")).toBeInTheDocument();
    expect(screen.getByText("Action")).toBeInTheDocument();
    expect(screen.getByText("Card Content")).toBeInTheDocument();
    expect(screen.getByText("Card Footer")).toBeInTheDocument();
  });
});
