import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';

// Import Routes
import authRoutes from './routes/authRoutes.js';
import studentPortalRoutes from './routes/studentPortalRoutes.js'

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true 
}));

// Route Middlewares
app.use('/api/auth', authRoutes);
app.use('/api/student-portal', studentPortalRoutes)

// Health Check Route
app.get('/', (req, res) => {
    res.status(200).json({ message: "CDC-Portal API is running..." });
});

export default app;