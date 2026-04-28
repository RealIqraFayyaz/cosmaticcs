# AURÉLIA Beauty — Ultra‑premium cosmetics eCommerce

Luxury cosmetics experience built with:
- Frontend: React (Vite), Tailwind CSS, Framer Motion, React Router DOM, Axios
- Backend: Node.js (Express), MongoDB (Mongoose), JWT Authentication

## Project structure

- `frontend/` — Vite React app (10 pages, premium UI, animations)
- `backend/` — Express API (auth/products/cart/wishlist/orders/suggestions)

## Run locally

### 1) Backend

Copy env file and fill values:

```bash
cd backend
copy .env.example .env
```

Start MongoDB locally (or update `MONGODB_URI` to your cluster).

Seed sample products + an admin user:

```bash
npm run seed
```

Start API:

```bash
npm run dev
```

API health check: `http://localhost:5000/api/health`

### 2) Frontend

Copy env file:

```bash
cd ../frontend
copy .env.example .env
```

Run:

```bash
npm run dev
```

Open: `http://localhost:5173`

## Authentication

- Register/login at `/auth`
- Cart + checkout require login

Seeded admin (for product CRUD via API tools):
- Email: `admin@aurelia.local`
- Password: `admin123`

## Key pages (10)

1. Home (`/`)
2. Shop (`/shop`)
3. Product details (`/product/:id`)
4. Categories (`/categories`)
5. About (`/about`)
6. Contact (`/contact`)
7. Cart (`/cart`)
8. Checkout (`/checkout`)
9. Login/Register (`/auth`)
10. Dashboard (`/dashboard`)

