import type { Response } from 'express'
import { HttpStatus } from '../constants/httpStatus.js'

type ApiResponseBody<T> = {
  success: boolean
  message: string
  data?: T
}

export class ApiResponse {
  static success<T>(res: Response, data: T, message = 'Success', statusCode = HttpStatus.OK) {
    const body: ApiResponseBody<T> = { success: true, message, data }
    return res.status(statusCode).json(body)
  }

  static error(res: Response, message: string, statusCode = HttpStatus.INTERNAL_SERVER_ERROR) {
    const body: ApiResponseBody<undefined> = { success: false, message }
    return res.status(statusCode).json(body)
  }
}
