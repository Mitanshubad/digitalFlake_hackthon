
import { Request, Response } from 'express';
import Uuser from '../models/UserRole';

// Fetch all users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await Uuser.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

// Add a user
export const addUser = async (req: Request, res: Response) => {
  const { name, mobile, email, role, status } = req.body;

  console.log(name, mobile, email, role, status);

  try {
    const newUser = new Uuser({ name, mobile, email, role, status });
    await newUser.save();
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Error adding user', error });
  }
};

// Update a user
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  const { name, mobile, email, role, status } = req.body;

  try {
    // Update user by the custom "id" field, not MongoDB's _id
    const updatedUser = await Uuser.findOneAndUpdate(
      { id: req.params.id },
      { name, mobile, email, role, status },
      { new: true }
    );

    if (!updatedUser) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json(updatedUser);
  } catch (error: any) {
    res.status(500).json({ message: 'Error updating user', error: error.message });
  }
};

// Delete a user
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    // Delete user by custom "id" field, not MongoDB's _id
    const deletedUser = await Uuser.findOneAndDelete({ id: req.params.id });

    if (!deletedUser) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
};

// Fetch single user
export const getSingleUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Find user by the custom "id" field
    const user = await Uuser.findOne({ id });

    // Check if the user exists
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Return user if found
    res.status(200).json(user);
  } catch (error: any) {
    // Log the error for debugging
    console.error('Error fetching user:', error);

    // Send a 500 error response with a more informative message
    res.status(500).json({ message: 'Error fetching user', error: error.message });
  }
};
