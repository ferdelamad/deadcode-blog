import Link from "next/link"
import type { Post } from "@/lib/types"

interface PostListProps {
  posts: Post[]
  showCategory?: boolean
}

export const PostList = ({ posts, showCategory = true }: PostListProps) => {
  return (
    <div className="grid gap-10">
      {posts.map((post) => (
        <article key={post.id} className="group relative flex flex-col space-y-2">
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
          <Link href={`/blog/${post.slug}`} className="absolute inset-0">
            <span className="sr-only">View Article</span>
          </Link>
        </article>
      ))}
    </div>
  )
} 