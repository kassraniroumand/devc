import { ChartData } from '@/types/scenario-info';
import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface StackedBarChartProps {
  data: ChartData;
  title?: string;
  height?: number;
  width?: number;
  options?: any;
}

export function StackedBarChart({ data, title, height = 400, width, options = {} }: StackedBarChartProps) {
  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: !!title,
        text: title,
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        beginAtZero: true,
      },
    },
    ...options,
  };

  return (
    <div style={{ height, width }}>
      <Bar data={data} options={defaultOptions} />
    </div>
  );
}
