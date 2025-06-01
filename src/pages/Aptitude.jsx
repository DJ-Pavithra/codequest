import React, { useState, useEffect } from 'react';
import './Aptitude.css';
import Navbar from '../Components/Navbar';
import { useLocation } from 'react-router-dom';

const Aptitude1 = () => {
  const location = useLocation();
  const questions = location.state?.questions || [];

  const [timeRemaining, setTimeRemaining] = useState(14 * 60 + 25);
  const [selectedAnswers, setSelectedAnswers] = useState(Array(questions.length).fill(null));
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isSubmitted) return;
    const timerId = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerId);
          setIsSubmitted(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [isSubmitted]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleOptionClick = (qIndex, option) => {
    if (!isSubmitted) {
      const updated = [...selectedAnswers];
      updated[qIndex] = option;
      setSelectedAnswers(updated);
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  if (!questions.length) {
    return <div>Loading questions...</div>;
  }

  return (
    <div className="container">
      <div className="mainContent">
        <Navbar />
        <div className='hero'>
          <div className="infoBar">
            <div className="codeBox">CODE #{questions[0]?.code || ''}</div>
            <div className="timerBox">Time remaining: {formatTime(timeRemaining)}</div>
          </div>
        </div>

        <div className="questionContainer">
          <div className="sectionHeader">
            {isSubmitted ? "#After submission:" : "#Before submission:"}
          </div>
          {questions.map((q, qIndex) => {
            // Subtract 1 to convert to 0-based index
            const correctAnswer = q.options[q.correctOptionIndex - 1];
            const selectedAnswer = selectedAnswers[qIndex];
            return (
              <div className="section" key={q.id}>
                <div className="questionTitle">
                  Question {qIndex + 1}:
                </div>
                <p>{q.question}</p>
                <div className="optionsContainer">
                  {q.options.map((option, index) => (
                    <div
                      key={index}
                      className={`option 
                        ${selectedAnswer === option ? "selectedOption" : ""} 
                        ${isSubmitted && option === correctAnswer ? "correctOption" : ""} 
                        ${isSubmitted && selectedAnswer === option && selectedAnswer !== correctAnswer ? "incorrectOption" : ""}`}
                      onClick={() => handleOptionClick(qIndex, option)}
                    >
                      <div className={`optionLetter 
                        ${selectedAnswer === option ? "selectedLetter" : ""} 
                        ${isSubmitted && option === correctAnswer ? "correctLetter" : ""} 
                        ${isSubmitted && selectedAnswer === option && selectedAnswer !== correctAnswer ? "incorrectLetter" : ""}`}>
                        {String.fromCharCode(65 + index)}
                      </div>
                      <div>{option}</div>
                    </div>
                  ))}
                </div>
                {isSubmitted && (
                  <div className="answerFeedback">
                    {selectedAnswer === correctAnswer
                      ? <span style={{ color: 'green' }}>Correct!</span>
                      : <span style={{ color: 'red' }}>Incorrect. Correct answer: {correctAnswer}</span>
                    }
                  </div>
                )}
              </div>
            );
          })}
          {!isSubmitted && (
            <button
              className="submitButton"
              onClick={handleSubmit}
              disabled={selectedAnswers.some(ans => ans === null)}
            >
              Submit All
            </button>
          )}
        </div>

        <div className="timerBottom">
          <p>Time remaining: {formatTime(timeRemaining)}</p>
        </div>
      </div>
    </div>
  );
};

export default Aptitude1;
