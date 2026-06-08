# Trading Signal Admin — API Server

Node.js + Express + TypeScript API with a layered, production-oriented layout.

## Structure

| Folder | Purpose |
|--------|---------|
| `config/` | Environment and database configuration |
| `constants/` | Shared constants (HTTP status codes, etc.) |
| `controllers/` | HTTP layer — parse request, call services, send response |
| `middlewares/` | Cross-cutting request pipeline (errors, validation) |
| `models/` | Data models / schemas (DB layer) |
| `routes/` | Route definitions mapped to controllers |
| `services/` | Business logic |
| `types/` | TypeScript types and declarations |
| `utils/` | Reusable helpers (errors, API responses, logging) |
| `validations/` | Request validation schemas (Zod) |

## Scripts

```bash
npm install
cp .env.example .env
npm run dev      # development with hot reload
npm run build    # compile to dist/
npm start        # run compiled output
```

Use `DB_URI` in your `.env` file for the MongoDB connection string.

## API

- `GET /api/health` — health check (includes `dbConnected`)

## Vercel deployment (server)

The **bypass token is only for the client** (Vercel Deployment Protection). The server does **not** need `x-vercel-protection-bypass` in its env.

Set these on the **server** Vercel project:

| Variable | Required | Notes |
|----------|----------|--------|
| `DB_URI` | Yes | MongoDB Atlas URI — **not** `localhost` |
| `JWT_ACCESS_SECRET` | Yes | Min 16 characters |
| `JWT_REFRESH_SECRET` | Yes | Min 16 characters |
| `CLOUDINARY_CLOUD_NAME` | Yes | |
| `CLOUDINARY_API_KEY` | Yes | |
| `CLOUDINARY_API_SECRET` | Yes | |
| `CORS_ORIGIN` | Yes | Your client URL(s), comma-separated |
| `CLIENT_URL` | Yes | Same as client URL |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Yes | Default admin created on first boot |

In **MongoDB Atlas** → Network Access → allow `0.0.0.0/0` (or Vercel IPs) so serverless functions can connect.

After deploy, check:

```
GET /api/health
```

If `dbConnected: false`, login will return 500 until `DB_URI` is fixed.
