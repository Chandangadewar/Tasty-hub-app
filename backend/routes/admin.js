const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../config/db');
const { isAdminAuthenticated } = require('../middleware/auth');

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Username and password are required.' });
    }
    const [rows] = await db.execute('SELECT * FROM admins WHERE username = ?', [username]);
    if (rows.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }
    const admin = rows[0];
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }
    req.session.adminId = admin.id;
    req.session.adminUsername = admin.username;
    res.json({ success: true, message: 'Login successful.', username: admin.username });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ success: false, message: 'Logout failed.' });
    res.json({ success: true, message: 'Logged out successfully.' });
  });
});

router.get('/check-auth', isAdminAuthenticated, (req, res) => {
  res.json({ success: true, username: req.session.adminUsername });
});

router.get('/stats', isAdminAuthenticated, async (req, res) => {
  try {
    const [total] = await db.execute('SELECT COUNT(*) as count FROM bookings');
    const [pending] = await db.execute("SELECT COUNT(*) as count FROM bookings WHERE status = 'pending'");
    const [completed] = await db.execute("SELECT COUNT(*) as count FROM bookings WHERE status = 'completed'");
    const [revenue] = await db.execute("SELECT SUM(total_amount) as total FROM bookings WHERE status != 'cancelled'");
    res.json({
      success: true,
      stats: {
        total: total[0].count,
        pending: pending[0].count,
        completed: completed[0].count,
        revenue: revenue[0].total || 0
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

module.exports = router;