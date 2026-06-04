import { useMemo, useState } from 'react'
import DataTable, { type TableColumn } from 'react-data-table-component'
import BlogCoverCell from '../components/blogs/BlogCoverCell'
import BlogTableActions from '../components/blogs/BlogTableActions'
import BlogTablePagination from '../components/blogs/BlogTablePagination'
import { useGetBlogsQuery } from '../redux/api/blogsApi'
import { tsaiDataTableStyles } from '../styles/dataTableTheme'
import { getApiErrorMessage } from '../utils/apiError'
import type { Blog } from '../types/blog'

const columns: TableColumn<Blog>[] = [
  {
    name: 'Cover',
    width: '96px',
    cell: (row) => <BlogCoverCell title={row.title} coverImage={row.coverImage} />,
    ignoreRowClick: true,
  },
  {
    name: 'Title',
    selector: (row) => row.title,
    sortable: true,
    grow: 2,
    cell: (row) => (
      <div className="py-1">
        <p className="font-medium text-tsai-text">{row.title}</p>
        <p className="mt-0.5 font-mono text-[11px] text-tsai-subtle">/{row.slug}</p>
      </div>
    ),
  },
  {
    name: 'Created',
    selector: (row) => row.createdAt,
    sortable: true,
    width: '170px',
  },
  {
    name: 'Updated',
    selector: (row) => row.updatedAt,
    sortable: true,
    width: '170px',
  },
  {
    name: 'Actions',
    cell: (row) => <BlogTableActions blog={row} />,
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
    width: '240px',
  },
]

function TableSkeleton() {
  return (
    <div className="space-y-3 p-6">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="h-16 animate-pulse rounded-xl border border-white/5 bg-white/5"
        />
      ))}
    </div>
  )
}

export default function AllBlogs() {
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [filterText, setFilterText] = useState('')

  const { data, isLoading, isFetching, isError, error, refetch } = useGetBlogsQuery({
    page,
    limit: perPage,
  })

  const blogs = data?.blogs ?? []
  const total = data?.total ?? 0

  const filteredBlogs = useMemo(() => {
    const query = filterText.trim().toLowerCase()
    if (!query) return blogs

    return blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(query) || blog.slug.toLowerCase().includes(query),
    )
  }, [blogs, filterText])

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium tracking-[0.2em] text-tsai-accent-cyan uppercase">
            Content
          </p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-tsai-text sm:text-3xl">
            All Blogs
          </h2>
          <p className="mt-2 text-sm text-tsai-muted">
            Cover image, title, dates, and quick actions for each post.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-tsai-muted">
            {total} total posts
          </span>
          <button
            type="button"
            onClick={() => refetch()}
            disabled={isFetching}
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-tsai-muted transition hover:border-tsai-accent-cyan/40 hover:text-tsai-text disabled:opacity-50"
          >
            {isFetching ? 'Refreshing…' : 'Refresh'}
          </button>
        </div>
      </section>

      {isError ? (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-6 py-8 text-center">
          <p className="font-medium text-red-200">Failed to load blogs</p>
          <p className="mt-2 text-sm text-red-200/80">{getApiErrorMessage(error)}</p>
          <p className="mt-3 text-xs text-tsai-subtle">
            Ensure Next.js is running on{' '}
            <code className="text-tsai-accent-cyan">http://localhost:3001</code>
          </p>
          <button
            type="button"
            onClick={() => refetch()}
            className="mt-4 rounded-lg bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/15"
          >
            Try again
          </button>
        </div>
      ) : null}

      <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#00000033] backdrop-blur-md">
        <div className="flex flex-col gap-4 border-b border-white/8 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="relative max-w-md flex-1">
            <svg
              className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-tsai-subtle"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
            <input
              type="search"
              placeholder="Search by title or slug…"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-tsai-surface/80 py-2.5 pr-4 pl-10 text-sm text-tsai-text outline-none transition placeholder:text-tsai-subtle focus:border-tsai-accent-cyan/50"
            />
          </div>
          {!isLoading ? (
            <p className="text-xs text-tsai-subtle">
              Page {data?.page ?? page} · {filteredBlogs.length} shown
            </p>
          ) : null}
        </div>

        <div className="tsai-data-table">
          {isLoading ? (
            <TableSkeleton />
          ) : (
            <DataTable
              columns={columns}
              data={filteredBlogs}
              progressPending={isFetching && !isLoading}
              pagination
              paginationServer
              paginationTotalRows={total}
              paginationDefaultPage={page}
              paginationPerPage={perPage}
              paginationComponent={BlogTablePagination}
              onChangePage={setPage}
              onChangeRowsPerPage={(newPerPage, newPage) => {
                setPerPage(newPerPage)
                setPage(newPage)
              }}
              highlightOnHover
              responsive
              striped={false}
              customStyles={tsaiDataTableStyles}
              noDataComponent={
                <p className="py-12 text-sm text-tsai-muted">
                  {filterText ? 'No blogs match your search on this page.' : 'No blogs found.'}
                </p>
              }
            />
          )}
        </div>
      </section>
    </div>
  )
}
