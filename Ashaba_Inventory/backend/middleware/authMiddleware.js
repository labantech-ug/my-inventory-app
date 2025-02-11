const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient();
const secretKey = process.env.JWT_SECRET; // Use the secret key from .env file

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];


  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Error in auth middleware:', error);
    res.status(500).json({ message: 'Error in authentication', error: error.message });
  }
};

module.exports = authMiddleware;