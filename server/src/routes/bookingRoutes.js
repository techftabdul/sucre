const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

// Helper to generate reference code
function generateReference() {
  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  return `SUCRE-2026-${randomDigits}`;
}

// POST /api/bookings/calculate - Calculate cost breakdown
router.post('/calculate', async (req, res) => {
  try {
    const { hallId, packageId, addonIds = [], guestCount = 200 } = req.body;

    if (!hallId || !packageId) {
      return res.status(400).json({ success: false, error: 'hallId and packageId are required' });
    }

    const hall = await prisma.hall.findUnique({ where: { id: hallId } });
    const pkg = await prisma.package.findUnique({ where: { id: packageId } });

    if (!hall || !pkg) {
      return res.status(404).json({ success: false, error: 'Selected Hall or Package not found' });
    }

    // Selected Addons
    const addons = await prisma.addon.findMany({
      where: { id: { in: addonIds } }
    });

    let addonsCost = 0;
    const addonBreakdown = addons.map(a => {
      const itemCost = a.unit === 'per guest' ? a.price * Number(guestCount) : a.price;
      addonsCost += itemCost;
      return {
        id: a.id,
        name: a.name,
        unitPrice: a.price,
        calculatedPrice: itemCost,
        unit: a.unit
      };
    });

    const hallCost = hall.basePrice;
    const packageCost = pkg.price;
    const totalAmount = hallCost + packageCost + addonsCost;
    const depositAmount = totalAmount * 0.5; // 50% deposit policy
    const balanceAmount = totalAmount * 0.5;

    res.json({
      success: true,
      data: {
        hall: { id: hall.id, name: hall.name, grade: hall.grade, cost: hallCost },
        package: { id: pkg.id, name: pkg.name, tier: pkg.tier, cost: packageCost },
        guestCount: Number(guestCount),
        addons: addonBreakdown,
        addonsTotal: addonsCost,
        totalAmount,
        depositAmount,
        balanceAmount,
        policy: {
          depositPercent: 50,
          balanceDueDaysBefore: 14
        }
      }
    });
  } catch (error) {
    console.error('Calculation error:', error);
    res.status(500).json({ success: false, error: 'Failed to calculate booking total' });
  }
});

// POST /api/bookings/create - Create booking record
router.post('/create', async (req, res) => {
  try {
    const {
      customerName,
      customerEmail,
      customerPhone,
      eventType,
      guestCount = 200,
      eventDate,
      hallId,
      packageId,
      addonIds = [],
      notes
    } = req.body;

    if (!customerName || !customerEmail || !customerPhone || !hallId || !packageId || !eventDate) {
      return res.status(400).json({ success: false, error: 'All required customer and booking fields must be provided' });
    }

    const hall = await prisma.hall.findUnique({ where: { id: hallId } });
    const pkg = await prisma.package.findUnique({ where: { id: packageId } });

    if (!hall || !pkg) {
      return res.status(404).json({ success: false, error: 'Hall or Package invalid' });
    }

    // Selected Addons
    const addons = await prisma.addon.findMany({
      where: { id: { in: addonIds } }
    });

    let addonsCost = 0;
    const addonDetails = addons.map(a => {
      const price = a.unit === 'per guest' ? a.price * Number(guestCount) : a.price;
      addonsCost += price;
      return { addonId: a.id, price };
    });

    const totalAmount = hall.basePrice + pkg.price + addonsCost;
    const depositAmount = totalAmount * 0.5;
    const balanceAmount = totalAmount * 0.5;
    const reference = generateReference();

    const booking = await prisma.booking.create({
      data: {
        reference,
        customerName,
        customerEmail,
        customerPhone,
        eventType,
        guestCount: Number(guestCount),
        eventDate: new Date(eventDate),
        hallId,
        packageId,
        totalAmount,
        depositAmount,
        balanceAmount,
        status: 'PENDING',
        notes: notes || '',
        addons: {
          create: addonDetails
        }
      },
      include: {
        hall: true,
        package: true,
        addons: { include: { addon: true } }
      }
    });

    res.json({
      success: true,
      message: 'Booking reference created successfully',
      data: booking
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ success: false, error: 'Failed to create booking' });
  }
});

// GET /api/bookings/:reference - Lookup booking details by reference
router.get('/:reference', async (req, res) => {
  try {
    const booking = await prisma.booking.findUnique({
      where: { reference: req.params.reference },
      include: {
        hall: true,
        package: true,
        addons: { include: { addon: true } },
        payments: true
      }
    });

    if (!booking) {
      return res.status(404).json({ success: false, error: 'Booking reference not found' });
    }

    res.json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to retrieve booking' });
  }
});

module.exports = router;
