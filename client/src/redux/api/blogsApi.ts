import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { BlogsListResponse, BlogsListResult } from '../../types/blog'
import { mapBlogsListResponse } from '../../utils/mapBlog'

const BLOGS_API_BASE = import.meta.env.VITE_BLOGS_API_BASE_URL ?? '/blogs-api'

export type GetBlogsParams = {
  page?: number
  limit?: number
}

export const blogsApi = createApi({
  reducerPath: 'blogsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BLOGS_API_BASE,
  }),
  tagTypes: ['Blogs'],
  endpoints: (builder) => ({
    getBlogs: builder.query<BlogsListResult, GetBlogsParams | void>({
      query: (params) => {
        const page = params?.page ?? 1
        const limit = params?.limit ?? 12
        return `/blogs?page=${page}&limit=${limit}`
      },
      transformResponse: (response: BlogsListResponse) => mapBlogsListResponse(response),
      providesTags: (result) =>
        result
          ? [
              ...result.blogs.map((blog) => ({ type: 'Blogs' as const, id: blog.id })),
              { type: 'Blogs', id: 'LIST' },
            ]
          : [{ type: 'Blogs', id: 'LIST' }],
    }),
  }),
})

export const { useGetBlogsQuery, useLazyGetBlogsQuery } = blogsApi
