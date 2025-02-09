import { Metadata } from "next"

export const metadata: Metadata = {
  title: "about - dead code",
  description: "About Dead Code and Fernando Lamadrid",
}

export default function AboutPage() {
  return (
    <div className="container py-10">
      <div className="flex flex-col space-y-8 max-w-2xl mx-auto">
        <div className="space-y-6">
          <h1 className="text-3xl font-bold tracking-tight">about</h1>
          
          <div className="prose dark:prose-invert">
            <p>
              Hi, I'm Fernando Lamadrid, a software engineer passionate about building 
              great web experiences. I created Dead Code as a place to share my 
              knowledge and experiences in software development.
            </p>

            <h2>What I Write About</h2>
            <ul>
              <li>React and Next.js development</li>
              <li>TypeScript best practices</li>
              <li>Software architecture and patterns</li>
              <li>Developer productivity and tools</li>
            </ul>

            <h2>Why "Dead Code"?</h2>
            <p>
              Dead Code is a programming term for code that exists in the source but is 
              never executed. This blog aims to help developers identify and eliminate 
              inefficiencies in their code while building better, more maintainable 
              applications.
            </p>

            <h2>Get in Touch</h2>
            <p>
              Have questions or want to discuss something? Feel free to reach out to me 
              on{" "}
              <a 
                href="https://twitter.com/yourusername" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Twitter
              </a>
              {" "}or{" "}
              <a 
                href="https://github.com/yourusername" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                GitHub
              </a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 