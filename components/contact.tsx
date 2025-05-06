'use client';

import { useState } from 'react';
import {
  useForm,
  SubmitHandler,
  FieldError,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form';

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
function SubmitAlert({ result }: { result: SubmitResult | null }): React.ReactElement | null {
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
 * Form field component to reduce duplication
 */
interface FormFieldProps {
  id: keyof ContactFormFields;
  label: string;
  placeholder: string;
  register: UseFormRegister<ContactFormFields>;
  error?: FieldError;
  type?: string;
  registerOptions?: RegisterOptions;
  rows?: number;
  isTextarea?: boolean;
}

function FormField({
  id,
  label,
  placeholder,
  register,
  error,
  type = 'text',
  registerOptions,
  rows,
  isTextarea = false,
}: FormFieldProps): React.ReactElement {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      {isTextarea ? (
        <Textarea
          id={id}
          rows={rows || 4}
          placeholder={placeholder}
          aria-invalid={error ? 'true' : 'false'}
          {...register(id as keyof ContactFormFields, registerOptions)}
        />
      ) : (
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          aria-invalid={error ? 'true' : 'false'}
          {...register(id as keyof ContactFormFields, registerOptions)}
        />
      )}
      {error && (
        <p className="text-sm text-red-500 mt-1" role="alert">
          {error.message}
        </p>
      )}
    </div>
  );
}

/**
 * Form submission handler logic
 */
function useContactFormSubmission() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<SubmitResult | null>(null);

  const handleFormSubmit = async (data: ContactFormFields, reset: () => void) => {
    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      // Create FormData from the form values
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      // Submit the form data
      const result = await submitContactForm(formData);

      // Update state based on the result
      if (result.success) {
        setSubmitResult({
          success: true,
          message: 'Your message has been sent successfully!',
        });
        reset();
      } else {
        setSubmitResult({
          success: false,
          message: result.error || 'Something went wrong. Please try again.',
        });
      }
    } catch {
      setSubmitResult({
        success: false,
        message: 'An unexpected error occurred. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return { isSubmitting, submitResult, handleFormSubmit };
}

/**
 * Contact form component
 */
export function Contact(): React.ReactElement {
  const { isSubmitting, submitResult, handleFormSubmit } = useContactFormSubmission();

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
    await handleFormSubmit(data, reset);
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
                <FormField
                  id="name"
                  label="Name"
                  placeholder="Your name"
                  register={register}
                  error={errors.name}
                  registerOptions={{ required: 'Name is required' }}
                />
                <FormField
                  id="email"
                  label="Email"
                  type="email"
                  placeholder="your.email@example.com"
                  register={register}
                  error={errors.email}
                  registerOptions={{
                    required: 'Email is required',
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: 'Please enter a valid email address',
                    },
                  }}
                />
                <FormField
                  id="message"
                  label="Message"
                  placeholder="How can we help you?"
                  register={register}
                  error={errors.message}
                  registerOptions={{ required: 'Message is required' }}
                  rows={4}
                  isTextarea
                />
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
