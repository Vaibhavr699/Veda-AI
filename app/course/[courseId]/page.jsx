"use client"
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios'
import ChapterList from './_components/ChapterList'
import NotesContent from './_components/NotesContent'
import { Button } from '@/components/ui/button'
import { ChevronLeft, LayoutDashboard, ClipboardList, Briefcase, ChevronDown, ChevronUp, List } from 'lucide-react'
import Link from 'next/link'

function CourseView() {
  const { courseId } = useParams()
  const [course, setCourse] = useState(null)
  const [selectedChapter, setSelectedChapter] = useState(0)
  const [loading, setLoading] = useState(true)
  const [showChapters, setShowChapters] = useState(false)

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

  const handleChapterSelect = (index) => {
    setSelectedChapter(index)
    setShowChapters(false) // Auto-close on mobile after selecting
  }

  return (
    <div className='flex flex-col md:flex-row h-screen'>
      {/* Sidebar - Chapter List */}
      <div className='w-full md:w-72 border-r md:h-full overflow-y-auto bg-white flex-shrink-0'>
        {/* Header - always visible */}
        <div className='p-4 border-b flex items-center gap-2'>
           <Link href="/dashboard">
             <Button variant="ghost" size="icon">
               <ChevronLeft className="h-4 w-4" />
             </Button>
           </Link>
           <h2 className='font-bold text-lg truncate flex-1'>{course?.topic || "Loading..."}</h2>
           
           {/* Mobile toggle button */}
           <button 
             onClick={() => setShowChapters(!showChapters)}
             className='md:hidden p-2 rounded-lg hover:bg-neutral-100 border-2 border-neutral-200 transition-colors flex items-center gap-1.5'
             aria-label={showChapters ? "Hide chapters" : "Show chapters"}
           >
             <List className='w-4 h-4' />
             <span className='text-xs font-bold'>{showChapters ? 'Hide' : 'Chapters'}</span>
             {showChapters ? <ChevronUp className='w-3 h-3' /> : <ChevronDown className='w-3 h-3' />}
           </button>
        </div>
        
        {/* Chapter list - collapsible on mobile, always shown on desktop */}
        <div className={`${showChapters ? 'max-h-[60vh]' : 'max-h-0'} md:max-h-none overflow-y-auto transition-all duration-300 ease-in-out md:overflow-y-auto`}>
          <ChapterList 
            chapters={chapters} 
            selectedChapter={selectedChapter}
            setSelectedChapter={handleChapterSelect}
            courseStatus={course?.status}
          />
        </div>

        {/* Action buttons - collapsible with chapters on mobile */}
        <div className={`${showChapters ? 'block' : 'hidden'} md:block p-4 mt-auto border-t flex flex-col gap-3`}>
            <Link href={`/course/${courseId}/quiz?topic=${encodeURIComponent(course?.topic || '')}`}>
              <Button className="w-full h-11 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-bold text-sm rounded-lg border-2 border-neutral-900 dark:border-neutral-300 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:shadow-[4px_4px_0px_0px] hover:-translate-y-[1px] hover:-translate-x-[1px] transition-all flex items-center justify-center gap-2">
                 <ClipboardList className='w-4 h-4' />
                 Practice Test
              </Button>
            </Link>
            
            <Link href={`/course/${courseId}/interview?topic=${encodeURIComponent(course?.topic || '')}`}>
              <Button variant="outline" className="w-full h-11 bg-white dark:bg-[#111] text-neutral-900 dark:text-white font-bold text-sm rounded-lg border-2 border-neutral-900 dark:border-neutral-300 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:shadow-[4px_4px_0px_0px] hover:-translate-y-[1px] hover:-translate-x-[1px] transition-all flex items-center justify-center gap-2">
                 <Briefcase className='w-4 h-4' />
                 Interview Prep
              </Button>
            </Link>
        </div>
      </div>

      {/* Main Content - Chapter Notes */}
      <div className='flex-1 min-h-0 overflow-y-auto bg-slate-50'>
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
