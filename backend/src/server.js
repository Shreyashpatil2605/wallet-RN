import express from "express";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import transactionRoute from "./routes/transactionRoutes.js";
import { initDB } from "./config/db.js";
import job from "./config/cron.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

if (process.env.NODE_ENV === "production") job.start();

app.use(rateLimiter);
//middleWare
app.use(express.json());
app.use("/api/transactions", transactionRoute);

app.get("/api/health", (req, res) =>
res.status(200).json({ status: "ok" }));

initDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is up and running on port:", PORT);
  });
});
