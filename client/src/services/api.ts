import { clearAccessToken, getAccessToken, setAccessToken } from '../lib/authStorage'

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? '/api'

export type ApiSuccess<T> = {
  success: true
  message: string
  data: T
}

export type ApiError = {
  success: false
  message: string
  errors?: Record<string, string[] | undefined>
}

export class ApiRequestError extends Error {
  status: number
  errors?: Record<string, string[] | undefined>

  constructor(message: string, status: number, errors?: Record<string, string[] | undefined>) {
    super(message)
    this.status = status
    this.errors = errors
  }
}

type RequestOptions = {
  method?: string
  body?: unknown
  auth?: boolean
}

async function parseResponseBody<T>(response: Response): Promise<T | ApiError | null> {
  const text = await response.text()
  if (!text.trim()) {
    return null
  }

  try {
    return JSON.parse(text) as T | ApiError
  } catch {
    throw new ApiRequestError('Invalid JSON response from server', response.status)
  }
}

export async function apiRequest<T>(
  path: string,
  { method = 'GET', body, auth = false }: RequestOptions = {},
): Promise<ApiSuccess<T>> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }

  if (auth) {
    const token = getAccessToken()
    if (token) {
      headers.Authorization = `Bearer ${token}`
    }
  }

  let response: Response

  try {
    response = await fetch(`${API_BASE}${path}`, {
      method,
      headers,
      credentials: 'include',
      body: body !== undefined ? JSON.stringify(body) : undefined,
    })
  } catch {
    throw new ApiRequestError(
      'Unable to reach the API server. Make sure the backend is running.',
      0,
    )
  }

  const json = await parseResponseBody<ApiSuccess<T>>(response)

  if (!json) {
    throw new ApiRequestError(
      response.status === 502 || response.status === 504
        ? 'API server is not reachable. Check that the backend is running and the proxy port matches server PORT.'
        : 'Empty response from server',
      response.status,
    )
  }

  if (!response.ok || !('success' in json) || !json.success) {
    const err = json as ApiError
    throw new ApiRequestError(err.message ?? 'Request failed', response.status, err.errors)
  }

  return json as ApiSuccess<T>
}

export async function apiRequestWithRefresh<T>(
  path: string,
  options: RequestOptions = {},
): Promise<ApiSuccess<T>> {
  try {
    return await apiRequest<T>(path, { ...options, auth: true })
  } catch (error) {
    if (error instanceof ApiRequestError && error.status === 401) {
      const refreshed = await apiRequest<{ accessToken: string }>('/auth/refresh', { method: 'POST' })
      setAccessToken(refreshed.data.accessToken, true)
      return apiRequest<T>(path, { ...options, auth: true })
    }
    throw error
  }
}

export function clearSessionOnLogout() {
  clearAccessToken()
}
