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

interface GroupedBarChartProps {
  data: ChartData;
  title?: string;
  height?: number;
  width?: number;
  options?: any;
  horizontal?: boolean;
}

export function GroupedBarChart({
  data,
  title,
  height = 400,
  width,
  options = {},
  horizontal = false
}: GroupedBarChartProps) {
  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: horizontal ? 'y' as const : 'x' as const,
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
        beginAtZero: true,
      },
      y: {
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

export function HorizontalGroupedBarChart(props: Omit<GroupedBarChartProps, 'horizontal'>) {
  return <GroupedBarChart {...props} horizontal={true} />;
}
