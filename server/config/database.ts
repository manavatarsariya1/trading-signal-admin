import { env } from './env.js'

/**
 * Connect to the database when MONGODB_URI is set.
 * Add mongoose (or your ORM) here when ready.
 */
export async function connectDatabase(): Promise<void> {
  if (!env.MONGODB_URI) {
    if (env.NODE_ENV === 'development') {
      console.warn('[db] MONGODB_URI not set — running without database')
    }
    return
  }

  // Example: await mongoose.connect(env.MONGODB_URI)
  console.log('[db] Database connection placeholder — wire mongoose in config/database.ts')
}
