import { test, describe, mock, beforeEach } from "node:test";
import assert from "node:assert";

describe("Transaction Controllers", () => {
  let mockSqlResults = [];
  let sqlCalls = [];
  let shouldSqlThrow = false;

  const mockSql = mock.fn(async (strings, ...values) => {
    sqlCalls.push({ strings, values });
    if (shouldSqlThrow) {
      throw new Error("Simulated Database Error");
    }
    if (typeof mockSqlResults === "function") {
      return mockSqlResults(strings, ...values);
    }
    return mockSqlResults;
  });

  // Mock the db module
  mock.module("../src/config/db.js", {
    namedExports: {
      sql: mockSql,
      initDB: async () => {},
    },
  });

  let controllers;

  test("Setup - load controllers with mocked db", async () => {
    controllers = await import("../src/controllers/transactionControllers.js");
    assert.ok(controllers.getTransactionsById);
    assert.ok(controllers.createTransaction);
    assert.ok(controllers.getSummaryByUserId);
    assert.ok(controllers.deleteTransactions);
  });

  beforeEach(() => {
    sqlCalls = [];
    shouldSqlThrow = false;
    mockSqlResults = [];
  });

  describe("getTransactionsById", () => {
    test("returns 200 and transaction list for given userID", async () => {
      const mockList = [
        { id: 1, user_id: "user_1", title: "Groceries", amount: -50.0, category: "Food & Drinks" },
        { id: 2, user_id: "user_1", title: "Salary", amount: 2000.0, category: "Income" },
      ];
      mockSqlResults = mockList;

      const req = { params: { userID: "user_1" } };
      let statusCode = 0;
      let responseBody = null;

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

      await controllers.getTransactionsById(req, res);

      assert.strictEqual(statusCode, 200);
      assert.deepStrictEqual(responseBody, mockList);
      assert.strictEqual(sqlCalls.length, 1);
      assert.strictEqual(sqlCalls[0].values[0], "user_1");
    });

    test("returns 500 when database query throws error", async () => {
      shouldSqlThrow = true;
      const req = { params: { userID: "user_1" } };
      let statusCode = 0;
      let responseBody = null;

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

      await controllers.getTransactionsById(req, res);

      assert.strictEqual(statusCode, 500);
      assert.deepStrictEqual(responseBody, { message: "Internal Server Error" });
    });
  });

  describe("createTransaction", () => {
    test("returns 201 and created transaction for valid payload", async () => {
      const newTx = {
        id: 10,
        user_id: "user_1",
        title: "Coffee",
        amount: -4.5,
        category: "Food & Drinks",
        created_at: "2026-10-30",
      };
      mockSqlResults = [newTx];

      const req = {
        body: {
          user_id: "user_1",
          title: "Coffee",
          amount: -4.5,
          category: "Food & Drinks",
        },
      };

      let statusCode = 0;
      let responseBody = null;
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

      await controllers.createTransaction(req, res);

      assert.strictEqual(statusCode, 201);
      assert.deepStrictEqual(responseBody, newTx);
    });

    test("returns 400 when required fields are missing", async () => {
      const testCases = [
        { body: { amount: 10, category: "Income", user_id: "u1" }, missing: "title" },
        { body: { title: "Salary", amount: 10, user_id: "u1" }, missing: "category" },
        { body: { title: "Salary", category: "Income", user_id: "u1" }, missing: "amount" },
        { body: { title: "Salary", amount: 10, category: "Income" }, missing: "user_id" },
      ];

      for (const tc of testCases) {
        let statusCode = 0;
        let responseBody = null;
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

        await controllers.createTransaction({ body: tc.body }, res);
        assert.strictEqual(statusCode, 400, `Expected 400 when missing ${tc.missing}`);
        assert.deepStrictEqual(responseBody, { message: "All field are required" });
      }
    });

    test("returns 500 when database insertion fails", async () => {
      shouldSqlThrow = true;
      const req = {
        body: {
          user_id: "user_1",
          title: "Coffee",
          amount: -4.5,
          category: "Food & Drinks",
        },
      };

      let statusCode = 0;
      let responseBody = null;
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

      await controllers.createTransaction(req, res);
      assert.strictEqual(statusCode, 500);
      assert.deepStrictEqual(responseBody, { message: "Internal Server Error" });
    });
  });

  describe("getSummaryByUserId", () => {
    test("returns 200 with balance, income, expense summary", async () => {
      let callIndex = 0;
      mockSqlResults = () => {
        callIndex++;
        if (callIndex === 1) return [{ balance: "1500.00" }];
        if (callIndex === 2) return [{ income: "2000.00" }];
        if (callIndex === 3) return [{ expense: "-500.00" }];
        return [];
      };

      const req = { params: { userId: "user_1" } };
      let statusCode = 0;
      let responseBody = null;
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

      await controllers.getSummaryByUserId(req, res);

      assert.strictEqual(statusCode, 200);
      assert.deepStrictEqual(responseBody, {
        balance: "1500.00",
        income: "2000.00",
        expense: "-500.00",
      });
      assert.strictEqual(sqlCalls.length, 3);
    });

    test("returns 500 when summary query throws error", async () => {
      shouldSqlThrow = true;
      const req = { params: { userId: "user_1" } };
      let statusCode = 0;
      let responseBody = null;
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

      await controllers.getSummaryByUserId(req, res);
      assert.strictEqual(statusCode, 500);
      assert.deepStrictEqual(responseBody, { message: "Internal Server Error" });
    });
  });

  describe("deleteTransactions", () => {
    test("returns 200 when transaction is deleted successfully", async () => {
      mockSqlResults = [{ id: 5, title: "Book", amount: -20 }];

      const req = { params: { id: "5" } };
      let statusCode = 0;
      let responseBody = null;
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

      await controllers.deleteTransactions(req, res);
      assert.strictEqual(statusCode, 200);
      assert.deepStrictEqual(responseBody, { message: "Transactions deleted Successfully" });
    });

    test("returns 400 when id is not a valid integer", async () => {
      const req = { params: { id: "abc" } };
      let statusCode = 0;
      let responseBody = null;
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

      await controllers.deleteTransactions(req, res);
      assert.strictEqual(statusCode, 400);
      assert.deepStrictEqual(responseBody, { message: "Invalid Transaction Id" });
    });

    test("returns 404 when transaction is not found", async () => {
      mockSqlResults = []; // No rows deleted

      const req = { params: { id: "999" } };
      let statusCode = 0;
      let responseBody = null;
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

      await controllers.deleteTransactions(req, res);
      assert.strictEqual(statusCode, 404);
      assert.deepStrictEqual(responseBody, { message: "Transactions Not Found" });
    });

    test("returns 500 when database deletion throws error", async () => {
      shouldSqlThrow = true;
      const req = { params: { id: "5" } };
      let statusCode = 0;
      let responseBody = null;
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

      await controllers.deleteTransactions(req, res);
      assert.strictEqual(statusCode, 500);
      assert.deepStrictEqual(responseBody, { message: "Internal Server Error" });
    });
  });
});
