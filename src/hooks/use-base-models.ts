import { useEffect, useState } from 'react';

interface BaseModel {
  id: number;
  name: string;
  model_year: number;
  common_analytical_scenario: string;
  bus_factors: {
    bus_access_egress_factor: number;
    bus_fare_factor: number;
    bus_interchange_factor: number;
    bus_in_vehicle_factor: number;
    bus_wait_time: number;
  };
  rail_factors: {
    rail_access_egress_factor: number;
    rail_fare_factor: number;
    rail_interchange_factor: number;
    rail_in_vehicle_factor: number;
    rail_wait_time: number;
  };
  highway_model: {
    highway_model: boolean;
    air: boolean;
    demand_supply_gap: boolean;
    demand_supply_iterations: boolean;
    demand_model: boolean;
    noise: boolean;
    appraisal: boolean;
  };
  created_at: string;
  updated_at: string;
  created_by: string;
  tags: string[];
  s3_uri: string;
}

interface UseBaseModelsResult {
  model: BaseModel | null;
  geoJsonData: any | null;
  loading: boolean;
  error: string | null;
}

export function useBaseModels(): UseBaseModelsResult {
  const [model, setModel] = useState<BaseModel | null>(null);
  const [geoJsonData, setGeoJsonData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBaseModels = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get auth token
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('No authentication token found');
        }

        // Fetch base models data
        const response = await fetch('https://3w6dargl5c.execute-api.eu-west-2.amazonaws.com/dev/spatial/base-models', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch base models: ${response.status}`);
        }

        const modelData: BaseModel = await response.json();
        setModel(modelData);

        // Fetch GeoJSON data from S3 URI
        if (modelData.s3_uri) {
          const geoJsonResponse = await fetch(modelData.s3_uri);

          if (!geoJsonResponse.ok) {
            throw new Error(`Failed to fetch GeoJSON data: ${geoJsonResponse.status}`);
          }

          const geoJson = await geoJsonResponse.json();
          setGeoJsonData(geoJson);
        }

      } catch (err) {
        console.error('Error fetching base models:', err);
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchBaseModels();
  }, []);

  return {
    model,
    geoJsonData,
    loading,
    error,
  };
}
