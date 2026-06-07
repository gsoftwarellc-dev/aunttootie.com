// Run once to create the admin account:  node src/db/seed.js
require('dotenv').config();
const bcrypt = require('bcryptjs');
const db     = require('./database');

async function seed() {
  const email    = process.env.ADMIN_EMAIL    || 'admin@aunttootie.com';
  const password = process.env.ADMIN_PASSWORD || 'changeme123';
  const hash     = await bcrypt.hash(password, 10);

  await db.query(
    'INSERT IGNORE INTO admins (email, password) VALUES (?, ?)',
    [email, hash]
  );
  console.log(`Admin created: ${email}`);
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });
