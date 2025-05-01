/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import team from '../assets/developer-team.svg';
import code from '../assets/coding.svg';
import brain from '../assets/brain.svg';
import Navbar1 from '../Components/Navbar';
const Home = () => {
  console.log(typeof Navbar1);
  return (
    <div className="container">
      <Navbar1 />
      
      <div className="mainContent">
        <div className="leftContent">
          <h1 className="heading">
            Elevate<br />
            Your<br />
            Coding<br />
            Skills
          </h1>
          <p className="description">
            The ultimate platform for code submission, evaluation, and aptitude assessment.
            Challenge yourself and track your progress.
          </p>
          
        </div>

        <div className="rightContent">
          <div className="illustration">
            <img src={team} alt="" className="illustrationImage" />
          </div>
        </div>
      </div>
         <div className="buttons">
            <Link to="/challenges" className="button">Start Coding</Link>
            <Link to="/aptitude" className="button">Take Aptitude Test</Link>
          </div>
      <div className="featureCardsContainer">
        <div className="featureCard">
          <div className="featureHeader">
            <div className="iconContainer">
              <img src={code} alt="" />
            </div>
            <h3 className="featureTitle">Code Evaluation</h3>
          </div>
          <p className="featureDescription">
            Submit your code for evaluation in multiple programming languages. Get instant feedback and improve your coding skills.
          </p>
        </div>

        <div className="featureCard">
          <div className="featureHeader">
            <div className="iconContainer">
              <img src={brain} alt="" />
            </div>
            <h3 className="featureTitle">Aptitude Testing</h3>
          </div>
          <p className="featureDescription">
            Take timed aptitude tests covering math, logical reasoning, and verbal skills. Enhance your problem-solving abilities.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;