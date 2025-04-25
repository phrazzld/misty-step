"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function Contact() {
  return (
    <section id="contact" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-16">Get In Touch</h2>
        <div className="max-w-md mx-auto">
          <div className="bg-background p-8 rounded-lg border border-border">
            <div className="grid gap-4 mb-6">
              <div className="space-y-2">
                <Label htmlFor="name">
                  Name
                </Label>
                <Input
                  type="text"
                  id="name"
                  placeholder="Your name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">
                  Email
                </Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="your.email@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">
                  Message
                </Label>
                <Textarea
                  id="message"
                  rows={4}
                  placeholder="How can we help you?"
                />
              </div>
            </div>
            <Button type="submit" size="lg" className="w-full">
              Send Message
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}