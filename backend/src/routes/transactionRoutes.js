import express from "express";
import { sql } from "../config/db.js";
import {
  createTransaction,
  deleteTransactions,
  getSummaryByUserId,
  getTransactionsById,
} from "../controllers/transactionControllers.js";
const router = express.Router();
router.get("/:userID", getTransactionsById);
router.delete("/:id", deleteTransactions);
router.get("/summary/:userId", getSummaryByUserId);
router.post("/", createTransaction);
export default router;
