"use client"

import type { Post } from "@/lib/types"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface PostListProps {
  posts: Post[]
  showCategory?: boolean
}

export const PostList = ({ posts, showCategory = true }: PostListProps) => {
  const router = useRouter()
  const [clickedId, setClickedId] = useState<string | null>(null)

  const handlePostClick = (slug: string, id: string) => {
    setClickedId(id)
    router.push(`/blog/${slug}`)
  }

  return (
    <div className="grid gap-10">
      {posts.map((post) => (
        <article 
          key={post.id} 
          onClick={() => handlePostClick(post.slug, post.id)}
          className={`group relative flex flex-col space-y-2 cursor-pointer transition-opacity ${
            clickedId && clickedId !== post.id ? 'opacity-50' : ''
          }`}
        >
          {showCategory && (
            <div className="text-sm text-muted-foreground uppercase">
              {post.category}
            </div>
          )}
          <h2 className="text-2xl font-semibold">{post.title}</h2>
          {post.excerpt && (
            <p className="text-muted-foreground">{post.excerpt}</p>
          )}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <time>
              {new Date(post.published_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
            {post.reading_time && (
              <>
                <span>·</span>
                <span>{post.reading_time}</span>
              </>
            )}
          </div>
        </article>
      ))}
    </div>
  )
} 