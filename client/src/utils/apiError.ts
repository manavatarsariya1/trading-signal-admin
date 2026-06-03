import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import type { SerializedError } from '@reduxjs/toolkit'

type ApiErrorPayload = {
  message?: string
  errors?: Record<string, string[] | undefined>
}

export function getApiErrorMessage(
  error: unknown,
  fallback = 'Something went wrong',
): string {
  if (!error) return fallback

  if (typeof error === 'object' && error !== null && 'status' in error) {
    const fetchError = error as FetchBaseQueryError
    if (fetchError.data && typeof fetchError.data === 'object') {
      const data = fetchError.data as ApiErrorPayload
      if (data.message) return data.message
    }
    if (fetchError.status === 0 || fetchError.status === 'FETCH_ERROR') {
      return 'Unable to reach the API server. Make sure the backend is running.'
    }
  }

  if (typeof error === 'object' && error !== null && 'message' in error) {
    return (error as SerializedError).message ?? fallback
  }

  if (error instanceof Error) {
    return error.message
  }

  return fallback
}
