import { useMemo, useState } from 'react'
import DataTable, { type TableColumn } from 'react-data-table-component'
import { mockBlogs } from '../data/mockBlogs'
import { tsaiDataTableStyles } from '../styles/dataTableTheme'
import type { Blog, BlogStatus } from '../types/blog'

const statusStyles: Record<BlogStatus, string> = {
  Published: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400',
  Draft: 'border-amber-500/30 bg-amber-500/10 text-amber-300',
  Archived: 'border-white/15 bg-white/5 text-tsai-subtle',
}

function StatusBadge({ status }: { status: BlogStatus }) {
  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusStyles[status]}`}
    >
      {status}
    </span>
  )
}

const columns: TableColumn<Blog>[] = [
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
    name: 'Author',
    selector: (row) => row.author,
    sortable: true,
  },
  {
    name: 'Category',
    selector: (row) => row.category,
    sortable: true,
    cell: (row) => (
      <span className="rounded-md border border-white/8 bg-white/5 px-2 py-0.5 text-xs text-tsai-muted">
        {row.category}
      </span>
    ),
  },
  {
    name: 'Status',
    selector: (row) => row.status,
    sortable: true,
    cell: (row) => <StatusBadge status={row.status} />,
  },
  {
    name: 'Published',
    selector: (row) => row.publishedAt,
    sortable: true,
    width: '120px',
  },
  {
    name: 'Views',
    selector: (row) => row.views,
    sortable: true,
    right: true,
    width: '100px',
    cell: (row) => (
      <span className="font-medium text-tsai-text">
        {row.views > 0 ? row.views.toLocaleString() : '—'}
      </span>
    ),
  },
  {
    name: 'Actions',
    cell: () => (
      <button
        type="button"
        className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-tsai-accent-cyan transition hover:border-tsai-accent-cyan/40 hover:bg-tsai-accent/10"
      >
        View
      </button>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
    width: '100px',
  },
]

export default function AllBlogs() {
  const [filterText, setFilterText] = useState('')

  const filteredBlogs = useMemo(() => {
    const query = filterText.trim().toLowerCase()
    if (!query) return mockBlogs

    return mockBlogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(query) ||
        blog.author.toLowerCase().includes(query) ||
        blog.category.toLowerCase().includes(query) ||
        blog.status.toLowerCase().includes(query) ||
        blog.slug.toLowerCase().includes(query),
    )
  }, [filterText])

  const publishedCount = mockBlogs.filter((b) => b.status === 'Published').length
  const draftCount = mockBlogs.filter((b) => b.status === 'Draft').length

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
            Review and manage blog posts — static preview until API is connected.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 text-sm">
          <span className="rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-emerald-400">
            {publishedCount} published
          </span>
          <span className="rounded-full border border-amber-500/25 bg-amber-500/10 px-3 py-1 text-amber-300">
            {draftCount} drafts
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-tsai-muted">
            {mockBlogs.length} total
          </span>
        </div>
      </section>

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
              placeholder="Search blogs by title, author, category..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-tsai-surface/80 py-2.5 pr-4 pl-10 text-sm text-tsai-text outline-none transition placeholder:text-tsai-subtle focus:border-tsai-accent-cyan/50"
            />
          </div>
          <p className="text-xs text-tsai-subtle">
            Showing {filteredBlogs.length} of {mockBlogs.length} posts
          </p>
        </div>

        <div className="tsai-data-table px-2 pb-2 sm:px-4">
          <DataTable
            columns={columns}
            data={filteredBlogs}
            pagination
            paginationPerPage={5}
            paginationRowsPerPageOptions={[5, 10, 15, 20]}
            highlightOnHover
            responsive
            striped={false}
            customStyles={tsaiDataTableStyles}
            noDataComponent={
              <p className="py-12 text-sm text-tsai-muted">No blogs match your search.</p>
            }
            paginationComponentOptions={{
              rowsPerPageText: 'Rows per page:',
              rangeSeparatorText: 'of',
              selectAllRowsItem: false,
            }}
          />
        </div>
      </section>
    </div>
  )
}
