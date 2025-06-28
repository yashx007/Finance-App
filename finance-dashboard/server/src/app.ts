

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth";
import transactionRoutes from "./routes/transactions";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json()); 

app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);


mongoose.connect(process.env.MONGODB_URI!, {
})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));


app.get("/", (_req, res) => {
  res.send("Finance Dashboard API is running!");
});

export default app;
