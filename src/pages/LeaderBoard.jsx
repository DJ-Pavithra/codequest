import { Stack } from '@mantine/core';
import Leader from '../Components/LeaderBoard/Leader';
import PerformanceChart from '../Components/LeaderBoard/PerformanceChart';
import Goals from '../Components/LeaderBoard/Goals';
import Streak from '../Components/LeaderBoard/Streak';
import Navbar from '../Components/Navbar';
import './LeaderBoard.css';
const DashboardPage = () => {
  return (
    <div className='container'>
    <Stack spacing="lg">
    <Navbar />
      <Leader />
      <PerformanceChart />
      <Goals />
      <Streak /> 
    </Stack>
    </div>
  );
};

export default DashboardPage;
