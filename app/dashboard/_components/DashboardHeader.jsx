import React, { Children } from "react";
import Sidebar from "./Sidebar";
import { UserButton } from "@clerk/nextjs";

function DashboardHeader() {
  return (
    <div className="p-5 shadow-md flex justify-end">
      <div className="scale-110">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
}

export default DashboardHeader;
