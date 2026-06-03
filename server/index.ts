import app from './app.js'
import { connectDatabase, env } from './config/index.js'
import { logger } from './utils/logger.js'

async function bootstrap() {
  await connectDatabase()

  app.listen(env.PORT, () => {
    logger.info(`Server listening on http://localhost:${env.PORT}`)
    logger.info(`Health check: http://localhost:${env.PORT}/api/health`)
  })
}

bootstrap().catch((err) => {
  logger.error('Failed to start server', err)
  process.exit(1)
})
