import 'server-only';
import { GoogleGenerativeAI, SchemaType, type Schema } from '@google/generative-ai';
import type { Product, AIAnalysis } from './types';

// Initialize Gemini with server-side API key (SECURE)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Response schema for structured output
const analysisSchema: Schema = {
  type: SchemaType.OBJECT,
  properties: {
    matchScore: { type: SchemaType.NUMBER },
    summary: { type: SchemaType.STRING },
    keyIngredients: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          name: { type: SchemaType.STRING },
          benefit: { type: SchemaType.STRING },
          isKeyActive: { type: SchemaType.BOOLEAN }
        },
        required: ['name', 'benefit', 'isKeyActive']
      }
    },
    priceAnalysis: { type: SchemaType.STRING },
    verdict: {
      type: SchemaType.STRING,
      format: 'enum',
      enum: ['Excellent Value', 'Premium Choice', 'Fair Price', 'Overpriced']
    }
  },
  required: ['matchScore', 'summary', 'keyIngredients', 'priceAnalysis', 'verdict']
};

/**
 * Compare two cosmetic products using AI analysis
 */
export async function compareProducts(source: Product, target: Product): Promise<AIAnalysis> {
  const model = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash',
    generationConfig: {
      responseMimeType: 'application/json',
      responseSchema: analysisSchema
    }
  });

  const prompt = `
You are an expert cosmetic chemist and dermatologist. Compare these two cosmetic products based on their ingredients and pricing.

Product 1 (Reference/High-end): ${source.brand} - ${source.name}
Price: $${source.price}
Size: ${source.size}
Category: ${source.category}
Ingredients: ${source.ingredients.join(', ')}

Product 2 (Candidate/Alternative): ${target.brand} - ${target.name}
Price: $${target.price}
Size: ${target.size}
Category: ${target.category}
Ingredients: ${target.ingredients.join(', ')}

Analyze:
1. How close is Product 2 to being a functional "dupe" for Product 1?
2. Compare the functional efficacy of key active ingredients
3. Consider price per ml/g value
4. Identify which ingredients are key actives vs supporting ingredients

Provide:
- matchScore (0-100): How similar are the products in terms of expected results
- summary: A 2-3 sentence scientific explanation of the comparison
- keyIngredients: Array of the most important shared or comparable ingredients
- priceAnalysis: Brief analysis of the price-to-value ratio
- verdict: One of "Excellent Value", "Premium Choice", "Fair Price", or "Overpriced"
`;

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();

  return JSON.parse(text) as AIAnalysis;
}

/**
 * Analyze ingredient safety and efficacy
 */
export async function analyzeIngredientSafety(ingredients: string[]): Promise<string> {
  const model = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash'
  });

  const prompt = `
You are an expert cosmetic chemist and dermatologist. Analyze this ingredient list for a skincare product.

Ingredients: ${ingredients.join(', ')}

Provide a comprehensive safety and efficacy report in markdown format:

## Overall Assessment
Brief 1-2 sentence summary

## Key Active Ingredients
List the main functional ingredients and their benefits

## Potential Concerns
- Any ingredients that may cause irritation for sensitive skin
- Any controversial or potentially problematic ingredients
- Any ingredient interactions to be aware of

## Skin Type Suitability
Who is this product best suited for?

## Efficacy Rating
Rate the expected efficacy for its category (1-10) and explain why

Keep the analysis professional, evidence-based, and helpful for consumers making informed decisions.
`;

  const result = await model.generateContent(prompt);
  const response = result.response;
  return response.text();
}
