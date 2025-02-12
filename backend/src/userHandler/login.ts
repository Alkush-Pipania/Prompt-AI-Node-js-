import { Router } from "express";
import { config } from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from "@prisma/client";
import { userSigninSchema } from "../types/zod";

config();
const router = Router();
const prisma = new PrismaClient();


router.post("/", async (req: any, res: any) => {
  const { email, password } = req.body;
  const check = userSigninSchema.safeParse({ email, password });
  if (!check.success) {
    return res.status(400).json({ success : false ,message: "Invalid input" })
  }
  if (!process.env.JWT_SECRET_KEY) {
    throw new Error("JWT secret key is not set");
  }

  try {
    const check_user = await prisma.user.findUnique({
      where: {
        email
      }
    })
    if (!check_user) {
      return res.status(400).json({success : false,message: "Invalid email or password" })
    }

    const isPasswordValid = await bcrypt.compare(password, check_user.password);

    if (!isPasswordValid) {
      return res.status(400).json({success : false, message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: check_user.id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );
    res.status(201).json({
      success: true,
      token,
    })


  } catch (error) {
    return res.status(500).json({success : false, message: "Internal server error" })
  }
})


export default router;