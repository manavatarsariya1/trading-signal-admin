import { Eye, Pencil, Trash2 } from 'lucide-react'
import type { Blog } from '../../types/blog'

/** Public site — published blog posts (View) */
const BLOG_PUBLIC_URL =
  import.meta.env.VITE_BLOG_PUBLIC_URL ?? 'https://www.tradingsignals.ai'

/** Next.js app — blog CMS routes (Edit) */
const BLOG_APP_URL =
  import.meta.env.VITE_BLOG_APP_URL ??
  import.meta.env.VITE_BLOGS_PROXY_TARGET ??
  'http://localhost:3001'

const actionBtn =
  'inline-flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition'

type BlogTableActionsProps = {
  blog: Blog
}

function trimBase(url: string) {
  return url.replace(/\/$/, '')
}

function getEditBlogUrl(blog: Blog) {
  return `${trimBase(BLOG_APP_URL)}/blogs/edit/${encodeURIComponent(blog.slug)}`
}

function getViewBlogUrl(blog: Blog) {
  return `${trimBase(BLOG_PUBLIC_URL)}/blog/${encodeURIComponent(blog.slug)}`
}

export default function BlogTableActions({ blog }: BlogTableActionsProps) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <a
        href={getEditBlogUrl(blog)}
        target="_blank"
        rel="noopener noreferrer"
        className={`${actionBtn} border-white/10 bg-white/5 text-tsai-text hover:border-tsai-accent-cyan/40 hover:bg-tsai-accent/10 hover:text-tsai-accent-cyan`}
      >
        <Pencil className="h-3.5 w-3.5" strokeWidth={2} />
        Edit
      </a>
      <a
        href={getViewBlogUrl(blog)}
        target="_blank"
        rel="noopener noreferrer"
        className={`${actionBtn} border-white/10 bg-white/5 text-tsai-accent-cyan hover:border-tsai-accent-cyan/40 hover:bg-tsai-accent/10`}
      >
        <Eye className="h-3.5 w-3.5" strokeWidth={2} />
        View
      </a>
      <button
        type="button"
        className={`${actionBtn} border-red-500/25 bg-red-500/10 text-red-300 hover:border-red-400/40 hover:bg-red-500/20`}
      >
        <Trash2 className="h-3.5 w-3.5" strokeWidth={2} />
        Delete
      </button>
    </div>
  )
}
