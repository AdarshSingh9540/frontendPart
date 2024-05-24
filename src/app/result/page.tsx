'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function ResultPage() {
  const router = useRouter();
  const [correct, setCorrect] = useState<number | null>(null);
  const [total, setTotal] = useState<number | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const correctAnswers = parseInt(urlParams.get('correct') || '0', 10);
    const totalQuestions = parseInt(urlParams.get('total') || '0', 10);

    setCorrect(correctAnswers);
    setTotal(totalQuestions);
  }, []);

  if (correct === null || total === null) {
    return null; // Return null while loading
  }

  const score = correct * 4;

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="border bg-black text-white p-8 rounded-sm w-[600px]">
        <h1 className="text-2xl font-bold mb-4">Quiz Results</h1>
        <p className="text-lg">Correct Answers: {correct} out of {total}</p>
        <p className="text-lg">Your Score: {score} / {total*4}</p>
      </div>
    </div>
  );
}

export default ResultPage;
