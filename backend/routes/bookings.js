const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { isAdminAuthenticated } = require('../middleware/auth');
const client = require('prom-client');

// Get or create active orders gauge
let activeOrdersGauge = client.register.getSingleMetric('active_orders_total');
if (!activeOrdersGauge) {
  activeOrdersGauge = new client.Gauge({
    name: 'active_orders_total',
    help: 'Total number of active orders'
  });
}

// Helper to update active orders count
async function updateActiveOrdersGauge() {
  try {
    const [rows] = await db.execute(
      "SELECT COUNT(*) as count FROM bookings WHERE status IN ('pending', 'confirmed', 'preparing')"
    );
    activeOrdersGauge.set(rows[0].count);
  } catch (err) {
    console.error('Gauge update error:', err);
  }
}

router.post('/', async (req, res) => {
  try {
    const { customer_name, mobile, address, items, beverages, dishes, special_notes, total_amount } = req.body;
    if (!customer_name || !mobile || !address || !items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Please fill all required fields.' });
    }
    if (!/^\d{10}$/.test(mobile)) {
      return res.status(400).json({ success: false, message: 'Please enter a valid 10-digit mobile number.' });
    }
    const [result] = await db.execute(
      `INSERT INTO bookings (customer_name, mobile, address, items, beverages, dishes, special_notes, total_amount) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [customer_name, mobile, address, JSON.stringify(items), JSON.stringify(beverages || []), JSON.stringify(dishes || []), special_notes || '', total_amount || 0]
    );
    await updateActiveOrdersGauge();
    res.status(201).json({ success: true, message: 'Order placed successfully!', bookingId: result.insertId });
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
});

router.get('/', isAdminAuthenticated, async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM bookings ORDER BY created_at DESC');
    res.json({ success: true, bookings: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

router.put('/:id/status', isAdminAuthenticated, async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['pending', 'confirmed', 'preparing', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status.' });
    }
    await db.execute('UPDATE bookings SET status = ? WHERE id = ?', [status, req.params.id]);
    await updateActiveOrdersGauge();
    res.json({ success: true, message: 'Status updated successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

router.delete('/:id', isAdminAuthenticated, async (req, res) => {
  try {
    await db.execute('DELETE FROM bookings WHERE id = ?', [req.params.id]);
    await updateActiveOrdersGauge();
    res.json({ success: true, message: 'Booking deleted.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

module.exports = router;
