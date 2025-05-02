import React from 'react';
import './ChallengeCard.css';

const ChallengeCard = ({ type, title, subtitle, description, difficulty, xp, color }) => {
  return (
    <div className={`challenge-card ${color}`}>
      <div className="challenge-type">{type}</div>
      <h3 className="challenge-title">{title}</h3>
      <p className="challenge-subtitle">{subtitle}</p>
      <p className="challenge-description">{description}</p>
      <div className="challenge-footer">
        <span className="difficulty">{difficulty}</span>
        <span className="xp">🎁 +{xp} XP</span>
      </div>
      <button className="accept-btn">Accept Challenge</button>
    </div>
  );
};

export default ChallengeCard;