import { supabase } from './supabase'
import type { Post, PostCreate } from './types'

export async function getPosts() {
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .order('published_at', { ascending: false })

  if (error) {
    console.error('Error fetching posts:', error)
    throw new Error('Failed to fetch posts')
  }

  if (!posts) {
    return []
  }

  return posts as Post[]
}

export async function getPostBySlug(slug: string) {
  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    console.error('Error fetching post:', error)
    throw new Error('Failed to fetch post')
  }

  return post as Post
}

export async function createPost(post: PostCreate) {
  const { data, error } = await supabase
    .from('posts')
    .insert([post])
    .select()
    .single()

  if (error) {
    console.error('Error creating post:', error)
    throw error
  }

  return data as Post
} 