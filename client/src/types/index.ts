export interface Product {
  id: string;
  brand: string;
  name: string;
  category: string;
  price: number;
  ingredients: string[];
  imageUrl: string;
  rating: number;
  size: string;
  description: string;
}

export interface AIAnalysis {
  matchScore: number;
  summary: string;
  keyIngredients: {
    name: string;
    benefit: string;
    isKeyActive: boolean;
  }[];
  priceAnalysis: string;
  verdict: 'Excellent Value' | 'Premium Choice' | 'Fair Price' | 'Overpriced';
}

export interface ComparisonResult {
  sourceProduct: Product;
  targetProduct: Product;
  analysis: AIAnalysis;
}

export type AppRoute = 'home' | 'search' | 'compare' | 'product';
