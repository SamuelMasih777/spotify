import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js';

interface Track {
  name: string;
  popularity: number;
  [key: string]: any;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
  data: Track[];
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const chartData: ChartData<'bar'> = {
    labels: data.map((item) => {
      const words = item.name.split(' ');
      return words.length > 2 ? `${words[0]} ${words[1]}` : item.name;
    }),
    datasets: [
      {
        label: 'Popularity',
        data: data.map((item) => item.popularity),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const options = {
    scales: {
      x: {
        ticks: {
          autoSkip: false,
          maxRotation: 90,
          minRotation: 0,
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default BarChart;
