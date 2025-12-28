import React, { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { Product, AIAnalysis } from '@/types';
import { analyzeProductComparison, getIngredientSafetyReport } from '@/services/api';

interface ComparisonContextType {
  comparisonList: Product[];
  selectedProduct: Product | null;
  comparisonTarget: Product | null;
  analysis: AIAnalysis | null;
  isLoading: boolean;
  pendingProductIds: Set<string>;
  auditProduct: Product | null;
  safetyReport: string | null;
  addToComparison: (product: Product) => void;
  removeFromComparison: (productId: string) => void;
  toggleProductInComparison: (product: Product) => void;
  runComparison: (p1: Product, p2: Product) => Promise<void>;
  runSafetyAudit: (product: Product) => Promise<void>;
  resetComparison: () => void;
  closeSafetyModal: () => void;
  isInComparison: (productId: string) => boolean;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

export const ComparisonProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [comparisonList, setComparisonList] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [comparisonTarget, setComparisonTarget] = useState<Product | null>(null);
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pendingProductIds, setPendingProductIds] = useState<Set<string>>(new Set());
  const [auditProduct, setAuditProduct] = useState<Product | null>(null);
  const [safetyReport, setSafetyReport] = useState<string | null>(null);

  const addToComparison = useCallback((product: Product) => {
    setComparisonList(prev => {
      if (prev.find(p => p.id === product.id)) return prev;
      if (prev.length >= 2) return prev;
      return [...prev, product];
    });
  }, []);

  const removeFromComparison = useCallback((productId: string) => {
    setComparisonList(prev => prev.filter(p => p.id !== productId));
  }, []);

  const toggleProductInComparison = useCallback((product: Product) => {
    setComparisonList(prev => {
      const isAlreadyAdded = prev.find(p => p.id === product.id);
      if (isAlreadyAdded) {
        return prev.filter(p => p.id !== product.id);
      }
      if (prev.length >= 2) return prev;
      return [...prev, product];
    });
  }, []);

  const isInComparison = useCallback((productId: string) => {
    return comparisonList.some(p => p.id === productId);
  }, [comparisonList]);

  const runComparison = useCallback(async (p1: Product, p2: Product) => {
    setIsLoading(true);
    setPendingProductIds(new Set([p1.id, p2.id]));
    setSelectedProduct(p1);
    setComparisonTarget(p2);

    try {
      const result = await analyzeProductComparison(p1, p2);
      setAnalysis(result);
    } catch (error) {
      console.error('Analysis failed', error);
      throw error;
    } finally {
      setIsLoading(false);
      setPendingProductIds(new Set());
    }
  }, []);

  const runSafetyAudit = useCallback(async (product: Product) => {
    setIsLoading(true);
    setPendingProductIds(prev => new Set([...prev, product.id]));

    try {
      const report = await getIngredientSafetyReport(product.ingredients);
      setAuditProduct(product);
      setSafetyReport(report);
    } catch (error) {
      console.error('Safety audit failed', error);
      throw error;
    } finally {
      setIsLoading(false);
      setPendingProductIds(prev => {
        const next = new Set(prev);
        next.delete(product.id);
        return next;
      });
    }
  }, []);

  const resetComparison = useCallback(() => {
    setComparisonTarget(null);
    setAnalysis(null);
    setComparisonList([]);
    setSelectedProduct(null);
  }, []);

  const closeSafetyModal = useCallback(() => {
    setAuditProduct(null);
    setSafetyReport(null);
  }, []);

  return (
    <ComparisonContext.Provider
      value={{
        comparisonList,
        selectedProduct,
        comparisonTarget,
        analysis,
        isLoading,
        pendingProductIds,
        auditProduct,
        safetyReport,
        addToComparison,
        removeFromComparison,
        toggleProductInComparison,
        runComparison,
        runSafetyAudit,
        resetComparison,
        closeSafetyModal,
        isInComparison
      }}
    >
      {children}
    </ComparisonContext.Provider>
  );
};

export function useComparison(): ComparisonContextType {
  const context = useContext(ComparisonContext);
  if (context === undefined) {
    throw new Error('useComparison must be used within a ComparisonProvider');
  }
  return context;
}
