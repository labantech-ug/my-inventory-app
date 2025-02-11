const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const authMiddleware = require('../middleware/authMiddleware');
require('dotenv').config();

const prisma = new PrismaClient();
const router = express.Router();
const secretKey = process.env.JWT_SECRET; // Ensure you have this in your .env file

// Register a new user
router.post('/register', async (req, res) => {
  const { username, email, password, role } = req.body;

  if (!email || !password || !username || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    let user = await prisma.user.findUnique({
      where: { email }
    });

    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        role,  // Ensure that the role is being passed correctly
      },
    });

    const token = jwt.sign({ userId: user.id, role: user.role }, secretKey, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Login a user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, secretKey, { expiresIn: '1h' });
    res.json({ token, role: user.role });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Define the profile endpoint
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Error fetching user profile', error: error.message });
  }
});

module.exports = router;