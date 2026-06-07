const router = require('express').Router();
const db     = require('../db/database');
const auth   = require('../middleware/auth');

// POST /api/premium  — public, called from subscribe form
router.post('/', async (req, res) => {
  const { first_name, last_name, email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email required' });

  try {
    await db.query(
      'INSERT IGNORE INTO premium_members (first_name, last_name, email) VALUES (?, ?, ?)',
      [first_name || null, last_name || null, email]
    );
    res.json({ message: 'Premium member registered' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/premium  — admin only
router.get('/', auth, async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM premium_members ORDER BY joined_at DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// PATCH /api/premium/:id/status  — admin only (active / cancelled)
router.patch('/:id/status', auth, async (req, res) => {
  const { status } = req.body;
  if (!['active', 'cancelled'].includes(status))
    return res.status(400).json({ message: 'Invalid status' });

  try {
    await db.query('UPDATE premium_members SET status = ? WHERE id = ?', [status, req.params.id]);
    res.json({ message: 'Status updated' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/premium/:id  — admin only
router.delete('/:id', auth, async (req, res) => {
  try {
    await db.query('DELETE FROM premium_members WHERE id = ?', [req.params.id]);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
