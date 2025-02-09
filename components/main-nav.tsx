import Link from "next/link"

export function MainNav() {
  return (
    <div className="mr-4 flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <span className="font-bold sm:inline-block">Dead Code</span>
      </Link>
    </div>
  )
} 