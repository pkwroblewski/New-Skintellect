'use client';

import { create } from 'zustand';
import type { Product, AIAnalysis } from '@/lib/types';
import { analyzeProductComparison, getIngredientSafetyReport } from '@/lib/api';

interface ComparisonState {
  comparisonList: Product[];
  selectedProduct: Product | null;
  comparisonTarget: Product | null;
  analysis: AIAnalysis | null;
  isLoading: boolean;
  pendingProductIds: Set<string>;
  auditProduct: Product | null;
  safetyReport: string | null;
}

interface ComparisonActions {
  addToComparison: (product: Product) => void;
  removeFromComparison: (productId: string) => void;
  toggleProductInComparison: (product: Product) => void;
  runComparison: (p1: Product, p2: Product) => Promise<void>;
  runSafetyAudit: (product: Product) => Promise<void>;
  resetComparison: () => void;
  closeSafetyModal: () => void;
  isInComparison: (productId: string) => boolean;
}

type ComparisonStore = ComparisonState & ComparisonActions;

export const useComparisonStore = create<ComparisonStore>()((set, get) => ({
  comparisonList: [],
  selectedProduct: null,
  comparisonTarget: null,
  analysis: null,
  isLoading: false,
  pendingProductIds: new Set(),
  auditProduct: null,
  safetyReport: null,

  addToComparison: (product) => {
    set((state) => {
      if (state.comparisonList.find(p => p.id === product.id)) return state;
      if (state.comparisonList.length >= 2) return state;
      return { comparisonList: [...state.comparisonList, product] };
    });
  },

  removeFromComparison: (productId) => {
    set((state) => ({
      comparisonList: state.comparisonList.filter(p => p.id !== productId)
    }));
  },

  toggleProductInComparison: (product) => {
    set((state) => {
      const isAlreadyAdded = state.comparisonList.find(p => p.id === product.id);
      if (isAlreadyAdded) {
        return { comparisonList: state.comparisonList.filter(p => p.id !== product.id) };
      }
      if (state.comparisonList.length >= 2) return state;
      return { comparisonList: [...state.comparisonList, product] };
    });
  },

  isInComparison: (productId) => {
    return get().comparisonList.some(p => p.id === productId);
  },

  runComparison: async (p1, p2) => {
    set({
      isLoading: true,
      pendingProductIds: new Set([p1.id, p2.id]),
      selectedProduct: p1,
      comparisonTarget: p2
    });

    try {
      const result = await analyzeProductComparison(p1, p2);
      set({ analysis: result });
    } catch (error) {
      console.error('Analysis failed', error);
      throw error;
    } finally {
      set({ isLoading: false, pendingProductIds: new Set() });
    }
  },

  runSafetyAudit: async (product) => {
    set((state) => ({
      isLoading: true,
      pendingProductIds: new Set([...state.pendingProductIds, product.id])
    }));

    try {
      const report = await getIngredientSafetyReport(product.ingredients);
      set({ auditProduct: product, safetyReport: report });
    } catch (error) {
      console.error('Safety audit failed', error);
      throw error;
    } finally {
      set((state) => {
        const next = new Set(state.pendingProductIds);
        next.delete(product.id);
        return { isLoading: false, pendingProductIds: next };
      });
    }
  },

  resetComparison: () => {
    set({
      comparisonTarget: null,
      analysis: null,
      comparisonList: [],
      selectedProduct: null
    });
  },

  closeSafetyModal: () => {
    set({ auditProduct: null, safetyReport: null });
  }
}));
