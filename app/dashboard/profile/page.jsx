"use client"
import { UserProfile } from '@clerk/nextjs'
import React from 'react'

function ProfilePage() {
  return (
    <div className='p-5 md:p-8 flex flex-col items-center justify-center min-h-[80vh] w-full'>
        <div className='mb-8 text-center'>
            <h2 className='font-black text-3xl text-neutral-900 dark:text-white capitalize'>Your Profile</h2>
            <p className='text-sm text-neutral-500 dark:text-neutral-400 mt-2 font-medium'>Manage your Veda AI account and preferences</p>
        </div>
        
        {/* Clerk User Profile Component with Customized Appearance for our Theme */}
        <div className='border-2 border-neutral-900 dark:border-neutral-300 rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] overflow-hidden'>
            <UserProfile 
                appearance={{
                    elements: {
                        rootBox: "w-full",
                        card: "rounded-none shadow-none border-0",
                        navbar: "hidden md:flex",
                        pageScrollBox: "p-4 md:p-6"
                    }
                }}
            />
        </div>
    </div>
  )
}

export default ProfilePage
