import React from 'react';
import { Card, Text } from '@mantine/core';
import HeatMapGrid from 'react-heatmap-grid';

const xLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const yLabels = ['9 AM', '12 PM', '3 PM'];

const data = [
  [5, 2, 3, 1, 0, 4, 6],
  [1, 4, 2, 5, 3, 2, 1],
  [2, 1, 3, 0, 1, 4, 5],
];

const HeatmapCard = () => (
  <Card shadow="sm" p="lg" radius="md" withBorder>
    <Text fw={700} mb="sm">🌡 Heatmap</Text>
    <div style={{ overflowX: 'auto' }}>
      <HeatMapGrid
        xLabels={xLabels}
        yLabels={yLabels}
        data={data}
        cellStyle={(background, value, min, max) => ({
          background: `rgba(0, 128, 0, ${value / max})`,
          fontSize: "12px",
          color: "#fff",
        })}
        cellRender={(value) => value && <div>{value}</div>}
      />
    </div>
  </Card>
);

export default HeatmapCard;
