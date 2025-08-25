import { useAppStore } from '@/stores/app-store';
import { useScenarioInfoStore } from '@/stores/scenario-info-store';
import { useCallback, useEffect, useRef } from 'react';

interface WebSocketMessage {
  type: 'scenario_update' | 'scenario_complete' | 'scenario_error';
  scenarioId: string;
  data?: any;
  error?: string;
}

export function useScenarioWebSocket() {
  const wsRef = useRef<WebSocket | null>(null);
  const { updateScenario } = useScenarioInfoStore();
  const { setIsBuildingScenario } = useAppStore();

  const handleMessage = useCallback((event: MessageEvent) => {
    try {
      const message: WebSocketMessage = JSON.parse(event.data);

      switch (message.type) {
        case 'scenario_update':
          updateScenario(message.scenarioId, {
            status: 'building',
            // Could include progress data here
          });
          break;

        case 'scenario_complete':
          updateScenario(message.scenarioId, {
            status: 'completed',
            results: message.data,
          });
          setIsBuildingScenario(false);
          break;

        case 'scenario_error':
          updateScenario(message.scenarioId, {
            status: 'failed',
          });
          setIsBuildingScenario(false);
          console.error('Scenario building failed:', message.error);
          break;

        default:
          console.warn('Unknown WebSocket message type:', message.type);
      }
    } catch (error) {
      console.error('Failed to parse WebSocket message:', error);
    }
  }, [updateScenario, setIsBuildingScenario]);

  const connect = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      return;
    }

    // Replace with your actual WebSocket URL
    const wsUrl = process.env.NODE_ENV === 'production'
      ? 'wss://your-production-domain.com/ws'
      : 'ws://localhost:3001/ws';

    try {
      wsRef.current = new WebSocket(wsUrl);

      wsRef.current.onopen = () => {
        console.log('WebSocket connected');
      };

      wsRef.current.onmessage = handleMessage;

      wsRef.current.onclose = () => {
        console.log('WebSocket disconnected');
        // Attempt to reconnect after 3 seconds
        setTimeout(connect, 3000);
      };

      wsRef.current.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    } catch (error) {
      console.error('Failed to create WebSocket connection:', error);
    }
  }, [handleMessage]);

  const disconnect = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
  }, []);

  const sendMessage = useCallback((message: object) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(message));
    } else {
      console.warn('WebSocket is not connected');
    }
  }, []);

  // Auto-connect on mount
  useEffect(() => {
    connect();

    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  return {
    connect,
    disconnect,
    sendMessage,
    isConnected: wsRef.current?.readyState === WebSocket.OPEN,
  };
}
