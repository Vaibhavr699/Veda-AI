"use client"

import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Sidebar from "./Sidebar";
import { usePathname } from "next/navigation";

function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close sidebar on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 h-14 bg-white dark:bg-black border-b-2 border-neutral-200 dark:border-neutral-800 flex items-center px-4">
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 -ml-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors border-2 border-transparent hover:border-neutral-200 dark:hover:border-neutral-800"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5 text-neutral-900 dark:text-white" />
        </button>

        <div className="flex gap-2 items-center ml-3">
          <div className="w-7 h-7 bg-neutral-900 dark:bg-white rounded-lg flex items-center justify-center border-2 border-neutral-900 dark:border-neutral-300 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
            <span className="text-white dark:text-neutral-900 font-extrabold text-sm leading-none">V</span>
          </div>
          <h2 className="font-extrabold text-lg tracking-tight text-neutral-900 dark:text-white">
            Veda<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600"> AI</span>
          </h2>
        </div>
      </div>

      {/* Backdrop Overlay */}
      <div
        className={`md:hidden fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Slide-out Sidebar Drawer */}
      <div
        className={`md:hidden fixed top-0 left-0 z-[70] h-full w-72 transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-3 z-10 p-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors border-2 border-neutral-300 dark:border-neutral-600"
          aria-label="Close menu"
        >
          <X className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
        </button>

        <Sidebar />
      </div>
    </>
  );
}

export default MobileNav;
