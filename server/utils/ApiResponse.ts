import type { Response } from 'express'
import { sendError, sendSuccess } from './sendResponse.js'

/** @deprecated Prefer sendSuccess / sendError from sendResponse.ts */
export class ApiResponse {
  static success<T>(res: Response, data: T, message = 'Success', statusCode: number = 200) {
    sendSuccess(res, data, message, statusCode)
  }

  static error(res: Response, message: string, statusCode: number = 500) {
    sendError(res, message, statusCode)
  }
}
