import React from 'react'
import Sidebar from './_components/Sidebar'

function DashboardLayout({children}){
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-black">
        <div className='md:w-64 hidden md:block fixed h-full'>
            <Sidebar />
        </div>
        <div className='md:ml-64'>
            <div className='p-6 md:p-10 max-w-7xl mx-auto'>
                {children}
            </div>
        </div>
    </div>
  )
}

export default DashboardLayout