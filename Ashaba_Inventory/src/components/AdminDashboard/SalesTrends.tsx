import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface Sale {
  date: string;
  total: number;
}

const SalesTrends: React.FC = () => {
  const [salesData, setSalesData] = useState<Sale[]>([
    // Example data
    { date: '2025-01-01', total: 100000 },
    { date: '2025-01-02', total: 150000 },
    { date: '2025-01-03', total: 130000 },
  ]);

  const data = {
    labels: salesData.map(sale => sale.date),
    datasets: [
      {
        label: 'Sales Trends',
        data: salesData.map(sale => sale.total),
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Sales Trends Over Time',
      },
    },
  };

  return (
    <div>
      <h2>Sales Trends</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default SalesTrends;