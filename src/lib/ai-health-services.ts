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

// AI-powered health analysis
export const analyzeNutritionalContent = async (recipes: any[], healthGoal?: HealthGoal): Promise<NutritionalAnalysis> => {
  // Simulate AI analysis
  await new Promise(resolve => setTimeout(resolve, 1000));

  let totalCalories = 0;
  let totalProtein = 0;
  let totalCarbs = 0;
  let totalFat = 0;
  let totalFiber = 0;
  let totalSodium = 0;
  let totalSugar = 0;

  // Calculate totals from recipes
  recipes.forEach(recipe => {
    if (recipe.nutritionInfo) {
      totalCalories += recipe.nutritionInfo.calories || 0;
      totalProtein += recipe.nutritionInfo.protein || 0;
      totalCarbs += recipe.nutritionInfo.carbs || 0;
      totalFat += recipe.nutritionInfo.fat || 0;
      totalFiber += (recipe.nutritionInfo.fiber || 0);
      totalSodium += (recipe.nutritionInfo.sodium || 0);
      totalSugar += (recipe.nutritionInfo.sugar || 0);
    }
  });

  // Calculate health score based on goals
  let healthScore = 75; // Base score
  const recommendations: string[] = [];
  const warnings: string[] = [];

  if (healthGoal) {
    // Check against health goal targets
    if (healthGoal.targetNutrients.calories) {
      if (totalCalories < (healthGoal.targetNutrients.calories.min || 0)) {
        healthScore -= 10;
        recommendations.push("Consider adding more calorie-dense healthy foods like nuts or avocados");
      }
      if (totalCalories > (healthGoal.targetNutrients.calories.max || 3000)) {
        healthScore -= 15;
        warnings.push("Daily calorie intake exceeds recommended amount for your goal");
      }
    }

    if (healthGoal.targetNutrients.protein && totalProtein < (healthGoal.targetNutrients.protein.min || 0)) {
      healthScore -= 10;
      recommendations.push("Add more protein sources like fish, chicken, or legumes");
    }

    if (healthGoal.targetNutrients.fiber && totalFiber < (healthGoal.targetNutrients.fiber.min || 0)) {
      healthScore -= 10;
      recommendations.push("Include more fiber-rich foods like vegetables and whole grains");
    }

    if (healthGoal.targetNutrients.sodium && totalSodium > (healthGoal.targetNutrients.sodium.max || 2300)) {
      healthScore -= 15;
      warnings.push("Sodium intake is high - consider reducing processed foods");
    }
  }

  // General recommendations
  if (totalProtein > 25) {
    healthScore += 5;
    recommendations.push("Great protein intake for muscle health!");
  }

  if (totalFiber > 20) {
    healthScore += 5;
    recommendations.push("Excellent fiber intake for digestive health!");
  }

  // Ensure score is between 0-100
  healthScore = Math.max(0, Math.min(100, healthScore));

  return {
    totalCalories,
    totalProtein,
    totalCarbs,
    totalFat,
    totalFiber,
    totalSodium,
    totalSugar,
    healthScore,
    recommendations,
    warnings
  };
};

// AI-powered sale recommendations
export const getPersonalizedSaleRecommendations = async (
  healthGoal?: HealthGoal,
  _currentMeals?: any[]
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