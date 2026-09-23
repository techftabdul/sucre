const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

// GET /api/halls - List all halls with parsed features
router.get('/', async (req, res) => {
  try {
    const halls = await prisma.hall.findMany({
      orderBy: { grade: 'asc' }
    });
    
    const formattedHalls = halls.map(h => ({
      ...h,
      features: typeof h.features === 'string' ? JSON.parse(h.features) : h.features
    }));

    res.json({ success: true, data: formattedHalls });
  } catch (error) {
    console.error('Error fetching halls:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch halls' });
  }
});

// GET /api/halls/:id - Get single hall by ID
router.get('/:id', async (req, res) => {
  try {
    const hall = await prisma.hall.findUnique({
      where: { id: req.params.id }
    });
    if (!hall) {
      return res.status(404).json({ success: false, error: 'Hall not found' });
    }

    res.json({
      success: true,
      data: {
        ...hall,
        features: typeof hall.features === 'string' ? JSON.parse(hall.features) : hall.features
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch hall' });
  }
});

module.exports = router;
