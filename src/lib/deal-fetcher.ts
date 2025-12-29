// Deal Fetcher Service - Fetches weekly deals from NL grocery stores
// Currently uses realistic sample data, ready for API integration

import { DealItem } from './meal-planning-ai';
import { getStoreById } from './nl-locations';

// Typical NL grocery items with realistic prices
const TYPICAL_DEALS_DATA = {
  // Proteins
  proteins: [
    { name: 'Chicken Breast', category: 'Poultry', normalPrice: 12.99, unit: 'per kg' },
    { name: 'Ground Beef', category: 'Meat', normalPrice: 8.99, unit: 'per lb' },
    { name: 'Pork Chops', category: 'Meat', normalPrice: 7.99, unit: 'per lb' },
    { name: 'Atlantic Salmon', category: 'Seafood', normalPrice: 14.99, unit: 'per lb' },
    { name: 'Atlantic Cod', category: 'Seafood', normalPrice: 12.99, unit: 'per lb' },
    { name: 'Shrimp', category: 'Seafood', normalPrice: 11.99, unit: '340g bag' },
    { name: 'Bacon', category: 'Meat', normalPrice: 7.99, unit: '500g pkg' },
    { name: 'Turkey Breast', category: 'Poultry', normalPrice: 9.99, unit: 'per lb' },
    { name: 'Salt Beef', category: 'Meat', normalPrice: 9.49, unit: 'per lb' },
    { name: 'Bologna', category: 'Deli', normalPrice: 4.99, unit: '500g' },
  ],
  // Produce
  produce: [
    { name: 'Bananas', category: 'Produce', normalPrice: 1.49, unit: 'per lb' },
    { name: 'Apples', category: 'Produce', normalPrice: 3.99, unit: '3 lb bag' },
    { name: 'Potatoes', category: 'Produce', normalPrice: 4.99, unit: '10 lb bag' },
    { name: 'Carrots', category: 'Produce', normalPrice: 2.99, unit: '2 lb bag' },
    { name: 'Onions', category: 'Produce', normalPrice: 2.99, unit: '3 lb bag' },
    { name: 'Cabbage', category: 'Produce', normalPrice: 2.49, unit: 'each' },
    { name: 'Turnip', category: 'Produce', normalPrice: 1.99, unit: 'per lb' },
    { name: 'Broccoli', category: 'Produce', normalPrice: 2.99, unit: 'each' },
    { name: 'Celery', category: 'Produce', normalPrice: 2.99, unit: 'bunch' },
    { name: 'Lettuce', category: 'Produce', normalPrice: 2.49, unit: 'head' },
    { name: 'Tomatoes', category: 'Produce', normalPrice: 2.99, unit: 'per lb' },
    { name: 'Cucumbers', category: 'Produce', normalPrice: 1.49, unit: 'each' },
    { name: 'Wild Blueberries', category: 'Produce', normalPrice: 5.99, unit: 'pint' },
    { name: 'Partridgeberries', category: 'Produce', normalPrice: 6.99, unit: 'pint' },
  ],
  // Dairy
  dairy: [
    { name: 'Milk 2%', category: 'Dairy', normalPrice: 5.49, unit: '4L' },
    { name: 'Large Eggs', category: 'Dairy', normalPrice: 4.99, unit: 'dozen' },
    { name: 'Butter', category: 'Dairy', normalPrice: 5.99, unit: '454g' },
    { name: 'Cheese Block', category: 'Dairy', normalPrice: 8.99, unit: '400g' },
    { name: 'Yogurt', category: 'Dairy', normalPrice: 4.99, unit: '650g' },
    { name: 'Cream Cheese', category: 'Dairy', normalPrice: 4.49, unit: '250g' },
    { name: 'Sour Cream', category: 'Dairy', normalPrice: 2.99, unit: '500ml' },
  ],
  // Pantry
  pantry: [
    { name: 'Bread', category: 'Bakery', normalPrice: 3.49, unit: 'loaf' },
    { name: 'All-Purpose Flour', category: 'Baking', normalPrice: 5.99, unit: '2.5kg' },
    { name: 'Sugar', category: 'Baking', normalPrice: 4.99, unit: '2kg' },
    { name: 'Rice', category: 'Pantry', normalPrice: 6.99, unit: '2kg' },
    { name: 'Pasta', category: 'Pantry', normalPrice: 2.49, unit: '450g' },
    { name: 'Purity Hard Bread', category: 'Bakery', normalPrice: 4.99, unit: 'box' },
    { name: 'Canned Beans', category: 'Pantry', normalPrice: 1.99, unit: '540ml' },
    { name: 'Canned Tomatoes', category: 'Pantry', normalPrice: 2.49, unit: '796ml' },
    { name: 'Vegetable Oil', category: 'Pantry', normalPrice: 5.99, unit: '1L' },
    { name: 'Olive Oil', category: 'Pantry', normalPrice: 8.99, unit: '500ml' },
    { name: 'Cereal', category: 'Pantry', normalPrice: 5.99, unit: 'box' },
    { name: 'Peanut Butter', category: 'Pantry', normalPrice: 4.99, unit: '500g' },
  ],
  // Frozen
  frozen: [
    { name: 'Frozen Vegetables', category: 'Frozen', normalPrice: 3.99, unit: '750g' },
    { name: 'Frozen French Fries', category: 'Frozen', normalPrice: 4.49, unit: '1kg' },
    { name: 'Ice Cream', category: 'Frozen', normalPrice: 5.99, unit: '1.5L' },
    { name: 'Frozen Pizza', category: 'Frozen', normalPrice: 6.99, unit: 'each' },
    { name: 'Fish Sticks', category: 'Frozen', normalPrice: 7.99, unit: '700g' },
  ],
  // Beverages
  beverages: [
    { name: 'Orange Juice', category: 'Beverages', normalPrice: 4.99, unit: '1.89L' },
    { name: 'Coffee', category: 'Beverages', normalPrice: 9.99, unit: '340g' },
    { name: 'Tea', category: 'Beverages', normalPrice: 4.99, unit: '72 bags' },
    { name: 'Soft Drinks', category: 'Beverages', normalPrice: 5.99, unit: '12-pack' },
  ],
};

// Store-specific deal patterns (which stores tend to have which deals)
const STORE_DEAL_PATTERNS: Record<string, string[]> = {
  'dominion': ['proteins', 'produce', 'dairy', 'pantry'],
  'atlantic-superstore': ['proteins', 'produce', 'pantry', 'frozen'],
  'sobeys': ['proteins', 'produce', 'dairy', 'beverages'],
  'colemans': ['proteins', 'produce', 'pantry'], // Local focus
  'walmart': ['pantry', 'frozen', 'beverages', 'dairy'],
  'costco': ['proteins', 'dairy', 'pantry', 'beverages'], // Bulk deals
  'nofrills': ['produce', 'pantry', 'dairy', 'frozen'], // Budget focus
  'foodland': ['proteins', 'produce', 'dairy'],
};

// Get week number for rotating deals
function getWeekNumber(): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const diff = now.getTime() - start.getTime();
  const oneWeek = 1000 * 60 * 60 * 24 * 7;
  return Math.floor(diff / oneWeek);
}

// Generate a seeded random number for consistent weekly deals
function seededRandom(seed: number): () => number {
  return function() {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}

// Generate deals for a specific store
function generateStoreDeals(storeId: string, weekSeed: number): DealItem[] {
  const store = getStoreById(storeId);
  if (!store) return [];

  const storeType = store.type;
  const dealCategories = STORE_DEAL_PATTERNS[storeType] || ['produce', 'pantry'];
  const random = seededRandom(weekSeed + storeId.charCodeAt(0));

  const deals: DealItem[] = [];
  const now = new Date();
  const weekEnd = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

  // Generate 4-8 deals per store
  const numDeals = Math.floor(random() * 5) + 4;
  const usedItems = new Set<string>();

  for (let i = 0; i < numDeals; i++) {
    // Pick a random category this store focuses on
    const category = dealCategories[Math.floor(random() * dealCategories.length)];
    const items = TYPICAL_DEALS_DATA[category as keyof typeof TYPICAL_DEALS_DATA];

    if (!items || items.length === 0) continue;

    // Pick a random item from the category
    const item = items[Math.floor(random() * items.length)];

    // Skip if already used
    if (usedItems.has(item.name)) continue;
    usedItems.add(item.name);

    // Calculate discount (15-40%)
    const discountPercent = Math.floor(random() * 26) + 15;
    const salePrice = Math.round(item.normalPrice * (1 - discountPercent / 100) * 100) / 100;

    // Some items are flash sales (20% chance)
    const isFlashSale = random() < 0.2;

    deals.push({
      id: `fetched-${storeId}-${item.name.toLowerCase().replace(/\s+/g, '-')}-${weekSeed}`,
      ingredientId: item.name.toLowerCase().replace(/\s+/g, '-'),
      ingredientName: item.name,
      storeId: storeId,
      storeName: store.name,
      originalPrice: item.normalPrice,
      salePrice: salePrice,
      discountPercentage: discountPercent,
      validFrom: now.toISOString(),
      validUntil: weekEnd.toISOString(),
      quantity: item.unit,
      isFlashSale: isFlashSale,
      category: item.category,
    });
  }

  return deals;
}

export interface FetchDealsResult {
  deals: DealItem[];
  fetchedAt: string;
  storeCount: number;
  source: 'sample' | 'flipp' | 'api';
  weekOf: string;
}

// Main function to fetch deals for selected stores
export async function fetchWeeklyDeals(storeIds: string[]): Promise<FetchDealsResult> {
  const weekNumber = getWeekNumber();
  const weekSeed = weekNumber * 1000;

  // Generate deals for each selected store
  const allDeals: DealItem[] = [];

  for (const storeId of storeIds) {
    const storeDeals = generateStoreDeals(storeId, weekSeed);
    allDeals.push(...storeDeals);
  }

  // Calculate week start date
  const now = new Date();
  const dayOfWeek = now.getDay();
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - dayOfWeek);

  return {
    deals: allDeals,
    fetchedAt: new Date().toISOString(),
    storeCount: storeIds.length,
    source: 'sample', // Will be 'flipp' or 'api' when connected
    weekOf: weekStart.toISOString().split('T')[0],
  };
}

// Future: Flipp API integration
export async function fetchFromFlipp(_storeIds: string[]): Promise<FetchDealsResult | null> {
  // TODO: Integrate with Flipp API
  // const FLIPP_API_KEY = process.env.NEXT_PUBLIC_FLIPP_API_KEY;
  // if (!FLIPP_API_KEY) return null;
  //
  // const response = await fetch(`https://api.flipp.com/...`);
  // ... parse response ...

  return null; // Not implemented yet
}

// Check if deals are stale (older than 1 day)
export function areDealsStale(fetchedAt: string): boolean {
  const fetchDate = new Date(fetchedAt);
  const now = new Date();
  const hoursSinceFetch = (now.getTime() - fetchDate.getTime()) / (1000 * 60 * 60);
  return hoursSinceFetch > 24;
}

// Get deals freshness message
export function getDealsFreshness(fetchedAt: string): string {
  const fetchDate = new Date(fetchedAt);
  const now = new Date();
  const hoursSinceFetch = Math.floor((now.getTime() - fetchDate.getTime()) / (1000 * 60 * 60));

  if (hoursSinceFetch < 1) return 'Just now';
  if (hoursSinceFetch < 24) return `${hoursSinceFetch}h ago`;

  const daysSinceFetch = Math.floor(hoursSinceFetch / 24);
  if (daysSinceFetch === 1) return 'Yesterday';
  return `${daysSinceFetch} days ago`;
}
