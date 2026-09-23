const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

// GET /api/packages - List all experience tiers
router.get('/', async (req, res) => {
  try {
    const packages = await prisma.package.findMany({
      orderBy: { price: 'asc' }
    });
    
    const formatted = packages.map(p => ({
      ...p,
      features: typeof p.features === 'string' ? JSON.parse(p.features) : p.features
    }));

    res.json({ success: true, data: formatted });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch packages' });
  }
});

module.exports = router;
