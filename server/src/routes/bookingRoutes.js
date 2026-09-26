const express = require('express');
const { db } = require('../firebaseAdmin');
const router = express.Router();

function generateReference() {
  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  return `SUCRE-2026-${randomDigits}`;
}

// POST /api/bookings/calculate - Calculate cost breakdown
router.post('/calculate', async (req, res) => {
  try {
    const { guestCount = 200 } = req.body;
    
    // Hardcode Flagship values for the streamlined architecture
    const hallCost = 2800000;
    const packageCost = 0;
    const addonsCost = 0; // stripped addons

    const totalAmount = hallCost + packageCost + addonsCost;
    const depositAmount = totalAmount * 0.5;
    const balanceAmount = totalAmount * 0.5;

    res.json({
      success: true,
      data: {
        hall: { id: 'hall-cathedral', name: 'SUCRE Flagship Hall', cost: hallCost },
        package: { id: 'pkg-flagship', name: 'The Cathedral All-Inclusive Package', tier: 'Flagship', cost: packageCost },
        guestCount: Number(guestCount),
        addons: [],
        addonsTotal: addonsCost,
        totalAmount,
        depositAmount,
        balanceAmount,
        policy: { depositPercent: 50, balanceDueDaysBefore: 14 }
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
    const { customerName, customerEmail, customerPhone, eventType, guestCount = 200, eventDate, notes } = req.body;

    if (!customerName || !customerEmail || !customerPhone || !eventDate) {
      return res.status(400).json({ success: false, error: 'All required fields must be provided' });
    }

    const hallCost = 2800000;
    const totalAmount = hallCost;
    const depositAmount = totalAmount * 0.5;
    const balanceAmount = totalAmount * 0.5;
    const reference = generateReference();

    const bookingData = {
      reference,
      customerName,
      customerEmail,
      customerPhone,
      eventType,
      guestCount: Number(guestCount),
      eventDate: new Date(eventDate).toISOString(),
      hallId: 'hall-cathedral',
      packageId: 'pkg-flagship',
      totalAmount,
      depositAmount,
      balanceAmount,
      status: 'PENDING',
      notes: notes || '',
      createdAt: new Date().toISOString()
    };

    const docRef = await db.collection('bookings').add(bookingData);

    res.json({
      success: true,
      message: 'Booking reference created successfully',
      data: { id: docRef.id, ...bookingData }
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ success: false, error: 'Failed to create booking' });
  }
});

// GET /api/bookings/:reference - Lookup booking
router.get('/:reference', async (req, res) => {
  try {
    const snapshot = await db.collection('bookings').where('reference', '==', req.params.reference).get();
    
    if (snapshot.empty) {
      return res.status(404).json({ success: false, error: 'Booking reference not found' });
    }

    const bookingDoc = snapshot.docs[0];
    const booking = { id: bookingDoc.id, ...bookingDoc.data() };

    res.json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to retrieve booking' });
  }
});

module.exports = router;
