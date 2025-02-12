// src/routes/bookingRoutes.js
const express = require('express');
const { bookSeat, getBookingDetails } = require('../controllers/bookingController');
const { authenticateUser } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/book', authenticateUser, async (req, res) => {
  const { trainId } = req.body;

  if (!trainId || typeof trainId !== 'number') {
    return res.status(400).json({ error: 'Invalid train ID' });
  }

  await bookSeat(req, res);
});

router.get('/details', authenticateUser, async (req, res) => {
  await getBookingDetails(req, res);
});

module.exports = router;