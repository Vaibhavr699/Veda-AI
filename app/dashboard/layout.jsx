import React from 'react'
import Sidebar from './_components/Sidebar'
import MobileNav from './_components/MobileNav'

function DashboardLayout({children}){
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-black">
        {/* Mobile Navigation */}
        <MobileNav />

        {/* Desktop Sidebar */}
        <div className='md:w-64 hidden md:block fixed h-full'>
            <Sidebar />
        </div>
        <div className='md:ml-64'>
            <div className='pt-20 md:pt-0 p-6 md:p-10 max-w-7xl mx-auto'>
                {children}
            </div>
        </div>
    </div>
  )
}

export default DashboardLayout