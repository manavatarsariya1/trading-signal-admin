import { useEffect, useMemo, useState } from 'react'
import DataTable, { type TableColumn } from 'react-data-table-component'
import BlogCoverCell from '../components/blogs/BlogCoverCell'
import BlogDateCell from '../components/blogs/BlogDateCell'
import BlogDatesCell from '../components/blogs/BlogDatesCell'
import BlogTitleCell from '../components/blogs/BlogTitleCell'
import BlogListCards from '../components/blogs/BlogListCards'
import BlogTableActions from '../components/blogs/BlogTableActions'
import BlogTablePagination from '../components/blogs/BlogTablePagination'
import { useDebouncedValue } from '../hooks/useDebouncedValue'
import { useIsLgUp, useIsXlUp } from '../hooks/useMediaQuery'
import { useGetBlogsQuery } from '../redux/api/blogsApi'
import { tsaiDataTableStyles, tsaiDataTableTheme } from '../styles/dataTableTheme'
import { getApiErrorMessage } from '../utils/apiError'
import type { Blog } from '../types/blog'

const SEARCH_DEBOUNCE_MS = 400

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
  const isLgUp = useIsLgUp()
  const isXlUp = useIsXlUp()
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [searchInput, setSearchInput] = useState('')
  const debouncedSearch = useDebouncedValue(searchInput, SEARCH_DEBOUNCE_MS)

  const searchQuery = debouncedSearch.trim()

  useEffect(() => {
    setPage(1)
  }, [searchQuery])

  const { data, isLoading, isFetching, isError, error, refetch } = useGetBlogsQuery({
    page,
    limit: perPage,
    search: searchQuery || undefined,
  })

  const blogs = data?.blogs ?? []
  const total = data?.total ?? 0
  const isSearchPending = searchInput.trim() !== searchQuery

  const columns = useMemo((): TableColumn<Blog>[] => {
    const dateColumns: TableColumn<Blog>[] = isXlUp
      ? [
          {
            name: 'Created',
            selector: (row) => row.createdAt,
            sortable: true,
            width: '116px',
            minWidth: '116px',
            cell: (row) => <BlogDateCell value={row.createdAt} />,
          },
          {
            name: 'Updated',
            selector: (row) => row.updatedAt,
            sortable: true,
            width: '116px',
            minWidth: '116px',
            cell: (row) => <BlogDateCell value={row.updatedAt} />,
          },
        ]
      : [
          {
            name: 'Dates',
            width: '132px',
            minWidth: '132px',
            cell: (row) => (
              <BlogDatesCell createdAt={row.createdAt} updatedAt={row.updatedAt} />
            ),
          },
        ]

    return [
      {
        name: 'Cover',
        width: '88px',
        minWidth: '88px',
        cell: (row) => <BlogCoverCell title={row.title} coverImage={row.coverImage} />,
        ignoreRowClick: true,
      },
      {
        name: 'Title',
        selector: (row) => row.title,
        sortable: true,
        grow: 4,
        minWidth: '200px',
        cell: (row) => <BlogTitleCell title={row.title} slug={row.slug} />,
      },
      ...dateColumns,
      {
        name: '',
        cell: (row) => <BlogTableActions blog={row} />,
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
        width: '148px',
        minWidth: '148px',
        right: true,
      },
    ]
  }, [isXlUp])

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-medium tracking-[0.2em] text-tsai-accent-cyan uppercase">
            Content
          </p>
          <h2 className="mt-1 text-xl font-bold tracking-tight text-tsai-text sm:text-2xl lg:text-3xl">
            All Blogs
          </h2>
          <p className="mt-2 text-xs text-tsai-muted sm:text-sm">
            Cover image, title, dates, and quick actions for each post.
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-3">
          <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-tsai-muted">
            {searchQuery ? `${total} matching` : `${total} total posts`}
          </span>
          <button
            type="button"
            onClick={() => refetch()}
            disabled={isFetching}
            className="cursor-pointer rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-tsai-muted transition hover:border-tsai-accent-cyan/40 hover:text-tsai-text disabled:opacity-50"
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
            Ensure the admin API is running on{' '}
            <code className="text-tsai-accent-cyan">http://localhost:3000</code>
            {' '}and you are signed in.
          </p>
          <button
            type="button"
            onClick={() => refetch()}
            className="mt-4 cursor-pointer rounded-lg bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/15"
          >
            Try again
          </button>
        </div>
      ) : null}

      <section className="rounded-2xl border border-white/10 bg-[#00000033] backdrop-blur-md">
        <div className="flex flex-col gap-4 border-b border-white/8 p-5 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-6">
          <div className="relative min-w-0 flex-1 sm:max-w-md">
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
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-tsai-surface/80 py-2.5 pr-4 pl-10 text-sm text-tsai-text outline-none transition placeholder:text-tsai-subtle focus:border-tsai-accent-cyan/50 lg:text-[0.9375rem]"
              aria-busy={isSearchPending || isFetching}
            />
          </div>
          {!isLoading ? (
            <p className="shrink-0 text-xs text-tsai-subtle">
              {isSearchPending
                ? 'Searching…'
                : `Page ${data?.page ?? page} · ${blogs.length} shown${searchQuery ? ` for “${searchQuery}”` : ''}`}
            </p>
          ) : null}
        </div>

        {isLoading ? (
          <TableSkeleton />
        ) : isLgUp ? (
          <div className="tsai-data-table min-w-0 pb-2 sm:pb-4">
            <DataTable
              columns={columns}
              data={blogs}
              progressPending={isFetching || isSearchPending}
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
              highlightOnHover={false}
              responsive={false}
              striped={false}
              theme={tsaiDataTableTheme}
              customStyles={tsaiDataTableStyles}
              noDataComponent={
                <p className="py-12 text-sm text-tsai-muted">
                  {searchQuery ? `No blogs match “${searchQuery}”.` : 'No blogs found.'}
                </p>
              }
            />
          </div>
        ) : (
          <div className={isFetching || isSearchPending ? 'opacity-60 transition-opacity' : ''}>
            <BlogListCards
              blogs={blogs}
              total={total}
              page={page}
              perPage={perPage}
              searchQuery={searchQuery}
              onChangePage={setPage}
              onChangePerPage={setPerPage}
            />
          </div>
        )}
      </section>
    </div>
  )
}
