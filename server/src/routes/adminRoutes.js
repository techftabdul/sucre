const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
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

// POST /api/admin/login - Authenticate admin credentials
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ success: false, error: 'Username and password are required' });
    }

    const admin = await prisma.admin.findUnique({ where: { username } });
    if (!admin) {
      return res.status(401).json({ success: false, error: 'Invalid username or password' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid username or password' });
    }

    const token = jwt.sign(
      { id: admin.id, username: admin.username, role: admin.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      token,
      admin: {
        id: admin.id,
        username: admin.username,
        name: admin.name,
        email: admin.email,
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
    const allBookings = await prisma.booking.findMany();
    const payments = await prisma.payment.findMany({ where: { status: 'SUCCESS' } });

    let totalRevenueExpected = 0;
    let totalDepositsCollected = 0;
    let totalBalancesOutstanding = 0;

    allBookings.forEach(b => {
      totalRevenueExpected += b.totalAmount;
      if (b.status === 'DEPOSIT_PAID') {
        totalDepositsCollected += b.depositAmount;
        totalBalancesOutstanding += b.balanceAmount;
      } else if (b.status === 'FULLY_PAID') {
        totalDepositsCollected += b.totalAmount;
      }
    });

    const statusCounts = {
      TOTAL: allBookings.length,
      PENDING: allBookings.filter(b => b.status === 'PENDING').length,
      DEPOSIT_PAID: allBookings.filter(b => b.status === 'DEPOSIT_PAID').length,
      FULLY_PAID: allBookings.filter(b => b.status === 'FULLY_PAID').length,
      CANCELLED: allBookings.filter(b => b.status === 'CANCELLED').length,
    };

    res.json({
      success: true,
      data: {
        totalRevenueExpected,
        totalDepositsCollected,
        totalBalancesOutstanding,
        statusCounts,
        recentPaymentsCount: payments.length
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch analytics' });
  }
});

// GET /api/admin/bookings - Fetch list of bookings with optional status/search filters
router.get('/bookings', verifyAdmin, async (req, res) => {
  try {
    const { status, search } = req.query;

    let whereClause = {};
    if (status && status !== 'ALL') {
      whereClause.status = status;
    }
    if (search) {
      whereClause.OR = [
        { reference: { contains: search } },
        { customerName: { contains: search } },
        { customerEmail: { contains: search } },
        { customerPhone: { contains: search } }
      ];
    }

    const bookings = await prisma.booking.findMany({
      where: whereClause,
      include: {
        hall: true,
        package: true,
        addons: { include: { addon: true } },
        payments: true
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({ success: true, data: bookings });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch bookings' });
  }
});

// PUT /api/admin/bookings/:id/status - Update booking status
router.put('/bookings/:id/status', verifyAdmin, async (req, res) => {
  try {
    const { status, notes } = req.body;
    const { id } = req.params;

    const updated = await prisma.booking.update({
      where: { id },
      data: {
        status,
        ...(notes !== undefined && { notes })
      },
      include: { hall: true, package: true }
    });

    res.json({
      success: true,
      message: `Booking status updated to ${status}`,
      data: updated
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to update booking status' });
  }
});

module.exports = router;
