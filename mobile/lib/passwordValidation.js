/**
 * Pure validation utility for password change requests.
 *
 * @param {Object} params
 * @param {string} params.currentPassword
 * @param {string} params.newPassword
 * @param {string} params.confirmPassword
 * @param {boolean} [params.passwordEnabled=true]
 * @returns {{ isValid: boolean, error: string | null }}
 */
export function validatePasswordChange({
  currentPassword,
  newPassword,
  confirmPassword,
  passwordEnabled = true,
}) {
  const current = currentPassword ? currentPassword.trim() : "";
  const next = newPassword ? newPassword.trim() : "";
  const confirm = confirmPassword ? confirmPassword.trim() : "";

  if (passwordEnabled && !current) {
    return { isValid: false, error: "Please enter your current password." };
  }

  if (!next) {
    return { isValid: false, error: "Please enter a new password." };
  }

  if (!confirm) {
    return { isValid: false, error: "Please confirm your new password." };
  }

  if (next.length < 8) {
    return {
      isValid: false,
      error: "New password must be at least 8 characters long.",
    };
  }

  if (passwordEnabled && current === next) {
    return {
      isValid: false,
      error: "New password must be different from your current password.",
    };
  }

  if (next !== confirm) {
    return {
      isValid: false,
      error: "New password and confirmation do not match.",
    };
  }

  return { isValid: true, error: null };
}

/**
 * Maps Clerk API error responses into user-friendly messages.
 *
 * @param {any} err
 * @returns {string}
 */
export function getClerkPasswordErrorMessage(err) {
  if (!err) return "An unexpected error occurred. Please try again.";

  const clerkError = err.errors?.[0];
  const code = clerkError?.code;
  const message = clerkError?.longMessage || clerkError?.message;

  switch (code) {
    case "form_password_incorrect":
      return "Current password is incorrect. Please try again.";
    case "form_password_length_too_short":
      return "New password must be at least 8 characters long.";
    case "form_password_pwned":
      return "This password was found in a public data breach. Please choose a more secure password.";
    case "form_password_validation_failed":
    case "form_param_format_invalid":
      return message || "The new password does not meet security requirements.";
    case "session_reauth_required":
      return "Your session requires reauthentication. Please sign out and sign in again.";
    case "network_error":
      return "Network connection issue. Please check your internet connection.";
    default:
      return message || "Failed to update password. Please try again.";
  }
}
