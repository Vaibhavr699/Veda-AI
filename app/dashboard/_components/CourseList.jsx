"use client"
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { RefreshCcw } from 'lucide-react'

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
        <div className='mt-10'>
            <div className='flex justify-between items-center'>
                <h2 className='font-bold text-2xl text-slate-800'>Your Study Material</h2>
                <Button variant="outline" size="sm" onClick={GetCourses} disabled={loading}>
                    <RefreshCcw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                    Refresh
                </Button>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5'>
                {loading ? (
                    [1, 2, 3].map((i) => (
                        <div key={i} className='h-48 bg-slate-100 animate-pulse rounded-xl'></div>
                    ))
                ) : courses.length > 0 ? (
                    courses.map((course, index) => (
                        <div key={index} className='border p-5 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow relative'>
                            <div className='h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4'>
                                <span className='text-2xl'>📚</span>
                            </div>
                            <h2 className='font-bold text-lg text-slate-800 mb-1'>{course.topic}</h2>
                            <p className='text-xs text-gray-500 line-clamp-2 mb-4'>Personalized study plan for {course.topic}</p>
                            
                            <div className='flex justify-between items-center mt-auto'>
                                <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase ${
                                    course.status === 'Ready' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                }`}>
                                    {course.status}
                                </span>
                                <Link href={'/course/' + course.courseID}>
                                    <Button size="sm">View Course</Button>
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className='col-span-full py-20 text-center bg-slate-50 rounded-xl border-2 border-dashed'>
                        <p className='text-gray-500'>You haven't created any courses yet.</p>
                        <Link href="/create">
                            <Button variant="link">Create your first course</Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CourseList
