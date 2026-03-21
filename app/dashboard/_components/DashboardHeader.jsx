import React from "react";
import { UserButton } from "@clerk/nextjs";

function DashboardHeader() {
  return (
    <header className="h-16 px-6 border-b-2 border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black flex items-center justify-end sticky top-0 z-40">
      <div className="scale-105 border-2 border-neutral-900 dark:border-neutral-300 rounded-full shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
        <UserButton 
            afterSignOutUrl="/" 
            appearance={{ 
                elements: { 
                    avatarBox: "w-8 h-8" 
                } 
            }} 
        />
      </div>
    </header>
  );
}

export default DashboardHeader;
