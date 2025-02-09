import { getPosts } from "@/lib/posts"
import { PostList } from "@/components/post-list"

export const metadata = {
  title: 'Blog - Dead Code',
  description: 'Articles about software development, tech, and more.',
}

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <div className="container py-10">
      <div className="flex flex-col space-y-8 max-w-2xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">blog posts</h1>
          <p className="text-muted-foreground">
            {posts.length} posts
          </p>
        </div>
        <PostList posts={posts} />
      </div>
    </div>
  )
} 