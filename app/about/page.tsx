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
              Hi, I'm Fernando De La Madrid, a software engineer driven by a passion for building and learning. 
              I created Dead Code to share my knowledge, experiences, and insights on software and AI development.
            </p>

            <h2>What I Write About</h2>
            <ul>
              <li>Machine Learning</li>
              <li>AI Engineering Techniques</li>
              <li>React and Next.js development</li>
              <li>TypeScript and Python</li>
              <li>Software architecture and patterns</li>
              <li>Developer productivity and tools</li>
            </ul>

            <h2>Get in Touch</h2>
            <p>
              Have questions or want to discuss something? Feel free to reach out to me 
              on{" "}
              <a 
                href="https://twitter.com/imdeadcode" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Twitter
              </a>
              {" "}or{" "}
              <a 
                href="https://github.com/ferdelamad" 
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