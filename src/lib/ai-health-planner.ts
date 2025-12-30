// AI services for health planning and sale tracking

export interface HealthProfile {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  healthGoals: string[];
  dietaryRestrictions: string[];
  allergies: string[];
  medicalConditions: string[];
  targetCalories?: number;
  targetProtein?: number;
  targetCarbs?: number;
  targetFat?: number;
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
  quantity?: string;
  isFlashSale: boolean;
  stockLevel: 'high' | 'medium' | 'low' | 'limited';
}

export interface HealthRecommendation {
  type: 'ingredient' | 'recipe' | 'meal_plan' | 'nutrition_tip';
  title: string;
  description: string;
  reasoning: string;
  priority: 'high' | 'medium' | 'low';
  healthBenefits: string[];
  nutritionalValue?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber?: number;
    vitamins?: string[];
    minerals?: string[];
  };
}

export interface AIAnalysisResult {
  healthRecommendations: HealthRecommendation[];
  saleOpportunities: SaleItem[];
  optimizedMealPlan: {
    day: string;
    meals: {
      breakfast: string;
      lunch: string;
      dinner: string;
      snacks: string[];
    };
    nutritionSummary: {
      totalCalories: number;
      totalProtein: number;
      totalCarbs: number;
      totalFat: number;
      healthScore: number;
    };
    estimatedCost: number;
    savingsFromSales: number;
  }[];
  shoppingOptimization: {
    priorityItems: string[];
    saleItems: string[];
    healthyAlternatives: string[];
    budgetTips: string[];
  };
}

// Mock AI service - In production, this would connect to OpenAI, Claude, or similar
export class AIHealthPlannerService {
  private static instance: AIHealthPlannerService;

  static getInstance(): AIHealthPlannerService {
    if (!AIHealthPlannerService.instance) {
      AIHealthPlannerService.instance = new AIHealthPlannerService();
    }
    return AIHealthPlannerService.instance;
  }

  async analyzeHealthProfile(profile: HealthProfile): Promise<HealthRecommendation[]> {
    // Simulate AI analysis delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const recommendations: HealthRecommendation[] = [];

    // Generate recommendations based on health goals
    if (profile.healthGoals.includes('weight_loss')) {
      recommendations.push({
        type: 'nutrition_tip',
        title: 'Focus on Lean Proteins',
        description: 'Atlantic cod and other local fish are excellent for weight management',
        reasoning: 'High protein, low calorie density helps with satiety and muscle preservation',
        priority: 'high',
        healthBenefits: ['Weight management', 'Muscle preservation', 'Heart health'],
        nutritionalValue: {
          calories: 120,
          protein: 26,
          carbs: 0,
          fat: 1
        }
      });
    }

    if (profile.healthGoals.includes('heart_health')) {
      recommendations.push({
        type: 'ingredient',
        title: 'Wild Blueberries',
        description: 'Newfoundland wild blueberries are rich in antioxidants',
        reasoning: 'Anthocyanins in wild blueberries support cardiovascular health',
        priority: 'high',
        healthBenefits: ['Heart health', 'Brain function', 'Anti-inflammatory'],
        nutritionalValue: {
          calories: 80,
          protein: 1,
          carbs: 21,
          fat: 0,
          fiber: 4,
          vitamins: ['Vitamin C', 'Vitamin K'],
          minerals: ['Manganese']
        }
      });
    }

    if (profile.healthGoals.includes('muscle_gain')) {
      recommendations.push({
        type: 'recipe',
        title: 'Protein-Rich Jiggs Dinner',
        description: 'Traditional meal with added lean protein sources',
        reasoning: 'Combines complex carbs with high-quality protein for muscle building',
        priority: 'medium',
        healthBenefits: ['Muscle building', 'Energy', 'Traditional nutrition'],
        nutritionalValue: {
          calories: 520,
          protein: 38,
          carbs: 45,
          fat: 18
        }
      });
    }

    // Add dietary restriction considerations
    if (profile.dietaryRestrictions.includes('gluten_free')) {
      recommendations.push({
        type: 'nutrition_tip',
        title: 'Gluten-Free Newfoundland Options',
        description: 'Focus on fresh seafood, root vegetables, and berries',
        reasoning: 'Natural whole foods are inherently gluten-free and locally available',
        priority: 'medium',
        healthBenefits: ['Digestive health', 'Nutrient density', 'Local sourcing']
      });
    }

    return recommendations;
  }

  async getCurrentSales(): Promise<SaleItem[]> {
    // Simulate API call to store systems
    await new Promise(resolve => setTimeout(resolve, 1000));

    const currentDate = new Date();
    const nextWeek = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);

    return [
      {
        id: 'sale-1',
        ingredientId: 'atlantic-cod',
        storeName: 'Sobeys Avalon Mall',
        storeType: 'sobeys',
        originalPrice: 12.99,
        salePrice: 9.99,
        discountPercentage: 23,
        validFrom: currentDate.toISOString(),
        validUntil: nextWeek.toISOString(),
        quantity: 'per lb',
        isFlashSale: false,
        stockLevel: 'high'
      },
      {
        id: 'sale-2',
        ingredientId: 'blueberries',
        storeName: 'Dominion Freshwater Road',
        storeType: 'dominion',
        originalPrice: 4.99,
        salePrice: 2.99,
        discountPercentage: 40,
        validFrom: currentDate.toISOString(),
        validUntil: nextWeek.toISOString(),
        quantity: 'per container',
        isFlashSale: true,
        stockLevel: 'medium'
      },
      {
        id: 'sale-3',
        ingredientId: 'chicken-breast',
        storeName: 'Costco St. Johns',
        storeType: 'costco',
        originalPrice: 7.99,
        salePrice: 5.99,
        discountPercentage: 25,
        validFrom: currentDate.toISOString(),
        validUntil: nextWeek.toISOString(),
        quantity: 'family pack',
        isFlashSale: false,
        stockLevel: 'high'
      },
      {
        id: 'sale-4',
        ingredientId: 'carrots',
        storeName: 'Sobeys Torbay Road',
        storeType: 'sobeys',
        originalPrice: 2.99,
        salePrice: 1.99,
        discountPercentage: 33,
        validFrom: currentDate.toISOString(),
        validUntil: nextWeek.toISOString(),
        quantity: '2 lb bag',
        isFlashSale: false,
        stockLevel: 'high'
      },
      {
        id: 'sale-5',
        ingredientId: 'oats',
        storeName: 'Costco St. Johns',
        storeType: 'costco',
        originalPrice: 8.99,
        salePrice: 6.99,
        discountPercentage: 22,
        validFrom: currentDate.toISOString(),
        validUntil: nextWeek.toISOString(),
        quantity: 'bulk container',
        isFlashSale: false,
        stockLevel: 'high'
      }
    ];
  }

  async generateOptimizedMealPlan(
    profile: HealthProfile,
    sales: SaleItem[],
    _preferences: {
      budget?: number;
      cookingTime?: number;
      servings?: number;
      preferredStores?: string[];
    }
  ): Promise<AIAnalysisResult> {
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    const healthRecommendations = await this.analyzeHealthProfile(profile);
    
    return {
      healthRecommendations,
      saleOpportunities: sales,
      optimizedMealPlan: [
        {
          day: 'Monday',
          meals: {
            breakfast: 'Newfoundland Oatmeal with Wild Blueberries',
            lunch: 'Atlantic Cod Salad',
            dinner: 'Lean Jiggs Dinner',
            snacks: ['Partridgeberry Trail Mix', 'Carrot Sticks']
          },
          nutritionSummary: {
            totalCalories: 1850,
            totalProtein: 125,
            totalCarbs: 180,
            totalFat: 65,
            healthScore: 92
          },
          estimatedCost: 18.50,
          savingsFromSales: 4.25
        },
        {
          day: 'Tuesday',
          meals: {
            breakfast: 'Protein-Rich Scrambled Eggs',
            lunch: 'Chicken and Vegetable Soup',
            dinner: 'Baked Cod with Roasted Vegetables',
            snacks: ['Greek Yogurt', 'Apple Slices']
          },
          nutritionSummary: {
            totalCalories: 1780,
            totalProtein: 135,
            totalCarbs: 165,
            totalFat: 58,
            healthScore: 89
          },
          estimatedCost: 16.75,
          savingsFromSales: 3.80
        },
        {
          day: 'Wednesday',
          meals: {
            breakfast: 'Blueberry Protein Smoothie',
            lunch: 'Leftover Cod and Vegetables',
            dinner: 'Chicken Stir-Fry with Local Vegetables',
            snacks: ['Mixed Nuts', 'Berries']
          },
          nutritionSummary: {
            totalCalories: 1920,
            totalProtein: 140,
            totalCarbs: 175,
            totalFat: 70,
            healthScore: 88
          },
          estimatedCost: 17.25,
          savingsFromSales: 5.10
        }
      ],
      shoppingOptimization: {
        priorityItems: [
          'Atlantic Cod (on sale at Sobeys)',
          'Wild Blueberries (flash sale at Dominion)',
          'Chicken Breast (bulk discount at Costco)'
        ],
        saleItems: [
          'Atlantic Cod - 23% off',
          'Blueberries - 40% off (flash sale)',
          'Chicken Breast - 25% off',
          'Carrots - 33% off',
          'Oats - 22% off'
        ],
        healthyAlternatives: [
          'Replace white potatoes with sweet potatoes for more nutrients',
          'Choose wild-caught fish over farmed when available',
          'Opt for steel-cut oats instead of instant for better nutrition'
        ],
        budgetTips: [
          'Buy sale items in bulk and freeze portions',
          'Shop at Costco for family-size portions to save per unit',
          'Combine sales across stores for maximum savings',
          'Use seasonal vegetables for better prices and nutrition'
        ]
      }
    };
  }

  async analyzeNutritionalNeeds(profile: HealthProfile): Promise<{
    dailyTargets: {
      calories: number;
      protein: number;
      carbs: number;
      fat: number;
      fiber: number;
    };
    recommendations: string[];
    warnings: string[];
  }> {
    // Calculate nutritional needs based on profile
    let baseCalories = 2000;
    
    // Adjust for gender
    if (profile.gender === 'male') {
      baseCalories = 2500;
    } else if (profile.gender === 'female') {
      baseCalories = 2000;
    }

    // Adjust for age
    if (profile.age > 50) {
      baseCalories -= 200;
    } else if (profile.age < 25) {
      baseCalories += 200;
    }

    // Adjust for activity level
    const activityMultipliers = {
      sedentary: 1.0,
      light: 1.2,
      moderate: 1.4,
      active: 1.6,
      very_active: 1.8
    };

    baseCalories *= activityMultipliers[profile.activityLevel];

    // Adjust for health goals
    if (profile.healthGoals.includes('weight_loss')) {
      baseCalories -= 500; // 1 lb per week loss
    } else if (profile.healthGoals.includes('muscle_gain')) {
      baseCalories += 300;
    }

    const protein = Math.round(baseCalories * 0.25 / 4); // 25% of calories from protein
    const carbs = Math.round(baseCalories * 0.45 / 4); // 45% from carbs
    const fat = Math.round(baseCalories * 0.30 / 9); // 30% from fat
    const fiber = Math.round(baseCalories / 1000 * 14); // 14g per 1000 calories

    const recommendations = [];
    const warnings = [];

    // Generate personalized recommendations
    if (profile.healthGoals.includes('heart_health')) {
      recommendations.push('Focus on omega-3 rich fish like Atlantic salmon and cod');
      recommendations.push('Include antioxidant-rich berries in your daily diet');
    }

    if (profile.dietaryRestrictions.includes('diabetes')) {
      recommendations.push('Choose complex carbohydrates and monitor portion sizes');
      warnings.push('Monitor blood sugar levels when trying new meal plans');
    }

    if (profile.allergies.includes('shellfish')) {
      warnings.push('Avoid lobster, crab, and shrimp - focus on fin fish instead');
    }

    return {
      dailyTargets: {
        calories: Math.round(baseCalories),
        protein,
        carbs,
        fat,
        fiber
      },
      recommendations,
      warnings
    };
  }
}

// Utility functions for AI integration
export const formatHealthGoals = (goals: string[]): string => {
  const goalMap: Record<string, string> = {
    weight_loss: 'Weight Loss',
    muscle_gain: 'Muscle Gain',
    heart_health: 'Heart Health',
    diabetes_management: 'Diabetes Management',
    general_wellness: 'General Wellness',
    energy_boost: 'Energy & Vitality',
    digestive_health: 'Digestive Health'
  };

  return goals.map(goal => goalMap[goal] || goal).join(', ');
};

export const calculateHealthScore = (
  calories: number,
  protein: number,
  carbs: number,
  fat: number,
  targets: { calories: number; protein: number; carbs: number; fat: number }
): number => {
  const calorieScore = Math.max(0, 100 - Math.abs(calories - targets.calories) / targets.calories * 100);
  const proteinScore = Math.max(0, 100 - Math.abs(protein - targets.protein) / targets.protein * 100);
  const carbScore = Math.max(0, 100 - Math.abs(carbs - targets.carbs) / targets.carbs * 100);
  const fatScore = Math.max(0, 100 - Math.abs(fat - targets.fat) / targets.fat * 100);

  return Math.round((calorieScore + proteinScore + carbScore + fatScore) / 4);
};

export const getSalesSavings = (sales: SaleItem[]): number => {
  return sales.reduce((total, sale) => {
    return total + (sale.originalPrice - sale.salePrice);
  }, 0);
};