import { createApi } from '@reduxjs/toolkit/query/react'
import type { BlogsListResult } from '../../types/blog'
import { mapBlogsListResponse } from '../../utils/mapBlog'
import { baseQueryWithAuth } from './baseQuery'

export type GetBlogsParams = {
  page?: number
  limit?: number
  /** Server-side filter on title and slug */
  search?: string
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
        return `/blogs?${query.toString()}`
      },
      transformResponse: mapBlogsListResponse,
      providesTags: (result) =>
        result
          ? [
              ...result.blogs.map((blog) => ({ type: 'Blogs' as const, id: blog.id })),
              { type: 'Blogs', id: 'LIST' },
            ]
          : [{ type: 'Blogs', id: 'LIST' }],
    }),
    deleteBlog: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/blogs/${id}`,
        method: 'DELETE',
      }),
      transformResponse: (response: { message: string }) => response,
      invalidatesTags: (_result, _error, id) => [
        { type: 'Blogs', id },
        { type: 'Blogs', id: 'LIST' },
      ],
    }),
  }),
})

export const { useGetBlogsQuery, useLazyGetBlogsQuery, useDeleteBlogMutation } = blogsApi
