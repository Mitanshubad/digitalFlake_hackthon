

import { Router } from 'express';
import { getAllUsers, addUser, updateUser, deleteUser, getSingleUser } from '../controller/user';

const router = Router();

// Fetch all users
router.get('/', getAllUsers);

// Add a user
router.post('/', addUser);

// Update a user
router.put('/:id', updateUser);

// Delete a user
router.delete('/:id', deleteUser);

// Fetch single user
router.get('/:id', getSingleUser);

export default router;
