
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Result from './Result';
import '../App.css';

const Quiz = ({ userName, email }) => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [unattempted, setUnattempted] = useState(0);
  const [error, setError] = useState(null); 


  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('https://quiz-app-backend-iayc.onrender.com/api/questions');
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions: ", error);
        setError("Failed to load questions.");
      }
    };

    fetchQuestions();
  }, []);

  const handleOptionChange = (option) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentIndex]: option,
    }));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, questions.length - 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleClearResponse = () => {
    setUserAnswers((prevAnswers) => {
      const newAnswers = { ...prevAnswers };
      delete newAnswers[currentIndex];
      return newAnswers;
    });
  };

  const handleSubmit = async () => {
    let correctCount = 0;
    let incorrectCount = 0;
    let unattemptedCount = questions.length;

    questions.forEach((question, index) => {
      if (userAnswers[index] !== undefined) {
        unattemptedCount--;
        if (userAnswers[index] === question.correctAnswer) {
          correctCount++;
        } else {
          incorrectCount++;
        }
      }
    });

    setCorrect(correctCount);
    setIncorrect(incorrectCount);
    setUnattempted(unattemptedCount);

    const resultData = {
      userName: userName,
      email: email,
      correct: correctCount,
      incorrect: incorrectCount,
      unattempted: unattemptedCount,
    };

    console.log("Data being sent to the backend:", resultData);

    try {
      await axios.post('https://quiz-app-backend-iayc.onrender.com/api/results', resultData); // Use your live backend URL
      setShowResults(true);
    } catch (error) {
      console.error("Error submitting results: ", error);
      setError("Failed to submit results.");
    }
  };

  if (showResults) {
    return <Result userAnswers={userAnswers} questions={questions} userName={userName} correct={correct} incorrect={incorrect} unattempted={unattempted} />;
  }

  if (questions.length === 0) {
    return <div>Loading questions...</div>;
  }

  return (
    <div className="quiz">
      {error && <div className="error-message">{error}</div>}
      <div className="question-section">
        <div className="question-number">Question {currentIndex + 1} of {questions.length}</div>
        <div className="question-text">{questions[currentIndex].question}</div>
      </div>
      <div className="options-section">
        {questions[currentIndex].options.map((option, idx) => (
          <label key={idx} className="option-label">
            <input
              type="radio"
              name="options"
              value={option}
              checked={userAnswers[currentIndex] === option}
              onChange={() => handleOptionChange(option)}
              className="option-input"
            />
            {option}
          </label>
        ))}
      </div>
      <div className="button-section">
        <button onClick={handlePrev} disabled={currentIndex === 0}>Previous</button>
        <button id='next' onClick={handleNext} disabled={currentIndex === questions.length - 1}>Next</button>
        <button id='clear' onClick={handleClearResponse}>Clear Response</button>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default Quiz;
