'use client';
import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface Question {
  Question: string;
  Options: string[];
  answer: string;
}

function DashboardContent() {
  const [ques, setQues] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [isLoading, setIsLoading] = useState(true); 
  const router = useRouter();
  const searchParams = useSearchParams();
  const topic = searchParams.get('topic');

  const handleSelect = (option: string) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[currentQuestion] = option;
    setSelectedOptions(newSelectedOptions);
  };

  const handleSubmit = () => {
    if (selectedOptions[currentQuestion] === ques[currentQuestion].answer) {
      setCorrect(correct + 1);
    }
    setSubmitted(true);
  };

  const handleNext = () => {
    if (currentQuestion < ques.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSubmitted(false);
    } else {
      router.push(`/result?correct=${correct}&total=${ques.length}`);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSubmitted(false);
    }
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        if (!topic) {
          throw new Error('Topic is not specified');
        }
        const response = await fetch('http://localhost:3001/api/post/question', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ topic }),
        });
        const data = await response.json();
        console.log(data);
        setQues(data);
        setSelectedOptions(Array(data.length).fill(null));
        setIsLoading(false); 
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };
    fetchQuestions();
  }, [topic]);

  if (isLoading) {
    return <div>Loading...</div>; // Display loading message
  }

  return (
    <div className="flex justify-center items-center min-h-screen rounded-sm">
      <div className="border bg-black text-white p-8 rounded-sm w-[600px]">
        <div>
          <p>{ques[currentQuestion]?.Question}</p>
        </div>
        <div>
          <ul>
            {ques[currentQuestion]?.Options.map((option, index) => {
              const isSelected = selectedOptions[currentQuestion] === option;
              const isCorrect = option === ques[currentQuestion]?.answer;
              return (
                <li
                  key={index}
                  onClick={() => handleSelect(option)}
                  className={`cursor-pointer p-2 ${
                    submitted
                      ? isSelected && isCorrect
                        ? 'bg-green-500'
                        : isSelected && !isCorrect
                        ? 'bg-red-500'
                        : ''
                      : isSelected
                      ? 'bg-blue-500'
                      : ''
                  }`}
                >
                  {option}
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          {submitted && (
            <div className="mt-4">
              <p>Correct Answer: {ques[currentQuestion]?.answer}</p>
            </div>
          )}
        </div>
        <div className="flex justify-between mt-4">
          <button
            onClick={handleBack}
            className={`bg-white text-black p-2 rounded-lg ${
              currentQuestion === 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={currentQuestion === 0}
          >
            Back
          </button>
          {!submitted ? (
            <button
              onClick={handleSubmit}
              className="bg-white text-black p-2 rounded-lg"
              disabled={selectedOptions[currentQuestion] === null}
            >
              Submit
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="bg-white text-black p-2 rounded-lg"
            >
              {currentQuestion >= ques.length - 1 ? 'Finish' : 'Next'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function DashboardPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardContent />
    </Suspense>
  );
}

export default DashboardPage;
