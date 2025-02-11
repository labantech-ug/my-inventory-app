const express = require('express');
const { PrismaClient } = require('@prisma/client');
const authMiddleware = require('../middleware/authMiddleware');

const prisma = new PrismaClient();
const router = express.Router();

// Get all expenses
router.get('/', authMiddleware, async (req, res) => {
  try {
    const expenses = await prisma.expense.findMany();
    res.status(200).json(expenses);
  } catch (error) {
    console.error('Error fetching expenses:', error);
    res.status(500).json({ message: 'Error fetching expenses', error: error.message });
  }
});

// Add a new expense
router.post('/', authMiddleware, async (req, res) => {
  const { category, amount, date, description } = req.body;

  try {
    const newExpense = await prisma.expense.create({
      data: {
        category,
        amount: parseFloat(amount),
        date: new Date(date),
        description,
      },
    });

    res.status(201).json(newExpense);
  } catch (error) {
    console.error('Error adding expense:', error);
    res.status(500).json({ message: 'Error adding expense', error: error.message });
  }
});

// Delete an expense
router.delete('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.expense.delete({ where: { id: parseInt(id, 10) } });
    res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (error) {
    console.error('Error deleting expense:', error);
    res.status(500).json({ message: 'Error deleting expense', error: error.message });
  }
});

module.exports = router;