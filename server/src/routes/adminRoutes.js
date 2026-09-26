const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { db } = require('../firebaseAdmin');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'sucre_cathedral_super_secret_jwt_key_2026';

// Middleware for Admin JWT authentication
const verifyAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, error: 'Unauthorized: Missing or invalid token' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, error: 'Unauthorized: Token expired or invalid' });
  }
};

// POST /api/admin/login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body; 

    if (!username || !password) {
      return res.status(400).json({ success: false, error: 'Username/Email and password are required' });
    }

    const adminsRef = db.collection('admins');
    // Check if they used email or username
    let snapshot = await adminsRef.where('email', '==', username).get();
    if (snapshot.empty) {
      snapshot = await adminsRef.where('username', '==', username).get();
    }
    
    if (snapshot.empty) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    const adminDoc = snapshot.docs[0];
    const admin = adminDoc.data();

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: adminDoc.id, email: admin.email, role: admin.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      token,
      admin: {
        id: adminDoc.id,
        email: admin.email,
        name: admin.name,
        role: admin.role
      }
    });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ success: false, error: 'Authentication failed' });
  }
});

// GET /api/admin/analytics - Return real-time revenue and booking statistics
router.get('/analytics', verifyAdmin, async (req, res) => {
  try {
    const bookingsSnapshot = await db.collection('bookings').get();
    const paymentsSnapshot = await db.collection('payments').where('status', '==', 'SUCCESS').get();

    let totalRevenueExpected = 0;
    let totalDepositsCollected = 0;
    let totalBalancesOutstanding = 0;

    let totalCount = 0;
    let pendingCount = 0;
    let depositPaidCount = 0;
    let fullyPaidCount = 0;
    let cancelledCount = 0;

    bookingsSnapshot.forEach(doc => {
      const b = doc.data();
      totalCount++;
      totalRevenueExpected += b.totalAmount || 0;
      
      if (b.status === 'DEPOSIT_PAID') {
        depositPaidCount++;
        totalDepositsCollected += b.depositAmount || 0;
        totalBalancesOutstanding += b.balanceAmount || 0;
      } else if (b.status === 'FULLY_PAID') {
        fullyPaidCount++;
        totalDepositsCollected += b.totalAmount || 0;
      } else if (b.status === 'PENDING') {
        pendingCount++;
      } else if (b.status === 'CANCELLED') {
        cancelledCount++;
      }
    });

    const statusCounts = {
      TOTAL: totalCount,
      PENDING: pendingCount,
      DEPOSIT_PAID: depositPaidCount,
      FULLY_PAID: fullyPaidCount,
      CANCELLED: cancelledCount,
    };

    res.json({
      success: true,
      data: {
        totalRevenueExpected,
        totalDepositsCollected,
        totalBalancesOutstanding,
        statusCounts,
        recentPaymentsCount: paymentsSnapshot.size
      }
    });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch analytics' });
  }
});

// GET /api/admin/bookings
router.get('/bookings', verifyAdmin, async (req, res) => {
  try {
    const { status, search } = req.query;

    let query = db.collection('bookings');
    
    if (status && status !== 'ALL') {
      query = query.where('status', '==', status);
    }

    const snapshot = await query.orderBy('createdAt', 'desc').get();
    let bookings = [];

    snapshot.forEach(doc => {
      const b = doc.data();
      // Client-side search since Firestore doesn't support full-text search out of the box
      if (search) {
        const s = search.toLowerCase();
        if (
          !(b.reference && b.reference.toLowerCase().includes(s)) &&
          !(b.customerName && b.customerName.toLowerCase().includes(s)) &&
          !(b.customerEmail && b.customerEmail.toLowerCase().includes(s)) &&
          !(b.customerPhone && b.customerPhone.toLowerCase().includes(s))
        ) {
          return;
        }
      }
      bookings.push({ id: doc.id, ...b });
    });

    res.json({ success: true, data: bookings });
  } catch (error) {
    console.error('Fetch bookings error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch bookings' });
  }
});

// PUT /api/admin/bookings/:id/status
router.put('/bookings/:id/status', verifyAdmin, async (req, res) => {
  try {
    const { status, notes } = req.body;
    const { id } = req.params;

    const bookingRef = db.collection('bookings').doc(id);
    const doc = await bookingRef.get();
    
    if (!doc.exists) {
      return res.status(404).json({ success: false, error: 'Booking not found' });
    }

    const updateData = { status };
    if (notes !== undefined) updateData.notes = notes;

    await bookingRef.update(updateData);

    res.json({
      success: true,
      message: `Booking status updated to ${status}`,
      data: { id, ...doc.data(), ...updateData }
    });
  } catch (error) {
    console.error('Update status error:', error);
    res.status(500).json({ success: false, error: 'Failed to update booking status' });
  }
});

module.exports = router;
