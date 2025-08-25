import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();

    // Validate required fields
    if (!payload.name || !payload.model_year || !payload.created_by) {
      return NextResponse.json(
        { error: 'Missing required fields: name, model_year, created_by' },
        { status: 400 }
      );
    }

    // In a real application, you would:
    // 1. Save the scenario to a database
    // 2. Queue it for processing
    // 3. Return a job ID

    const scenarioId = Math.random().toString(36).substr(2, 9);

    console.log('Creating scenario:', {
      id: scenarioId,
      name: payload.name,
      modelYear: payload.model_year,
      createdBy: payload.created_by,
    });

    // Simulate async processing
    setTimeout(() => {
      console.log(`Scenario ${scenarioId} processing started`);

      // Simulate completion after 10 seconds
      setTimeout(() => {
        console.log(`Scenario ${scenarioId} processing completed`);
      }, 10000);
    }, 1000);

    return NextResponse.json({
      id: scenarioId,
      status: 'building',
      message: 'Scenario creation initiated',
    });
  } catch (error) {
    console.error('Error creating scenario:', error);
    return NextResponse.json(
      { error: 'Failed to create scenario' },
      { status: 500 }
    );
  }
}
