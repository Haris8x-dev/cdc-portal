import app from './app.js';
import connectDB from './config/db.js'; // Ensure you add the .js extension in ES Modules

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

const server = app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Graceful shutdown for unhandled rejections
process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err.message}`);
    server.close(() => process.exit(1));
});