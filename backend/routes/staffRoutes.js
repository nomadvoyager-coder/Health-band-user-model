const express = require('express');
const router = express.Router();
const authenticateStaff = require('../middleware/authMiddleware');
const {
  getProfile,
  getVitals,
  getRoomLogs
} = require('../controllers/staffController');

// All routes are protected by JWT
router.get('/profile', authenticateStaff, getProfile);
router.get('/vitals', authenticateStaff, getVitals);
router.get('/rooms', authenticateStaff, getRoomLogs);

module.exports = router;
