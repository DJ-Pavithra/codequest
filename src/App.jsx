import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Aptitude1 from './pages/Aptitude.jsx';
import LeaderBoard from './pages/LeaderBoard.jsx';
import Challenge from './pages/Challenge.jsx';
import Code from './pages/Code.jsx';
import Login from './pages/Login.jsx';
import Aptitudeadmin from './pages/Aptitudeadmin.jsx';
import ProtectedRoute from './Components/ProtectedRoute';
import SignUpPage from './pages/SignUp.jsx';

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
      <Route path="/login" element={<Login />} />
      <Route path="/aptitude" element={
        <ProtectedRoute>
          <Aptitude1 questions={questionsData}/>
        </ProtectedRoute>
      } />
      <Route path="/leaderboard" element={
        <ProtectedRoute>
          <LeaderBoard />
        </ProtectedRoute>
      } />
      <Route path="/challenges" element={
        <ProtectedRoute>
          <Challenge />
        </ProtectedRoute>
      } />
      <Route path="/code" element={
        <ProtectedRoute>
          <Code />
        </ProtectedRoute>
      } />
      <Route path="/admin" element={
        <ProtectedRoute>
          <Aptitudeadmin />
        </ProtectedRoute>
      } />
      <Route path="/signup" element={<SignUpPage />} />
    </Routes>
  );
};

export default App;
