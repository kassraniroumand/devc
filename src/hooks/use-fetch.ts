import { useCallback, useEffect, useState } from 'react';

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

interface UseFetchOptions {
  immediate?: boolean;
  deps?: any[];
}

export function useFetch<T = any>(
  url: string | null,
  options: UseFetchOptions = {}
): FetchState<T> & { refetch: () => Promise<void> } {
  const { immediate = true, deps = [] } = options;

  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const fetchData = useCallback(async () => {
    if (!url) return;

    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setState({ data, loading: false, error: null });
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error instanceof Error ? error : new Error('Unknown error'),
      });
    }
  }, [url]);

  useEffect(() => {
    if (immediate && url) {
      fetchData();
    }
  }, [immediate, url, fetchData, ...deps]);

  return {
    ...state,
    refetch: fetchData,
  };
}

// Hook for authenticated fetch requests
export function useAuthFetch<T = any>(
  url: string | null,
  options: UseFetchOptions = {}
): FetchState<T> & { refetch: () => Promise<void> } {
  const { immediate = true, deps = [] } = options;

  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const fetchData = useCallback(async () => {
    if (!url) return;

    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      // Get token from localStorage or your auth store
      const token = localStorage.getItem('authToken');

      const response = await fetch(url, {
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setState({ data, loading: false, error: null });
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error instanceof Error ? error : new Error('Unknown error'),
      });
    }
  }, [url]);

  useEffect(() => {
    if (immediate && url) {
      fetchData();
    }
  }, [immediate, url, fetchData, ...deps]);

  return {
    ...state,
    refetch: fetchData,
  };
}
