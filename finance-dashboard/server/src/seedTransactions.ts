import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import Transaction from "./models/Transaction";

dotenv.config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log(" Connected to MongoDB");

    const filePath = path.join(__dirname, "../transactions.json");

    if (!fs.existsSync(filePath)) {
      console.error(" transactions.json file not found!");
      process.exit(1);
    }

    const rawData = fs.readFileSync(filePath, "utf-8");
    const transactions = JSON.parse(rawData);

    if (!Array.isArray(transactions)) {
      console.error(" Invalid data format. Expected an array.");
      process.exit(1);
    }

    await Transaction.deleteMany({});
    const result = await Transaction.insertMany(transactions);

    console.log(` Seeded ${result.length} transactions`);
    process.exit(0);
  } catch (err) {
    console.error(" Error seeding:", err);
    process.exit(1);
  }
};

seed();
