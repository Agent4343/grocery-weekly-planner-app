"use client";

import { useState, useEffect, useCallback } from 'react';
import {
  Newsletter,
  NewsletterPreferences,
  DEFAULT_NEWSLETTER_PREFERENCES,
  GenerateNewsletterRequest,
} from '@/lib/newsletter-types';
import {
  generateNewsletter,
  getNewsletters,
  getNewsletterById,
  deleteNewsletter as deleteNewsletterFromStorage,
  clearNewsletters,
} from '@/lib/newsletter-generator';

const NEWSLETTER_PREFS_KEY = 'nl-newsletter-preferences';

export interface UseNewsletterState {
  currentNewsletter: Newsletter | null;
  newsletters: Newsletter[];
  preferences: NewsletterPreferences;
  isLoading: boolean;
  isGenerating: boolean;
  error: string | null;
}

export function useNewsletter() {
  const [currentNewsletter, setCurrentNewsletter] = useState<Newsletter | null>(null);
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [preferences, setPreferences] = useState<NewsletterPreferences>(DEFAULT_NEWSLETTER_PREFERENCES);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load newsletters and preferences from localStorage
  useEffect(() => {
    try {
      // Load newsletters
      const storedNewsletters = getNewsletters();
      setNewsletters(storedNewsletters);

      // Set current to most recent
      if (storedNewsletters.length > 0) {
        setCurrentNewsletter(storedNewsletters[0]);
      }

      // Load preferences
      const storedPrefs = localStorage.getItem(NEWSLETTER_PREFS_KEY);
      if (storedPrefs) {
        const parsedPrefs = JSON.parse(storedPrefs) as NewsletterPreferences;
        setPreferences({ ...DEFAULT_NEWSLETTER_PREFERENCES, ...parsedPrefs });
      }
    } catch (err) {
      console.error('Error loading newsletter data:', err);
      setError('Failed to load newsletter data');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save preferences to localStorage
  const savePreferences = useCallback((newPrefs: Partial<NewsletterPreferences>) => {
    try {
      const updated = { ...preferences, ...newPrefs };
      localStorage.setItem(NEWSLETTER_PREFS_KEY, JSON.stringify(updated));
      setPreferences(updated);
    } catch (err) {
      console.error('Error saving preferences:', err);
      setError('Failed to save preferences');
    }
  }, [preferences]);

  // Generate a new newsletter
  const generate = useCallback(async (request?: GenerateNewsletterRequest) => {
    setIsGenerating(true);
    setError(null);

    try {
      const newsletter = await generateNewsletter({
        frequency: request?.frequency || preferences.frequency,
        storeIds: request?.storeIds || preferences.preferredStores,
        focusCategories: request?.focusCategories || preferences.preferredCategories,
        includeRecipes: request?.includeRecipes ?? preferences.includeRecipes,
        customGreeting: request?.customGreeting,
        customClosing: request?.customClosing,
        aiEnhancements: request?.aiEnhancements,
      });

      // Refresh newsletters list
      const updatedNewsletters = getNewsletters();
      setNewsletters(updatedNewsletters);
      setCurrentNewsletter(newsletter);

      return newsletter;
    } catch (err) {
      console.error('Error generating newsletter:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate newsletter';
      setError(errorMessage);
      throw err;
    } finally {
      setIsGenerating(false);
    }
  }, [preferences]);

  // Generate newsletter via API (for AI agents)
  const generateViaAPI = useCallback(async (request?: GenerateNewsletterRequest) => {
    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          frequency: request?.frequency || preferences.frequency,
          storeIds: request?.storeIds || preferences.preferredStores,
          focusCategories: request?.focusCategories || preferences.preferredCategories,
          includeRecipes: request?.includeRecipes ?? preferences.includeRecipes,
          customGreeting: request?.customGreeting,
          customClosing: request?.customClosing,
          aiEnhancements: request?.aiEnhancements,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to generate newsletter');
      }

      // Refresh newsletters list
      const updatedNewsletters = getNewsletters();
      setNewsletters(updatedNewsletters);
      setCurrentNewsletter(data.newsletter);

      return data.newsletter as Newsletter;
    } catch (err) {
      console.error('Error generating newsletter via API:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate newsletter';
      setError(errorMessage);
      throw err;
    } finally {
      setIsGenerating(false);
    }
  }, [preferences]);

  // Select a specific newsletter
  const selectNewsletter = useCallback((id: string) => {
    const newsletter = getNewsletterById(id);
    if (newsletter) {
      setCurrentNewsletter(newsletter);
    } else {
      setError('Newsletter not found');
    }
  }, []);

  // Delete a newsletter
  const deleteNewsletter = useCallback((id: string) => {
    const deleted = deleteNewsletterFromStorage(id);
    if (deleted) {
      const updatedNewsletters = getNewsletters();
      setNewsletters(updatedNewsletters);

      // If we deleted the current newsletter, select the next one
      if (currentNewsletter?.id === id) {
        setCurrentNewsletter(updatedNewsletters.length > 0 ? updatedNewsletters[0] : null);
      }
    }
    return deleted;
  }, [currentNewsletter]);

  // Clear all newsletters
  const clearAll = useCallback(() => {
    clearNewsletters();
    setNewsletters([]);
    setCurrentNewsletter(null);
  }, []);

  // Get newsletter stats
  const getStats = useCallback(() => {
    return {
      totalNewsletters: newsletters.length,
      latestNewsletter: newsletters.length > 0 ? newsletters[0] : null,
      totalDealsShared: newsletters.reduce((sum, nl) => sum + nl.totalDealsCount, 0),
      totalSavingsShared: newsletters.reduce((sum, nl) => sum + nl.totalPotentialSavings, 0),
    };
  }, [newsletters]);

  // Check if newsletter should be auto-generated (based on frequency)
  const shouldAutoGenerate = useCallback(() => {
    if (newsletters.length === 0) return true;

    const latest = newsletters[0];
    const lastGenerated = new Date(latest.createdAt);
    const now = new Date();

    if (preferences.frequency === 'daily') {
      // Check if it's been more than 24 hours
      const hoursSince = (now.getTime() - lastGenerated.getTime()) / (1000 * 60 * 60);
      return hoursSince >= 24;
    } else {
      // Weekly - check if it's been more than 7 days
      const daysSince = (now.getTime() - lastGenerated.getTime()) / (1000 * 60 * 60 * 24);
      return daysSince >= 7;
    }
  }, [newsletters, preferences.frequency]);

  return {
    // State
    currentNewsletter,
    newsletters,
    preferences,
    isLoading,
    isGenerating,
    error,

    // Actions
    generate,
    generateViaAPI,
    selectNewsletter,
    deleteNewsletter,
    clearAll,
    savePreferences,

    // Utilities
    getStats,
    shouldAutoGenerate,
  };
}
