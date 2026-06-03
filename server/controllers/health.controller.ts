import type { Request, Response } from 'express'
import { getHealthStatus } from '../services/health.service.js'
import { ApiResponse } from '../utils/ApiResponse.js'

export function healthCheck(_req: Request, res: Response): void {
  const data = getHealthStatus()
  ApiResponse.success(res, data, 'Server is healthy')
}
