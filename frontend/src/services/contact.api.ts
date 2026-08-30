import type { ApiResponse, ContactSubmission } from "@/types";
import { validateContactForm } from "@/lib";

export type ContactFormInput = Omit<
  ContactSubmission,
  "id" | "status" | "createdAt"
>;

export async function submitContactForm(
  values: ContactFormInput,
): Promise<ApiResponse<{ submitted: boolean }>> {
  const validation = validateContactForm(values);

  if (!validation.valid) {
    return {
      success: false,
      error: "Please check the highlighted form fields.",
    };
  }

  // Frontend phase:
  // Keep this as a safe abstraction until the contact API/email backend exists.
  // Later this function can POST to /api/contact or a server action.
  return {
    success: true,
    data: { submitted: true },
    message: "Your enquiry is ready to be submitted.",
  };
}
