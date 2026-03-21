"use client";
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useUser, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { MenuIcon, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "About Us", href: "#" },
];

export default function Navbar({ className }) {
  const { user, isSignedIn } = useUser();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-neutral-200/50 dark:border-neutral-800/50 shadow-sm"
            : "bg-white",
          className
        )}
      >
        <div className="container mx-auto px-5 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative w-10 h-10 bg-neutral-900 dark:bg-white rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105 border-2 border-neutral-900 dark:border-neutral-300 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
                <span className="text-white dark:text-neutral-900 font-extrabold text-xl leading-none">V</span>
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Veda<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600"> AI</span>
              </span>
            </Link>

            {/* Center Navigation — Desktop */}
            <div className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="relative text-base font-bold text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors group"
                >
                  {link.label}
                  <span className="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </div>

            {/* Right Side — Auth Buttons / User */}
            <div className="flex items-center gap-3">
              {isSignedIn ? (
                <div className="flex items-center gap-4">
                  <Link href="/dashboard">
                    <Button
                      variant="ghost"
                      className="hidden sm:inline-flex text-base font-bold text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white"
                    >
                      Dashboard
                    </Button>
                  </Link>
                  <UserButton
                    afterSignOutUrl="/"
                    appearance={{
                      elements: {
                        avatarBox: "w-14 h-14 border-2 border-neutral-900 dark:border-neutral-300",
                      },
                    }}
                  />
                </div>
              ) : (
                <div className="hidden sm:flex items-center gap-3">
                  <Link href="/sign-in">
                    <Button
                      variant="ghost"
                      className="text-base font-bold text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white px-5 h-12 rounded-xl transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    >
                      Log in
                    </Button>
                  </Link>
                  <Link href="/sign-up">
                    <Button
                      className="text-base font-bold px-7 h-12 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 border-2 border-neutral-900 dark:border-neutral-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-[6px_6px_0px_0px] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-300"
                    >
                      Sign up free
                    </Button>
                  </Link>
                </div>
              )}

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2.5 rounded-xl border-2 border-neutral-900 dark:border-neutral-300 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:translate-y-[1px] hover:translate-x-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all bg-white dark:bg-neutral-900 ml-2"
                aria-label="Toggle menu"
              >
                {mobileOpen ? (
                  <X className="w-5 h-5 text-neutral-900 dark:text-white" />
                ) : (
                  <MenuIcon className="w-5 h-5 text-neutral-900 dark:text-white" />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-x-0 top-20 z-40 bg-white dark:bg-black border-b-2 border-neutral-900 dark:border-neutral-800 md:hidden overflow-hidden"
          >
            <div className="container mx-auto px-5 py-8 flex flex-col items-center space-y-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-2xl font-bold text-neutral-900 dark:text-white hover:text-blue-600 transition-colors"
                >
                  {link.label}
                </Link>
              ))}

              <div className="w-full border-t-2 border-neutral-100 dark:border-neutral-900 pt-8 mt-4 flex flex-col gap-4">
                {isSignedIn ? (
                  <Link href="/dashboard" onClick={() => setMobileOpen(false)} className="w-full">
                    <Button className="w-full h-14 rounded-xl text-lg font-bold border-2 border-neutral-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      Dashboard
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link href="/sign-in" onClick={() => setMobileOpen(false)} className="w-full">
                      <Button variant="outline" className="w-full h-14 rounded-xl text-lg font-bold border-2 border-neutral-900 dark:border-neutral-300 bg-transparent text-neutral-900 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800">
                        Log in
                      </Button>
                    </Link>
                    <Link href="/sign-up" onClick={() => setMobileOpen(false)} className="w-full">
                      <Button className="w-full h-14 rounded-xl text-lg font-bold bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 border-2 border-neutral-900 dark:border-neutral-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                        Sign up free
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
