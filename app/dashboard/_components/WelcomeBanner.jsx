"use client"

import { useUser } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

function WelcomeBanner() {
    const {user} = useUser();
  return (
    <div className='relative p-6 md:p-8 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-2xl border-2 border-neutral-900 dark:border-neutral-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] flex flex-col md:flex-row items-center gap-6 overflow-hidden group'>
        <div className='absolute -right-10 -top-10 w-48 h-48 bg-blue-500/20 blur-3xl rounded-full'></div>
        <div className='flex-1 z-10 text-center md:text-left'>
            <h2 className='text-2xl md:text-3xl font-black mb-2'>
              Welcome back, <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 dark:from-blue-600 dark:to-indigo-600'>{user?.firstName || 'Learner'}</span>! 👋
            </h2>
            <p className='text-base text-neutral-300 dark:text-neutral-600 max-w-xl'>
              Ready to crush your goals today? Let's dive back into your personalized AI study materials.
            </p>
        </div>
        <div className='hidden md:flex flex-shrink-0 z-10 w-20 h-20 bg-white/10 dark:bg-black/5 rounded-full items-center justify-center border-2 border-white/20 dark:border-black/10 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110'>
            <span className='text-4xl'>🚀</span>
        </div>
    </div>
  )
}

export default WelcomeBanner