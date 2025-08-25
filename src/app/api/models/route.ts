import { NextRequest, NextResponse } from 'next/server';

// Mock data for demonstration
const mockModels = [
  {
    id: '1',
    name: 'Base Model 2030',
    year: 2030,
    status: 'completed',
    createdAt: '2024-01-15T10:00:00Z',
    createdBy: 'admin',
  },
  {
    id: '2',
    name: 'High Growth Scenario 2035',
    year: 2035,
    status: 'building',
    createdAt: '2024-01-16T14:30:00Z',
    createdBy: 'analyst1',
  },
];

export async function GET(request: NextRequest) {
  try {
    // In a real application, you would fetch data from a database
    return NextResponse.json(mockModels);
  } catch (error) {
    console.error('Error fetching models:', error);
    return NextResponse.json(
      { error: 'Failed to fetch models' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // In a real application, you would save to a database
    const newModel = {
      id: Math.random().toString(36).substr(2, 9),
      ...body,
      status: 'building',
      createdAt: new Date().toISOString(),
    };

    // Simulate processing time
    setTimeout(() => {
      console.log(`Model ${newModel.id} processing complete`);
    }, 5000);

    return NextResponse.json(newModel, { status: 201 });
  } catch (error) {
    console.error('Error creating model:', error);
    return NextResponse.json(
      { error: 'Failed to create model' },
      { status: 500 }
    );
  }
}
