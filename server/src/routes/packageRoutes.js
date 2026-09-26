const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  res.json({ success: true, data: [
    {
      id: 'pkg-flagship',
      tier: 'Flagship',
      name: 'The Cathedral All-Inclusive Package',
      price: 0,
      features: ['Exclusive Full-Venue Access']
    }
  ]});
});

module.exports = router;
