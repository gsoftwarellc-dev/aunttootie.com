const router = require('express').Router();
const db     = require('../db/database');
const auth   = require('../middleware/auth');

// POST /api/subscribers  — public, called from newsletter form
router.post('/', async (req, res) => {
  const { email, first_name } = req.body;
  if (!email) return res.status(400).json({ message: 'Email required' });

  try {
    await db.query(
      'INSERT IGNORE INTO subscribers (email, first_name) VALUES (?, ?)',
      [email, first_name || null]
    );
    res.json({ message: 'Subscribed successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/subscribers  — admin only
router.get('/', auth, async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM subscribers ORDER BY subscribed_at DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/subscribers/:id  — admin only
router.delete('/:id', auth, async (req, res) => {
  try {
    await db.query('DELETE FROM subscribers WHERE id = ?', [req.params.id]);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
