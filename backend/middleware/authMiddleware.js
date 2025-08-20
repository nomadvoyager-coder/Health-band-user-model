const jwt = require('jsonwebtoken');

const authenticateStaff = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer token

  if (!token) return res.status(401).json({ message: 'Access Denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.staff = decoded; // { staff_id, full_name }
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid Token' });
  }
};

module.exports = authenticateStaff;
