import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { analyzeIngredientSafety } from '@/lib/gemini';

// Validation schema
const SafetyAuditRequestSchema = z.object({
  ingredients: z.array(z.string()).min(1).max(100)
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const parsed = SafetyAuditRequestSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid request body',
            details: parsed.error.issues
          }
        },
        { status: 400 }
      );
    }

    const { ingredients } = parsed.data;
    const report = await analyzeIngredientSafety(ingredients);

    return NextResponse.json({
      success: true,
      data: { report }
    });
  } catch (error) {
    console.error('Safety audit error:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'AI_ERROR',
          message: 'Failed to analyze ingredients. Please try again.'
        }
      },
      { status: 500 }
    );
  }
}
