import { getPosts } from "@/lib/posts"
import { PostList } from "@/components/post-list"
import Link from "next/link"
import { ArrowRight, Code2, Sparkles } from "lucide-react"

export const revalidate = 3600 // Revalidate every hour

export default async function Home() {
  const posts = await getPosts()
  const recentPosts = posts.slice(0, 5) // Get only the 5 most recent posts

  return (
    <div className="container py-10">
      <div className="flex flex-col space-y-16 max-w-2xl mx-auto">
        {/* Hero Section */}
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Code2 className="h-4 w-4" />
              <span>AI, Code, & Personal Reflections</span>
            </div>
            <h3 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Hey, I'm Fer 👋
            </h3>
            <p className="text-lg text-muted-foreground">
              Welcome to the{" "}
              <span className="font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent px-1">
                Dead<span className="text-primary">Code</span>
              </span>{" "}
              blog, where I dive into the world of AI, software development, 
              and my personal journey. I write about ML/AI Engineering, and modern web development, 
              along with insights from my journey as a entrepreneur and developer.
            </p>
          </div>

          {/* Quick Links or Featured Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <Link 
              href="/blog"
              className="group relative overflow-hidden rounded-lg border p-4 hover:border-foreground/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h4 className="font-medium">Blog Posts</h4>
                  <p className="text-sm text-muted-foreground">
                    Check out all my articles
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
            <Link 
              href="/about"
              className="group relative overflow-hidden rounded-lg border p-4 hover:border-foreground/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h4 className="font-medium">About Dead Code</h4>
                  <p className="text-sm text-muted-foreground">
                    Learn more about this blog
                  </p>
                </div>
                <Sparkles className="h-5 w-5 transition-transform group-hover:scale-110" />
              </div>
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-background px-2 text-xs text-muted-foreground">
              RECENT POSTS
            </span>
          </div>
        </div>

        {/* Recent Posts Section */}
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Latest Articles</h2>
            <Link 
              href="/blog" 
              className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              View all posts
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <PostList posts={recentPosts} showCategory={false} />
        </div>
      </div>
    </div>
  )
}
