'use client';

import { useBaseModels } from '@/hooks/use-base-models';
import { useAppStore } from '@/stores/app-store';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useEffect, useRef, useState } from 'react';

interface BaseMapProps {
  className?: string;
  style?: maplibregl.StyleSpecification | string;
  center?: [number, number];
  zoom?: number;
  bearing?: number;
  pitch?: number;
}

export function BaseMap({
  className = '',
  style = {
    version: 8,
    sources: {
      'osm': {
        type: 'raster',
        tiles: [
          'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
        ],
        tileSize: 256,
        attribution: '© OpenStreetMap contributors'
      }
    },
    layers: [
      {
        id: 'osm',
        type: 'raster',
        source: 'osm'
      }
    ]
  }, // Default OpenStreetMap style
  center = [-2.0, 54.5], // UK center
  zoom = 6,
  bearing = 0,
  pitch = 0,
}: BaseMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const { setMap } = useAppStore();
  const { model, geoJsonData, loading, error } = useBaseModels();
  const [mapReady, setMapReady] = useState(false);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize the map
    const map = new maplibregl.Map({
      container: mapContainer.current,
      style,
      center,
      zoom,
      bearing,
      pitch,
    });

    // Add navigation controls
    map.addControl(new maplibregl.NavigationControl(), 'top-right');

    // Add scale control
    map.addControl(new maplibregl.ScaleControl(), 'bottom-left');

    // Store map reference
    mapRef.current = map;
    setMap(map);

    // Map event handlers
    map.on('load', () => {
      console.log('Map loaded');
      setMapReady(true);
    });

    map.on('error', (e) => {
      console.error('Map error:', e);
    });

    // Cleanup function
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        setMap(null);
      }
    };
  }, []); // Empty dependency array since we only want to initialize once

  // Handle GeoJSON data when it's loaded
  useEffect(() => {
    if (!mapRef.current || !mapReady || !geoJsonData) return;

    const map = mapRef.current;

    console.log('Adding GeoJSON data to map:', model?.name);

    try {
      // Remove existing source if it exists
      if (map.getSource('base-model-data')) {
        map.removeSource('base-model-data');
      }

      // Add the GeoJSON data as a source
      map.addSource('base-model-data', {
        type: 'geojson',
        data: geoJsonData,
      });

      // Add layers for different geometry types
      // Line layer for roads/railways
      if (!map.getLayer('base-model-lines')) {
        map.addLayer({
          id: 'base-model-lines',
          type: 'line',
          source: 'base-model-data',
          filter: ['==', '$type', 'LineString'],
          paint: {
            'line-color': '#2269b0',
            'line-width': 2,
            'line-opacity': 0.8,
          },
        });
      }

      // Point layer for stations/stops
      if (!map.getLayer('base-model-points')) {
        map.addLayer({
          id: 'base-model-points',
          type: 'circle',
          source: 'base-model-data',
          filter: ['==', '$type', 'Point'],
          paint: {
            'circle-color': '#1f7ab5',
            'circle-radius': 4,
            'circle-opacity': 0.8,
          },
        });
      }

      // Polygon layer for areas
      if (!map.getLayer('base-model-polygons')) {
        map.addLayer({
          id: 'base-model-polygons',
          type: 'fill',
          source: 'base-model-data',
          filter: ['==', '$type', 'Polygon'],
          paint: {
            'fill-color': '#2269b0',
            'fill-opacity': 0.3,
            'fill-outline-color': '#1f7ab5',
          },
        });
      }

      console.log('GeoJSON data added successfully');
    } catch (err) {
      console.error('Error adding GeoJSON data to map:', err);
    }
  }, [mapReady, geoJsonData, model]);

  return (
    <div className={`w-full h-full relative ${className}`}>
      {/* Map container */}
      <div
        ref={mapContainer}
        className="w-full h-full"
        style={{ position: 'relative' }}
      />

      {/* Loading overlay */}
      {loading && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10">
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <div className="text-sm text-gray-600">Loading spatial data...</div>
            {model && (
              <div className="text-xs text-gray-500">
                Model: {model.name} ({model.model_year})
              </div>
            )}
          </div>
        </div>
      )}

      {/* Error overlay */}
      {error && (
        <div className="absolute top-4 right-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg shadow-lg z-20 max-w-sm">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <div>
              <div className="font-medium">Failed to load map data</div>
              <div className="text-sm">{error}</div>
            </div>
          </div>
        </div>
      )}

      {/* Success indicator */}
      {!loading && !error && geoJsonData && (
        <div className="absolute top-4 left-4 bg-green-50 border border-green-200 text-green-700 px-3 py-2 rounded-lg shadow-lg z-20">
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <div className="text-sm font-medium">
              Spatial data loaded: {model?.name}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
