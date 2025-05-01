import { useState } from 'react';
import GoalsIcon from '../../assets/goals.svg'; 
import './Goals.css';

const Goals = () => {
  const [goals, setGoals] = useState([
    { label: 'Solve one DSA problem', checked: false },
    { label: 'Solve the challenge of the day', checked: false }
  ]);

  const handleToggle = (index) => {
    setGoals(currentGoals => 
      currentGoals.map((goal, i) => 
        i === index ? { ...goal, checked: !goal.checked } : goal
      )
    );
  };

  return (
    <div className="goals-container">
      <div className="goals-header">
        <img src={GoalsIcon} alt="" />
        <h2 className="goals-title"> Goals</h2>
      </div>
      <div className="goals-card">
        {goals.map((goal, index) => (
          <div key={index} className="goal-item">
            <input
              type="checkbox"
              id={`goal-${index}`}
              checked={goal.checked}
              onChange={() => handleToggle(index)}
              className="goal-checkbox"
            />
            <label htmlFor={`goal-${index}`} className="goal-label">
              {goal.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Goals;