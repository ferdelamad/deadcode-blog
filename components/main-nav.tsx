import Link from "next/link"

export function MainNav() {
  return (
    <div className="mr-4 flex">
      <Link 
        href="/" 
        className="mr-6 flex items-center space-x-2 relative group px-4 py-1"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100" />
        <span className="font-bold text-lg relative">
          Dead
          <span className="text-primary">Code</span>
        </span>
        <span className="text-xl transition-transform duration-200 group-hover:rotate-12 group-hover:scale-110">💀</span>
      </Link>
    </div>
  )
} 