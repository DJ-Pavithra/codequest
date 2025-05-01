import React from 'react';
import './Streak.css';

const Streak = () => {
  const weekdays = ['S', 'S', 'M', 'T', 'W', 'T', 'F'];
  
  // Assuming first 4 days have streaks, adjust as needed
  const streakData = [true, true, true, true, false, false, false];
  
  return (
    <div className="streak-container">
      <div className="streak-header">
        <div className="streak-icon">🔥</div>
        <h2 className="streak-title">Streak</h2>
      </div>
      <div className="streak-card">
        <div className="streak-days">
          {weekdays.map((day, index) => (
            <div key={index} className="streak-day-container">
              <div className={`streak-circle ${streakData[index] ? 'active' : 'inactive'}`}>
                {streakData[index] && <div className="streak-flame"></div>}
              </div>
              <div className="streak-day-label">{day}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Streak;