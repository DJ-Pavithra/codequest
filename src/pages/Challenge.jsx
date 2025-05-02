import React from 'react';
import Navbar1 from '../Components/Navbar';
import ChallengeCard from '../Components/Challenge/ChallengeCard';
import './Challenge.css';

const ChallengePage = () => {
  return (
    <div className="challenge-page">
      <Navbar1 />
      <h1><span className="highlight">Today’s</span> Challenge</h1>
      <p className="subtext">Sharpen your skills with fresh problems every day</p>
      <div className="card-container">
        <ChallengeCard
          type="code challenge"
          title="Find Pair with Given Sum"
          subtitle="Solve using arrays and hashing"
          description="Write an algorithm to find all pairs of integers whose sum equals the target value."
          difficulty="medium"
          xp={50}
          color="blue"
        />
        <ChallengeCard
          type="aptitude challenge"
          title="Train Speed Problem"
          subtitle="Time & Distance"
          description="Calculate the speed of a train if it covers a distance in a given time."
          difficulty="hard"
          xp={75}
          color="red"
        />
      </div>
      <button className="leaderboard-btn">View LeaderBoard</button>
    </div>
  );
};

export default ChallengePage;
