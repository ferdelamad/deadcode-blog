import Link from "next/link"
import { posts } from "@/lib/blog-data"

export default function Home() {
  return (
    <div className="container py-10">
      <div className="flex flex-col space-y-8 max-w-2xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Stories</h1>
          <p className="text-muted-foreground">21 March, 2023 · 3 stories</p>
        </div>
        <div className="grid gap-10">
          {posts.map((post) => (
            <article key={post.id} className="group relative flex flex-col space-y-2">
              <div className="text-sm text-muted-foreground uppercase">
                {post.category}
              </div>
              <h2 className="text-2xl font-semibold">{post.title}</h2>
              <p className="text-muted-foreground">{post.excerpt}</p>
              <div className="flex items-center space-x-4 text-sm">
                <time className="text-muted-foreground">{post.date}</time>
                <span className="text-muted-foreground">·</span>
                <span className="text-muted-foreground">{post.readingTime}</span>
              </div>
              <Link href={`/blog/${post.id}`} className="absolute inset-0">
                <span className="sr-only">View Article</span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
