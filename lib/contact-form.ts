/**
 * Contact form submission result
 */
export interface ContactFormResult {
  /**
   * Whether the submission was successful
   */
  success: boolean;

  /**
   * Any error message if the submission failed
   */
  error?: string;

  /**
   * Data that was submitted
   */
  data?: {
    name: string;
    email: string;
    message: string;
  };
}

/**
 * Process contact form data
 *
 * @param formData - FormData object from the form submission
 * @returns A result object with submission status and data
 */
export function processContactForm(formData: FormData): ContactFormResult {
  try {
    // Extract form data
    const name = formData.get('name') as string | null;
    const email = formData.get('email') as string | null;
    const message = formData.get('message') as string | null;

    // Validate required fields
    if (!name || !email || !message) {
      return {
        success: false,
        error: 'All fields are required',
      };
    }

    // In a real application, we would send the data to an API endpoint
    // For now, we just return a successful result with the data
    return {
      success: true,
      data: {
        name,
        email,
        message,
      },
    };

    // Note: In a real implementation, we would handle the actual API call:
    // const response = await fetch('/api/contact', { method: 'POST', body: formData });
    // const data = await response.json();
    // return { success: response.ok, error: data.error, data: data.result };
  } catch (error) {
    // Handle any unexpected errors
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }
}

/**
 * Submit contact form data to the server
 *
 * @param formData - FormData object from the form submission
 * @returns A promise that resolves to the submission result
 */
export async function submitContactForm(formData: FormData): Promise<ContactFormResult> {
  // Process the form data
  const result = processContactForm(formData);

  // If basic validation fails, return the result immediately
  if (!result.success) {
    return result;
  }

  // In a real application, we would send the data to the server here
  // For demonstration purposes, we simulate a successful submission with a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(result);
    }, 500);
  });
}
