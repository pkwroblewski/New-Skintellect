import type { Product, AIAnalysis } from '@/types';

const API_BASE = '/api';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
}

class ApiError extends Error {
  code: string;

  constructor(code: string, message: string) {
    super(message);
    this.code = code;
    this.name = 'ApiError';
  }
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE}${endpoint}`;

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  const json: ApiResponse<T> = await response.json();

  if (!response.ok || !json.success) {
    throw new ApiError(
      json.error?.code || 'UNKNOWN_ERROR',
      json.error?.message || 'An unexpected error occurred'
    );
  }

  return json.data as T;
}

/**
 * Compare two products using AI analysis
 * API key is securely stored on the server
 */
export async function analyzeProductComparison(
  source: Product,
  target: Product
): Promise<AIAnalysis> {
  return request<AIAnalysis>('/ai/compare', {
    method: 'POST',
    body: JSON.stringify({ source, target }),
  });
}

/**
 * Get ingredient safety report
 * API key is securely stored on the server
 */
export async function getIngredientSafetyReport(
  ingredients: string[]
): Promise<string> {
  const response = await request<{ report: string }>('/ai/safety-audit', {
    method: 'POST',
    body: JSON.stringify({ ingredients }),
  });
  return response.report;
}

/**
 * Health check for the API
 */
export async function checkApiHealth(): Promise<boolean> {
  try {
    await request<{ status: string }>('/health');
    return true;
  } catch {
    return false;
  }
}

export { ApiError };
