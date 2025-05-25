import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Aptitude1 from './pages/Aptitude.jsx';
import LeaderBoard from './pages/LeaderBoard.jsx';
import Challenge from './pages/Challenge.jsx';
import Code from './pages/Code.jsx';

const App = () => {
    const questionsData = [
        {
          question: "If all Zings are Bings, and some Bings are Lings, which of the following must be true?",
          options: ["All Zings are Lings", "Some Zings might be Lings", "No Zings are Lings", "All Lings are Bings"],
          correctAnswer: "No Zings are Lings"
        },
        {
          question: "What is the next number in the sequence: 2, 6, 12, 20, 30, __?",
          options: ["40", "42", "45", "56"],
          correctAnswer: "42"
        },
        {
          question: "If a train travels 60 km in 1.5 hours, what is its speed?",
          options: ["30 km/h", "40 km/h", "50 km/h", "60 km/h"],
          correctAnswer: "40 km/h"
        }
      ];
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/aptitude" element={<Aptitude1 questions={questionsData}/>} />
      <Route path="/leaderboard" element={<LeaderBoard />} />
      <Route path="/challenges" element={<Challenge />} />
      <Route path="/code" element={<Code />} />
    </Routes>
  );
};

export default App;
