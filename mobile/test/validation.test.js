import { test, describe } from "node:test";
import assert from "node:assert";

// Function extracted directly from mobile/app/(root)/index.jsx
const getFirstName = (email) => {
  if (!email || typeof email !== "string") return "User";
  const username = email.split("@")[0];
  const parts = username.split(/(?=[A-Z])/);
  if (parts.length > 1) {
    return parts[0];
  }
  const noNumbers = username.replace(/[0-9]/g, "");
  if (!noNumbers) return "User";
  return noNumbers.charAt(0).toUpperCase() + noNumbers.slice(1);
};

// Amount formatting logic from mobile/app/(root)/create.jsx
const calculateSignedAmount = (amountStr, isExpense) => {
  const parsed = parseFloat(amountStr);
  return isExpense ? -Math.abs(parsed) : Math.abs(parsed);
};

// Current validation logic in create.jsx vs fixed validation
const validateAmountCurrent = (amount) => {
  // Line 41 of create.jsx:
  if (!amount || isNaN(parseFloat(amount) || parseFloat(amount) <= 0)) {
    return false; // invalid
  }
  return true; // valid
};

const validateAmountCorrect = (amount) => {
  const parsed = parseFloat(amount);
  if (!amount || isNaN(parsed) || parsed <= 0) {
    return false; // invalid
  }
  return true; // valid
};

describe("Mobile Screen Logic - Validation & Parsing", () => {
  describe("getFirstName function", () => {
    test("handles standard lowercase email", () => {
      assert.strictEqual(getFirstName("shreyash@example.com"), "Shreyash");
    });

    test("handles email with trailing numbers", () => {
      assert.strictEqual(getFirstName("shreyash123@example.com"), "Shreyash");
    });

    test("handles camelCase email username", () => {
      assert.strictEqual(getFirstName("johnDoe@example.com"), "john");
    });

    test("handles undefined, null, or empty email gracefully", () => {
      assert.strictEqual(getFirstName(undefined), "User");
      assert.strictEqual(getFirstName(null), "User");
      assert.strictEqual(getFirstName(""), "User");
    });

    test("handles numeric-only usernames", () => {
      assert.strictEqual(getFirstName("123456@example.com"), "User");
    });
  });

  describe("Amount formatting (Income vs Expense)", () => {
    test("formats expense as negative number", () => {
      assert.strictEqual(calculateSignedAmount("50.25", true), -50.25);
      // Handles user typing negative already
      assert.strictEqual(calculateSignedAmount("-50.25", true), -50.25);
    });

    test("formats income as positive number", () => {
      assert.strictEqual(calculateSignedAmount("1000", false), 1000);
      assert.strictEqual(calculateSignedAmount("-1000", false), 1000);
    });
  });

  describe("Amount validation check", () => {
    test("correct validator rejects 0, negative, and invalid text", () => {
      assert.strictEqual(validateAmountCorrect("0"), false);
      assert.strictEqual(validateAmountCorrect("-10"), false);
      assert.strictEqual(validateAmountCorrect("abc"), false);
      assert.strictEqual(validateAmountCorrect(""), false);
      assert.strictEqual(validateAmountCorrect("10.50"), true);
      assert.strictEqual(validateAmountCorrect("100"), true);
    });

    test("demonstrates bug in create.jsx line 41 allows 0 and non-numbers", () => {
      // Due to operator precedence bug in create.jsx:
      // '0' evaluates to valid (true) when it should be false!
      assert.strictEqual(validateAmountCurrent("0"), true);
      // 'abc' evaluates to valid (true) when it should be false!
      assert.strictEqual(validateAmountCurrent("abc"), true);
    });
  });

  describe("Category and Icon alignment", () => {
    const CATEGORIES = [
      { id: "food", name: "Food & Drinks", icon: "fast-food" },
      { id: "shopping", name: "Shopping", icon: "cart" },
      { id: "transportation", name: "Transportation", icon: "car" },
      { id: "entertainment", name: "Entertainment", icon: "film" },
      { id: "bills", name: "Bills", icon: "receipt" },
      { id: "income", name: "Income", icon: "cash" },
      { id: "other", name: "Other", icon: "ellipsis-horizontal" },
    ];

    const CATEGORY_ICONS = {
      "Food & Drinks": "fast-food",
      Shopping: "cart",
      Transportation: "car",
      Entertainment: "film",
      Bills: "receipt",
      Income: "cash",
      Other: "ellipsis-horizontal",
    };

    test("every category defined in create.jsx has a matching icon in TransactionItem", () => {
      for (const cat of CATEGORIES) {
        assert.ok(
          CATEGORY_ICONS[cat.name],
          `Category ${cat.name} must have a mapping in CATEGORY_ICONS`
        );
        assert.strictEqual(CATEGORY_ICONS[cat.name], cat.icon);
      }
    });
  });
});
