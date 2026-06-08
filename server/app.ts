import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import path from 'path'
import { env } from './config/env.js'
import { errorHandler } from './middlewares/errorHandler.js'
import { notFound } from './middlewares/notFound.js'
import apiRoutes from './routes/index.js'
import dotenv from 'dotenv'

dotenv.config();


const app = express()

app.use(helmet())
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }))
app.use(cookieParser())
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))
app.use('/uploads', express.static(path.join(process.cwd(), 'public', 'uploads')))

app.get('/', (_req, res) => {
  res.json({ success: true, message: 'Trading Signal Admin API' })
})

app.use('/api', apiRoutes)

app.use(notFound)
app.use(errorHandler)



export default app
