require('dotenv').config();
const express = require('express');
const cors    = require('cors');

const authRoutes        = require('./routes/auth');
const subscriberRoutes  = require('./routes/subscribers');
const premiumRoutes     = require('./routes/premium');
const recipeRoutes      = require('./routes/recipes');
const contentRoutes     = require('./routes/content');
const uploadRoutes      = require('./routes/upload');
const categoryRoutes    = require('./routes/categories');
const settingsRoutes    = require('./routes/settings');
const magazineRoutes    = require('./routes/magazine');

const app  = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:5176'],
  credentials: true,
}));
app.use(express.json());

// Routes
app.use('/api/auth',        authRoutes);
app.use('/api/subscribers', subscriberRoutes);
app.use('/api/premium',     premiumRoutes);
app.use('/api/recipes',     recipeRoutes);
app.use('/api/content',     contentRoutes);
app.use('/api/upload',      uploadRoutes);
app.use('/api/categories',  categoryRoutes);
app.use('/api/settings',    settingsRoutes);
app.use('/api/magazine',    magazineRoutes);

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
