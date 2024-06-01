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
    <div>
      <h1>Send Topic to Backend</h1>
      <input
        type="text"
        placeholder="Enter topic"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />
      <button onClick={sendData}>Send Topic</button>
    </div>
  );
}
