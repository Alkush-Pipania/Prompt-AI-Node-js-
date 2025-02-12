import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { JwtPayload } from 'jsonwebtoken';


declare module 'express-serve-static-core' {
  interface Request {
    user?: string | JwtPayload; 
  }
}

config(); 

const authMiddleware = (req: any, res: any, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1];  
  if (!process.env.JWT_SECRET_KEY) {
    throw new Error('JWT secret key is not set');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    
    next(); 
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

export default authMiddleware;
