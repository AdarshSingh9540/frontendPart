// page.tsx
'use client'
import { useState } from 'react';

export default function Page() {
  const [topic, setTopic] = useState('');

  const sendData = async () => {
    try {
      // Send data to backend
      const response = await fetch('http://localhost:3001/api/post/question', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ topic })
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Response from server:', data);
        alert('Topic sent successfully');
        setTopic(''); // Clear input field
        window.location.href = 'http://localhost:3000/dashboard';
      } else {
        throw new Error('Failed to send topic');
      }
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
