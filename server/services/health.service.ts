import { env } from '../config/env.js'

export function getHealthStatus() {
  return {
    status: 'ok',
    environment: env.NODE_ENV,
    timestamp: new Date().toISOString(),
  }
}
