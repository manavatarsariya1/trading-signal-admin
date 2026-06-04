import { useState } from 'react'
import { Eye, Pencil, Trash2 } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { useDeleteBlogMutation } from '../../redux/api/blogsApi'
import { getApiErrorMessage } from '../../utils/apiError'
import type { Blog } from '../../types/blog'

const BLOG_PUBLIC_URL =
  import.meta.env.VITE_BLOG_PUBLIC_URL ?? 'https://www.tradingsignals.ai'

const iconBtn =
  'inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border transition disabled:cursor-not-allowed disabled:opacity-50'

type BlogTableActionsProps = {
  blog: Blog
}

function trimBase(url: string) {
  return url.replace(/\/$/, '')
}

function getViewBlogUrl(blog: Blog) {
  return `${trimBase(BLOG_PUBLIC_URL)}/blog/${encodeURIComponent(blog.slug)}`
}

function getEditBlogUrl(blog: Blog) {
  return `${trimBase(BLOG_PUBLIC_URL)}/blogs/edit/${encodeURIComponent(blog.slug)}`
}

export default function BlogTableActions({ blog }: BlogTableActionsProps) {
  const [deleteBlog, { isLoading: isDeleting }] = useDeleteBlogMutation()
  const [open, setOpen] = useState(false)
  const [deleteError, setDeleteError] = useState<string | null>(null)

  const handleConfirmDelete = async () => {
    setDeleteError(null)
    try {
      await deleteBlog(blog.id).unwrap()
      setOpen(false)
    } catch (error) {
      setDeleteError(getApiErrorMessage(error))
    }
  }

  return (
    <div className="flex items-center justify-end gap-1.5 py-0.5">
      <a
        href={getEditBlogUrl(blog)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Edit blog"
        title="Edit"
        className={`${iconBtn} border-white/10 bg-white/5 text-tsai-text hover:border-tsai-accent-cyan/40 hover:bg-tsai-accent/10 hover:text-tsai-accent-cyan`}
      >
        <Pencil className="h-4 w-4" strokeWidth={2} />
      </a>
      <a
        href={getViewBlogUrl(blog)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="View blog"
        title="View"
        className={`${iconBtn} border-white/10 bg-white/5 text-tsai-accent-cyan hover:border-tsai-accent-cyan/40 hover:bg-tsai-accent/10`}
      >
        <Eye className="h-4 w-4" strokeWidth={2} />
      </a>

      <AlertDialog
        open={open}
        onOpenChange={(nextOpen) => {
          if (!isDeleting) {
            setOpen(nextOpen)
            if (!nextOpen) setDeleteError(null)
          }
        }}
      >
        <AlertDialogTrigger
          nativeButton={false}
          render={
            <button
              type="button"
              disabled={isDeleting}
              aria-label="Delete blog"
              title="Delete"
              className={`${iconBtn} border-red-500/25 bg-red-500/10 text-red-300 hover:border-red-400/40 hover:bg-red-500/20`}
            >
              <Trash2 className="h-4 w-4" strokeWidth={2} />
            </button>
          }
        />
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete blog?</AlertDialogTitle>
            <AlertDialogDescription>
              <span className="font-medium text-tsai-text">&quot;{blog.title}&quot;</span> will be
              permanently removed. This action cannot be undone.
            </AlertDialogDescription>
            {deleteError ? (
              <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
                {deleteError}
              </p>
            ) : null}
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              disabled={isDeleting}
              onClick={() => void handleConfirmDelete()}
            >
              {isDeleting ? 'Deleting…' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
