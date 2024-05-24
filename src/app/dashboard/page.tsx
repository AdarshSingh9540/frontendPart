'use client'

import React, { useState } from 'react'

const questions = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
  },
  {
    question: "Who wrote 'Hamlet'?",
    options: ["William Shakespeare", "Charles Dickens", "Mark Twain", "Ernest Hemingway"],
  },
  {
    question: "What is the chemical symbol for water?",
    options: ["H2O", "O2", "CO2", "H2O2"],
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Leonardo da Vinci", "Vincent van Gogh", "Pablo Picasso", "Claude Monet"],
  }
];

function Page() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState(Array(questions.length).fill(null));

  const handleSelect = (option:string) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[currentQuestion] = option;
    setSelectedOptions(newSelectedOptions);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
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
            {questions[currentQuestion].options.map((option, index) => (
              <li
                key={index}
                onClick={() => handleSelect(option)}
                className={`cursor-pointer p-2 ${selectedOptions[currentQuestion] === option ? 'bg-blue-500' : ''}`}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
        <div className='flex justify-end'>
          <button
            onClick={handleNext}
            className='bg-white text-black p-2 mt-4 rounded-lg'
            disabled={currentQuestion >= questions.length - 1}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default Page
