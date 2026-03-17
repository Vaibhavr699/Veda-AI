"use client"

import { useUser } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

function WelcomeBanner() {
    const {user} = useUser();
  return (
    <div className='p-5 bg-blue-500 w-full text-white rounded-lg'>
        <Image src={'/laptop.png'} alt='laptop' width={100} height={100}/>
        <div>
            <h2>Hello, {user?.fullName}</h2>
            <p>Welcome Back, its time to get back and start learning new content.</p>
        </div>
    </div>
  )
}

export default WelcomeBanner