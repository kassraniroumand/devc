import {
    CommonAnalyticalScenario,
    FactorSliderTitle,
    FactorSliderValues,
    ModelSelections,
    ModelYear,
    ScenarioForm
} from '@/types/scenario-form';
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

// Constants
export const modelYears: ModelYear[] = [2025, 2030, 2035, 2040, 2045, 2050];
export const demandSupplyGapIteration = [1, 2, 3, 4, 5] as const;
export const factorSlidersTitles: FactorSliderTitle[] = [
  "Access/Egress",
  "Fare",
  "Interchange",
  "In-Vehicle Time",
  "Wait Time"
];

export const commonAnalyticalScenarios: CommonAnalyticalScenario[] = [
  "Core",
  "High Economy",
  "Low Economy",
  "Regional",
  "Behavioural Change",
  "Technology",
  "Vehicle-led Decarbonisation",
  "Mode-balanced"
];

// Initial values
const initialFactorSliderValues: FactorSliderValues = {
  "Access/Egress": 0,
  "Fare": 0,
  "Interchange": 0,
  "In-Vehicle Time": 0,
  "Wait Time": 0,
};

const initialModelSelections: ModelSelections = {
  "Demand Model": true,
  "Highway Model": false,
  "Air": false,
  "Noise": false,
  "Appraisal": false,
  "Demand Supply Gap": false,
  "Demand Supply Gap Itertations": false,
};

const initialScenarioForm: ScenarioForm = {
  name: "",
  modelYear: 2030,
  scenario: "Core",
  busPct: { ...initialFactorSliderValues },
  railPct: { ...initialFactorSliderValues },
  modelSelections: { ...initialModelSelections },
  createdBy: "",
  tags: [],
};

interface ScenarioFormState {
  // Form data
  scenarioForm: ScenarioForm;

  // Actions
  updateScenarioForm: (updates: Partial<ScenarioForm>) => void;
  updateFactorSlider: (type: 'busPct' | 'railPct', factor: FactorSliderTitle, value: number) => void;
  updateModelSelection: (model: keyof ModelSelections, selected: boolean) => void;
  resetScenarioForm: () => void;

  // Validation
  isFormValid: () => boolean;
  getFormErrors: () => string[];
}

export const useScenarioFormStore = create<ScenarioFormState>()(
  subscribeWithSelector((set, get) => ({
    // Initial state
    scenarioForm: { ...initialScenarioForm },

    // Actions
    updateScenarioForm: (updates) => {
      set((state) => ({
        scenarioForm: { ...state.scenarioForm, ...updates }
      }));
    },

    updateFactorSlider: (type, factor, value) => {
      set((state) => ({
        scenarioForm: {
          ...state.scenarioForm,
          [type]: {
            ...state.scenarioForm[type],
            [factor]: value,
          },
        },
      }));
    },

    updateModelSelection: (model, selected) => {
      set((state) => ({
        scenarioForm: {
          ...state.scenarioForm,
          modelSelections: {
            ...state.scenarioForm.modelSelections,
            [model]: selected,
          },
        },
      }));
    },

    resetScenarioForm: () => {
      set({ scenarioForm: { ...initialScenarioForm } });
    },

    // Validation
    isFormValid: () => {
      const { scenarioForm } = get();
      return (
        scenarioForm.name.trim().length > 0 &&
        scenarioForm.createdBy.trim().length > 0
      );
    },

    getFormErrors: () => {
      const { scenarioForm } = get();
      const errors: string[] = [];

      if (!scenarioForm.name.trim()) {
        errors.push("Scenario name is required");
      }

      if (!scenarioForm.createdBy.trim()) {
        errors.push("Created by field is required");
      }

      return errors;
    },
  }))
);
