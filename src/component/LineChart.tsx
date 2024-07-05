// src/components/LineChart.tsx
import React from 'react';
import { format, parseISO } from 'date-fns';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
interface Track {
    name: string;
    popularity: number;
    [key: string]: any;
}

interface LineChartProps {
  data: Track[];
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  const trackCountByMonth = data.reduce((acc: Record<string, number>, track) => {
    const month = format(parseISO(track.album.release_date), 'yyyy-MM');
    if (acc[month]) {
      acc[month]++;
    } else {
      acc[month] = 1;
    }
    return acc;
  }, {});

  const chartData: ChartData<'line'> = {
    labels: Object.keys(trackCountByMonth).sort(),
    datasets: [
      {
        label: 'Number of Tracks',
        data: Object.values(trackCountByMonth),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  return <Line data={chartData} />;
};

export default LineChart;
