"use client"
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { RefreshCcw, ClipboardList, ArrowRight, BookOpen } from 'lucide-react'

function ResultsPage() {
    const { user } = useUser();
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            GetResults();
        }
    }, [user])

    const GetResults = async () => {
        setLoading(true);
        try {
            const res = await axios.get('/api/results?email=' + user?.primaryEmailAddress?.emailAddress);
            setResults(res.data.results || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='p-5 md:p-8'>
            <div className='flex justify-between items-end mb-6 mt-8'>
                <div>
                   <h2 className='font-black text-2xl text-neutral-900 dark:text-white'>Test Results & Feedback</h2>
                   <p className='text-sm text-neutral-500 dark:text-neutral-400 mt-1'>Review your quiz scores and AI feedbacks</p>
                </div>
                <Button 
                   variant="outline" 
                   onClick={GetResults} 
                   disabled={loading}
                   className="h-10 px-4 rounded-lg font-bold text-sm border-2 border-neutral-900 dark:border-neutral-300 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:shadow-[4px_4px_0px_0px] hover:-translate-y-[1px] hover:-translate-x-[1px] transition-all"
                >
                    <RefreshCcw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                    Refresh
                </Button>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {loading ? (
                    [1, 2, 3].map((i) => (
                        <div key={i} className='h-48 border-2 border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 animate-pulse rounded-xl'></div>
                    ))
                ) : results.length > 0 ? (
                    results.map((item, index) => (
                         <div key={index} className='group flex flex-col p-5 rounded-xl bg-white dark:bg-[#111] border-2 border-neutral-900 dark:border-neutral-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-[6px_6px_0px_0px] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all cursor-pointer relative'>
                            <div className='flex justify-between items-end mb-4'>
                                <div className='w-10 h-10 bg-neutral-100 dark:bg-neutral-800 rounded-lg flex items-center justify-center border-2 border-neutral-900 dark:border-neutral-500 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 transition-colors'>
                                    <ClipboardList className='w-5 h-5 text-blue-600 dark:text-blue-400' />
                                </div>
                                <div className='font-black text-xl text-neutral-900 dark:text-white'>
                                    {item.score} / {item.totalQuestions}
                                </div>
                            </div>
                            <h2 className='font-bold text-lg text-neutral-900 dark:text-white mb-1 leading-tight'>{item.topic || 'Unknown Course'}</h2>
                            <p className='text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-2 capitalize'>Exam Type: {item.examType}</p>
                            
                            <div className='bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border-2 border-blue-200 dark:border-blue-800 mb-6'>
                                <p className='text-xs text-blue-800 dark:text-blue-300 font-medium line-clamp-3'>
                                    {item.feedback || 'No feedback available.'}
                                </p>
                            </div>
                            
                            <div className='flex justify-between items-center mt-auto pt-3 border-t-2 border-neutral-100 dark:border-neutral-800'>
                                <Link href={'/course/' + item.courseId}>
                                    <div className='flex items-center text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors'>
                                        Back to Course
                                        <ArrowRight className='w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform' />
                                    </div>
                                </Link>
                                <span className='text-[10px] text-neutral-400'>{new Date(item.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className='col-span-full py-16 text-center bg-white dark:bg-[#111] rounded-2xl border-2 border-dashed border-neutral-300 dark:border-neutral-700'>
                        <div className='w-16 h-16 mx-auto bg-neutral-100 dark:bg-neutral-900 rounded-xl flex items-center justify-center mb-4 border-2 border-neutral-200 dark:border-neutral-800'>
                           <ClipboardList className='w-8 h-8 text-neutral-400' />
                        </div>
                        <h3 className='text-xl font-black text-neutral-900 dark:text-white mb-2'>No Results Found</h3>
                        <p className='text-sm text-neutral-500 dark:text-neutral-400 mb-6 max-w-sm mx-auto'>Take quizzes and tests in your courses to track your scores and AI-generated feedback here.</p>
                        <Link href="/dashboard">
                            <Button className="h-11 px-6 rounded-lg text-sm font-bold bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 border-2 border-neutral-900 dark:border-neutral-300 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:shadow-[4px_4px_0px_0px] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all">
                                Go to Courses
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ResultsPage
