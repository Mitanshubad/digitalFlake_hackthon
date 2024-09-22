import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
  user?: string; // userId added to the request object
}

const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
  // Get token from headers
  const token = req.header('Authorization')?.split(' ')[1]; // Expecting 'Bearer <token>'
  
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };

    // Attach the user ID to the request object
    req.user = decoded.userId;

    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export default auth;
