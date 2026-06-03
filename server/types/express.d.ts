import type { Request } from 'express'

/**
 * Extend Express Request when you add auth, e.g.:
 * export interface AuthenticatedRequest extends Request {
 *   user: { id: string; role: string }
 * }
 */
export type AppRequest = Request
