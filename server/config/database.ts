import mongoose from 'mongoose'
import { env } from './env.js'

export async function connectDatabase(): Promise<void> {
  await mongoose.connect(env.DB_URI)
  console.log('[db] Connected to MongoDB')
}
