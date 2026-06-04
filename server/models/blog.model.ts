import mongoose, { type Document, Schema } from 'mongoose'

export interface IBlog extends Document {
  title: string
  content: string
  coverImage?: string
  slug?: string
  createdAt: Date
  updatedAt: Date
}

const blogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true, trim: true },
    coverImage: { type: String, required: false, trim: true },
    slug: { type: String, unique: true, sparse: true, trim: true },
  },
  { timestamps: true },
)

export const Blog = mongoose.model<IBlog>('Blog', blogSchema)
