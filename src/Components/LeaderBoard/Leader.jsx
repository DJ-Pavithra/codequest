import { Card, Text } from '@mantine/core';
import './Leader.css'; 
import LeaderIcon from '../../assets/Leader.svg';

const Leader = () => {
  const data = [
    { rank: 1, name: 'xyz', score: '98%', time: '13.34' },
    { rank: 2, name: 'abc', score: '97%', time: '10.00' },
    { rank: 3, name: 'lms', score: '97%', time: '15.32' },
    { rank: 4, name: 'Student', score: 'Score', time: 'Time' },
    { rank: 5, name: 'Student', score: 'Score', time: 'Time' },
  ];

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-title">
        <img src={LeaderIcon} alt="" />
        <Text className="title-text">Leaderboard</Text>
      </div>
      
      <Card className="leaderboard-card">
        {/* Header row */}
        <div className="header-row">
          <Text className="header-cell">Rank</Text>
          <Text className="header-cell">Student</Text>
          <Text className="header-cell">Score</Text>
          <Text className="header-cell">Time</Text>
        </div>
        
        {/* Data rows */}
        {data.map((item, index) => (
          <div key={index} className="data-row">
            <div className="rank-cell">
              {item.rank <= 3 ? (
                <div className={`medal medal-${item.rank}`}>
                  {item.rank}
                </div>
              ) : (
                <Text className="regular-rank">{`${item.rank}th`}</Text>
              )}
            </div>
            <Text className={item.rank <= 3 ? "top-student" : "regular-student"}>
              {item.name}
            </Text>
            <Text className={item.rank <= 3 ? "top-score" : "regular-score"}>
              {item.score}
            </Text>
            <Text className={item.rank <= 3 ? "top-time" : "regular-time"}>
              {item.time}
            </Text>
          </div>
        ))}
      </Card>
    </div>
  );
};

export default Leader;