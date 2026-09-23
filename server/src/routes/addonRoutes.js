const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

// GET /api/addons - List all available add-ons
router.get('/', async (req, res) => {
  try {
    const addons = await prisma.addon.findMany({
      orderBy: { category: 'asc' }
    });
    res.json({ success: true, data: addons });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch add-ons' });
  }
});

module.exports = router;
