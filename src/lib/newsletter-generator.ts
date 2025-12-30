// AI-Powered Newsletter Generator for NL Grocery Deals
// Generates daily/weekly deal newsletters with AI-curated content

import { DealItem } from './meal-planning-ai';
import { fetchWeeklyDeals } from './deal-fetcher';
import { recipes, Recipe } from './recipes';
import { extendedStores } from './nl-locations';
import {
  Newsletter,
  FeaturedDeal,
  DealCategory,
  PriceTrend,
  RecipeSuggestion,
  GenerateNewsletterRequest,
  CATEGORY_ICONS,
  NEWSLETTER_TEMPLATES,
  NewsletterFrequency,
} from './newsletter-types';

// Storage key for newsletters
const NEWSLETTERS_STORAGE_KEY = 'nl-grocery-newsletters';

// Get current day context for template selection
function getDayContext(): 'weekday' | 'weekend' | 'holiday' {
  const today = new Date();
  const dayOfWeek = today.getDay();

  // Check for holidays (simplified - you could expand this)
  const month = today.getMonth();
  const date = today.getDate();

  // Christmas period, New Year, Easter approximation, Thanksgiving
  if (
    (month === 11 && date >= 20) || // Late December
    (month === 0 && date <= 2) || // Early January
    (month === 9 && date >= 7 && date <= 14 && dayOfWeek === 1) // Thanksgiving Monday
  ) {
    return 'holiday';
  }

  if (dayOfWeek === 0 || dayOfWeek === 6) {
    return 'weekend';
  }

  return 'weekday';
}

// Generate a random selection from array
function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Generate unique newsletter ID
function generateNewsletterId(): string {
  return `newsletter_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

// Format date for newsletter edition
function formatEdition(date: Date, frequency: NewsletterFrequency): string {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  if (frequency === 'weekly') {
    const weekNumber = Math.ceil(
      ((date.getTime() - new Date(date.getFullYear(), 0, 1).getTime()) / 86400000 + 1) / 7
    );
    return `Week ${weekNumber}, ${date.getFullYear()}`;
  }

  return date.toLocaleDateString('en-CA', options);
}

// Calculate discount attractiveness score
function calculateDealScore(deal: DealItem): number {
  let score = deal.discountPercentage;

  // Bonus for flash sales
  if (deal.isFlashSale) score += 15;

  // Bonus for essential categories
  const essentialCategories = ['Meat', 'Seafood', 'Produce', 'Dairy'];
  if (essentialCategories.includes(deal.category)) score += 10;

  // Bonus for higher absolute savings
  const absoluteSavings = deal.originalPrice - deal.salePrice;
  if (absoluteSavings > 3) score += 10;
  if (absoluteSavings > 5) score += 5;

  return score;
}

// Generate compelling headline for a deal
function generateDealHeadline(deal: DealItem): string {
  const headlines = {
    highDiscount: [
      `${deal.discountPercentage}% OFF ${deal.ingredientName}!`,
      `SAVE BIG: ${deal.ingredientName} at ${deal.discountPercentage}% off`,
      `Don't miss: ${deal.ingredientName} slashed by ${deal.discountPercentage}%`,
    ],
    flashSale: [
      `⚡ FLASH SALE: ${deal.ingredientName}`,
      `⏰ Limited Time: ${deal.ingredientName} Deal`,
      `🔥 Hot Deal: ${deal.ingredientName} Flash Sale`,
    ],
    seafood: [
      `Fresh from the Atlantic: ${deal.ingredientName}`,
      `Ocean Fresh: ${deal.ingredientName} on Sale`,
      `Catch of the Week: ${deal.ingredientName}`,
    ],
    produce: [
      `Farm Fresh: ${deal.ingredientName}`,
      `Fresh Picks: ${deal.ingredientName}`,
      `Garden Fresh: ${deal.ingredientName} Deal`,
    ],
  };

  if (deal.isFlashSale) {
    return pickRandom(headlines.flashSale);
  }
  if (deal.category === 'Seafood') {
    return pickRandom(headlines.seafood);
  }
  if (deal.category === 'Produce') {
    return pickRandom(headlines.produce);
  }
  if (deal.discountPercentage >= 30) {
    return pickRandom(headlines.highDiscount);
  }

  return `${deal.ingredientName} - Save ${deal.discountPercentage}%`;
}

// Generate description for a featured deal
function generateDealDescription(deal: DealItem): string {
  const savings = (deal.originalPrice - deal.salePrice).toFixed(2);

  const descriptions = [
    `Save $${savings} per ${deal.quantity} at ${deal.storeName}. Was $${deal.originalPrice.toFixed(2)}, now just $${deal.salePrice.toFixed(2)}.`,
    `Get ${deal.ingredientName} for only $${deal.salePrice.toFixed(2)} (reg. $${deal.originalPrice.toFixed(2)}) at ${deal.storeName}.`,
    `${deal.storeName} has ${deal.ingredientName} at $${deal.salePrice.toFixed(2)} - that's $${savings} off the regular price!`,
  ];

  return pickRandom(descriptions);
}

// Generate savings tip for a deal
function generateSavingsTip(deal: DealItem): string {
  const tips: Record<string, string[]> = {
    Meat: [
      'Buy extra and freeze for later!',
      'Great for meal prep and batch cooking.',
      'Stock up - proteins freeze well for months.',
    ],
    Seafood: [
      'Fresh seafood? Cook within 2 days or freeze.',
      'Perfect for a healthy weeknight dinner.',
      'Atlantic catch - support local!',
    ],
    Produce: [
      'Check for firmness and freshness.',
      'Buy extra for smoothies and meal prep.',
      'Great time to try a new recipe!',
    ],
    Dairy: [
      'Check the expiry date before buying.',
      'Freeze butter and cheese for later use.',
      'Buy in bulk if you use it regularly.',
    ],
    Pantry: [
      'Stock up on non-perishables.',
      'Great for your emergency pantry.',
      'Check your pantry first - avoid duplicates!',
    ],
    Frozen: [
      'Perfect for busy weeknight meals.',
      'Frozen is just as nutritious as fresh!',
      'Great value for family meals.',
    ],
  };

  const categoryTips = tips[deal.category] || tips['Pantry'];
  return pickRandom(categoryTips);
}

// Group deals by category
function categorizeDeals(deals: DealItem[]): DealCategory[] {
  const categoryMap = new Map<string, DealItem[]>();

  deals.forEach((deal) => {
    const category = deal.category;
    if (!categoryMap.has(category)) {
      categoryMap.set(category, []);
    }
    categoryMap.get(category)!.push(deal);
  });

  const categories: DealCategory[] = [];

  categoryMap.forEach((categoryDeals, categoryName) => {
    // Sort deals by score within category
    categoryDeals.sort((a, b) => calculateDealScore(b) - calculateDealScore(a));

    const totalSavings = categoryDeals.reduce(
      (sum, deal) => sum + (deal.originalPrice - deal.salePrice),
      0
    );

    categories.push({
      name: categoryName,
      icon: CATEGORY_ICONS[categoryName] || CATEGORY_ICONS['Default'],
      deals: categoryDeals,
      totalSavings: Math.round(totalSavings * 100) / 100,
      topPick: categoryDeals[0],
    });
  });

  // Sort categories by total savings
  categories.sort((a, b) => b.totalSavings - a.totalSavings);

  return categories;
}

// Generate price trends based on deals
function generatePriceTrends(deals: DealItem[]): PriceTrend[] {
  // Simulate AI-generated price trends based on current deals
  const trends: PriceTrend[] = [];

  // Find items with biggest discounts (likely price drops)
  const sortedByDiscount = [...deals].sort(
    (a, b) => b.discountPercentage - a.discountPercentage
  );

  // Top 3 deals suggest falling prices
  sortedByDiscount.slice(0, 3).forEach((deal) => {
    trends.push({
      ingredient: deal.ingredientName,
      trend: 'falling',
      changePercent: deal.discountPercentage,
      recommendation: `Great time to stock up on ${deal.ingredientName} - prices are at a seasonal low.`,
    });
  });

  // Add some stable items
  const stableItems = ['Milk 2%', 'Large Eggs', 'Bread'];
  stableItems.forEach((item) => {
    if (!trends.some((t) => t.ingredient === item)) {
      trends.push({
        ingredient: item,
        trend: 'stable',
        changePercent: 0,
        recommendation: `${item} prices remain steady this week.`,
      });
    }
  });

  return trends.slice(0, 5);
}

// Find recipes that use on-sale ingredients
function findDealRecipes(deals: DealItem[]): RecipeSuggestion[] {
  const dealIngredients = new Set(
    deals.map((d) => d.ingredientName.toLowerCase())
  );

  const suggestions: RecipeSuggestion[] = [];

  recipes.forEach((recipe: Recipe) => {
    const matchingDeals = recipe.ingredients.filter((ing) =>
      dealIngredients.has(ing.name.toLowerCase())
    );

    if (matchingDeals.length > 0) {
      const estimatedSavings = matchingDeals.reduce((sum, ing) => {
        const deal = deals.find(
          (d) => d.ingredientName.toLowerCase() === ing.name.toLowerCase()
        );
        if (deal) {
          return sum + (deal.originalPrice - deal.salePrice) * 0.3; // Proportional savings
        }
        return sum;
      }, 0);

      suggestions.push({
        id: recipe.id,
        name: recipe.name,
        description: recipe.description,
        usesDeals: matchingDeals.map((ing) => ing.name),
        estimatedSavings: Math.round(estimatedSavings * 100) / 100,
        prepTime: recipe.prepTime + recipe.cookTime,
        servings: recipe.servings,
      });
    }
  });

  // Sort by savings and return top 5
  return suggestions
    .sort((a, b) => b.estimatedSavings - a.estimatedSavings)
    .slice(0, 5);
}

// Generate general savings tips
function generateSavingsTips(): string[] {
  const allTips = [
    'Compare prices across stores - this newsletter shows deals from multiple locations!',
    'Check unit prices, not just total prices, for the best value.',
    'Seasonal produce is usually cheaper and fresher.',
    'Plan your meals around this week\'s deals to maximize savings.',
    'Consider store brands for pantry staples - same quality, lower price.',
    'Shop the perimeter of the store for fresh, whole foods.',
    'Buy frozen vegetables when fresh aren\'t on sale - same nutrition!',
    'Batch cook proteins on weekends to save time and money.',
    'Join store loyalty programs for extra savings.',
    'Make a list before shopping and stick to it!',
    'Shop mid-week when stores are less busy and often have markdowns.',
    'Check the clearance section for deals on items near their best-before date.',
    'Buy whole chickens instead of parts for better value.',
    'Freeze bread and meat when you find good deals.',
    'Local NL root vegetables store well and are budget-friendly.',
  ];

  // Return 5 random tips
  const shuffled = [...allTips].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 5);
}

// Main newsletter generation function
export async function generateNewsletter(
  request: GenerateNewsletterRequest = {}
): Promise<Newsletter> {
  const frequency = request.frequency || 'daily';
  const now = new Date();
  const dayContext = getDayContext();
  const template = NEWSLETTER_TEMPLATES[dayContext];

  // Get stores to include
  let storeIds = request.storeIds;
  if (!storeIds || storeIds.length === 0) {
    // Default: include all stores
    storeIds = extendedStores.slice(0, 8).map((s) => s.id); // Limit to 8 stores
  }

  // Fetch current deals
  const dealsResult = await fetchWeeklyDeals(storeIds);
  let deals = dealsResult.deals;

  // Filter by focus categories if specified
  const focusCategories = request.focusCategories;
  if (focusCategories && focusCategories.length > 0) {
    deals = deals.filter((d) =>
      focusCategories.some(
        (cat: string) => d.category.toLowerCase().includes(cat.toLowerCase())
      )
    );
  }

  // Score and sort deals
  const scoredDeals = deals.map((deal) => ({
    deal,
    score: calculateDealScore(deal),
  }));
  scoredDeals.sort((a, b) => b.score - a.score);

  // Select top deal and featured deals
  const topDeal: FeaturedDeal | null = scoredDeals.length > 0
    ? {
        deal: scoredDeals[0].deal,
        headline: generateDealHeadline(scoredDeals[0].deal),
        description: generateDealDescription(scoredDeals[0].deal),
        savingsTip: generateSavingsTip(scoredDeals[0].deal),
        isPremiumSpot: true,
      }
    : null;

  const featuredDeals: FeaturedDeal[] = scoredDeals.slice(1, 6).map((sd) => ({
    deal: sd.deal,
    headline: generateDealHeadline(sd.deal),
    description: generateDealDescription(sd.deal),
    savingsTip: generateSavingsTip(sd.deal),
    isPremiumSpot: false,
  }));

  // Categorize all deals
  const categories = categorizeDeals(deals);

  // Generate additional content
  const priceTrends = generatePriceTrends(deals);
  const recipeSuggestions = request.includeRecipes !== false
    ? findDealRecipes(deals)
    : [];
  const savingsTips = generateSavingsTips();

  // Calculate totals
  const totalPotentialSavings = deals.reduce(
    (sum, deal) => sum + (deal.originalPrice - deal.salePrice),
    0
  );

  // Get unique store names
  const storesIncluded = [...new Set(deals.map((d) => d.storeName))];

  // Create newsletter
  const newsletter: Newsletter = {
    id: generateNewsletterId(),
    createdAt: now.toISOString(),
    status: 'published',
    frequency,
    title: frequency === 'daily'
      ? 'NL Daily Grocery Deals'
      : 'NL Weekly Grocery Deals',
    subtitle: `Your guide to the best grocery savings in Newfoundland & Labrador`,
    edition: formatEdition(now, frequency),
    greeting: request.customGreeting || pickRandom(template.greetings),
    heroMessage: topDeal
      ? `Today's star deal: Save ${topDeal.deal.discountPercentage}% on ${topDeal.deal.ingredientName} at ${topDeal.deal.storeName}!`
      : 'Check out today\'s best grocery deals across NL!',
    topDeal,
    featuredDeals,
    categories,
    savingsTips,
    priceTrends,
    recipeSuggestions,
    totalDealsCount: deals.length,
    totalPotentialSavings: Math.round(totalPotentialSavings * 100) / 100,
    storesIncluded,
    regionsIncluded: ['Avalon', 'Eastern', 'Central', 'Western', 'Labrador'],
    closingMessage: request.customClosing || pickRandom(template.closings),
    generatedBy: 'ai',
    aiPromptUsed: request.aiEnhancements
      ? 'AI-enhanced content generation enabled'
      : undefined,
    version: 1,
  };

  // Store the newsletter
  saveNewsletter(newsletter);

  return newsletter;
}

// Save newsletter to localStorage
export function saveNewsletter(newsletter: Newsletter): void {
  if (typeof window === 'undefined') return;

  const existing = getNewsletters();
  existing.unshift(newsletter);

  // Keep only last 30 newsletters
  const trimmed = existing.slice(0, 30);

  localStorage.setItem(NEWSLETTERS_STORAGE_KEY, JSON.stringify(trimmed));
}

// Get all newsletters from localStorage
export function getNewsletters(): Newsletter[] {
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem(NEWSLETTERS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

// Get a specific newsletter by ID
export function getNewsletterById(id: string): Newsletter | null {
  const newsletters = getNewsletters();
  return newsletters.find((n) => n.id === id) || null;
}

// Get the latest newsletter
export function getLatestNewsletter(): Newsletter | null {
  const newsletters = getNewsletters();
  return newsletters.length > 0 ? newsletters[0] : null;
}

// Delete a newsletter
export function deleteNewsletter(id: string): boolean {
  if (typeof window === 'undefined') return false;

  const newsletters = getNewsletters();
  const filtered = newsletters.filter((n) => n.id !== id);

  if (filtered.length !== newsletters.length) {
    localStorage.setItem(NEWSLETTERS_STORAGE_KEY, JSON.stringify(filtered));
    return true;
  }

  return false;
}

// Clear all newsletters
export function clearNewsletters(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(NEWSLETTERS_STORAGE_KEY);
}

// Export newsletter as text (for copying/sharing)
export function exportNewsletterAsText(newsletter: Newsletter): string {
  let text = '';

  text += `═══════════════════════════════════════════════════════\n`;
  text += `${newsletter.title}\n`;
  text += `${newsletter.subtitle}\n`;
  text += `${newsletter.edition}\n`;
  text += `═══════════════════════════════════════════════════════\n\n`;

  text += `${newsletter.greeting}\n\n`;
  text += `${newsletter.heroMessage}\n\n`;

  if (newsletter.topDeal) {
    text += `★ TOP DEAL OF THE DAY ★\n`;
    text += `${newsletter.topDeal.headline}\n`;
    text += `${newsletter.topDeal.description}\n`;
    text += `💡 Tip: ${newsletter.topDeal.savingsTip}\n\n`;
  }

  if (newsletter.featuredDeals.length > 0) {
    text += `───────────────────────────────────────────────────────\n`;
    text += `FEATURED DEALS\n`;
    text += `───────────────────────────────────────────────────────\n\n`;

    newsletter.featuredDeals.forEach((fd, i) => {
      text += `${i + 1}. ${fd.headline}\n`;
      text += `   ${fd.description}\n\n`;
    });
  }

  newsletter.categories.forEach((cat) => {
    text += `───────────────────────────────────────────────────────\n`;
    text += `${cat.icon} ${cat.name.toUpperCase()} (Save up to $${cat.totalSavings.toFixed(2)})\n`;
    text += `───────────────────────────────────────────────────────\n`;

    cat.deals.forEach((deal) => {
      text += `• ${deal.ingredientName} - $${deal.salePrice.toFixed(2)} `;
      text += `(was $${deal.originalPrice.toFixed(2)}) `;
      text += `at ${deal.storeName}`;
      if (deal.isFlashSale) text += ` ⚡`;
      text += `\n`;
    });
    text += `\n`;
  });

  if (newsletter.recipeSuggestions.length > 0) {
    text += `───────────────────────────────────────────────────────\n`;
    text += `RECIPE IDEAS USING THIS WEEK'S DEALS\n`;
    text += `───────────────────────────────────────────────────────\n\n`;

    newsletter.recipeSuggestions.forEach((recipe) => {
      text += `🍳 ${recipe.name}\n`;
      text += `   Uses on-sale: ${recipe.usesDeals.join(', ')}\n`;
      text += `   Prep time: ${recipe.prepTime} min | Serves: ${recipe.servings}\n\n`;
    });
  }

  if (newsletter.savingsTips.length > 0) {
    text += `───────────────────────────────────────────────────────\n`;
    text += `💡 SAVINGS TIPS\n`;
    text += `───────────────────────────────────────────────────────\n\n`;

    newsletter.savingsTips.forEach((tip, i) => {
      text += `${i + 1}. ${tip}\n`;
    });
    text += `\n`;
  }

  text += `═══════════════════════════════════════════════════════\n`;
  text += `Total Deals: ${newsletter.totalDealsCount} | `;
  text += `Potential Savings: $${newsletter.totalPotentialSavings.toFixed(2)}\n`;
  text += `Stores: ${newsletter.storesIncluded.join(', ')}\n`;
  text += `═══════════════════════════════════════════════════════\n\n`;

  text += `${newsletter.closingMessage}\n\n`;
  text += `Generated by NL Grocery Deals Newsletter\n`;

  return text;
}

// Export newsletter as HTML (for email-like display)
export function exportNewsletterAsHTML(newsletter: Newsletter): string {
  // This would generate a full HTML email template
  // For now, we return basic HTML structure
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${newsletter.title} - ${newsletter.edition}</title>
</head>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <h1>${newsletter.title}</h1>
  <p><em>${newsletter.subtitle}</em></p>
  <p><strong>${newsletter.edition}</strong></p>
  <hr>
  <p>${newsletter.greeting}</p>
  <p><strong>${newsletter.heroMessage}</strong></p>
  <!-- Add more sections here -->
  <hr>
  <p>${newsletter.closingMessage}</p>
</body>
</html>
  `.trim();
}
