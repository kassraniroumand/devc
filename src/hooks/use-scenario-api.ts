import { useAppStore } from '@/stores/app-store';
import { useScenarioFormStore } from '@/stores/scenario-form-store';
import { useScenarioInfoStore } from '@/stores/scenario-info-store';
import { BackendPayload, ScenarioForm } from '@/types/scenario-form';
import { ScenarioInfo } from '@/types/scenario-info';
import { useCallback, useState } from 'react';

export function useBuildScenarioApi() {
  const [isBuilding, setIsBuilding] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { scenarioForm } = useScenarioFormStore();
  const { addScenario } = useScenarioInfoStore();
  const { setIsBuildingScenario } = useAppStore();

  const buildScenario = useCallback(async (formData?: ScenarioForm) => {
    const dataToUse = formData || scenarioForm;

    setIsBuilding(true);
    setError(null);
    setIsBuildingScenario(true);

    try {
      // Transform form data to backend payload
      const payload: BackendPayload = {
        name: dataToUse.name,
        description: '', // Could be added to form
        model_year: dataToUse.modelYear,
        common_analytical_scenario: dataToUse.scenario,
        bus_factors: {
          bus_access_egress_factor: dataToUse.busPct['Access/Egress'] / 100,
          bus_fare_factor: dataToUse.busPct['Fare'] / 100,
          bus_interchange_factor: dataToUse.busPct['Interchange'] / 100,
          bus_in_vehicle_factor: dataToUse.busPct['In-Vehicle Time'] / 100,
          bus_wait_time: dataToUse.busPct['Wait Time'] / 100,
        },
        rail_factors: {
          rail_access_egress_factor: dataToUse.railPct['Access/Egress'] / 100,
          rail_fare_factor: dataToUse.railPct['Fare'] / 100,
          rail_interchange_factor: dataToUse.railPct['Interchange'] / 100,
          rail_in_vehicle_factor: dataToUse.railPct['In-Vehicle Time'] / 100,
          rail_wait_time: dataToUse.railPct['Wait Time'] / 100,
        },
        highway_model: {
          highway_model: dataToUse.modelSelections['Highway Model'],
          demand_model: dataToUse.modelSelections['Demand Model'],
          air: dataToUse.modelSelections['Air'],
          noise: dataToUse.modelSelections['Noise'],
          demand_supply_gap: false,
          demand_supply_iterations: false,
          appraisal: false,
        },
        created_by: dataToUse.createdBy,
        tags: dataToUse.tags,
      };

      // Call the API to build scenario
      const response = await fetch('/api/create-models/models2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Failed to build scenario: ${response.statusText}`);
      }

      const result = await response.json();

      // Create scenario info object
      const newScenario: ScenarioInfo = {
        id: result.id || crypto.randomUUID(),
        name: dataToUse.name,
        description: payload.description,
        createdBy: dataToUse.createdBy,
        createdAt: new Date(),
        modelYear: dataToUse.modelYear,
        status: 'building',
      };

      // Add to store
      addScenario(newScenario);

      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setIsBuilding(false);
      setIsBuildingScenario(false);
    }
  }, [scenarioForm, addScenario, setIsBuildingScenario]);

  return {
    buildScenario,
    isBuilding,
    error,
  };
}

export function useLoadScenariosApi() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { setScenarios } = useScenarioInfoStore();

  const loadScenarios = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/models-scenario');

      if (!response.ok) {
        throw new Error(`Failed to load scenarios: ${response.statusText}`);
      }

      const scenarios = await response.json();
      setScenarios(scenarios);

      return scenarios;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [setScenarios]);

  return {
    loadScenarios,
    isLoading,
    error,
  };
}
