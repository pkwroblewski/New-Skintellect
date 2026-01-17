'use client';

import { useMemo, useState, useCallback } from 'react';
import { MOCK_PRODUCTS } from '@/lib/products';
import type { Product } from '@/lib/types';

interface UseProductsReturn {
  products: Product[];
  filteredProducts: Product[];
  searchQuery: string;
  targetIngredients: string[];
  setSearchQuery: (query: string) => void;
  addIngredient: (ingredient: string) => void;
  removeIngredient: (ingredient: string) => void;
  clearFilters: () => void;
  getProductById: (id: string) => Product | undefined;
}

export function useProducts(): UseProductsReturn {
  const [searchQuery, setSearchQuery] = useState('');
  const [targetIngredients, setTargetIngredients] = useState<string[]>([]);

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter(p => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesIngredients =
        targetIngredients.length === 0 ||
        targetIngredients.every(ing =>
          p.ingredients.some(pi => pi.toLowerCase().includes(ing.toLowerCase()))
        );

      return matchesSearch && matchesIngredients;
    });
  }, [searchQuery, targetIngredients]);

  const addIngredient = useCallback((ingredient: string) => {
    const trimmed = ingredient.trim();
    if (trimmed && !targetIngredients.includes(trimmed)) {
      setTargetIngredients(prev => [...prev, trimmed]);
    }
  }, [targetIngredients]);

  const removeIngredient = useCallback((ingredient: string) => {
    setTargetIngredients(prev => prev.filter(t => t !== ingredient));
  }, []);

  const clearFilters = useCallback(() => {
    setSearchQuery('');
    setTargetIngredients([]);
  }, []);

  const getProductById = useCallback((id: string) => {
    return MOCK_PRODUCTS.find(p => p.id === id);
  }, []);

  return {
    products: MOCK_PRODUCTS,
    filteredProducts,
    searchQuery,
    targetIngredients,
    setSearchQuery,
    addIngredient,
    removeIngredient,
    clearFilters,
    getProductById
  };
}
