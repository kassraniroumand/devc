// Types for scenario form functionality
export type CommonAnalyticalScenario =
  | "Core"
  | "High Economy"
  | "Low Economy"
  | "Regional"
  | "Behavioural Change"
  | "Technology"
  | "Vehicle-led Decarbonisation"
  | "Mode-balanced";

export type ModelOption =
  | "Demand Model"
  | "Highway Model"
  | "Air"
  | "Noise"
  | "Appraisal"
  | "Demand Supply Gap"
  | "Demand Supply Gap Itertations";

export type ModelSelections = Record<ModelOption, boolean>;

export type ModelYear = 2025 | 2030 | 2035 | 2040 | 2045 | 2050;

export type DemandSupplyIteration = 1 | 2 | 3 | 4 | 5;
export type DemandSupplyGap = {
  "Demand Supply Gap": boolean;
  iterations: DemandSupplyIteration;
};

export type FactorSliderTitle =
  | "Access/Egress"
  | "Fare"
  | "Interchange"
  | "In-Vehicle Time"
  | "Wait Time";

export type FactorSliderValues = Record<FactorSliderTitle, number>;

export type BusFactors = {
  bus_access_egress_factor: number;
  bus_fare_factor: number;
  bus_interchange_factor: number;
  bus_in_vehicle_factor: number;
  bus_wait_time: number;
};

export type RailFactors = {
  rail_access_egress_factor: number;
  rail_fare_factor: number;
  rail_interchange_factor: number;
  rail_in_vehicle_factor: number;
  rail_wait_time: number;
};

export interface ScenarioForm {
  name: string;
  modelYear: ModelYear;
  scenario: CommonAnalyticalScenario;
  busPct: FactorSliderValues;
  railPct: FactorSliderValues;
  modelSelections: ModelSelections;
  createdBy: string;
  tags: string[];
}

export type BackendPayload = {
  name: string;
  description?: string;
  model_year: number;
  common_analytical_scenario: string;
  bus_factors: BusFactors;
  rail_factors: RailFactors;
  highway_model: {
    highway_model: boolean;
    demand_model: boolean;
    air: boolean;
    noise: boolean;
    demand_supply_gap: false;
    demand_supply_iterations: false;
    appraisal: false;
  };
  created_by: string;
  tags: string[];
};
