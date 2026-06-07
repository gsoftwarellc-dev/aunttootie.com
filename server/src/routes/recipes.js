const router = require('express').Router();
const db     = require('../db/database');
const auth   = require('../middleware/auth');

// GET /api/recipes  — public
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM recipes ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/recipes/:slug  — public
router.get('/:slug', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM recipes WHERE slug = ?', [req.params.slug]);
    if (!rows[0]) return res.status(404).json({ message: 'Not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/recipes  — admin only
router.post('/', auth, async (req, res) => {
  const { slug, title, category, subcategory, image, time, serves, difficulty, premium, featured, teaser, description, ingredients, instructions, tags } = req.body;
  if (!slug || !title) return res.status(400).json({ message: 'Slug and title required' });

  try {
    await db.query(
      `INSERT INTO recipes (slug, title, category, subcategory, image, time, serves, difficulty, premium, featured, teaser, description, ingredients, instructions, tags)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [slug, title, category, subcategory, image, time, serves, difficulty, premium || false, featured || false, teaser, description,
       JSON.stringify(ingredients || []), JSON.stringify(instructions || []), JSON.stringify(tags || [])]
    );
    res.status(201).json({ message: 'Recipe created' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/recipes/:id  — admin only
router.put('/:id', auth, async (req, res) => {
  const { title, category, subcategory, image, time, serves, difficulty, premium, featured, teaser, description, ingredients, instructions, tags } = req.body;

  try {
    await db.query(
      `UPDATE recipes SET title=?, category=?, subcategory=?, image=?, time=?, serves=?, difficulty=?, premium=?, featured=?, teaser=?, description=?, ingredients=?, instructions=?, tags=?
       WHERE id=?`,
      [title, category, subcategory, image, time, serves, difficulty, premium, featured, teaser, description,
       JSON.stringify(ingredients || []), JSON.stringify(instructions || []), JSON.stringify(tags || []), req.params.id]
    );
    res.json({ message: 'Recipe updated' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/recipes/:id  — admin only
router.delete('/:id', auth, async (req, res) => {
  try {
    await db.query('DELETE FROM recipes WHERE id = ?', [req.params.id]);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
