'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const [topic, setTopic] = useState('');
  const router = useRouter();

  const sendData = async () => {
    try {
      // Validate topic input
      if (topic.trim() === '') {
        alert('Please enter a topic');
        return;
      }

      // Navigate to the dashboard with the topic as a query parameter
      router.push(`/dashboard?topic=${encodeURIComponent(topic)}`);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send topic');
    }
  };

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <div>
      <h1 className='font-bold text-3xl shadow-lg'>Send Topic to Backend</h1>
      </div>
      <div className='mt-8 '>
      <input
      className='shadow-lg m-4 p-3'
        type="text"
        placeholder="Enter topic"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />
      <button className='bg-blue-500 font-semibold text-white p-2 rounded-md' onClick={sendData}>Send Topic</button>
    </div>
    </div>
  );
}
