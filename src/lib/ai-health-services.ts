// AI Services for health planning and sale tracking

export interface SaleItem {
  id: string;
  ingredientId: string;
  storeName: string;
  storeType: 'sobeys' | 'dominion' | 'costco';
  originalPrice: number;
  salePrice: number;
  discount: number;
  validUntil: string;
  description: string;
  category: string;
}

export interface HealthGoal {
  id: string;
  name: string;
  description: string;
  targetNutrients: {
    calories?: { min?: number; max?: number };
    protein?: { min?: number };
    fiber?: { min?: number };
    sodium?: { max?: number };
    sugar?: { max?: number };
  };
  avoidIngredients?: string[];
  preferIngredients?: string[];
}

export interface NutritionalAnalysis {
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  totalFiber: number;
  totalSodium: number;
  totalSugar: number;
  healthScore: number;
  recommendations: string[];
  warnings: string[];
}

// Mock sale data for Newfoundland stores
export const currentSales: SaleItem[] = [
  {
    id: "sale-1",
    ingredientId: "atlantic-cod",
    storeName: "Sobeys Avalon Mall",
    storeType: "sobeys",
    originalPrice: 12.99,
    salePrice: 9.99,
    discount: 23,
    validUntil: "2024-01-15",
    description: "Fresh Atlantic Cod Fillets - Family Pack",
    category: "Seafood"
  },
  {
    id: "sale-2",
    ingredientId: "blueberries",
    storeName: "Dominion Freshwater Road",
    storeType: "dominion",
    originalPrice: 4.99,
    salePrice: 2.99,
    discount: 40,
    validUntil: "2024-01-12",
    description: "Wild Blueberries - 2 lb container",
    category: "Berries"
  },
  {
    id: "sale-3",
    ingredientId: "chicken-breast",
    storeName: "Costco St. John's",
    storeType: "costco",
    originalPrice: 7.99,
    salePrice: 5.99,
    discount: 25,
    validUntil: "2024-01-20",
    description: "Organic Chicken Breast - Family Pack",
    category: "Poultry"
  },
  {
    id: "sale-4",
    ingredientId: "carrots",
    storeName: "Sobeys Torbay Road",
    storeType: "sobeys",
    originalPrice: 2.99,
    salePrice: 1.99,
    discount: 33,
    validUntil: "2024-01-14",
    description: "Local Carrots - 3 lb bag",
    category: "Vegetables"
  },
  {
    id: "sale-5",
    ingredientId: "oats",
    storeName: "Costco St. John's",
    storeType: "costco",
    originalPrice: 5.99,
    salePrice: 4.49,
    discount: 25,
    validUntil: "2024-01-18",
    description: "Organic Steel Cut Oats - 4 lb container",
    category: "Breakfast"
  }
];

// Health goals templates
export const healthGoals: HealthGoal[] = [
  {
    id: "heart-healthy",
    name: "Heart Healthy",
    description: "Low sodium, high fiber diet with omega-3 rich foods",
    targetNutrients: {
      sodium: { max: 2300 },
      fiber: { min: 25 },
      calories: { min: 1800, max: 2200 }
    },
    avoidIngredients: ["salt-beef"],
    preferIngredients: ["atlantic-cod", "oats", "blueberries", "carrots"]
  },
  {
    id: "weight-management",
    name: "Weight Management",
    description: "Balanced nutrition with portion control",
    targetNutrients: {
      calories: { min: 1500, max: 1800 },
      protein: { min: 100 },
      fiber: { min: 30 }
    },
    preferIngredients: ["chicken-breast", "carrots", "cabbage", "oats"]
  },
  {
    id: "diabetes-friendly",
    name: "Diabetes Friendly",
    description: "Low glycemic index foods with controlled carbohydrates",
    targetNutrients: {
      sugar: { max: 50 },
      fiber: { min: 35 },
      calories: { min: 1600, max: 2000 }
    },
    preferIngredients: ["atlantic-cod", "chicken-breast", "cabbage", "carrots"],
    avoidIngredients: ["molasses"]
  },
  {
    id: "high-protein",
    name: "High Protein",
    description: "Protein-rich diet for muscle building and recovery",
    targetNutrients: {
      protein: { min: 120 },
      calories: { min: 2000, max: 2500 }
    },
    preferIngredients: ["atlantic-cod", "chicken-breast", "ground-moose", "eggs"]
  },
  {
    id: "newfoundland-traditional",
    name: "Traditional Newfoundland",
    description: "Authentic local cuisine with modern health considerations",
    targetNutrients: {
      calories: { min: 1800, max: 2400 }
    },
    preferIngredients: ["atlantic-cod", "partridgeberries", "blueberries", "potatoes", "cabbage", "turnip"]
  }
];

// Type for nutrient validation rules
interface NutrientRule {
  nutrientKey: keyof HealthGoal['targetNutrients'];
  getValue: (totals: NutritionTotals) => number;
  checkMin?: {
    penalty: number;
    message: string;
    isWarning?: boolean;
  };
  checkMax?: {
    penalty: number;
    message: string;
    isWarning?: boolean;
  };
}

// Type for aggregated nutrition totals
interface NutritionTotals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sodium: number;
  sugar: number;
}

// Configuration for health goal nutrient validation rules
const NUTRIENT_RULES: NutrientRule[] = [
  {
    nutrientKey: 'calories',
    getValue: (totals) => totals.calories,
    checkMin: {
      penalty: 10,
      message: "Consider adding more calorie-dense healthy foods like nuts or avocados"
    },
    checkMax: {
      penalty: 15,
      message: "Daily calorie intake exceeds recommended amount for your goal",
      isWarning: true
    }
  },
  {
    nutrientKey: 'protein',
    getValue: (totals) => totals.protein,
    checkMin: {
      penalty: 10,
      message: "Add more protein sources like fish, chicken, or legumes"
    }
  },
  {
    nutrientKey: 'fiber',
    getValue: (totals) => totals.fiber,
    checkMin: {
      penalty: 10,
      message: "Include more fiber-rich foods like vegetables and whole grains"
    }
  },
  {
    nutrientKey: 'sodium',
    getValue: (totals) => totals.sodium,
    checkMax: {
      penalty: 15,
      message: "Sodium intake is high - consider reducing processed foods",
      isWarning: true
    }
  }
];

// Configuration for general nutrition bonuses
const NUTRITION_BONUSES = [
  {
    check: (totals: NutritionTotals) => totals.protein > 25,
    bonus: 5,
    message: "Great protein intake for muscle health!"
  },
  {
    check: (totals: NutritionTotals) => totals.fiber > 20,
    bonus: 5,
    message: "Excellent fiber intake for digestive health!"
  }
];

// Calculate nutrition totals from recipes
const calculateNutritionTotals = (recipes: any[]): NutritionTotals => {
  return recipes.reduce((totals, recipe) => {
    if (!recipe.nutritionInfo) return totals;

    return {
      calories: totals.calories + (recipe.nutritionInfo.calories || 0),
      protein: totals.protein + (recipe.nutritionInfo.protein || 0),
      carbs: totals.carbs + (recipe.nutritionInfo.carbs || 0),
      fat: totals.fat + (recipe.nutritionInfo.fat || 0),
      fiber: totals.fiber + (recipe.nutritionInfo.fiber || 0),
      sodium: totals.sodium + (recipe.nutritionInfo.sodium || 0),
      sugar: totals.sugar + (recipe.nutritionInfo.sugar || 0)
    };
  }, { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, sodium: 0, sugar: 0 });
};

// Apply a single nutrient rule against health goal targets
const applyNutrientRule = (
  rule: NutrientRule,
  totals: NutritionTotals,
  healthGoal: HealthGoal
): { scoreDelta: number; recommendations: string[]; warnings: string[] } => {
  const target = healthGoal.targetNutrients[rule.nutrientKey];
  if (!target) return { scoreDelta: 0, recommendations: [], warnings: [] };

  const value = rule.getValue(totals);
  const recommendations: string[] = [];
  const warnings: string[] = [];
  let scoreDelta = 0;

  // Check minimum threshold (cast to access optional min property)
  const minValue = (target as { min?: number }).min;
  if (rule.checkMin && minValue !== undefined && value < minValue) {
    scoreDelta -= rule.checkMin.penalty;
    if (rule.checkMin.isWarning) {
      warnings.push(rule.checkMin.message);
    } else {
      recommendations.push(rule.checkMin.message);
    }
  }

  // Check maximum threshold (cast to access optional max property)
  const maxValue = (target as { max?: number }).max;
  if (rule.checkMax && maxValue !== undefined && value > maxValue) {
    scoreDelta -= rule.checkMax.penalty;
    if (rule.checkMax.isWarning) {
      warnings.push(rule.checkMax.message);
    } else {
      recommendations.push(rule.checkMax.message);
    }
  }

  return { scoreDelta, recommendations, warnings };
};

// Apply general nutrition bonuses
const applyNutritionBonuses = (
  totals: NutritionTotals
): { scoreDelta: number; recommendations: string[] } => {
  let scoreDelta = 0;
  const recommendations: string[] = [];

  for (const bonus of NUTRITION_BONUSES) {
    if (bonus.check(totals)) {
      scoreDelta += bonus.bonus;
      recommendations.push(bonus.message);
    }
  }

  return { scoreDelta, recommendations };
};

// Clamp score to valid range
const clampScore = (score: number): number => Math.max(0, Math.min(100, score));

// AI-powered health analysis
export const analyzeNutritionalContent = async (recipes: any[], healthGoal?: HealthGoal): Promise<NutritionalAnalysis> => {
  // Simulate AI analysis
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Calculate totals from recipes
  const totals = calculateNutritionTotals(recipes);

  // Initialize health score and feedback arrays
  const BASE_SCORE = 75;
  let healthScore = BASE_SCORE;
  const recommendations: string[] = [];
  const warnings: string[] = [];

  // Apply health goal rules if present
  if (healthGoal) {
    for (const rule of NUTRIENT_RULES) {
      const result = applyNutrientRule(rule, totals, healthGoal);
      healthScore += result.scoreDelta;
      recommendations.push(...result.recommendations);
      warnings.push(...result.warnings);
    }
  }

  // Apply general nutrition bonuses
  const bonuses = applyNutritionBonuses(totals);
  healthScore += bonuses.scoreDelta;
  recommendations.push(...bonuses.recommendations);

  return {
    totalCalories: totals.calories,
    totalProtein: totals.protein,
    totalCarbs: totals.carbs,
    totalFat: totals.fat,
    totalFiber: totals.fiber,
    totalSodium: totals.sodium,
    totalSugar: totals.sugar,
    healthScore: clampScore(healthScore),
    recommendations,
    warnings
  };
};

// AI-powered sale recommendations
export const getPersonalizedSaleRecommendations = async (
  healthGoal?: HealthGoal,
  currentMeals?: any[]
): Promise<SaleItem[]> => {
  // Simulate AI processing
  await new Promise(resolve => setTimeout(resolve, 800));

  let relevantSales = [...currentSales];

  if (healthGoal) {
    // Filter sales based on health goals
    relevantSales = relevantSales.filter(sale => {
      if (healthGoal.avoidIngredients?.includes(sale.ingredientId)) {
        return false;
      }
      if (healthGoal.preferIngredients?.includes(sale.ingredientId)) {
        return true;
      }
      return true;
    });

    // Sort by relevance to health goal
    relevantSales.sort((a, b) => {
      const aPreferred = healthGoal.preferIngredients?.includes(a.ingredientId) ? 1 : 0;
      const bPreferred = healthGoal.preferIngredients?.includes(b.ingredientId) ? 1 : 0;
      if (aPreferred !== bPreferred) {
        return bPreferred - aPreferred;
      }
      return b.discount - a.discount; // Then by discount
    });
  } else {
    // Sort by discount if no health goal
    relevantSales.sort((a, b) => b.discount - a.discount);
  }

  return relevantSales.slice(0, 5); // Return top 5 recommendations
};

// AI meal suggestions based on sales and health goals
export const generateMealSuggestions = async (
  healthGoal?: HealthGoal,
  availableSales?: SaleItem[]
): Promise<string[]> => {
  // Simulate AI processing
  await new Promise(resolve => setTimeout(resolve, 1200));

  const suggestions: string[] = [];

  if (healthGoal?.id === "heart-healthy") {
    suggestions.push(
      "Grilled Atlantic Cod with Steamed Vegetables - Low sodium, high omega-3",
      "Oatmeal with Wild Blueberries - High fiber breakfast option",
      "Roasted Carrot and Cabbage Medley - Antioxidant-rich side dish"
    );
  } else if (healthGoal?.id === "weight-management") {
    suggestions.push(
      "Lean Chicken Breast Salad with Local Vegetables",
      "Vegetable-Heavy Fish Stew with Minimal Potatoes",
      "Steamed Cod with Herb Seasoning (No Salt)"
    );
  } else if (healthGoal?.id === "diabetes-friendly") {
    suggestions.push(
      "Grilled Chicken with Non-Starchy Vegetables",
      "Cod and Cabbage Stir-Fry (Low Carb)",
      "Turnip and Carrot Mash (Lower Glycemic Alternative)"
    );
  } else if (healthGoal?.id === "high-protein") {
    suggestions.push(
      "Protein-Packed Cod Cakes with Extra Egg",
      "Moose and Vegetable Protein Bowl",
      "High-Protein Chicken and Egg Scramble"
    );
  } else {
    // Default suggestions based on sales
    suggestions.push(
      "Traditional Jiggs Dinner with Fresh Vegetables",
      "Pan-Fried Cod with Local Root Vegetables",
      "Hearty Chicken and Vegetable Stew"
    );
  }

  // Add sale-specific suggestions
  if (availableSales) {
    availableSales.forEach(sale => {
      if (sale.ingredientId === "atlantic-cod") {
        suggestions.push(`Take advantage of ${sale.discount}% off cod - Perfect for healthy fish dishes!`);
      } else if (sale.ingredientId === "blueberries") {
        suggestions.push(`Wild blueberries on sale - Great for antioxidant-rich breakfast or desserts!`);
      }
    });
  }

  return suggestions.slice(0, 6);
};

// Smart shopping optimization
export const optimizeShoppingList = async (
  shoppingList: any[],
  healthGoal?: HealthGoal,
  budget?: number
): Promise<{
  optimizedList: any[];
  totalSavings: number;
  healthScore: number;
  suggestions: string[];
}> => {
  // Simulate AI processing
  await new Promise(resolve => setTimeout(resolve, 1000));

  let optimizedList = [...shoppingList];
  let totalSavings = 0;
  const suggestions: string[] = [];

  // Apply sale prices where available
  optimizedList = optimizedList.map(item => {
    const sale = currentSales.find(s => s.ingredientId === item.ingredientId);
    if (sale) {
      const savings = (sale.originalPrice - sale.salePrice) * item.amount;
      totalSavings += savings;
      suggestions.push(`Save $${savings.toFixed(2)} on ${item.ingredient.name} at ${sale.storeName}`);
      return {
        ...item,
        salePrice: sale.salePrice,
        originalPrice: sale.originalPrice,
        onSale: true
      };
    }
    return item;
  });

  // Health-based substitutions
  if (healthGoal) {
    if (healthGoal.id === "heart-healthy") {
      suggestions.push("Consider replacing salt beef with fresh cod for lower sodium");
      suggestions.push("Add more omega-3 rich fish to your weekly plan");
    } else if (healthGoal.id === "weight-management") {
      suggestions.push("Focus on lean proteins and increase vegetable portions");
      suggestions.push("Consider portion control for higher-calorie items");
    }
  }

  // Budget optimization
  if (budget) {
    const currentTotal = optimizedList.reduce((sum, item) => 
      sum + ((item.salePrice || item.originalPrice || 0) * item.amount), 0
    );
    
    if (currentTotal > budget) {
      suggestions.push(`Current total ($${currentTotal.toFixed(2)}) exceeds budget ($${budget.toFixed(2)})`);
      suggestions.push("Consider buying sale items in bulk or choosing store brands");
    }
  }

  const healthScore = 85; // Mock health score calculation

  return {
    optimizedList,
    totalSavings,
    healthScore,
    suggestions
  };
};