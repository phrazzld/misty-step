'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

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
 * Form field types
 */
interface ContactFormFields {
  name: string;
  email: string;
  message: string;
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
 * Contact form component
 */
export function Contact(): React.JSX.Element {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<SubmitResult | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormFields>({
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  const onSubmit: SubmitHandler<ContactFormFields> = async (data) => {
    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      // Create FormData from the form values
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      // Submit the form data using our extracted function
      const result = await submitContactForm(formData);

      // Update state based on the result
      if (result.success) {
        setSubmitResult({
          success: true,
          message: 'Your message has been sent successfully!',
        });

        // Reset the form on success
        reset();
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
            <form onSubmit={handleSubmit(onSubmit)} aria-label="Contact form">
              <div className="grid gap-4 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    aria-invalid={errors.name ? 'true' : 'false'}
                    {...register('name', { required: 'Name is required' })}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500 mt-1" role="alert">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    aria-invalid={errors.email ? 'true' : 'false'}
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: 'Please enter a valid email address',
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500 mt-1" role="alert">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    rows={4}
                    placeholder="How can we help you?"
                    aria-invalid={errors.message ? 'true' : 'false'}
                    {...register('message', { required: 'Message is required' })}
                  />
                  {errors.message && (
                    <p className="text-sm text-red-500 mt-1" role="alert">
                      {errors.message.message}
                    </p>
                  )}
                </div>
              </div>
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
