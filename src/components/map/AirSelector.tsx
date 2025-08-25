import { Selector } from '@/components/ui/Selector';

interface AirSelectorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
}

const airQualityOptions = [
  { value: 'no2', label: 'Nitrogen Dioxide (NO₂)' },
  { value: 'pm25', label: 'Particulate Matter (PM2.5)' },
  { value: 'pm10', label: 'Particulate Matter (PM10)' },
  { value: 'o3', label: 'Ozone (O₃)' },
  { value: 'so2', label: 'Sulfur Dioxide (SO₂)' },
  { value: 'co', label: 'Carbon Monoxide (CO)' },
];

export function AirSelector({ value, onChange, className, disabled }: AirSelectorProps) {
  return (
    <Selector
      options={airQualityOptions}
      value={value}
      onChange={onChange}
      label="Air Quality Indicator"
      placeholder="Select air quality metric..."
      className={className}
      disabled={disabled}
    />
  );
}
