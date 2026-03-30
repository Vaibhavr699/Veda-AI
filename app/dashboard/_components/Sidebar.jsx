"use client"

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress"
import { LayoutDashboard, Shield, UserCircle, ClipboardList } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { UserButton, useUser } from "@clerk/nextjs";

function Sidebar() {
  const { user } = useUser();
  const MenuList = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      name: "Upgrade",
      icon: Shield,
      path: "/dashboard/upgrade",
    },
    {
      name: "Results",
      icon: ClipboardList,
      path: "/dashboard/results",
    },
    {
      name: "Profile",
      icon: UserCircle,
      path: "/dashboard/profile",
    },
  ];

  const path = usePathname()

  return (
    <div className="h-[100vh] border-r-2 border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black p-4 flex flex-col">
      {/* Brand Logo */}
      <div className="flex gap-2 items-center px-1 mb-6 group cursor-pointer">
        <div className="relative w-8 h-8 bg-neutral-900 dark:bg-white rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105 border-2 border-neutral-900 dark:border-neutral-300 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
          <span className="text-white dark:text-neutral-900 font-extrabold text-lg leading-none">V</span>
        </div>
        <h2 className="font-extrabold text-xl tracking-tight text-neutral-900 dark:text-white">Veda<span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600'> AI</span></h2>
      </div>

      <div className="flex flex-col flex-1">
        {/* Create Button */}
        <Link href="/create" className="block mb-6">
          <Button className="w-full h-11 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-bold text-sm rounded-lg border-2 border-neutral-900 dark:border-neutral-300 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:shadow-[4px_4px_0px_0px] hover:-translate-y-[1px] hover:-translate-x-[1px] transition-all flex items-center justify-center gap-2">
            <span className="text-lg pt-[1px]">+</span> Create New
          </Button>
        </Link>

        {/* Navigation Menu */}
        <div className="space-y-1">
          {MenuList.map((menu, index) => {
            const Icon = menu.icon;
            const isActive = path === menu.path;
            return (
              <Link href={menu.path} key={index}>
                <div
                  className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer font-bold transition-all border-2
                    ${isActive 
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400 shadow-[2px_2px_0px_0px_#2563eb] dark:shadow-[2px_2px_0px_0px_#60a5fa]' 
                      : 'border-transparent text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:border-neutral-200 dark:hover:border-neutral-800'}`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm">{menu.name}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* User Info & Bottom Credits Box */}
      <div className="mt-auto space-y-4">
        {/* Credits Box */}
        <div className="p-4 border-2 border-neutral-900 dark:border-neutral-700 bg-white dark:bg-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]">
          <h2 className="text-base font-bold text-neutral-900 dark:text-white mb-2">Credits</h2>
          <Progress value={(1/5)*100} className="h-2 mb-2 border border-neutral-300 dark:border-neutral-700 [&>div]:bg-blue-600" />
          <h2 className="text-xs font-semibold text-neutral-600 dark:text-neutral-400 mb-1">1 out of 5 used</h2>
          <Link href={'/dashboard/upgrade'} className="text-blue-600 dark:text-blue-400 text-xs font-bold hover:underline block mt-1">
            Upgrade for more
          </Link>
        </div>

        {/* User Profile Info */}
        <div className="flex items-center gap-3 p-3 bg-neutral-50 dark:bg-neutral-900 border-2 border-neutral-200 dark:border-neutral-800 rounded-xl cursor-default hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors">
          <div className="flex-shrink-0 scale-110 border border-neutral-300 dark:border-neutral-700 rounded-full shadow-sm">
            <UserButton 
                afterSignOutUrl="/" 
                appearance={{ 
                    elements: { 
                        avatarBox: "w-full h-full" 
                    } 
                }} 
            />
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-bold text-neutral-900 dark:text-white truncate">
              {user?.fullName || "Learner"}
            </span>
            <span className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
              {user?.primaryEmailAddress?.emailAddress || "Loading..."}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
