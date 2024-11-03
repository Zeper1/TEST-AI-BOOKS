"use client"

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from './auth-provider'
import { Button } from './ui/button'
import { BookOpen, Menu, X } from 'lucide-react'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

export function Header() {
  const { user } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center space-x-2">
          <BookOpen className="h-6 w-6 text-primary" />
          <span className="font-bold">StoryMagic</span>
        </Link>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="hidden md:flex items-center space-x-4">
            <Link href="/pricing" className="text-foreground/60 hover:text-foreground">
              Pricing
            </Link>
            <Link href="/how-it-works" className="text-foreground/60 hover:text-foreground">
              How it Works
            </Link>
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost">My Account</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/my-books">My Books</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings">Settings</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link href="/register">Get Started</Link>
                </Button>
              </>
            )}
          </nav>

          <Button
            variant="ghost"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container py-4 space-y-4">
            <Link
              href="/pricing"
              className="block text-foreground/60 hover:text-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="/how-it-works"
              className="block text-foreground/60 hover:text-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              How it Works
            </Link>
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="block text-foreground/60 hover:text-foreground"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href="/my-books"
                  className="block text-foreground/60 hover:text-foreground"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Books
                </Link>
                <Link
                  href="/settings"
                  className="block text-foreground/60 hover:text-foreground"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Settings
                </Link>
              </>
            ) : (
              <div className="space-y-2">
                <Button variant="ghost" className="w-full" asChild>
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button className="w-full" asChild>
                  <Link href="/register">Get Started</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}