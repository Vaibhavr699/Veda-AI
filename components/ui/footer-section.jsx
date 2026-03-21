"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Facebook, Instagram, Linkedin, Send, Twitter } from "lucide-react"

function Footerdemo() {
  return (
    <footer className="relative border-t border-neutral-200 dark:border-white/[0.06] bg-white dark:bg-black text-foreground transition-colors duration-300">
      <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Newsletter */}
          <div className="relative">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-neutral-900 to-neutral-700 dark:from-white dark:to-neutral-300 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white dark:text-black font-black text-lg leading-none">V</span>
              </div>
              <span className="text-xl font-black tracking-tight text-neutral-900 dark:text-white">
                Veda<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400"> AI</span>
              </span>
            </div>
            <p className="mb-6 text-muted-foreground leading-relaxed">
              Pioneering the future of education with empathetic AI agents and personalized learning systems.
            </p>
            <form className="relative" onSubmit={(e) => e.preventDefault()}>
              <Input
                type="email"
                placeholder="Enter your email"
                className="pr-12 backdrop-blur-sm rounded-xl h-11"
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-1.5 top-1.5 h-8 w-8 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 transition-transform hover:scale-105"
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Subscribe</span>
              </Button>
            </form>
            <div className="absolute -right-4 top-0 h-24 w-24 rounded-full bg-blue-500/10 blur-2xl pointer-events-none" />
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-neutral-900 dark:text-white">Quick Links</h3>
            <nav className="space-y-3 text-sm">
              <Link href="/" className="block text-muted-foreground transition-colors hover:text-neutral-900 dark:hover:text-white">
                Home
              </Link>
              <Link href="#features" className="block text-muted-foreground transition-colors hover:text-neutral-900 dark:hover:text-white">
                Features
              </Link>
              <Link href="/create" className="block text-muted-foreground transition-colors hover:text-neutral-900 dark:hover:text-white">
                Create Course
              </Link>
              <Link href="/dashboard" className="block text-muted-foreground transition-colors hover:text-neutral-900 dark:hover:text-white">
                Dashboard
              </Link>
              <Link href="#pricing" className="block text-muted-foreground transition-colors hover:text-neutral-900 dark:hover:text-white">
                Pricing
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-neutral-900 dark:text-white">Contact Us</h3>
            <address className="space-y-3 text-sm not-italic text-muted-foreground">
              <p>Veda AI Technologies Inc.</p>
              <p>Innovation Hub, Suite 200</p>
              <p>San Francisco, CA 94105</p>
              <p className="pt-1">
                <a href="mailto:hello@vedaai.com" className="transition-colors hover:text-neutral-900 dark:hover:text-white">
                  hello@vedaai.com
                </a>
              </p>
            </address>
          </div>

          {/* Social Links */}
          <div className="relative">
            <h3 className="mb-4 text-lg font-bold text-neutral-900 dark:text-white">Follow Us</h3>
            <div className="flex space-x-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full h-10 w-10 border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all hover:scale-105">
                      <Facebook className="h-4 w-4" />
                      <span className="sr-only">Facebook</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Follow us on Facebook</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full h-10 w-10 border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all hover:scale-105">
                      <Twitter className="h-4 w-4" />
                      <span className="sr-only">Twitter</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Follow us on Twitter</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full h-10 w-10 border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all hover:scale-105">
                      <Instagram className="h-4 w-4" />
                      <span className="sr-only">Instagram</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Follow us on Instagram</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full h-10 w-10 border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all hover:scale-105">
                      <Linkedin className="h-4 w-4" />
                      <span className="sr-only">LinkedIn</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Connect with us on LinkedIn</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-neutral-200 dark:border-white/[0.06] pt-8 text-center md:flex-row">
          <p className="text-sm text-muted-foreground font-medium">
            © 2026 Veda AI Technologies Inc. Crafting wisdom, one byte at a time.
          </p>
          <nav className="flex gap-6 text-sm">
            <Link href="#" className="text-muted-foreground transition-colors hover:text-neutral-900 dark:hover:text-white">
              Privacy Policy
            </Link>
            <Link href="#" className="text-muted-foreground transition-colors hover:text-neutral-900 dark:hover:text-white">
              Terms of Service
            </Link>
            <Link href="#" className="text-muted-foreground transition-colors hover:text-neutral-900 dark:hover:text-white">
              Cookie Settings
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}

export { Footerdemo }
