import app from './app.js'
import { connectDatabase } from './config/database.js'
import { env } from './config/env.js'
import { ensureDefaultAdmin } from './services/auth.service.js'
import { migrateLegacyBlogStatuses } from './services/blogMigration.service.js'

async function bootstrap() {
  await connectDatabase()
  await migrateLegacyBlogStatuses()
  await ensureDefaultAdmin()

  app.listen(env.PORT, () => {
    console.log(`Server listening on http://localhost:${env.PORT}`)
    console.log(`Health: http://localhost:${env.PORT}/api/health`)
    console.log(`Default admin: ${env.ADMIN_EMAIL}`)
  })
}

bootstrap().catch((err) => {
  console.error('Failed to start server:', err)
  process.exit(1)
})
