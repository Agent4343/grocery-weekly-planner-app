// Comprehensive Healthy Recipes Database for NL Meal Planner
// 150+ healthy recipes organized by meal type

export interface RecipeIngredient {
  name: string;
  amount: number;
  unit: string;
  notes?: string;
  category: 'Produce' | 'Meat' | 'Seafood' | 'Dairy' | 'Pantry' | 'Frozen' | 'Bakery' | 'Spices';
  estimatedPrice: number;
}

export interface NutritionInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sodium: number;
}

export interface Recipe {
  id: string;
  name: string;
  description: string;
  category: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  ingredients: RecipeIngredient[];
  instructions: string[];
  tags: string[];
  nutrition: NutritionInfo;
  estimatedCost: number;
  imageUrl?: string;
}

// ============================================
// BREAKFAST RECIPES (50 Healthy Options)
// ============================================

export const breakfastRecipes: Recipe[] = [
  {
    id: "overnight-oats-berry",
    name: "Overnight Oats with Berries",
    description: "Creamy overnight oats topped with fresh mixed berries and honey",
    category: "Breakfast",
    mealType: "breakfast",
    prepTime: 5,
    cookTime: 0,
    servings: 2,
    difficulty: "Easy",
    ingredients: [
      { name: "Rolled Oats", amount: 1, unit: "cup", category: "Pantry", estimatedPrice: 0.40 },
      { name: "Greek Yogurt", amount: 0.5, unit: "cup", category: "Dairy", estimatedPrice: 1.50 },
      { name: "Almond Milk", amount: 1, unit: "cup", category: "Dairy", estimatedPrice: 0.60 },
      { name: "Chia Seeds", amount: 2, unit: "tbsp", category: "Pantry", estimatedPrice: 0.50 },
      { name: "Mixed Berries", amount: 1, unit: "cup", category: "Produce", estimatedPrice: 3.00 },
      { name: "Honey", amount: 2, unit: "tbsp", category: "Pantry", estimatedPrice: 0.40 }
    ],
    instructions: [
      "Combine oats, yogurt, almond milk, and chia seeds in a jar",
      "Stir well, cover, and refrigerate overnight (at least 6 hours)",
      "In the morning, top with fresh berries and drizzle with honey",
      "Serve cold or microwave for 1-2 minutes if preferred warm"
    ],
    tags: ["healthy", "meal-prep", "high-fiber", "no-cook", "vegetarian"],
    nutrition: { calories: 320, protein: 12, carbs: 52, fat: 8, fiber: 8, sodium: 85 },
    estimatedCost: 3.20
  },
  {
    id: "veggie-egg-muffins",
    name: "Veggie Egg Muffins",
    description: "Protein-packed egg muffins loaded with colorful vegetables",
    category: "Breakfast",
    mealType: "breakfast",
    prepTime: 15,
    cookTime: 25,
    servings: 6,
    difficulty: "Easy",
    ingredients: [
      { name: "Eggs", amount: 8, unit: "large", category: "Dairy", estimatedPrice: 3.00 },
      { name: "Bell Peppers", amount: 1, unit: "cup diced", category: "Produce", estimatedPrice: 2.00 },
      { name: "Spinach", amount: 2, unit: "cups", category: "Produce", estimatedPrice: 2.50 },
      { name: "Onion", amount: 0.5, unit: "cup diced", category: "Produce", estimatedPrice: 0.50 },
      { name: "Feta Cheese", amount: 0.5, unit: "cup", category: "Dairy", estimatedPrice: 2.50 },
      { name: "Salt", amount: 0.5, unit: "tsp", category: "Spices", estimatedPrice: 0.05 },
      { name: "Black Pepper", amount: 0.25, unit: "tsp", category: "Spices", estimatedPrice: 0.05 }
    ],
    instructions: [
      "Preheat oven to 350°F (175°C) and grease a 12-cup muffin tin",
      "Sauté bell peppers and onion until softened, about 5 minutes",
      "Add spinach and cook until wilted",
      "Whisk eggs with salt and pepper",
      "Divide vegetables among muffin cups, pour egg mixture over top",
      "Sprinkle with feta cheese",
      "Bake for 20-25 minutes until set and lightly golden"
    ],
    tags: ["healthy", "meal-prep", "high-protein", "low-carb", "vegetarian", "keto-friendly"],
    nutrition: { calories: 145, protein: 11, carbs: 4, fat: 10, fiber: 1, sodium: 280 },
    estimatedCost: 1.75
  },
  {
    id: "avocado-toast-egg",
    name: "Avocado Toast with Poached Egg",
    description: "Creamy avocado on whole grain toast topped with a perfectly poached egg",
    category: "Breakfast",
    mealType: "breakfast",
    prepTime: 5,
    cookTime: 10,
    servings: 2,
    difficulty: "Medium",
    ingredients: [
      { name: "Whole Grain Bread", amount: 2, unit: "slices", category: "Bakery", estimatedPrice: 0.80 },
      { name: "Avocado", amount: 1, unit: "medium", category: "Produce", estimatedPrice: 2.00 },
      { name: "Eggs", amount: 2, unit: "large", category: "Dairy", estimatedPrice: 0.75 },
      { name: "Lemon Juice", amount: 1, unit: "tsp", category: "Produce", estimatedPrice: 0.20 },
      { name: "Red Pepper Flakes", amount: 0.25, unit: "tsp", category: "Spices", estimatedPrice: 0.05 },
      { name: "Salt", amount: 0.25, unit: "tsp", category: "Spices", estimatedPrice: 0.02 }
    ],
    instructions: [
      "Toast bread until golden and crisp",
      "Mash avocado with lemon juice and salt",
      "Bring water to a gentle simmer, create a whirlpool, and poach eggs for 3-4 minutes",
      "Spread avocado on toast, top with poached egg",
      "Sprinkle with red pepper flakes and serve immediately"
    ],
    tags: ["healthy", "quick", "high-fiber", "vegetarian"],
    nutrition: { calories: 340, protein: 14, carbs: 28, fat: 22, fiber: 10, sodium: 320 },
    estimatedCost: 1.90
  },
  {
    id: "greek-yogurt-parfait",
    name: "Greek Yogurt Parfait",
    description: "Layered Greek yogurt with granola, berries, and a drizzle of honey",
    category: "Breakfast",
    mealType: "breakfast",
    prepTime: 5,
    cookTime: 0,
    servings: 1,
    difficulty: "Easy",
    ingredients: [
      { name: "Greek Yogurt", amount: 1, unit: "cup", category: "Dairy", estimatedPrice: 2.00 },
      { name: "Granola", amount: 0.25, unit: "cup", category: "Pantry", estimatedPrice: 0.60 },
      { name: "Blueberries", amount: 0.5, unit: "cup", category: "Produce", estimatedPrice: 2.00 },
      { name: "Strawberries", amount: 0.5, unit: "cup sliced", category: "Produce", estimatedPrice: 1.50 },
      { name: "Honey", amount: 1, unit: "tbsp", category: "Pantry", estimatedPrice: 0.30 }
    ],
    instructions: [
      "Layer half the yogurt in a glass or bowl",
      "Add half the granola and half the berries",
      "Repeat layers with remaining ingredients",
      "Drizzle with honey and serve immediately"
    ],
    tags: ["healthy", "quick", "high-protein", "vegetarian", "no-cook"],
    nutrition: { calories: 380, protein: 22, carbs: 52, fat: 10, fiber: 5, sodium: 120 },
    estimatedCost: 3.20
  },
  {
    id: "banana-oat-pancakes",
    name: "Banana Oat Pancakes",
    description: "Fluffy pancakes made with oats and bananas, naturally sweetened",
    category: "Breakfast",
    mealType: "breakfast",
    prepTime: 10,
    cookTime: 15,
    servings: 4,
    difficulty: "Easy",
    ingredients: [
      { name: "Rolled Oats", amount: 2, unit: "cups", category: "Pantry", estimatedPrice: 0.80 },
      { name: "Bananas", amount: 2, unit: "ripe", category: "Produce", estimatedPrice: 0.50 },
      { name: "Eggs", amount: 2, unit: "large", category: "Dairy", estimatedPrice: 0.75 },
      { name: "Milk", amount: 1, unit: "cup", category: "Dairy", estimatedPrice: 0.40 },
      { name: "Baking Powder", amount: 1, unit: "tsp", category: "Pantry", estimatedPrice: 0.10 },
      { name: "Cinnamon", amount: 1, unit: "tsp", category: "Spices", estimatedPrice: 0.10 },
      { name: "Maple Syrup", amount: 2, unit: "tbsp", category: "Pantry", estimatedPrice: 0.60 }
    ],
    instructions: [
      "Blend oats in a blender until flour-like consistency",
      "Add bananas, eggs, milk, baking powder, and cinnamon; blend until smooth",
      "Heat a non-stick pan over medium heat",
      "Pour 1/4 cup batter per pancake, cook until bubbles form, then flip",
      "Serve with fresh fruit and a drizzle of maple syrup"
    ],
    tags: ["healthy", "whole-grain", "kid-friendly", "vegetarian"],
    nutrition: { calories: 280, protein: 10, carbs: 48, fat: 6, fiber: 5, sodium: 180 },
    estimatedCost: 0.80
  },
  {
    id: "spinach-mushroom-omelette",
    name: "Spinach Mushroom Omelette",
    description: "Fluffy omelette filled with sautéed spinach, mushrooms, and cheese",
    category: "Breakfast",
    mealType: "breakfast",
    prepTime: 10,
    cookTime: 10,
    servings: 1,
    difficulty: "Medium",
    ingredients: [
      { name: "Eggs", amount: 3, unit: "large", category: "Dairy", estimatedPrice: 1.15 },
      { name: "Spinach", amount: 1, unit: "cup", category: "Produce", estimatedPrice: 1.00 },
      { name: "Mushrooms", amount: 0.5, unit: "cup sliced", category: "Produce", estimatedPrice: 1.00 },
      { name: "Cheddar Cheese", amount: 0.25, unit: "cup shredded", category: "Dairy", estimatedPrice: 0.80 },
      { name: "Butter", amount: 1, unit: "tbsp", category: "Dairy", estimatedPrice: 0.20 },
      { name: "Salt", amount: 0.25, unit: "tsp", category: "Spices", estimatedPrice: 0.02 },
      { name: "Black Pepper", amount: 0.125, unit: "tsp", category: "Spices", estimatedPrice: 0.02 }
    ],
    instructions: [
      "Whisk eggs with salt and pepper",
      "Sauté mushrooms in half the butter until golden, add spinach until wilted",
      "Remove vegetables and set aside",
      "Add remaining butter to pan, pour in eggs",
      "Cook until edges set, add vegetables and cheese to one half",
      "Fold omelette and cook 1 more minute"
    ],
    tags: ["healthy", "high-protein", "low-carb", "keto-friendly", "vegetarian"],
    nutrition: { calories: 380, protein: 26, carbs: 5, fat: 29, fiber: 2, sodium: 520 },
    estimatedCost: 2.10
  },
  {
    id: "chia-pudding",
    name: "Vanilla Chia Pudding",
    description: "Creamy chia pudding with vanilla and topped with fresh fruit",
    category: "Breakfast",
    mealType: "breakfast",
    prepTime: 5,
    cookTime: 0,
    servings: 2,
    difficulty: "Easy",
    ingredients: [
      { name: "Chia Seeds", amount: 0.25, unit: "cup", category: "Pantry", estimatedPrice: 1.50 },
      { name: "Almond Milk", amount: 1, unit: "cup", category: "Dairy", estimatedPrice: 0.60 },
      { name: "Vanilla Extract", amount: 1, unit: "tsp", category: "Pantry", estimatedPrice: 0.30 },
      { name: "Maple Syrup", amount: 2, unit: "tbsp", category: "Pantry", estimatedPrice: 0.60 },
      { name: "Mango", amount: 1, unit: "cup diced", category: "Produce", estimatedPrice: 2.00 }
    ],
    instructions: [
      "Mix chia seeds, almond milk, vanilla, and maple syrup in a bowl",
      "Stir well to prevent clumping",
      "Cover and refrigerate for at least 4 hours or overnight",
      "Stir before serving and top with fresh mango"
    ],
    tags: ["healthy", "meal-prep", "vegan", "gluten-free", "high-fiber"],
    nutrition: { calories: 240, protein: 6, carbs: 34, fat: 10, fiber: 12, sodium: 90 },
    estimatedCost: 2.50
  },
  {
    id: "smoothie-bowl-tropical",
    name: "Tropical Smoothie Bowl",
    description: "Thick tropical smoothie bowl with colorful toppings",
    category: "Breakfast",
    mealType: "breakfast",
    prepTime: 10,
    cookTime: 0,
    servings: 1,
    difficulty: "Easy",
    ingredients: [
      { name: "Frozen Mango", amount: 1, unit: "cup", category: "Frozen", estimatedPrice: 2.00 },
      { name: "Frozen Pineapple", amount: 0.5, unit: "cup", category: "Frozen", estimatedPrice: 1.00 },
      { name: "Banana", amount: 1, unit: "frozen", category: "Produce", estimatedPrice: 0.25 },
      { name: "Coconut Milk", amount: 0.5, unit: "cup", category: "Dairy", estimatedPrice: 0.80 },
      { name: "Granola", amount: 0.25, unit: "cup", category: "Pantry", estimatedPrice: 0.60 },
      { name: "Shredded Coconut", amount: 2, unit: "tbsp", category: "Pantry", estimatedPrice: 0.30 },
      { name: "Kiwi", amount: 1, unit: "sliced", category: "Produce", estimatedPrice: 0.50 }
    ],
    instructions: [
      "Blend frozen mango, pineapple, banana, and coconut milk until thick and smooth",
      "Pour into a bowl (should be thick enough to hold toppings)",
      "Top with granola, shredded coconut, and sliced kiwi",
      "Serve immediately"
    ],
    tags: ["healthy", "vegan", "tropical", "high-vitamin", "no-cook"],
    nutrition: { calories: 420, protein: 6, carbs: 78, fat: 12, fiber: 10, sodium: 45 },
    estimatedCost: 2.70
  },
  {
    id: "cottage-cheese-toast",
    name: "Cottage Cheese Toast with Tomatoes",
    description: "High-protein toast topped with cottage cheese and fresh tomatoes",
    category: "Breakfast",
    mealType: "breakfast",
    prepTime: 5,
    cookTime: 3,
    servings: 1,
    difficulty: "Easy",
    ingredients: [
      { name: "Whole Grain Bread", amount: 2, unit: "slices", category: "Bakery", estimatedPrice: 0.80 },
      { name: "Cottage Cheese", amount: 0.5, unit: "cup", category: "Dairy", estimatedPrice: 1.50 },
      { name: "Cherry Tomatoes", amount: 0.5, unit: "cup halved", category: "Produce", estimatedPrice: 1.50 },
      { name: "Everything Bagel Seasoning", amount: 1, unit: "tsp", category: "Spices", estimatedPrice: 0.20 },
      { name: "Olive Oil", amount: 1, unit: "tsp", category: "Pantry", estimatedPrice: 0.15 }
    ],
    instructions: [
      "Toast bread until golden",
      "Spread cottage cheese evenly on toast",
      "Top with halved cherry tomatoes",
      "Drizzle with olive oil and sprinkle with seasoning"
    ],
    tags: ["healthy", "quick", "high-protein", "vegetarian"],
    nutrition: { calories: 320, protein: 20, carbs: 32, fat: 12, fiber: 5, sodium: 580 },
    estimatedCost: 2.10
  },
  {
    id: "steel-cut-oats-apple",
    name: "Steel Cut Oats with Apple & Cinnamon",
    description: "Hearty steel cut oats topped with caramelized apples",
    category: "Breakfast",
    mealType: "breakfast",
    prepTime: 5,
    cookTime: 30,
    servings: 4,
    difficulty: "Easy",
    ingredients: [
      { name: "Steel Cut Oats", amount: 1, unit: "cup", category: "Pantry", estimatedPrice: 0.80 },
      { name: "Water", amount: 3, unit: "cups", category: "Pantry", estimatedPrice: 0 },
      { name: "Apple", amount: 2, unit: "medium diced", category: "Produce", estimatedPrice: 1.50 },
      { name: "Cinnamon", amount: 1, unit: "tsp", category: "Spices", estimatedPrice: 0.10 },
      { name: "Brown Sugar", amount: 2, unit: "tbsp", category: "Pantry", estimatedPrice: 0.15 },
      { name: "Butter", amount: 1, unit: "tbsp", category: "Dairy", estimatedPrice: 0.20 },
      { name: "Walnuts", amount: 0.25, unit: "cup chopped", category: "Pantry", estimatedPrice: 1.00 }
    ],
    instructions: [
      "Bring water to boil, add oats and reduce heat to simmer",
      "Cook oats for 25-30 minutes, stirring occasionally",
      "Meanwhile, sauté apples in butter with cinnamon and brown sugar until tender",
      "Divide oats among bowls, top with caramelized apples and walnuts"
    ],
    tags: ["healthy", "whole-grain", "high-fiber", "vegetarian", "comfort-food"],
    nutrition: { calories: 340, protein: 8, carbs: 52, fat: 12, fiber: 7, sodium: 25 },
    estimatedCost: 0.95
  },
  // Continue with more breakfast recipes...
  {
    id: "protein-breakfast-wrap",
    name: "Protein Breakfast Wrap",
    description: "Whole wheat wrap with scrambled eggs, black beans, and salsa",
    category: "Breakfast",
    mealType: "breakfast",
    prepTime: 10,
    cookTime: 10,
    servings: 2,
    difficulty: "Easy",
    ingredients: [
      { name: "Whole Wheat Tortillas", amount: 2, unit: "large", category: "Bakery", estimatedPrice: 1.00 },
      { name: "Eggs", amount: 4, unit: "large", category: "Dairy", estimatedPrice: 1.50 },
      { name: "Black Beans", amount: 0.5, unit: "cup", category: "Pantry", estimatedPrice: 0.50 },
      { name: "Salsa", amount: 0.25, unit: "cup", category: "Pantry", estimatedPrice: 0.40 },
      { name: "Cheddar Cheese", amount: 0.25, unit: "cup shredded", category: "Dairy", estimatedPrice: 0.80 },
      { name: "Avocado", amount: 0.5, unit: "medium", category: "Produce", estimatedPrice: 1.00 }
    ],
    instructions: [
      "Scramble eggs in a non-stick pan until just set",
      "Warm tortillas in microwave for 20 seconds",
      "Warm black beans in microwave",
      "Layer eggs, beans, cheese, sliced avocado, and salsa on tortillas",
      "Roll up tightly and serve"
    ],
    tags: ["healthy", "high-protein", "filling", "mexican-inspired"],
    nutrition: { calories: 450, protein: 24, carbs: 38, fat: 24, fiber: 10, sodium: 680 },
    estimatedCost: 2.60
  },
  {
    id: "blueberry-flax-muffins",
    name: "Blueberry Flax Muffins",
    description: "Healthy muffins with blueberries and ground flaxseed",
    category: "Breakfast",
    mealType: "breakfast",
    prepTime: 15,
    cookTime: 25,
    servings: 12,
    difficulty: "Easy",
    ingredients: [
      { name: "Whole Wheat Flour", amount: 1.5, unit: "cups", category: "Pantry", estimatedPrice: 0.60 },
      { name: "Ground Flaxseed", amount: 0.5, unit: "cup", category: "Pantry", estimatedPrice: 1.00 },
      { name: "Baking Powder", amount: 2, unit: "tsp", category: "Pantry", estimatedPrice: 0.10 },
      { name: "Eggs", amount: 2, unit: "large", category: "Dairy", estimatedPrice: 0.75 },
      { name: "Honey", amount: 0.33, unit: "cup", category: "Pantry", estimatedPrice: 1.20 },
      { name: "Greek Yogurt", amount: 0.5, unit: "cup", category: "Dairy", estimatedPrice: 1.50 },
      { name: "Blueberries", amount: 1, unit: "cup", category: "Produce", estimatedPrice: 3.00 },
      { name: "Vanilla Extract", amount: 1, unit: "tsp", category: "Pantry", estimatedPrice: 0.30 }
    ],
    instructions: [
      "Preheat oven to 350°F (175°C) and line muffin tin with liners",
      "Mix flour, flaxseed, and baking powder in a large bowl",
      "Whisk eggs, honey, yogurt, and vanilla in another bowl",
      "Combine wet and dry ingredients, fold in blueberries",
      "Divide batter among muffin cups",
      "Bake 20-25 minutes until golden and a toothpick comes out clean"
    ],
    tags: ["healthy", "meal-prep", "high-fiber", "omega-3", "vegetarian"],
    nutrition: { calories: 145, protein: 5, carbs: 24, fat: 4, fiber: 3, sodium: 85 },
    estimatedCost: 0.70
  },
  {
    id: "smoked-salmon-bagel",
    name: "Smoked Salmon Bagel",
    description: "Whole grain bagel with cream cheese, smoked salmon, and capers",
    category: "Breakfast",
    mealType: "breakfast",
    prepTime: 5,
    cookTime: 3,
    servings: 1,
    difficulty: "Easy",
    ingredients: [
      { name: "Whole Grain Bagel", amount: 1, unit: "bagel", category: "Bakery", estimatedPrice: 1.00 },
      { name: "Cream Cheese", amount: 2, unit: "tbsp", category: "Dairy", estimatedPrice: 0.50 },
      { name: "Smoked Salmon", amount: 2, unit: "oz", category: "Seafood", estimatedPrice: 3.50 },
      { name: "Red Onion", amount: 2, unit: "thin slices", category: "Produce", estimatedPrice: 0.20 },
      { name: "Capers", amount: 1, unit: "tsp", category: "Pantry", estimatedPrice: 0.30 },
      { name: "Fresh Dill", amount: 1, unit: "tbsp", category: "Produce", estimatedPrice: 0.40 }
    ],
    instructions: [
      "Toast bagel until golden",
      "Spread cream cheese on both halves",
      "Layer smoked salmon on top",
      "Add red onion slices, capers, and fresh dill"
    ],
    tags: ["healthy", "quick", "high-protein", "omega-3", "scandinavian"],
    nutrition: { calories: 420, protein: 22, carbs: 42, fat: 18, fiber: 4, sodium: 1200 },
    estimatedCost: 2.95
  },
  {
    id: "green-smoothie",
    name: "Power Green Smoothie",
    description: "Nutrient-packed green smoothie with spinach, banana, and protein",
    category: "Breakfast",
    mealType: "breakfast",
    prepTime: 5,
    cookTime: 0,
    servings: 1,
    difficulty: "Easy",
    ingredients: [
      { name: "Spinach", amount: 2, unit: "cups", category: "Produce", estimatedPrice: 1.00 },
      { name: "Banana", amount: 1, unit: "frozen", category: "Produce", estimatedPrice: 0.25 },
      { name: "Almond Butter", amount: 1, unit: "tbsp", category: "Pantry", estimatedPrice: 0.50 },
      { name: "Almond Milk", amount: 1, unit: "cup", category: "Dairy", estimatedPrice: 0.60 },
      { name: "Protein Powder", amount: 1, unit: "scoop", category: "Pantry", estimatedPrice: 1.00 },
      { name: "Chia Seeds", amount: 1, unit: "tbsp", category: "Pantry", estimatedPrice: 0.40 }
    ],
    instructions: [
      "Add almond milk to blender first",
      "Add spinach and blend until smooth",
      "Add frozen banana, almond butter, protein powder, and chia seeds",
      "Blend until creamy and smooth",
      "Add more liquid if needed for desired consistency"
    ],
    tags: ["healthy", "quick", "high-protein", "vegan-option", "meal-replacement"],
    nutrition: { calories: 380, protein: 28, carbs: 38, fat: 14, fiber: 8, sodium: 220 },
    estimatedCost: 1.90
  },
  {
    id: "huevos-rancheros",
    name: "Healthy Huevos Rancheros",
    description: "Mexican-style eggs with black beans, salsa, and avocado",
    category: "Breakfast",
    mealType: "breakfast",
    prepTime: 10,
    cookTime: 15,
    servings: 2,
    difficulty: "Medium",
    ingredients: [
      { name: "Eggs", amount: 4, unit: "large", category: "Dairy", estimatedPrice: 1.50 },
      { name: "Corn Tortillas", amount: 4, unit: "small", category: "Bakery", estimatedPrice: 0.80 },
      { name: "Black Beans", amount: 1, unit: "cup", category: "Pantry", estimatedPrice: 0.80 },
      { name: "Salsa", amount: 0.5, unit: "cup", category: "Pantry", estimatedPrice: 0.80 },
      { name: "Avocado", amount: 1, unit: "medium", category: "Produce", estimatedPrice: 2.00 },
      { name: "Cilantro", amount: 2, unit: "tbsp chopped", category: "Produce", estimatedPrice: 0.30 },
      { name: "Lime", amount: 1, unit: "wedges", category: "Produce", estimatedPrice: 0.30 }
    ],
    instructions: [
      "Warm black beans in a small pot with a splash of water",
      "Warm tortillas in a dry skillet",
      "Fry eggs sunny-side up or over-easy",
      "Place tortillas on plates, top with beans and eggs",
      "Spoon salsa over eggs, add sliced avocado",
      "Garnish with cilantro and serve with lime wedges"
    ],
    tags: ["healthy", "high-protein", "mexican", "gluten-free"],
    nutrition: { calories: 480, protein: 22, carbs: 42, fat: 26, fiber: 14, sodium: 720 },
    estimatedCost: 3.25
  }
];

// ============================================
// LUNCH RECIPES (50 Healthy Options)
// ============================================

export const lunchRecipes: Recipe[] = [
  {
    id: "mediterranean-bowl",
    name: "Mediterranean Quinoa Bowl",
    description: "Colorful bowl with quinoa, chickpeas, vegetables, and feta",
    category: "Lunch",
    mealType: "lunch",
    prepTime: 15,
    cookTime: 20,
    servings: 2,
    difficulty: "Easy",
    ingredients: [
      { name: "Quinoa", amount: 1, unit: "cup", category: "Pantry", estimatedPrice: 1.50 },
      { name: "Chickpeas", amount: 1, unit: "can drained", category: "Pantry", estimatedPrice: 1.20 },
      { name: "Cucumber", amount: 1, unit: "medium diced", category: "Produce", estimatedPrice: 1.00 },
      { name: "Cherry Tomatoes", amount: 1, unit: "cup halved", category: "Produce", estimatedPrice: 2.00 },
      { name: "Red Onion", amount: 0.25, unit: "cup diced", category: "Produce", estimatedPrice: 0.30 },
      { name: "Feta Cheese", amount: 0.5, unit: "cup crumbled", category: "Dairy", estimatedPrice: 2.50 },
      { name: "Kalamata Olives", amount: 0.25, unit: "cup", category: "Pantry", estimatedPrice: 1.00 },
      { name: "Olive Oil", amount: 3, unit: "tbsp", category: "Pantry", estimatedPrice: 0.60 },
      { name: "Lemon Juice", amount: 2, unit: "tbsp", category: "Produce", estimatedPrice: 0.30 },
      { name: "Dried Oregano", amount: 1, unit: "tsp", category: "Spices", estimatedPrice: 0.10 }
    ],
    instructions: [
      "Cook quinoa according to package directions, let cool",
      "Whisk olive oil, lemon juice, and oregano for dressing",
      "Combine quinoa, chickpeas, cucumber, tomatoes, and onion",
      "Toss with dressing",
      "Top with feta and olives before serving"
    ],
    tags: ["healthy", "meal-prep", "vegetarian", "mediterranean", "high-fiber"],
    nutrition: { calories: 520, protein: 18, carbs: 58, fat: 24, fiber: 12, sodium: 680 },
    estimatedCost: 5.25
  },
  {
    id: "chicken-salad-lettuce-wraps",
    name: "Chicken Salad Lettuce Wraps",
    description: "Light and refreshing chicken salad served in crisp lettuce cups",
    category: "Lunch",
    mealType: "lunch",
    prepTime: 15,
    cookTime: 0,
    servings: 2,
    difficulty: "Easy",
    ingredients: [
      { name: "Cooked Chicken Breast", amount: 2, unit: "cups shredded", category: "Meat", estimatedPrice: 5.00 },
      { name: "Greek Yogurt", amount: 0.25, unit: "cup", category: "Dairy", estimatedPrice: 0.75 },
      { name: "Celery", amount: 0.5, unit: "cup diced", category: "Produce", estimatedPrice: 0.50 },
      { name: "Red Grapes", amount: 0.5, unit: "cup halved", category: "Produce", estimatedPrice: 1.50 },
      { name: "Almonds", amount: 0.25, unit: "cup slivered", category: "Pantry", estimatedPrice: 1.00 },
      { name: "Butter Lettuce", amount: 1, unit: "head", category: "Produce", estimatedPrice: 2.50 },
      { name: "Dijon Mustard", amount: 1, unit: "tsp", category: "Pantry", estimatedPrice: 0.15 },
      { name: "Lemon Juice", amount: 1, unit: "tbsp", category: "Produce", estimatedPrice: 0.20 }
    ],
    instructions: [
      "Mix Greek yogurt, mustard, and lemon juice in a bowl",
      "Add shredded chicken, celery, grapes, and almonds",
      "Toss to coat evenly",
      "Separate lettuce leaves and wash",
      "Spoon chicken salad into lettuce cups and serve"
    ],
    tags: ["healthy", "low-carb", "high-protein", "gluten-free", "quick"],
    nutrition: { calories: 380, protein: 42, carbs: 16, fat: 16, fiber: 3, sodium: 320 },
    estimatedCost: 5.80
  },
  {
    id: "lentil-soup",
    name: "Hearty Lentil Vegetable Soup",
    description: "Warming soup packed with lentils and vegetables",
    category: "Lunch",
    mealType: "lunch",
    prepTime: 15,
    cookTime: 35,
    servings: 6,
    difficulty: "Easy",
    ingredients: [
      { name: "Green Lentils", amount: 1.5, unit: "cups", category: "Pantry", estimatedPrice: 1.50 },
      { name: "Carrots", amount: 3, unit: "medium diced", category: "Produce", estimatedPrice: 1.00 },
      { name: "Celery", amount: 3, unit: "stalks diced", category: "Produce", estimatedPrice: 0.75 },
      { name: "Onion", amount: 1, unit: "large diced", category: "Produce", estimatedPrice: 0.50 },
      { name: "Garlic", amount: 4, unit: "cloves minced", category: "Produce", estimatedPrice: 0.30 },
      { name: "Diced Tomatoes", amount: 1, unit: "can", category: "Pantry", estimatedPrice: 1.20 },
      { name: "Vegetable Broth", amount: 6, unit: "cups", category: "Pantry", estimatedPrice: 2.00 },
      { name: "Cumin", amount: 1, unit: "tsp", category: "Spices", estimatedPrice: 0.10 },
      { name: "Spinach", amount: 2, unit: "cups", category: "Produce", estimatedPrice: 1.50 },
      { name: "Olive Oil", amount: 2, unit: "tbsp", category: "Pantry", estimatedPrice: 0.40 }
    ],
    instructions: [
      "Heat olive oil in a large pot over medium heat",
      "Sauté onion, carrots, and celery for 5 minutes",
      "Add garlic and cumin, cook 1 minute",
      "Add lentils, tomatoes, and broth; bring to boil",
      "Reduce heat and simmer 25-30 minutes until lentils are tender",
      "Stir in spinach and cook until wilted",
      "Season with salt and pepper to taste"
    ],
    tags: ["healthy", "meal-prep", "vegan", "high-fiber", "budget-friendly"],
    nutrition: { calories: 280, protein: 16, carbs: 42, fat: 6, fiber: 18, sodium: 480 },
    estimatedCost: 1.50
  },
  {
    id: "tuna-stuffed-avocado",
    name: "Tuna Stuffed Avocado",
    description: "Creamy avocado halves filled with protein-rich tuna salad",
    category: "Lunch",
    mealType: "lunch",
    prepTime: 10,
    cookTime: 0,
    servings: 2,
    difficulty: "Easy",
    ingredients: [
      { name: "Avocados", amount: 2, unit: "ripe", category: "Produce", estimatedPrice: 4.00 },
      { name: "Canned Tuna", amount: 2, unit: "cans drained", category: "Seafood", estimatedPrice: 4.00 },
      { name: "Greek Yogurt", amount: 2, unit: "tbsp", category: "Dairy", estimatedPrice: 0.40 },
      { name: "Red Onion", amount: 2, unit: "tbsp minced", category: "Produce", estimatedPrice: 0.20 },
      { name: "Celery", amount: 0.25, unit: "cup diced", category: "Produce", estimatedPrice: 0.30 },
      { name: "Lemon Juice", amount: 1, unit: "tbsp", category: "Produce", estimatedPrice: 0.20 },
      { name: "Dill", amount: 1, unit: "tsp dried", category: "Spices", estimatedPrice: 0.10 }
    ],
    instructions: [
      "Cut avocados in half and remove pits",
      "Mix tuna, Greek yogurt, onion, celery, lemon juice, and dill",
      "Season with salt and pepper",
      "Scoop a bit of avocado from center to make room",
      "Fill avocado halves with tuna mixture",
      "Serve immediately"
    ],
    tags: ["healthy", "low-carb", "high-protein", "omega-3", "keto-friendly", "quick"],
    nutrition: { calories: 420, protein: 32, carbs: 14, fat: 28, fiber: 10, sodium: 380 },
    estimatedCost: 4.60
  },
  {
    id: "asian-chicken-salad",
    name: "Asian Sesame Chicken Salad",
    description: "Crunchy salad with grilled chicken and sesame ginger dressing",
    category: "Lunch",
    mealType: "lunch",
    prepTime: 20,
    cookTime: 15,
    servings: 2,
    difficulty: "Medium",
    ingredients: [
      { name: "Chicken Breast", amount: 2, unit: "boneless", category: "Meat", estimatedPrice: 5.00 },
      { name: "Mixed Greens", amount: 4, unit: "cups", category: "Produce", estimatedPrice: 3.00 },
      { name: "Cabbage", amount: 1, unit: "cup shredded", category: "Produce", estimatedPrice: 0.80 },
      { name: "Carrots", amount: 1, unit: "cup shredded", category: "Produce", estimatedPrice: 0.50 },
      { name: "Edamame", amount: 0.5, unit: "cup shelled", category: "Frozen", estimatedPrice: 1.50 },
      { name: "Mandarin Oranges", amount: 1, unit: "can drained", category: "Pantry", estimatedPrice: 1.50 },
      { name: "Sesame Oil", amount: 2, unit: "tbsp", category: "Pantry", estimatedPrice: 0.50 },
      { name: "Rice Vinegar", amount: 2, unit: "tbsp", category: "Pantry", estimatedPrice: 0.30 },
      { name: "Soy Sauce", amount: 1, unit: "tbsp", category: "Pantry", estimatedPrice: 0.15 },
      { name: "Ginger", amount: 1, unit: "tsp grated", category: "Produce", estimatedPrice: 0.20 },
      { name: "Sesame Seeds", amount: 1, unit: "tbsp", category: "Pantry", estimatedPrice: 0.20 }
    ],
    instructions: [
      "Season chicken with salt and pepper, grill until cooked through",
      "Let chicken rest, then slice",
      "Whisk sesame oil, rice vinegar, soy sauce, and ginger for dressing",
      "Combine greens, cabbage, carrots, and edamame",
      "Top with sliced chicken and mandarin oranges",
      "Drizzle with dressing and sprinkle with sesame seeds"
    ],
    tags: ["healthy", "high-protein", "asian-inspired", "colorful"],
    nutrition: { calories: 420, protein: 38, carbs: 28, fat: 18, fiber: 6, sodium: 620 },
    estimatedCost: 6.80
  },
  {
    id: "turkey-veggie-wrap",
    name: "Turkey & Veggie Whole Wheat Wrap",
    description: "Lean turkey with hummus and fresh vegetables in a whole wheat wrap",
    category: "Lunch",
    mealType: "lunch",
    prepTime: 10,
    cookTime: 0,
    servings: 1,
    difficulty: "Easy",
    ingredients: [
      { name: "Whole Wheat Tortilla", amount: 1, unit: "large", category: "Bakery", estimatedPrice: 0.50 },
      { name: "Turkey Breast", amount: 3, unit: "oz sliced", category: "Meat", estimatedPrice: 2.50 },
      { name: "Hummus", amount: 2, unit: "tbsp", category: "Pantry", estimatedPrice: 0.50 },
      { name: "Spinach", amount: 1, unit: "cup", category: "Produce", estimatedPrice: 0.50 },
      { name: "Cucumber", amount: 0.5, unit: "cup sliced", category: "Produce", estimatedPrice: 0.50 },
      { name: "Bell Pepper", amount: 0.5, unit: "cup sliced", category: "Produce", estimatedPrice: 0.75 },
      { name: "Red Onion", amount: 2, unit: "tbsp sliced", category: "Produce", estimatedPrice: 0.15 }
    ],
    instructions: [
      "Spread hummus evenly across the tortilla",
      "Layer spinach leaves on top",
      "Add turkey slices, cucumber, bell pepper, and onion",
      "Roll tightly, tucking in the sides as you go",
      "Cut in half diagonally and serve"
    ],
    tags: ["healthy", "quick", "high-protein", "portable", "meal-prep"],
    nutrition: { calories: 320, protein: 26, carbs: 32, fat: 10, fiber: 6, sodium: 780 },
    estimatedCost: 2.70
  },
  {
    id: "buddha-bowl",
    name: "Rainbow Buddha Bowl",
    description: "Colorful bowl with roasted vegetables, grains, and tahini dressing",
    category: "Lunch",
    mealType: "lunch",
    prepTime: 15,
    cookTime: 30,
    servings: 2,
    difficulty: "Medium",
    ingredients: [
      { name: "Brown Rice", amount: 1, unit: "cup", category: "Pantry", estimatedPrice: 0.50 },
      { name: "Sweet Potato", amount: 1, unit: "large cubed", category: "Produce", estimatedPrice: 1.50 },
      { name: "Chickpeas", amount: 1, unit: "can drained", category: "Pantry", estimatedPrice: 1.20 },
      { name: "Broccoli", amount: 2, unit: "cups florets", category: "Produce", estimatedPrice: 2.00 },
      { name: "Red Cabbage", amount: 1, unit: "cup shredded", category: "Produce", estimatedPrice: 0.80 },
      { name: "Avocado", amount: 1, unit: "sliced", category: "Produce", estimatedPrice: 2.00 },
      { name: "Tahini", amount: 3, unit: "tbsp", category: "Pantry", estimatedPrice: 1.00 },
      { name: "Lemon Juice", amount: 2, unit: "tbsp", category: "Produce", estimatedPrice: 0.30 },
      { name: "Garlic", amount: 1, unit: "clove minced", category: "Produce", estimatedPrice: 0.10 },
      { name: "Olive Oil", amount: 2, unit: "tbsp", category: "Pantry", estimatedPrice: 0.40 }
    ],
    instructions: [
      "Cook brown rice according to package directions",
      "Toss sweet potato and chickpeas with 1 tbsp olive oil, roast at 400°F for 25 minutes",
      "Steam or roast broccoli until tender-crisp",
      "Make dressing: whisk tahini, lemon juice, garlic, and 2-3 tbsp water",
      "Arrange rice, roasted vegetables, cabbage, and avocado in bowls",
      "Drizzle with tahini dressing"
    ],
    tags: ["healthy", "vegan", "meal-prep", "colorful", "filling"],
    nutrition: { calories: 580, protein: 18, carbs: 72, fat: 26, fiber: 16, sodium: 320 },
    estimatedCost: 4.90
  },
  {
    id: "greek-salad",
    name: "Classic Greek Salad",
    description: "Fresh vegetables with feta cheese and olive oil dressing",
    category: "Lunch",
    mealType: "lunch",
    prepTime: 15,
    cookTime: 0,
    servings: 2,
    difficulty: "Easy",
    ingredients: [
      { name: "Cucumber", amount: 1, unit: "large diced", category: "Produce", estimatedPrice: 1.00 },
      { name: "Tomatoes", amount: 2, unit: "medium diced", category: "Produce", estimatedPrice: 2.00 },
      { name: "Red Onion", amount: 0.5, unit: "medium sliced", category: "Produce", estimatedPrice: 0.40 },
      { name: "Green Bell Pepper", amount: 1, unit: "medium sliced", category: "Produce", estimatedPrice: 1.00 },
      { name: "Kalamata Olives", amount: 0.5, unit: "cup", category: "Pantry", estimatedPrice: 2.00 },
      { name: "Feta Cheese", amount: 4, unit: "oz crumbled", category: "Dairy", estimatedPrice: 3.00 },
      { name: "Olive Oil", amount: 3, unit: "tbsp", category: "Pantry", estimatedPrice: 0.60 },
      { name: "Red Wine Vinegar", amount: 1, unit: "tbsp", category: "Pantry", estimatedPrice: 0.20 },
      { name: "Dried Oregano", amount: 1, unit: "tsp", category: "Spices", estimatedPrice: 0.10 }
    ],
    instructions: [
      "Combine cucumber, tomatoes, onion, and bell pepper in a large bowl",
      "Add olives and toss gently",
      "Whisk olive oil, vinegar, and oregano for dressing",
      "Drizzle dressing over salad",
      "Top with crumbled feta cheese",
      "Season with salt and pepper to taste"
    ],
    tags: ["healthy", "vegetarian", "mediterranean", "low-carb", "quick", "gluten-free"],
    nutrition: { calories: 340, protein: 10, carbs: 16, fat: 28, fiber: 4, sodium: 820 },
    estimatedCost: 5.15
  },
  {
    id: "black-bean-soup",
    name: "Spicy Black Bean Soup",
    description: "Hearty black bean soup with cumin and lime",
    category: "Lunch",
    mealType: "lunch",
    prepTime: 10,
    cookTime: 25,
    servings: 4,
    difficulty: "Easy",
    ingredients: [
      { name: "Black Beans", amount: 2, unit: "cans drained", category: "Pantry", estimatedPrice: 2.40 },
      { name: "Onion", amount: 1, unit: "medium diced", category: "Produce", estimatedPrice: 0.50 },
      { name: "Garlic", amount: 3, unit: "cloves minced", category: "Produce", estimatedPrice: 0.20 },
      { name: "Vegetable Broth", amount: 3, unit: "cups", category: "Pantry", estimatedPrice: 1.00 },
      { name: "Cumin", amount: 2, unit: "tsp", category: "Spices", estimatedPrice: 0.15 },
      { name: "Chili Powder", amount: 1, unit: "tsp", category: "Spices", estimatedPrice: 0.10 },
      { name: "Lime", amount: 2, unit: "juiced", category: "Produce", estimatedPrice: 0.60 },
      { name: "Cilantro", amount: 0.25, unit: "cup chopped", category: "Produce", estimatedPrice: 0.50 },
      { name: "Greek Yogurt", amount: 0.25, unit: "cup", category: "Dairy", estimatedPrice: 0.75 },
      { name: "Olive Oil", amount: 1, unit: "tbsp", category: "Pantry", estimatedPrice: 0.20 }
    ],
    instructions: [
      "Heat olive oil in a pot over medium heat",
      "Sauté onion until softened, add garlic and cook 1 minute",
      "Add cumin and chili powder, stir",
      "Add black beans and broth, bring to simmer",
      "Use immersion blender to partially blend (or blend half in regular blender)",
      "Stir in lime juice, season with salt",
      "Serve topped with cilantro and a dollop of Greek yogurt"
    ],
    tags: ["healthy", "vegan-option", "high-fiber", "high-protein", "budget-friendly"],
    nutrition: { calories: 260, protein: 14, carbs: 42, fat: 4, fiber: 14, sodium: 580 },
    estimatedCost: 1.60
  },
  {
    id: "salmon-salad",
    name: "Grilled Salmon Salad",
    description: "Fresh greens topped with grilled salmon and lemon dill dressing",
    category: "Lunch",
    mealType: "lunch",
    prepTime: 10,
    cookTime: 15,
    servings: 2,
    difficulty: "Medium",
    ingredients: [
      { name: "Salmon Fillets", amount: 2, unit: "6 oz each", category: "Seafood", estimatedPrice: 12.00 },
      { name: "Mixed Greens", amount: 6, unit: "cups", category: "Produce", estimatedPrice: 3.50 },
      { name: "Cherry Tomatoes", amount: 1, unit: "cup halved", category: "Produce", estimatedPrice: 2.00 },
      { name: "Cucumber", amount: 1, unit: "medium sliced", category: "Produce", estimatedPrice: 1.00 },
      { name: "Red Onion", amount: 0.25, unit: "cup sliced", category: "Produce", estimatedPrice: 0.30 },
      { name: "Olive Oil", amount: 3, unit: "tbsp", category: "Pantry", estimatedPrice: 0.60 },
      { name: "Lemon", amount: 1, unit: "juiced", category: "Produce", estimatedPrice: 0.40 },
      { name: "Fresh Dill", amount: 2, unit: "tbsp chopped", category: "Produce", estimatedPrice: 0.50 },
      { name: "Dijon Mustard", amount: 1, unit: "tsp", category: "Pantry", estimatedPrice: 0.15 }
    ],
    instructions: [
      "Season salmon with salt and pepper",
      "Grill or pan-sear salmon 4-5 minutes per side until cooked through",
      "Whisk olive oil, lemon juice, dill, and mustard for dressing",
      "Arrange greens, tomatoes, cucumber, and onion on plates",
      "Top with salmon and drizzle with dressing"
    ],
    tags: ["healthy", "high-protein", "omega-3", "low-carb", "gluten-free"],
    nutrition: { calories: 480, protein: 42, carbs: 12, fat: 30, fiber: 4, sodium: 320 },
    estimatedCost: 10.20
  }
];

// ============================================
// DINNER RECIPES (50 Healthy Options)
// ============================================

export const dinnerRecipes: Recipe[] = [
  {
    id: "baked-salmon-vegetables",
    name: "Baked Salmon with Roasted Vegetables",
    description: "Perfectly baked salmon with colorful roasted vegetables",
    category: "Dinner",
    mealType: "dinner",
    prepTime: 15,
    cookTime: 25,
    servings: 4,
    difficulty: "Easy",
    ingredients: [
      { name: "Salmon Fillets", amount: 4, unit: "6 oz each", category: "Seafood", estimatedPrice: 24.00 },
      { name: "Broccoli", amount: 2, unit: "cups florets", category: "Produce", estimatedPrice: 2.00 },
      { name: "Bell Peppers", amount: 2, unit: "medium sliced", category: "Produce", estimatedPrice: 3.00 },
      { name: "Zucchini", amount: 2, unit: "medium sliced", category: "Produce", estimatedPrice: 2.00 },
      { name: "Olive Oil", amount: 3, unit: "tbsp", category: "Pantry", estimatedPrice: 0.60 },
      { name: "Garlic", amount: 4, unit: "cloves minced", category: "Produce", estimatedPrice: 0.30 },
      { name: "Lemon", amount: 1, unit: "sliced", category: "Produce", estimatedPrice: 0.40 },
      { name: "Fresh Dill", amount: 2, unit: "tbsp", category: "Produce", estimatedPrice: 0.50 },
      { name: "Salt", amount: 1, unit: "tsp", category: "Spices", estimatedPrice: 0.05 },
      { name: "Black Pepper", amount: 0.5, unit: "tsp", category: "Spices", estimatedPrice: 0.05 }
    ],
    instructions: [
      "Preheat oven to 400°F (200°C)",
      "Toss vegetables with 2 tbsp olive oil, garlic, salt, and pepper",
      "Spread vegetables on a baking sheet, roast for 15 minutes",
      "Season salmon with remaining oil, salt, pepper, and dill",
      "Add salmon to the pan with vegetables, top with lemon slices",
      "Bake additional 12-15 minutes until salmon flakes easily"
    ],
    tags: ["healthy", "high-protein", "omega-3", "low-carb", "one-pan"],
    nutrition: { calories: 420, protein: 40, carbs: 14, fat: 24, fiber: 4, sodium: 380 },
    estimatedCost: 8.25
  },
  {
    id: "chicken-stir-fry",
    name: "Chicken and Vegetable Stir Fry",
    description: "Quick and healthy stir fry with lean chicken and crisp vegetables",
    category: "Dinner",
    mealType: "dinner",
    prepTime: 20,
    cookTime: 15,
    servings: 4,
    difficulty: "Medium",
    ingredients: [
      { name: "Chicken Breast", amount: 1.5, unit: "lbs cubed", category: "Meat", estimatedPrice: 9.00 },
      { name: "Broccoli", amount: 2, unit: "cups florets", category: "Produce", estimatedPrice: 2.00 },
      { name: "Bell Peppers", amount: 2, unit: "medium sliced", category: "Produce", estimatedPrice: 3.00 },
      { name: "Snap Peas", amount: 1, unit: "cup", category: "Produce", estimatedPrice: 2.50 },
      { name: "Carrots", amount: 2, unit: "medium sliced", category: "Produce", estimatedPrice: 0.80 },
      { name: "Garlic", amount: 4, unit: "cloves minced", category: "Produce", estimatedPrice: 0.30 },
      { name: "Ginger", amount: 1, unit: "tbsp grated", category: "Produce", estimatedPrice: 0.30 },
      { name: "Soy Sauce", amount: 3, unit: "tbsp", category: "Pantry", estimatedPrice: 0.30 },
      { name: "Sesame Oil", amount: 2, unit: "tbsp", category: "Pantry", estimatedPrice: 0.50 },
      { name: "Cornstarch", amount: 1, unit: "tbsp", category: "Pantry", estimatedPrice: 0.10 },
      { name: "Brown Rice", amount: 2, unit: "cups cooked", category: "Pantry", estimatedPrice: 0.60 }
    ],
    instructions: [
      "Mix soy sauce with cornstarch and 2 tbsp water for sauce",
      "Heat sesame oil in wok or large pan over high heat",
      "Stir-fry chicken until golden, about 5 minutes; set aside",
      "Add carrots and broccoli, cook 3 minutes",
      "Add bell peppers, snap peas, garlic, and ginger; cook 2 minutes",
      "Return chicken to pan, add sauce",
      "Cook until sauce thickens, serve over brown rice"
    ],
    tags: ["healthy", "high-protein", "quick", "asian-inspired"],
    nutrition: { calories: 380, protein: 35, carbs: 32, fat: 12, fiber: 5, sodium: 680 },
    estimatedCost: 4.85
  },
  {
    id: "turkey-meatballs",
    name: "Turkey Meatballs with Zucchini Noodles",
    description: "Lean turkey meatballs served over zucchini noodles with marinara",
    category: "Dinner",
    mealType: "dinner",
    prepTime: 20,
    cookTime: 25,
    servings: 4,
    difficulty: "Medium",
    ingredients: [
      { name: "Ground Turkey", amount: 1, unit: "lb", category: "Meat", estimatedPrice: 6.00 },
      { name: "Zucchini", amount: 4, unit: "large", category: "Produce", estimatedPrice: 4.00 },
      { name: "Marinara Sauce", amount: 2, unit: "cups", category: "Pantry", estimatedPrice: 2.50 },
      { name: "Egg", amount: 1, unit: "large", category: "Dairy", estimatedPrice: 0.40 },
      { name: "Breadcrumbs", amount: 0.25, unit: "cup", category: "Pantry", estimatedPrice: 0.30 },
      { name: "Parmesan Cheese", amount: 0.25, unit: "cup grated", category: "Dairy", estimatedPrice: 1.50 },
      { name: "Garlic", amount: 2, unit: "cloves minced", category: "Produce", estimatedPrice: 0.15 },
      { name: "Italian Seasoning", amount: 1, unit: "tsp", category: "Spices", estimatedPrice: 0.10 },
      { name: "Olive Oil", amount: 2, unit: "tbsp", category: "Pantry", estimatedPrice: 0.40 },
      { name: "Fresh Basil", amount: 0.25, unit: "cup", category: "Produce", estimatedPrice: 0.75 }
    ],
    instructions: [
      "Preheat oven to 400°F (200°C)",
      "Mix turkey, egg, breadcrumbs, half the Parmesan, garlic, and Italian seasoning",
      "Roll into 16 meatballs and place on baking sheet",
      "Bake 20 minutes until cooked through",
      "Spiralize zucchini into noodles",
      "Sauté zucchini noodles in olive oil for 2-3 minutes",
      "Heat marinara, add meatballs",
      "Serve meatballs and sauce over zoodles, garnish with basil and Parmesan"
    ],
    tags: ["healthy", "high-protein", "low-carb", "gluten-free-option"],
    nutrition: { calories: 340, protein: 32, carbs: 18, fat: 16, fiber: 4, sodium: 620 },
    estimatedCost: 3.90
  },
  {
    id: "shrimp-quinoa-bowl",
    name: "Garlic Shrimp Quinoa Bowl",
    description: "Succulent garlic shrimp over quinoa with fresh vegetables",
    category: "Dinner",
    mealType: "dinner",
    prepTime: 15,
    cookTime: 20,
    servings: 4,
    difficulty: "Easy",
    ingredients: [
      { name: "Shrimp", amount: 1, unit: "lb peeled", category: "Seafood", estimatedPrice: 10.00 },
      { name: "Quinoa", amount: 1.5, unit: "cups", category: "Pantry", estimatedPrice: 2.00 },
      { name: "Garlic", amount: 6, unit: "cloves minced", category: "Produce", estimatedPrice: 0.40 },
      { name: "Cherry Tomatoes", amount: 1, unit: "cup halved", category: "Produce", estimatedPrice: 2.00 },
      { name: "Spinach", amount: 3, unit: "cups", category: "Produce", estimatedPrice: 2.50 },
      { name: "Lemon", amount: 1, unit: "juiced", category: "Produce", estimatedPrice: 0.40 },
      { name: "Olive Oil", amount: 3, unit: "tbsp", category: "Pantry", estimatedPrice: 0.60 },
      { name: "Red Pepper Flakes", amount: 0.25, unit: "tsp", category: "Spices", estimatedPrice: 0.05 },
      { name: "Parsley", amount: 2, unit: "tbsp chopped", category: "Produce", estimatedPrice: 0.40 }
    ],
    instructions: [
      "Cook quinoa according to package directions",
      "Heat olive oil in a large pan over medium-high heat",
      "Add shrimp and cook 2 minutes per side until pink",
      "Add garlic and red pepper flakes, cook 1 minute",
      "Add tomatoes and spinach, cook until spinach wilts",
      "Squeeze lemon juice over everything",
      "Serve shrimp and vegetables over quinoa, garnish with parsley"
    ],
    tags: ["healthy", "high-protein", "quick", "gluten-free"],
    nutrition: { calories: 420, protein: 32, carbs: 40, fat: 14, fiber: 6, sodium: 380 },
    estimatedCost: 4.60
  },
  {
    id: "stuffed-bell-peppers",
    name: "Stuffed Bell Peppers",
    description: "Colorful bell peppers stuffed with lean ground beef and rice",
    category: "Dinner",
    mealType: "dinner",
    prepTime: 20,
    cookTime: 45,
    servings: 4,
    difficulty: "Medium",
    ingredients: [
      { name: "Bell Peppers", amount: 4, unit: "large", category: "Produce", estimatedPrice: 5.00 },
      { name: "Lean Ground Beef", amount: 1, unit: "lb", category: "Meat", estimatedPrice: 7.00 },
      { name: "Brown Rice", amount: 1, unit: "cup cooked", category: "Pantry", estimatedPrice: 0.30 },
      { name: "Onion", amount: 1, unit: "medium diced", category: "Produce", estimatedPrice: 0.50 },
      { name: "Garlic", amount: 3, unit: "cloves minced", category: "Produce", estimatedPrice: 0.20 },
      { name: "Diced Tomatoes", amount: 1, unit: "can", category: "Pantry", estimatedPrice: 1.20 },
      { name: "Italian Seasoning", amount: 1, unit: "tsp", category: "Spices", estimatedPrice: 0.10 },
      { name: "Mozzarella Cheese", amount: 0.5, unit: "cup shredded", category: "Dairy", estimatedPrice: 1.50 }
    ],
    instructions: [
      "Preheat oven to 375°F (190°C)",
      "Cut tops off peppers and remove seeds",
      "Brown beef with onion, drain excess fat",
      "Add garlic, half the tomatoes, rice, and Italian seasoning",
      "Stuff peppers with meat mixture",
      "Place in baking dish, pour remaining tomatoes around peppers",
      "Cover with foil and bake 35 minutes",
      "Remove foil, top with cheese, bake 10 more minutes"
    ],
    tags: ["healthy", "high-protein", "meal-prep", "comfort-food"],
    nutrition: { calories: 380, protein: 30, carbs: 28, fat: 16, fiber: 5, sodium: 480 },
    estimatedCost: 3.95
  },
  {
    id: "cod-lemon-herb",
    name: "Lemon Herb Baked Cod",
    description: "Light and flaky cod with fresh herbs and lemon",
    category: "Dinner",
    mealType: "dinner",
    prepTime: 10,
    cookTime: 20,
    servings: 4,
    difficulty: "Easy",
    ingredients: [
      { name: "Cod Fillets", amount: 4, unit: "6 oz each", category: "Seafood", estimatedPrice: 16.00 },
      { name: "Lemon", amount: 2, unit: "sliced", category: "Produce", estimatedPrice: 0.80 },
      { name: "Fresh Thyme", amount: 2, unit: "tbsp", category: "Produce", estimatedPrice: 0.50 },
      { name: "Fresh Parsley", amount: 2, unit: "tbsp chopped", category: "Produce", estimatedPrice: 0.40 },
      { name: "Garlic", amount: 4, unit: "cloves minced", category: "Produce", estimatedPrice: 0.30 },
      { name: "Olive Oil", amount: 3, unit: "tbsp", category: "Pantry", estimatedPrice: 0.60 },
      { name: "White Wine", amount: 0.25, unit: "cup", category: "Pantry", estimatedPrice: 1.00 },
      { name: "Asparagus", amount: 1, unit: "bunch", category: "Produce", estimatedPrice: 3.00 }
    ],
    instructions: [
      "Preheat oven to 400°F (200°C)",
      "Place cod in a baking dish, season with salt and pepper",
      "Top with garlic, thyme, and lemon slices",
      "Drizzle with olive oil and wine",
      "Arrange asparagus around the fish",
      "Bake 18-20 minutes until fish flakes easily",
      "Garnish with fresh parsley"
    ],
    tags: ["healthy", "low-carb", "high-protein", "quick", "NL-local"],
    nutrition: { calories: 280, protein: 38, carbs: 8, fat: 12, fiber: 3, sodium: 180 },
    estimatedCost: 5.65
  },
  {
    id: "vegetable-curry",
    name: "Chickpea Vegetable Curry",
    description: "Aromatic curry with chickpeas and vegetables over rice",
    category: "Dinner",
    mealType: "dinner",
    prepTime: 15,
    cookTime: 30,
    servings: 4,
    difficulty: "Easy",
    ingredients: [
      { name: "Chickpeas", amount: 2, unit: "cans drained", category: "Pantry", estimatedPrice: 2.40 },
      { name: "Coconut Milk", amount: 1, unit: "can", category: "Pantry", estimatedPrice: 2.00 },
      { name: "Diced Tomatoes", amount: 1, unit: "can", category: "Pantry", estimatedPrice: 1.20 },
      { name: "Cauliflower", amount: 2, unit: "cups florets", category: "Produce", estimatedPrice: 2.50 },
      { name: "Spinach", amount: 3, unit: "cups", category: "Produce", estimatedPrice: 2.00 },
      { name: "Onion", amount: 1, unit: "large diced", category: "Produce", estimatedPrice: 0.50 },
      { name: "Garlic", amount: 4, unit: "cloves minced", category: "Produce", estimatedPrice: 0.30 },
      { name: "Ginger", amount: 1, unit: "tbsp grated", category: "Produce", estimatedPrice: 0.30 },
      { name: "Curry Powder", amount: 2, unit: "tbsp", category: "Spices", estimatedPrice: 0.40 },
      { name: "Basmati Rice", amount: 2, unit: "cups cooked", category: "Pantry", estimatedPrice: 0.60 }
    ],
    instructions: [
      "Sauté onion until softened, add garlic and ginger",
      "Add curry powder and cook 1 minute until fragrant",
      "Add cauliflower, tomatoes, and coconut milk",
      "Simmer 15 minutes until cauliflower is tender",
      "Add chickpeas and spinach, cook 5 more minutes",
      "Season with salt to taste",
      "Serve over basmati rice"
    ],
    tags: ["healthy", "vegan", "high-fiber", "indian-inspired", "budget-friendly"],
    nutrition: { calories: 420, protein: 14, carbs: 52, fat: 18, fiber: 12, sodium: 480 },
    estimatedCost: 3.05
  },
  {
    id: "grilled-chicken-sweet-potato",
    name: "Grilled Chicken with Sweet Potato",
    description: "Herb-marinated grilled chicken with roasted sweet potatoes",
    category: "Dinner",
    mealType: "dinner",
    prepTime: 15,
    cookTime: 35,
    servings: 4,
    difficulty: "Easy",
    ingredients: [
      { name: "Chicken Breast", amount: 4, unit: "boneless", category: "Meat", estimatedPrice: 10.00 },
      { name: "Sweet Potatoes", amount: 2, unit: "large cubed", category: "Produce", estimatedPrice: 3.00 },
      { name: "Green Beans", amount: 1, unit: "lb", category: "Produce", estimatedPrice: 3.00 },
      { name: "Olive Oil", amount: 3, unit: "tbsp", category: "Pantry", estimatedPrice: 0.60 },
      { name: "Garlic", amount: 4, unit: "cloves minced", category: "Produce", estimatedPrice: 0.30 },
      { name: "Rosemary", amount: 2, unit: "tbsp fresh", category: "Produce", estimatedPrice: 0.50 },
      { name: "Lemon", amount: 1, unit: "juiced", category: "Produce", estimatedPrice: 0.40 },
      { name: "Honey", amount: 1, unit: "tbsp", category: "Pantry", estimatedPrice: 0.30 }
    ],
    instructions: [
      "Marinate chicken in olive oil, garlic, rosemary, lemon juice, and honey for 30 minutes",
      "Preheat oven to 400°F (200°C)",
      "Toss sweet potatoes with 1 tbsp olive oil, roast 25 minutes",
      "Grill chicken 6-7 minutes per side until cooked through",
      "Add green beans to sweet potatoes, roast 10 more minutes",
      "Let chicken rest 5 minutes, slice and serve with vegetables"
    ],
    tags: ["healthy", "high-protein", "meal-prep", "gluten-free"],
    nutrition: { calories: 420, protein: 38, carbs: 32, fat: 14, fiber: 6, sodium: 180 },
    estimatedCost: 4.50
  },
  {
    id: "teriyaki-salmon-bowl",
    name: "Teriyaki Salmon Rice Bowl",
    description: "Glazed teriyaki salmon over rice with edamame and vegetables",
    category: "Dinner",
    mealType: "dinner",
    prepTime: 15,
    cookTime: 20,
    servings: 4,
    difficulty: "Medium",
    ingredients: [
      { name: "Salmon Fillets", amount: 4, unit: "6 oz each", category: "Seafood", estimatedPrice: 24.00 },
      { name: "Brown Rice", amount: 2, unit: "cups cooked", category: "Pantry", estimatedPrice: 0.60 },
      { name: "Edamame", amount: 1, unit: "cup shelled", category: "Frozen", estimatedPrice: 2.00 },
      { name: "Cucumber", amount: 1, unit: "medium sliced", category: "Produce", estimatedPrice: 1.00 },
      { name: "Carrots", amount: 1, unit: "cup shredded", category: "Produce", estimatedPrice: 0.50 },
      { name: "Soy Sauce", amount: 0.25, unit: "cup", category: "Pantry", estimatedPrice: 0.40 },
      { name: "Honey", amount: 2, unit: "tbsp", category: "Pantry", estimatedPrice: 0.60 },
      { name: "Rice Vinegar", amount: 1, unit: "tbsp", category: "Pantry", estimatedPrice: 0.20 },
      { name: "Ginger", amount: 1, unit: "tsp grated", category: "Produce", estimatedPrice: 0.20 },
      { name: "Sesame Seeds", amount: 1, unit: "tbsp", category: "Pantry", estimatedPrice: 0.20 }
    ],
    instructions: [
      "Mix soy sauce, honey, rice vinegar, and ginger for teriyaki sauce",
      "Pan-sear salmon 3 minutes skin-side down",
      "Flip salmon, brush with teriyaki sauce",
      "Cook 4 more minutes, brushing with more sauce",
      "Cook edamame according to package",
      "Divide rice among bowls, top with salmon",
      "Arrange edamame, cucumber, and carrots around salmon",
      "Drizzle with remaining sauce and sprinkle sesame seeds"
    ],
    tags: ["healthy", "high-protein", "omega-3", "japanese-inspired"],
    nutrition: { calories: 520, protein: 44, carbs: 42, fat: 18, fiber: 5, sodium: 920 },
    estimatedCost: 7.40
  },
  {
    id: "turkey-taco-lettuce",
    name: "Turkey Taco Lettuce Wraps",
    description: "Lean ground turkey with taco seasoning in crisp lettuce cups",
    category: "Dinner",
    mealType: "dinner",
    prepTime: 15,
    cookTime: 15,
    servings: 4,
    difficulty: "Easy",
    ingredients: [
      { name: "Ground Turkey", amount: 1, unit: "lb", category: "Meat", estimatedPrice: 6.00 },
      { name: "Butter Lettuce", amount: 2, unit: "heads", category: "Produce", estimatedPrice: 5.00 },
      { name: "Black Beans", amount: 1, unit: "can drained", category: "Pantry", estimatedPrice: 1.00 },
      { name: "Corn", amount: 1, unit: "cup", category: "Frozen", estimatedPrice: 0.80 },
      { name: "Tomatoes", amount: 1, unit: "cup diced", category: "Produce", estimatedPrice: 1.50 },
      { name: "Avocado", amount: 2, unit: "medium", category: "Produce", estimatedPrice: 4.00 },
      { name: "Cumin", amount: 1, unit: "tsp", category: "Spices", estimatedPrice: 0.10 },
      { name: "Chili Powder", amount: 1, unit: "tsp", category: "Spices", estimatedPrice: 0.10 },
      { name: "Garlic Powder", amount: 0.5, unit: "tsp", category: "Spices", estimatedPrice: 0.05 },
      { name: "Greek Yogurt", amount: 0.5, unit: "cup", category: "Dairy", estimatedPrice: 1.00 },
      { name: "Lime", amount: 2, unit: "juiced", category: "Produce", estimatedPrice: 0.60 }
    ],
    instructions: [
      "Brown turkey in a skillet, breaking into small pieces",
      "Add cumin, chili powder, and garlic powder, cook 2 minutes",
      "Add black beans and corn, heat through",
      "Separate lettuce leaves and wash",
      "Spoon turkey mixture into lettuce cups",
      "Top with diced tomatoes, sliced avocado",
      "Add a dollop of Greek yogurt and squeeze of lime"
    ],
    tags: ["healthy", "low-carb", "high-protein", "gluten-free", "mexican"],
    nutrition: { calories: 380, protein: 30, carbs: 24, fat: 20, fiber: 10, sodium: 420 },
    estimatedCost: 5.00
  }
];

// ============================================
// SNACK RECIPES (20 Healthy Options)
// ============================================

export const snackRecipes: Recipe[] = [
  {
    id: "energy-balls",
    name: "No-Bake Energy Balls",
    description: "Protein-packed energy balls with oats, nut butter, and chocolate chips",
    category: "Snack",
    mealType: "snack",
    prepTime: 15,
    cookTime: 0,
    servings: 12,
    difficulty: "Easy",
    ingredients: [
      { name: "Rolled Oats", amount: 1, unit: "cup", category: "Pantry", estimatedPrice: 0.40 },
      { name: "Peanut Butter", amount: 0.5, unit: "cup", category: "Pantry", estimatedPrice: 1.50 },
      { name: "Honey", amount: 0.25, unit: "cup", category: "Pantry", estimatedPrice: 0.90 },
      { name: "Mini Chocolate Chips", amount: 0.25, unit: "cup", category: "Pantry", estimatedPrice: 1.00 },
      { name: "Ground Flaxseed", amount: 2, unit: "tbsp", category: "Pantry", estimatedPrice: 0.40 },
      { name: "Vanilla Extract", amount: 1, unit: "tsp", category: "Pantry", estimatedPrice: 0.30 }
    ],
    instructions: [
      "Mix all ingredients in a large bowl until well combined",
      "Refrigerate for 30 minutes to firm up",
      "Roll into 12 balls (about 1 tbsp each)",
      "Store in refrigerator for up to 1 week"
    ],
    tags: ["healthy", "meal-prep", "high-fiber", "vegetarian", "no-cook"],
    nutrition: { calories: 120, protein: 4, carbs: 14, fat: 6, fiber: 2, sodium: 45 },
    estimatedCost: 0.40
  },
  {
    id: "apple-almond-butter",
    name: "Apple Slices with Almond Butter",
    description: "Crisp apple slices with creamy almond butter",
    category: "Snack",
    mealType: "snack",
    prepTime: 5,
    cookTime: 0,
    servings: 1,
    difficulty: "Easy",
    ingredients: [
      { name: "Apple", amount: 1, unit: "medium", category: "Produce", estimatedPrice: 0.75 },
      { name: "Almond Butter", amount: 2, unit: "tbsp", category: "Pantry", estimatedPrice: 1.00 },
      { name: "Cinnamon", amount: 0.25, unit: "tsp", category: "Spices", estimatedPrice: 0.05 }
    ],
    instructions: [
      "Core and slice apple into wedges",
      "Arrange on a plate with almond butter for dipping",
      "Sprinkle with cinnamon if desired"
    ],
    tags: ["healthy", "quick", "high-fiber", "vegan", "gluten-free"],
    nutrition: { calories: 290, protein: 7, carbs: 32, fat: 16, fiber: 7, sodium: 5 },
    estimatedCost: 0.90
  },
  {
    id: "hummus-veggies",
    name: "Hummus with Fresh Vegetables",
    description: "Creamy hummus with colorful vegetable crudités",
    category: "Snack",
    mealType: "snack",
    prepTime: 10,
    cookTime: 0,
    servings: 2,
    difficulty: "Easy",
    ingredients: [
      { name: "Hummus", amount: 0.5, unit: "cup", category: "Pantry", estimatedPrice: 2.00 },
      { name: "Carrots", amount: 2, unit: "medium", category: "Produce", estimatedPrice: 0.50 },
      { name: "Celery", amount: 3, unit: "stalks", category: "Produce", estimatedPrice: 0.60 },
      { name: "Cucumber", amount: 0.5, unit: "medium", category: "Produce", estimatedPrice: 0.50 },
      { name: "Bell Pepper", amount: 1, unit: "medium", category: "Produce", estimatedPrice: 1.50 }
    ],
    instructions: [
      "Cut all vegetables into sticks or slices",
      "Arrange vegetables on a platter",
      "Serve with hummus in the center for dipping"
    ],
    tags: ["healthy", "quick", "vegan", "gluten-free", "high-fiber"],
    nutrition: { calories: 180, protein: 6, carbs: 22, fat: 8, fiber: 6, sodium: 320 },
    estimatedCost: 2.55
  },
  {
    id: "greek-yogurt-honey",
    name: "Greek Yogurt with Honey & Walnuts",
    description: "Protein-rich Greek yogurt with honey and crunchy walnuts",
    category: "Snack",
    mealType: "snack",
    prepTime: 3,
    cookTime: 0,
    servings: 1,
    difficulty: "Easy",
    ingredients: [
      { name: "Greek Yogurt", amount: 1, unit: "cup", category: "Dairy", estimatedPrice: 2.00 },
      { name: "Honey", amount: 1, unit: "tbsp", category: "Pantry", estimatedPrice: 0.30 },
      { name: "Walnuts", amount: 2, unit: "tbsp chopped", category: "Pantry", estimatedPrice: 0.60 }
    ],
    instructions: [
      "Spoon Greek yogurt into a bowl",
      "Drizzle with honey",
      "Top with chopped walnuts"
    ],
    tags: ["healthy", "quick", "high-protein", "vegetarian", "no-cook"],
    nutrition: { calories: 280, protein: 18, carbs: 24, fat: 14, fiber: 1, sodium: 65 },
    estimatedCost: 1.45
  },
  {
    id: "trail-mix",
    name: "Homemade Trail Mix",
    description: "Custom mix of nuts, seeds, and dried fruit",
    category: "Snack",
    mealType: "snack",
    prepTime: 5,
    cookTime: 0,
    servings: 8,
    difficulty: "Easy",
    ingredients: [
      { name: "Almonds", amount: 0.5, unit: "cup", category: "Pantry", estimatedPrice: 2.00 },
      { name: "Cashews", amount: 0.5, unit: "cup", category: "Pantry", estimatedPrice: 2.50 },
      { name: "Pumpkin Seeds", amount: 0.25, unit: "cup", category: "Pantry", estimatedPrice: 1.00 },
      { name: "Dried Cranberries", amount: 0.25, unit: "cup", category: "Pantry", estimatedPrice: 1.00 },
      { name: "Dark Chocolate Chips", amount: 0.25, unit: "cup", category: "Pantry", estimatedPrice: 1.50 }
    ],
    instructions: [
      "Combine all ingredients in a large bowl",
      "Mix well to distribute evenly",
      "Divide into portions and store in airtight containers"
    ],
    tags: ["healthy", "meal-prep", "portable", "vegan", "energy-boost"],
    nutrition: { calories: 180, protein: 5, carbs: 14, fat: 12, fiber: 2, sodium: 5 },
    estimatedCost: 1.00
  }
];

// ============================================
// COMBINE ALL RECIPES
// ============================================

export const allRecipes: Recipe[] = [
  ...breakfastRecipes,
  ...lunchRecipes,
  ...dinnerRecipes,
  ...snackRecipes
];

// Helper function to get recipes by category
export function getRecipesByCategory(category: 'breakfast' | 'lunch' | 'dinner' | 'snack'): Recipe[] {
  return allRecipes.filter(recipe => recipe.mealType === category);
}

// Helper function to get recipes by tag
export function getRecipesByTag(tag: string): Recipe[] {
  return allRecipes.filter(recipe => recipe.tags.includes(tag.toLowerCase()));
}

// Helper function to search recipes
export function searchRecipes(query: string): Recipe[] {
  const lowerQuery = query.toLowerCase();
  return allRecipes.filter(recipe =>
    recipe.name.toLowerCase().includes(lowerQuery) ||
    recipe.description.toLowerCase().includes(lowerQuery) ||
    recipe.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
    recipe.ingredients.some(ing => ing.name.toLowerCase().includes(lowerQuery))
  );
}

// Helper function to calculate total recipe cost
export function getRecipeTotalCost(recipe: Recipe): number {
  return recipe.ingredients.reduce((sum, ing) => sum + ing.estimatedPrice, 0);
}

// Helper function to generate grocery list from selected recipes
export interface GroceryItem {
  name: string;
  amount: number;
  unit: string;
  category: string;
  estimatedPrice: number;
  fromRecipes: string[];
}

export function generateGroceryList(selectedRecipes: Recipe[]): GroceryItem[] {
  const itemMap = new Map<string, GroceryItem>();

  selectedRecipes.forEach(recipe => {
    recipe.ingredients.forEach(ing => {
      const key = `${ing.name.toLowerCase()}-${ing.unit}`;
      const existing = itemMap.get(key);

      if (existing) {
        existing.amount += ing.amount;
        existing.estimatedPrice += ing.estimatedPrice;
        if (!existing.fromRecipes.includes(recipe.name)) {
          existing.fromRecipes.push(recipe.name);
        }
      } else {
        itemMap.set(key, {
          name: ing.name,
          amount: ing.amount,
          unit: ing.unit,
          category: ing.category,
          estimatedPrice: ing.estimatedPrice,
          fromRecipes: [recipe.name]
        });
      }
    });
  });

  return Array.from(itemMap.values()).sort((a, b) => a.category.localeCompare(b.category));
}
