import { z } from 'zod';

/**
 * Schema for contact form validation
 */
export const ContactFormSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Please enter a valid email address' }),
  message: z.string().min(1, { message: 'Message is required' }),
});

/**
 * Type definition for the contact form, derived from the Zod schema
 */
export type ContactFormFields = z.infer<typeof ContactFormSchema>;
