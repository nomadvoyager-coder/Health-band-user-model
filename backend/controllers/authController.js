const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const loginStaff = async (req, res) => {
  const { staff_id, password } = req.body; // plain password from frontend

  try {
    // Fetch staff from DB
    const result = await pool.query(
      'SELECT staff_id, full_name, password_hash FROM staff_credentials WHERE staff_id = $1',
      [staff_id]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ message: 'Staff not found' });
    }

    const staff = result.rows[0];

    // Check password
    const validPassword = await bcrypt.compare(password, staff.password_hash);
    if (!validPassword) {
      return res.status(400).json({ message: 'Incorrect password' });
    }

    // Generate JWT
    const token = jwt.sign(
      { staff_id: staff.staff_id, full_name: staff.full_name },
      process.env.JWT_SECRET || 'secretkey',
      { expiresIn: '8h' }
    );

    res.json({ token, staff_id: staff.staff_id, full_name: staff.full_name });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { loginStaff };
