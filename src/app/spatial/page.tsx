'use client';

import { ScenarioForm } from '@/components/forms/ScenarioForm';
import { Header } from '@/components/layout/Header';
import { SideBar } from '@/components/layout/sidebar/SideBar';
import { BaseMap } from '@/components/map/BaseMap';
import { SlidablePane } from '@/components/ui/SlidablePane';
import { useCreateScenario } from '@/hooks/use-create-scenario';
import { useScenarioWebSocket } from '@/hooks/use-scenario-websocket';
import { useAppStore } from '@/stores/app-store';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// Import panels (we'll create these next)
// import { ScenarioFormPanel } from '@/components/panels/scenario/ScenarioFormPanel';
// import { ScenarioSelectPanel } from '@/components/panels/scenario/ScenarioSelectPanel';
// import { ScenarioInfoPanel } from '@/components/panels/scenario/ScenarioInfoPanel';

export default function SpatialPage() {
  const router = useRouter();
  const { isBuildingScenario } = useAppStore();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isScenarioFormOpen, setIsScenarioFormOpen] = useState(false);

  // Initialize WebSocket connection
  useScenarioWebSocket();

  // Initialize scenario creation hook
  const { createScenario, isLoading: isCreatingScenario, error: createError } = useCreateScenario();

  // Handle scenario submission
  const handleScenarioSubmit = async (scenarioData: any) => {
    try {
      const result = await createScenario(scenarioData);
      if (result.success) {
        // Close the form and show success message
        setIsScenarioFormOpen(false);
        console.log('Scenario created successfully:', result.scenario);
        // You can add a toast notification here
      } else {
        console.error('Failed to create scenario:', result.message);
        // You can add error handling here
      }
    } catch (error) {
      console.error('Error creating scenario:', error);
    }
  };

  // useEffect(() => {
  //   // Check if user is authenticated
  //   const token = localStorage.getItem('authToken');
  //   if (!token) {
  //     router.replace('/login');
  //     return;
  //   }
  //   setIsCheckingAuth(false);
  // }, [router]);

  // Show loading state while checking authentication to prevent hydration mismatch
  // if (isCheckingAuth) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen">
  //       <div className="text-center">
  //         <h1 className="text-2xl font-bold text-gray-900">
  //           Loading...
  //         </h1>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <main className="relative w-screen h-screen overflow-hidden">
      <Header />
      <SideBar />

      {/* TODO: Add panels when they're created */}
      {/* <ScenarioSelectPanel />
      <ScenarioFormPanel />
      <ScenarioInfoPanel /> */}

      <BaseMap />

      {/* Create Scenario Button */}
      <button
        onClick={() => setIsScenarioFormOpen(true)}
        className="fixed top-20 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg transition-colors duration-200 flex items-center space-x-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        <span>Create Scenario</span>
      </button>

      {/* Building scenario overlay */}
      {isBuildingScenario && (
        <div className="absolute top-0 right-0 z-[75] flex flex-col justify-center w-screen h-screen items-center gap-4 bg-primary/50 text-white">
          <h1 className="font-bold text-3xl tracking-wide">
            Scenario is now building...
          </h1>
          <h2 className="font-semibold text-2xl tracking-wide">
            Please wait, do not perform further actions
          </h2>
        </div>
      )}

      {/* Scenario Creation Slidable Pane */}
      <SlidablePane
        isOpen={isScenarioFormOpen}
        onClose={() => setIsScenarioFormOpen(false)}
        width="700px"
        side="right"
      >
        <ScenarioForm
          onSubmit={handleScenarioSubmit}
          onClose={() => setIsScenarioFormOpen(false)}
          isLoading={isCreatingScenario}
        />
      </SlidablePane>
    </main>
  );
}
