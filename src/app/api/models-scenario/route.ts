import { NextRequest, NextResponse } from 'next/server';

// Mock scenario data
const mockScenarios = [
  {
    id: 'scenario-1',
    name: 'Core Baseline 2030',
    description: 'Core analytical scenario for baseline projections',
    createdBy: 'admin',
    createdAt: '2024-01-15T10:00:00Z',
    modelYear: 2030,
    status: 'completed',
    results: {
      transport: {
        modeShare: {
          car: 65.2,
          bus: 12.5,
          rail: 15.8,
          walk: 4.2,
          cycle: 2.3,
        },
        kmTravel: {
          car: 285.6,
          bus: 42.1,
          rail: 58.3,
          walk: 12.8,
          cycle: 8.2,
        },
        totalTrips: 1250000,
        averageDistance: 12.5,
      },
      air: {
        pollutants: [
          { pollutant: 'NO2', value: 28.5, unit: 'μg/m³' },
          { pollutant: 'PM2.5', value: 12.3, unit: 'μg/m³' },
        ],
        overallRating: 'moderate' as const,
      },
      noise: {
        averageLevel: 55.2,
        peakLevel: 72.8,
        affectedPopulation: 125000,
      },
    },
  },
  {
    id: 'scenario-2',
    name: 'High Growth Technology 2035',
    description: 'Technology-focused high growth scenario',
    createdBy: 'analyst1',
    createdAt: '2024-01-16T14:30:00Z',
    modelYear: 2035,
    status: 'building',
  },
  {
    id: 'scenario-3',
    name: 'Regional Development 2040',
    description: 'Regional balanced development scenario',
    createdBy: 'planner1',
    createdAt: '2024-01-17T09:15:00Z',
    modelYear: 2040,
    status: 'completed',
    results: {
      transport: {
        modeShare: {
          car: 58.1,
          bus: 16.2,
          rail: 18.5,
          walk: 4.8,
          cycle: 2.4,
        },
        kmTravel: {
          car: 245.3,
          bus: 52.8,
          rail: 68.9,
          walk: 14.2,
          cycle: 9.1,
        },
        totalTrips: 1420000,
        averageDistance: 11.8,
      },
    },
  },
];

export async function GET(request: NextRequest) {
  try {
    // In a real application, you would fetch from a database
    // You might also want to add pagination, filtering, etc.

    const url = new URL(request.url);
    const status = url.searchParams.get('status');
    const createdBy = url.searchParams.get('createdBy');

    let filteredScenarios = mockScenarios;

    if (status) {
      filteredScenarios = filteredScenarios.filter(s => s.status === status);
    }

    if (createdBy) {
      filteredScenarios = filteredScenarios.filter(s => s.createdBy === createdBy);
    }

    return NextResponse.json(filteredScenarios);
  } catch (error) {
    console.error('Error fetching scenarios:', error);
    return NextResponse.json(
      { error: 'Failed to fetch scenarios' },
      { status: 500 }
    );
  }
}
