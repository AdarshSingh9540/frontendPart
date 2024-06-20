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
    <div className='flex flex-col items-center justify-center h-screen mx-2 overflow-hidden mr-4'>
      <div>
        <h1 className='font-bold text-3xl mx-4 shadow-lg'>Send Topic to Backend</h1>
      </div>
      <div className='mt-8 w-full max-w-md'>
        <input
          className='shadow-lg m-4 p-3 text-black w-full'
          type="text"
          placeholder="Enter topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <button className='bg-blue-800 hover:bg-blue-500 font-semibold text-white p-2 rounded-lg m-4 w-full text-lg' onClick={sendData}>Send Topic</button>
      </div>
    </div>
  );
}
