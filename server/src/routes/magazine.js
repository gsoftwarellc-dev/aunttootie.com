const router = require('express').Router();
const db     = require('../db/database');
const auth   = require('../middleware/auth');

// GET /api/magazine — public, all posts
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM magazine_posts ORDER BY published_at DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/magazine/:slug — public, single post
router.get('/:slug', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM magazine_posts WHERE slug = ?', [req.params.slug]);
    if (!rows.length) return res.status(404).json({ message: 'Not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/magazine — admin only
router.post('/', auth, async (req, res) => {
  const { title, slug, cover_image, body, teaser, premium } = req.body;
  if (!title || !slug) return res.status(400).json({ message: 'Title and slug required' });
  try {
    const [result] = await db.query(
      'INSERT INTO magazine_posts (title, slug, cover_image, body, teaser, premium) VALUES (?,?,?,?,?,?)',
      [title, slug, cover_image || '', body || '', teaser || '', premium ? 1 : 0]
    );
    const [rows] = await db.query('SELECT * FROM magazine_posts WHERE id = ?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') return res.status(409).json({ message: 'Slug already exists' });
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/magazine/:id — admin only
router.put('/:id', auth, async (req, res) => {
  const { title, slug, cover_image, body, teaser, premium } = req.body;
  try {
    await db.query(
      'UPDATE magazine_posts SET title=?, slug=?, cover_image=?, body=?, teaser=?, premium=?, updated_at=NOW() WHERE id=?',
      [title, slug, cover_image || '', body || '', teaser || '', premium ? 1 : 0, req.params.id]
    );
    const [rows] = await db.query('SELECT * FROM magazine_posts WHERE id = ?', [req.params.id]);
    res.json(rows[0]);
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') return res.status(409).json({ message: 'Slug already exists' });
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/magazine/:id — admin only
router.delete('/:id', auth, async (req, res) => {
  try {
    await db.query('DELETE FROM magazine_posts WHERE id = ?', [req.params.id]);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
