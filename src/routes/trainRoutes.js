// src/routes/trainRoutes.js
const express = require('express');
const { addTrain, getTrainAvailability } = require('../controllers/trainController');
const { authenticateUser, isAdmin, validateAdminKey } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/add', authenticateUser, isAdmin, validateAdminKey, addTrain);
router.get('/availability', authenticateUser, getTrainAvailability);

module.exports = router;