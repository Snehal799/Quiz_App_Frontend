
import React from 'react';
import '../App.css';

const Result = ({ userAnswers, questions, correct, incorrect, unattempted }) => {
  return (
    <div className="result">
      <h2>Quiz Results</h2>
      <p id='CA'>Correct Answers: {correct}</p>
      <p id='IA'>Incorrect Answers: {incorrect}</p>
      <p>Unattempted Questions: {unattempted}</p>
      <button onClick={() => window.location.reload()}>Take Quiz Again</button>
    </div>
  );
};

export default Result;

