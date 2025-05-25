import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import team from '../assets/developer-team.svg';
import code from '../assets/coding.svg';
import brain from '../assets/brain.svg';
import Navbar1 from '../Components/Navbar';
import * as DOTS from 'vanta/dist/vanta.dots.min';

const Home = () => {
  const vantaRef = useRef(null);
  useEffect(() => {
    const effect = DOTS.default({
      el: vantaRef.current,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      showLines: false
    });

    return () => {
      if (effect) effect.destroy();
    };
  }, []);

  return (
    <div className="container" id="vanta" ref={vantaRef}>
      <Navbar1 />
      <div className="mainContent" >
        <div className="leftContent">
          <h1 className="heading">
            Elevate Your<br />
            Coding Skills<br />
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
        <Link to="/code" className="button">Start Coding</Link>
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
