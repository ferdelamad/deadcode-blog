import { Suspense } from "react"
import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"
import type { Components } from "react-markdown"
import type { Metadata } from "next"
import remarkGfm from "remark-gfm"
import remarkBreaks from "remark-breaks"
import rehypeRaw from "rehype-raw"
import rehypeSanitize from "rehype-sanitize"
import { BackButton } from "@/components/back-button"
import { getPostBySlug } from "@/lib/posts"
import BlogPostLoading from "./loading"

// This type works at runtime but conflicts with Next.js internal types
interface PageProps {
  params: { slug: string } & any;
}

export async function generateMetadata(props: PageProps) {
  try {
    const post = await getPostBySlug(props.params.slug)
    return {
      title: post.title,
      description: post.excerpt || post.content.slice(0, 160),
    } as Metadata
  } catch {
    return {
      title: 'Post Not Found',
      description: 'The post you are looking for does not exist.',
    } as Metadata
  }
}

export default async function PostPage({ params }: PageProps) {
  if (!params.slug) {
    notFound()
  }

  return (
    <Suspense fallback={<BlogPostLoading />}>
      <BlogPost slug={params.slug} />
    </Suspense>
  )
}

async function BlogPost({ slug }: { slug: string }) {
  try {
    const post = await getPostBySlug(slug)

    // Replace literal \n with actual newlines
    const formattedContent = post.content.replace(/\\n/g, '\n')
    
    // Remove the first h1 header (title) from the content
    const contentWithoutTitle = formattedContent
      .split('\n')
      .filter((line) => !line.startsWith('# '))
      .join('\n')
      .trim()

    const components: Components = {
      h1: ({ children }) => (
        <h1 className="text-3xl font-normal mt-8 mb-4">{children}</h1>
      ),
      h2: ({ children }) => (
        <h2 className="text-2xl font-normal mt-8 mb-4">{children}</h2>
      ),
      code({ className, children, ...props }) {
        const match = /language-(\w+)/.exec(className || '')
        return (
          <code
            className={`${className} ${
              !match ? 'bg-muted px-1 py-0.5 rounded' : ''
            }`}
            {...props}
          >
            {children}
          </code>
        )
      },
      pre: ({ children }) => (
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          {children}
        </pre>
      ),
    }

    return (
      <div className="container max-w-2xl py-10">
        <div className="mb-8">
          <BackButton />
        </div>
        <article className="prose dark:prose-invert w-full max-w-none">
          <div className="mb-8">
            <div className="text-sm text-muted-foreground uppercase mb-2">
              {post.category}
            </div>
            <h1 className="text-4xl font-bold mb-2 mt-0">{post.title}</h1>
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
          </div>
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkBreaks]}
            rehypePlugins={[rehypeRaw, rehypeSanitize]}
            components={components}
            className="prose-headings:font-normal prose-h1:text-3xl prose-h2:text-2xl prose-h2:mt-8 prose-p:text-base prose-p:leading-7 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:font-medium prose-code:text-primary prose-pre:bg-muted prose-pre:text-muted-foreground prose-pre:border prose-pre:border-border prose-img:rounded-lg"
          >
            {contentWithoutTitle}
          </ReactMarkdown>
        </article>
      </div>
    )
  } catch (error) {
    console.error('Error fetching post:', error)
    notFound()
  }
} 