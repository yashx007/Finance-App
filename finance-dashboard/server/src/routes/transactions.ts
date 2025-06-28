import express, { Request, Response, NextFunction } from "express";
import Transaction from "../models/Transaction";
import { verifyToken, AuthRequest } from "../middleware/auth";

const router = express.Router();

// ✅ GET All Transactions with filters
router.get("/", verifyToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const {
      category,
      status,
      user_id,
      minAmount,
      maxAmount,
      search,
      sortBy = "date",
      order = "desc"
    } = req.query;

    const filter: any = {};
    if (category) filter.category = category;
    if (status) filter.status = status;
    if (user_id) filter.user_id = user_id;
    if (minAmount && maxAmount) {
      filter.amount = { $gte: Number(minAmount), $lte: Number(maxAmount) };
    }
    if (search) filter.$text = { $search: search as string };

    const transactions = await Transaction.find(filter).sort({
      [sortBy as string]: order === "asc" ? 1 : -1,
    });

    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch transactions" });
  }
});

// ✅ GET Single Transaction by ID
router.get("/:id", verifyToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findById(id);

    if (!transaction) {
      res.status(404).json({ message: "Transaction not found" });
      return;
    }

    res.status(200).json(transaction);
  } catch (err) {
    res.status(500).json({ message: "Error fetching transaction" });
  }
});

// ✅ POST - Create new transaction
router.post("/", verifyToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const newTransaction = new Transaction(req.body);
    await newTransaction.save();
    res.status(201).json(newTransaction);
  } catch (err) {
    res.status(500).json({ message: "Error creating transaction" });
  }
});

// ✅ PUT - Update transaction
router.put("/:id", verifyToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updated = await Transaction.findByIdAndUpdate(id, req.body, { new: true });

    if (!updated) {
      res.status(404).json({ message: "Transaction not found" });
      return;
    }

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating transaction" });
  }
});

// ✅ DELETE - Remove transaction
router.delete("/:id", verifyToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deleted = await Transaction.findByIdAndDelete(id);

    if (!deleted) {
      res.status(404).json({ message: "Transaction not found" });
      return;
    }

    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting transaction" });
  }
});

export default router;
