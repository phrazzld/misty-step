import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";

import { render, screen } from "@/test/utils";

import { Contact } from "./contact";

describe("Contact", () => {
  // Mock FormData
  const mockFormData = {
    get: vi.fn(),
  };

  // Setup mocks before tests
  beforeEach(() => {
    // Mock FormData
    vi.spyOn(global, "FormData").mockImplementation(() => mockFormData as unknown as FormData);

    // Setup form data returns
    mockFormData.get.mockImplementation((key) => {
      if (key === "name") return "John Doe";
      if (key === "email") return "john@example.com";
      if (key === "message") return "This is a test message";
      return null;
    });

    // Spy on preventDefault
    vi.spyOn(Event.prototype, "preventDefault").mockImplementation(() => {});
  });

  it("renders correctly with all form elements", () => {
    render(<Contact />);

    // Check for heading
    expect(screen.getByText("Get In Touch")).toBeInTheDocument();

    // Check for form fields
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Message")).toBeInTheDocument();

    // Check for submit button
    expect(screen.getByRole("button", { name: /send message/i })).toBeInTheDocument();
  });

  it("validates required fields", async () => {
    const user = userEvent.setup();
    render(<Contact />);

    // Try to submit empty form
    const submitButton = screen.getByRole("button", { name: /send message/i });
    await user.click(submitButton);

    // Get form fields
    const nameInput = screen.getByLabelText("Name");
    const emailInput = screen.getByLabelText("Email");
    const messageInput = screen.getByLabelText("Message");

    // Check if required validation is working
    expect(nameInput).toBeRequired();
    expect(emailInput).toBeRequired();
    expect(messageInput).toBeRequired();
  });

  it("accepts input and submits the form with data", async () => {
    const user = userEvent.setup();
    render(<Contact />);

    // Fill in form fields
    await user.type(screen.getByLabelText("Name"), "John Doe");
    await user.type(screen.getByLabelText("Email"), "john@example.com");
    await user.type(screen.getByLabelText("Message"), "This is a test message");

    // Submit the form
    await user.click(screen.getByRole("button", { name: /send message/i }));

    // Verify form submission
    expect(FormData).toHaveBeenCalled();
    expect(Event.prototype.preventDefault).toHaveBeenCalled();
  });

  it("properly validates email format", async () => {
    const user = userEvent.setup();
    render(<Contact />);

    // Get email input
    const emailInput = screen.getByLabelText("Email");

    // Fill in other required fields
    await user.type(screen.getByLabelText("Name"), "John Doe");
    await user.type(screen.getByLabelText("Message"), "This is a test message");

    // Try with invalid email
    await user.type(emailInput, "invalid-email");
    await user.click(screen.getByRole("button", { name: /send message/i }));

    // Email field should be invalid
    expect(emailInput).toBeInvalid();

    // Clear and try with valid email
    await user.clear(emailInput);
    await user.type(emailInput, "valid@example.com");

    // Email field should be valid
    expect(emailInput).toBeValid();
  });

  it("has the correct section id for navigation purposes", () => {
    render(<Contact />);
    const section = document.getElementById("contact");
    expect(section).toBeInTheDocument();
    expect(section).toHaveTextContent(/get in touch/i);
  });
});
