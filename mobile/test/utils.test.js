import { test, describe } from "node:test";
import assert from "node:assert";
import { formatDate } from "../lib/utils.js";

describe("Mobile Utilities - formatDate", () => {
  test("formats standard ISO date string correctly", () => {
    // Note: '2025-05-20' interpreted in UTC
    const formatted = formatDate("2025-05-20T12:00:00Z");
    assert.strictEqual(formatted, "May 20, 2025");
  });

  test("formats full ISO datetime string correctly", () => {
    const formatted = formatDate("2026-10-30T00:00:00Z");
    assert.strictEqual(formatted, "October 30, 2026");
  });

  test("returns 'Invalid Date' for non-date string", () => {
    const formatted = formatDate("not-a-date");
    assert.strictEqual(formatted, "Invalid Date");
  });
});
