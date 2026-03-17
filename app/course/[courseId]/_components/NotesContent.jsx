import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ReactMarkdown from 'react-markdown'

function NotesContent({ courseId, chapterId, chapterTitle }) {
  const [notes, setNotes] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (courseId && chapterId !== undefined) {
      GetChapterNotes()
    }
  }, [courseId, chapterId])

  const GetChapterNotes = async () => {
    setLoading(true)
    try {
      const result = await axios.get(`/api/course/${courseId}/notes?chapterId=${chapterId}`)
      setNotes(result.data.notes)
    } catch (err) {
      console.error(err)
      setNotes(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='bg-white p-8 md:p-12 rounded-2xl shadow-sm border min-h-[70vh]'>
      <h1 className='text-3xl font-bold mb-8 text-slate-800 border-b pb-4'>{chapterTitle}</h1>
      
      {loading ? (
        <div className='space-y-4'>
            <div className='h-4 bg-slate-100 animate-pulse rounded w-3/4'></div>
            <div className='h-4 bg-slate-100 animate-pulse rounded w-full'></div>
            <div className='h-4 bg-slate-100 animate-pulse rounded w-5/6'></div>
            <div className='h-64 bg-slate-100 animate-pulse rounded w-full mt-10'></div>
        </div>
      ) : notes ? (
        <article className='prose prose-slate max-w-none prose-headings:text-slate-800 prose-p:text-slate-600 prose-li:text-slate-600'>
          <ReactMarkdown>{notes}</ReactMarkdown>
        </article>
      ) : (
        <div className='flex flex-col items-center justify-center h-full py-20 text-center'>
            <p className='text-slate-500 mb-2'>No notes found for this chapter.</p>
            <p className='text-xs text-slate-400'>If you just created this course, the notes might still be generating in the background.</p>
        </div>
      )}
    </div>
  )
}

export default NotesContent
