'use client';

import { FormEvent, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { submitContactForm } from '@/lib/contact-form';

/**
 * Form submission result type
 */
interface SubmitResult {
  success?: boolean;
  message?: string;
}

/**
 * Form submission alert component
 */
function SubmitAlert({ result }: { result: SubmitResult | null }): React.JSX.Element | null {
  if (!result) {
    return null;
  }

  const alertClass = result.success
    ? 'bg-green-50 text-green-700 border border-green-200'
    : 'bg-red-50 text-red-700 border border-red-200';

  return (
    <div className={`mb-6 p-4 rounded-md ${alertClass}`} role="alert">
      {result.message}
    </div>
  );
}

/**
 * Contact form fields component
 */
function ContactFormFields(): React.JSX.Element {
  return (
    <div className="grid gap-4 mb-6">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input type="text" id="name" name="name" placeholder="Your name" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" name="email" placeholder="your.email@example.com" required />
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
  );
}

/**
 * Contact form component
 */
export function Contact(): React.JSX.Element {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<SubmitResult | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      // Create FormData instance from the form
      const formData = new FormData(event.currentTarget);

      // Submit the form data using our extracted function
      const result = await submitContactForm(formData);

      // Update state based on the result
      if (result.success) {
        setSubmitResult({
          success: true,
          message: 'Your message has been sent successfully!',
        });

        // Reset the form on success
        event.currentTarget.reset();
      } else {
        setSubmitResult({
          success: false,
          message: result.error || 'Something went wrong. Please try again.',
        });
      }
    } catch {
      // Handle any unexpected errors without using the error parameter
      setSubmitResult({
        success: false,
        message: 'An unexpected error occurred. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-16">Get In Touch</h2>
        <div className="max-w-md mx-auto">
          <div className="bg-background p-8 rounded-lg border border-border">
            <SubmitAlert result={submitResult} />
            <form onSubmit={handleSubmit} aria-label="Contact form">
              <ContactFormFields />
              <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
