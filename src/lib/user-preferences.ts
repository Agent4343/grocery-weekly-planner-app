// User preferences and onboarding types for meal planning AI

export interface HouseholdMember {
  type: 'adult' | 'teen' | 'child' | 'toddler';
  count: number;
}

export interface Household {
  members: HouseholdMember[];
  totalPeople: number;
}

export type BudgetLevel = 'low' | 'medium' | 'flexible';
export type CookingSkillLevel = 'beginner' | 'intermediate' | 'advanced';
export type MealTimeAvailability = 'quick' | 'moderate' | 'flexible';
export type MealPreference = 'weekly-planning' | 'family-friendly' | 'quick-meals' | 'healthy' | 'high-protein' | 'comfort-food';

export interface DietaryContext {
  allergies: string[];
  restrictions: string[];
  budgetLevel: BudgetLevel;
  cookingSkill: CookingSkillLevel;
  timePerMeal: MealTimeAvailability;
}

export interface UserPreferences {
  id: string;
  createdAt: string;
  updatedAt: string;

  // Location
  location: {
    city: string;
    region: string;
  };

  // Store Selection
  selectedStores: string[]; // Store IDs

  // Household
  household: Household;

  // Dietary Context
  dietaryContext: DietaryContext;

  // Meal Preferences
  mealPreferences: MealPreference[];

  // Deal Settings
  autoSearchDeals: boolean;

  // Onboarding Status
  onboardingComplete: boolean;
}

export const DEFAULT_USER_PREFERENCES: UserPreferences = {
  id: '',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  location: {
    city: '',
    region: 'Newfoundland & Labrador'
  },
  selectedStores: [],
  household: {
    members: [{ type: 'adult', count: 1 }],
    totalPeople: 1
  },
  dietaryContext: {
    allergies: [],
    restrictions: [],
    budgetLevel: 'medium',
    cookingSkill: 'intermediate',
    timePerMeal: 'moderate'
  },
  mealPreferences: ['weekly-planning'],
  autoSearchDeals: true,
  onboardingComplete: false
};

// Common allergies in NL
export const COMMON_ALLERGIES = [
  'Peanuts',
  'Tree Nuts',
  'Milk',
  'Eggs',
  'Fish',
  'Shellfish',
  'Soy',
  'Wheat',
  'Sesame',
  'Mustard',
  'Sulphites'
];

// Common dietary restrictions
export const DIETARY_RESTRICTIONS = [
  'Vegetarian',
  'Vegan',
  'Gluten-Free',
  'Dairy-Free',
  'Kosher',
  'Halal',
  'Low-Sodium',
  'Low-Sugar',
  'Keto',
  'Paleo'
];

// Meal preference labels
export const MEAL_PREFERENCE_LABELS: Record<MealPreference, { label: string; description: string }> = {
  'weekly-planning': {
    label: 'Weekly Meal Planning',
    description: 'Plan all your meals for the week ahead'
  },
  'family-friendly': {
    label: 'Family-Friendly Meals',
    description: 'Meals that everyone in the family will enjoy'
  },
  'quick-meals': {
    label: 'Quick Meals',
    description: '30 minutes or less from start to finish'
  },
  'healthy': {
    label: 'Healthy Eating',
    description: 'Nutritious, balanced meals'
  },
  'high-protein': {
    label: 'High Protein',
    description: 'Protein-packed meals for active lifestyles'
  },
  'comfort-food': {
    label: 'Comfort Food',
    description: 'Classic, satisfying dishes'
  }
};

// Budget level descriptions
export const BUDGET_DESCRIPTIONS: Record<BudgetLevel, { label: string; description: string; weeklyEstimate: string }> = {
  low: {
    label: 'Budget-Conscious',
    description: 'Maximize savings, focus on deals',
    weeklyEstimate: '$75-100/week for family of 4'
  },
  medium: {
    label: 'Balanced',
    description: 'Good value with some flexibility',
    weeklyEstimate: '$125-175/week for family of 4'
  },
  flexible: {
    label: 'Flexible',
    description: 'Quality and convenience first',
    weeklyEstimate: '$200+/week for family of 4'
  }
};

// Cooking skill descriptions
export const COOKING_SKILL_DESCRIPTIONS: Record<CookingSkillLevel, { label: string; description: string }> = {
  beginner: {
    label: 'Beginner',
    description: 'Simple recipes with basic techniques'
  },
  intermediate: {
    label: 'Intermediate',
    description: 'Comfortable with most cooking methods'
  },
  advanced: {
    label: 'Advanced',
    description: 'Enjoy complex recipes and techniques'
  }
};

// Time availability descriptions
export const TIME_AVAILABILITY_DESCRIPTIONS: Record<MealTimeAvailability, { label: string; maxMinutes: number }> = {
  quick: {
    label: '15-30 minutes',
    maxMinutes: 30
  },
  moderate: {
    label: '30-60 minutes',
    maxMinutes: 60
  },
  flexible: {
    label: '60+ minutes',
    maxMinutes: 180
  }
};

// Household member serving calculations
export const SERVING_MULTIPLIERS: Record<HouseholdMember['type'], number> = {
  adult: 1.0,
  teen: 1.0,
  child: 0.65,
  toddler: 0.35
};

// Calculate total servings needed for a household
export const calculateServingsNeeded = (household: Household): number => {
  return household.members.reduce((total, member) => {
    return total + (member.count * SERVING_MULTIPLIERS[member.type]);
  }, 0);
};

// Calculate total household size
export const calculateHouseholdSize = (members: HouseholdMember[]): number => {
  return members.reduce((total, member) => total + member.count, 0);
};

// Generate unique ID
export const generatePreferencesId = (): string => {
  return `pref_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
};
