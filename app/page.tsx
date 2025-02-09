import Link from "next/link"
import { getPosts } from "@/lib/posts"

export const revalidate = 3600 // Revalidate every hour

export default async function Home() {
  const posts = await getPosts()

  return (
    <div className="container py-10">
      <div className="flex flex-col space-y-8 max-w-2xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Stories</h1>
          <p className="text-muted-foreground">
            {new Date().toLocaleDateString('en-US', { 
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })} · {posts.length} stories
          </p>
        </div>
        <div className="grid gap-10">
          {posts.map((post) => (
            <article key={post.id} className="group relative flex flex-col space-y-2">
              <div className="text-sm text-muted-foreground uppercase">
                {post.category}
              </div>
              <h2 className="text-2xl font-semibold">{post.title}</h2>
              {post.excerpt && (
                <p className="text-muted-foreground">{post.excerpt}</p>
              )}
              <div className="flex items-center space-x-4 text-sm">
                <time className="text-muted-foreground">
                  {new Date(post.published_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
                {post.reading_time && (
                  <>
                    <span className="text-muted-foreground">·</span>
                    <span className="text-muted-foreground">{post.reading_time}</span>
                  </>
                )}
              </div>
              <Link href={`/blog/${post.slug}`} className="absolute inset-0">
                <span className="sr-only">View Article</span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
