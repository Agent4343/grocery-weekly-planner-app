// AI Meal Planning Engine with Smart Deal Optimization

import { Recipe, newfoundlandRecipes } from './recipes';
import { getIngredientById } from './ingredients';
import { UserPreferences, calculateServingsNeeded, TIME_AVAILABILITY_DESCRIPTIONS } from './user-preferences';
import { getStoreById } from './nl-locations';

// Types for meal planning
export interface PlannedMeal {
  id: string;
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  dayName: string;
  mealType: 'breakfast' | 'lunch' | 'dinner';
  recipe: Recipe;
  servings: number;
  estimatedCost: number;
  estimatedTime: number;
  usesDeals: boolean;
  dealSavings: number;
}

export interface DailyPlan {
  dayOfWeek: number;
  dayName: string;
  date: string;
  meals: PlannedMeal[];
  totalCalories: number;
  totalCost: number;
  totalTime: number;
  totalSavings: number;
}

export interface WeeklyMealPlan {
  id: string;
  createdAt: string;
  weekStartDate: string;
  days: DailyPlan[];
  summary: WeeklySummary;
  shoppingList: SmartShoppingList;
}

export interface WeeklySummary {
  totalMeals: number;
  totalCost: number;
  totalSavings: number;
  averageCostPerMeal: number;
  totalPrepTime: number;
  totalCookTime: number;
  mealsUsingDeals: number;
  dealPercentage: number;
  ingredientsReused: number;
  uniqueIngredients: number;
  nutritionSummary: {
    avgCalories: number;
    avgProtein: number;
    avgCarbs: number;
    avgFat: number;
  };
}

// Deal types
export interface DealItem {
  id: string;
  ingredientId: string;
  ingredientName: string;
  storeId: string;
  storeName: string;
  originalPrice: number;
  salePrice: number;
  discountPercentage: number;
  validFrom: string;
  validUntil: string;
  quantity: string;
  isFlashSale: boolean;
  category: string;
}

export interface BestDealMeal {
  recipe: Recipe;
  totalSavings: number;
  dealsUsed: DealItem[];
  estimatedCost: number;
  normalCost: number;
  savingsPercentage: number;
}

// Shopping list types
export interface SmartShoppingItem {
  ingredientId: string;
  ingredientName: string;
  amount: number;
  unit: string;
  category: string;
  recipeNames: string[];
  bestStore: string;
  bestPrice: number;
  normalPrice: number;
  savings: number;
  isOnSale: boolean;
  aisle: string;
}

export interface StoreShoppingList {
  storeId: string;
  storeName: string;
  items: SmartShoppingItem[];
  totalCost: number;
  totalSavings: number;
  itemCount: number;
}

export interface SmartShoppingList {
  byStore: StoreShoppingList[];
  totalItems: number;
  totalCost: number;
  totalSavings: number;
  savingsPercentage: number;
}

// Mock current deals for NL stores
const mockCurrentDeals: DealItem[] = [
  {
    id: 'deal-1',
    ingredientId: 'atlantic-cod',
    ingredientName: 'Atlantic Cod',
    storeId: 'sobeys-avalon-mall',
    storeName: 'Sobeys Avalon Mall',
    originalPrice: 12.99,
    salePrice: 9.99,
    discountPercentage: 23,
    validFrom: new Date().toISOString(),
    validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    quantity: 'per lb',
    isFlashSale: false,
    category: 'Seafood'
  },
  {
    id: 'deal-2',
    ingredientId: 'chicken-breast',
    ingredientName: 'Chicken Breast',
    storeId: 'dominion-freshwater-road',
    storeName: 'Dominion Freshwater Road',
    originalPrice: 8.49,
    salePrice: 5.99,
    discountPercentage: 29,
    validFrom: new Date().toISOString(),
    validUntil: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    quantity: 'per lb',
    isFlashSale: true,
    category: 'Poultry'
  },
  {
    id: 'deal-3',
    ingredientId: 'potatoes',
    ingredientName: 'Potatoes',
    storeId: 'costco-st-johns',
    storeName: "Costco St. John's",
    originalPrice: 4.99,
    salePrice: 3.49,
    discountPercentage: 30,
    validFrom: new Date().toISOString(),
    validUntil: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    quantity: '10 lb bag',
    isFlashSale: false,
    category: 'Vegetables'
  },
  {
    id: 'deal-4',
    ingredientId: 'blueberries',
    ingredientName: 'Wild Blueberries',
    storeId: 'sobeys-avalon-mall',
    storeName: 'Sobeys Avalon Mall',
    originalPrice: 3.99,
    salePrice: 2.49,
    discountPercentage: 38,
    validFrom: new Date().toISOString(),
    validUntil: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    quantity: 'per cup',
    isFlashSale: true,
    category: 'Berries'
  },
  {
    id: 'deal-5',
    ingredientId: 'eggs',
    ingredientName: 'Large Eggs',
    storeId: 'dominion-village-mall',
    storeName: 'Dominion Village Mall',
    originalPrice: 5.19,
    salePrice: 3.99,
    discountPercentage: 23,
    validFrom: new Date().toISOString(),
    validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    quantity: 'dozen',
    isFlashSale: false,
    category: 'Dairy'
  },
  {
    id: 'deal-6',
    ingredientId: 'carrots',
    ingredientName: 'Carrots',
    storeId: 'sobeys-torbay-road',
    storeName: 'Sobeys Torbay Road',
    originalPrice: 1.99,
    salePrice: 0.99,
    discountPercentage: 50,
    validFrom: new Date().toISOString(),
    validUntil: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
    quantity: 'per lb',
    isFlashSale: true,
    category: 'Vegetables'
  },
  {
    id: 'deal-7',
    ingredientId: 'cabbage',
    ingredientName: 'Cabbage',
    storeId: 'dominion-freshwater-road',
    storeName: 'Dominion Freshwater Road',
    originalPrice: 2.99,
    salePrice: 1.49,
    discountPercentage: 50,
    validFrom: new Date().toISOString(),
    validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    quantity: 'per head',
    isFlashSale: false,
    category: 'Vegetables'
  },
  {
    id: 'deal-8',
    ingredientId: 'flour',
    ingredientName: 'All-Purpose Flour',
    storeId: 'costco-st-johns',
    storeName: "Costco St. John's",
    originalPrice: 7.99,
    salePrice: 5.99,
    discountPercentage: 25,
    validFrom: new Date().toISOString(),
    validUntil: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(),
    quantity: '10 lb bag',
    isFlashSale: false,
    category: 'Baking'
  },
  {
    id: 'deal-9',
    ingredientId: 'butter',
    ingredientName: 'Butter',
    storeId: 'sobeys-avalon-mall',
    storeName: 'Sobeys Avalon Mall',
    originalPrice: 6.99,
    salePrice: 4.99,
    discountPercentage: 29,
    validFrom: new Date().toISOString(),
    validUntil: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    quantity: 'per lb',
    isFlashSale: false,
    category: 'Dairy'
  },
  {
    id: 'deal-10',
    ingredientId: 'salt-beef',
    ingredientName: 'Salt Beef',
    storeId: 'dominion-freshwater-road',
    storeName: 'Dominion Freshwater Road',
    originalPrice: 9.49,
    salePrice: 6.99,
    discountPercentage: 26,
    validFrom: new Date().toISOString(),
    validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    quantity: 'per lb',
    isFlashSale: false,
    category: 'Meat'
  }
];

// AI Meal Planning Service
export class MealPlanningAI {
  private static instance: MealPlanningAI;
  private currentDeals: DealItem[] = mockCurrentDeals;
  private userDeals: DealItem[] = [];

  private constructor() {}

  static getInstance(): MealPlanningAI {
    if (!MealPlanningAI.instance) {
      MealPlanningAI.instance = new MealPlanningAI();
    }
    return MealPlanningAI.instance;
  }

  // Set user-provided deals (from localStorage or input)
  setUserDeals(deals: DealItem[]): void {
    this.userDeals = deals;
  }

  // Get all deals (user deals take priority, fall back to mock)
  getAllDeals(): DealItem[] {
    // If user has added deals, use those; otherwise use mock data
    return this.userDeals.length > 0 ? this.userDeals : this.currentDeals;
  }

  // Get current deals
  getCurrentDeals(): DealItem[] {
    return this.getAllDeals();
  }

  // Get deals for specific stores
  getDealsForStores(storeIds: string[]): DealItem[] {
    return this.getAllDeals().filter(deal => storeIds.includes(deal.storeId));
  }

  // Get flash sales
  getFlashSales(): DealItem[] {
    return this.getAllDeals().filter(deal => deal.isFlashSale);
  }

  // Get best deals (sorted by discount percentage)
  getBestDeals(limit: number = 5): DealItem[] {
    return [...this.getAllDeals()]
      .sort((a, b) => b.discountPercentage - a.discountPercentage)
      .slice(0, limit);
  }

  // Get total potential savings
  getTotalPotentialSavings(): number {
    return this.getAllDeals().reduce((total, deal) => {
      return total + (deal.originalPrice - deal.salePrice);
    }, 0);
  }

  // Check if ingredient is on sale
  isIngredientOnSale(ingredientId: string, storeIds?: string[]): DealItem | null {
    const allDeals = this.getAllDeals();
    const deals = storeIds
      ? allDeals.filter(d => storeIds.includes(d.storeId))
      : allDeals;

    return deals.find(deal => deal.ingredientId === ingredientId) || null;
  }

  // Get best deal meals
  getBestDealMeals(userPreferences: UserPreferences): BestDealMeal[] {
    const availableDeals = userPreferences.selectedStores.length > 0
      ? this.getDealsForStores(userPreferences.selectedStores)
      : this.currentDeals;

    const mealScores: BestDealMeal[] = [];

    for (const recipe of newfoundlandRecipes) {
      // Check if recipe fits user's time/skill constraints
      if (!this.recipeMatchesPreferences(recipe, userPreferences)) {
        continue;
      }

      let totalSavings = 0;
      let normalCost = 0;
      let saleCost = 0;
      const dealsUsed: DealItem[] = [];

      for (const recipeIngredient of recipe.ingredients) {
        const ingredient = getIngredientById(recipeIngredient.ingredientId);
        if (!ingredient) continue;

        // Get normal price (use sobeys as default)
        const normalPrice = ingredient.storeAvailability.sobeys.avgPrice || 5;
        normalCost += normalPrice * recipeIngredient.amount;

        // Check for deals on this ingredient
        const deal = availableDeals.find(d => d.ingredientId === recipeIngredient.ingredientId);
        if (deal) {
          saleCost += deal.salePrice * recipeIngredient.amount;
          totalSavings += (deal.originalPrice - deal.salePrice) * recipeIngredient.amount;
          dealsUsed.push(deal);
        } else {
          saleCost += normalPrice * recipeIngredient.amount;
        }
      }

      if (dealsUsed.length > 0) {
        mealScores.push({
          recipe,
          totalSavings,
          dealsUsed,
          estimatedCost: saleCost,
          normalCost,
          savingsPercentage: normalCost > 0 ? Math.round((totalSavings / normalCost) * 100) : 0
        });
      }
    }

    return mealScores.sort((a, b) => b.totalSavings - a.totalSavings);
  }

  // Check if recipe matches user preferences
  private recipeMatchesPreferences(recipe: Recipe, preferences: UserPreferences): boolean {
    const maxTime = TIME_AVAILABILITY_DESCRIPTIONS[preferences.dietaryContext.timePerMeal].maxMinutes;
    const totalTime = recipe.prepTime + recipe.cookTime;

    if (totalTime > maxTime) return false;

    // Check skill level
    const skillLevel = preferences.dietaryContext.cookingSkill;
    if (skillLevel === 'beginner' && recipe.difficulty === 'Hard') return false;
    if (skillLevel === 'intermediate' && recipe.difficulty === 'Hard') return false;

    // Check dietary restrictions - this would need more robust ingredient checking
    // For now, basic check
    if (preferences.dietaryContext.restrictions.includes('Vegetarian')) {
      const hasAnimal = recipe.ingredients.some(ing => {
        const ingredient = getIngredientById(ing.ingredientId);
        return ingredient && ['Meat', 'Poultry', 'Seafood', 'Game Meat'].includes(ingredient.category);
      });
      if (hasAnimal) return false;
    }

    return true;
  }

  // Generate a full weekly meal plan
  generateWeeklyPlan(
    preferences: UserPreferences,
    options: {
      planDays?: number;
      startDate?: string;
      preferDeals?: boolean;
      maximizeIngredientReuse?: boolean;
    } = {}
  ): WeeklyMealPlan {
    const {
      planDays = 7,
      startDate = new Date().toISOString().split('T')[0],
      preferDeals = true,
      maximizeIngredientReuse = true
    } = options;

    const servingsNeeded = Math.ceil(calculateServingsNeeded(preferences.household));
    const days: DailyPlan[] = [];
    const usedIngredients = new Map<string, number>(); // Track ingredient usage for reuse
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    // Get recipes that match preferences
    const eligibleRecipes = newfoundlandRecipes.filter(r =>
      this.recipeMatchesPreferences(r, preferences)
    );

    // Get best deal meals if preferring deals
    const dealMeals = preferDeals ? this.getBestDealMeals(preferences) : [];

    for (let i = 0; i < planDays; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      const dayOfWeek = date.getDay();

      const dailyMeals: PlannedMeal[] = [];

      // Plan dinner (main focus)
      const dinnerRecipe = this.selectRecipeForMeal(
        eligibleRecipes,
        'dinner',
        preferences,
        usedIngredients,
        dealMeals,
        maximizeIngredientReuse
      );

      if (dinnerRecipe) {
        const dinnerMeal = this.createPlannedMeal(
          dinnerRecipe,
          dayOfWeek,
          dayNames[dayOfWeek],
          'dinner',
          servingsNeeded,
          preferences
        );
        dailyMeals.push(dinnerMeal);

        // Track used ingredients
        dinnerRecipe.ingredients.forEach(ing => {
          usedIngredients.set(
            ing.ingredientId,
            (usedIngredients.get(ing.ingredientId) || 0) + 1
          );
        });
      }

      // Plan lunch (simpler meals)
      const lunchRecipe = this.selectRecipeForMeal(
        eligibleRecipes,
        'lunch',
        preferences,
        usedIngredients,
        dealMeals,
        maximizeIngredientReuse
      );

      if (lunchRecipe) {
        const lunchMeal = this.createPlannedMeal(
          lunchRecipe,
          dayOfWeek,
          dayNames[dayOfWeek],
          'lunch',
          servingsNeeded,
          preferences
        );
        dailyMeals.push(lunchMeal);

        lunchRecipe.ingredients.forEach(ing => {
          usedIngredients.set(
            ing.ingredientId,
            (usedIngredients.get(ing.ingredientId) || 0) + 1
          );
        });
      }

      // Plan breakfast
      const breakfastRecipe = this.selectRecipeForMeal(
        eligibleRecipes.filter(r => r.category === 'Breakfast' || r.category === 'Dessert'),
        'breakfast',
        preferences,
        usedIngredients,
        dealMeals,
        maximizeIngredientReuse
      );

      if (breakfastRecipe) {
        const breakfastMeal = this.createPlannedMeal(
          breakfastRecipe,
          dayOfWeek,
          dayNames[dayOfWeek],
          'breakfast',
          servingsNeeded,
          preferences
        );
        dailyMeals.push(breakfastMeal);

        breakfastRecipe.ingredients.forEach(ing => {
          usedIngredients.set(
            ing.ingredientId,
            (usedIngredients.get(ing.ingredientId) || 0) + 1
          );
        });
      }

      const dailyPlan: DailyPlan = {
        dayOfWeek,
        dayName: dayNames[dayOfWeek],
        date: date.toISOString().split('T')[0],
        meals: dailyMeals,
        totalCalories: dailyMeals.reduce((sum, m) =>
          sum + (m.recipe.nutritionInfo?.calories || 0) * (m.servings / m.recipe.servings), 0
        ),
        totalCost: dailyMeals.reduce((sum, m) => sum + m.estimatedCost, 0),
        totalTime: dailyMeals.reduce((sum, m) => sum + m.estimatedTime, 0),
        totalSavings: dailyMeals.reduce((sum, m) => sum + m.dealSavings, 0)
      };

      days.push(dailyPlan);
    }

    // Generate shopping list
    const shoppingList = this.generateShoppingList(days, preferences);

    // Calculate summary
    const summary = this.calculateWeeklySummary(days, usedIngredients, shoppingList);

    return {
      id: `plan_${Date.now()}`,
      createdAt: new Date().toISOString(),
      weekStartDate: startDate,
      days,
      summary,
      shoppingList
    };
  }

  // Select a recipe for a specific meal
  private selectRecipeForMeal(
    eligibleRecipes: Recipe[],
    mealType: 'breakfast' | 'lunch' | 'dinner',
    preferences: UserPreferences,
    usedIngredients: Map<string, number>,
    dealMeals: BestDealMeal[],
    maximizeReuse: boolean
  ): Recipe | null {
    if (eligibleRecipes.length === 0) return null;

    // Score each recipe
    const scoredRecipes = eligibleRecipes.map(recipe => {
      let score = 0;

      // Bonus for using deals
      const dealMeal = dealMeals.find(dm => dm.recipe.id === recipe.id);
      if (dealMeal) {
        score += dealMeal.totalSavings * 10; // Weight deals heavily
      }

      // Bonus for ingredient reuse
      if (maximizeReuse) {
        const reuseCount = recipe.ingredients.filter(ing =>
          usedIngredients.has(ing.ingredientId)
        ).length;
        score += reuseCount * 5;
      }

      // Preference bonuses
      if (preferences.mealPreferences.includes('quick-meals')) {
        if (recipe.prepTime + recipe.cookTime <= 30) score += 10;
      }
      if (preferences.mealPreferences.includes('healthy')) {
        if (recipe.nutritionInfo && recipe.nutritionInfo.calories < 400) score += 5;
      }
      if (preferences.mealPreferences.includes('comfort-food')) {
        if (recipe.isTraditional) score += 8;
      }

      // Match meal type to recipe category
      if (mealType === 'breakfast' && recipe.category === 'Breakfast') score += 15;
      if (mealType === 'dinner' && recipe.category === 'Main Course') score += 10;

      return { recipe, score };
    });

    // Sort by score and add some randomness to top choices
    const sorted = scoredRecipes.sort((a, b) => b.score - a.score);
    const topChoices = sorted.slice(0, Math.min(3, sorted.length));

    // Random selection from top choices for variety
    const selected = topChoices[Math.floor(Math.random() * topChoices.length)];
    return selected?.recipe || null;
  }

  // Create a planned meal object
  private createPlannedMeal(
    recipe: Recipe,
    dayOfWeek: number,
    dayName: string,
    mealType: 'breakfast' | 'lunch' | 'dinner',
    servings: number,
    preferences: UserPreferences
  ): PlannedMeal {
    const scaleFactor = servings / recipe.servings;
    let estimatedCost = 0;
    let normalCost = 0;
    let usesDeals = false;

    for (const recipeIngredient of recipe.ingredients) {
      const ingredient = getIngredientById(recipeIngredient.ingredientId);
      if (!ingredient) continue;

      const amount = recipeIngredient.amount * scaleFactor;
      const normalPrice = ingredient.storeAvailability.sobeys.avgPrice || 5;
      normalCost += normalPrice * amount;

      const deal = this.isIngredientOnSale(
        recipeIngredient.ingredientId,
        preferences.selectedStores
      );

      if (deal) {
        estimatedCost += deal.salePrice * amount;
        usesDeals = true;
      } else {
        estimatedCost += normalPrice * amount;
      }
    }

    return {
      id: `meal_${dayOfWeek}_${mealType}_${recipe.id}`,
      dayOfWeek,
      dayName,
      mealType,
      recipe,
      servings,
      estimatedCost: Math.round(estimatedCost * 100) / 100,
      estimatedTime: recipe.prepTime + recipe.cookTime,
      usesDeals,
      dealSavings: Math.round((normalCost - estimatedCost) * 100) / 100
    };
  }

  // Generate smart shopping list
  private generateShoppingList(
    days: DailyPlan[],
    preferences: UserPreferences
  ): SmartShoppingList {
    const ingredientMap = new Map<string, {
      amount: number;
      unit: string;
      recipeNames: string[];
    }>();

    // Aggregate all ingredients
    for (const day of days) {
      for (const meal of day.meals) {
        const scaleFactor = meal.servings / meal.recipe.servings;

        for (const recipeIngredient of meal.recipe.ingredients) {
          const existing = ingredientMap.get(recipeIngredient.ingredientId);
          const amount = recipeIngredient.amount * scaleFactor;

          if (existing) {
            existing.amount += amount;
            if (!existing.recipeNames.includes(meal.recipe.name)) {
              existing.recipeNames.push(meal.recipe.name);
            }
          } else {
            ingredientMap.set(recipeIngredient.ingredientId, {
              amount,
              unit: recipeIngredient.unit,
              recipeNames: [meal.recipe.name]
            });
          }
        }
      }
    }

    // Build shopping items with best prices
    const shoppingItems: SmartShoppingItem[] = [];
    const storeItemsMap = new Map<string, SmartShoppingItem[]>();

    ingredientMap.forEach((value, ingredientId) => {
      const ingredient = getIngredientById(ingredientId);
      if (!ingredient) return;

      // Find best store price
      let bestStore = 'sobeys-avalon-mall';
      let bestPrice = ingredient.storeAvailability.sobeys.avgPrice || 10;
      let normalPrice = bestPrice;
      let isOnSale = false;
      let aisle = ingredient.storeAvailability.sobeys.section || 'General';

      // Check for deals at selected stores
      const deal = this.isIngredientOnSale(ingredientId, preferences.selectedStores);
      if (deal) {
        bestStore = deal.storeId;
        bestPrice = deal.salePrice;
        normalPrice = deal.originalPrice;
        isOnSale = true;
      } else {
        // Find cheapest store from user's selected stores
        for (const storeId of preferences.selectedStores) {
          const store = getStoreById(storeId);
          if (!store) continue;

          const storeType = store.type as 'sobeys' | 'dominion' | 'costco';
          const availability = ingredient.storeAvailability[storeType];

          if (availability?.available && availability.avgPrice) {
            if (availability.avgPrice < bestPrice) {
              bestPrice = availability.avgPrice;
              bestStore = storeId;
              aisle = availability.section || 'General';
            }
          }
        }
      }

      const item: SmartShoppingItem = {
        ingredientId,
        ingredientName: ingredient.name,
        amount: Math.ceil(value.amount * 10) / 10, // Round up slightly
        unit: value.unit,
        category: ingredient.category,
        recipeNames: value.recipeNames,
        bestStore,
        bestPrice: Math.round(bestPrice * value.amount * 100) / 100,
        normalPrice: Math.round(normalPrice * value.amount * 100) / 100,
        savings: Math.round((normalPrice - bestPrice) * value.amount * 100) / 100,
        isOnSale,
        aisle
      };

      shoppingItems.push(item);

      // Group by store
      const storeItems = storeItemsMap.get(bestStore) || [];
      storeItems.push(item);
      storeItemsMap.set(bestStore, storeItems);
    });

    // Build store lists
    const byStore: StoreShoppingList[] = [];

    storeItemsMap.forEach((items, storeId) => {
      const store = getStoreById(storeId);
      const storeName = store?.name || storeId;

      // Sort items by aisle/category
      items.sort((a, b) => a.category.localeCompare(b.category));

      byStore.push({
        storeId,
        storeName,
        items,
        totalCost: items.reduce((sum, item) => sum + item.bestPrice, 0),
        totalSavings: items.reduce((sum, item) => sum + item.savings, 0),
        itemCount: items.length
      });
    });

    // Sort stores by item count (most items first)
    byStore.sort((a, b) => b.itemCount - a.itemCount);

    const totalCost = byStore.reduce((sum, store) => sum + store.totalCost, 0);
    const totalSavings = byStore.reduce((sum, store) => sum + store.totalSavings, 0);

    return {
      byStore,
      totalItems: shoppingItems.length,
      totalCost: Math.round(totalCost * 100) / 100,
      totalSavings: Math.round(totalSavings * 100) / 100,
      savingsPercentage: totalCost > 0
        ? Math.round((totalSavings / (totalCost + totalSavings)) * 100)
        : 0
    };
  }

  // Calculate weekly summary
  private calculateWeeklySummary(
    days: DailyPlan[],
    usedIngredients: Map<string, number>,
    shoppingList: SmartShoppingList
  ): WeeklySummary {
    const allMeals = days.flatMap(d => d.meals);
    const totalMeals = allMeals.length;
    const mealsUsingDeals = allMeals.filter(m => m.usesDeals).length;

    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFat = 0;
    let nutritionCount = 0;

    allMeals.forEach(meal => {
      if (meal.recipe.nutritionInfo) {
        const scale = meal.servings / meal.recipe.servings;
        totalCalories += meal.recipe.nutritionInfo.calories * scale;
        totalProtein += meal.recipe.nutritionInfo.protein * scale;
        totalCarbs += meal.recipe.nutritionInfo.carbs * scale;
        totalFat += meal.recipe.nutritionInfo.fat * scale;
        nutritionCount++;
      }
    });

    // Count ingredients that are used in multiple recipes
    const ingredientsReused = Array.from(usedIngredients.values()).filter(count => count > 1).length;

    return {
      totalMeals,
      totalCost: shoppingList.totalCost,
      totalSavings: shoppingList.totalSavings,
      averageCostPerMeal: totalMeals > 0 ? Math.round((shoppingList.totalCost / totalMeals) * 100) / 100 : 0,
      totalPrepTime: allMeals.reduce((sum, m) => sum + m.recipe.prepTime, 0),
      totalCookTime: allMeals.reduce((sum, m) => sum + m.recipe.cookTime, 0),
      mealsUsingDeals,
      dealPercentage: totalMeals > 0 ? Math.round((mealsUsingDeals / totalMeals) * 100) : 0,
      ingredientsReused,
      uniqueIngredients: usedIngredients.size,
      nutritionSummary: {
        avgCalories: nutritionCount > 0 ? Math.round(totalCalories / nutritionCount) : 0,
        avgProtein: nutritionCount > 0 ? Math.round(totalProtein / nutritionCount) : 0,
        avgCarbs: nutritionCount > 0 ? Math.round(totalCarbs / nutritionCount) : 0,
        avgFat: nutritionCount > 0 ? Math.round(totalFat / nutritionCount) : 0
      }
    };
  }

  // Regenerate plan with new options
  regeneratePlan(
    currentPlan: WeeklyMealPlan,
    preferences: UserPreferences,
    _options?: {
      keepDays?: number[];
      excludeRecipes?: string[];
    }
  ): WeeklyMealPlan {
    return this.generateWeeklyPlan(preferences, {
      startDate: currentPlan.weekStartDate,
      preferDeals: true,
      maximizeIngredientReuse: true
    });
  }
}

// Export singleton instance getter
export const getMealPlanningAI = () => MealPlanningAI.getInstance();
