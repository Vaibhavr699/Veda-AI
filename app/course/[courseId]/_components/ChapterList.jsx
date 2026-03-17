import React from 'react'

function ChapterList({ chapters, selectedChapter, setSelectedChapter, courseStatus }) {
  return (
    <div className='mt-3'>
      {chapters ? chapters.map((chapter, index) => (
        <div 
          key={index}
          onClick={() => setSelectedChapter(index)}
          className={`p-4 cursor-pointer hover:bg-slate-100 border-b flex items-start gap-3 transition-colors
            ${selectedChapter === index ? 'bg-blue-50 border-r-4 border-blue-600' : ''}
          `}
        >
          <div className='bg-slate-200 h-8 w-8 min-w-[32px] rounded-full flex items-center justify-center text-sm font-bold'>
            {index + 1}
          </div>
          <div>
            <h2 className='font-medium text-sm leading-tight'>{chapter.chapterTitle || chapter.title}</h2>
            <p className='text-[10px] text-gray-500 mt-1 uppercase tracking-wider font-semibold'>
              {chapter.duration || "10 mins"}
            </p>
          </div>
        </div>
      )) : (
        <div className='p-10 text-center text-gray-500'>
            {courseStatus === 'Generating...' ? 'Generating content... please wait.' : 'No chapters found.'}
        </div>
      )}
    </div>
  )
}

export default ChapterList
