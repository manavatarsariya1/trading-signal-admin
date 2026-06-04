import { Blog, type IBlog } from '../models/blog.model.js'
import { AppError } from '../utils/AppError.js'
import { HttpStatus } from '../constants/httpStatus.js'
import { isMongoConnectionError } from '../utils/isMongoConnectionError.js'
import { persistBlogCoverOnSave } from '../utils/persistBlogCover.js'
import type { UploadedFile } from '../utils/upload.js'
import type { ParsedBlogBody } from '../utils/parseBlogBody.js'
import { findBlogByIdentifier } from '../utils/blogIdentifier.js'

export type BlogListResult = {
  blogs: IBlog[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}

export type BlogRequestBody = ParsedBlogBody

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function buildBlogSearchFilter(search?: string): Record<string, unknown> {
  const query = search?.trim()
  if (!query) return {}

  const pattern = new RegExp(escapeRegex(query), 'i')
  return {
    $or: [{ title: pattern }, { slug: pattern }],
  }
}

export async function listBlogs(
  page: number,
  limit: number,
  search?: string,
): Promise<BlogListResult> {
  const skip = (page - 1) * limit
  const filter = buildBlogSearchFilter(search)

  try {
    const [blogs, total] = await Promise.all([
      Blog.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Blog.countDocuments(filter),
    ])

    return {
      blogs,
      total,
      page,
      limit,
      hasMore: skip + blogs.length < total,
    }
  } catch (error) {
    if (isMongoConnectionError(error)) {
      const hint =
        process.env.NODE_ENV === 'development'
          ? ' Check DB_URI in server/.env (Atlas SRV host should look like cluster0.xxxxx.mongodb.net).'
          : ''
      console.warn(`[api/blogs] MongoDB unavailable.${hint} Returning empty blog list.`)
      return {
        blogs: [],
        total: 0,
        page,
        limit,
        hasMore: false,
      }
    }
    throw error
  }
}

export async function getBlogByIdentifier(identifier: string): Promise<IBlog> {
  const blog = await findBlogByIdentifier(identifier)

  if (!blog) {
    throw new AppError('Blog not found', HttpStatus.NOT_FOUND)
  }

  return blog
}

function extractTitleFromContent(content: string): string {
  const h1Match = content.match(/<h1[^>]*>(.*?)<\/h1>/i)
  return h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim() : 'Untitled Generated Blog'
}

async function generateUniqueSlug(title: string): Promise<string> {
  let baseSlug = title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')

  if (!baseSlug) {
    baseSlug = `post-${Math.random().toString(36).substring(2, 7)}`
  }

  let slug = baseSlug
  const exists = await Blog.findOne({ slug })
  if (exists) {
    const randomSuffix = Math.random().toString(36).substring(2, 6)
    slug = `${baseSlug}-${randomSuffix}`
  }

  return slug
}

/**
 * POST /api/blogs — create blog.
 * Cover: local file (multipart) OR base64 data URL (JSON / form field).
 */
export async function createBlog(
  body: BlogRequestBody,
  coverImageFile?: UploadedFile,
): Promise<IBlog> {
  const payload: BlogRequestBody = { ...body }

  payload.coverImage = await persistBlogCoverOnSave({
    coverImage: payload.coverImage,
    coverImageFile,
  })

  let extractedTitle = payload.title
  if (!extractedTitle) {
    const content = typeof payload.content === 'string' ? payload.content : ''
    extractedTitle = extractTitleFromContent(content)
  }

  const slug = await generateUniqueSlug(extractedTitle)

  const newBlog = await Blog.create({
    title: extractedTitle,
    content: payload.content,
    coverImage: payload.coverImage,
    slug,
  })

  return newBlog
}

/**
 * PUT /api/blogs/:slug — update blog.
 * Cover: local file (multipart) OR base64 data URL (JSON / form field).
 */
export async function updateBlog(
  identifier: string,
  body: BlogRequestBody,
  coverImageFile?: UploadedFile,
): Promise<IBlog> {
  const existing = await findBlogByIdentifier(identifier)
  if (!existing) {
    throw new AppError('Blog not found', HttpStatus.NOT_FOUND)
  }

  const coverImage = await persistBlogCoverOnSave({
    coverImage: body.coverImage,
    coverImageFile,
  })

  const updatedBlog = await Blog.findByIdAndUpdate(
    existing._id,
    {
      ...(body.title && { title: body.title }),
      ...(body.content && { content: body.content }),
      ...(coverImage && { coverImage }),
    },
    { new: true },
  )

  if (!updatedBlog) {
    throw new AppError('Blog not found', HttpStatus.NOT_FOUND)
  }

  return updatedBlog
}

/**
 * DELETE — Blog.findOneAndDelete by id, slug, or title.
 */
export async function deleteBlog(identifier: string): Promise<void> {
  const existing = await findBlogByIdentifier(identifier)
  if (!existing) {
    throw new AppError('Blog not found', HttpStatus.NOT_FOUND)
  }

  const deletedBlog = await Blog.findByIdAndDelete(existing._id)
  if (!deletedBlog) {
    throw new AppError('Blog not found', HttpStatus.NOT_FOUND)
  }
}
