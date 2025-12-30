// Newsletter types for NL Grocery Deals Newsletter

import { DealItem } from './meal-planning-ai';

export type NewsletterFrequency = 'daily' | 'weekly';
export type NewsletterStatus = 'draft' | 'published' | 'archived';

export interface FeaturedDeal {
  deal: DealItem;
  headline: string;
  description: string;
  savingsTip: string;
  isPremiumSpot: boolean; // For monetization - featured placement
}

export interface DealCategory {
  name: string;
  icon: string;
  deals: DealItem[];
  totalSavings: number;
  topPick?: DealItem;
}

export interface PriceTrend {
  ingredient: string;
  trend: 'rising' | 'falling' | 'stable';
  changePercent: number;
  recommendation: string;
}

export interface NewsletterSection {
  type: 'hero' | 'featured' | 'category' | 'tips' | 'trends' | 'recipes' | 'ad';
  title: string;
  content: unknown;
  order: number;
}

export interface RecipeSuggestion {
  id: string;
  name: string;
  description: string;
  usesDeals: string[]; // ingredient names on sale
  estimatedSavings: number;
  prepTime: number;
  servings: number;
}

export interface Newsletter {
  id: string;
  createdAt: string;
  publishedAt?: string;
  status: NewsletterStatus;
  frequency: NewsletterFrequency;

  // Header info
  title: string;
  subtitle: string;
  edition: string; // e.g., "Week 52, 2024" or "December 30, 2024"

  // Content
  greeting: string;
  heroMessage: string;

  // Featured content
  topDeal: FeaturedDeal | null;
  featuredDeals: FeaturedDeal[];

  // Categorized deals
  categories: DealCategory[];

  // Additional content
  savingsTips: string[];
  priceTrends: PriceTrend[];
  recipeSuggestions: RecipeSuggestion[];

  // Stats
  totalDealsCount: number;
  totalPotentialSavings: number;
  storesIncluded: string[];

  // Regions covered
  regionsIncluded: string[];

  // Closing
  closingMessage: string;

  // Metadata for AI agents
  generatedBy: 'ai' | 'manual';
  aiPromptUsed?: string;
  version: number;
}

export interface NewsletterPreferences {
  frequency: NewsletterFrequency;
  preferredStores: string[];
  preferredCategories: string[];
  includeRecipes: boolean;
  includePriceTrends: boolean;
  includeTips: boolean;
  emailAddress?: string;
  subscribed: boolean;
}

export interface GenerateNewsletterRequest {
  frequency?: NewsletterFrequency;
  storeIds?: string[];
  customGreeting?: string;
  customClosing?: string;
  focusCategories?: string[];
  includeRecipes?: boolean;
  aiEnhancements?: boolean;
}

export interface GenerateNewsletterResponse {
  success: boolean;
  newsletter?: Newsletter;
  error?: string;
  generatedAt: string;
  processingTimeMs: number;
}

export const DEFAULT_NEWSLETTER_PREFERENCES: NewsletterPreferences = {
  frequency: 'daily',
  preferredStores: [],
  preferredCategories: [],
  includeRecipes: true,
  includePriceTrends: true,
  includeTips: true,
  subscribed: false,
};

// Category icons for newsletter display
export const CATEGORY_ICONS: Record<string, string> = {
  'Proteins': '🥩',
  'Produce': '🥬',
  'Dairy': '🥛',
  'Pantry': '🥫',
  'Frozen': '❄️',
  'Beverages': '🥤',
  'Bakery': '🍞',
  'Seafood': '🐟',
  'Meat': '🍖',
  'Poultry': '🍗',
  'Deli': '🥪',
  'Baking': '🧁',
  'Default': '🛒',
};

// Newsletter templates for different contexts
export const NEWSLETTER_TEMPLATES = {
  weekday: {
    greetings: [
      "Good morning, savvy shopper!",
      "Hello, deal hunter!",
      "Hey there, money-saver!",
    ],
    closings: [
      "Happy shopping and saving!",
      "May your cart be full and your wallet happy!",
      "Here's to smart shopping!",
    ],
  },
  weekend: {
    greetings: [
      "Happy weekend shopping!",
      "Ready for your weekend grocery run?",
      "Weekend deals are here!",
    ],
    closings: [
      "Enjoy your weekend cooking!",
      "Stock up and save this weekend!",
      "Have a delicious weekend!",
    ],
  },
  holiday: {
    greetings: [
      "Holiday savings are here!",
      "Festive deals for your family!",
      "Celebrate with great savings!",
    ],
    closings: [
      "Wishing you a delicious holiday!",
      "Happy holidays and happy savings!",
      "Enjoy the festive feast!",
    ],
  },
};
