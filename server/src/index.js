const express = require('express');
const cors = require('cors');
require('dotenv').config();

const hallRoutes = require('./routes/hallRoutes');
const packageRoutes = require('./routes/packageRoutes');
const addonRoutes = require('./routes/addonRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/halls', hallRoutes);
app.use('/api/packages', packageRoutes);
app.use('/api/addons', addonRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/paystack', paymentRoutes);
app.use('/api/admin', adminRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    service: 'SUCRE Events Centre API',
    timestamp: new Date().toISOString()
  });
});

// Start Express Server
app.listen(PORT, () => {
  console.log(`🏰 SUCRE Events Centre Server running on http://localhost:${PORT}`);
});
