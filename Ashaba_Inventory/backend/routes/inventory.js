const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router();

// Add a new stock item or update existing one
router.post('/add', async (req, res) => {
  const { itemName, quantity, priceBought } = req.body;

  try {
    const normalizedItemName = itemName.trim().toLowerCase(); // Normalize item name
    const stockItem = await prisma.inventory.findFirst({
      where: {
        itemName: normalizedItemName
      }
    });

    if (stockItem) {
      // Update existing item
      const updatedStock = await prisma.inventory.update({
        where: { id: stockItem.id },
        data: {
          quantity: stockItem.quantity + parseInt(quantity, 10),
          priceBought: parseFloat(priceBought)
        },
      });
      res.status(200).json(updatedStock);
    } else {
      // Create new item
      const newStock = await prisma.inventory.create({
        data: {
          itemName: normalizedItemName, // Store item name in lowercase
          quantity: parseInt(quantity, 10),
          priceBought: parseFloat(priceBought)
        },
      });
      res.status(200).json(newStock);
    }
  } catch (error) {
    console.error('Error adding stock:', error);
    res.status(500).json({ message: 'Error adding stock', error: error.message });
  }
});

// Get total stock
router.get('/total', async (req, res) => {
  try {
    const totalStock = await prisma.inventory.findMany();
    res.status(200).json(totalStock);
  } catch (error) {
    console.error('Error fetching stock:', error);
    res.status(500).json({ message: 'Error fetching stock', error: error.message });
  }
});

// Sell stock (reduce quantity)
router.post('/sell', async (req, res) => {
  const { itemName, quantity, priceSold } = req.body;

  try {
    const normalizedItemName = itemName.trim().toLowerCase(); // Normalize item name
    const stockItem = await prisma.inventory.findFirst({
      where: {
        itemName: normalizedItemName
      }
    });

    if (!stockItem) {
      return res.status(400).json({ message: 'Product is out of stock' });
    }

    if (stockItem.quantity < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }

    const updatedStock = await prisma.inventory.update({
      where: { id: stockItem.id },
      data: {
        quantity: stockItem.quantity - quantity
      }
    });

    const newSale = await prisma.sale.create({
      data: {
        itemName: normalizedItemName, // Store item name in lowercase
        quantity: parseInt(quantity, 10),
        priceBought: stockItem.priceBought,
        priceSold: parseFloat(priceSold),
        remainingStock: stockItem.quantity - parseInt(quantity, 10),
        userId: 1  // Replace with actual user ID from context or request
      }
    });

    res.status(200).json(updatedStock);
  } catch (error) {
    console.error('Error selling stock:', error);
    res.status(500).json({ message: 'Error selling stock', error: error.message });
  }
});

// Delete inventory item
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.inventory.delete({ where: { id: parseInt(id, 10) } });
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ message: 'Error deleting item', error: error.message });
  }
});

// Update inventory item
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { itemName, quantity, priceBought } = req.body;

  try {
    const updatedStock = await prisma.inventory.update({
      where: { id: parseInt(id, 10) },
      data: {
        itemName,
        quantity: parseInt(quantity, 10),
        priceBought: parseFloat(priceBought)
      }
    });

    res.status(200).json(updatedStock);
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).json({ message: 'Error updating item', error: error.message });
  }
});

// Get all inventory items
router.get('/', async (req, res) => {
  try {
    const inventory = await prisma.inventory.findMany();
    res.status(200).json(inventory);
  } catch (error) {
    console.error('Error fetching inventory:', error);
    res.status(500).json({ message: 'Error fetching inventory', error: error.message });
  }
});

// Get a single inventory item by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const inventoryItem = await prisma.inventory.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!inventoryItem) {
      return res.status(404).json({ message: 'Inventory item not found' });
    }

    res.status(200).json(inventoryItem);
  } catch (error) {
    console.error('Error fetching inventory item:', error);
    res.status(500).json({ message: 'Error fetching inventory item', error: error.message });
  }
});

module.exports = router;