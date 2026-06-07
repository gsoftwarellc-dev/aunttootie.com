# Aunt Tootie — Full Stack Project

```
Rosalley/
├── aunttootie/   React frontend (main website)
├── admin/        React admin panel
└── server/       Node.js + Express + MySQL backend
```

---

## Local Development Setup

### 1. Database
Create a MySQL database and run the schema:
```sql
-- in MySQL Workbench or phpMyAdmin
source server/src/db/schema.sql
```

### 2. Server
```bash
cd server
cp .env.example .env       # fill in your DB credentials
npm install
node src/db/seed.js        # creates the admin account (run once)
npm run dev                # starts on http://localhost:4000
```

### 3. Frontend (main site)
```bash
cd aunttootie
cp .env.example .env.local
npm install
npm run dev                # starts on http://localhost:5173
```

### 4. Admin Panel
```bash
cd admin
cp .env.example .env.local
npm install
npm run dev                # starts on http://localhost:5174
```

Admin login: use the email/password you set in `server/.env`

---

## Hostinger Business Deployment

### Step 1 — Create MySQL database
- Login to hPanel → Databases → MySQL Databases
- Create a new database, user, and password
- Import `server/src/db/schema.sql` via phpMyAdmin

### Step 2 — Deploy the backend (Node.js)
- hPanel → Node.js → Create Application
- Set entry point: `server/src/index.js`
- Upload the `server/` folder via File Manager or Git
- Add environment variables in hPanel matching `server/.env.example`
- Run `node src/db/seed.js` once via SSH terminal to create admin account

### Step 3 — Deploy the frontend
```bash
cd aunttootie
# Set VITE_API_URL to your real server URL e.g. https://aunttootie.com/api
npm run build              # creates aunttootie/dist/
```
Upload the `dist/` folder contents to `public_html/`

### Step 4 — Deploy the admin panel
```bash
cd admin
# Set VITE_API_URL to your real server URL
npm run build              # creates admin/dist/
```
Upload `admin/dist/` contents to `public_html/admin/`
Admin panel will be at: `https://aunttootie.com/admin`

---

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/auth/login | No | Admin login |
| GET | /api/subscribers | Admin | List all subscribers |
| POST | /api/subscribers | No | Add subscriber (newsletter form) |
| DELETE | /api/subscribers/:id | Admin | Remove subscriber |
| GET | /api/premium | Admin | List premium members |
| POST | /api/premium | No | Register premium member (subscribe form) |
| PATCH | /api/premium/:id/status | Admin | Update member status |
| DELETE | /api/premium/:id | Admin | Remove member |
| GET | /api/recipes | No | List all recipes |
| POST | /api/recipes | Admin | Create recipe |
| PUT | /api/recipes/:id | Admin | Update recipe |
| DELETE | /api/recipes/:id | Admin | Delete recipe |

---

## Changing the Admin Password
Update `ADMIN_PASSWORD` in `server/.env` and re-run:
```bash
node src/db/seed.js
```
