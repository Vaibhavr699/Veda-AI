"use client"
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Check, Sparkles, Zap } from 'lucide-react'

function UpgradePage() {
    const [isAnnual, setIsAnnual] = useState(false);
    return (
        <div className='p-5 md:p-10 pb-20'>
            <div className='text-center mb-12'>
                <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-bold text-sm mb-6 border-2 border-blue-200 dark:border-blue-800'>
                    <Zap className='w-4 h-4' />
                    <span>Level up your Career</span>
                </div>
                <h1 className='text-4xl md:text-5xl font-black text-neutral-900 dark:text-white mb-4'>Supercharge your Learning</h1>
                <p className='text-neutral-500 dark:text-neutral-400 font-medium max-w-2xl mx-auto mb-8'>
                    Unlock infinite course generations, advanced GPT-4o models, and comprehensive interview simulator features with Veda AI Premium.
                </p>

                {/* Billing Toggle */}
                <div className='flex items-center justify-center gap-4'>
                    <span className={`font-bold ${!isAnnual ? 'text-neutral-900 dark:text-white' : 'text-neutral-500'}`}>Monthly</span>
                    <button 
                        onClick={() => setIsAnnual(!isAnnual)}
                        className='w-16 h-8 rounded-full border-2 border-neutral-900 dark:border-neutral-300 bg-white dark:bg-[#111] relative shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] transition-all flex items-center px-1'
                    >
                        <div className={`w-5 h-5 rounded-full bg-blue-600 transition-transform duration-300 ${isAnnual ? 'translate-x-8 bg-violet-600' : ''}`}></div>
                    </button>
                    <div className='flex items-center gap-2'>
                        <span className={`font-bold ${isAnnual ? 'text-neutral-900 dark:text-white' : 'text-neutral-500'}`}>Annually</span>
                        <span className='bg-green-100 text-green-800 text-[10px] font-black uppercase tracking-wider py-1 px-2 rounded-lg border-2 border-green-300'>Save 20%</span>
                    </div>
                </div>
            </div>

            <div className='flex flex-col md:flex-row justify-center items-center md:items-stretch gap-8 max-w-5xl mx-auto'>
                {/* Free Tier */}
                <div className='w-full md:w-1/2 p-8 bg-white dark:bg-[#111] border-2 border-neutral-900 dark:border-neutral-300 rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] flex flex-col'>
                    <h2 className='text-2xl font-black text-neutral-900 dark:text-white mb-2'>Starter</h2>
                    <p className='text-neutral-500 dark:text-neutral-400 text-sm font-medium mb-6'>Perfect for exploring the basics.</p>
                    <div className='mb-8'>
                        <span className='text-5xl font-black text-neutral-900 dark:text-white'>Free</span>
                    </div>

                    <ul className='space-y-4 mb-10 flex-1'>
                        <li className='flex items-center gap-3 text-neutral-700 dark:text-neutral-300 font-medium'>
                            <div className='w-6 h-6 flex-shrink-0 rounded-full bg-green-100 flex items-center justify-center border-2 border-green-600'>
                                <Check className='w-4 h-4 text-green-700' />
                            </div>
                            5 Course Generations / month
                        </li>
                        <li className='flex items-center gap-3 text-neutral-700 dark:text-neutral-300 font-medium'>
                            <div className='w-6 h-6 flex-shrink-0 rounded-full bg-green-100 flex items-center justify-center border-2 border-green-600'>
                                <Check className='w-4 h-4 text-green-700' />
                            </div>
                            Gemini AI Model Access
                        </li>
                        <li className='flex items-center gap-3 text-neutral-700 dark:text-neutral-300 font-medium'>
                            <div className='w-6 h-6 flex-shrink-0 rounded-full bg-green-100 flex items-center justify-center border-2 border-green-600'>
                                <Check className='w-4 h-4 text-green-700' />
                            </div>
                            Standard Practice Quizzes
                        </li>
                    </ul>

                    <Button variant='outline' className="w-full h-12 rounded-xl font-bold text-neutral-900 dark:text-white border-2 border-neutral-900 dark:border-neutral-300 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] cursor-default hover:bg-transparent">
                        Current Plan
                    </Button>
                </div>

                {/* Pro Tier */}
                <div className='w-full md:w-1/2 p-8 bg-gradient-to-br from-blue-600 to-indigo-800 text-white border-2 border-neutral-900 dark:border-blue-400 rounded-3xl shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] dark:shadow-[10px_10px_0px_0px_rgba(96,165,250,1)] flex flex-col relative transform md:-translate-y-4 transition-transform hover:-translate-y-5'>
                    <div className='absolute -top-4 right-8 bg-yellow-400 text-yellow-900 text-[10px] font-black uppercase tracking-wider py-1.5 px-4 rounded-full border-2 border-neutral-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-1'>
                        <Sparkles className='w-3 h-3' />
                        Most Popular
                    </div>
                    
                    <h2 className='text-2xl font-black mb-2'>Premium</h2>
                    <p className='text-blue-200 text-sm font-medium mb-6'>For the dedicated learner.</p>
                    <div className='mb-8 flex items-baseline'>
                        <span className='text-5xl font-black'>${isAnnual ? '15' : '19'}</span>
                        <span className='text-blue-200 font-bold ml-1'> / month</span>
                    </div>
                    {isAnnual && (
                        <p className='text-xs text-blue-200 font-bold -mt-6 mb-6'>Billed $180 annually</p>
                    )}

                    <ul className='space-y-4 mb-10 flex-1'>
                        <li className='flex items-center gap-3 font-medium'>
                            <div className='w-6 h-6 flex-shrink-0 rounded-full bg-white flex items-center justify-center border-2 border-neutral-900'>
                                <Check className='w-4 h-4 text-neutral-900' />
                            </div>
                            Unlimited Course Generations
                        </li>
                        <li className='flex items-center gap-3 font-medium'>
                            <div className='w-6 h-6 flex-shrink-0 rounded-full bg-white flex items-center justify-center border-2 border-neutral-900'>
                                <Check className='w-4 h-4 text-neutral-900' />
                            </div>
                            Advanced GPT-4o Model Access
                        </li>
                        <li className='flex items-center gap-3 font-medium'>
                            <div className='w-6 h-6 flex-shrink-0 rounded-full bg-white flex items-center justify-center border-2 border-neutral-900'>
                                <Check className='w-4 h-4 text-neutral-900' />
                            </div>
                            Interactive Interview Simulator
                        </li>
                        <li className='flex items-center gap-3 font-medium'>
                            <div className='w-6 h-6 flex-shrink-0 rounded-full bg-white flex items-center justify-center border-2 border-neutral-900'>
                                <Check className='w-4 h-4 text-neutral-900' />
                            </div>
                            Priority Email Support
                        </li>
                    </ul>

                    <Button className="w-full h-12 rounded-xl font-black bg-white text-neutral-900 border-2 border-neutral-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[4px_4px_0px_0px] hover:bg-neutral-50 transition-all text-lg">
                        Upgrade Now
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default UpgradePage
