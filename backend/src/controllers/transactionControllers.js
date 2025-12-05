import { sql } from "../config/db.js";

export async function getTransactionsById(req, res) {
  try {
    const { userID } = req.params;
    const transactions = await sql`
        SELECT * FROM transactions WHERE user_id = ${userID} ORDER BY created_at DESC
        `;
    res.status(200).json(transactions);
  } catch (error) {
    console.log("Error in  getting transcations", error);
    res.status(500).send({ message: "Internal Serve Error" });
  }
}
export async function createTransaction(req, res) {
  try {
    const { title, amount, category, user_id } = req.body;
    if (!title || !category || !user_id || amount === undefined) {
      return res.status(400).json({ message: "All field are required" });
    }
    const transactions = await sql`
    INSERT INTO transactions (user_id,title,amount,category)
    VALUES (${user_id},${title},${amount},${category}) 
    RETURNING *`;
    console.log(transactions);
    res.status(201).json(transactions[0]);
  } catch (error) {
    console.log("Error in the transcation block", error);
    res.status(500).send({ message: "Internal Serve Error" });
  }
}
export async function getSummaryByUserId(req, res) {
  try {
    const { userId } = req.params;
    const balanceAmount = await sql`
      SELECT COALESCE(SUM(amount),0) as balance FROM transactions WHERE user_id =${userId}; 
    `;
    const incomeResult =
      await sql`SELECT COALESCE(SUM(amount),0) as income FROM transactions WHERE user_id =${userId} AND amount > 0`;

    const expenseResult =
      await sql`SELECT COALESCE(SUM(amount),0) as expense FROM transactions WHERE user_id =${userId} AND amount < 0`;
    res.status(200).json({
      balance: balanceAmount[0].balance,
      income: incomeResult[0].income,
      expense: expenseResult[0].expense,
    });
  } catch (error) {
    console.log("Error in the Summary block", error);
    res.status(500).send({ message: "Internal Serve Error" });
  }
}
export async function deleteTransactions(req, res) {
  try {
    const { id } = req.params;

    if (isNaN(parseInt(id))) {
      res.status(400).json({ message: "Invalid Transaction Id" });
    }

    const result = await sql`
    DELETE FROM transactions WHERE id = ${id} RETURNING *;
    `;
    if (result.length === 0) {
      return res.status(404).send({ message: "Transactions Not Found" });
    }
    res.status(200).send({ message: "Transactions deleted Successfully" });
  } catch (error) {
    console.log("Error in  getting transcations", error);
    res.status(500).send({ message: "Internal Serve Error" });
  }
}
