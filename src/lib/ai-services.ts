// AI-powered services for grocery planning and health recommendations

// Recipe type with optional nutrition info for analysis
interface RecipeInput {
  nutritionInfo?: {
    calories?: number;
  };
}

// Suggested meal type for optimization results
interface SuggestedMeal {
  name: string;
  ingredients: string[];
  onSale: boolean;
  healthBenefits: string[];
}

// Shopping item type for route optimization
interface ShoppingItem {
  ingredientId?: string;
  name?: string;
}

export interface SaleItem {
  id: string;
  ingredientId: string;
  storeName: string;
  storeType: 'sobeys' | 'dominion' | 'costco';
  originalPrice: number;
  salePrice: number;
  discountPercentage: number;
  validFrom: string;
  validUntil: string;
  description: string;
  isWeeklySpecial: boolean;
  quantity?: string;
}

export interface HealthProfile {
  id: string;
  userId: string;
  dietaryRestrictions: string[];
  allergies: string[];
  healthGoals: string[];
  preferredCuisines: string[];
  activityLevel: 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active' | 'extremely_active';
  age: number;
  gender: 'male' | 'female' | 'other';
  height: number; // cm
  weight: number; // kg
  targetCalories?: number;
  macroTargets?: {
    protein: number; // percentage
    carbs: number; // percentage
    fat: number; // percentage
  };
}

export interface HealthRecommendation {
  type: 'recipe' | 'ingredient' | 'meal_plan' | 'nutrition_tip';
  title: string;
  description: string;
  reasoning: string;
  priority: 'low' | 'medium' | 'high';
  category: string;
  actionable: boolean;
  relatedItems?: string[];
}

export interface NutritionAnalysis {
  totalCalories: number;
  macros: {
    protein: { grams: number; percentage: number; };
    carbs: { grams: number; percentage: number; };
    fat: { grams: number; percentage: number; };
  };
  micronutrients: {
    fiber: number;
    sodium: number;
    sugar: number;
    vitaminC: number;
    iron: number;
    calcium: number;
  };
  healthScore: number; // 0-100
  recommendations: string[];
}

// Mock AI service for sale detection
export class SaleDetectionService {
  private static mockSales: SaleItem[] = [
    {
      id: "sale-1",
      ingredientId: "atlantic-cod",
      storeName: "Sobeys Avalon Mall",
      storeType: "sobeys",
      originalPrice: 12.99,
      salePrice: 9.99,
      discountPercentage: 23,
      validFrom: "2024-01-15",
      validUntil: "2024-01-21",
      description: "Fresh Atlantic Cod - Weekly Special",
      isWeeklySpecial: true
    },
    {
      id: "sale-2",
      ingredientId: "blueberries",
      storeName: "Dominion Freshwater Road",
      storeType: "dominion",
      originalPrice: 4.99,
      salePrice: 2.99,
      discountPercentage: 40,
      validFrom: "2024-01-15",
      validUntil: "2024-01-18",
      description: "Wild Blueberries - Flash Sale",
      isWeeklySpecial: false
    },
    {
      id: "sale-3",
      ingredientId: "chicken-breast",
      storeName: "Costco St. John's",
      storeType: "costco",
      originalPrice: 7.99,
      salePrice: 5.99,
      discountPercentage: 25,
      validFrom: "2024-01-14",
      validUntil: "2024-01-28",
      description: "Family Pack Chicken Breast - Member Special",
      isWeeklySpecial: true,
      quantity: "Family pack 3-4 lbs"
    },
    {
      id: "sale-4",
      ingredientId: "carrots",
      storeName: "Sobeys Torbay Road",
      storeType: "sobeys",
      originalPrice: 2.99,
      salePrice: 1.99,
      discountPercentage: 33,
      validFrom: "2024-01-15",
      validUntil: "2024-01-21",
      description: "Local Carrots - Produce Special",
      isWeeklySpecial: true
    },
    {
      id: "sale-5",
      ingredientId: "oats",
      storeName: "Costco St. John's",
      storeType: "costco",
      originalPrice: 5.99,
      salePrice: 4.49,
      discountPercentage: 25,
      validFrom: "2024-01-10",
      validUntil: "2024-01-31",
      description: "Bulk Rolled Oats - Monthly Deal",
      isWeeklySpecial: false,
      quantity: "4 lb container"
    }
  ];

  static async getCurrentSales(storeType?: string): Promise<SaleItem[]> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (storeType) {
      return this.mockSales.filter(sale => sale.storeType === storeType);
    }
    return this.mockSales;
  }

  static async getSalesForIngredients(ingredientIds: string[]): Promise<SaleItem[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return this.mockSales.filter(sale => ingredientIds.includes(sale.ingredientId));
  }

  static async analyzeSaleTrends(_ingredientId: string): Promise<{
    averageDiscount: number;
    saleFrequency: string;
    bestStore: string;
    prediction: string;
  }> {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    // Mock analysis
    return {
      averageDiscount: 25,
      saleFrequency: "Every 2-3 weeks",
      bestStore: "Costco for bulk, Sobeys for fresh",
      prediction: "Next sale expected in 10-14 days"
    };
  }
}

// Mock AI service for health recommendations
export class HealthAIService {
  static async analyzeNutrition(recipes: RecipeInput[]): Promise<NutritionAnalysis> {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Mock nutrition analysis
    const totalCalories = recipes.reduce((sum, recipe) => {
      return sum + (recipe.nutritionInfo?.calories || 400);
    }, 0);

    return {
      totalCalories,
      macros: {
        protein: { grams: Math.round(totalCalories * 0.25 / 4), percentage: 25 },
        carbs: { grams: Math.round(totalCalories * 0.45 / 4), percentage: 45 },
        fat: { grams: Math.round(totalCalories * 0.30 / 9), percentage: 30 }
      },
      micronutrients: {
        fiber: 28,
        sodium: 1800,
        sugar: 45,
        vitaminC: 85,
        iron: 12,
        calcium: 950
      },
      healthScore: 78,
      recommendations: [
        "Add more leafy greens for increased fiber",
        "Consider reducing sodium intake",
        "Include more omega-3 rich fish",
        "Great protein balance for your activity level"
      ]
    };
  }

  static async generateHealthRecommendations(
    profile: HealthProfile,
    _currentMeals: RecipeInput[]
  ): Promise<HealthRecommendation[]> {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const recommendations: HealthRecommendation[] = [
      {
        type: 'recipe',
        title: 'Add Omega-3 Rich Meals',
        description: 'Include more Atlantic salmon and mackerel in your weekly plan',
        reasoning: 'Based on your heart health goals, omega-3 fatty acids can help reduce inflammation',
        priority: 'high',
        category: 'Heart Health',
        actionable: true,
        relatedItems: ['atlantic-cod', 'salmon']
      },
      {
        type: 'ingredient',
        title: 'Increase Fiber Intake',
        description: 'Add more local berries and whole grains to your meals',
        reasoning: 'Your current fiber intake is below recommended levels for your age group',
        priority: 'medium',
        category: 'Digestive Health',
        actionable: true,
        relatedItems: ['blueberries', 'partridgeberries', 'oats']
      },
      {
        type: 'meal_plan',
        title: 'Balance Your Macros',
        description: 'Adjust protein portions to meet your fitness goals',
        reasoning: 'For your activity level, you need 1.6g protein per kg body weight',
        priority: 'medium',
        category: 'Fitness',
        actionable: true
      },
      {
        type: 'nutrition_tip',
        title: 'Seasonal Eating Benefits',
        description: 'Take advantage of winter root vegetables for immune support',
        reasoning: 'Turnips and carrots are in season and provide essential vitamins',
        priority: 'low',
        category: 'Seasonal Health',
        actionable: false,
        relatedItems: ['turnip', 'carrots']
      }
    ];

    // Filter based on dietary restrictions
    if (profile.dietaryRestrictions.includes('vegetarian')) {
      return recommendations.filter(rec => 
        !rec.relatedItems?.some(item => ['atlantic-cod', 'salmon'].includes(item))
      );
    }

    return recommendations;
  }

  static async optimizeMealPlan(
    _profile: HealthProfile,
    _availableIngredients: string[],
    _salesData: SaleItem[]
  ): Promise<{
    suggestedMeals: SuggestedMeal[];
    costSavings: number;
    healthScore: number;
    reasoning: string[];
  }> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      suggestedMeals: [
        {
          name: "Heart-Healthy Cod with Roasted Vegetables",
          ingredients: ["atlantic-cod", "carrots", "turnip"],
          onSale: true,
          healthBenefits: ["High protein", "Low sodium", "Rich in omega-3"]
        },
        {
          name: "Antioxidant Berry Oatmeal",
          ingredients: ["oats", "blueberries", "milk"],
          onSale: true,
          healthBenefits: ["High fiber", "Antioxidants", "Sustained energy"]
        }
      ],
      costSavings: 12.50,
      healthScore: 85,
      reasoning: [
        "Prioritized ingredients currently on sale",
        "Matched meals to your heart health goals",
        "Included local, seasonal ingredients",
        "Balanced macronutrients for your activity level"
      ]
    };
  }

  static async getPersonalizedTips(_profile: HealthProfile): Promise<string[]> {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const tips = [
      "Shop the perimeter of the store first for fresh, whole foods",
      "Buy frozen berries when fresh ones aren't on sale - same nutrition!",
      "Batch cook proteins like cod on weekends to save time",
      "Local root vegetables store well and are budget-friendly",
      "Consider Costco for bulk healthy staples like oats and nuts"
    ];

    return tips;
  }
}

// Mock AI service for smart shopping optimization
export class SmartShoppingService {
  static async optimizeShoppingRoute(
    _shoppingList: ShoppingItem[],
    _selectedStores: string[],
    _salesData: SaleItem[]
  ): Promise<{
    optimizedRoute: {
      store: string;
      items: string[];
      estimatedTime: number;
      totalSavings: number;
    }[];
    totalSavings: number;
    recommendations: string[];
  }> {
    await new Promise(resolve => setTimeout(resolve, 700));
    
    return {
      optimizedRoute: [
        {
          store: "Costco St. John's",
          items: ["chicken-breast", "oats"],
          estimatedTime: 25,
          totalSavings: 3.50
        },
        {
          store: "Sobeys Avalon Mall",
          items: ["atlantic-cod", "carrots", "cabbage"],
          estimatedTime: 15,
          totalSavings: 4.00
        }
      ],
      totalSavings: 7.50,
      recommendations: [
        "Visit Costco first for bulk items",
        "Atlantic cod is 23% off at Sobeys this week",
        "Consider buying extra carrots - they're at their lowest price",
        "Skip Dominion this trip - no significant savings on your list"
      ]
    };
  }

  static async predictPriceChanges(_ingredientIds: string[]): Promise<{
    [ingredientId: string]: {
      currentTrend: 'rising' | 'falling' | 'stable';
      confidence: number;
      recommendation: 'buy_now' | 'wait' | 'stock_up';
      reasoning: string;
    };
  }> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      "atlantic-cod": {
        currentTrend: 'falling',
        confidence: 85,
        recommendation: 'buy_now',
        reasoning: 'Fishing season is good, prices expected to stay low for 2-3 weeks'
      },
      "blueberries": {
        currentTrend: 'rising',
        confidence: 70,
        recommendation: 'stock_up',
        reasoning: 'End of frozen berry sales, prices will increase next month'
      }
    };
  }
}