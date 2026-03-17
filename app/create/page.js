'use client';
import React, { useState } from 'react';
import SelectOption from './_components/SelectOption';
import { Button } from '@/components/ui/button';
import TopicInput from './_components/TopicInput';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { useUser } from '@clerk/nextjs'; // ✅ Add this

function Create() {
  const { user } = useUser(); // ✅ Hook to get current user
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState([]);

  const handleUserInput = (fieldName, fieldValue) => {
    setFormData({ ...formData, [fieldName]: fieldValue });
    console.log(formData);
  };

  const GenerateCourseOutline = async () => {
    const courseID = uuidv4();
    const result = await axios.post('/api/generate-course-outline', {
      courseID: courseID,
      ...formData,
      createdBy: user?.primaryEmailAddress?.emailAddress, // ✅ Now works
    });
    console.log(result);
  };

  return (
    <div className='flex flex-col items-center p-5 md:px-24 lg:px-36 mt-20'>
      <h2 className='font-bold text-4xl'>Start Building Your Personalized Study Plan</h2>
      <p className='text-gray-500 text-lg mt-2'>
        Choose the subject you want to study and the level of difficulty you want to achieve.
      </p>

      <div className='mt-10'>
        {step === 0 ? (
          <SelectOption selectedStudyType={(value) => handleUserInput('studyType', value)} />
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
