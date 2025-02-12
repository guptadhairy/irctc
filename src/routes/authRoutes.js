// src/routes/authRoutes.js
const express = require('express');
const { registerUser, loginUser, getUserProfile, updateUserProfile } = require('../controllers/authController');
const { authenticateUser } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/getuser', authenticateUser, getUserProfile);
router.get('/updateuser', authenticateUser, updateUserProfile);


module.exports = router;