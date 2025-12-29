// Newfoundland recipes database

export interface Recipe {
  id: string;
  name: string;
  description: string;
  category: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack' | 'Dessert';
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
  // ============ BREAKFAST RECIPES ============
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
      "Bake for 20-25 minutes until golden brown"
    ],
    tips: ["Don't overmix the batter", "Toss berries in flour to prevent sinking"],
    nutritionInfo: { calories: 180, protein: 4, carbs: 28, fat: 6 },
    isTraditional: true,
    season: ["fall"]
  },
  {
    id: "toutons",
    name: "Toutons with Molasses",
    description: "Traditional fried dough served with butter and molasses - a Newfoundland breakfast staple",
    category: "Breakfast",
    cuisine: "Newfoundland",
    prepTime: 10,
    cookTime: 15,
    servings: 6,
    difficulty: "Easy",
    ingredients: [
      { ingredientId: "flour", amount: 2, unit: "cups" },
      { ingredientId: "butter", amount: 0.25, unit: "cup", notes: "For frying" },
      { ingredientId: "molasses", amount: 0.5, unit: "cup", notes: "For serving" },
      { ingredientId: "milk", amount: 0.75, unit: "cup" }
    ],
    instructions: [
      "Mix flour with baking powder and salt",
      "Cut in 2 tbsp cold butter until crumbly",
      "Add milk and mix to form soft dough",
      "Divide into 6 pieces and flatten into discs",
      "Fry in butter over medium heat until golden on both sides",
      "Serve hot with butter and molasses"
    ],
    tips: ["Best served immediately while hot", "Can use leftover bread dough"],
    nutritionInfo: { calories: 280, protein: 5, carbs: 45, fat: 9 },
    isTraditional: true
  },
  {
    id: "scrambled-eggs-salmon",
    name: "Scrambled Eggs with Smoked Salmon",
    description: "Creamy scrambled eggs topped with local smoked salmon and fresh dill",
    category: "Breakfast",
    cuisine: "Newfoundland",
    prepTime: 5,
    cookTime: 10,
    servings: 2,
    difficulty: "Easy",
    ingredients: [
      { ingredientId: "eggs", amount: 4, unit: "piece" },
      { ingredientId: "smoked-salmon", amount: 4, unit: "oz" },
      { ingredientId: "butter", amount: 2, unit: "tbsp" },
      { ingredientId: "milk", amount: 2, unit: "tbsp" }
    ],
    instructions: [
      "Whisk eggs with milk, salt and pepper",
      "Melt butter in non-stick pan over low heat",
      "Add eggs and stir gently with spatula",
      "Remove from heat while still slightly wet",
      "Top with smoked salmon and fresh dill"
    ],
    nutritionInfo: { calories: 320, protein: 24, carbs: 2, fat: 24 }
  },
  {
    id: "oatmeal-blueberries",
    name: "Oatmeal with Wild Blueberries",
    description: "Hearty oatmeal topped with local wild blueberries and maple syrup",
    category: "Breakfast",
    cuisine: "Newfoundland",
    prepTime: 5,
    cookTime: 10,
    servings: 2,
    difficulty: "Easy",
    ingredients: [
      { ingredientId: "oats", amount: 1, unit: "cup" },
      { ingredientId: "blueberries", amount: 0.5, unit: "cup" },
      { ingredientId: "milk", amount: 2, unit: "cups" },
      { ingredientId: "maple-syrup", amount: 2, unit: "tbsp" }
    ],
    instructions: [
      "Bring milk to simmer in saucepan",
      "Add oats and cook for 5 minutes, stirring occasionally",
      "Top with blueberries and drizzle with maple syrup",
      "Add nuts or seeds if desired"
    ],
    nutritionInfo: { calories: 280, protein: 10, carbs: 48, fat: 6 }
  },
  {
    id: "breakfast-hash",
    name: "Newfoundland Breakfast Hash",
    description: "Crispy potato hash with salt beef, onions, and fried eggs",
    category: "Breakfast",
    cuisine: "Newfoundland",
    prepTime: 15,
    cookTime: 25,
    servings: 4,
    difficulty: "Medium",
    ingredients: [
      { ingredientId: "potatoes", amount: 1.5, unit: "lbs", notes: "Diced" },
      { ingredientId: "salt-beef", amount: 0.5, unit: "lb", notes: "Diced" },
      { ingredientId: "eggs", amount: 4, unit: "piece" },
      { ingredientId: "butter", amount: 2, unit: "tbsp" }
    ],
    instructions: [
      "Boil diced potatoes until just tender, drain",
      "Fry salt beef in butter until crispy",
      "Add potatoes and onions, cook until golden",
      "Make wells and crack eggs into hash",
      "Cover and cook until eggs are set"
    ],
    nutritionInfo: { calories: 420, protein: 22, carbs: 35, fat: 22 },
    isTraditional: true
  },
  {
    id: "french-toast",
    name: "French Toast with Berries",
    description: "Golden french toast topped with fresh local berries and whipped cream",
    category: "Breakfast",
    cuisine: "General",
    prepTime: 10,
    cookTime: 15,
    servings: 4,
    difficulty: "Easy",
    ingredients: [
      { ingredientId: "bread", amount: 8, unit: "slices" },
      { ingredientId: "eggs", amount: 3, unit: "piece" },
      { ingredientId: "milk", amount: 0.5, unit: "cup" },
      { ingredientId: "blueberries", amount: 1, unit: "cup" }
    ],
    instructions: [
      "Whisk eggs, milk, vanilla, and cinnamon",
      "Dip bread slices in egg mixture",
      "Cook in buttered pan until golden on both sides",
      "Serve topped with berries and maple syrup"
    ],
    nutritionInfo: { calories: 320, protein: 12, carbs: 42, fat: 12 }
  },

  // ============ LUNCH RECIPES ============
  {
    id: "cod-cakes",
    name: "Newfoundland Cod Cakes",
    description: "Crispy pan-fried cod and potato cakes, perfect for lunch",
    category: "Lunch",
    cuisine: "Newfoundland",
    prepTime: 25,
    cookTime: 20,
    servings: 4,
    difficulty: "Easy",
    ingredients: [
      { ingredientId: "atlantic-cod", amount: 1, unit: "lb", notes: "Cooked and flaked" },
      { ingredientId: "potatoes", amount: 2, unit: "lbs", notes: "Boiled and mashed" },
      { ingredientId: "eggs", amount: 1, unit: "piece" },
      { ingredientId: "flour", amount: 0.5, unit: "cup" }
    ],
    instructions: [
      "Boil and mash potatoes until smooth",
      "Mix flaked cod with mashed potatoes and beaten egg",
      "Form into patties and coat with flour",
      "Fry until golden brown on both sides"
    ],
    tips: ["Chill patties for easier handling"],
    nutritionInfo: { calories: 320, protein: 25, carbs: 35, fat: 8 },
    isTraditional: true
  },
  {
    id: "seafood-chowder",
    name: "Newfoundland Seafood Chowder",
    description: "Creamy chowder loaded with cod, shrimp, and scallops",
    category: "Lunch",
    cuisine: "Newfoundland",
    prepTime: 20,
    cookTime: 30,
    servings: 6,
    difficulty: "Medium",
    ingredients: [
      { ingredientId: "atlantic-cod", amount: 0.5, unit: "lb" },
      { ingredientId: "shrimp", amount: 0.5, unit: "lb" },
      { ingredientId: "potatoes", amount: 2, unit: "cups", notes: "Diced" },
      { ingredientId: "milk", amount: 2, unit: "cups" }
    ],
    instructions: [
      "Sauté onions and celery in butter",
      "Add potatoes and fish stock, simmer until tender",
      "Add seafood and cook 5 minutes",
      "Stir in cream and season to taste"
    ],
    nutritionInfo: { calories: 340, protein: 28, carbs: 22, fat: 16 },
    isTraditional: true
  },
  {
    id: "turkey-sandwich",
    name: "Turkey Club Sandwich",
    description: "Classic triple-decker club with turkey, bacon, and fresh vegetables",
    category: "Lunch",
    cuisine: "General",
    prepTime: 15,
    cookTime: 10,
    servings: 2,
    difficulty: "Easy",
    ingredients: [
      { ingredientId: "bread", amount: 6, unit: "slices" },
      { ingredientId: "turkey", amount: 8, unit: "oz" },
      { ingredientId: "bacon", amount: 6, unit: "strips" },
      { ingredientId: "lettuce", amount: 4, unit: "leaves" }
    ],
    instructions: [
      "Toast bread until golden",
      "Cook bacon until crispy",
      "Layer turkey, bacon, lettuce, tomato on bread",
      "Cut diagonally and serve with chips"
    ],
    nutritionInfo: { calories: 480, protein: 35, carbs: 38, fat: 22 }
  },
  {
    id: "chicken-salad",
    name: "Grilled Chicken Caesar Salad",
    description: "Crisp romaine with grilled chicken breast and creamy caesar dressing",
    category: "Lunch",
    cuisine: "General",
    prepTime: 15,
    cookTime: 15,
    servings: 2,
    difficulty: "Easy",
    ingredients: [
      { ingredientId: "chicken-breast", amount: 2, unit: "piece" },
      { ingredientId: "lettuce", amount: 1, unit: "head" },
      { ingredientId: "parmesan", amount: 0.5, unit: "cup" },
      { ingredientId: "bread", amount: 2, unit: "slices", notes: "For croutons" }
    ],
    instructions: [
      "Season and grill chicken until cooked through",
      "Chop romaine and place in large bowl",
      "Make croutons from cubed bread",
      "Slice chicken and arrange on salad",
      "Top with parmesan and caesar dressing"
    ],
    nutritionInfo: { calories: 380, protein: 42, carbs: 12, fat: 18 }
  },
  {
    id: "pea-soup",
    name: "Split Pea Soup with Ham",
    description: "Hearty traditional pea soup with smoky ham - a Newfoundland classic",
    category: "Lunch",
    cuisine: "Newfoundland",
    prepTime: 15,
    cookTime: 90,
    servings: 8,
    difficulty: "Easy",
    ingredients: [
      { ingredientId: "split-peas", amount: 2, unit: "cups" },
      { ingredientId: "ham", amount: 1, unit: "lb" },
      { ingredientId: "carrots", amount: 2, unit: "piece" },
      { ingredientId: "potatoes", amount: 2, unit: "piece" }
    ],
    instructions: [
      "Soak split peas overnight",
      "Simmer ham bone in water for 1 hour",
      "Add peas, carrots, and potatoes",
      "Cook until peas are soft and soup is thick"
    ],
    nutritionInfo: { calories: 320, protein: 22, carbs: 45, fat: 6 },
    isTraditional: true,
    season: ["fall", "winter"]
  },
  {
    id: "tuna-melt",
    name: "Classic Tuna Melt",
    description: "Open-faced tuna salad sandwich with melted cheddar cheese",
    category: "Lunch",
    cuisine: "General",
    prepTime: 10,
    cookTime: 5,
    servings: 2,
    difficulty: "Easy",
    ingredients: [
      { ingredientId: "tuna", amount: 2, unit: "cans" },
      { ingredientId: "bread", amount: 4, unit: "slices" },
      { ingredientId: "cheddar", amount: 4, unit: "slices" },
      { ingredientId: "mayonnaise", amount: 3, unit: "tbsp" }
    ],
    instructions: [
      "Mix tuna with mayo, celery, and seasonings",
      "Spread on bread slices",
      "Top with cheddar cheese",
      "Broil until cheese is melted and bubbly"
    ],
    nutritionInfo: { calories: 420, protein: 32, carbs: 28, fat: 22 }
  },

  // ============ DINNER RECIPES ============
  {
    id: "jiggs-dinner",
    name: "Traditional Jiggs Dinner",
    description: "Classic Newfoundland Sunday dinner with salt beef, vegetables, and pease pudding",
    category: "Dinner",
    cuisine: "Newfoundland",
    prepTime: 30,
    cookTime: 150,
    servings: 6,
    difficulty: "Medium",
    ingredients: [
      { ingredientId: "salt-beef", amount: 2, unit: "lbs", notes: "Soaked overnight" },
      { ingredientId: "cabbage", amount: 1, unit: "head" },
      { ingredientId: "carrots", amount: 1, unit: "lb" },
      { ingredientId: "potatoes", amount: 2, unit: "lbs" },
      { ingredientId: "turnip", amount: 1, unit: "lb" }
    ],
    instructions: [
      "Soak salt beef overnight in cold water",
      "Simmer beef for 1 hour",
      "Add turnip and carrots, cook 30 minutes",
      "Add potatoes, cook 15 minutes",
      "Add cabbage, cook final 15 minutes"
    ],
    tips: ["Save cooking liquid for soup stock"],
    nutritionInfo: { calories: 450, protein: 35, carbs: 40, fat: 15 },
    isTraditional: true,
    season: ["fall", "winter"]
  },
  {
    id: "fish-and-chips",
    name: "Newfoundland Fish and Chips",
    description: "Fresh Atlantic cod in crispy batter with hand-cut fries",
    category: "Dinner",
    cuisine: "Newfoundland",
    prepTime: 20,
    cookTime: 25,
    servings: 4,
    difficulty: "Medium",
    ingredients: [
      { ingredientId: "atlantic-cod", amount: 1.5, unit: "lbs" },
      { ingredientId: "potatoes", amount: 2, unit: "lbs" },
      { ingredientId: "flour", amount: 1, unit: "cup" },
      { ingredientId: "eggs", amount: 1, unit: "piece" }
    ],
    instructions: [
      "Cut potatoes into fries and soak in water",
      "Make batter with flour, egg, and milk",
      "Dip cod in batter and fry until golden",
      "Fry potatoes until crispy"
    ],
    nutritionInfo: { calories: 520, protein: 30, carbs: 45, fat: 25 },
    isTraditional: true
  },
  {
    id: "moose-stew",
    name: "Newfoundland Moose Stew",
    description: "Hearty winter stew with tender moose meat and root vegetables",
    category: "Dinner",
    cuisine: "Newfoundland",
    prepTime: 20,
    cookTime: 120,
    servings: 6,
    difficulty: "Medium",
    ingredients: [
      { ingredientId: "ground-moose", amount: 2, unit: "lbs" },
      { ingredientId: "potatoes", amount: 1.5, unit: "lbs" },
      { ingredientId: "carrots", amount: 1, unit: "lb" },
      { ingredientId: "turnip", amount: 0.5, unit: "lb" }
    ],
    instructions: [
      "Brown moose meat in large pot",
      "Add onions and cook until soft",
      "Add stock and simmer 1 hour",
      "Add vegetables and cook 45 minutes"
    ],
    tips: ["Can substitute beef for moose"],
    nutritionInfo: { calories: 380, protein: 32, carbs: 25, fat: 18 },
    isTraditional: true,
    season: ["fall", "winter"]
  },
  {
    id: "pan-fried-cod",
    name: "Pan-Fried Cod with Lemon Butter",
    description: "Simply prepared fresh cod with a light lemon butter sauce",
    category: "Dinner",
    cuisine: "Newfoundland",
    prepTime: 10,
    cookTime: 15,
    servings: 4,
    difficulty: "Easy",
    ingredients: [
      { ingredientId: "atlantic-cod", amount: 1.5, unit: "lbs" },
      { ingredientId: "butter", amount: 4, unit: "tbsp" },
      { ingredientId: "flour", amount: 0.5, unit: "cup" },
      { ingredientId: "lemon", amount: 1, unit: "piece" }
    ],
    instructions: [
      "Season cod and dredge in flour",
      "Pan fry in butter 4 minutes per side",
      "Remove fish and add lemon juice to pan",
      "Pour lemon butter over fish"
    ],
    nutritionInfo: { calories: 280, protein: 32, carbs: 8, fat: 14 }
  },
  {
    id: "roast-chicken",
    name: "Herb Roasted Chicken",
    description: "Juicy whole roasted chicken with herbs and roasted vegetables",
    category: "Dinner",
    cuisine: "General",
    prepTime: 20,
    cookTime: 90,
    servings: 6,
    difficulty: "Medium",
    ingredients: [
      { ingredientId: "whole-chicken", amount: 1, unit: "piece", notes: "4-5 lbs" },
      { ingredientId: "potatoes", amount: 2, unit: "lbs" },
      { ingredientId: "carrots", amount: 1, unit: "lb" },
      { ingredientId: "butter", amount: 4, unit: "tbsp" }
    ],
    instructions: [
      "Rub chicken with butter and herbs",
      "Place vegetables around chicken in roasting pan",
      "Roast at 425°F for 1.5 hours",
      "Rest 10 minutes before carving"
    ],
    nutritionInfo: { calories: 420, protein: 38, carbs: 25, fat: 20 }
  },
  {
    id: "salmon-dinner",
    name: "Baked Atlantic Salmon",
    description: "Fresh Atlantic salmon baked with dill and served with rice",
    category: "Dinner",
    cuisine: "Newfoundland",
    prepTime: 10,
    cookTime: 20,
    servings: 4,
    difficulty: "Easy",
    ingredients: [
      { ingredientId: "salmon", amount: 1.5, unit: "lbs" },
      { ingredientId: "lemon", amount: 1, unit: "piece" },
      { ingredientId: "butter", amount: 2, unit: "tbsp" },
      { ingredientId: "rice", amount: 2, unit: "cups" }
    ],
    instructions: [
      "Place salmon on baking sheet",
      "Top with butter, lemon, and dill",
      "Bake at 400°F for 15-20 minutes",
      "Serve with rice and vegetables"
    ],
    nutritionInfo: { calories: 380, protein: 34, carbs: 28, fat: 16 }
  },
  {
    id: "beef-stir-fry",
    name: "Beef and Vegetable Stir Fry",
    description: "Quick and healthy beef stir fry with colorful vegetables",
    category: "Dinner",
    cuisine: "General",
    prepTime: 20,
    cookTime: 15,
    servings: 4,
    difficulty: "Easy",
    ingredients: [
      { ingredientId: "beef", amount: 1, unit: "lb", notes: "Sliced thin" },
      { ingredientId: "broccoli", amount: 2, unit: "cups" },
      { ingredientId: "carrots", amount: 1, unit: "cup" },
      { ingredientId: "rice", amount: 2, unit: "cups" }
    ],
    instructions: [
      "Cook rice according to package",
      "Stir fry beef in hot oil until browned",
      "Add vegetables and cook until crisp-tender",
      "Add sauce and serve over rice"
    ],
    nutritionInfo: { calories: 420, protein: 28, carbs: 42, fat: 16 }
  },
  {
    id: "spaghetti-meatballs",
    name: "Spaghetti and Meatballs",
    description: "Classic Italian-American comfort food with homemade meatballs",
    category: "Dinner",
    cuisine: "General",
    prepTime: 25,
    cookTime: 35,
    servings: 6,
    difficulty: "Medium",
    ingredients: [
      { ingredientId: "ground-beef", amount: 1, unit: "lb" },
      { ingredientId: "spaghetti", amount: 1, unit: "lb" },
      { ingredientId: "tomato-sauce", amount: 3, unit: "cups" },
      { ingredientId: "parmesan", amount: 0.5, unit: "cup" }
    ],
    instructions: [
      "Mix beef with breadcrumbs, egg, and seasonings",
      "Form into meatballs and brown in pan",
      "Simmer in tomato sauce for 20 minutes",
      "Serve over cooked spaghetti"
    ],
    nutritionInfo: { calories: 520, protein: 28, carbs: 58, fat: 20 }
  },
  {
    id: "pork-chops",
    name: "Pan-Seared Pork Chops",
    description: "Juicy bone-in pork chops with apple cider glaze",
    category: "Dinner",
    cuisine: "General",
    prepTime: 10,
    cookTime: 20,
    servings: 4,
    difficulty: "Easy",
    ingredients: [
      { ingredientId: "pork-chops", amount: 4, unit: "piece" },
      { ingredientId: "butter", amount: 2, unit: "tbsp" },
      { ingredientId: "potatoes", amount: 1.5, unit: "lbs" },
      { ingredientId: "apple-cider", amount: 0.5, unit: "cup" }
    ],
    instructions: [
      "Season pork chops with salt and pepper",
      "Sear in hot pan 5 minutes per side",
      "Add apple cider and reduce to glaze",
      "Serve with mashed potatoes"
    ],
    nutritionInfo: { calories: 380, protein: 32, carbs: 25, fat: 18 }
  },
  {
    id: "shrimp-pasta",
    name: "Garlic Shrimp Pasta",
    description: "Succulent shrimp in garlic butter sauce over linguine",
    category: "Dinner",
    cuisine: "General",
    prepTime: 15,
    cookTime: 20,
    servings: 4,
    difficulty: "Easy",
    ingredients: [
      { ingredientId: "shrimp", amount: 1, unit: "lb" },
      { ingredientId: "spaghetti", amount: 0.75, unit: "lb" },
      { ingredientId: "butter", amount: 4, unit: "tbsp" },
      { ingredientId: "parmesan", amount: 0.5, unit: "cup" }
    ],
    instructions: [
      "Cook pasta according to package",
      "Sauté garlic in butter",
      "Add shrimp and cook until pink",
      "Toss with pasta and parmesan"
    ],
    nutritionInfo: { calories: 480, protein: 32, carbs: 52, fat: 18 }
  },

  // ============ SNACK RECIPES ============
  {
    id: "trail-mix",
    name: "Energy Trail Mix",
    description: "Homemade trail mix with nuts, seeds, and dried berries",
    category: "Snack",
    cuisine: "General",
    prepTime: 5,
    cookTime: 0,
    servings: 8,
    difficulty: "Easy",
    ingredients: [
      { ingredientId: "almonds", amount: 1, unit: "cup" },
      { ingredientId: "blueberries", amount: 0.5, unit: "cup", notes: "Dried" },
      { ingredientId: "sunflower-seeds", amount: 0.5, unit: "cup" },
      { ingredientId: "chocolate-chips", amount: 0.5, unit: "cup" }
    ],
    instructions: [
      "Combine all ingredients in large bowl",
      "Mix well and store in airtight container"
    ],
    nutritionInfo: { calories: 180, protein: 5, carbs: 18, fat: 12 }
  },
  {
    id: "hummus-veggies",
    name: "Hummus with Fresh Veggies",
    description: "Creamy hummus served with colorful vegetable sticks",
    category: "Snack",
    cuisine: "General",
    prepTime: 10,
    cookTime: 0,
    servings: 4,
    difficulty: "Easy",
    ingredients: [
      { ingredientId: "chickpeas", amount: 1, unit: "can" },
      { ingredientId: "carrots", amount: 2, unit: "piece" },
      { ingredientId: "celery", amount: 3, unit: "stalks" },
      { ingredientId: "cucumber", amount: 1, unit: "piece" }
    ],
    instructions: [
      "Blend chickpeas with tahini, lemon, and garlic",
      "Cut vegetables into sticks",
      "Serve hummus with veggie sticks"
    ],
    nutritionInfo: { calories: 150, protein: 6, carbs: 18, fat: 6 }
  },
  {
    id: "cheese-crackers",
    name: "Cheese and Crackers",
    description: "Assorted cheese with whole grain crackers and grapes",
    category: "Snack",
    cuisine: "General",
    prepTime: 5,
    cookTime: 0,
    servings: 4,
    difficulty: "Easy",
    ingredients: [
      { ingredientId: "cheddar", amount: 4, unit: "oz" },
      { ingredientId: "crackers", amount: 24, unit: "piece" },
      { ingredientId: "grapes", amount: 1, unit: "cup" }
    ],
    instructions: [
      "Slice cheese into portions",
      "Arrange on plate with crackers and grapes"
    ],
    nutritionInfo: { calories: 220, protein: 10, carbs: 22, fat: 12 }
  },
  {
    id: "apple-peanut-butter",
    name: "Apple Slices with Peanut Butter",
    description: "Crisp apple slices with creamy peanut butter for dipping",
    category: "Snack",
    cuisine: "General",
    prepTime: 5,
    cookTime: 0,
    servings: 2,
    difficulty: "Easy",
    ingredients: [
      { ingredientId: "apple", amount: 2, unit: "piece" },
      { ingredientId: "peanut-butter", amount: 4, unit: "tbsp" }
    ],
    instructions: [
      "Core and slice apples",
      "Serve with peanut butter for dipping"
    ],
    nutritionInfo: { calories: 250, protein: 8, carbs: 28, fat: 14 }
  },
  {
    id: "yogurt-parfait",
    name: "Greek Yogurt Parfait",
    description: "Layers of creamy yogurt, granola, and fresh berries",
    category: "Snack",
    cuisine: "General",
    prepTime: 5,
    cookTime: 0,
    servings: 2,
    difficulty: "Easy",
    ingredients: [
      { ingredientId: "yogurt", amount: 2, unit: "cups" },
      { ingredientId: "granola", amount: 0.5, unit: "cup" },
      { ingredientId: "blueberries", amount: 0.5, unit: "cup" },
      { ingredientId: "honey", amount: 2, unit: "tbsp" }
    ],
    instructions: [
      "Layer yogurt, granola, and berries in glass",
      "Drizzle with honey",
      "Repeat layers"
    ],
    nutritionInfo: { calories: 280, protein: 15, carbs: 38, fat: 8 }
  },
  {
    id: "deviled-eggs",
    name: "Classic Deviled Eggs",
    description: "Creamy filled egg halves - perfect party snack",
    category: "Snack",
    cuisine: "General",
    prepTime: 20,
    cookTime: 12,
    servings: 6,
    difficulty: "Easy",
    ingredients: [
      { ingredientId: "eggs", amount: 6, unit: "piece" },
      { ingredientId: "mayonnaise", amount: 3, unit: "tbsp" },
      { ingredientId: "mustard", amount: 1, unit: "tsp" }
    ],
    instructions: [
      "Hard boil eggs and cool",
      "Cut in half and remove yolks",
      "Mix yolks with mayo and mustard",
      "Pipe filling back into whites"
    ],
    nutritionInfo: { calories: 120, protein: 8, carbs: 1, fat: 10 }
  },

  // ============ DESSERT RECIPES ============
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
      { ingredientId: "blueberries", amount: 4, unit: "cups" },
      { ingredientId: "flour", amount: 1.5, unit: "cups" },
      { ingredientId: "milk", amount: 0.75, unit: "cup" },
      { ingredientId: "butter", amount: 0.25, unit: "cup" }
    ],
    instructions: [
      "Simmer blueberries with sugar and water",
      "Make dumpling dough from flour, milk, butter",
      "Drop spoonfuls onto berries",
      "Cover and steam 20 minutes"
    ],
    tips: ["Don't lift the lid while steaming"],
    nutritionInfo: { calories: 280, protein: 4, carbs: 55, fat: 6 },
    isTraditional: true,
    season: ["summer", "fall"]
  },
  {
    id: "figgy-duff",
    name: "Figgy Duff",
    description: "Traditional Newfoundland boiled pudding with raisins and molasses",
    category: "Dessert",
    cuisine: "Newfoundland",
    prepTime: 20,
    cookTime: 120,
    servings: 8,
    difficulty: "Medium",
    ingredients: [
      { ingredientId: "flour", amount: 2, unit: "cups" },
      { ingredientId: "raisins", amount: 1, unit: "cup" },
      { ingredientId: "molasses", amount: 0.5, unit: "cup" },
      { ingredientId: "butter", amount: 0.5, unit: "cup" }
    ],
    instructions: [
      "Mix flour, raisins, and spices",
      "Add molasses, butter, and milk",
      "Pour into cloth bag and tie",
      "Boil for 2 hours",
      "Serve with rum sauce"
    ],
    nutritionInfo: { calories: 320, protein: 5, carbs: 58, fat: 10 },
    isTraditional: true
  },
  {
    id: "partridgeberry-pie",
    name: "Partridgeberry Pie",
    description: "Sweet-tart pie made with wild Newfoundland partridgeberries",
    category: "Dessert",
    cuisine: "Newfoundland",
    prepTime: 30,
    cookTime: 45,
    servings: 8,
    difficulty: "Medium",
    ingredients: [
      { ingredientId: "partridgeberries", amount: 4, unit: "cups" },
      { ingredientId: "flour", amount: 2.5, unit: "cups" },
      { ingredientId: "butter", amount: 1, unit: "cup" },
      { ingredientId: "eggs", amount: 1, unit: "piece" }
    ],
    instructions: [
      "Make pie crust with flour, butter, water",
      "Mix berries with sugar and cornstarch",
      "Pour into crust and top with lattice",
      "Bake at 375°F for 45 minutes"
    ],
    nutritionInfo: { calories: 340, protein: 4, carbs: 52, fat: 14 },
    isTraditional: true,
    season: ["fall"]
  },
  {
    id: "chocolate-chip-cookies",
    name: "Chocolate Chip Cookies",
    description: "Classic homemade cookies with gooey chocolate chips",
    category: "Dessert",
    cuisine: "General",
    prepTime: 15,
    cookTime: 12,
    servings: 24,
    difficulty: "Easy",
    ingredients: [
      { ingredientId: "flour", amount: 2.25, unit: "cups" },
      { ingredientId: "butter", amount: 1, unit: "cup" },
      { ingredientId: "chocolate-chips", amount: 2, unit: "cups" },
      { ingredientId: "eggs", amount: 2, unit: "piece" }
    ],
    instructions: [
      "Cream butter and sugars",
      "Add eggs and vanilla",
      "Mix in flour and chocolate chips",
      "Bake at 375°F for 10-12 minutes"
    ],
    nutritionInfo: { calories: 180, protein: 2, carbs: 24, fat: 9 }
  },
  {
    id: "apple-crisp",
    name: "Apple Crisp",
    description: "Warm baked apples with a crunchy oat topping",
    category: "Dessert",
    cuisine: "General",
    prepTime: 20,
    cookTime: 45,
    servings: 8,
    difficulty: "Easy",
    ingredients: [
      { ingredientId: "apple", amount: 6, unit: "piece" },
      { ingredientId: "oats", amount: 1, unit: "cup" },
      { ingredientId: "butter", amount: 0.5, unit: "cup" },
      { ingredientId: "flour", amount: 0.5, unit: "cup" }
    ],
    instructions: [
      "Slice apples and place in baking dish",
      "Mix oats, flour, brown sugar, and butter",
      "Sprinkle topping over apples",
      "Bake at 350°F for 45 minutes"
    ],
    tips: ["Serve warm with vanilla ice cream"],
    nutritionInfo: { calories: 280, protein: 3, carbs: 42, fat: 12 }
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
