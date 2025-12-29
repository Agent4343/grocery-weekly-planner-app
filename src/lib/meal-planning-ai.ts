// AI Meal Planning Engine with Smart Deal Optimization

import { Recipe, recipes } from './recipes';
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

    for (const recipe of recipes) {
      // Check if recipe fits user's time/skill constraints
      if (!this.recipeMatchesPreferences(recipe, userPreferences)) {
        continue;
      }

      let totalSavings = 0;
      let normalCost = 0;
      let saleCost = 0;
      const dealsUsed: DealItem[] = [];

      for (const recipeIngredient of recipe.ingredients) {
        // Get normal price from ingredient
        const normalPrice = recipeIngredient.estimatedPrice || 2;
        normalCost += normalPrice;

        // Check for deals on this ingredient by name
        const ingredientKey = recipeIngredient.name.toLowerCase().replace(/\s+/g, '-');
        const deal = availableDeals.find(d => d.ingredientId === ingredientKey);
        if (deal) {
          saleCost += deal.salePrice;
          totalSavings += (deal.originalPrice - deal.salePrice);
          dealsUsed.push(deal);
        } else {
          saleCost += normalPrice;
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

    // Check dietary restrictions based on ingredient categories
    if (preferences.dietaryContext.restrictions.includes('Vegetarian')) {
      const hasAnimal = recipe.ingredients.some(ing =>
        ['Meat', 'Seafood'].includes(ing.category)
      );
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
    const eligibleRecipes = recipes.filter(r =>
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
          const key = ing.name.toLowerCase();
          usedIngredients.set(
            key,
            (usedIngredients.get(key) || 0) + 1
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
          const key = ing.name.toLowerCase();
          usedIngredients.set(
            key,
            (usedIngredients.get(key) || 0) + 1
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
          const key = ing.name.toLowerCase();
          usedIngredients.set(
            key,
            (usedIngredients.get(key) || 0) + 1
          );
        });
      }

      const dailyPlan: DailyPlan = {
        dayOfWeek,
        dayName: dayNames[dayOfWeek],
        date: date.toISOString().split('T')[0],
        meals: dailyMeals,
        totalCalories: 0, // Nutrition info not available in simplified recipe format
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
          usedIngredients.has(ing.name.toLowerCase())
        ).length;
        score += reuseCount * 5;
      }

      // Preference bonuses
      if (preferences.mealPreferences.includes('quick-meals')) {
        if (recipe.prepTime + recipe.cookTime <= 30) score += 10;
      }
      if (preferences.mealPreferences.includes('healthy')) {
        // Favor recipes tagged with healthy
        if (recipe.tags.includes('healthy') || recipe.tags.includes('low-calorie')) score += 5;
      }
      if (preferences.mealPreferences.includes('comfort-food')) {
        // Favor recipes tagged with comfort food
        if (recipe.tags.includes('comfort-food') || recipe.tags.includes('classic')) score += 8;
      }

      // Match meal type to recipe category
      if (mealType === 'breakfast' && recipe.category === 'Breakfast') score += 15;
      if (mealType === 'dinner' && recipe.category === 'Dinner') score += 10;
      if (mealType === 'lunch' && recipe.category === 'Lunch') score += 10;

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
      const normalPrice = recipeIngredient.estimatedPrice || 2;
      normalCost += normalPrice * scaleFactor;

      const ingredientKey = recipeIngredient.name.toLowerCase().replace(/\s+/g, '-');
      const deal = this.isIngredientOnSale(
        ingredientKey,
        preferences.selectedStores
      );

      if (deal) {
        estimatedCost += deal.salePrice * scaleFactor;
        usesDeals = true;
      } else {
        estimatedCost += normalPrice * scaleFactor;
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
      name: string;
      amount: number;
      unit: string;
      recipeNames: string[];
      category: string;
      estimatedPrice: number;
    }>();

    // Aggregate all ingredients
    for (const day of days) {
      for (const meal of day.meals) {
        const scaleFactor = meal.servings / meal.recipe.servings;

        for (const recipeIngredient of meal.recipe.ingredients) {
          const key = `${recipeIngredient.name.toLowerCase()}-${recipeIngredient.unit}`;
          const existing = ingredientMap.get(key);
          const amount = recipeIngredient.amount * scaleFactor;

          if (existing) {
            existing.amount += amount;
            existing.estimatedPrice += (recipeIngredient.estimatedPrice || 2) * scaleFactor;
            if (!existing.recipeNames.includes(meal.recipe.name)) {
              existing.recipeNames.push(meal.recipe.name);
            }
          } else {
            ingredientMap.set(key, {
              name: recipeIngredient.name,
              amount,
              unit: recipeIngredient.unit,
              recipeNames: [meal.recipe.name],
              category: recipeIngredient.category,
              estimatedPrice: (recipeIngredient.estimatedPrice || 2) * scaleFactor
            });
          }
        }
      }
    }

    // Build shopping items with best prices
    const shoppingItems: SmartShoppingItem[] = [];
    const storeItemsMap = new Map<string, SmartShoppingItem[]>();

    ingredientMap.forEach((value, _key) => {
      const ingredientKey = value.name.toLowerCase().replace(/\s+/g, '-');
      let bestStore = preferences.selectedStores[0] || 'sobeys-avalon-mall';
      let bestPrice = value.estimatedPrice;
      let normalPrice = bestPrice;
      let isOnSale = false;
      const aisle = value.category;

      // Check for deals at selected stores
      const deal = this.isIngredientOnSale(ingredientKey, preferences.selectedStores);
      if (deal) {
        bestStore = deal.storeId;
        bestPrice = deal.salePrice * value.amount;
        normalPrice = deal.originalPrice * value.amount;
        isOnSale = true;
      }

      const item: SmartShoppingItem = {
        ingredientId: ingredientKey,
        ingredientName: value.name,
        amount: Math.ceil(value.amount * 10) / 10, // Round up slightly
        unit: value.unit,
        category: value.category,
        recipeNames: value.recipeNames,
        bestStore,
        bestPrice: Math.round(bestPrice * 100) / 100,
        normalPrice: Math.round(normalPrice * 100) / 100,
        savings: Math.round((normalPrice - bestPrice) * 100) / 100,
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
        avgCalories: 0, // Nutrition info not available in simplified format
        avgProtein: 0,
        avgCarbs: 0,
        avgFat: 0
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
