// Common types used across the application
export interface Tab {
  name: string;
  icon: string;
  label: string;
}

export type TabName = "Scenario" | "ScenarioLoader";

export interface PanelVisibility {
  [tabName: string]: {
    [panelName: string]: boolean;
  };
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'user';
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Map related types
export interface MapState {
  center: [number, number];
  zoom: number;
  bearing: number;
  pitch: number;
}

export interface LayerConfig {
  id: string;
  type: string;
  source: string;
  visible: boolean;
  opacity: number;
}
