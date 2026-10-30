import { test, describe, mock } from "node:test";
import assert from "node:assert";

describe("Rate Limiter Middleware", () => {
  let mockLimitResult = { success: true };
  let shouldLimitThrow = false;

  const mockRatelimit = {
    limit: mock.fn(async (key) => {
      if (shouldLimitThrow) {
        throw new Error("Redis connection failure");
      }
      return mockLimitResult;
    }),
  };

  mock.module("../src/config/upstash.js", {
    defaultExport: mockRatelimit,
  });

  let rateLimiter;

  test("Setup - load rate limiter middleware", async () => {
    const mod = await import("../src/middleware/rateLimiter.js");
    rateLimiter = mod.default;
    assert.strictEqual(typeof rateLimiter, "function");
  });

  test("calls next() when rate limit check succeeds", async () => {
    mockLimitResult = { success: true };
    shouldLimitThrow = false;

    let nextCalled = false;
    const req = {};
    const res = {};
    const next = () => {
      nextCalled = true;
    };

    await rateLimiter(req, res, next);
    assert.strictEqual(nextCalled, true);
  });

  test("returns 429 when rate limit is exceeded", async () => {
    mockLimitResult = { success: false };
    shouldLimitThrow = false;

    let nextCalled = false;
    let statusCode = 0;
    let responseBody = null;

    const req = {};
    const res = {
      status(code) {
        statusCode = code;
        return this;
      },
      json(data) {
        responseBody = data;
        return this;
      },
    };
    const next = () => {
      nextCalled = true;
    };

    await rateLimiter(req, res, next);
    assert.strictEqual(nextCalled, false);
    assert.strictEqual(statusCode, 429);
    assert.deepStrictEqual(responseBody, {
      message: "Too many request, Please try again Later",
    });
  });

  test("returns 503 when rate limiting service encounters an error", async () => {
    shouldLimitThrow = true;

    let nextCalled = false;
    let statusCode = 0;
    let responseBody = null;

    const req = {};
    const res = {
      status(code) {
        statusCode = code;
        return this;
      },
      json(data) {
        responseBody = data;
        return this;
      },
    };
    const next = () => {
      nextCalled = true;
    };

    await rateLimiter(req, res, next);
    assert.strictEqual(nextCalled, false);
    assert.strictEqual(statusCode, 503);
    assert.deepStrictEqual(responseBody, {
      message: "Rate limiting service is unavailable. Please try again later.",
    });
  });
});
