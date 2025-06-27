import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Import and use routes
import authRoutes from "./routes/auth";
import transactionRoutes from "./routes/transactions";

app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI!)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

export default app;
