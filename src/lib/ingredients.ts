import {
  Droplets,
  Zap,
  Wind,
  Shield,
  Sun,
  FlaskConical,
  type LucideIcon
} from 'lucide-react';

export interface IngredientBenefit {
  label: string;
  description: string;
  icon: LucideIcon;
}

const RENEWAL_TERMS = ['retinol', 'peptide', 'retinoid', 'bakuchiol'];
const HYDRATION_TERMS = ['hyaluronic', 'glycerin', 'aloe', 'hydra'];
const BARRIER_TERMS = ['ceramide', 'squalane', 'shea', 'barrier', 'cholesterol'];
const SOOTHING_TERMS = ['oat', 'centella', 'green tea', 'bisabolol', 'niacinamide'];
const PROTECTION_TERMS = ['spf', 'sun', 'avobenzone', 'octisalate', 'homosalate', 'octocrylene'];

function matchesAny(ingredient: string, terms: string[]): boolean {
  const lower = ingredient.toLowerCase();
  return terms.some(term => lower.includes(term));
}

export function getIngredientBenefit(ingredient: string): IngredientBenefit {
  if (matchesAny(ingredient, RENEWAL_TERMS)) {
    return {
      label: 'Renewal',
      description: 'Promotes cell turnover and skin regeneration',
      icon: Zap
    };
  }

  if (matchesAny(ingredient, HYDRATION_TERMS)) {
    return {
      label: 'Hydration',
      description: 'Deeply moisturizes and plumps skin',
      icon: Droplets
    };
  }

  if (matchesAny(ingredient, BARRIER_TERMS)) {
    return {
      label: 'Barrier',
      description: 'Strengthens and protects the skin barrier',
      icon: Shield
    };
  }

  if (matchesAny(ingredient, SOOTHING_TERMS)) {
    return {
      label: 'Soothing',
      description: 'Calms irritation and reduces redness',
      icon: Wind
    };
  }

  if (matchesAny(ingredient, PROTECTION_TERMS)) {
    return {
      label: 'Protection',
      description: 'Shields from UV and environmental damage',
      icon: Sun
    };
  }

  return {
    label: 'Essential',
    description: 'Supports overall skin health',
    icon: FlaskConical
  };
}
