const router = require('express').Router();
const db     = require('../db/database');
const auth   = require('../middleware/auth');

// GET /api/settings — public
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT `key`, `value` FROM settings');
    const result = {};
    rows.forEach(r => { result[r.key] = r.value; });
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/settings — admin only
router.put('/', auth, async (req, res) => {
  const entries = Object.entries(req.body);
  if (!entries.length) return res.status(400).json({ message: 'No data' });
  try {
    for (const [key, value] of entries) {
      await db.query(
        'INSERT INTO settings (`key`, `value`) VALUES (?, ?) ON DUPLICATE KEY UPDATE `value`=?',
        [key, String(value), String(value)]
      );
    }
    res.json({ message: 'Saved' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
