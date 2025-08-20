const pool = require('../config/db');

// GET: /api/staff/profile
const getProfile = async (req, res) => {
  try {
    const staff_id = req.staff.staff_id;

    const result = await pool.query(
      `SELECT staff_id, full_name, phone_number, role, department, medical_notes, profile_photo_url, band_id
       FROM staff_credentials
       WHERE staff_id = $1`,
      [staff_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Staff not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET: /api/staff/vitals
const getVitals = async (req, res) => {
  try {
    const staff_id = req.staff.staff_id;

    const result = await pool.query(
      `SELECT id, temperature, heart_rate, spo2, status, last_checkup, room, alerts
       FROM staff_vitals
       WHERE staff_id = $1
       ORDER BY last_checkup DESC`,
      [staff_id]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET: /api/staff/rooms
const getRoomLogs = async (req, res) => {
  try {
    const staff_id = req.staff.staff_id;

    const result = await pool.query(
      `SELECT id, room, last_checkup, alerts
       FROM staff_vitals
       WHERE staff_id = $1
       ORDER BY last_checkup DESC`,
      [staff_id]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getProfile, getVitals, getRoomLogs };
