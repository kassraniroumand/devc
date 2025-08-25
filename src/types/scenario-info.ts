// Types for scenario info and results
export interface ScenarioInfo {
  id: string;
  name: string;
  description?: string;
  createdBy: string;
  createdAt: Date;
  modelYear: number;
  status: 'building' | 'completed' | 'failed';
  results?: ScenarioResults;
}

export interface ScenarioResults {
  transport?: TransportResults;
  air?: AirQualityResults;
  noise?: NoiseResults;
}

export interface TransportResults {
  modeShare: ModeShareData;
  kmTravel: KmTravelData;
  totalTrips: number;
  averageDistance: number;
}

export interface ModeShareData {
  car: number;
  bus: number;
  rail: number;
  walk: number;
  cycle: number;
}

export interface KmTravelData {
  car: number;
  bus: number;
  rail: number;
  walk: number;
  cycle: number;
}

export interface AirQualityData {
  pollutant: string;
  value: number;
  unit: string;
}

export interface AirQualityResults {
  pollutants: AirQualityData[];
  overallRating: 'good' | 'moderate' | 'poor';
}

export interface NoiseResults {
  averageLevel: number;
  peakLevel: number;
  affectedPopulation: number;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
  }[];
}
