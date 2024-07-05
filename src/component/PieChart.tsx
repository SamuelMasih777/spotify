import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js';

interface Track {
    name: string;
    popularity: number;
    [key: string]: any;
}
interface Artist {
    name: string;
  }
ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  data: Track[];
}

const PieChart: React.FC<PieChartProps> = ({ data }) => {
  const artistCount = data.reduce((acc: Record<string, number>, track) => {
    track.artists.forEach((artist:Artist) => {
      if (acc[artist.name]) {
        acc[artist.name]++;
      } else {
        acc[artist.name] = 1;
      }
    });
    return acc;
  }, {});

  const chartData: ChartData<'pie'> = {
    labels: Object.keys(artistCount),
    datasets: [
      {
        data: Object.values(artistCount),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
      },
    ],
  };

  return (
    <div className="">
      <Pie data={chartData} />
     </div> 
  );
};

export default PieChart;
