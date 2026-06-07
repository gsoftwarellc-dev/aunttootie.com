const router = require('express').Router();
const db     = require('../db/database');
const auth   = require('../middleware/auth');

// GET /api/content/:page  — public, returns all fields for a page as a nested object
// e.g. { hero: { title: '...', label: '...' }, about: { ... } }
router.get('/:page', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT section, field, value FROM page_content WHERE page = ?',
      [req.params.page]
    );
    const result = {};
    for (const row of rows) {
      if (!result[row.section]) result[row.section] = {};
      result[row.section][row.field] = row.value;
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/content/:page  — admin only, saves all fields at once
// body: { hero: { title: '...', label: '...' }, about: { ... } }
router.put('/:page', auth, async (req, res) => {
  const page = req.params.page;
  const data = req.body;

  try {
    for (const section of Object.keys(data)) {
      for (const [field, value] of Object.entries(data[section])) {
        await db.query(
          `INSERT INTO page_content (page, section, field, value)
           VALUES (?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE value = VALUES(value)`,
          [page, section, field, value]
        );
      }
    }
    res.json({ message: 'Content saved' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
