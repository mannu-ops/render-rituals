export type ValidationResult = {
  valid: boolean;
  errors: Record<string, string>;
};

export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function validateRequired(
  value: string | undefined | null,
  field: string,
  errors: Record<string, string>,
) {
  if (!value?.trim()) {
    errors[field] = `${field} is required.`;
  }
}

export function validateContactForm(values: {
  name?: string;
  email?: string;
  message?: string;
}): ValidationResult {
  const errors: Record<string, string> = {};

  validateRequired(values.name, "name", errors);
  validateRequired(values.email, "email", errors);
  validateRequired(values.message, "message", errors);

  if (values.email?.trim() && !validateEmail(values.email)) {
    errors.email = "Please enter a valid email address.";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
