

import express, { Application, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import authMiddleware from './middleware/auth';
import cors from 'cors';
import { rolesRouter } from './routes/roles';
import userRoutes from './routes/user';

// Load environment variables from .env file
dotenv.config();

// Initialize express
const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());
app.use(cors());

// MongoDB connection logic
const mongoURI: string = process.env.MONGO_URI || 'mongodb+srv://mitanshubadgujar8:pG3DYhR3xYWLgZeY@cluster0.pecjgg1.mongodb.net/digitalFlake';
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit process if MongoDB connection fails
  });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/roles', rolesRouter);
app.use('/api/users', userRoutes);

// Protected route example
app.get('/protected', authMiddleware, (req: Request, res: Response) => {
  res.json({ message: 'This is a protected route' });
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
