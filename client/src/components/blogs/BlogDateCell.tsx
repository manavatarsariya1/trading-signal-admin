import { splitFormattedDate } from './blogDateUtils'

type BlogDateCellProps = {
  value: string
}

export default function BlogDateCell({ value }: BlogDateCellProps) {
  const { date, time } = splitFormattedDate(value)

  return (
    <div className="flex flex-col gap-0.5 py-0.5">
      <span className="text-xs leading-tight text-tsai-text/90 lg:text-sm">{date}</span>
      {time ? (
        <span className="text-[10px] leading-tight text-tsai-subtle lg:text-xs">{time}</span>
      ) : null}
    </div>
  )
}
