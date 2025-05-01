import React, { useState, useEffect } from 'react';
import './Aptitude.css';
import Navbar from '../Components/Navbar';

const Aptitude1 = ({ questions }) => {
  const [timeRemaining, setTimeRemaining] = useState(14 * 60 + 25);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState('STUDENT');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
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
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleOptionClick = (option) => {
    if (!isSubmitted) {
      setSelectedAnswer(option);
    }
  };

  const handleSubmit = () => {
    if (selectedAnswer) {
      setIsSubmitted(true);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedAnswer(null);
      setIsSubmitted(false);
    }
  };

  const { question, options, correctAnswer } = questions[currentQuestionIndex];

  return (
    <div className="container">
      <div className="mainContent">
        <Navbar />
        <div className='hero'>
          <div className="tabsContainer">
            <div className={`tab ${activeTab === 'STUDENT' ? 'activeTab' : ''}`} onClick={() => setActiveTab('STUDENT')}>STUDENT</div>
            <div className={`tab ${activeTab === 'ADMIN' ? 'activeTab' : ''}`} onClick={() => setActiveTab('ADMIN')}>ADMIN</div>
          </div>

          <div className="infoBar">
            <div className="codeBox">CODE #abcd</div>
            <div className="timerBox">Time remaining: {formatTime(timeRemaining)}</div>
          </div>
        </div>

        <div className="questionContainer">
          <div className="section">
            <div className="sectionHeader">{isSubmitted ? "#After submission:" : "#Before submission:"}</div>
            <div className="questionTitle">
              Question {currentQuestionIndex + 1}:
            </div>
            <p>{question}</p>
            
            <div className="optionsContainer">
              {options.map((option, index) => (
                <div
                  key={index}
                  className={`option 
                    ${selectedAnswer === option ? "selectedOption" : ""} 
                    ${isSubmitted && option === correctAnswer ? "correctOption" : ""} 
                    ${isSubmitted && selectedAnswer === option && selectedAnswer !== correctAnswer ? "incorrectOption" : ""}`}
                  onClick={() => handleOptionClick(option)}
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
          </div>

          {!isSubmitted ? (
            <button className="submitButton" onClick={handleSubmit} disabled={!selectedAnswer}>
              Submit Test
            </button>
          ) : (
            currentQuestionIndex < questions.length - 1 && (
              <button className="nextButton" onClick={handleNextQuestion}>
                Next Question
              </button>
            )
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
