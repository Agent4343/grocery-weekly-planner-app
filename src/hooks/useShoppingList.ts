"use client";

import { useState, useCallback } from 'react';
import { Recipe } from '@/lib/recipes';
import { Ingredient, getIngredientById } from '@/lib/ingredients';
import { Store } from '@/lib/stores';

export interface ShoppingListItem {
  id: string;
  ingredientId: string;
  ingredient: Ingredient;
  amount: number;
  unit: string;
  recipeNames: string[];
  isChecked: boolean;
  notes?: string;
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
    }>();

    // Consolidate ingredients from all recipes
    recipes.forEach(recipe => {
      recipe.ingredients.forEach(recipeIngredient => {
        const key = recipeIngredient.ingredientId;
        const existing = ingredientMap.get(key);

        if (existing) {
          // Add to existing ingredient (assuming same unit)
          existing.amount += recipeIngredient.amount;
          existing.recipeNames.push(recipe.name);
        } else {
          ingredientMap.set(key, {
            amount: recipeIngredient.amount,
            unit: recipeIngredient.unit,
            recipeNames: [recipe.name]
          });
        }
      });
    });

    // Convert to shopping list items
    const newShoppingList: ShoppingListItem[] = [];
    ingredientMap.forEach((data, ingredientId) => {
      const ingredient = getIngredientById(ingredientId);
      if (ingredient) {
        newShoppingList.push({
          id: `shopping-${ingredientId}`,
          ingredientId,
          ingredient,
          amount: data.amount,
          unit: data.unit,
          recipeNames: [...new Set(data.recipeNames)], // Remove duplicates
          isChecked: false
        });
      }
    });

    setShoppingList(newShoppingList);
    setCheckedItems(new Set());
  }, []);

  // Add custom item to shopping list
  const addCustomItem = useCallback((ingredient: Ingredient, amount: number, unit: string, notes?: string) => {
    const newItem: ShoppingListItem = {
      id: `custom-${Date.now()}`,
      ingredientId: ingredient.id,
      ingredient,
      amount,
      unit,
      recipeNames: [],
      isChecked: false,
      notes
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
      const storeItems = shoppingList.filter(item => {
        const availability = item.ingredient.storeAvailability[store.type];
        return availability.available;
      });

      const estimatedTotal = storeItems.reduce((total, item) => {
        const availability = item.ingredient.storeAvailability[store.type];
        const price = availability.avgPrice || 0;
        return total + (price * item.amount);
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
      const category = item.ingredient.category;
      if (!categories.has(category)) {
        categories.set(category, []);
      }
      categories.get(category)!.push(item);
    });

    return Array.from(categories.entries()).map(([category, items]) => ({
      category,
      items: items.sort((a, b) => a.ingredient.name.localeCompare(b.ingredient.name))
    }));
  }, [shoppingList]);

  // Get shopping statistics
  const getShoppingStats = useCallback(() => {
    const totalItems = shoppingList.length;
    const checkedItemsCount = checkedItems.size;
    const uncheckedItems = totalItems - checkedItemsCount;
    
    const totalEstimatedCost = shoppingList.reduce((total, item) => {
      // Use average price across available stores
      const availableStores = Object.entries(item.ingredient.storeAvailability)
        .filter(([_, availability]) => (availability as any).available);
      
      if (availableStores.length === 0) return total;
      
      const avgPrice = availableStores.reduce((sum, [_, availability]) => 
        sum + ((availability as any).avgPrice || 0), 0
      ) / availableStores.length;
      
      return total + (avgPrice * item.amount);
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
    const storeScores = availableStores.map(store => {
      const availableItems = shoppingList.filter(item => 
        item.ingredient.storeAvailability[store.type].available
      );
      
      const totalCost = availableItems.reduce((sum, item) => {
        const price = item.ingredient.storeAvailability[store.type].avgPrice || 0;
        return sum + (price * item.amount);
      }, 0);

      return {
        store,
        availableItems: availableItems.length,
        totalCost,
        score: availableItems.length / totalCost // Items per dollar
      };
    });

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
        text += `  ${status} ${item.amount} ${item.unit} ${item.ingredient.name}`;
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