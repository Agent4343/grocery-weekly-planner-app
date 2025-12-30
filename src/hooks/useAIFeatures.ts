"use client";

import { useState, useEffect, useCallback } from 'react';
import { 
  SaleDetectionService, 
  HealthAIService, 
  SmartShoppingService,
  SaleItem,
  HealthProfile,
  HealthRecommendation,
  NutritionAnalysis
} from '@/lib/ai-services';

// Hook for sale detection and tracking
export const useSaleDetection = () => {
  const [sales, setSales] = useState<SaleItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSales = useCallback(async (storeType?: string) => {
    setLoading(true);
    setError(null);
    try {
      const salesData = await SaleDetectionService.getCurrentSales(storeType);
      setSales(salesData);
    } catch (err) {
      setError('Failed to fetch sales data');
      console.error('Sales fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const getSalesForIngredients = useCallback(async (ingredientIds: string[]) => {
    setLoading(true);
    try {
      const salesData = await SaleDetectionService.getSalesForIngredients(ingredientIds);
      return salesData;
    } catch (err) {
      setError('Failed to fetch ingredient sales');
      console.error('Ingredient sales error:', err);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const analyzeSaleTrends = useCallback(async (ingredientId: string) => {
    try {
      return await SaleDetectionService.analyzeSaleTrends(ingredientId);
    } catch (err) {
      setError('Failed to analyze sale trends');
      console.error('Analyze sale trends error:', err);
      return null;
    }
  }, []);

  // Auto-fetch sales on mount
  useEffect(() => {
    fetchSales();
  }, [fetchSales]);

  return {
    sales,
    loading,
    error,
    fetchSales,
    getSalesForIngredients,
    analyzeSaleTrends
  };
};

// Hook for health AI recommendations
export const useHealthAI = () => {
  const [healthProfile, setHealthProfile] = useState<HealthProfile | null>(null);
  const [recommendations, setRecommendations] = useState<HealthRecommendation[]>([]);
  const [nutritionAnalysis, setNutritionAnalysis] = useState<NutritionAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateHealthProfile = useCallback((profile: HealthProfile) => {
    setHealthProfile(profile);
    localStorage.setItem('healthProfile', JSON.stringify(profile));
  }, []);

  const analyzeNutrition = useCallback(async (recipes: any[]) => {
    setLoading(true);
    setError(null);
    try {
      const analysis = await HealthAIService.analyzeNutrition(recipes);
      setNutritionAnalysis(analysis);
      return analysis;
    } catch (err) {
      setError('Failed to analyze nutrition');
      console.error('Analyze nutrition error:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const generateRecommendations = useCallback(async (currentMeals: any[]) => {
    if (!healthProfile) return;
    
    setLoading(true);
    try {
      const recs = await HealthAIService.generateHealthRecommendations(healthProfile, currentMeals);
      setRecommendations(recs);
      return recs;
    } catch (err) {
      setError('Failed to generate recommendations');
      console.error('Generate recommendations error:', err);
      return [];
    } finally {
      setLoading(false);
    }
  }, [healthProfile]);

  const optimizeMealPlan = useCallback(async (
    availableIngredients: string[],
    salesData: SaleItem[]
  ) => {
    if (!healthProfile) return null;
    
    setLoading(true);
    try {
      return await HealthAIService.optimizeMealPlan(healthProfile, availableIngredients, salesData);
    } catch (err) {
      setError('Failed to optimize meal plan');
      console.error('Optimize meal plan error:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [healthProfile]);

  const getPersonalizedTips = useCallback(async () => {
    if (!healthProfile) return [];
    
    try {
      return await HealthAIService.getPersonalizedTips(healthProfile);
    } catch (err) {
      setError('Failed to get personalized tips');
      console.error('Get personalized tips error:', err);
      return [];
    }
  }, [healthProfile]);

  // Load health profile from localStorage on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('healthProfile');
    if (savedProfile) {
      try {
        setHealthProfile(JSON.parse(savedProfile));
      } catch (err) {
        console.error('Failed to load health profile:', err);
      }
    }
  }, []);

  return {
    healthProfile,
    recommendations,
    nutritionAnalysis,
    loading,
    error,
    updateHealthProfile,
    analyzeNutrition,
    generateRecommendations,
    optimizeMealPlan,
    getPersonalizedTips
  };
};

// Hook for smart shopping optimization
export const useSmartShopping = () => {
  const [optimizedRoute, setOptimizedRoute] = useState<any>(null);
  const [pricePredicitions, setPricePredictions] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const optimizeShoppingRoute = useCallback(async (
    shoppingList: any[],
    selectedStores: string[],
    salesData: SaleItem[]
  ) => {
    setLoading(true);
    setError(null);
    try {
      const route = await SmartShoppingService.optimizeShoppingRoute(
        shoppingList,
        selectedStores,
        salesData
      );
      setOptimizedRoute(route);
      return route;
    } catch (err) {
      setError('Failed to optimize shopping route');
      console.error('Optimize shopping route error:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const predictPriceChanges = useCallback(async (ingredientIds: string[]) => {
    setLoading(true);
    try {
      const predictions = await SmartShoppingService.predictPriceChanges(ingredientIds);
      setPricePredictions(predictions);
      return predictions;
    } catch (err) {
      setError('Failed to predict price changes');
      console.error('Predict price changes error:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    optimizedRoute,
    pricePredicitions,
    loading,
    error,
    optimizeShoppingRoute,
    predictPriceChanges
  };
};

// Combined hook for all AI features
export const useAIGroceryPlanner = () => {
  const saleDetection = useSaleDetection();
  const healthAI = useHealthAI();
  const smartShopping = useSmartShopping();

  const [aiInsights, setAiInsights] = useState<{
    totalSavings: number;
    healthScore: number;
    topRecommendations: string[];
    saleAlerts: number;
  }>({
    totalSavings: 0,
    healthScore: 0,
    topRecommendations: [],
    saleAlerts: 0
  });

  // Calculate AI insights when data changes
  useEffect(() => {
    const calculateInsights = () => {
      const totalSavings = saleDetection.sales.reduce((sum, sale) => {
        return sum + (sale.originalPrice - sale.salePrice);
      }, 0);

      const healthScore = healthAI.nutritionAnalysis?.healthScore || 0;
      
      const topRecommendations = healthAI.recommendations
        .filter(rec => rec.priority === 'high')
        .slice(0, 3)
        .map(rec => rec.title);

      const saleAlerts = saleDetection.sales.filter(sale => 
        sale.discountPercentage >= 25
      ).length;

      setAiInsights({
        totalSavings,
        healthScore,
        topRecommendations,
        saleAlerts
      });
    };

    calculateInsights();
  }, [saleDetection.sales, healthAI.nutritionAnalysis, healthAI.recommendations]);

  return {
    saleDetection,
    healthAI,
    smartShopping,
    aiInsights
  };
};