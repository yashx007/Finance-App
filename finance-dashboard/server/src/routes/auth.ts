import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User";

const router = express.Router();

router.post("/login", async (req, res): Promise<void> => {
  try {
    const { email, password } = req.body;
    console.log("Login request:", { email, password });

    const user = await User.findOne({ email });
    console.log("User found:", user);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match:", isMatch);

    if (!isMatch) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: "1h" });
    res.json({ token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
});


router.post("/signup", async (req, res): Promise<void> => {
  try {
    const { email, password } = req.body;
    console.log("Signup request:", { email, password });

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET!, { expiresIn: "1h" });
    res.status(201).json({ token });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
});

export default router;
