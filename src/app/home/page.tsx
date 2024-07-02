'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const [topic, setTopic] = useState('');
  const router = useRouter();

  const sendData = async () => {
    try {
      if (topic.trim() === '') {
        alert('Please enter a topic');
        return;
      }
      router.push(`/dashboard?topic=${encodeURIComponent(topic)}`);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send topic');
    }
  };

  return (
    <div className='flex flex-col items-center justify-center h-screen   overflow-hidden'>
      <div>
        <h1 className='font-bold text-2xl lg:text-3xl  shadow-lg'>Enter Your Topic</h1>
      </div>
      <div className=' w-full max-w-md p-6  lg:p-4 '>
        <input
          className='shadow-lg p-3 rounded-lg text-black w-full'
          type="text"
          placeholder="Enter topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <button className='bg-blue-800 hover:bg-blue-500 font-semibold text-white p-2 rounded-lg w-full text-lg mt-4' onClick={sendData}>Send Topic</button>
      </div>
    </div>
  );
}
