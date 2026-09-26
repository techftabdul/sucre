const express = require('express');
const axios = require('axios');
const { db } = require('../firebaseAdmin');
const router = express.Router();

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY || 'sk_test_sucre_cathedral_demo_secret_key';
const PAYSTACK_PUBLIC = process.env.PAYSTACK_PUBLIC_KEY || 'pk_test_sucre_cathedral_demo_public_key';

router.get('/config', (req, res) => {
  res.json({ success: true, publicKey: PAYSTACK_PUBLIC });
});

router.post('/initialize', async (req, res) => {
  try {
    const { bookingId, email, amount } = req.body;
    if (!bookingId || !email || !amount) {
      return res.status(400).json({ success: false, error: 'bookingId, email, and amount are required' });
    }

    const bookingRef = db.collection('bookings').doc(bookingId);
    const bookingDoc = await bookingRef.get();
    
    if (!bookingDoc.exists) {
      return res.status(404).json({ success: false, error: 'Booking not found' });
    }
    const booking = bookingDoc.data();
    
    const reference = `PAY-${booking.reference}-${Date.now().toString().slice(-6)}`;
    const koboAmount = Math.round(Number(amount) * 100);

    return res.json({
      success: true,
      data: {
        authorization_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/book?reference=${booking.reference}&status=success&test_pay=true`,
        access_code: `test_access_${Date.now()}`,
        reference
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Payment initialization failed' });
  }
});

router.post('/verify', async (req, res) => {
  try {
    const { reference, bookingReference, paystackRef } = req.body;
    if (!bookingReference) return res.status(400).json({ success: false, error: 'bookingReference is required' });

    const snapshot = await db.collection('bookings').where('reference', '==', bookingReference).get();
    if (snapshot.empty) return res.status(404).json({ success: false, error: 'Booking not found' });

    const bookingDoc = snapshot.docs[0];
    const booking = bookingDoc.data();

    // Verify payment record exists
    const paymentSnapshot = await db.collection('payments')
      .where('bookingId', '==', bookingDoc.id)
      .where('status', '==', 'SUCCESS').get();

    if (!paymentSnapshot.empty) {
      return res.json({
        success: true,
        message: 'Payment already verified',
        data: { booking, payment: paymentSnapshot.docs[0].data() }
      });
    }

    const txnRef = reference || `PAY-${booking.reference}-${Date.now().toString().slice(-4)}`;
    
    const paymentData = {
      reference: txnRef,
      bookingId: bookingDoc.id,
      amount: booking.depositAmount,
      gateway: 'PAYSTACK',
      status: 'SUCCESS',
      channel: 'card/bank_transfer',
      paystackRef: paystackRef || txnRef,
      createdAt: new Date().toISOString()
    };
    
    const newPaymentRef = await db.collection('payments').add(paymentData);

    await bookingDoc.ref.update({
      status: 'DEPOSIT_PAID',
      paystackRef: paystackRef || txnRef
    });

    res.json({
      success: true,
      message: '50% Deposit Payment verified successfully! Your booking is confirmed.',
      data: {
        booking: { id: bookingDoc.id, ...booking, status: 'DEPOSIT_PAID' },
        payment: { id: newPaymentRef.id, ...paymentData }
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to verify payment' });
  }
});

router.post('/webhook', async (req, res) => {
  res.status(200).json({ received: true });
});

module.exports = router;
