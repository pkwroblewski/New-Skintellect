import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { compareProducts } from '@/lib/gemini';

// Validation schemas
const ProductSchema = z.object({
  id: z.string(),
  brand: z.string(),
  name: z.string(),
  category: z.string(),
  price: z.number(),
  ingredients: z.array(z.string()),
  imageUrl: z.string(),
  rating: z.number().optional(),
  size: z.string().optional(),
  description: z.string().optional()
});

const CompareRequestSchema = z.object({
  source: ProductSchema,
  target: ProductSchema
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const parsed = CompareRequestSchema.safeParse(body);
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

    const { source, target } = parsed.data;
    const analysis = await compareProducts(source, target);

    return NextResponse.json({
      success: true,
      data: analysis
    });
  } catch (error) {
    console.error('Compare error:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'AI_ERROR',
          message: 'Failed to analyze products. Please try again.'
        }
      },
      { status: 500 }
    );
  }
}
