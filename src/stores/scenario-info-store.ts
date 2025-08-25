import { ScenarioInfo, ScenarioResults } from '@/types/scenario-info';
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

interface ScenarioInfoState {
  // Current selected scenario
  selectedScenario: ScenarioInfo | null;

  // All scenarios
  scenarios: ScenarioInfo[];

  // Loading states
  isLoading: boolean;
  isLoadingResults: boolean;

  // Actions
  setSelectedScenario: (scenario: ScenarioInfo | null) => void;
  setScenarios: (scenarios: ScenarioInfo[]) => void;
  addScenario: (scenario: ScenarioInfo) => void;
  updateScenario: (id: string, updates: Partial<ScenarioInfo>) => void;
  deleteScenario: (id: string) => void;

  // Loading actions
  setIsLoading: (loading: boolean) => void;
  setIsLoadingResults: (loading: boolean) => void;

  // Results actions
  updateScenarioResults: (id: string, results: ScenarioResults) => void;

  // Getters
  getScenarioById: (id: string) => ScenarioInfo | undefined;
  getCompletedScenarios: () => ScenarioInfo[];
  getBuildingScenarios: () => ScenarioInfo[];
}

export const useScenarioInfoStore = create<ScenarioInfoState>()(
  subscribeWithSelector((set, get) => ({
    // Initial state
    selectedScenario: null,
    scenarios: [],
    isLoading: false,
    isLoadingResults: false,

    // Actions
    setSelectedScenario: (scenario) => set({ selectedScenario: scenario }),

    setScenarios: (scenarios) => set({ scenarios }),

    addScenario: (scenario) => {
      set((state) => ({
        scenarios: [...state.scenarios, scenario]
      }));
    },

    updateScenario: (id, updates) => {
      set((state) => ({
        scenarios: state.scenarios.map(scenario =>
          scenario.id === id ? { ...scenario, ...updates } : scenario
        ),
        selectedScenario: state.selectedScenario?.id === id
          ? { ...state.selectedScenario, ...updates }
          : state.selectedScenario
      }));
    },

    deleteScenario: (id) => {
      set((state) => ({
        scenarios: state.scenarios.filter(scenario => scenario.id !== id),
        selectedScenario: state.selectedScenario?.id === id
          ? null
          : state.selectedScenario
      }));
    },

    setIsLoading: (loading) => set({ isLoading: loading }),

    setIsLoadingResults: (loading) => set({ isLoadingResults: loading }),

    updateScenarioResults: (id, results) => {
      get().updateScenario(id, { results, status: 'completed' });
    },

    // Getters
    getScenarioById: (id) => {
      return get().scenarios.find(scenario => scenario.id === id);
    },

    getCompletedScenarios: () => {
      return get().scenarios.filter(scenario => scenario.status === 'completed');
    },

    getBuildingScenarios: () => {
      return get().scenarios.filter(scenario => scenario.status === 'building');
    },
  }))
);
