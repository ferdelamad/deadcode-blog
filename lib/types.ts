export interface Post {
  id: string
  slug: string
  title: string
  content: string
  published_at: string
  created_at: string
  updated_at: string
  category: string
  excerpt?: string
  reading_time?: string
  image_url?: string
}

export type PostCreate = Omit<Post, 'id' | 'created_at' | 'updated_at'> 