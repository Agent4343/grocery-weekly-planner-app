// Newfoundland recipes database

export interface Recipe {
  id: string;
  name: string;
  description: string;
  category: string;
  cuisine: string;
  prepTime: number; // minutes
  cookTime: number; // minutes
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  ingredients: {
    ingredientId: string;
    amount: number;
    unit: string;
    notes?: string;
  }[];
  instructions: string[];
  tips?: string[];
  nutritionInfo?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  isTraditional?: boolean;
  season?: string[];
}

export const newfoundlandRecipes: Recipe[] = [
  {
    id: "jiggs-dinner",
    name: "Traditional Jiggs Dinner",
    description: "Classic Newfoundland Sunday dinner with salt beef, vegetables, and pease pudding",
    category: "Main Course",
    cuisine: "Newfoundland",
    prepTime: 30,
    cookTime: 150,
    servings: 6,
    difficulty: "Medium",
    ingredients: [
      { ingredientId: "salt-beef", amount: 2, unit: "lbs", notes: "Soaked overnight" },
      { ingredientId: "cabbage", amount: 1, unit: "head", notes: "Cut in wedges" },
      { ingredientId: "carrots", amount: 1, unit: "lb", notes: "Peeled and chunked" },
      { ingredientId: "potatoes", amount: 2, unit: "lbs", notes: "Peeled" },
      { ingredientId: "turnip", amount: 1, unit: "lb", notes: "Peeled and chunked" }
    ],
    instructions: [
      "Soak salt beef overnight in cold water to remove excess salt",
      "Place salt beef in large pot and cover with fresh water",
      "Bring to boil, then reduce heat and simmer for 1 hour",
      "Add turnip and carrots to pot, continue cooking for 30 minutes",
      "Add potatoes and cook for 15 minutes",
      "Add cabbage wedges and cook for final 15 minutes",
      "Remove vegetables and meat, slice beef and arrange on platter",
      "Serve with mustard pickles and pease pudding"
    ],
    tips: [
      "Save the cooking liquid for soup stock",
      "Vegetables should be tender but not mushy",
      "Traditional accompaniments include mustard pickles and pease pudding"
    ],
    nutritionInfo: {
      calories: 450,
      protein: 35,
      carbs: 40,
      fat: 15
    },
    isTraditional: true,
    season: ["fall", "winter"]
  },
  {
    id: "fish-and-chips",
    name: "Newfoundland Fish and Chips",
    description: "Fresh Atlantic cod in crispy batter with hand-cut fries",
    category: "Main Course",
    cuisine: "Newfoundland",
    prepTime: 20,
    cookTime: 25,
    servings: 4,
    difficulty: "Medium",
    ingredients: [
      { ingredientId: "atlantic-cod", amount: 1.5, unit: "lbs", notes: "Cut into portions" },
      { ingredientId: "potatoes", amount: 2, unit: "lbs", notes: "For fries" },
      { ingredientId: "flour", amount: 1, unit: "cup", notes: "For batter" },
      { ingredientId: "eggs", amount: 1, unit: "piece", notes: "Beaten" },
      { ingredientId: "milk", amount: 0.5, unit: "cup", notes: "For batter" }
    ],
    instructions: [
      "Cut potatoes into thick fries and soak in cold water",
      "Heat oil to 375°F in deep fryer or large pot",
      "Make batter by mixing flour, beaten egg, and milk until smooth",
      "Pat cod fillets dry and season with salt and pepper",
      "Dip fish in batter and carefully place in hot oil",
      "Fry fish for 4-5 minutes until golden brown and crispy",
      "Fry potatoes in batches until golden and crispy",
      "Serve immediately with tartar sauce and malt vinegar"
    ],
    tips: [
      "Use fresh cod for best flavor",
      "Don't overcrowd the fryer",
      "Keep cooked fish warm in low oven while frying remaining pieces"
    ],
    nutritionInfo: {
      calories: 520,
      protein: 30,
      carbs: 45,
      fat: 25
    },
    isTraditional: true
  },
  {
    id: "blueberry-grunt",
    name: "Wild Blueberry Grunt",
    description: "Traditional steamed blueberry dessert with fluffy dumplings",
    category: "Dessert",
    cuisine: "Newfoundland",
    prepTime: 15,
    cookTime: 45,
    servings: 8,
    difficulty: "Easy",
    ingredients: [
      { ingredientId: "blueberries", amount: 4, unit: "cups", notes: "Fresh or frozen" },
      { ingredientId: "flour", amount: 1.5, unit: "cups", notes: "For dumplings" },
      { ingredientId: "milk", amount: 0.75, unit: "cup", notes: "For dumplings" },
      { ingredientId: "butter", amount: 0.25, unit: "cup", notes: "Melted" }
    ],
    instructions: [
      "In large saucepan, combine blueberries with 1/2 cup sugar and 1/4 cup water",
      "Bring to boil, then reduce heat and simmer for 10 minutes",
      "In bowl, mix flour, 1/4 cup sugar, baking powder, and salt",
      "Add milk and melted butter to dry ingredients, stir until just combined",
      "Drop spoonfuls of dumpling batter over simmering blueberries",
      "Cover tightly and steam for 20 minutes without lifting lid",
      "Serve warm with cream or ice cream"
    ],
    tips: [
      "Don't lift the lid while steaming - dumplings need consistent steam",
      "Wild blueberries have more intense flavor than cultivated ones",
      "Can be made with other berries like partridgeberries"
    ],
    nutritionInfo: {
      calories: 280,
      protein: 4,
      carbs: 55,
      fat: 6
    },
    isTraditional: true,
    season: ["summer", "fall"]
  },
  {
    id: "cod-cakes",
    name: "Newfoundland Cod Cakes",
    description: "Crispy pan-fried cod and potato cakes, perfect for lunch",
    category: "Main Course",
    cuisine: "Newfoundland",
    prepTime: 25,
    cookTime: 20,
    servings: 4,
    difficulty: "Easy",
    ingredients: [
      { ingredientId: "atlantic-cod", amount: 1, unit: "lb", notes: "Cooked and flaked" },
      { ingredientId: "potatoes", amount: 2, unit: "lbs", notes: "Boiled and mashed" },
      { ingredientId: "eggs", amount: 1, unit: "piece", notes: "Beaten" },
      { ingredientId: "flour", amount: 0.5, unit: "cup", notes: "For coating" }
    ],
    instructions: [
      "Boil and mash potatoes until smooth",
      "Cook cod and flake into small pieces, removing any bones",
      "Mix flaked cod with mashed potatoes and beaten egg",
      "Season with salt, pepper, and chopped green onions",
      "Form mixture into patties and coat lightly with flour",
      "Heat oil in large skillet over medium heat",
      "Fry cod cakes for 3-4 minutes per side until golden brown",
      "Serve hot with tartar sauce or chow-chow"
    ],
    tips: [
      "Make sure cod is completely cooled before mixing",
      "Chill formed patties for easier handling",
      "Can be made ahead and reheated in oven"
    ],
    nutritionInfo: {
      calories: 320,
      protein: 25,
      carbs: 35,
      fat: 8
    },
    isTraditional: true
  },
  {
    id: "moose-stew",
    name: "Newfoundland Moose Stew",
    description: "Hearty winter stew with tender moose meat and root vegetables",
    category: "Main Course",
    cuisine: "Newfoundland",
    prepTime: 20,
    cookTime: 120,
    servings: 6,
    difficulty: "Medium",
    ingredients: [
      { ingredientId: "ground-moose", amount: 2, unit: "lbs", notes: "Cut in chunks" },
      { ingredientId: "potatoes", amount: 1.5, unit: "lbs", notes: "Chunked" },
      { ingredientId: "carrots", amount: 1, unit: "lb", notes: "Chunked" },
      { ingredientId: "turnip", amount: 0.5, unit: "lb", notes: "Chunked" },
      { ingredientId: "flour", amount: 0.25, unit: "cup", notes: "For thickening" }
    ],
    instructions: [
      "Brown moose meat in large pot with oil over high heat",
      "Add onions and cook until softened",
      "Sprinkle flour over meat and stir to coat",
      "Add beef stock, bay leaves, and seasonings",
      "Bring to boil, then reduce heat and simmer covered for 1 hour",
      "Add root vegetables and continue cooking for 45 minutes",
      "Adjust seasoning and serve with fresh bread"
    ],
    tips: [
      "Moose meat can be substituted with beef if unavailable",
      "Browning the meat well adds rich flavor",
      "Stew tastes even better the next day"
    ],
    nutritionInfo: {
      calories: 380,
      protein: 32,
      carbs: 25,
      fat: 18
    },
    isTraditional: true,
    season: ["fall", "winter"]
  },
  {
    id: "partridgeberry-muffins",
    name: "Partridgeberry Muffins",
    description: "Sweet and tart muffins featuring Newfoundland's native partridgeberries",
    category: "Breakfast",
    cuisine: "Newfoundland",
    prepTime: 15,
    cookTime: 25,
    servings: 12,
    difficulty: "Easy",
    ingredients: [
      { ingredientId: "partridgeberries", amount: 1, unit: "cup", notes: "Fresh or frozen" },
      { ingredientId: "flour", amount: 2, unit: "cups", notes: "All-purpose" },
      { ingredientId: "eggs", amount: 1, unit: "piece", notes: "Large" },
      { ingredientId: "milk", amount: 1, unit: "cup", notes: "Whole milk" },
      { ingredientId: "butter", amount: 0.33, unit: "cup", notes: "Melted" }
    ],
    instructions: [
      "Preheat oven to 375°F and grease muffin tin",
      "In large bowl, mix flour, sugar, baking powder, and salt",
      "In separate bowl, whisk together egg, milk, and melted butter",
      "Pour wet ingredients into dry ingredients and stir until just combined",
      "Gently fold in partridgeberries",
      "Fill muffin cups 2/3 full with batter",
      "Bake for 20-25 minutes until golden brown and toothpick comes out clean",
      "Cool in pan for 5 minutes before removing"
    ],
    tips: [
      "Don't overmix the batter - lumps are okay",
      "Toss berries in flour before folding in to prevent sinking",
      "Can substitute with blueberries if partridgeberries unavailable"
    ],
    nutritionInfo: {
      calories: 180,
      protein: 4,
      carbs: 28,
      fat: 6
    },
    isTraditional: true,
    season: ["fall"]
  }
];

export const getRecipesByCategory = (category: string) => {
  return newfoundlandRecipes.filter(recipe => recipe.category === category);
};

export const getTraditionalRecipes = () => {
  return newfoundlandRecipes.filter(recipe => recipe.isTraditional);
};

export const getSeasonalRecipes = (season: string) => {
  return newfoundlandRecipes.filter(recipe => 
    recipe.season?.includes(season) || !recipe.season
  );
};

export const getRecipeById = (id: string) => {
  return newfoundlandRecipes.find(recipe => recipe.id === id);
};

export const searchRecipes = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  return newfoundlandRecipes.filter(recipe =>
    recipe.name.toLowerCase().includes(lowercaseQuery) ||
    recipe.description.toLowerCase().includes(lowercaseQuery) ||
    recipe.category.toLowerCase().includes(lowercaseQuery)
  );
};

export const getRecipesByDifficulty = (difficulty: 'Easy' | 'Medium' | 'Hard') => {
  return newfoundlandRecipes.filter(recipe => recipe.difficulty === difficulty);
};