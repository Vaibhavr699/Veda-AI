"use client"
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { RefreshCcw, BookOpen, ArrowRight } from 'lucide-react'

function CourseList() {
    const { user } = useUser();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            GetCourses();
        }
    }, [user])

    const GetCourses = async () => {
        setLoading(true);
        try {
            const result = await axios.get('/api/courses?email=' + user?.primaryEmailAddress?.emailAddress);
            setCourses(result.data.courses);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='mt-8'>
            <div className='flex justify-between items-end mb-6'>
                <div>
                   <h2 className='font-black text-2xl text-neutral-900 dark:text-white'>Your Library</h2>
                   <p className='text-sm text-neutral-500 dark:text-neutral-400 mt-1'>Access your personalized AI courses</p>
                </div>
                <Button 
                   variant="outline" 
                   onClick={GetCourses} 
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
                ) : courses.length > 0 ? (
                    courses.map((course, index) => (
                        <div key={index} className='group flex flex-col p-5 rounded-xl bg-white dark:bg-[#111] border-2 border-neutral-900 dark:border-neutral-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-[6px_6px_0px_0px] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all cursor-pointer relative'>
                            <div className='w-10 h-10 bg-neutral-100 dark:bg-neutral-800 rounded-lg flex items-center justify-center mb-4 border-2 border-neutral-900 dark:border-neutral-500 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 transition-colors'>
                                <BookOpen className='w-5 h-5 text-blue-600 dark:text-blue-400' />
                            </div>
                            <h2 className='font-bold text-lg text-neutral-900 dark:text-white mb-1 leading-tight'>{course.topic}</h2>
                            <p className='text-xs font-medium text-neutral-500 dark:text-neutral-400 line-clamp-2 mb-6'>Personalized study plan for {course.topic}</p>
                            
                            <div className='flex justify-between items-center mt-auto pt-3 border-t-2 border-neutral-100 dark:border-neutral-800'>
                                <span className={`text-[10px] px-2 py-1 rounded-full font-black uppercase tracking-wider border-2 ${
                                    course.status === 'Ready' 
                                        ? 'bg-green-100 text-green-800 border-green-800 dark:bg-green-900/50 dark:text-green-300 dark:border-green-700' 
                                        : 'bg-yellow-100 text-yellow-800 border-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300 dark:border-yellow-700'
                                }`}>
                                    {course.status}
                                </span>
                                <Link href={'/course/' + course.courseID}>
                                    <div className='flex items-center text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors'>
                                        View
                                        <ArrowRight className='w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform' />
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className='col-span-full py-16 text-center bg-white dark:bg-[#111] rounded-2xl border-2 border-dashed border-neutral-300 dark:border-neutral-700'>
                        <div className='w-16 h-16 mx-auto bg-neutral-100 dark:bg-neutral-900 rounded-xl flex items-center justify-center mb-4 border-2 border-neutral-200 dark:border-neutral-800'>
                           <BookOpen className='w-8 h-8 text-neutral-400' />
                        </div>
                        <h3 className='text-xl font-black text-neutral-900 dark:text-white mb-2'>You haven't created any courses</h3>
                        <p className='text-sm text-neutral-500 dark:text-neutral-400 mb-6 max-w-sm mx-auto'>Hit the ground running by instructing the AI to build your first tailored syllabus.</p>
                        <Link href="/create">
                            <Button className="h-11 px-6 rounded-lg text-sm font-bold bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 border-2 border-neutral-900 dark:border-neutral-300 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:shadow-[4px_4px_0px_0px] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all">
                                Create your first course
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CourseList
