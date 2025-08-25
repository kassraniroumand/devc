import { useState } from 'react';

interface BusFactors {
  bus_access_egress_factor: number;
  bus_fare_factor: number;
  bus_interchange_factor: number;
  bus_in_vehicle_factor: number;
  bus_wait_time: number;
}

interface RailFactors {
  rail_access_egress_factor: number;
  rail_fare_factor: number;
  rail_interchange_factor: number;
  rail_in_vehicle_factor: number;
  rail_wait_time: number;
}

interface HighwayModel {
  highway_model: boolean;
  air: boolean;
  demand_supply_gap: boolean;
  demand_supply_iterations: boolean;
  demand_model: boolean;
  noise: boolean;
  appraisal: boolean;
}

interface ScenarioData {
  name: string;
  model_year: number;
  common_analytical_scenario: string;
  bus_factors: BusFactors;
  rail_factors: RailFactors;
  highway_model: HighwayModel;
  created_by: string;
  tags: string[];
}

interface CreateScenarioResponse {
  success: boolean;
  message?: string;
  scenario?: any;
}

export function useCreateScenario() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createScenario = async (data: ScenarioData): Promise<CreateScenarioResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      // Get auth token
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('Authentication token not found. Please login again.');
      }

      const response = await fetch('https://3w6dargl5c.execute-api.eu-west-2.amazonaws.com/dev/spatial/models-scenario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`;

        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch {
          // Use the response text if it's not JSON
          errorMessage = errorText || errorMessage;
        }

        throw new Error(errorMessage);
      }

      const result = await response.json();

      return {
        success: true,
        scenario: result,
      };

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create scenario';
      setError(errorMessage);

      return {
        success: false,
        message: errorMessage,
      };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createScenario,
    isLoading,
    error,
    clearError: () => setError(null),
  };
}
