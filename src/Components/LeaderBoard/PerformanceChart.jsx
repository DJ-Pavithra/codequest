import React from 'react';
import { Card, Text } from '@mantine/core';
import { BarChart } from '@mantine/charts';
import '@mantine/charts/styles.css';

const chartData = [
  { month: 'January', value: 800 },
  { month: 'February', value: 1100 },
  { month: 'March', value: 950 },
  { month: 'April', value: 200 },
  { month: 'May', value: 1300 },
  { month: 'June', value: 500 },
];

const PerformanceChart = () => {
  return (
    <Card withBorder p="md" radius="md">
      <Text size="lg" mb="md">Performance</Text>
      <BarChart
        h={300}
        data={chartData}
        dataKey="month"
        series={[{ name: 'value', color: 'teal.6' }]}
        tickLine="y"
        yAxisProps={{ domain: [0, 1400] }}
        barChartProps={{ barProps: { radius: 4 } }}
      />
    </Card>
  );
};

export default PerformanceChart;
