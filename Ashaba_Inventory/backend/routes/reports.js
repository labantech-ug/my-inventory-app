const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router();

// Generate report based on report type
router.get('/generate', async (req, res) => {
  const { type } = req.query;

  try {
    let reportData = [];

    if (type === 'daily') {
      reportData = await prisma.sale.findMany({
        where: {
          createdAt: {
            gte: new Date(new Date().setDate(new Date().getDate() - 1))
          }
        }
      });
    } else if (type === 'weekly') {
      reportData = await prisma.sale.findMany({
        where: {
          createdAt: {
            gte: new Date(new Date().setDate(new Date().getDate() - 7))
          }
        }
      });
    } else if (type === 'monthly') {
      reportData = await prisma.sale.findMany({
        where: {
          createdAt: {
            gte: new Date(new Date().setMonth(new Date().getMonth() - 1))
          }
        }
      });
    }

    res.status(200).json({ reportData });
  } catch (error) {
    console.error('Error generating report:', error);
    res.status(500).json({ message: 'Error generating report', error: error.message });
  }
});

// Fetch sales data within a date range
router.get('/sales', async (req, res) => {
    const { startDate, endDate } = req.query;
  
    try {
      const sales = await prisma.sale.findMany({
        where: {
          AND: [
            { createdAt: { gte: new Date(startDate) } },
            { createdAt: { lte: new Date(endDate) } }
          ]
        },
        orderBy: {
          createdAt: 'asc'
        }
      });
  
      res.status(200).json({ sales });
    } catch (error) {
      console.error('Error fetching sales data:', error);
      res.status(500).json({ message: 'Error fetching sales data', error: error.message });
    }
  });

module.exports = router;