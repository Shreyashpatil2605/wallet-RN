import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import transactionRoute from "./routes/transactionRoutes.js";
import { initDB } from "./config/db.js";
import job from "./config/cron.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

if (process.env.NODE_ENV === "production") job.start();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => res.status(200).json({ status: "ok" }));

app.use(rateLimiter);
app.use("/api/transactions", transactionRoute);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((error, req, res, next) => {
  console.error("Unhandled server error:", error);
  if (res.headersSent) return next(error);
  res.status(500).json({ message: "Internal Server Error" });
});

initDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is up and running on port:", PORT);
  });
});
