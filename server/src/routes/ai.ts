import { Router } from 'express';
import { z } from 'zod';
import { compareProducts, analyzeIngredientSafety } from '../services/gemini.js';

export const aiRouter = Router();

// Validation schemas
const ProductSchema = z.object({
  id: z.string(),
  brand: z.string(),
  name: z.string(),
  category: z.string(),
  price: z.number(),
  ingredients: z.array(z.string()),
  imageUrl: z.string(),
  rating: z.number(),
  size: z.string(),
  description: z.string()
});

const CompareRequestSchema = z.object({
  source: ProductSchema,
  target: ProductSchema
});

const SafetyAuditRequestSchema = z.object({
  ingredients: z.array(z.string()).min(1).max(100)
});

// POST /api/ai/compare - Compare two products
aiRouter.post('/compare', async (req, res) => {
  try {
    // Validate request body
    const parsed = CompareRequestSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid request body',
          details: parsed.error.issues
        }
      });
    }

    const { source, target } = parsed.data;
    const analysis = await compareProducts(source, target);

    return res.json({
      success: true,
      data: analysis
    });
  } catch (error) {
    console.error('Compare error:', error);
    return res.status(500).json({
      success: false,
      error: {
        code: 'AI_ERROR',
        message: 'Failed to analyze products. Please try again.'
      }
    });
  }
});

// POST /api/ai/safety-audit - Analyze ingredient safety
aiRouter.post('/safety-audit', async (req, res) => {
  try {
    // Validate request body
    const parsed = SafetyAuditRequestSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid request body',
          details: parsed.error.issues
        }
      });
    }

    const { ingredients } = parsed.data;
    const report = await analyzeIngredientSafety(ingredients);

    return res.json({
      success: true,
      data: { report }
    });
  } catch (error) {
    console.error('Safety audit error:', error);
    return res.status(500).json({
      success: false,
      error: {
        code: 'AI_ERROR',
        message: 'Failed to analyze ingredients. Please try again.'
      }
    });
  }
});
