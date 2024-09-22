import { Router } from 'express';
import { signup, login } from '../controller/auth';

const router = Router();

// Signup Route
router.post('/signup', signup);

// Login Route
router.post('/login', login);



export default router;
