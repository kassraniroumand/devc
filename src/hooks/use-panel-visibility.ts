import { useAppStore } from '@/stores/app-store';

export function usePanelVisibility() {
  const { panelVisibility, togglePanel, setPanelVisibility } = useAppStore();

  const isPanelVisible = (tabName: string, panelName: string): boolean => {
    return panelVisibility[tabName]?.[panelName] ?? false;
  };

  const showPanel = (tabName: string, panelName: string) => {
    const currentVisibility = panelVisibility[tabName]?.[panelName];
    if (!currentVisibility) {
      togglePanel(tabName, panelName);
    }
  };

  const hidePanel = (tabName: string, panelName: string) => {
    const currentVisibility = panelVisibility[tabName]?.[panelName];
    if (currentVisibility) {
      togglePanel(tabName, panelName);
    }
  };

  const hideAllPanels = (tabName: string) => {
    const tabPanels = panelVisibility[tabName];
    if (!tabPanels) return;

    const updatedPanels = Object.keys(tabPanels).reduce((acc, panelName) => {
      acc[panelName] = false;
      return acc;
    }, {} as Record<string, boolean>);

    setPanelVisibility({
      ...panelVisibility,
      [tabName]: updatedPanels,
    });
  };

  const showOnlyPanel = (tabName: string, panelName: string) => {
    hideAllPanels(tabName);
    showPanel(tabName, panelName);
  };

  return {
    isPanelVisible,
    togglePanel,
    showPanel,
    hidePanel,
    hideAllPanels,
    showOnlyPanel,
  };
}
