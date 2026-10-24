import express from "express";
import { sql } from "../config/db.js";
import {
  createTransaction,
  deleteTransactions,
  getSummaryByUserId,
  getTransactionsById,
} from "../controllers/transactionControllers.js";
const router = express.Router();
router.get("/summary/:userId", getSummaryByUserId);
router.get("/:userID", getTransactionsById);
router.delete("/:id", deleteTransactions);
router.post("/", createTransaction);
export default router;
