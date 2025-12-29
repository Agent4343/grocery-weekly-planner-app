"use client";

import { useState, useCallback, useEffect } from 'react';
import { 
  AIHealthPlannerService, 
  HealthProfile, 
  SaleItem, 
  HealthRecommendation, 
  AIAnalysisResult 
} from '@/lib/ai-health-planner';

export const useAIHealthPlanner = () => {
  const [aiService] = useState(() => AIHealthPlannerService.getInstance());
  const [isLoading, setIsLoading] = useState(false);
  const [currentSales, setCurrentSales] = useState<SaleItem[]>([]);
  const [healthRecommendations, setHealthRecommendations] = useState<HealthRecommendation[]>([]);
  const [optimizedPlan, setOptimizedPlan] = useState<AIAnalysisResult | null>(null);
  const [userProfile, setUserProfile] = useState<HealthProfile | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Load current sales on mount
  useEffect(() => {
    loadCurrentSales();
  }, []);

  const loadCurrentSales = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const sales = await aiService.getCurrentSales();
      setCurrentSales(sales);
    } catch (err) {
      setError('Failed to load current sales');
      console.error('Error loading sales:', err);
    } finally {
      setIsLoading(false);
    }
  }, [aiService]);

  const analyzeHealthProfile = useCallback(async (profile: HealthProfile) => {
    try {
      setIsLoading(true);
      setError(null);
      const recommendations = await aiService.analyzeHealthProfile(profile);
      setHealthRecommendations(recommendations);
      setUserProfile(profile);
      return recommendations;
    } catch (err) {
      setError('Failed to analyze health profile');
      console.error('Error analyzing profile:', err);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [aiService]);

  const generateOptimizedMealPlan = useCallback(async (
    profile: HealthProfile,
    preferences: {
      budget?: number;
      cookingTime?: number;
      servings?: number;
      preferredStores?: string[];
    } = {}
  ) => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await aiService.generateOptimizedMealPlan(profile, currentSales, preferences);
      setOptimizedPlan(result);
      return result;
    } catch (err) {
      setError('Failed to generate meal plan');
      console.error('Error generating meal plan:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [aiService, currentSales]);

  const analyzeNutritionalNeeds = useCallback(async (profile: HealthProfile) => {
    try {
      setIsLoading(true);
      setError(null);
      const analysis = await aiService.analyzeNutritionalNeeds(profile);
      return analysis;
    } catch (err) {
      setError('Failed to analyze nutritional needs');
      console.error('Error analyzing nutrition:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [aiService]);

  const refreshSales = useCallback(async () => {
    await loadCurrentSales();
  }, [loadCurrentSales]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const resetAnalysis = useCallback(() => {
    setHealthRecommendations([]);
    setOptimizedPlan(null);
    setUserProfile(null);
    setError(null);
  }, []);

  // Get sales by store type
  const getSalesByStore = useCallback((storeType: 'sobeys' | 'dominion' | 'costco') => {
    return currentSales.filter(sale => sale.storeType === storeType);
  }, [currentSales]);

  // Get flash sales
  const getFlashSales = useCallback(() => {
    return currentSales.filter(sale => sale.isFlashSale);
  }, [currentSales]);

  // Get best deals (highest discount percentage)
  const getBestDeals = useCallback((limit: number = 5) => {
    return [...currentSales]
      .sort((a, b) => b.discountPercentage - a.discountPercentage)
      .slice(0, limit);
  }, [currentSales]);

  // Calculate total potential savings
  const getTotalSavings = useCallback(() => {
    return currentSales.reduce((total, sale) => {
      return total + (sale.originalPrice - sale.salePrice);
    }, 0);
  }, [currentSales]);

  // Get recommendations by priority
  const getRecommendationsByPriority = useCallback((priority: 'high' | 'medium' | 'low') => {
    return healthRecommendations.filter(rec => rec.priority === priority);
  }, [healthRecommendations]);

  // Get recommendations by type
  const getRecommendationsByType = useCallback((type: 'ingredient' | 'recipe' | 'meal_plan' | 'nutrition_tip') => {
    return healthRecommendations.filter(rec => rec.type === type);
  }, [healthRecommendations]);

  return {
    // State
    isLoading,
    currentSales,
    healthRecommendations,
    optimizedPlan,
    userProfile,
    error,

    // Actions
    analyzeHealthProfile,
    generateOptimizedMealPlan,
    analyzeNutritionalNeeds,
    refreshSales,
    clearError,
    resetAnalysis,

    // Computed values
    getSalesByStore,
    getFlashSales,
    getBestDeals,
    getTotalSavings,
    getRecommendationsByPriority,
    getRecommendationsByType,

    // Stats
    totalSales: currentSales.length,
    flashSalesCount: currentSales.filter(sale => sale.isFlashSale).length,
    averageDiscount: currentSales.length > 0 
      ? Math.round(currentSales.reduce((sum, sale) => sum + sale.discountPercentage, 0) / currentSales.length)
      : 0,
    highPriorityRecommendations: healthRecommendations.filter(rec => rec.priority === 'high').length
  };
};