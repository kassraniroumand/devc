import { tabs, useAppStore } from '@/stores/app-store';
import { TabName } from '@/types/common';
import { SideBarTab } from './SideBarTab';

export function SideBar() {
  const { activeTab, setActiveTab, setPanelVisibility } = useAppStore();

  const tabClickHandler = (tabName: TabName | null) => {
    if (activeTab === tabName) {
      setActiveTab(null);
      setPanelVisibility({
        Scenario: {
          ScenarioSelectPanel: false,
          ScenarioInfoPanel: false,
          ScenarioFormPanel: false,
        },
      });
    } else if (tabName) {
      setActiveTab(tabName);

      if (tabName === "Scenario") {
        setPanelVisibility({
          Scenario: {
            ScenarioSelectPanel: false,
            ScenarioInfoPanel: false,
            ScenarioFormPanel: true, // Directly enter Form
          },
        });
      }

      if (tabName === "ScenarioLoader") {
        setPanelVisibility({
          Scenario: {
            ScenarioSelectPanel: true,
            ScenarioInfoPanel: false,
            ScenarioFormPanel: false,
          },
        });
      }
    }
  };

  return (
    <aside className="fixed top-0 left-0 z-[56] flex flex-col gap-8 pt-16 pb-4 w-32 h-full bg-[linear-gradient(to_top,_#029ade_0%,_#1f7ab5_35%,_#2269b0_60%,_#2269b0_100%)] text-white">
      {tabs.map((tab) => (
        <SideBarTab
          key={tab.name}
          label={tab.label}
          icon={tab.icon}
          active={activeTab === tab.name}
          tabClickHandler={() => tabClickHandler(tab.name as TabName)}
        />
      ))}
    </aside>
  );
}
