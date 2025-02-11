const express = require('express');
const { PrismaClient } = require('@prisma/client');
const authMiddleware = require('../middleware/authMiddleware');

const prisma = new PrismaClient();
const router = express.Router();

// Get all sales with optional date range filtering
router.get('/', async (req, res) => {
  const { startDate, endDate } = req.query;

  try {
    let sales;

    if (startDate && endDate) {
      sales = await prisma.sale.findMany({
        where: {
          date: {
            gte: new Date(startDate),
            lte: new Date(endDate),
          },
        },
        include: { user: true }, // Include user details
      });
    } else {
      sales = await prisma.sale.findMany({
        include: { user: true }, // Include user details
      });
    }

    res.status(200).json(sales);
  } catch (error) {
    console.error('Error fetching sales:', error);
    res.status(500).json({ message: 'Error fetching sales', error: error.message });
  }
});

// Add a new sale
router.post('/', authMiddleware, async (req, res) => {
  const { itemName, quantity, priceSold } = req.body;

  try {
    const stockItem = await prisma.inventory.findFirst({
      where: { itemName: itemName.trim().toLowerCase() },
    });

    if (!stockItem || stockItem.quantity < quantity) {
      return res.status(400).json({ message: 'Insufficient stock or item not found' });
    }

    const newSale = await prisma.sale.create({
      data: {
        itemName: itemName.trim().toLowerCase(),
        quantity: parseInt(quantity, 10),
        priceBought: stockItem.priceBought,
        priceSold: parseFloat(priceSold),
        remainingStock: stockItem.quantity - parseInt(quantity, 10),
        userId: req.user.id,
      },
    });

    await prisma.inventory.update({
      where: { id: stockItem.id },
      data: { quantity: stockItem.quantity - parseInt(quantity, 10) },
    });

    // Log the sale for the admin
    await prisma.log.create({
      data: {
        userId: req.user.id,
        action: `Added sale for item ${itemName}`,
        timestamp: new Date(),
      },
    });

    res.status(201).json(newSale);
  } catch (error) {
    console.error('Error adding sale:', error);
    res.status(500).json({ message: 'Error adding sale', error: error.message });
  }
});

// Update sale and adjust stock
router.put('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { itemName, quantity, priceSold } = req.body;
  const saleId = parseInt(id, 10); // Convert to integer

  if (isNaN(saleId)) {
    return res.status(400).json({ message: 'Invalid sale ID' });
  }

  try {
    const sale = await prisma.sale.findUnique({ where: { id: saleId } });
    if (!sale) {
      return res.status(404).json({ message: 'Sale not found' });
    }

    const stockItem = await prisma.inventory.findFirst({ where: { itemName: sale.itemName } });
    if (!stockItem) {
      return res.status(404).json({ message: 'Stock item not found' });
    }

    const quantityDifference = parseInt(quantity, 10) - sale.quantity;
    if (stockItem.quantity + sale.quantity < parseInt(quantity, 10)) {
      return res.status(400).json({ message: 'Insufficient stock to update sale' });
    }

    await prisma.inventory.update({
      where: { id: stockItem.id },
      data: { quantity: stockItem.quantity - quantityDifference },
    });

    const updatedSale = await prisma.sale.update({
      where: { id: saleId },
      data: {
        itemName: itemName.trim().toLowerCase(),
        quantity: parseInt(quantity, 10),
        priceSold: parseFloat(priceSold),
        userId: req.user.id,
      },
    });

    // Log the update for the admin
    await prisma.log.create({
      data: {
        userId: req.user.id,
        action: `Updated sale for item ${itemName}`,
        timestamp: new Date(),
      },
    });

    res.status(200).json({ message: 'Sale updated successfully', sale: updatedSale });
  } catch (error) {
    console.error('Error updating sale:', error);
    res.status(500).json({ message: 'Error updating sale', error: error.message });
  }
});

// Delete sale
router.delete('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const saleId = parseInt(id, 10); // Convert to integer

  if (isNaN(saleId)) {
    return res.status(400).json({ message: 'Invalid sale ID' });
  }

  try {
    const sale = await prisma.sale.findUnique({ where: { id: saleId } });
    if (!sale) {
      return res.status(404).json({ message: 'Sale not found' });
    }

    const stockItem = await prisma.inventory.findFirst({ where: { itemName: sale.itemName } });
    if (stockItem) {
      await prisma.inventory.update({
        where: { id: stockItem.id },
        data: { quantity: stockItem.quantity + sale.quantity },
      });
    }

    await prisma.sale.delete({ where: { id: saleId } });

    // Log the deletion for the admin
    await prisma.log.create({
      data: {
        userId: req.user.id,
        action: `Deleted sale for item ${sale.itemName}`,
        timestamp: new Date(),
      },
    });

    res.status(200).json({ message: 'Sale deleted successfully' });
  } catch (error) {
    console.error('Error deleting sale:', error);
    res.status(500).json({ message: 'Error deleting sale', error: error.message });
  }
});

// Calculate profits and losses
router.get('/profits-losses', async (req, res) => {
  try {
    const sales = await prisma.sale.findMany();

    const totalProfit = sales.reduce((sum, sale) => {
      const profitLoss = (sale.priceSold - sale.priceBought) * sale.quantity;
      return profitLoss > 0 ? sum + profitLoss : sum;
    }, 0);

    const totalLoss = sales.reduce((sum, sale) => {
      const profitLoss = (sale.priceSold - sale.priceBought) * sale.quantity;
      return profitLoss < 0 ? sum + Math.abs(profitLoss) : sum;
    }, 0);

    res.status(200).json({ totalProfit, totalLoss });
  } catch (error) {
    console.error('Error calculating profits and losses:', error);
    res.status(500).json({ message: 'Error calculating profits and losses', error: error.message });
  }
});

module.exports = router;