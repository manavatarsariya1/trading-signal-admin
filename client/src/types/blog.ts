/** Raw document from Next.js GET /api/blogs */
export type ApiBlogDocument = {
  _id?: string
  id?: string
  title?: string
  slug?: string
  content?: string
  coverImage?: string
  createdAt?: string
  updatedAt?: string
}

export type BlogsListResponse = {
  blogs: ApiBlogDocument[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}

/** Normalized row for the admin table (fields that exist in the API) */
export type Blog = {
  id: string
  title: string
  slug: string
  content: string
  coverImage: string
  createdAt: string
  updatedAt: string
}

export type BlogsListResult = {
  blogs: Blog[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}
