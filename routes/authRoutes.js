import express from 'express';
import { registerUser } from '../controllers/auth/authRegister.js';
import { loginUser } from '../controllers/auth/authLogin.js';

const router = express.Router();

// Route: POST /api/auth/register
router.post('/register', registerUser);
router.post('/login', loginUser)

export default router;