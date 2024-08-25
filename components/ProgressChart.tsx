import React from 'react';
import { useStore } from '../utils/store';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const ProgressChart = () => {
  const { userProgress } = useStore();

  const data = {
    labels: userProgress.map(progress => progress.date),
    datasets: [
      {
        label: 'Progress',
        data: userProgress.map(progress => progress.value),
        backgroundColor: 'rgba(29, 78, 216, 0.6)',
        borderColor: 'rgba(29, 78, 216, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Your Progress Over Time',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  if (!userProgress.length) {
    return <div>No progress data available.</div>;
  }

  return (
    <div className="chart-container">
      <Bar data={data} options={options} />
    </div>
  );
};

export default ProgressChart;