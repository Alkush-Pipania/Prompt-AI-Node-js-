import {Router } from "express";
import { userSignupSchema } from "../types/zod";
import { config } from 'dotenv';
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

config();
const router = Router();
const prisma = new PrismaClient();

router.post("/", async (req :any , res :any ) =>{
  const { firstName , lastName , email , password} = req.body;
  const check = userSignupSchema.safeParse({firstName , lastName , email , password});
  if(!check.success){
    console.log(check.error)
    return res.status(400).json({success : false , message : "Invalid input"})
  }
  if (!process.env.JWT_SECRET_KEY) {
    throw new Error("JWT secret key is not set");
  }

  try{
    // check if user already exists
    const check_user = await prisma.user.findUnique({
      where : {
        email
      }
    })
    if(check_user){
      return res.status(400).json({success : false , message : "User already exists"})
    }

    const hashedPassword = await bcrypt.hash(password ,10);
    
    const newUser = await prisma.user.create({
      data:{
        firstName,
        lastName,
        email,
        password : hashedPassword
      }
    })

    const token = jwt.sign(
      { userId: newUser.id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );
    res.status(201).json({
      success : true,
      token,
    })

  }catch(error){
    console.error(error);
    res.status(500).json({success: false, error: 'Internal Server Error' });
  }

})


export default router;