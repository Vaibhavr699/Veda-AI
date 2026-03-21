"use client"
import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams, useRouter } from 'next/navigation'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, CheckCircle, ArrowLeft, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useUser } from '@clerk/nextjs'

function QuizPage() {
    const { courseId } = useParams()
    const searchParams = useSearchParams()
    const topic = searchParams.get('topic') || 'your course'
    const router = useRouter()
    const { user } = useUser()

    const [loading, setLoading] = useState(true)
    const [quiz, setQuiz] = useState(null)
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [userAnswers, setUserAnswers] = useState({})
    const [submitting, setSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [scoreResult, setScoreResult] = useState(0)
    const [feedbackText, setFeedbackText] = useState("")

    useEffect(() => {
        if (courseId) {
            GenerateOrFetchQuiz()
        }
    }, [courseId])

    const GenerateOrFetchQuiz = async () => {
        setLoading(true)
        try {
            const result = await axios.post('/api/generate-quiz', {
                courseId: courseId,
                topic: topic
            })
            setQuiz(result.data.quiz.content)
        } catch (err) {
            console.error('Failed to generate quiz', err)
            alert('Failed to load quiz. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const handleOptionSelect = (option) => {
        setUserAnswers({
            ...userAnswers,
            [currentQuestionIndex]: option
        })
    }

    const handleSubmit = async () => {
        setSubmitting(true)
        try {
            // Calculate score
            let score = 0
            const total = quiz?.questions?.length || 0
            
            quiz?.questions?.forEach((q, index) => {
                if (userAnswers[index] === q.correctAnswer) {
                    score += 1
                }
            })

            const payload = {
                courseId: courseId,
                examType: 'quiz',
                score: score,
                totalQuestions: total,
                userAnswers: userAnswers,
                userEmail: user?.primaryEmailAddress?.emailAddress,
                topic: topic
            }

            const res = await axios.post('/api/submit-quiz', payload)
            
            setScoreResult(score)
            setFeedbackText(res.data.result.feedback)
            setIsSubmitted(true)
            
        } catch (err) {
            console.error('Submit failed', err)
            alert('Failed to submit quiz. Please try again.')
        } finally {
            setSubmitting(false)
        }
    }

    if (loading) {
        return (
            <div className='flex flex-col items-center justify-center h-screen bg-slate-50 dark:bg-black'>
                <div className='bg-white dark:bg-neutral-900 border-2 border-neutral-900 dark:border-neutral-300 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] rounded-2xl p-10 flex flex-col items-center max-w-sm text-center'>
                    <Loader2 className="w-12 h-12 mb-4 animate-[spin_2s_linear_infinite] text-blue-600 dark:text-blue-400" />
                    <h2 className='font-black text-xl text-neutral-900 dark:text-white mb-2'>Generating Quiz...</h2>
                    <p className='text-sm text-neutral-500 dark:text-neutral-400'>
                        Our AI is carefully crafting challenging questions based on "{topic}". Please hold on!
                    </p>
                </div>
            </div>
        )
    }

    if (!quiz || !quiz.questions) {
        return <div className='flex items-center justify-center h-screen'>Failed to load quiz.</div>
    }

    if (isSubmitted) {
        return (
            <div className='min-h-screen bg-slate-50 dark:bg-black p-4 md:p-8'>
                <div className='max-w-4xl mx-auto'>
                    <div className='bg-white dark:bg-[#111] border-2 border-neutral-900 dark:border-neutral-300 rounded-2xl p-8 mb-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] text-center'>
                        <h1 className='text-3xl font-black mb-4'>Quiz Results</h1>
                        <p className='text-xl font-bold bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 inline-block px-6 py-2 rounded-full border-2 border-blue-300 dark:border-blue-700 mb-6'>
                            You scored {scoreResult} out of {quiz.questions.length}
                        </p>
                        <p className='text-neutral-600 dark:text-neutral-400 font-medium max-w-2xl mx-auto mb-8'>
                            {feedbackText}
                        </p>
                        <Link href='/dashboard'>
                            <Button className="h-12 px-8 rounded-xl font-bold bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 border-2 border-neutral-900 dark:border-neutral-300 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 transition-all mr-4">
                                Back to Dashboard
                            </Button>
                        </Link>
                        <Link href='/dashboard/results'>
                            <Button variant="outline" className="h-12 px-8 rounded-xl font-bold border-2 border-neutral-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 transition-all">
                                View All Results
                            </Button>
                        </Link>
                    </div>

                    <div className='space-y-6'>
                        {quiz.questions.map((q, idx) => {
                            const userAnswer = userAnswers[idx];
                            const isCorrect = userAnswer === q.correctAnswer;
                            
                            return (
                                <div key={idx} className={`p-6 rounded-2xl border-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${isCorrect ? 'bg-green-50 border-green-700 dark:bg-green-900/20' : 'bg-red-50 border-red-700 dark:bg-red-900/20'} dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]`}>
                                    <h3 className='font-bold text-lg mb-4'>{idx + 1}. {q.question}</h3>
                                    
                                    <div className='grid grid-cols-1 md:grid-cols-2 gap-3 mb-4'>
                                        {q.options.map((opt, oIdx) => {
                                            const isSelectedOpt = opt === userAnswer;
                                            const isActualCorrect = opt === q.correctAnswer;
                                            
                                            let optClass = 'border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900 opacity-60';
                                            if (isActualCorrect) optClass = 'border-green-600 bg-green-100 dark:bg-green-900/40 font-bold dark:border-green-500 text-green-900 dark:text-green-100';
                                            else if (isSelectedOpt && !isActualCorrect) optClass = 'border-red-600 bg-red-100 dark:bg-red-900/40 font-bold dark:border-red-500 text-red-900 dark:text-red-100';

                                            return (
                                                <div key={oIdx} className={`p-3 rounded-xl border-2 ${optClass} flex items-center`}>
                                                    {opt}
                                                </div>
                                            )
                                        })}
                                    </div>

                                    <div className={`mt-4 pt-4 border-t-2 ${isCorrect ? 'border-green-200 dark:border-green-800' : 'border-red-200 dark:border-red-800'}`}>
                                        <p className='text-sm font-bold mb-1 opacity-80'>Explanation:</p>
                                        <p className='text-sm leading-relaxed'>{q.explanation || 'No explanation provided.'}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }

    const currentQuestion = quiz.questions[currentQuestionIndex]

    return (
        <div className='min-h-screen bg-slate-50 dark:bg-black flex flex-col'>
            {/* Header */}
            <div className='p-4 md:px-10 border-b-2 border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#111] flex items-center justify-between sticky top-0 z-10'>
                <div className='flex items-center gap-4'>
                    <Link href={`/course/${courseId}`}>
                        <Button variant="ghost" size="icon" className="border-2 border-transparent hover:border-neutral-200 dark:hover:border-neutral-700">
                           <ArrowLeft className="h-5 w-5" />
                        </Button>
                    </Link>
                    <div>
                        <h2 className='font-black text-lg text-neutral-900 dark:text-white leading-tight mt-1 truncate max-w-[200px] md:max-w-md'>{topic} Quiz</h2>
                        <p className='text-xs font-bold text-neutral-500'>Question {currentQuestionIndex + 1} of {quiz.questions.length}</p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className='flex-1 flex flex-col md:flex-row max-w-5xl mx-auto w-full p-4 md:p-8 gap-8'>
                
                {/* Question Section */}
                <div className='flex-1'>
                    <div className='bg-white dark:bg-[#111] rounded-2xl p-6 md:p-10 border-2 border-neutral-900 dark:border-neutral-300 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] relative'>
                        <span className='absolute -top-4 -left-4 w-12 h-12 bg-blue-600 dark:bg-blue-500 text-white rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center font-black text-xl border-2 border-neutral-900'>
                            {currentQuestionIndex + 1}
                        </span>
                        
                        <h2 className='text-xl md:text-2xl font-black text-neutral-900 dark:text-white mb-8 mt-4 leading-relaxed'>
                            {currentQuestion.question}
                        </h2>

                        <div className='flex flex-col gap-4'>
                            {currentQuestion.options.map((option, idx) => {
                                const isSelected = userAnswers[currentQuestionIndex] === option
                                return (
                                    <div 
                                        key={idx} 
                                        onClick={() => handleOptionSelect(option)}
                                        className={`flex items-center p-4 rounded-xl cursor-pointer border-2 transition-all 
                                            ${isSelected 
                                                ? 'border-neutral-900 dark:border-white bg-blue-50 dark:bg-blue-900/30 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transform -translate-x-1 -translate-y-1' 
                                                : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-900/50'
                                            }`}
                                    >
                                        <div className={`w-6 h-6 rounded-full border-2 flex-shrink-0 mr-4 flex items-center justify-center
                                            ${isSelected ? 'border-neutral-900 dark:border-white bg-blue-600' : 'border-neutral-300 dark:border-neutral-600'}`}>
                                            {isSelected && <div className="w-2.5 h-2.5 bg-white rounded-full"></div>}
                                        </div>
                                        <span className={`font-bold text-[15px] ${isSelected ? 'text-neutral-900 dark:text-white' : 'text-neutral-700 dark:text-neutral-300'}`}>
                                            {option}
                                        </span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Navigation Controls */}
                    <div className='flex justify-between items-center mt-8'>
                        <Button 
                            variant="outline" 
                            onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                            disabled={currentQuestionIndex === 0}
                            className="h-12 px-6 rounded-xl font-bold border-2 border-neutral-900 dark:border-neutral-300 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:shadow-[4px_4px_0px_0px] transition-all"
                        >
                            <ChevronLeft className="w-5 h-5 mr-2" />
                            Previous
                        </Button>

                        {currentQuestionIndex < quiz.questions.length - 1 ? (
                            <Button 
                                onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                                disabled={!userAnswers[currentQuestionIndex]}
                                className="h-12 px-8 rounded-xl font-bold bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 border-2 border-neutral-900 dark:border-neutral-300 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:shadow-[4px_4px_0px_0px] hover:-translate-y-1 hover:-translate-x-1 transition-all"
                            >
                                Next
                                <ChevronRight className="w-5 h-5 ml-2" />
                            </Button>
                        ) : (
                            <Button 
                                onClick={handleSubmit}
                                disabled={!userAnswers[currentQuestionIndex] || submitting}
                                className="h-12 px-8 rounded-xl font-black bg-green-600 hover:bg-green-700 text-white border-2 border-neutral-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px] hover:-translate-y-1 hover:-translate-x-1 transition-all"
                            >
                                {submitting ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <CheckCircle className="w-5 h-5 mr-2" />}
                                Submit Quiz
                            </Button>
                        )}
                    </div>
                </div>

                {/* Sidebar - Progress Tracking */}
                <div className='w-full md:w-64 mt-8 md:mt-0'>
                    <div className='bg-white dark:bg-[#111] rounded-2xl p-6 border-2 border-neutral-200 dark:border-neutral-800 sticky top-24'>
                        <h3 className='font-black text-neutral-900 dark:text-white mb-4'>Quiz Progress</h3>
                        <div className='grid grid-cols-5 gap-2'>
                            {quiz.questions.map((_, idx) => {
                                const isCurrent = idx === currentQuestionIndex
                                const isAnswered = !!userAnswers[idx]
                                
                                return (
                                    <div 
                                        key={idx}
                                        onClick={() => setCurrentQuestionIndex(idx)}
                                        className={`w-10 h-10 rounded-lg border-2 flex items-center justify-center font-bold text-xs cursor-pointer transition-all
                                            ${isCurrent ? 'border-neutral-900 dark:border-white ring-2 ring-neutral-900 dark:ring-white ring-offset-2 dark:ring-offset-[#111]' : ''}
                                            ${isAnswered 
                                                ? 'bg-blue-100 text-blue-700 border-blue-300 dark:bg-blue-900/40 dark:text-blue-300 dark:border-blue-800' 
                                                : 'bg-neutral-50 text-neutral-400 border-neutral-200 dark:bg-neutral-900 dark:text-neutral-500 dark:border-neutral-800'
                                            }
                                        `}
                                    >
                                        {idx + 1}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuizPage
