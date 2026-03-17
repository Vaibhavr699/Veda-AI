'use client';

import React from 'react';
import Link from 'next/link';
import { useUser, UserButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';

function Header() {
  const { user, isSignedIn } = useUser();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-xl">V</span>
          </div>
          <span className="font-bold text-xl tracking-tight">Veda AI</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</Link>
          <Link href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
          <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">Dashboard</Link>
        </nav>

        <div className="flex items-center gap-4">
          {isSignedIn ? (
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
              <UserButton afterSignOutUrl="/" />
            </div>
          ) : (
            <>
              <Link href="/sign-in">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/sign-up">
                <Button className="bg-primary hover:opacity-90">Get Started</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
