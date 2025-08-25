'use client';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Selector } from '@/components/ui/Selector';
import { useState } from 'react';

interface BusFactors {
  bus_access_egress_factor: number;
  bus_fare_factor: number;
  bus_interchange_factor: number;
  bus_in_vehicle_factor: number;
  bus_wait_time: number;
}

interface RailFactors {
  rail_access_egress_factor: number;
  rail_fare_factor: number;
  rail_interchange_factor: number;
  rail_in_vehicle_factor: number;
  rail_wait_time: number;
}

interface HighwayModel {
  highway_model: boolean;
  air: boolean;
  demand_supply_gap: boolean;
  demand_supply_iterations: boolean;
  demand_model: boolean;
  noise: boolean;
  appraisal: boolean;
}

interface ScenarioData {
  name: string;
  model_year: number;
  common_analytical_scenario: string;
  bus_factors: BusFactors;
  rail_factors: RailFactors;
  highway_model: HighwayModel;
  created_by: string;
  tags: string[];
}

interface ScenarioFormProps {
  onSubmit: (data: ScenarioData) => void;
  onClose: () => void;
  isLoading?: boolean;
}

export function ScenarioForm({ onSubmit, onClose, isLoading = false }: ScenarioFormProps) {
  const [formData, setFormData] = useState<ScenarioData>({
    name: '',
    model_year: 2020,
    common_analytical_scenario: 'Core',
    bus_factors: {
      bus_access_egress_factor: 1,
      bus_fare_factor: 1,
      bus_interchange_factor: 1,
      bus_in_vehicle_factor: 1,
      bus_wait_time: 1,
    },
    rail_factors: {
      rail_access_egress_factor: 1,
      rail_fare_factor: 1,
      rail_interchange_factor: 1,
      rail_in_vehicle_factor: 1,
      rail_wait_time: 1,
    },
    highway_model: {
      highway_model: true,
      air: false,
      demand_supply_gap: false,
      demand_supply_iterations: false,
      demand_model: true,
      noise: false,
      appraisal: false,
    },
    created_by: '',
    tags: [],
  });

  const [tagInput, setTagInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (field: keyof ScenarioData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleBusFactorChange = (field: keyof BusFactors, value: number) => {
    setFormData(prev => ({
      ...prev,
      bus_factors: {
        ...prev.bus_factors,
        [field]: value,
      },
    }));
  };

  const handleRailFactorChange = (field: keyof RailFactors, value: number) => {
    setFormData(prev => ({
      ...prev,
      rail_factors: {
        ...prev.rail_factors,
        [field]: value,
      },
    }));
  };

  const handleHighwayModelChange = (field: keyof HighwayModel, value: boolean) => {
    setFormData(prev => ({
      ...prev,
      highway_model: {
        ...prev.highway_model,
        [field]: value,
      },
    }));
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove),
    }));
  };

  const scenarioOptions = [
    { value: 'Core', label: 'Core' },
    { value: 'High Growth', label: 'High Growth' },
    { value: 'Low Growth', label: 'Low Growth' },
    { value: 'Net Zero', label: 'Net Zero' },
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-900">Create Model Scenario</h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          disabled={isLoading}
        >
          <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Form Content */}
      <div className="flex-1 overflow-y-auto">
        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>

            <Input
              label="Scenario Name"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Enter scenario name"
              required
            />

            <Input
              label="Model Year"
              type="number"
              value={formData.model_year}
              onChange={(e) => handleInputChange('model_year', parseInt(e.target.value))}
              min="2020"
              max="2050"
              required
            />

            <Selector
              label="Common Analytical Scenario"
              value={formData.common_analytical_scenario}
              onChange={(value) => handleInputChange('common_analytical_scenario', value)}
              options={scenarioOptions}
            />

            <Input
              label="Created By"
              type="text"
              value={formData.created_by}
              onChange={(e) => handleInputChange('created_by', e.target.value)}
              placeholder="Enter creator name"
              required
            />
          </div>

          {/* Bus Factors */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Bus Factors</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Access/Egress Factor"
                type="number"
                step="0.1"
                value={formData.bus_factors.bus_access_egress_factor}
                onChange={(e) => handleBusFactorChange('bus_access_egress_factor', parseFloat(e.target.value))}
              />
              <Input
                label="Fare Factor"
                type="number"
                step="0.1"
                value={formData.bus_factors.bus_fare_factor}
                onChange={(e) => handleBusFactorChange('bus_fare_factor', parseFloat(e.target.value))}
              />
              <Input
                label="Interchange Factor"
                type="number"
                step="0.1"
                value={formData.bus_factors.bus_interchange_factor}
                onChange={(e) => handleBusFactorChange('bus_interchange_factor', parseFloat(e.target.value))}
              />
              <Input
                label="In Vehicle Factor"
                type="number"
                step="0.1"
                value={formData.bus_factors.bus_in_vehicle_factor}
                onChange={(e) => handleBusFactorChange('bus_in_vehicle_factor', parseFloat(e.target.value))}
              />
              <Input
                label="Wait Time"
                type="number"
                step="0.1"
                value={formData.bus_factors.bus_wait_time}
                onChange={(e) => handleBusFactorChange('bus_wait_time', parseFloat(e.target.value))}
              />
            </div>
          </div>

          {/* Rail Factors */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Rail Factors</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Access/Egress Factor"
                type="number"
                step="0.1"
                value={formData.rail_factors.rail_access_egress_factor}
                onChange={(e) => handleRailFactorChange('rail_access_egress_factor', parseFloat(e.target.value))}
              />
              <Input
                label="Fare Factor"
                type="number"
                step="0.1"
                value={formData.rail_factors.rail_fare_factor}
                onChange={(e) => handleRailFactorChange('rail_fare_factor', parseFloat(e.target.value))}
              />
              <Input
                label="Interchange Factor"
                type="number"
                step="0.1"
                value={formData.rail_factors.rail_interchange_factor}
                onChange={(e) => handleRailFactorChange('rail_interchange_factor', parseFloat(e.target.value))}
              />
              <Input
                label="In Vehicle Factor"
                type="number"
                step="0.1"
                value={formData.rail_factors.rail_in_vehicle_factor}
                onChange={(e) => handleRailFactorChange('rail_in_vehicle_factor', parseFloat(e.target.value))}
              />
              <Input
                label="Wait Time"
                type="number"
                step="0.1"
                value={formData.rail_factors.rail_wait_time}
                onChange={(e) => handleRailFactorChange('rail_wait_time', parseFloat(e.target.value))}
              />
            </div>
          </div>

          {/* Highway Model Options */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Highway Model Options</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(formData.highway_model).map(([key, value]) => (
                <label key={key} className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => handleHighwayModelChange(key as keyof HighwayModel, e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 capitalize">
                    {key.replace(/_/g, ' ')}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Tags</h3>
            <div className="flex space-x-2">
              <Input
                label=""
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Add a tag"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTag();
                  }
                }}
              />
              <Button
                type="button"
                onClick={addTag}
                variant="toggle"
                className="px-4 py-2"
              >
                Add
              </Button>
            </div>
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </form>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-end space-x-4 p-6 border-t border-gray-200">
        <Button
          type="button"
          variant="toggle"
          onClick={onClose}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          onClick={handleSubmit}
          disabled={isLoading || !formData.name || !formData.created_by}
          className="min-w-[120px]"
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Creating...</span>
            </div>
          ) : (
            'Create Scenario'
          )}
        </Button>
      </div>
    </div>
  );
}
