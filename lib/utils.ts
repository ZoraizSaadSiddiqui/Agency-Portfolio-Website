/**
 * Utility functions for Agency Portfolio website
 */

/**
 * Validates whether an email string follows standard email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Safely concats CSS classnames removing falsy values
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Format phone numbers into standard readable string
 */
export function formatPhoneNumber(phone: string): string {
  return phone.replace(/[^\d+]/g, "");
}
