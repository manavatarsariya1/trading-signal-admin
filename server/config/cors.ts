import type { CorsOptions } from 'cors'
import { env } from './env.js'

function normalizeOrigin(origin: string): string {
  return origin.trim().replace(/\/$/, '')
}

function collectExplicitOrigins(): Set<string> {
  const origins = new Set<string>()

  for (const part of env.CORS_ORIGIN.split(',')) {
    const normalized = normalizeOrigin(part)
    if (normalized) origins.add(normalized)
  }

  if (env.CLIENT_URL) {
    origins.add(normalizeOrigin(env.CLIENT_URL))
  }

  return origins
}

const explicitOrigins = collectExplicitOrigins()

const VERCEL_CLIENT_ORIGIN =
  /^https:\/\/trading-signal-admin[a-z0-9-]*\.vercel\.app$/i

function isAllowedOrigin(origin: string): boolean {
  const normalized = normalizeOrigin(origin)

  if (explicitOrigins.has(normalized)) {
    return true
  }

  const allowPreviews = process.env.CORS_ALLOW_VERCEL_PREVIEWS !== 'false'
  if (allowPreviews && VERCEL_CLIENT_ORIGIN.test(normalized)) {
    return true
  }

  return false
}

export const corsOptions: CorsOptions = {
  origin(origin, callback) {
    if (!origin) {
      callback(null, true)
      return
    }

    if (isAllowedOrigin(origin)) {
      callback(null, true)
      return
    }

    console.warn(`[cors] Blocked origin: ${origin}`)
    callback(null, false)
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-vercel-protection-bypass'],
}
