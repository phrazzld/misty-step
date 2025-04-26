"use client";

import { FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function Contact(): React.JSX.Element {
  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    // Create FormData instance (used by tests)
    const formData = new FormData(event.currentTarget);

    // In a real application, we would do something with the form data
    // For example, send it to an API endpoint
    if (formData) {
      // Using void to indicate we're intentionally not using the value
      void formData;
      // fetch('/api/contact', { method: 'POST', body: formData });
    }
  };

  return (
    <section id="contact" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-16">Get In Touch</h2>
        <div className="max-w-md mx-auto">
          <div className="bg-background p-8 rounded-lg border border-border">
            <form onSubmit={handleSubmit} aria-label="Contact form">
              <div className="grid gap-4 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input type="text" id="name" name="name" placeholder="Your name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="How can we help you?"
                    required
                  />
                </div>
              </div>
              <Button type="submit" size="lg" className="w-full">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
