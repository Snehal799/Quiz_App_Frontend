
import React, { useState } from 'react';
import StartPage from './components/StartPage';
import Quiz from './components/Quiz';
import './App.css';


const App = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [isQuizStarted, setIsQuizStarted] = useState(false);

  const handleStart = (name, email) => {
    setUserName(name);
    setEmail(email);
    setIsQuizStarted(true);
  };

  return (
    <div className="App">
      {isQuizStarted ? <Quiz userName={userName} email={email} /> : <StartPage onStart={handleStart} />}
    </div>
  );
};

export default App;

