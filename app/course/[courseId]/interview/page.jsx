"use client"
import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Loader2, Sparkles, Lightbulb } from 'lucide-react'
import Link from 'next/link'

function InterviewPage() {
    const { courseId } = useParams()
    const searchParams = useSearchParams()
    const topic = searchParams.get('topic') || 'your course'

    const [loading, setLoading] = useState(true)
    const [interviewData, setInterviewData] = useState(null)
    const [flippedCards, setFlippedCards] = useState({})

    useEffect(() => {
        if (courseId) {
            GenerateOrFetchInterview()
        }
    }, [courseId])

    const GenerateOrFetchInterview = async () => {
        setLoading(true)
        try {
            const result = await axios.post('/api/generate-interview', {
                courseId: courseId,
                topic: topic
            })
            setInterviewData(result.data.interview.content)
        } catch (err) {
            console.error('Failed to generate interview', err)
            alert('Failed to load interview questions. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const toggleCard = (index) => {
        setFlippedCards(prev => ({
            ...prev,
            [index]: !prev[index]
        }))
    }

    const colorGradients = [
        'from-blue-600 to-indigo-700',
        'from-emerald-500 to-teal-700',
        'from-violet-600 to-purple-800',
        'from-pink-500 to-rose-700',
        'from-amber-500 to-orange-700'
    ]

    if (loading) {
        return (
            <div className='flex flex-col items-center justify-center h-screen bg-slate-50 dark:bg-black'>
                <div className='bg-white dark:bg-neutral-900 border-2 border-neutral-900 dark:border-neutral-300 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] rounded-2xl p-10 flex flex-col items-center max-w-sm text-center'>
                    <Loader2 className="w-12 h-12 mb-4 animate-[spin_2s_linear_infinite] text-blue-600 dark:text-blue-400" />
                    <h2 className='font-black text-xl text-neutral-900 dark:text-white mb-2'>Preparing Questions...</h2>
                    <p className='text-sm text-neutral-500 dark:text-neutral-400'>
                        Our AI is compiling the top interview questions specifically for {topic}. Please hold on!
                    </p>
                </div>
            </div>
        )
    }

    if (!interviewData || !interviewData.questions) {
        return <div className='flex items-center justify-center h-screen'>Failed to load questions.</div>
    }

    return (
        <div className='min-h-screen bg-slate-50 dark:bg-black flex flex-col'>
            {/* Header */}
            <div className='p-4 md:px-10 border-b-2 border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#111] flex items-center gap-4 sticky top-0 z-10'>
                <Link href={`/course/${courseId}`}>
                    <Button variant="ghost" size="icon" className="border-2 border-transparent hover:border-neutral-200 dark:hover:border-neutral-700">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                </Link>
                <div>
                    <h2 className='font-black text-xl text-neutral-900 dark:text-white leading-tight mt-1 truncate max-w-[200px] md:max-w-md'>{topic} Interview Prep</h2>
                    <p className='text-xs font-bold text-blue-600 dark:text-blue-400'>Top {interviewData.questions.length} Questions</p>
                </div>
            </div>

            {/* Main Content */}
            <div className='max-w-4xl mx-auto w-full p-4 md:p-8 space-y-8'>
                <div className='text-center py-6'>
                    <Sparkles className="w-10 h-10 mx-auto text-blue-600 dark:text-blue-400 mb-4" />
                    <h1 className='text-3xl md:text-4xl font-black text-neutral-900 dark:text-white mb-4'>Test Your Knowledge</h1>
                    <p className='text-neutral-500 dark:text-neutral-400 max-w-lg mx-auto font-medium'>
                        Read each question, form your answer mentally or say it out loud, and then click the card to reveal the expert's answer.
                    </p>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    {interviewData.questions.map((q, idx) => {
                        const isFlipped = flippedCards[idx];
                        const gradient = colorGradients[idx % colorGradients.length];

                        return (
                            <div 
                                key={idx} 
                                onClick={() => toggleCard(idx)}
                                className="group relative h-80 w-full cursor-pointer"
                                style={{ perspective: '1000px' }}
                            >
                                <div 
                                    className="relative w-full h-full transition-transform duration-700 ease-in-out"
                                    style={{ 
                                        transformStyle: 'preserve-3d',
                                        transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                                    }}
                                >
                                    {/* Front of Card (Question) */}
                                    <div 
                                        className="absolute w-full h-full bg-white dark:bg-[#111] border-2 border-neutral-900 dark:border-neutral-300 rounded-2xl p-8 flex flex-col justify-center text-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] group-hover:-translate-y-1 group-hover:-translate-x-1 group-hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300"
                                        style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                                    >
                                        <div className='absolute top-4 left-4 w-10 h-10 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center font-black text-lg border-2 border-neutral-900 dark:border-neutral-500'>
                                            {idx + 1}
                                        </div>
                                        <h3 className="text-xl md:text-2xl font-black text-neutral-900 dark:text-white mt-4">{q.question}</h3>
                                        <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center text-xs font-bold text-neutral-400 uppercase tracking-widest gap-2">
                                            <Lightbulb className="w-4 h-4" />
                                            <span>Click to reveal answer</span>
                                        </div>
                                    </div>

                                    {/* Back of Card (Answer) */}
                                    <div 
                                        className={`absolute w-full h-full bg-gradient-to-br ${gradient} text-white border-2 border-neutral-900 dark:border-neutral-300 rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center text-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]`}
                                        style={{ 
                                            backfaceVisibility: 'hidden', 
                                            WebkitBackfaceVisibility: 'hidden',
                                            transform: 'rotateY(180deg)'
                                        }}
                                    >
                                        <h4 className="text-[11px] font-black text-white/70 mb-3 uppercase tracking-widest border-b border-white/20 pb-2 w-full">Expert Answer</h4>
                                        <p className="text-sm md:text-base leading-relaxed overflow-y-auto max-h-[200px] pr-2 custom-scrollbar font-medium">
                                            {q.answer}
                                        </p>
                                    </div>
                                    
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            
            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: rgba(255, 255, 255, 0.4);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background-color: rgba(255, 255, 255, 0.6);
                }
            `}</style>
        </div>
    )
}

export default InterviewPage
