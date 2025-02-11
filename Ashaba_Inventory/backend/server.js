require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const reportsRoutes = require('./routes/reports');
// Importing route modules
const authRoutes = require('./routes/auth');
const inventoryRoutes = require('./routes/inventory');
const salesRoutes = require('./routes/sales');
const usersRoutes = require('./routes/users');
const profileRoutes = require('./routes/profile');
const expensesRoutes = require('./routes/expenses');
const prisma = new PrismaClient(); // Initialize Prisma client
const app = express(); // Create an Express app

// Middleware setup
app.use(express.json()); // Parse incoming JSON requests
app.use(cors()); // Enable Cross-Origin Resource Sharing

// Define the port
const PORT = process.env.PORT || 5000;

// Health check route (can also be used for server monitoring)
app.get('/', async (req, res) => {
  try {
    const users = await prisma.user.findMany(); // Fetch all users (example)
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      message: 'Error fetching users',
      error: error.message,
    });
  }
});

// Routes setup
app.use('/auth', authRoutes); // Authentication routes
app.use('/inventory', inventoryRoutes); // Inventory management routes
app.use('/sales', salesRoutes); // Sales management routes
app.use('/reports', reportsRoutes);
app.use('/users', usersRoutes);
app.use('/profile', profileRoutes);
app.use('/expenses', expensesRoutes);

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error('Unexpected error:', err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: err.message,
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // You can log this to a monitoring system or alert service
});

// Handle uncaught exceptions to prevent crashes
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err.stack || err.message || err);
  // Optionally exit the process with a non-zero code for critical errors
  process.exit(1);
});