// NL Grocery Deals Service
// Tracks deals from major NL grocery stores

export interface GroceryDeal {
  id: string;
  storeId: string;
  storeName: string;
  storeChain: string;
  productName: string;
  category: string;
  originalPrice: number;
  salePrice: number;
  savings: number;
  savingsPercent: number;
  unit: string;
  quantity?: string;
  validFrom: string;
  validUntil: string;
  isFlashSale: boolean;
  isWeeklySpecial: boolean;
  loyaltyPointsBonus?: number;
  loyaltyProgram?: 'PC Optimum' | 'Scene+' | 'Costco Executive';
  imageUrl?: string;
  flyer?: string;
}

export interface StoreDeals {
  storeId: string;
  storeName: string;
  storeChain: string;
  location: string;
  deals: GroceryDeal[];
  lastUpdated: string;
  flyerValidFrom: string;
  flyerValidUntil: string;
}

// NL Store Chains and their typical flyer schedules
export const NL_STORE_CHAINS = {
  dominion: {
    name: 'Dominion',
    owner: 'Loblaw Companies',
    loyaltyProgram: 'PC Optimum',
    flyerDay: 'Thursday',
    color: '#e31837'
  },
  sobeys: {
    name: 'Sobeys',
    owner: 'Empire Company',
    loyaltyProgram: 'Scene+',
    flyerDay: 'Friday',
    color: '#00703c'
  },
  walmart: {
    name: 'Walmart',
    owner: 'Walmart Inc.',
    loyaltyProgram: null,
    flyerDay: 'Thursday',
    color: '#0071ce'
  },
  costco: {
    name: 'Costco',
    owner: 'Costco Wholesale',
    loyaltyProgram: 'Costco Executive',
    flyerDay: 'Monday',
    color: '#e31837'
  },
  nofrills: {
    name: 'No Frills',
    owner: 'Loblaw Companies',
    loyaltyProgram: 'PC Optimum',
    flyerDay: 'Thursday',
    color: '#ffd700'
  },
  colemans: {
    name: 'Colemans',
    owner: 'Colemans Food Centre',
    loyaltyProgram: null,
    flyerDay: 'Wednesday',
    color: '#1a472a'
  },
  foodland: {
    name: 'Foodland',
    owner: 'Sobeys',
    loyaltyProgram: 'Scene+',
    flyerDay: 'Friday',
    color: '#ff6600'
  }
};

// Product categories for deals
export const DEAL_CATEGORIES = [
  'Produce',
  'Meat & Poultry',
  'Seafood',
  'Dairy & Eggs',
  'Bakery',
  'Frozen Foods',
  'Pantry Staples',
  'Beverages',
  'Snacks',
  'Health & Wellness',
  'Household'
];

// Generate realistic NL grocery deals
function generateWeeklyDeals(): GroceryDeal[] {
  const today = new Date();
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - today.getDay()); // Start of week (Sunday)
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);

  const deals: GroceryDeal[] = [
    // DOMINION DEALS
    {
      id: 'dom-1',
      storeId: 'dominion-freshwater',
      storeName: 'Dominion Freshwater Road',
      storeChain: 'Dominion',
      productName: 'Atlantic Salmon Fillets',
      category: 'Seafood',
      originalPrice: 14.99,
      salePrice: 9.99,
      savings: 5.00,
      savingsPercent: 33,
      unit: 'per lb',
      validFrom: weekStart.toISOString(),
      validUntil: weekEnd.toISOString(),
      isFlashSale: false,
      isWeeklySpecial: true,
      loyaltyPointsBonus: 2000,
      loyaltyProgram: 'PC Optimum'
    },
    {
      id: 'dom-2',
      storeId: 'dominion-freshwater',
      storeName: 'Dominion Freshwater Road',
      storeChain: 'Dominion',
      productName: 'Boneless Chicken Breast',
      category: 'Meat & Poultry',
      originalPrice: 12.99,
      salePrice: 7.99,
      savings: 5.00,
      savingsPercent: 38,
      unit: 'per lb',
      validFrom: weekStart.toISOString(),
      validUntil: weekEnd.toISOString(),
      isFlashSale: true,
      isWeeklySpecial: true,
      loyaltyPointsBonus: 1500,
      loyaltyProgram: 'PC Optimum'
    },
    {
      id: 'dom-3',
      storeId: 'dominion-freshwater',
      storeName: 'Dominion Freshwater Road',
      storeChain: 'Dominion',
      productName: 'Large Eggs',
      category: 'Dairy & Eggs',
      originalPrice: 5.49,
      salePrice: 3.99,
      savings: 1.50,
      savingsPercent: 27,
      unit: 'dozen',
      validFrom: weekStart.toISOString(),
      validUntil: weekEnd.toISOString(),
      isFlashSale: false,
      isWeeklySpecial: true
    },
    {
      id: 'dom-4',
      storeId: 'dominion-freshwater',
      storeName: 'Dominion Freshwater Road',
      storeChain: 'Dominion',
      productName: 'Russet Potatoes',
      category: 'Produce',
      originalPrice: 5.99,
      salePrice: 3.49,
      savings: 2.50,
      savingsPercent: 42,
      unit: '10 lb bag',
      validFrom: weekStart.toISOString(),
      validUntil: weekEnd.toISOString(),
      isFlashSale: false,
      isWeeklySpecial: true
    },
    {
      id: 'dom-5',
      storeId: 'dominion-freshwater',
      storeName: 'Dominion Freshwater Road',
      storeChain: 'Dominion',
      productName: 'Greek Yogurt',
      category: 'Dairy & Eggs',
      originalPrice: 6.99,
      salePrice: 4.99,
      savings: 2.00,
      savingsPercent: 29,
      unit: '750g',
      validFrom: weekStart.toISOString(),
      validUntil: weekEnd.toISOString(),
      isFlashSale: false,
      isWeeklySpecial: true,
      loyaltyPointsBonus: 500,
      loyaltyProgram: 'PC Optimum'
    },

    // SOBEYS DEALS
    {
      id: 'sob-1',
      storeId: 'sobeys-ropewalk',
      storeName: 'Sobeys Ropewalk Lane',
      storeChain: 'Sobeys',
      productName: 'Atlantic Cod',
      category: 'Seafood',
      originalPrice: 12.99,
      salePrice: 8.99,
      savings: 4.00,
      savingsPercent: 31,
      unit: 'per lb',
      validFrom: weekStart.toISOString(),
      validUntil: weekEnd.toISOString(),
      isFlashSale: false,
      isWeeklySpecial: true,
      loyaltyPointsBonus: 150,
      loyaltyProgram: 'Scene+'
    },
    {
      id: 'sob-2',
      storeId: 'sobeys-ropewalk',
      storeName: 'Sobeys Ropewalk Lane',
      storeChain: 'Sobeys',
      productName: 'Extra Lean Ground Beef',
      category: 'Meat & Poultry',
      originalPrice: 9.99,
      salePrice: 6.99,
      savings: 3.00,
      savingsPercent: 30,
      unit: 'per lb',
      validFrom: weekStart.toISOString(),
      validUntil: weekEnd.toISOString(),
      isFlashSale: false,
      isWeeklySpecial: true
    },
    {
      id: 'sob-3',
      storeId: 'sobeys-ropewalk',
      storeName: 'Sobeys Ropewalk Lane',
      storeChain: 'Sobeys',
      productName: 'Fresh Broccoli',
      category: 'Produce',
      originalPrice: 3.99,
      salePrice: 1.99,
      savings: 2.00,
      savingsPercent: 50,
      unit: 'per bunch',
      validFrom: weekStart.toISOString(),
      validUntil: weekEnd.toISOString(),
      isFlashSale: true,
      isWeeklySpecial: true
    },
    {
      id: 'sob-4',
      storeId: 'sobeys-ropewalk',
      storeName: 'Sobeys Ropewalk Lane',
      storeChain: 'Sobeys',
      productName: 'Whole Grain Bread',
      category: 'Bakery',
      originalPrice: 4.49,
      salePrice: 2.99,
      savings: 1.50,
      savingsPercent: 33,
      unit: 'loaf',
      validFrom: weekStart.toISOString(),
      validUntil: weekEnd.toISOString(),
      isFlashSale: false,
      isWeeklySpecial: true
    },
    {
      id: 'sob-5',
      storeId: 'sobeys-ropewalk',
      storeName: 'Sobeys Ropewalk Lane',
      storeChain: 'Sobeys',
      productName: 'Avocados',
      category: 'Produce',
      originalPrice: 2.49,
      salePrice: 0.99,
      savings: 1.50,
      savingsPercent: 60,
      unit: 'each',
      validFrom: weekStart.toISOString(),
      validUntil: weekEnd.toISOString(),
      isFlashSale: true,
      isWeeklySpecial: true,
      loyaltyPointsBonus: 100,
      loyaltyProgram: 'Scene+'
    },

    // WALMART DEALS
    {
      id: 'wm-1',
      storeId: 'walmart-stavanger',
      storeName: 'Walmart Stavanger Drive',
      storeChain: 'Walmart',
      productName: 'Chicken Thighs',
      category: 'Meat & Poultry',
      originalPrice: 8.97,
      salePrice: 5.97,
      savings: 3.00,
      savingsPercent: 33,
      unit: 'per lb',
      validFrom: weekStart.toISOString(),
      validUntil: weekEnd.toISOString(),
      isFlashSale: false,
      isWeeklySpecial: true
    },
    {
      id: 'wm-2',
      storeId: 'walmart-stavanger',
      storeName: 'Walmart Stavanger Drive',
      storeChain: 'Walmart',
      productName: 'Bananas',
      category: 'Produce',
      originalPrice: 0.77,
      salePrice: 0.57,
      savings: 0.20,
      savingsPercent: 26,
      unit: 'per lb',
      validFrom: weekStart.toISOString(),
      validUntil: weekEnd.toISOString(),
      isFlashSale: false,
      isWeeklySpecial: true
    },
    {
      id: 'wm-3',
      storeId: 'walmart-stavanger',
      storeName: 'Walmart Stavanger Drive',
      storeChain: 'Walmart',
      productName: 'Milk 2%',
      category: 'Dairy & Eggs',
      originalPrice: 5.97,
      salePrice: 4.47,
      savings: 1.50,
      savingsPercent: 25,
      unit: '4L',
      validFrom: weekStart.toISOString(),
      validUntil: weekEnd.toISOString(),
      isFlashSale: false,
      isWeeklySpecial: true
    },
    {
      id: 'wm-4',
      storeId: 'walmart-stavanger',
      storeName: 'Walmart Stavanger Drive',
      storeChain: 'Walmart',
      productName: 'Brown Rice',
      category: 'Pantry Staples',
      originalPrice: 4.97,
      salePrice: 2.97,
      savings: 2.00,
      savingsPercent: 40,
      unit: '2 kg',
      validFrom: weekStart.toISOString(),
      validUntil: weekEnd.toISOString(),
      isFlashSale: false,
      isWeeklySpecial: true
    },

    // COSTCO DEALS
    {
      id: 'cc-1',
      storeId: 'costco-stjohns',
      storeName: "Costco St. John's",
      storeChain: 'Costco',
      productName: 'Kirkland Salmon Fillets',
      category: 'Seafood',
      originalPrice: 29.99,
      salePrice: 22.99,
      savings: 7.00,
      savingsPercent: 23,
      unit: '2 lb pack',
      validFrom: weekStart.toISOString(),
      validUntil: weekEnd.toISOString(),
      isFlashSale: false,
      isWeeklySpecial: true
    },
    {
      id: 'cc-2',
      storeId: 'costco-stjohns',
      storeName: "Costco St. John's",
      storeChain: 'Costco',
      productName: 'Organic Spinach',
      category: 'Produce',
      originalPrice: 7.99,
      salePrice: 5.49,
      savings: 2.50,
      savingsPercent: 31,
      unit: '1 lb container',
      validFrom: weekStart.toISOString(),
      validUntil: weekEnd.toISOString(),
      isFlashSale: false,
      isWeeklySpecial: true
    },
    {
      id: 'cc-3',
      storeId: 'costco-stjohns',
      storeName: "Costco St. John's",
      storeChain: 'Costco',
      productName: 'Organic Eggs',
      category: 'Dairy & Eggs',
      originalPrice: 12.99,
      salePrice: 9.99,
      savings: 3.00,
      savingsPercent: 23,
      unit: '2 dozen',
      validFrom: weekStart.toISOString(),
      validUntil: weekEnd.toISOString(),
      isFlashSale: false,
      isWeeklySpecial: true
    },

    // NO FRILLS DEALS
    {
      id: 'nf-1',
      storeId: 'nofrills-kelligrews',
      storeName: 'No Frills Kelligrews',
      storeChain: 'No Frills',
      productName: 'Whole Chicken',
      category: 'Meat & Poultry',
      originalPrice: 12.99,
      salePrice: 8.88,
      savings: 4.11,
      savingsPercent: 32,
      unit: 'each',
      validFrom: weekStart.toISOString(),
      validUntil: weekEnd.toISOString(),
      isFlashSale: false,
      isWeeklySpecial: true,
      loyaltyPointsBonus: 1000,
      loyaltyProgram: 'PC Optimum'
    },
    {
      id: 'nf-2',
      storeId: 'nofrills-kelligrews',
      storeName: 'No Frills Kelligrews',
      storeChain: 'No Frills',
      productName: 'No Name Pasta',
      category: 'Pantry Staples',
      originalPrice: 1.99,
      salePrice: 0.99,
      savings: 1.00,
      savingsPercent: 50,
      unit: '900g',
      validFrom: weekStart.toISOString(),
      validUntil: weekEnd.toISOString(),
      isFlashSale: true,
      isWeeklySpecial: true
    },
    {
      id: 'nf-3',
      storeId: 'nofrills-kelligrews',
      storeName: 'No Frills Kelligrews',
      storeChain: 'No Frills',
      productName: 'Canned Tomatoes',
      category: 'Pantry Staples',
      originalPrice: 1.79,
      salePrice: 0.88,
      savings: 0.91,
      savingsPercent: 51,
      unit: '796ml',
      validFrom: weekStart.toISOString(),
      validUntil: weekEnd.toISOString(),
      isFlashSale: false,
      isWeeklySpecial: true
    },

    // COLEMANS DEALS
    {
      id: 'col-1',
      storeId: 'colemans-goulds',
      storeName: 'Colemans Goulds',
      storeChain: 'Colemans',
      productName: 'Local Carrots',
      category: 'Produce',
      originalPrice: 2.99,
      salePrice: 1.49,
      savings: 1.50,
      savingsPercent: 50,
      unit: '2 lb bag',
      validFrom: weekStart.toISOString(),
      validUntil: weekEnd.toISOString(),
      isFlashSale: false,
      isWeeklySpecial: true
    },
    {
      id: 'col-2',
      storeId: 'colemans-goulds',
      storeName: 'Colemans Goulds',
      storeChain: 'Colemans',
      productName: 'Fresh Cabbage',
      category: 'Produce',
      originalPrice: 3.49,
      salePrice: 1.99,
      savings: 1.50,
      savingsPercent: 43,
      unit: 'head',
      validFrom: weekStart.toISOString(),
      validUntil: weekEnd.toISOString(),
      isFlashSale: false,
      isWeeklySpecial: true
    },
    {
      id: 'col-3',
      storeId: 'colemans-goulds',
      storeName: 'Colemans Goulds',
      storeChain: 'Colemans',
      productName: 'Pork Chops',
      category: 'Meat & Poultry',
      originalPrice: 8.99,
      salePrice: 5.99,
      savings: 3.00,
      savingsPercent: 33,
      unit: 'per lb',
      validFrom: weekStart.toISOString(),
      validUntil: weekEnd.toISOString(),
      isFlashSale: false,
      isWeeklySpecial: true
    }
  ];

  return deals;
}

// NL Deals Service Class
export class NLDealsService {
  private static instance: NLDealsService;
  private deals: GroceryDeal[] = [];
  private lastFetched: Date | null = null;

  private constructor() {
    this.deals = generateWeeklyDeals();
    this.lastFetched = new Date();
  }

  static getInstance(): NLDealsService {
    if (!NLDealsService.instance) {
      NLDealsService.instance = new NLDealsService();
    }
    return NLDealsService.instance;
  }

  // Get all current deals
  getAllDeals(): GroceryDeal[] {
    return this.deals;
  }

  // Get deals by store chain
  getDealsByChain(chain: string): GroceryDeal[] {
    return this.deals.filter(d => d.storeChain.toLowerCase() === chain.toLowerCase());
  }

  // Get deals by category
  getDealsByCategory(category: string): GroceryDeal[] {
    return this.deals.filter(d => d.category.toLowerCase() === category.toLowerCase());
  }

  // Get flash sales only
  getFlashSales(): GroceryDeal[] {
    return this.deals.filter(d => d.isFlashSale);
  }

  // Get best deals (sorted by savings percent)
  getBestDeals(limit: number = 10): GroceryDeal[] {
    return [...this.deals]
      .sort((a, b) => b.savingsPercent - a.savingsPercent)
      .slice(0, limit);
  }

  // Get deals with loyalty point bonuses
  getLoyaltyBonusDeals(): GroceryDeal[] {
    return this.deals.filter(d => d.loyaltyPointsBonus && d.loyaltyPointsBonus > 0);
  }

  // Search deals by product name
  searchDeals(query: string): GroceryDeal[] {
    const lowerQuery = query.toLowerCase();
    return this.deals.filter(d =>
      d.productName.toLowerCase().includes(lowerQuery) ||
      d.category.toLowerCase().includes(lowerQuery)
    );
  }

  // Get total potential savings
  getTotalPotentialSavings(): number {
    return this.deals.reduce((sum, d) => sum + d.savings, 0);
  }

  // Get deals summary by store
  getDealsSummaryByStore(): { store: string; dealCount: number; totalSavings: number }[] {
    const storeMap = new Map<string, { dealCount: number; totalSavings: number }>();

    this.deals.forEach(deal => {
      const existing = storeMap.get(deal.storeChain) || { dealCount: 0, totalSavings: 0 };
      existing.dealCount++;
      existing.totalSavings += deal.savings;
      storeMap.set(deal.storeChain, existing);
    });

    return Array.from(storeMap.entries()).map(([store, data]) => ({
      store,
      ...data
    }));
  }

  // Refresh deals (simulated)
  async refreshDeals(): Promise<void> {
    // In production, this would fetch from real APIs or scraped data
    this.deals = generateWeeklyDeals();
    this.lastFetched = new Date();
  }

  // Get last fetched time
  getLastFetchedTime(): Date | null {
    return this.lastFetched;
  }
}

// Export singleton getter
export const getNLDealsService = () => NLDealsService.getInstance();
