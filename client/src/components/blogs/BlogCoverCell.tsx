import { ImageIcon } from 'lucide-react'
import { useState } from 'react'
import { resolveBlogCoverUrl } from '../../utils/mapBlog'

type BlogCoverCellProps = {
  title: string
  coverImage?: string
}

function CoverPlaceholder() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-tsai-accent/20 to-tsai-accent-cyan/10">
      <ImageIcon className="h-5 w-5 text-tsai-accent-cyan/70" strokeWidth={1.75} />
    </div>
  )
}

export default function BlogCoverCell({ title, coverImage }: BlogCoverCellProps) {
  const src = resolveBlogCoverUrl(coverImage)
  const [failed, setFailed] = useState(false)

  if (!src || failed) {
    return (
      <div
        className="h-14 w-20 shrink-0 overflow-hidden rounded-lg border border-white/10"
        title="No cover image"
      >
        <CoverPlaceholder />
      </div>
    )
  }

  return (
    <div className="h-14 w-20 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-tsai-surface">
      <img
        src={src}
        alt={title}
        className="h-full w-full object-cover"
        loading="lazy"
        onError={() => setFailed(true)}
      />
    </div>
  )
}
