export type BlogStatus = 'Published' | 'Draft' | 'Archived'

export type Blog = {
  id: string
  title: string
  slug: string
  author: string
  category: string
  status: BlogStatus
  publishedAt: string
  views: number
}
