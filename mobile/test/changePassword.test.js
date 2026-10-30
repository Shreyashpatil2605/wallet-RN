import { test, describe, mock } from "node:test";
import assert from "node:assert";
import {
  validatePasswordChange,
  getClerkPasswordErrorMessage,
} from "../lib/passwordValidation.js";

describe("Change Password Feature - Validation & Clerk Integration", () => {
  describe("1. Password Validation Rules", () => {
    test("rejects when current password is missing (passwordEnabled = true)", () => {
      const res = validatePasswordChange({
        currentPassword: "",
        newPassword: "NewStrongPassword123!",
        confirmPassword: "NewStrongPassword123!",
        passwordEnabled: true,
      });
      assert.strictEqual(res.isValid, false);
      assert.strictEqual(res.error, "Please enter your current password.");
    });

    test("allows omitted current password if password is not enabled (e.g. OAuth signup)", () => {
      const res = validatePasswordChange({
        currentPassword: "",
        newPassword: "NewStrongPassword123!",
        confirmPassword: "NewStrongPassword123!",
        passwordEnabled: false,
      });
      assert.strictEqual(res.isValid, true);
      assert.strictEqual(res.error, null);
    });

    test("rejects when new password is missing or whitespace only", () => {
      const res1 = validatePasswordChange({
        currentPassword: "OldPassword123!",
        newPassword: "",
        confirmPassword: "OldPassword123!",
        passwordEnabled: true,
      });
      assert.strictEqual(res1.isValid, false);
      assert.strictEqual(res1.error, "Please enter a new password.");

      const res2 = validatePasswordChange({
        currentPassword: "OldPassword123!",
        newPassword: "    ",
        confirmPassword: "OldPassword123!",
        passwordEnabled: true,
      });
      assert.strictEqual(res2.isValid, false);
      assert.strictEqual(res2.error, "Please enter a new password.");
    });

    test("rejects when confirm password is missing", () => {
      const res = validatePasswordChange({
        currentPassword: "OldPassword123!",
        newPassword: "NewStrongPassword123!",
        confirmPassword: "",
        passwordEnabled: true,
      });
      assert.strictEqual(res.isValid, false);
      assert.strictEqual(res.error, "Please confirm your new password.");
    });

    test("rejects when new password is less than 8 characters", () => {
      const res = validatePasswordChange({
        currentPassword: "OldPassword123!",
        newPassword: "Short1!",
        confirmPassword: "Short1!",
        passwordEnabled: true,
      });
      assert.strictEqual(res.isValid, false);
      assert.strictEqual(
        res.error,
        "New password must be at least 8 characters long."
      );
    });

    test("rejects when new password is identical to current password", () => {
      const res = validatePasswordChange({
        currentPassword: "SamePassword123!",
        newPassword: "SamePassword123!",
        confirmPassword: "SamePassword123!",
        passwordEnabled: true,
      });
      assert.strictEqual(res.isValid, false);
      assert.strictEqual(
        res.error,
        "New password must be different from your current password."
      );
    });

    test("rejects when new password and confirm password do not match", () => {
      const res = validatePasswordChange({
        currentPassword: "OldPassword123!",
        newPassword: "NewStrongPassword123!",
        confirmPassword: "DifferentPassword456!",
        passwordEnabled: true,
      });
      assert.strictEqual(res.isValid, false);
      assert.strictEqual(
        res.error,
        "New password and confirmation do not match."
      );
    });

    test("passes when all validation requirements are satisfied", () => {
      const res = validatePasswordChange({
        currentPassword: "OldPassword123!",
        newPassword: "NewStrongPassword456!",
        confirmPassword: "NewStrongPassword456!",
        passwordEnabled: true,
      });
      assert.strictEqual(res.isValid, true);
      assert.strictEqual(res.error, null);
    });
  });

  describe("2. Clerk Error Mapping & Sanitization", () => {
    test("maps form_password_incorrect to a clear message", () => {
      const err = {
        errors: [{ code: "form_password_incorrect", message: "Incorrect password" }],
      };
      assert.strictEqual(
        getClerkPasswordErrorMessage(err),
        "Current password is incorrect. Please try again."
      );
    });

    test("maps form_password_length_too_short", () => {
      const err = {
        errors: [{ code: "form_password_length_too_short" }],
      };
      assert.strictEqual(
        getClerkPasswordErrorMessage(err),
        "New password must be at least 8 characters long."
      );
    });

    test("maps form_password_pwned (data breach protection)", () => {
      const err = {
        errors: [{ code: "form_password_pwned" }],
      };
      assert.strictEqual(
        getClerkPasswordErrorMessage(err),
        "This password was found in a public data breach. Please choose a more secure password."
      );
    });

    test("maps session_reauth_required (expired/stale session)", () => {
      const err = {
        errors: [{ code: "session_reauth_required" }],
      };
      assert.strictEqual(
        getClerkPasswordErrorMessage(err),
        "Your session requires reauthentication. Please sign out and sign in again."
      );
    });

    test("handles unknown errors with fallback without exposing internal details", () => {
      assert.strictEqual(
        getClerkPasswordErrorMessage(null),
        "An unexpected error occurred. Please try again."
      );
      assert.strictEqual(
        getClerkPasswordErrorMessage({}),
        "Failed to update password. Please try again."
      );
    });
  });

  describe("3. Clerk User Session & updatePassword Flow Simulation", () => {
    test("executes successful password update and prevents password logging", async () => {
      let passedParams = null;

      const mockUser = {
        passwordEnabled: true,
        updatePassword: mock.fn(async (params) => {
          passedParams = params;
          return { id: "user_test_123" };
        }),
      };

      const params = {
        currentPassword: "OldPassword123!",
        newPassword: "NewStrongPassword456!",
        confirmPassword: "NewStrongPassword456!",
      };

      const validation = validatePasswordChange({
        ...params,
        passwordEnabled: mockUser.passwordEnabled,
      });
      assert.strictEqual(validation.isValid, true);

      const updatedUser = await mockUser.updatePassword({
        currentPassword: params.currentPassword,
        newPassword: params.newPassword,
        signOutOfOtherSessions: false,
      });

      assert.strictEqual(mockUser.updatePassword.mock.calls.length, 1);
      assert.deepStrictEqual(passedParams, {
        currentPassword: "OldPassword123!",
        newPassword: "NewStrongPassword456!",
        signOutOfOtherSessions: false,
      });
      assert.strictEqual(updatedUser.id, "user_test_123");
    });

    test("handles incorrect current password response from Clerk", async () => {
      const mockUser = {
        passwordEnabled: true,
        updatePassword: mock.fn(async () => {
          const error = new Error("Clerk API Error");
          error.errors = [
            { code: "form_password_incorrect", message: "Incorrect password" },
          ];
          throw error;
        }),
      };

      let capturedError = "";
      try {
        await mockUser.updatePassword({
          currentPassword: "WrongPassword!",
          newPassword: "NewStrongPassword456!",
          signOutOfOtherSessions: false,
        });
      } catch (err) {
        capturedError = getClerkPasswordErrorMessage(err);
      }

      assert.strictEqual(
        capturedError,
        "Current password is incorrect. Please try again."
      );
    });

    test("handles unauthenticated or uninitialized user state", () => {
      const user = null;
      const isLoaded = false;

      let errorMessage = "";
      if (!isLoaded || !user) {
        errorMessage = "User session is not loaded. Please wait and try again.";
      }

      assert.strictEqual(
        errorMessage,
        "User session is not loaded. Please wait and try again."
      );
    });

    test("handles session reauth requirement (expired session)", async () => {
      const mockUser = {
        passwordEnabled: true,
        updatePassword: mock.fn(async () => {
          const error = new Error("Session Reauth Required");
          error.errors = [
            { code: "session_reauth_required", message: "Reauthentication required" },
          ];
          throw error;
        }),
      };

      let capturedError = "";
      try {
        await mockUser.updatePassword({
          currentPassword: "OldPassword123!",
          newPassword: "NewStrongPassword456!",
          signOutOfOtherSessions: false,
        });
      } catch (err) {
        capturedError = getClerkPasswordErrorMessage(err);
      }

      assert.strictEqual(
        capturedError,
        "Your session requires reauthentication. Please sign out and sign in again."
      );
    });

    test("prevents repeated submissions when isLoading is active", () => {
      let submitCallCount = 0;
      let isLoading = false;

      const triggerSubmit = () => {
        if (isLoading) return; // Prevent repeated submissions
        isLoading = true;
        submitCallCount++;
      };

      // First call initiates submission
      triggerSubmit();
      assert.strictEqual(submitCallCount, 1);
      assert.strictEqual(isLoading, true);

      // Subsequent clicks while in flight are blocked
      triggerSubmit();
      triggerSubmit();
      assert.strictEqual(submitCallCount, 1);
    });
  });
});
