const express = require('express');
const router = express.Router();
const { loginStaff } = require('../controllers/authController');

// POST /api/auth/login
router.post('/login', loginStaff);  // pass the function reference ONLY

module.exports = router;
