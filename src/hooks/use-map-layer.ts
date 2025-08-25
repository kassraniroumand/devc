import { useAppStore } from '@/stores/app-store';
import type maplibregl from 'maplibre-gl';
import { useCallback, useRef } from 'react';

export interface LayerConfig {
  id: string;
  type: 'line' | 'fill' | 'circle' | 'symbol' | 'raster' | 'fill-extrusion' | 'heatmap' | 'hillshade' | 'background';
  source: string | maplibregl.SourceSpecification;
  layout?: any;
  paint?: any;
  filter?: any[];
  visible?: boolean;
}

export function useMapLayer() {
  const { map } = useAppStore();
  const layersRef = useRef<Set<string>>(new Set());

  const addLayer = useCallback((config: LayerConfig) => {
    if (!map) {
      console.warn('Map not available');
      return;
    }

    try {
      // Add source if it's an object (not a string reference)
      if (typeof config.source === 'object') {
        const sourceId = `${config.id}-source`;
        if (!map.getSource(sourceId)) {
          map.addSource(sourceId, config.source);
        }
        config.source = sourceId;
      }

      // Remove existing layer if it exists
      if (map.getLayer(config.id)) {
        map.removeLayer(config.id);
      }

      // Add the layer
      const layerSpec: any = {
        id: config.id,
        type: config.type,
        source: config.source,
        layout: {
          visibility: config.visible !== false ? 'visible' : 'none',
          ...config.layout,
        },
        paint: config.paint,
        ...(config.filter && { filter: config.filter }),
      };

      map.addLayer(layerSpec);
      layersRef.current.add(config.id);

      console.log(`Layer ${config.id} added successfully`);
    } catch (error) {
      console.error(`Failed to add layer ${config.id}:`, error);
    }
  }, [map]);

  const removeLayer = useCallback((layerId: string) => {
    if (!map) {
      console.warn('Map not available');
      return;
    }

    try {
      if (map.getLayer(layerId)) {
        map.removeLayer(layerId);
        layersRef.current.delete(layerId);
        console.log(`Layer ${layerId} removed successfully`);
      }
    } catch (error) {
      console.error(`Failed to remove layer ${layerId}:`, error);
    }
  }, [map]);

  const toggleLayerVisibility = useCallback((layerId: string, visible?: boolean) => {
    if (!map) {
      console.warn('Map not available');
      return;
    }

    try {
      if (map.getLayer(layerId)) {
        const currentVisibility = map.getLayoutProperty(layerId, 'visibility');
        const newVisibility = visible !== undefined
          ? (visible ? 'visible' : 'none')
          : (currentVisibility === 'visible' ? 'none' : 'visible');

        map.setLayoutProperty(layerId, 'visibility', newVisibility);
        console.log(`Layer ${layerId} visibility set to ${newVisibility}`);
      }
    } catch (error) {
      console.error(`Failed to toggle layer ${layerId} visibility:`, error);
    }
  }, [map]);

  const updateLayerStyle = useCallback((layerId: string, property: string, value: any, type: 'paint' | 'layout' = 'paint') => {
    if (!map) {
      console.warn('Map not available');
      return;
    }

    try {
      if (map.getLayer(layerId)) {
        if (type === 'paint') {
          map.setPaintProperty(layerId, property, value);
        } else {
          map.setLayoutProperty(layerId, property, value);
        }
        console.log(`Layer ${layerId} ${type} property ${property} updated`);
      }
    } catch (error) {
      console.error(`Failed to update layer ${layerId} ${type} property ${property}:`, error);
    }
  }, [map]);

  const clearAllLayers = useCallback(() => {
    if (!map) {
      console.warn('Map not available');
      return;
    }

    layersRef.current.forEach(layerId => {
      removeLayer(layerId);
    });
    layersRef.current.clear();
  }, [map, removeLayer]);

  const getLayerIds = useCallback(() => {
    return Array.from(layersRef.current);
  }, []);

  const isLayerVisible = useCallback((layerId: string): boolean => {
    if (!map || !map.getLayer(layerId)) {
      return false;
    }

    const visibility = map.getLayoutProperty(layerId, 'visibility');
    return visibility !== 'none';
  }, [map]);

  return {
    addLayer,
    removeLayer,
    toggleLayerVisibility,
    updateLayerStyle,
    clearAllLayers,
    getLayerIds,
    isLayerVisible,
  };
}
