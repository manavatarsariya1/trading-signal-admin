import { env } from '../config/env.js'
import { HttpStatus } from '../constants/httpStatus.js'
import { User } from '../models/user.model.js'
import { AppError } from '../utils/AppError.js'
import { createPasswordResetToken, hashToken } from '../utils/crypto.js'
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from '../utils/token.js'

function toPublicUser(user: { _id: unknown; name: string; email: string; role: string }) {
  return {
    id: String(user._id),
    name: user.name,
    email: user.email,
    role: user.role,
  }
}

export async function login(email: string, password: string, rememberMe: boolean) {
  const user = await User.findOne({ email: email.toLowerCase().trim() }).select('+password')

  if (!user || !(await user.comparePassword(password))) {
    throw new AppError('Invalid email or password', HttpStatus.UNAUTHORIZED)
  }

  const userId = String(user._id)
  const accessToken = signAccessToken({
    sub: userId,
    email: user.email,
    role: user.role,
  })
  const refreshToken = signRefreshToken({ sub: userId, rememberMe }, rememberMe)

  return {
    user: toPublicUser(user),
    accessToken,
    refreshToken,
    rememberMe,
  }
}

export async function refreshSession(refreshToken: string | undefined) {
  if (!refreshToken) {
    throw new AppError('Session expired. Please sign in again.', HttpStatus.UNAUTHORIZED)
  }

  let payload
  try {
    payload = verifyRefreshToken(refreshToken)
  } catch {
    throw new AppError('Session expired. Please sign in again.', HttpStatus.UNAUTHORIZED)
  }

  const user = await User.findById(payload.sub)
  if (!user) {
    throw new AppError('User not found', HttpStatus.UNAUTHORIZED)
  }

  const accessToken = signAccessToken({
    sub: String(user._id),
    email: user.email,
    role: user.role,
  })

  return { user: toPublicUser(user), accessToken }
}

export async function getProfile(userId: string) {
  const user = await User.findById(userId)
  if (!user) {
    throw new AppError('User not found', HttpStatus.NOT_FOUND)
  }
  return { user: toPublicUser(user) }
}

export async function requestPasswordReset(email: string) {
  const user = await User.findOne({ email: email.toLowerCase().trim() })
  const message = 'If that email exists, a reset link has been sent.'

  if (!user) {
    return { message }
  }

  const resetToken = createPasswordResetToken()
  user.passwordResetToken = hashToken(resetToken)
  user.passwordResetExpires = new Date(Date.now() + 60 * 60 * 1000)
  await user.save({ validateBeforeSave: false })

  const resetUrl = `${env.CLIENT_URL}/reset-password?token=${resetToken}`

  if (env.NODE_ENV === 'development') {
    console.log(`[auth] Password reset link: ${resetUrl}`)
  }

  return {
    message,
    ...(env.NODE_ENV === 'development' ? { resetUrl } : {}),
  }
}

export async function resetPassword(token: string, password: string) {
  const hashed = hashToken(token)
  const user = await User.findOne({
    passwordResetToken: hashed,
    passwordResetExpires: { $gt: new Date() },
  }).select('+password +passwordResetToken +passwordResetExpires')

  if (!user) {
    throw new AppError('Invalid or expired reset token', HttpStatus.BAD_REQUEST)
  }

  user.password = password
  user.passwordResetToken = undefined
  user.passwordResetExpires = undefined
  await user.save()

  return { message: 'Password updated successfully. You can sign in now.' }
}

export async function ensureDefaultAdmin() {
  const exists = await User.findOne({ email: env.ADMIN_EMAIL.toLowerCase() })
  if (exists) return

  await User.create({
    name: env.ADMIN_NAME,
    email: env.ADMIN_EMAIL.toLowerCase(),
    password: env.ADMIN_PASSWORD,
    role: 'admin',
  })

  console.log(`[auth] Default admin created: ${env.ADMIN_EMAIL}`)
}
