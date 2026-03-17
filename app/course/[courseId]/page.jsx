"use client"
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios'
import ChapterList from './_components/ChapterList'
import NotesContent from './_components/NotesContent'
import { Button } from '@/components/ui/button'
import { ChevronLeft, LayoutDashboard } from 'lucide-react'
import Link from 'next/link'

function CourseView() {
  const { courseId } = useParams()
  const [course, setCourse] = useState(null)
  const [selectedChapter, setSelectedChapter] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (courseId) {
      GetCourseDetails()
    }
  }, [courseId])

  const GetCourseDetails = async () => {
    setLoading(true)
    try {
      const result = await axios.get('/api/course/' + courseId)
      setCourse(result.data.course)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const chapters = course?.courseLayout?.chapters || course?.courseLayout?.course?.chapters

  return (
    <div className='flex flex-col md:flex-row h-screen'>
      {/* Sidebar - Chapter List */}
      <div className='w-full md:w-72 border-r h-full overflow-y-auto bg-white'>
        <div className='p-4 border-b flex items-center gap-2'>
           <Link href="/dashboard">
             <Button variant="ghost" size="icon">
               <ChevronLeft className="h-4 w-4" />
             </Button>
           </Link>
           <h2 className='font-bold text-lg truncate'>{course?.topic || "Loading..."}</h2>
        </div>
        <ChapterList 
          chapters={chapters} 
          selectedChapter={selectedChapter}
          setSelectedChapter={(v) => setSelectedChapter(v)}
          courseStatus={course?.status}
        />
      </div>

      {/* Main Content - Chapter Notes */}
      <div className='flex-1 h-full overflow-y-auto bg-slate-50'>
         <div className='max-w-4xl mx-auto p-5 md:p-10'>
            {loading ? (
                <div className='flex items-center justify-center h-[60vh]'>
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
            ) : (
                <NotesContent 
                    courseId={courseId} 
                    chapterId={selectedChapter} 
                    chapterTitle={chapters?.[selectedChapter]?.chapterTitle || chapters?.[selectedChapter]?.title}
                />
            )}
         </div>
      </div>
    </div>
  )
}

export default CourseView
