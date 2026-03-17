"use client"

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress"
import { icons, LayoutDashboard, Shield, UserCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function Sidebar() {
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
      name: "Profile",
      icon: UserCircle,
      path: "/dashboard/profile",
    },
  ];

  const path = usePathname()

  return (
    <div className="h-screen shadow-md p-5">
      <div className="flex gap-2 items-center">
        <Image src="/logo.svg" alt="logo" width={40} height={40} />
        <h2 className="font-bold text-2xl">Veda AI</h2>
      </div>
      <div className="mt-10">
      <Link href="/create">
  <Button className="w-full p-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white text-xl font-semibold py-4 px-8 rounded-lg shadow-lg transition-all duration-300 ease-in-out">
    + Create New
  </Button>
</Link>



        <div className="mt-5">
          {MenuList.map((menu, index) => {
            const Icon = menu.icon;
            return (
              <Link href={menu.path} key={index}>
                <div
                  className={`flex items-center gap-5 mt-3 p-3 rounded-lg cursor-pointer 
                    hover:bg-slate-200 ${path === menu.path ? 'bg-slate-200' : ''}`}
                >
                  <Icon size={20} />
                  <span className="text-md font-medium">{menu.name}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="border p-3 bg-slate-100 rounded-2xl absolute bottom-10 w-[88%]">
        <h2 className="text-lg mb-2">Available Credits:5</h2>
        <Progress value={30}/>
        <h2 className="text-sm">1 out of 5 Credits Used!</h2>
        <Link href={'/dashboard/upgrade'} className="text-primary text-xs mt-3">Upgrade to create more</Link>
      </div>
    </div>
  );
}

export default Sidebar;
