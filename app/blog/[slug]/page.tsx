import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import remarkBreaks from "remark-breaks"
import rehypeRaw from "rehype-raw"
import rehypeSanitize from "rehype-sanitize"
import { BackButton } from "@/components/back-button"
import { getPostBySlug } from "@/lib/posts"

interface PostPageProps {
  params: {
    slug: string
  }
}

export default async function PostPage({ params }: PostPageProps) {
  try {
    const post = await getPostBySlug(params.slug)

    // Replace literal \n with actual newlines
    const formattedContent = post.content.replace(/\\n/g, '\n')
    
    // Remove the first h1 header (title) from the content
    const contentWithoutTitle = formattedContent
      .split('\n')
      .filter((line) => !line.startsWith('# '))
      .join('\n')
      .trim()

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
            components={{
              // Override default components for better styling
              h1: ({ children }) => (
                <h1 className="text-3xl font-normal mt-8 mb-4">{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-2xl font-normal mt-8 mb-4">{children}</h2>
              ),
              code: ({ node, inline, className, children, ...props }) => (
                <code
                  className={`${className} ${
                    inline ? 'bg-muted px-1 py-0.5 rounded' : ''
                  }`}
                  {...props}
                >
                  {children}
                </code>
              ),
              pre: ({ children }) => (
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                  {children}
                </pre>
              ),
            }}
            className="prose-headings:font-normal prose-h1:text-3xl prose-h2:text-2xl prose-h2:mt-8 prose-p:text-base prose-p:leading-7 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:font-medium prose-code:text-primary prose-pre:bg-muted prose-pre:text-muted-foreground prose-pre:border prose-pre:border-border prose-img:rounded-lg"
          >
            {contentWithoutTitle}
          </ReactMarkdown>
        </article>
      </div>
    )
  } catch (error) {
    notFound()
  }
} 