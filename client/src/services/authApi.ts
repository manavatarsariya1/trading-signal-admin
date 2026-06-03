import { apiRequest } from './api'

export type AuthUser = {
  id: string
  name: string
  email: string
  role: string
}

export type LoginPayload = {
  email: string
  password: string
  rememberMe: boolean
}

export type LoginResponse = {
  user: AuthUser
  accessToken: string
  rememberMe: boolean
}

export async function login(payload: LoginPayload) {
  return apiRequest<LoginResponse>('/auth/login', {
    method: 'POST',
    body: payload,
  })
}

export async function refreshSession() {
  return apiRequest<{ user: AuthUser; accessToken: string }>('/auth/refresh', {
    method: 'POST',
  })
}

export async function logout() {
  return apiRequest<null>('/auth/logout', { method: 'POST' })
}

export async function getMe() {
  return apiRequest<{ user: AuthUser }>('/auth/me', { auth: true })
}

export async function forgotPassword(email: string) {
  return apiRequest<{ message: string; resetUrl?: string }>('/auth/forgot-password', {
    method: 'POST',
    body: { email },
  })
}

export async function resetPassword(token: string, password: string) {
  return apiRequest<{ message: string }>('/auth/reset-password', {
    method: 'POST',
    body: { token, password },
  })
}
