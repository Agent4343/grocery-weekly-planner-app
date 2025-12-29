"use client";

import { useState, useEffect, useCallback } from 'react';
import { DealItem } from '@/lib/meal-planning-ai';

const DEALS_STORAGE_KEY = 'nl-grocery-deals';
const FETCH_TIME_KEY = 'nl-grocery-deals-fetched-at';

export interface DealsManagerState {
  deals: DealItem[];
  isLoading: boolean;
  lastFetchedAt: string | null;
}

export function useDealsManager() {
  const [deals, setDeals] = useState<DealItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastFetchedAt, setLastFetchedAt] = useState<string | null>(null);

  // Load deals from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(DEALS_STORAGE_KEY);
      const fetchedAt = localStorage.getItem(FETCH_TIME_KEY);

      if (stored) {
        const parsedDeals = JSON.parse(stored) as DealItem[];
        // Filter out expired deals
        const now = new Date();
        const validDeals = parsedDeals.filter(deal =>
          new Date(deal.validUntil) >= now
        );
        setDeals(validDeals);
      }

      if (fetchedAt) {
        setLastFetchedAt(fetchedAt);
      }
    } catch (error) {
      console.error('Error loading deals:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save deals to localStorage
  const saveDeals = useCallback((newDeals: DealItem[]) => {
    try {
      localStorage.setItem(DEALS_STORAGE_KEY, JSON.stringify(newDeals));
      setDeals(newDeals);
    } catch (error) {
      console.error('Error saving deals:', error);
    }
  }, []);

  // Add a new deal
  const addDeal = useCallback((deal: Omit<DealItem, 'id'>) => {
    const newDeal: DealItem = {
      ...deal,
      id: `deal_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };
    const newDeals = [...deals, newDeal];
    saveDeals(newDeals);
    return newDeal;
  }, [deals, saveDeals]);

  // Update a deal
  const updateDeal = useCallback((dealId: string, updates: Partial<DealItem>) => {
    const newDeals = deals.map(deal =>
      deal.id === dealId ? { ...deal, ...updates } : deal
    );
    saveDeals(newDeals);
  }, [deals, saveDeals]);

  // Remove a deal
  const removeDeal = useCallback((dealId: string) => {
    const newDeals = deals.filter(deal => deal.id !== dealId);
    saveDeals(newDeals);
  }, [deals, saveDeals]);

  // Clear all deals
  const clearAllDeals = useCallback(() => {
    saveDeals([]);
  }, [saveDeals]);

  // Get deals by store
  const getDealsByStore = useCallback((storeId: string) => {
    return deals.filter(deal => deal.storeId === storeId);
  }, [deals]);

  // Get deals by category
  const getDealsByCategory = useCallback((category: string) => {
    return deals.filter(deal => deal.category === category);
  }, [deals]);

  // Get flash sales
  const getFlashSales = useCallback(() => {
    return deals.filter(deal => deal.isFlashSale);
  }, [deals]);

  // Import deals (for bulk adding from fetch)
  const importDeals = useCallback((newDeals: Omit<DealItem, 'id'>[]) => {
    const dealsWithIds = newDeals.map((deal, index) => ({
      ...deal,
      id: `deal_${Date.now()}_${index}_${Math.random().toString(36).substr(2, 9)}`
    }));
    const allDeals = [...deals, ...dealsWithIds];
    saveDeals(allDeals);

    // Update fetch timestamp
    const now = new Date().toISOString();
    localStorage.setItem(FETCH_TIME_KEY, now);
    setLastFetchedAt(now);
  }, [deals, saveDeals]);

  // Get total savings potential
  const getTotalSavings = useCallback(() => {
    return deals.reduce((total, deal) =>
      total + (deal.originalPrice - deal.salePrice), 0
    );
  }, [deals]);

  return {
    deals,
    isLoading,
    lastFetchedAt,
    addDeal,
    updateDeal,
    removeDeal,
    clearAllDeals,
    getDealsByStore,
    getDealsByCategory,
    getFlashSales,
    importDeals,
    getTotalSavings
  };
}
