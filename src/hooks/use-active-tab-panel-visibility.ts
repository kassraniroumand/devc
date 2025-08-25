import { useAppStore } from '@/stores/app-store';
import { usePanelVisibility } from './use-panel-visibility';

export function useActiveTabPanelVisibility() {
  const { activeTab } = useAppStore();
  const { isPanelVisible, showOnlyPanel, hideAllPanels } = usePanelVisibility();

  const isActivePanelVisible = (panelName: string): boolean => {
    if (!activeTab) return false;
    return isPanelVisible(activeTab, panelName);
  };

  const showOnlyActivePanel = (panelName: string) => {
    if (!activeTab) return;
    showOnlyPanel(activeTab, panelName);
  };

  const hideAllActivePanels = () => {
    if (!activeTab) return;
    hideAllPanels(activeTab);
  };

  return {
    isActivePanelVisible,
    showOnlyActivePanel,
    hideAllActivePanels,
    activeTab,
  };
}
