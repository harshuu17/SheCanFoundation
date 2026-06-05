# She Can Foundation — Full Stack Website

A production-ready full-stack NGO website built with React.js, Node.js, Express, and MongoDB Atlas.

## 🚀 Features

- **Public Website** — Hero, About, Impact stats with animated counters, Contact form
- **REST API** — Full CRUD for contact submissions
- **JWT Authentication** — Secure admin login with protected routes
- **Admin Dashboard** — View, search, paginate, and delete submissions
- **MongoDB Atlas** — Cloud database with Mongoose ODM
- **Responsive Design** — Mobile, tablet & desktop support
- **Toast Notifications** — User feedback on all actions
- **Form Validation** — Client-side and server-side validation

---

## 📁 Project Structure

```
she-can-foundation/
├── client/               # React + Vite frontend
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Route pages
│   │   ├── services/     # Axios API layer
│   │   ├── context/      # React context (AuthContext)
│   │   └── hooks/        # Custom hooks
│   └── .env.example
├── server/               # Node.js + Express backend
│   ├── models/           # Mongoose models
│   ├── routes/           # Express routes
│   ├── controllers/      # Business logic
│   ├── middleware/        # JWT auth middleware
│   ├── config/           # DB config
│   └── .env.example
└── README.md
```

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js 18+
- MongoDB Atlas account

### 1. Clone the repository
```bash
git clone <repo-url>
cd she-can-foundation
```

### 2. Set up the Backend

```bash
cd server
npm install
cp .env.example .env
```

Edit `server/.env`:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/shecan
JWT_SECRET=your_super_secret_key_min_32_chars
JWT_EXPIRES_IN=7d
ADMIN_EMAIL=admin@shecanfoundation.org
ADMIN_PASSWORD_HASH=<bcrypt_hash>
CLIENT_URL=http://localhost:5173
```

**Generate the admin password hash:**
```bash
node -e "const b=require('bcryptjs'); b.hash('yourpassword', 12).then(console.log)"
```
Copy the output hash into `ADMIN_PASSWORD_HASH`.

Start the server:
```bash
npm run dev   # development
npm start     # production
```

### 3. Set up the Frontend

```bash
cd client
npm install
cp .env.example .env
```

Edit `client/.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

Start the dev server:
```bash
npm run dev
```

---

## 🌐 API Reference

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/contact` | Public | Submit contact form |
| POST | `/api/auth/login` | Public | Admin login |
| GET | `/api/auth/profile` | Protected | Get admin profile |
| GET | `/api/submissions` | Protected | Get all submissions (paginated) |
| DELETE | `/api/submissions/:id` | Protected | Delete submission |
| GET | `/api/health` | Public | Health check |

---

## 🚢 Deployment

### Frontend → Vercel

1. Push `client/` to GitHub
2. Import repo in [vercel.com](https://vercel.com)
3. Set environment variable: `VITE_API_URL=https://your-backend.onrender.com/api`
4. Deploy

### Backend → Render

1. Push `server/` to GitHub
2. Create a new **Web Service** on [render.com](https://render.com)
3. Set environment variables (all from `.env.example`)
4. Build command: `npm install`
5. Start command: `node server.js`
6. Deploy

### Database → MongoDB Atlas

1. Create cluster at [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Create database user
3. Whitelist IP: `0.0.0.0/0` (for cloud deployments)
4. Copy connection string → `MONGODB_URI`

---

## 🛡️ Security Features

- Helmet.js for HTTP headers
- Rate limiting (100 req / 15 min)
- JWT token expiry
- bcrypt password hashing
- Input validation (express-validator)
- CORS restricted to client URL

---

## 🎨 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, Tailwind CSS, React Router DOM |
| HTTP Client | Axios |
| Notifications | React Hot Toast |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas + Mongoose |
| Auth | JWT + bcryptjs |
| Security | Helmet, express-rate-limit |

---

## 📝 License

MIT — Built for She Can Foundation internship submission.
