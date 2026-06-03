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

## API

- `GET /api/health` — health check
