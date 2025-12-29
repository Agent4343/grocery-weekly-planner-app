"use client";

import { useState, useCallback, useEffect } from 'react';
import { Recipe } from '@/lib/recipes';

export interface MealPlan {
  id: string;
  date: string;
  mealType: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks';
  recipe?: Recipe;
  servings?: number;
  notes?: string;
}

export interface WeeklyMealPlan {
  weekStartDate: string;
  meals: MealPlan[];
}

// Get a stable initial date to avoid hydration mismatch
function getInitialWeekStart(): string {
  // Use a fixed date for initial render, will be updated on client
  return "2024-12-23"; // Monday
}

export const useMealPlanner = () => {
  const [currentWeek, setCurrentWeek] = useState<WeeklyMealPlan>({
    weekStartDate: getInitialWeekStart(),
    meals: []
  });

  const [selectedDate, setSelectedDate] = useState<string>(getInitialWeekStart());

  // Set the actual current week only on client to avoid hydration mismatch
  useEffect(() => {
    const now = new Date();
    setCurrentWeek(prev => ({
      ...prev,
      weekStartDate: getWeekStartDate(now)
    }));
    setSelectedDate(now.toISOString().split('T')[0]);
  }, []);

  // Add a meal to the plan
  const addMeal = useCallback((meal: Omit<MealPlan, 'id'>) => {
    const newMeal: MealPlan = {
      ...meal,
      id: generateMealId(meal.date, meal.mealType)
    };

    setCurrentWeek(prev => ({
      ...prev,
      meals: [...prev.meals.filter(m => m.id !== newMeal.id), newMeal]
    }));
  }, []);

  // Remove a meal from the plan
  const removeMeal = useCallback((mealId: string) => {
    setCurrentWeek(prev => ({
      ...prev,
      meals: prev.meals.filter(meal => meal.id !== mealId)
    }));
  }, []);

  // Update a meal in the plan
  const updateMeal = useCallback((mealId: string, updates: Partial<MealPlan>) => {
    setCurrentWeek(prev => ({
      ...prev,
      meals: prev.meals.map(meal =>
        meal.id === mealId ? { ...meal, ...updates } : meal
      )
    }));
  }, []);

  // Get meals for a specific date
  const getMealsForDate = useCallback((date: string) => {
    return currentWeek.meals.filter(meal => meal.date === date);
  }, [currentWeek.meals]);

  // Get meal for specific date and meal type
  const getMeal = useCallback((date: string, mealType: MealPlan['mealType']) => {
    return currentWeek.meals.find(meal => 
      meal.date === date && meal.mealType === mealType
    );
  }, [currentWeek.meals]);

  // Navigate to different week
  const navigateWeek = useCallback((direction: 'prev' | 'next') => {
    const currentStart = new Date(currentWeek.weekStartDate);
    const newStart = new Date(currentStart);
    
    if (direction === 'prev') {
      newStart.setDate(currentStart.getDate() - 7);
    } else {
      newStart.setDate(currentStart.getDate() + 7);
    }

    setCurrentWeek(prev => ({
      ...prev,
      weekStartDate: getWeekStartDate(newStart)
    }));
  }, [currentWeek.weekStartDate]);

  // Get all unique recipes from the current week
  const getWeeklyRecipes = useCallback(() => {
    const recipes = currentWeek.meals
      .filter(meal => meal.recipe)
      .map(meal => meal.recipe!);
    
    // Remove duplicates
    return recipes.filter((recipe, index, self) =>
      index === self.findIndex(r => r.id === recipe.id)
    );
  }, [currentWeek.meals]);

  // Get week dates array
  const getWeekDates = useCallback(() => {
    const startDate = new Date(currentWeek.weekStartDate);
    const dates = [];
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    
    return dates;
  }, [currentWeek.weekStartDate]);

  // Get meal statistics
  const getMealStats = useCallback(() => {
    const totalMeals = currentWeek.meals.length;
    const plannedMeals = currentWeek.meals.filter(meal => meal.recipe).length;
    const totalServings = currentWeek.meals.reduce((sum, meal) => 
      sum + (meal.servings || 0), 0
    );

    return {
      totalMeals,
      plannedMeals,
      emptySlots: 28 - totalMeals, // 7 days × 4 meal types
      totalServings,
      completionRate: totalMeals > 0 ? (plannedMeals / totalMeals) * 100 : 0
    };
  }, [currentWeek.meals]);

  // Clear all meals for the week
  const clearWeek = useCallback(() => {
    setCurrentWeek(prev => ({
      ...prev,
      meals: []
    }));
  }, []);

  // Duplicate a meal to another date/time
  const duplicateMeal = useCallback((mealId: string, newDate: string, newMealType: MealPlan['mealType']) => {
    const originalMeal = currentWeek.meals.find(meal => meal.id === mealId);
    if (originalMeal) {
      addMeal({
        date: newDate,
        mealType: newMealType,
        recipe: originalMeal.recipe,
        servings: originalMeal.servings,
        notes: originalMeal.notes
      });
    }
  }, [currentWeek.meals, addMeal]);

  return {
    currentWeek,
    selectedDate,
    setSelectedDate,
    addMeal,
    removeMeal,
    updateMeal,
    getMealsForDate,
    getMeal,
    navigateWeek,
    getWeeklyRecipes,
    getWeekDates,
    getMealStats,
    clearWeek,
    duplicateMeal
  };
};

// Helper functions
function getWeekStartDate(date: Date): string {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day; // Adjust to get Monday as start of week
  const monday = new Date(d.setDate(diff));
  return monday.toISOString().split('T')[0];
}

function generateMealId(date: string, mealType: string): string {
  return `${date}-${mealType.toLowerCase()}`;
}