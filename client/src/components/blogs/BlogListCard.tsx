import BlogCoverCell from './BlogCoverCell'
import BlogDateCell from './BlogDateCell'
import BlogTableActions from './BlogTableActions'
import BlogTitleCell from './BlogTitleCell'
import type { Blog } from '../../types/blog'

type BlogListCardProps = {
  blog: Blog
}

export default function BlogListCard({ blog }: BlogListCardProps) {
  return (
    <article className="rounded-xl border border-white/10 bg-tsai-surface/40 p-5 transition hover:border-white/15 hover:bg-white/[0.03]">
      <div className="flex gap-4">
        <BlogCoverCell title={blog.title} coverImage={blog.coverImage} />
        <div className="min-w-0 flex-1">
          <BlogTitleCell title={blog.title} slug={blog.slug} />
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <p className="mb-1 text-[10px] font-semibold tracking-wider text-tsai-subtle uppercase">
                Created
              </p>
              <BlogDateCell value={blog.createdAt} />
            </div>
            <div>
              <p className="mb-1 text-[10px] font-semibold tracking-wider text-tsai-subtle uppercase">
                Updated
              </p>
              <BlogDateCell value={blog.updatedAt} />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-end border-t border-white/8 pt-4">
        <BlogTableActions blog={blog} />
      </div>
    </article>
  )
}
