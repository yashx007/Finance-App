import express, { Response, NextFunction } from "express";
import Transaction from "../models/Transaction";
import { verifyToken, AuthRequest } from "../middleware/auth";
import e from "express";

const router = express.Router();

router.get("/", verifyToken, async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { category, status, user_id, minAmount, maxAmount, search, sortBy = "date", order = "desc" } = req.query;

    const filter: any = {};
    if (category) filter.category = category;
    if (status) filter.status = status;
    if (user_id) filter.user_id = user_id;
    if (minAmount && maxAmount) filter.amount = { $gte: Number(minAmount), $lte: Number(maxAmount) };
    if (search) filter.$text = { $search: search as string };

    const transactions = await Transaction.find(filter).sort({ [sortBy as string]: order === "asc" ? 1 : -1 });
    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch transactions" });
  }
});

export default router;
