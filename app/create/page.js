'use client';
import React, { useState } from 'react';
import SelectOption from './_components/SelectOption';
import { Button } from '@/components/ui/button';
import TopicInput from './_components/TopicInput';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Progress } from "@/components/ui/progress";
import { Loader2 } from 'lucide-react';

function Create() {
  const { user } = useUser();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleUserInput = (fieldName, fieldValue) => {
    setFormData({ ...formData, [fieldName]: fieldValue });
    console.log(formData);
  };

  const GenerateCourseOutline = async () => {
    setLoading(true);
    setProgress(0);
    
    // Smoothly animate progress bar while waiting for AI
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev; // Hold at 90% until backend is fully secure
        return prev + Math.floor(Math.random() * 5) + 1;
      });
    }, 800);

    try {
      const courseID = uuidv4();
      const result = await axios.post('/api/generate-course-outline', {
        courseID: courseID,
        ...formData,
        createdBy: user?.primaryEmailAddress?.emailAddress,
      });
      
      clearInterval(progressInterval);
      setProgress(100);
      
      // Delay redirect just slightly so they see 100% completion
      setTimeout(() => {
        router.push('/dashboard');
      }, 500);

    } catch (err) {
      clearInterval(progressInterval);
      setLoading(false);
      console.error(err);
      alert('Failed to generate course outline. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className='flex flex-col items-center justify-center p-5 md:px-24 h-[80vh] w-full'>
        <div className='bg-white dark:bg-[#111] border-2 border-neutral-900 dark:border-neutral-300 rounded-2xl p-10 flex flex-col items-center w-full max-w-md shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] text-center'>
            <Loader2 className="w-14 h-14 mb-6 animate-[spin_2s_linear_infinite] text-blue-600 dark:text-blue-400" />
            <h2 className='font-black text-2xl text-neutral-900 dark:text-white mb-2 leading-tight'>Architecting Course...</h2>
            <p className='text-sm text-neutral-500 dark:text-neutral-400 mb-8 font-medium'>
              Our AI engine is dynamically building your personalized {formData?.courseType || 'study'} syllabus. Please do not close the window.
            </p>
            
            <div className='w-full'>
              <div className='flex justify-between items-end mb-2'>
                <span className='text-[10px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-widest'>Generation Progress</span>
                <span className='text-sm font-black text-blue-600 dark:text-blue-400'>{progress}%</span>
              </div>
              <Progress value={progress} className="h-3 border border-neutral-200 dark:border-neutral-800 [&>div]:bg-blue-600" />
            </div>
        </div>
      </div>
    )
  }

  return (
    <div className='flex flex-col items-center p-5 md:px-24 lg:px-36 mt-20'>
      <h2 className='font-bold text-4xl'>Start Building Your Personalized Study Plan</h2>
      <p className='text-gray-500 text-lg mt-2'>
        Choose the subject you want to study and the level of difficulty you want to achieve.
      </p>

      <div className='mt-10'>
        {step === 0 ? (
          <SelectOption selectedStudyType={(value) => handleUserInput('courseType', value)} />
        ) : (
          <TopicInput
            setTopic={(value) => handleUserInput('topic', value)}
            setDifficulty={(value) => handleUserInput('difficulty', value)}
          />
        )}
      </div>

      <div className='flex gap-5 justify-between w-full mt-32'>
        {step !== 0 ? (
          <Button variant='outline' onClick={() => setStep(step - 1)}>
            Previous
          </Button>
        ) : (
          '-'
        )}

        {step === 0 ? (
          <Button onClick={() => setStep(step + 1)}>Next</Button>
        ) : (
          <Button onClick={GenerateCourseOutline}>Generate</Button>
        )}
      </div>
    </div>
  );
}

export default Create;
