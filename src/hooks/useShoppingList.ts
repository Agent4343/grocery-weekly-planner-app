"use client";

import { useState, useCallback } from 'react';
import { Recipe, RecipeIngredient } from '@/lib/recipes';
import { Store } from '@/lib/stores';

export interface ShoppingListItem {
  id: string;
  name: string;
  category: string;
  amount: number;
  unit: string;
  recipeNames: string[];
  isChecked: boolean;
  notes?: string;
  estimatedPrice: number;
  preferredStore?: string;
}

export interface StoreShoppingList {
  store: Store;
  items: ShoppingListItem[];
  estimatedTotal: number;
}

export const useShoppingList = () => {
  const [shoppingList, setShoppingList] = useState<ShoppingListItem[]>([]);
  const [selectedStores, setSelectedStores] = useState<string[]>([]);
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  // Generate shopping list from recipes
  const generateFromRecipes = useCallback((recipes: Recipe[]) => {
    const ingredientMap = new Map<string, {
      amount: number;
      unit: string;
      recipeNames: string[];
      category: string;
      estimatedPrice: number;
    }>();

    // Consolidate ingredients from all recipes
    recipes.forEach(recipe => {
      recipe.ingredients.forEach((recipeIngredient: RecipeIngredient) => {
        const key = `${recipeIngredient.name.toLowerCase()}-${recipeIngredient.unit}`;
        const existing = ingredientMap.get(key);

        if (existing) {
          // Add to existing ingredient (assuming same unit)
          existing.amount += recipeIngredient.amount;
          existing.recipeNames.push(recipe.name);
          existing.estimatedPrice += recipeIngredient.estimatedPrice || 0;
        } else {
          ingredientMap.set(key, {
            amount: recipeIngredient.amount,
            unit: recipeIngredient.unit,
            recipeNames: [recipe.name],
            category: recipeIngredient.category,
            estimatedPrice: recipeIngredient.estimatedPrice || 0
          });
        }
      });
    });

    // Convert to shopping list items
    const newShoppingList: ShoppingListItem[] = [];
    ingredientMap.forEach((data, key) => {
      const name = key.split('-')[0];
      newShoppingList.push({
        id: `shopping-${key}`,
        name: name.charAt(0).toUpperCase() + name.slice(1),
        category: data.category,
        amount: data.amount,
        unit: data.unit,
        recipeNames: [...new Set(data.recipeNames)], // Remove duplicates
        isChecked: false,
        estimatedPrice: data.estimatedPrice
      });
    });

    setShoppingList(newShoppingList);
    setCheckedItems(new Set());
  }, []);

  // Add custom item to shopping list
  const addCustomItem = useCallback((name: string, amount: number, unit: string, category: string, estimatedPrice: number, notes?: string) => {
    const newItem: ShoppingListItem = {
      id: `custom-${Date.now()}`,
      name,
      category,
      amount,
      unit,
      recipeNames: [],
      isChecked: false,
      notes,
      estimatedPrice
    };

    setShoppingList(prev => [...prev, newItem]);
  }, []);

  // Remove item from shopping list
  const removeItem = useCallback((itemId: string) => {
    setShoppingList(prev => prev.filter(item => item.id !== itemId));
    setCheckedItems(prev => {
      const newSet = new Set(prev);
      newSet.delete(itemId);
      return newSet;
    });
  }, []);

  // Update item in shopping list
  const updateItem = useCallback((itemId: string, updates: Partial<ShoppingListItem>) => {
    setShoppingList(prev => prev.map(item =>
      item.id === itemId ? { ...item, ...updates } : item
    ));
  }, []);

  // Toggle item checked status
  const toggleItemChecked = useCallback((itemId: string) => {
    setCheckedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });

    setShoppingList(prev => prev.map(item =>
      item.id === itemId ? { ...item, isChecked: !item.isChecked } : item
    ));
  }, []);

  // Clear all checked items
  const clearCheckedItems = useCallback(() => {
    setShoppingList(prev => prev.filter(item => !checkedItems.has(item.id)));
    setCheckedItems(new Set());
  }, [checkedItems]);

  // Group shopping list by store
  const getShoppingListByStore = useCallback((stores: Store[]): StoreShoppingList[] => {
    return stores.map(store => {
      // All items are available at all stores for simplicity
      const storeItems = [...shoppingList];

      const estimatedTotal = storeItems.reduce((total, item) => {
        return total + item.estimatedPrice;
      }, 0);

      return {
        store,
        items: storeItems,
        estimatedTotal
      };
    });
  }, [shoppingList]);

  // Get items by category
  const getItemsByCategory = useCallback(() => {
    const categories = new Map<string, ShoppingListItem[]>();

    shoppingList.forEach(item => {
      const category = item.category;
      if (!categories.has(category)) {
        categories.set(category, []);
      }
      categories.get(category)!.push(item);
    });

    return Array.from(categories.entries()).map(([category, items]) => ({
      category,
      items: items.sort((a, b) => a.name.localeCompare(b.name))
    }));
  }, [shoppingList]);

  // Get shopping statistics
  const getShoppingStats = useCallback(() => {
    const totalItems = shoppingList.length;
    const checkedItemsCount = checkedItems.size;
    const uncheckedItems = totalItems - checkedItemsCount;

    const totalEstimatedCost = shoppingList.reduce((total, item) => {
      return total + item.estimatedPrice;
    }, 0);

    const uniqueRecipes = new Set(
      shoppingList.flatMap(item => item.recipeNames)
    ).size;

    return {
      totalItems,
      checkedItemsCount,
      uncheckedItems,
      completionRate: totalItems > 0 ? (checkedItemsCount / totalItems) * 100 : 0,
      totalEstimatedCost,
      uniqueRecipes
    };
  }, [shoppingList, checkedItems]);

  // Optimize shopping list for minimum stores
  const optimizeForMinimumStores = useCallback((availableStores: Store[]) => {
    // With the simplified model, all stores have all items
    const totalCost = shoppingList.reduce((sum, item) => sum + item.estimatedPrice, 0);
    const itemCount = shoppingList.length;

    const storeScores = availableStores.map(store => ({
      store,
      availableItems: itemCount,
      totalCost,
      score: itemCount > 0 && totalCost > 0 ? itemCount / totalCost : 0
    }));

    return storeScores.sort((a, b) => b.score - a.score);
  }, [shoppingList]);

  // Clear entire shopping list
  const clearShoppingList = useCallback(() => {
    setShoppingList([]);
    setCheckedItems(new Set());
  }, []);

  // Export shopping list as text
  const exportAsText = useCallback(() => {
    const categories = getItemsByCategory();
    let text = "Shopping List\n=============\n\n";

    categories.forEach(({ category, items }) => {
      text += `${category}:\n`;
      items.forEach(item => {
        const status = item.isChecked ? "✓" : "☐";
        text += `  ${status} ${item.amount} ${item.unit} ${item.name}`;
        if (item.recipeNames.length > 0) {
          text += ` (${item.recipeNames.join(", ")})`;
        }
        if (item.notes) {
          text += ` - ${item.notes}`;
        }
        text += "\n";
      });
      text += "\n";
    });

    return text;
  }, [getItemsByCategory]);

  return {
    shoppingList,
    selectedStores,
    setSelectedStores,
    generateFromRecipes,
    addCustomItem,
    removeItem,
    updateItem,
    toggleItemChecked,
    clearCheckedItems,
    getShoppingListByStore,
    getItemsByCategory,
    getShoppingStats,
    optimizeForMinimumStores,
    clearShoppingList,
    exportAsText
  };
};