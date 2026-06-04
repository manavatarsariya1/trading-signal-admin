import type { PaginationComponentProps } from 'react-data-table-component'

const ROW_OPTIONS = [5, 10, 12, 20, 50]

export default function BlogTablePagination({
  rowsPerPage,
  rowCount,
  currentPage,
  onChangePage,
  onChangeRowsPerPage,
}: PaginationComponentProps) {
  const totalPages = Math.max(1, Math.ceil(rowCount / rowsPerPage))
  const rangeStart = rowCount === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1
  const rangeEnd = Math.min(currentPage * rowsPerPage, rowCount)

  return (
    <div className="flex flex-col gap-4 border-t border-white/8 bg-tsai-surface/60 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <div className="flex flex-wrap items-center gap-3">
        <label className="flex items-center gap-2 text-sm text-tsai-muted">
          <span>Rows per page</span>
          <select
            value={rowsPerPage}
            onChange={(e) => onChangeRowsPerPage(Number(e.target.value), 1)}
            className="rounded-lg border border-white/12 bg-[#0b1736] px-3 py-1.5 text-sm text-tsai-text outline-none focus:border-tsai-accent-cyan/50"
          >
            {ROW_OPTIONS.map((n) => (
              <option key={n} value={n} className="bg-[#02081e] text-tsai-text">
                {n}
              </option>
            ))}
          </select>
        </label>
        <span className="text-sm text-tsai-subtle">
          {rangeStart}–{rangeEnd} of {rowCount}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <PaginationButton
          label="First"
          disabled={currentPage <= 1}
          onClick={() => onChangePage(1, rowCount)}
        >
          «
        </PaginationButton>
        <PaginationButton
          label="Previous"
          disabled={currentPage <= 1}
          onClick={() => onChangePage(currentPage - 1, rowCount)}
        >
          ‹
        </PaginationButton>
        <span className="min-w-[4.5rem] text-center text-sm font-medium text-tsai-text">
          {currentPage} / {totalPages}
        </span>
        <PaginationButton
          label="Next"
          disabled={currentPage >= totalPages}
          onClick={() => onChangePage(currentPage + 1, rowCount)}
        >
          ›
        </PaginationButton>
        <PaginationButton
          label="Last"
          disabled={currentPage >= totalPages}
          onClick={() => onChangePage(totalPages, rowCount)}
        >
          »
        </PaginationButton>
      </div>
    </div>
  )
}

function PaginationButton({
  children,
  label,
  disabled,
  onClick,
}: {
  children: React.ReactNode
  label: string
  disabled: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-sm text-tsai-muted transition hover:border-tsai-accent-cyan/30 hover:bg-tsai-accent/20 hover:text-tsai-text disabled:cursor-not-allowed disabled:opacity-35"
    >
      {children}
    </button>
  )
}
