"use client"

import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { MainNav } from "@/components/main-nav"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <MainNav />
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center space-x-4">
            <Link
              href="/blog"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              blog
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              about
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
} 