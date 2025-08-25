import { PanelVisibility, TabName } from '@/types/common';
import type maplibregl from 'maplibre-gl';
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

export const tabs = [
  { name: "Scenario", icon: "/svg/Scenario.svg", label: "Scenario Builder" },
  { name: "ScenarioLoader", icon: "/svg/Load.svg", label: "Scenario Loader" },
] as const;

interface AppState {
  // Navigation
  activeTab: TabName | null;
  setActiveTab: (tab: TabName | null) => void;

  // Map
  map: maplibregl.Map | null;
  setMap: (map: maplibregl.Map | null) => void;

  // Panel visibility
  panelVisibility: PanelVisibility;
  setPanelVisibility: (visibility: PanelVisibility) => void;
  togglePanel: (tabName: string, panelName: string) => void;

  // Scenario building state
  isBuildingScenario: boolean;
  setIsBuildingScenario: (building: boolean) => void;
}

export const useAppStore = create<AppState>()(
  subscribeWithSelector((set, get) => ({
    // Initial state
    activeTab: "Scenario",
    map: null,
    panelVisibility: {
      Scenario: {
        ScenarioSelectPanel: false,
        ScenarioInfoPanel: false,
        ScenarioFormPanel: true,
      },
    },
    isBuildingScenario: false,

    // Actions
    setActiveTab: (tab) => set({ activeTab: tab }),

    setMap: (map) => set({ map }),

    setPanelVisibility: (visibility) => set({ panelVisibility: visibility }),

    togglePanel: (tabName, panelName) => {
      const { panelVisibility } = get();
      set({
        panelVisibility: {
          ...panelVisibility,
          [tabName]: {
            ...panelVisibility[tabName],
            [panelName]: !panelVisibility[tabName]?.[panelName],
          },
        },
      });
    },

    setIsBuildingScenario: (building) => set({ isBuildingScenario: building }),
  }))
);
