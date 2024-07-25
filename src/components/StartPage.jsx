
import React, { useState } from 'react';

const StartPage = ({ onStart }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onStart(name, email);
  };

  return (
    <div className="start-page">
      <h1>Welcome to the Quiz</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Enter your name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
        <input 
          type="email" 
          placeholder="Enter your email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <button type="submit">Start Quiz</button>
      </form>
    </div>
  );
};

export default StartPage;






