import { test, describe } from "node:test";
import assert from "node:assert";
import { parseApiResponse } from "../constants/api.js";

describe("API Constants & Response Parser", () => {
  test("parses valid JSON response on HTTP 200", async () => {
    const mockResponse = {
      ok: true,
      status: 200,
      text: async () => JSON.stringify({ id: 1, balance: 100 }),
    };

    const data = await parseApiResponse(mockResponse);
    assert.deepStrictEqual(data, { id: 1, balance: 100 });
  });

  test("handles empty body (returns null) on HTTP 204", async () => {
    const mockResponse = {
      ok: true,
      status: 204,
      text: async () => "",
    };

    const data = await parseApiResponse(mockResponse);
    assert.strictEqual(data, null);
  });

  test("throws error when response body is not valid JSON", async () => {
    const mockResponse = {
      ok: true,
      status: 502,
      text: async () => "Bad Gateway Error <html>...</html>",
    };

    await assert.rejects(
      async () => {
        await parseApiResponse(mockResponse);
      },
      {
        name: "Error",
        message: "The server returned an invalid response (502).",
      }
    );
  });

  test("throws error with server message when HTTP status is not ok", async () => {
    const mockResponse = {
      ok: false,
      status: 400,
      text: async () => JSON.stringify({ message: "All field are required" }),
    };

    await assert.rejects(
      async () => {
        await parseApiResponse(mockResponse);
      },
      {
        name: "Error",
        message: "All field are required",
      }
    );
  });

  test("throws fallback error when HTTP status is not ok and message is absent", async () => {
    const mockResponse = {
      ok: false,
      status: 500,
      text: async () => JSON.stringify({}),
    };

    await assert.rejects(
      async () => {
        await parseApiResponse(mockResponse);
      },
      {
        name: "Error",
        message: "Request failed with status 500. Please try again later.",
      }
    );
  });
});
