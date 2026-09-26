const express = require('express');
const { db } = require('../firebaseAdmin');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const snapshot = await db.collection('halls').get();
    let halls = [];
    snapshot.forEach(doc => {
      halls.push({ id: doc.id, ...doc.data() });
    });
    res.json({ success: true, data: halls });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch halls' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const doc = await db.collection('halls').doc(req.params.id).get();
    if (!doc.exists) return res.status(404).json({ success: false, error: 'Hall not found' });
    res.json({ success: true, data: { id: doc.id, ...doc.data() } });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch hall' });
  }
});

module.exports = router;
