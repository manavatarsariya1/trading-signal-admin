import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import path from 'path'
import { ensureBootstrapped } from './bootstrap.js'
// import { corsOptions } from './config/cors.js'
import { errorHandler } from './middlewares/errorHandler.js'
import { notFound } from './middlewares/notFound.js'
import apiRoutes from './routes/index.js'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  }),
)

const whitelist = [
  'http://localhost:3000', // For local development
  'https://your-main-production-domain.com' // Your main production domain
];

const corsOptions = {
  origin: function (origin:any, callback:any) {
    // 1. Allow requests with no origin (like mobile apps, curl, or Postman)
    if (!origin) return callback(null, true);
    
    // 2. Allow explicitly whitelisted domains
    if (whitelist.indexOf(origin) !== -1) {
      return callback(null, true);
    }
    
    // 3. Allow any Vercel preview URL from your project/account using RegEx
    // This matches your specific vercel domain pattern
    const isVercelPreview = /-manav01logicgo-3215s-projects\.vercel\.app$/.test(origin);
    
    if (isVercelPreview) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(async (req, _res, next) => {
  // Let CORS preflight through without waiting on MongoDB
  if (req.method === 'OPTIONS') {
    next()
    return
  }

  try {
    await ensureBootstrapped()
    next()
  } catch (error) {
    next(error)
  }
})
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
