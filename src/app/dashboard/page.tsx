'use client'

import React, { useState } from 'react'

const questions = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris"
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    answer: "4"
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    answer: "Mars"
  },
  {
    question: "Who wrote 'Hamlet'?",
    options: ["William Shakespeare", "Charles Dickens", "Mark Twain", "Ernest Hemingway"],
    answer: "William Shakespeare"
  },
  {
    question: "What is the chemical symbol for water?",
    options: ["H2O", "O2", "CO2", "H2O2"],
    answer: "H2O"
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    answer: "Pacific Ocean"
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Leonardo da Vinci", "Vincent van Gogh", "Pablo Picasso", "Claude Monet"],
    answer: "Leonardo da Vinci"
  }
];

function Page() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState(Array(questions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (option: string) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[currentQuestion] = option;
    setSelectedOptions(newSelectedOptions);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSubmitted(false);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSubmitted(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="border bg-black text-white p-4 w-96">
        <div>
          <p>{questions[currentQuestion].question}</p>
        </div>
        <div>
          <ul>
            {questions[currentQuestion].options.map((option, index) => {
              const isSelected = selectedOptions[currentQuestion] === option;
              const isCorrect = questions[currentQuestion].answer === option;
              return (
                <li
                  key={index}
                  onClick={() => handleSelect(option)}
                  className={`cursor-pointer p-2 
                    ${submitted && isSelected && isCorrect ? 'bg-green-500' : ''} 
                    ${submitted && isSelected && !isCorrect ? 'bg-red-500' : ''}
                    ${!submitted && isSelected ? 'bg-blue-500' : ''}
                  `}
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
              <p>Correct Answer: {questions[currentQuestion].answer}</p>
            </div>
          )}
        </div>
        <div className='flex justify-between mt-4'>
          <button
            onClick={handleBack}
            className={`bg-white text-black p-2 rounded-lg ${currentQuestion === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={currentQuestion === 0}
          >
            Back
          </button>
          {!submitted ? (
            <button
              onClick={handleSubmit}
              className='bg-white text-black p-2 rounded-lg'
              disabled={selectedOptions[currentQuestion] === null}
            >
              Submit
            </button>
          ) : (
            <button
              onClick={handleNext}
              className={`bg-white text-black p-2 rounded-lg ${currentQuestion >= questions.length - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={currentQuestion >= questions.length - 1}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Page
