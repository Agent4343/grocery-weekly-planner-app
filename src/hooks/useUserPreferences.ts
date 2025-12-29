"use client";

import { useState, useCallback, useEffect } from 'react';
import {
  UserPreferences,
  DEFAULT_USER_PREFERENCES,
  HouseholdMember,
  BudgetLevel,
  CookingSkillLevel,
  MealTimeAvailability,
  MealPreference,
  calculateHouseholdSize,
  generatePreferencesId
} from '@/lib/user-preferences';

const STORAGE_KEY = 'grocery-planner-user-preferences';

export const useUserPreferences = () => {
  const [preferences, setPreferences] = useState<UserPreferences>(DEFAULT_USER_PREFERENCES);
  const [isLoading, setIsLoading] = useState(true);
  const [onboardingStep, setOnboardingStep] = useState(0);

  // Load preferences from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setPreferences(parsed);
        // If onboarding is complete, skip to end
        if (parsed.onboardingComplete) {
          setOnboardingStep(6); // Past all steps
        }
      } else {
        // Initialize with new ID
        setPreferences({
          ...DEFAULT_USER_PREFERENCES,
          id: generatePreferencesId()
        });
      }
    } catch (error) {
      console.error('Error loading preferences:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save preferences to localStorage whenever they change
  const savePreferences = useCallback((newPreferences: UserPreferences) => {
    const updated = {
      ...newPreferences,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setPreferences(updated);
  }, []);

  // Update location
  const updateLocation = useCallback((city: string) => {
    savePreferences({
      ...preferences,
      location: { ...preferences.location, city }
    });
  }, [preferences, savePreferences]);

  // Update selected stores
  const updateSelectedStores = useCallback((storeIds: string[]) => {
    savePreferences({
      ...preferences,
      selectedStores: storeIds
    });
  }, [preferences, savePreferences]);

  // Toggle a store selection
  const toggleStore = useCallback((storeId: string) => {
    const newStores = preferences.selectedStores.includes(storeId)
      ? preferences.selectedStores.filter(id => id !== storeId)
      : [...preferences.selectedStores, storeId];

    savePreferences({
      ...preferences,
      selectedStores: newStores
    });
  }, [preferences, savePreferences]);

  // Update household members
  const updateHouseholdMembers = useCallback((members: HouseholdMember[]) => {
    savePreferences({
      ...preferences,
      household: {
        members,
        totalPeople: calculateHouseholdSize(members)
      }
    });
  }, [preferences, savePreferences]);

  // Update a single household member type count
  const updateMemberCount = useCallback((type: HouseholdMember['type'], count: number) => {
    const existingIndex = preferences.household.members.findIndex(m => m.type === type);
    let newMembers: HouseholdMember[];

    if (existingIndex >= 0) {
      if (count === 0) {
        // Remove this type if count is 0
        newMembers = preferences.household.members.filter(m => m.type !== type);
      } else {
        // Update existing
        newMembers = preferences.household.members.map(m =>
          m.type === type ? { ...m, count } : m
        );
      }
    } else if (count > 0) {
      // Add new member type
      newMembers = [...preferences.household.members, { type, count }];
    } else {
      newMembers = preferences.household.members;
    }

    savePreferences({
      ...preferences,
      household: {
        members: newMembers,
        totalPeople: calculateHouseholdSize(newMembers)
      }
    });
  }, [preferences, savePreferences]);

  // Update allergies
  const updateAllergies = useCallback((allergies: string[]) => {
    savePreferences({
      ...preferences,
      dietaryContext: { ...preferences.dietaryContext, allergies }
    });
  }, [preferences, savePreferences]);

  // Toggle allergy
  const toggleAllergy = useCallback((allergy: string) => {
    const newAllergies = preferences.dietaryContext.allergies.includes(allergy)
      ? preferences.dietaryContext.allergies.filter(a => a !== allergy)
      : [...preferences.dietaryContext.allergies, allergy];

    savePreferences({
      ...preferences,
      dietaryContext: { ...preferences.dietaryContext, allergies: newAllergies }
    });
  }, [preferences, savePreferences]);

  // Update dietary restrictions
  const updateRestrictions = useCallback((restrictions: string[]) => {
    savePreferences({
      ...preferences,
      dietaryContext: { ...preferences.dietaryContext, restrictions }
    });
  }, [preferences, savePreferences]);

  // Toggle restriction
  const toggleRestriction = useCallback((restriction: string) => {
    const newRestrictions = preferences.dietaryContext.restrictions.includes(restriction)
      ? preferences.dietaryContext.restrictions.filter(r => r !== restriction)
      : [...preferences.dietaryContext.restrictions, restriction];

    savePreferences({
      ...preferences,
      dietaryContext: { ...preferences.dietaryContext, restrictions: newRestrictions }
    });
  }, [preferences, savePreferences]);

  // Update budget level
  const updateBudgetLevel = useCallback((budgetLevel: BudgetLevel) => {
    savePreferences({
      ...preferences,
      dietaryContext: { ...preferences.dietaryContext, budgetLevel }
    });
  }, [preferences, savePreferences]);

  // Update cooking skill
  const updateCookingSkill = useCallback((cookingSkill: CookingSkillLevel) => {
    savePreferences({
      ...preferences,
      dietaryContext: { ...preferences.dietaryContext, cookingSkill }
    });
  }, [preferences, savePreferences]);

  // Update time per meal
  const updateTimePerMeal = useCallback((timePerMeal: MealTimeAvailability) => {
    savePreferences({
      ...preferences,
      dietaryContext: { ...preferences.dietaryContext, timePerMeal }
    });
  }, [preferences, savePreferences]);

  // Update meal preferences
  const updateMealPreferences = useCallback((mealPreferences: MealPreference[]) => {
    savePreferences({
      ...preferences,
      mealPreferences
    });
  }, [preferences, savePreferences]);

  // Toggle meal preference
  const toggleMealPreference = useCallback((preference: MealPreference) => {
    const newPreferences = preferences.mealPreferences.includes(preference)
      ? preferences.mealPreferences.filter(p => p !== preference)
      : [...preferences.mealPreferences, preference];

    savePreferences({
      ...preferences,
      mealPreferences: newPreferences
    });
  }, [preferences, savePreferences]);

  // Update auto search deals
  const updateAutoSearchDeals = useCallback((autoSearchDeals: boolean) => {
    savePreferences({
      ...preferences,
      autoSearchDeals
    });
  }, [preferences, savePreferences]);

  // Complete onboarding
  const completeOnboarding = useCallback(() => {
    savePreferences({
      ...preferences,
      onboardingComplete: true
    });
    setOnboardingStep(6);
  }, [preferences, savePreferences]);

  // Reset onboarding
  const resetOnboarding = useCallback(() => {
    savePreferences({
      ...preferences,
      onboardingComplete: false
    });
    setOnboardingStep(0);
  }, [preferences, savePreferences]);

  // Navigate onboarding steps
  const nextStep = useCallback(() => {
    setOnboardingStep(prev => Math.min(prev + 1, 6));
  }, []);

  const previousStep = useCallback(() => {
    setOnboardingStep(prev => Math.max(prev - 1, 0));
  }, []);

  const goToStep = useCallback((step: number) => {
    setOnboardingStep(Math.max(0, Math.min(step, 6)));
  }, []);

  // Clear all preferences
  const clearPreferences = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    const newPrefs = {
      ...DEFAULT_USER_PREFERENCES,
      id: generatePreferencesId()
    };
    setPreferences(newPrefs);
    setOnboardingStep(0);
  }, []);

  // Check if preferences are valid for meal planning
  const isReadyForMealPlanning = useCallback(() => {
    return (
      preferences.onboardingComplete &&
      preferences.location.city !== '' &&
      preferences.selectedStores.length > 0 &&
      preferences.household.totalPeople > 0
    );
  }, [preferences]);

  return {
    // State
    preferences,
    isLoading,
    onboardingStep,
    isOnboardingComplete: preferences.onboardingComplete,

    // Location
    updateLocation,

    // Stores
    updateSelectedStores,
    toggleStore,

    // Household
    updateHouseholdMembers,
    updateMemberCount,

    // Dietary
    updateAllergies,
    toggleAllergy,
    updateRestrictions,
    toggleRestriction,
    updateBudgetLevel,
    updateCookingSkill,
    updateTimePerMeal,

    // Meal preferences
    updateMealPreferences,
    toggleMealPreference,

    // Deals
    updateAutoSearchDeals,

    // Onboarding
    completeOnboarding,
    resetOnboarding,
    nextStep,
    previousStep,
    goToStep,

    // Utils
    clearPreferences,
    isReadyForMealPlanning,
    savePreferences
  };
};
