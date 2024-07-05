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
  TooltipItem,
} from 'chart.js';

interface Track {
  name: string;
  popularity: number;
  [key: string]: any;
}

interface Artist {
  name: string;
}

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface BarChartProps {
  data: Track[];
}

const HorBarChart: React.FC<BarChartProps> = ({ data }) => {
  const artistCount = data.reduce((acc: Record<string, number>, track) => {
    track.artists.forEach((artist: Artist) => {
      if (acc[artist.name]) {
        acc[artist.name]++;
      } else {
        acc[artist.name] = 1;
      }
    });
    return acc;
  }, {});

  // Sort the artist count and take the top 25 artists
  const sortedArtistCount = Object.entries(artistCount).sort((a, b) => b[1] - a[1]);
  const top25Artists = sortedArtistCount.slice(0, 25);

  const chartData: ChartData<'bar'> = {
    labels: top25Artists.map(([artist]) => artist),
    datasets: [
      {
        label: 'Number of Tracks',
        data: top25Artists.map(([, count]) => count),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
        barThickness: 20, // Increase this value to make the bars thicker
      },
    ],
  };

  const options = {
    indexAxis: 'y' as const, // This makes the bar chart horizontal
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        ticks: {
          autoSkip: false,
          maxRotation: 0,
          minRotation: 0,
        },
        padding: 10,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context: TooltipItem<'bar'>) {
            return `${context.label}: ${context.raw}`;
          },
        },
      },
    },
  };

  return (
    // <div className="w-full max-w-lg mx-auto">
      <Bar data={chartData} options={options} />
    // </div>
  );
};

export default HorBarChart;
