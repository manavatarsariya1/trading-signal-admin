import { createApi } from '@reduxjs/toolkit/query/react'
import type { Blog, BlogsListResult, BlogStatusFilter } from '../../types/blog'
import { mapApiBlogToBlog, mapBlogsListResponse } from '../../utils/mapBlog'
import { baseQueryWithAuth } from './baseQuery'
import {
  invalidateDashboardAnalytics,
  optimisticallyPatchDashboardStatus,
} from './dashboardCache'

export type GetBlogsParams = {
  page?: number
  limit?: number
  search?: string
  status?: BlogStatusFilter
}

const blogTags = (result?: BlogsListResult) =>
  result
    ? [
        ...result.blogs.map((blog) => ({ type: 'Blogs' as const, id: blog.id })),
        { type: 'Blogs' as const, id: 'LIST' },
      ]
    : [{ type: 'Blogs' as const, id: 'LIST' }]

async function syncDashboardAfterBlogMutation(
  blogId: string,
  nextStatus: 'published' | 'archived' | 'deleted',
  lifecycle: {
    dispatch: (action: unknown) => unknown
    queryFulfilled: Promise<unknown>
    getState: () => unknown
  },
) {
  const patch = optimisticallyPatchDashboardStatus(
    lifecycle.dispatch,
    lifecycle.getState,
    blogId,
    nextStatus,
  )

  try {
    await lifecycle.queryFulfilled
    invalidateDashboardAnalytics(lifecycle.dispatch)
  } catch {
    patch?.undo()
  }
}

export const blogsApi = createApi({
  reducerPath: 'blogsApi',
  baseQuery: baseQueryWithAuth,
  tagTypes: ['Blogs'],
  endpoints: (builder) => ({
    getBlogs: builder.query<BlogsListResult, GetBlogsParams | void>({
      query: (params) => {
        const page = params?.page ?? 1
        const limit = params?.limit ?? 12
        const query = new URLSearchParams({
          page: String(page),
          limit: String(limit),
        })
        const search = params?.search?.trim()
        if (search) {
          query.set('search', search)
        }
        if (params?.status && params.status !== 'all') {
          query.set('status', params.status)
        }
        return `/blogs?${query.toString()}`
      },
      transformResponse: mapBlogsListResponse,
      providesTags: (result) => blogTags(result),
    }),
    deleteBlog: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/blogs/${id}`,
        method: 'DELETE',
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled, getState }) {
        await syncDashboardAfterBlogMutation(id, 'deleted', {
          dispatch,
          queryFulfilled,
          getState,
        })
      },
      invalidatesTags: (_result, _error, id) => [
        { type: 'Blogs', id },
        { type: 'Blogs', id: 'LIST' },
      ],
    }),
    publishBlog: builder.mutation<Blog, string>({
      query: (id) => ({
        url: `/blogs/${id}/publish`,
        method: 'PATCH',
      }),
      transformResponse: mapApiBlogToBlog,
      async onQueryStarted(id, { dispatch, queryFulfilled, getState }) {
        await syncDashboardAfterBlogMutation(id, 'published', {
          dispatch,
          queryFulfilled,
          getState,
        })
      },
      invalidatesTags: (_result, _error, id) => [
        { type: 'Blogs', id },
        { type: 'Blogs', id: 'LIST' },
      ],
    }),
    archiveBlog: builder.mutation<Blog, string>({
      query: (id) => ({
        url: `/blogs/${id}/archive`,
        method: 'PATCH',
      }),
      transformResponse: mapApiBlogToBlog,
      async onQueryStarted(id, { dispatch, queryFulfilled, getState }) {
        await syncDashboardAfterBlogMutation(id, 'archived', {
          dispatch,
          queryFulfilled,
          getState,
        })
      },
      invalidatesTags: (_result, _error, id) => [
        { type: 'Blogs', id },
        { type: 'Blogs', id: 'LIST' },
      ],
    }),
  }),
})

export const {
  useGetBlogsQuery,
  useLazyGetBlogsQuery,
  useDeleteBlogMutation,
  usePublishBlogMutation,
  useArchiveBlogMutation,
} = blogsApi
