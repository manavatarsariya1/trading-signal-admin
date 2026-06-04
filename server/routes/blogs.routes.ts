import { Router } from 'express'
import {
  createBlog,
  deleteBlog,
  getBlog,
  listBlogs,
  updateBlog,
} from '../controllers/blog.controller.js'
import { asyncHandler } from '../middlewares/asyncHandler.js'
import { authenticate } from '../middlewares/auth.middleware.js'
import { parseBlogBodyWithMulter } from '../middlewares/blogUpload.middleware.js'

const router = Router()

router.get('/', authenticate, asyncHandler(listBlogs))
router.get('/:slug', authenticate, asyncHandler(getBlog))

router.post('/', authenticate, parseBlogBodyWithMulter, asyncHandler(createBlog))
router.put('/:slug', authenticate, parseBlogBodyWithMulter, asyncHandler(updateBlog))
router.delete('/:slug', authenticate, asyncHandler(deleteBlog))

export default router
