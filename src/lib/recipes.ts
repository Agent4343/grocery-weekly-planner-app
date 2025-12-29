// Comprehensive recipes database for meal planning

export interface RecipeIngredient {
  name: string;
  amount: number;
  unit: string;
  notes?: string;
  category: 'Produce' | 'Meat' | 'Seafood' | 'Dairy' | 'Pantry' | 'Frozen' | 'Bakery' | 'Spices';
  estimatedPrice?: number; // Estimated price in CAD
}

export interface Recipe {
  id: string;
  name: string;
  description: string;
  category: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack' | 'Dessert';
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  ingredients: RecipeIngredient[];
  instructions: string[];
  tags: string[];
  estimatedCost?: number; // Per serving in CAD
  imageUrl?: string;
}

export const recipes: Recipe[] = [
  // ============ BREAKFAST ============
  {
    id: "scrambled-eggs-toast",
    name: "Scrambled Eggs & Toast",
    description: "Quick and easy breakfast classic",
    category: "Breakfast",
    mealType: "breakfast",
    prepTime: 5,
    cookTime: 10,
    servings: 2,
    difficulty: "Easy",
    ingredients: [
      { name: "Eggs", amount: 4, unit: "large", category: "Dairy", estimatedPrice: 1.50 },
      { name: "Butter", amount: 2, unit: "tbsp", category: "Dairy", estimatedPrice: 0.30 },
      { name: "Bread", amount: 4, unit: "slices", category: "Bakery", estimatedPrice: 0.60 },
      { name: "Salt", amount: 0.25, unit: "tsp", category: "Spices" },
      { name: "Pepper", amount: 0.125, unit: "tsp", category: "Spices" }
    ],
    instructions: [
      "Crack eggs into bowl and whisk with salt and pepper",
      "Melt butter in non-stick pan over medium-low heat",
      "Pour in eggs and stir gently with spatula",
      "Toast bread while eggs cook",
      "Serve eggs over buttered toast"
    ],
    tags: ["quick", "easy", "budget-friendly", "kid-friendly"],
    estimatedCost: 1.20
  },
  {
    id: "oatmeal-berries",
    name: "Oatmeal with Berries",
    description: "Hearty oatmeal topped with fresh berries and honey",
    category: "Breakfast",
    mealType: "breakfast",
    prepTime: 2,
    cookTime: 5,
    servings: 2,
    difficulty: "Easy",
    ingredients: [
      { name: "Quick Oats", amount: 1, unit: "cup", category: "Pantry", estimatedPrice: 0.50 },
      { name: "Milk", amount: 2, unit: "cups", category: "Dairy", estimatedPrice: 0.80 },
      { name: "Blueberries", amount: 0.5, unit: "cup", category: "Produce", estimatedPrice: 2.00 },
      { name: "Honey", amount: 2, unit: "tbsp", category: "Pantry", estimatedPrice: 0.40 },
      { name: "Banana", amount: 1, unit: "medium", category: "Produce", estimatedPrice: 0.25 }
    ],
    instructions: [
      "Combine oats and milk in microwave-safe bowl",
      "Microwave on high for 2-3 minutes, stirring halfway",
      "Top with sliced banana and blueberries",
      "Drizzle with honey and serve"
    ],
    tags: ["quick", "healthy", "kid-friendly"],
    estimatedCost: 2.00
  },
  {
    id: "pancakes",
    name: "Fluffy Pancakes",
    description: "Classic homemade pancakes with maple syrup",
    category: "Breakfast",
    mealType: "breakfast",
    prepTime: 10,
    cookTime: 15,
    servings: 4,
    difficulty: "Easy",
    ingredients: [
      { name: "All-Purpose Flour", amount: 1.5, unit: "cups", category: "Pantry", estimatedPrice: 0.40 },
      { name: "Eggs", amount: 2, unit: "large", category: "Dairy", estimatedPrice: 0.75 },
      { name: "Milk", amount: 1.25, unit: "cups", category: "Dairy", estimatedPrice: 0.50 },
      { name: "Butter", amount: 3, unit: "tbsp", category: "Dairy", estimatedPrice: 0.45 },
      { name: "Sugar", amount: 2, unit: "tbsp", category: "Pantry", estimatedPrice: 0.10 },
      { name: "Baking Powder", amount: 2, unit: "tsp", category: "Pantry", estimatedPrice: 0.15 },
      { name: "Maple Syrup", amount: 0.5, unit: "cup", category: "Pantry", estimatedPrice: 2.00 }
    ],
    instructions: [
      "Mix flour, sugar, baking powder, and salt in large bowl",
      "Whisk together milk, eggs, and melted butter",
      "Pour wet ingredients into dry and stir until just combined",
      "Heat griddle or pan over medium heat, grease lightly",
      "Pour 1/4 cup batter per pancake",
      "Flip when bubbles form on surface, cook until golden",
      "Serve with butter and maple syrup"
    ],
    tags: ["weekend", "kid-friendly", "family-favorite"],
    estimatedCost: 1.10
  },

  // ============ LUNCH ============
  {
    id: "grilled-cheese",
    name: "Grilled Cheese Sandwich",
    description: "Golden crispy grilled cheese sandwich",
    category: "Lunch",
    mealType: "lunch",
    prepTime: 5,
    cookTime: 10,
    servings: 2,
    difficulty: "Easy",
    ingredients: [
      { name: "Bread", amount: 4, unit: "slices", category: "Bakery", estimatedPrice: 0.60 },
      { name: "Cheddar Cheese", amount: 4, unit: "slices", category: "Dairy", estimatedPrice: 1.50 },
      { name: "Butter", amount: 2, unit: "tbsp", category: "Dairy", estimatedPrice: 0.30 }
    ],
    instructions: [
      "Butter one side of each bread slice",
      "Place 2 slices butter-side down in pan over medium heat",
      "Top each with cheese slices",
      "Place remaining bread on top, butter-side up",
      "Cook until golden brown, about 3-4 minutes per side",
      "Slice and serve hot"
    ],
    tags: ["quick", "easy", "kid-friendly", "budget-friendly"],
    estimatedCost: 1.20
  },
  {
    id: "chicken-caesar-salad",
    name: "Chicken Caesar Salad",
    description: "Classic Caesar salad with grilled chicken",
    category: "Lunch",
    mealType: "lunch",
    prepTime: 15,
    cookTime: 15,
    servings: 4,
    difficulty: "Easy",
    ingredients: [
      { name: "Chicken Breast", amount: 1, unit: "lb", category: "Meat", estimatedPrice: 8.00 },
      { name: "Romaine Lettuce", amount: 2, unit: "heads", category: "Produce", estimatedPrice: 3.00 },
      { name: "Parmesan Cheese", amount: 0.5, unit: "cup", category: "Dairy", estimatedPrice: 2.00 },
      { name: "Caesar Dressing", amount: 0.5, unit: "cup", category: "Pantry", estimatedPrice: 2.50 },
      { name: "Croutons", amount: 1, unit: "cup", category: "Bakery", estimatedPrice: 1.50 },
      { name: "Lemon", amount: 1, unit: "medium", category: "Produce", estimatedPrice: 0.50 }
    ],
    instructions: [
      "Season chicken with salt and pepper",
      "Grill or pan-fry chicken until cooked through, about 6-7 minutes per side",
      "Let chicken rest, then slice into strips",
      "Chop romaine lettuce and place in large bowl",
      "Toss with Caesar dressing and croutons",
      "Top with sliced chicken and shaved Parmesan",
      "Squeeze lemon over top and serve"
    ],
    tags: ["healthy", "high-protein"],
    estimatedCost: 4.50
  },
  {
    id: "tomato-soup-sandwich",
    name: "Tomato Soup & Sandwich",
    description: "Comforting tomato soup with grilled cheese",
    category: "Lunch",
    mealType: "lunch",
    prepTime: 10,
    cookTime: 20,
    servings: 4,
    difficulty: "Easy",
    ingredients: [
      { name: "Canned Tomatoes", amount: 28, unit: "oz", category: "Pantry", estimatedPrice: 2.50 },
      { name: "Onion", amount: 1, unit: "medium", category: "Produce", estimatedPrice: 0.50 },
      { name: "Garlic", amount: 2, unit: "cloves", category: "Produce", estimatedPrice: 0.25 },
      { name: "Chicken Broth", amount: 2, unit: "cups", category: "Pantry", estimatedPrice: 1.50 },
      { name: "Bread", amount: 8, unit: "slices", category: "Bakery", estimatedPrice: 1.20 },
      { name: "Cheddar Cheese", amount: 8, unit: "slices", category: "Dairy", estimatedPrice: 3.00 },
      { name: "Butter", amount: 4, unit: "tbsp", category: "Dairy", estimatedPrice: 0.60 }
    ],
    instructions: [
      "Sauté diced onion in butter until soft",
      "Add minced garlic and cook 1 minute",
      "Add canned tomatoes and chicken broth",
      "Simmer for 15 minutes, then blend until smooth",
      "Season with salt, pepper, and a pinch of sugar",
      "Make grilled cheese sandwiches in separate pan",
      "Serve soup in bowls with grilled cheese on the side"
    ],
    tags: ["comfort-food", "kid-friendly", "family-favorite"],
    estimatedCost: 2.40
  },

  // ============ DINNER ============
  {
    id: "spaghetti-meat-sauce",
    name: "Spaghetti with Meat Sauce",
    description: "Classic spaghetti with homemade meat sauce",
    category: "Dinner",
    mealType: "dinner",
    prepTime: 15,
    cookTime: 30,
    servings: 6,
    difficulty: "Easy",
    ingredients: [
      { name: "Ground Beef", amount: 1, unit: "lb", category: "Meat", estimatedPrice: 8.00 },
      { name: "Spaghetti", amount: 1, unit: "lb", category: "Pantry", estimatedPrice: 2.00 },
      { name: "Marinara Sauce", amount: 24, unit: "oz", category: "Pantry", estimatedPrice: 3.50 },
      { name: "Onion", amount: 1, unit: "medium", category: "Produce", estimatedPrice: 0.50 },
      { name: "Garlic", amount: 3, unit: "cloves", category: "Produce", estimatedPrice: 0.30 },
      { name: "Parmesan Cheese", amount: 0.5, unit: "cup", category: "Dairy", estimatedPrice: 2.00 },
      { name: "Olive Oil", amount: 2, unit: "tbsp", category: "Pantry", estimatedPrice: 0.40 }
    ],
    instructions: [
      "Cook spaghetti according to package directions",
      "Brown ground beef in large skillet, drain fat",
      "Add diced onion and cook until soft",
      "Add minced garlic and cook 1 minute",
      "Pour in marinara sauce and simmer 15 minutes",
      "Season with salt, pepper, and Italian herbs",
      "Serve sauce over spaghetti with Parmesan"
    ],
    tags: ["family-favorite", "kid-friendly", "budget-friendly"],
    estimatedCost: 2.80
  },
  {
    id: "chicken-stir-fry",
    name: "Chicken Stir Fry",
    description: "Quick and healthy chicken vegetable stir fry",
    category: "Dinner",
    mealType: "dinner",
    prepTime: 15,
    cookTime: 15,
    servings: 4,
    difficulty: "Easy",
    ingredients: [
      { name: "Chicken Breast", amount: 1, unit: "lb", category: "Meat", estimatedPrice: 8.00 },
      { name: "Broccoli", amount: 2, unit: "cups", category: "Produce", estimatedPrice: 2.50 },
      { name: "Bell Pepper", amount: 2, unit: "medium", category: "Produce", estimatedPrice: 2.00 },
      { name: "Carrots", amount: 2, unit: "medium", category: "Produce", estimatedPrice: 0.50 },
      { name: "Soy Sauce", amount: 3, unit: "tbsp", category: "Pantry", estimatedPrice: 0.50 },
      { name: "Rice", amount: 2, unit: "cups", category: "Pantry", estimatedPrice: 1.00 },
      { name: "Vegetable Oil", amount: 2, unit: "tbsp", category: "Pantry", estimatedPrice: 0.30 },
      { name: "Garlic", amount: 3, unit: "cloves", category: "Produce", estimatedPrice: 0.30 },
      { name: "Ginger", amount: 1, unit: "inch", category: "Produce", estimatedPrice: 0.25 }
    ],
    instructions: [
      "Cook rice according to package directions",
      "Cut chicken into bite-sized pieces",
      "Heat oil in wok or large skillet over high heat",
      "Stir-fry chicken until cooked through, set aside",
      "Add vegetables and stir-fry 3-4 minutes until crisp-tender",
      "Add garlic, ginger, soy sauce and chicken back to pan",
      "Toss together and serve over rice"
    ],
    tags: ["healthy", "quick", "high-protein"],
    estimatedCost: 3.90
  },
  {
    id: "baked-salmon",
    name: "Baked Salmon with Vegetables",
    description: "Oven-baked salmon with roasted vegetables",
    category: "Dinner",
    mealType: "dinner",
    prepTime: 15,
    cookTime: 25,
    servings: 4,
    difficulty: "Easy",
    ingredients: [
      { name: "Salmon Fillets", amount: 4, unit: "6oz pieces", category: "Seafood", estimatedPrice: 16.00 },
      { name: "Asparagus", amount: 1, unit: "bunch", category: "Produce", estimatedPrice: 3.50 },
      { name: "Cherry Tomatoes", amount: 1, unit: "pint", category: "Produce", estimatedPrice: 3.00 },
      { name: "Lemon", amount: 2, unit: "medium", category: "Produce", estimatedPrice: 1.00 },
      { name: "Olive Oil", amount: 3, unit: "tbsp", category: "Pantry", estimatedPrice: 0.60 },
      { name: "Garlic", amount: 4, unit: "cloves", category: "Produce", estimatedPrice: 0.40 }
    ],
    instructions: [
      "Preheat oven to 400°F",
      "Arrange salmon on baking sheet, season with salt and pepper",
      "Toss asparagus and tomatoes with olive oil and garlic",
      "Arrange vegetables around salmon",
      "Squeeze lemon juice over everything",
      "Bake 15-20 minutes until salmon flakes easily",
      "Serve with lemon wedges"
    ],
    tags: ["healthy", "high-protein", "low-carb"],
    estimatedCost: 6.10
  },
  {
    id: "beef-tacos",
    name: "Ground Beef Tacos",
    description: "Classic tacos with seasoned ground beef",
    category: "Dinner",
    mealType: "dinner",
    prepTime: 10,
    cookTime: 15,
    servings: 4,
    difficulty: "Easy",
    ingredients: [
      { name: "Ground Beef", amount: 1, unit: "lb", category: "Meat", estimatedPrice: 8.00 },
      { name: "Taco Shells", amount: 12, unit: "shells", category: "Pantry", estimatedPrice: 3.50 },
      { name: "Lettuce", amount: 2, unit: "cups", category: "Produce", estimatedPrice: 1.50 },
      { name: "Tomatoes", amount: 2, unit: "medium", category: "Produce", estimatedPrice: 1.50 },
      { name: "Cheddar Cheese", amount: 1, unit: "cup shredded", category: "Dairy", estimatedPrice: 3.00 },
      { name: "Sour Cream", amount: 0.5, unit: "cup", category: "Dairy", estimatedPrice: 1.50 },
      { name: "Taco Seasoning", amount: 1, unit: "packet", category: "Spices", estimatedPrice: 1.50 },
      { name: "Salsa", amount: 1, unit: "cup", category: "Pantry", estimatedPrice: 2.50 }
    ],
    instructions: [
      "Brown ground beef in skillet, drain fat",
      "Add taco seasoning and water per package directions",
      "Simmer 5 minutes until thickened",
      "Warm taco shells in oven",
      "Shred lettuce and dice tomatoes",
      "Fill shells with meat, top with lettuce, cheese, tomatoes",
      "Add sour cream and salsa"
    ],
    tags: ["kid-friendly", "family-favorite", "quick"],
    estimatedCost: 5.80
  },
  {
    id: "sheet-pan-chicken",
    name: "Sheet Pan Chicken & Potatoes",
    description: "Easy one-pan roasted chicken with potatoes",
    category: "Dinner",
    mealType: "dinner",
    prepTime: 15,
    cookTime: 40,
    servings: 4,
    difficulty: "Easy",
    ingredients: [
      { name: "Chicken Thighs", amount: 8, unit: "pieces", category: "Meat", estimatedPrice: 7.00 },
      { name: "Potatoes", amount: 2, unit: "lbs", category: "Produce", estimatedPrice: 2.50 },
      { name: "Onion", amount: 1, unit: "large", category: "Produce", estimatedPrice: 0.60 },
      { name: "Olive Oil", amount: 3, unit: "tbsp", category: "Pantry", estimatedPrice: 0.60 },
      { name: "Garlic Powder", amount: 1, unit: "tsp", category: "Spices", estimatedPrice: 0.15 },
      { name: "Paprika", amount: 1, unit: "tsp", category: "Spices", estimatedPrice: 0.15 },
      { name: "Rosemary", amount: 2, unit: "sprigs", category: "Produce", estimatedPrice: 0.50 }
    ],
    instructions: [
      "Preheat oven to 425°F",
      "Cut potatoes into 1-inch cubes, slice onion",
      "Toss potatoes and onion with olive oil, salt, pepper",
      "Spread on sheet pan, place chicken thighs on top",
      "Season chicken with paprika, garlic powder, salt",
      "Add rosemary sprigs",
      "Roast 35-40 minutes until chicken is cooked through"
    ],
    tags: ["easy", "one-pan", "family-favorite"],
    estimatedCost: 2.90
  },
  {
    id: "beef-stew",
    name: "Hearty Beef Stew",
    description: "Slow-cooked beef stew with vegetables",
    category: "Dinner",
    mealType: "dinner",
    prepTime: 20,
    cookTime: 120,
    servings: 6,
    difficulty: "Medium",
    ingredients: [
      { name: "Beef Stew Meat", amount: 2, unit: "lbs", category: "Meat", estimatedPrice: 14.00 },
      { name: "Potatoes", amount: 1.5, unit: "lbs", category: "Produce", estimatedPrice: 2.00 },
      { name: "Carrots", amount: 1, unit: "lb", category: "Produce", estimatedPrice: 1.50 },
      { name: "Celery", amount: 3, unit: "stalks", category: "Produce", estimatedPrice: 0.75 },
      { name: "Onion", amount: 1, unit: "large", category: "Produce", estimatedPrice: 0.60 },
      { name: "Beef Broth", amount: 4, unit: "cups", category: "Pantry", estimatedPrice: 3.00 },
      { name: "Tomato Paste", amount: 2, unit: "tbsp", category: "Pantry", estimatedPrice: 0.50 },
      { name: "All-Purpose Flour", amount: 0.25, unit: "cup", category: "Pantry", estimatedPrice: 0.20 }
    ],
    instructions: [
      "Cut beef into 1-inch cubes, season with salt and pepper",
      "Coat beef with flour and brown in batches in large pot",
      "Remove beef, sauté onion and celery until soft",
      "Add tomato paste and cook 1 minute",
      "Return beef to pot, add broth and bay leaves",
      "Simmer covered for 1 hour",
      "Add potatoes and carrots, cook 45 more minutes",
      "Season to taste and serve"
    ],
    tags: ["comfort-food", "slow-cooked", "family-favorite"],
    estimatedCost: 3.80
  },
  {
    id: "baked-pork-chops",
    name: "Baked Pork Chops",
    description: "Juicy oven-baked pork chops with apple",
    category: "Dinner",
    mealType: "dinner",
    prepTime: 10,
    cookTime: 30,
    servings: 4,
    difficulty: "Easy",
    ingredients: [
      { name: "Pork Chops", amount: 4, unit: "bone-in", category: "Meat", estimatedPrice: 10.00 },
      { name: "Apples", amount: 2, unit: "medium", category: "Produce", estimatedPrice: 1.50 },
      { name: "Onion", amount: 1, unit: "medium", category: "Produce", estimatedPrice: 0.50 },
      { name: "Brown Sugar", amount: 2, unit: "tbsp", category: "Pantry", estimatedPrice: 0.20 },
      { name: "Olive Oil", amount: 2, unit: "tbsp", category: "Pantry", estimatedPrice: 0.40 },
      { name: "Thyme", amount: 1, unit: "tsp dried", category: "Spices", estimatedPrice: 0.15 }
    ],
    instructions: [
      "Preheat oven to 400°F",
      "Season pork chops with salt, pepper, and thyme",
      "Sear pork chops in oven-safe skillet until browned",
      "Slice apples and onion, toss with brown sugar",
      "Arrange around pork chops in skillet",
      "Bake 20-25 minutes until pork reaches 145°F",
      "Let rest 5 minutes before serving"
    ],
    tags: ["family-favorite", "fall-favorite"],
    estimatedCost: 3.20
  },
  {
    id: "mac-and-cheese",
    name: "Creamy Mac and Cheese",
    description: "Homemade creamy macaroni and cheese",
    category: "Dinner",
    mealType: "dinner",
    prepTime: 10,
    cookTime: 25,
    servings: 6,
    difficulty: "Easy",
    ingredients: [
      { name: "Elbow Macaroni", amount: 1, unit: "lb", category: "Pantry", estimatedPrice: 2.00 },
      { name: "Cheddar Cheese", amount: 3, unit: "cups shredded", category: "Dairy", estimatedPrice: 6.00 },
      { name: "Milk", amount: 2.5, unit: "cups", category: "Dairy", estimatedPrice: 1.00 },
      { name: "Butter", amount: 4, unit: "tbsp", category: "Dairy", estimatedPrice: 0.60 },
      { name: "All-Purpose Flour", amount: 0.25, unit: "cup", category: "Pantry", estimatedPrice: 0.15 },
      { name: "Mustard Powder", amount: 0.5, unit: "tsp", category: "Spices", estimatedPrice: 0.10 }
    ],
    instructions: [
      "Cook macaroni according to package directions, drain",
      "Melt butter in large saucepan over medium heat",
      "Whisk in flour and cook 1 minute",
      "Gradually whisk in milk until smooth",
      "Cook until thickened, stirring constantly",
      "Remove from heat, stir in cheese until melted",
      "Add mustard powder, salt, pepper",
      "Toss with cooked macaroni and serve"
    ],
    tags: ["comfort-food", "kid-friendly", "family-favorite"],
    estimatedCost: 1.65
  },
  {
    id: "chicken-fried-rice",
    name: "Chicken Fried Rice",
    description: "Quick fried rice with chicken and vegetables",
    category: "Dinner",
    mealType: "dinner",
    prepTime: 15,
    cookTime: 15,
    servings: 4,
    difficulty: "Easy",
    ingredients: [
      { name: "Rice", amount: 3, unit: "cups cooked", category: "Pantry", estimatedPrice: 0.75 },
      { name: "Chicken Breast", amount: 0.75, unit: "lb", category: "Meat", estimatedPrice: 6.00 },
      { name: "Eggs", amount: 3, unit: "large", category: "Dairy", estimatedPrice: 1.15 },
      { name: "Frozen Peas", amount: 1, unit: "cup", category: "Frozen", estimatedPrice: 1.00 },
      { name: "Carrots", amount: 2, unit: "medium diced", category: "Produce", estimatedPrice: 0.50 },
      { name: "Green Onions", amount: 4, unit: "stalks", category: "Produce", estimatedPrice: 0.75 },
      { name: "Soy Sauce", amount: 3, unit: "tbsp", category: "Pantry", estimatedPrice: 0.50 },
      { name: "Sesame Oil", amount: 1, unit: "tbsp", category: "Pantry", estimatedPrice: 0.30 }
    ],
    instructions: [
      "Cook and dice chicken, set aside",
      "Scramble eggs in wok, set aside",
      "Stir-fry carrots 2 minutes, add peas",
      "Add cold rice and stir-fry 3-4 minutes",
      "Add chicken, eggs, soy sauce, sesame oil",
      "Toss everything together",
      "Garnish with sliced green onions"
    ],
    tags: ["quick", "kid-friendly", "budget-friendly"],
    estimatedCost: 2.75
  },
  {
    id: "meatloaf",
    name: "Classic Meatloaf",
    description: "Traditional meatloaf with tangy glaze",
    category: "Dinner",
    mealType: "dinner",
    prepTime: 15,
    cookTime: 60,
    servings: 6,
    difficulty: "Easy",
    ingredients: [
      { name: "Ground Beef", amount: 2, unit: "lbs", category: "Meat", estimatedPrice: 16.00 },
      { name: "Bread Crumbs", amount: 1, unit: "cup", category: "Pantry", estimatedPrice: 1.50 },
      { name: "Eggs", amount: 2, unit: "large", category: "Dairy", estimatedPrice: 0.75 },
      { name: "Onion", amount: 1, unit: "medium diced", category: "Produce", estimatedPrice: 0.50 },
      { name: "Milk", amount: 0.5, unit: "cup", category: "Dairy", estimatedPrice: 0.20 },
      { name: "Ketchup", amount: 0.5, unit: "cup", category: "Pantry", estimatedPrice: 0.75 },
      { name: "Brown Sugar", amount: 2, unit: "tbsp", category: "Pantry", estimatedPrice: 0.15 },
      { name: "Mustard", amount: 1, unit: "tbsp", category: "Pantry", estimatedPrice: 0.10 }
    ],
    instructions: [
      "Preheat oven to 350°F",
      "Mix beef, bread crumbs, eggs, onion, milk, salt, pepper",
      "Shape into loaf in baking pan",
      "Mix ketchup, brown sugar, and mustard for glaze",
      "Spread half the glaze on top of meatloaf",
      "Bake 45 minutes, add remaining glaze",
      "Bake 15 more minutes until cooked through",
      "Let rest 10 minutes before slicing"
    ],
    tags: ["comfort-food", "family-favorite", "kid-friendly"],
    estimatedCost: 3.30
  },
  {
    id: "fish-and-chips",
    name: "Fish and Chips",
    description: "Crispy battered fish with thick-cut fries",
    category: "Dinner",
    mealType: "dinner",
    prepTime: 20,
    cookTime: 25,
    servings: 4,
    difficulty: "Medium",
    ingredients: [
      { name: "Cod Fillets", amount: 1.5, unit: "lbs", category: "Seafood", estimatedPrice: 15.00 },
      { name: "Potatoes", amount: 2, unit: "lbs", category: "Produce", estimatedPrice: 2.50 },
      { name: "All-Purpose Flour", amount: 1.5, unit: "cups", category: "Pantry", estimatedPrice: 0.40 },
      { name: "Beer", amount: 1, unit: "cup", category: "Pantry", estimatedPrice: 2.00 },
      { name: "Vegetable Oil", amount: 4, unit: "cups for frying", category: "Pantry", estimatedPrice: 4.00 },
      { name: "Eggs", amount: 1, unit: "large", category: "Dairy", estimatedPrice: 0.40 },
      { name: "Lemon", amount: 1, unit: "medium", category: "Produce", estimatedPrice: 0.50 }
    ],
    instructions: [
      "Cut potatoes into thick fries, soak in cold water 30 mins",
      "Heat oil to 350°F for first fry",
      "Par-cook fries 5 minutes, drain on paper towels",
      "Mix flour, beer, egg, and salt into batter",
      "Pat fish dry, dip in batter",
      "Fry fish 5-6 minutes until golden, drain",
      "Raise oil to 375°F, fry chips again until crispy",
      "Serve with malt vinegar and lemon"
    ],
    tags: ["traditional", "comfort-food", "seafood"],
    estimatedCost: 6.20
  },
  {
    id: "shepherd-pie",
    name: "Shepherd's Pie",
    description: "Classic meat pie topped with mashed potatoes",
    category: "Dinner",
    mealType: "dinner",
    prepTime: 25,
    cookTime: 40,
    servings: 6,
    difficulty: "Medium",
    ingredients: [
      { name: "Ground Beef", amount: 1.5, unit: "lbs", category: "Meat", estimatedPrice: 12.00 },
      { name: "Potatoes", amount: 2, unit: "lbs", category: "Produce", estimatedPrice: 2.50 },
      { name: "Carrots", amount: 2, unit: "medium diced", category: "Produce", estimatedPrice: 0.50 },
      { name: "Frozen Peas", amount: 1, unit: "cup", category: "Frozen", estimatedPrice: 1.00 },
      { name: "Onion", amount: 1, unit: "medium", category: "Produce", estimatedPrice: 0.50 },
      { name: "Beef Broth", amount: 1, unit: "cup", category: "Pantry", estimatedPrice: 0.75 },
      { name: "Butter", amount: 4, unit: "tbsp", category: "Dairy", estimatedPrice: 0.60 },
      { name: "Milk", amount: 0.5, unit: "cup", category: "Dairy", estimatedPrice: 0.20 }
    ],
    instructions: [
      "Boil and mash potatoes with butter and milk",
      "Brown ground beef, drain fat",
      "Add onion and carrots, cook 5 minutes",
      "Add peas, broth, and seasonings, simmer 10 minutes",
      "Transfer meat mixture to baking dish",
      "Spread mashed potatoes on top",
      "Bake at 400°F for 25-30 minutes until golden"
    ],
    tags: ["comfort-food", "family-favorite", "one-dish"],
    estimatedCost: 3.00
  },
  {
    id: "jiggs-dinner",
    name: "Traditional Jiggs Dinner",
    description: "Classic Newfoundland Sunday dinner",
    category: "Dinner",
    mealType: "dinner",
    prepTime: 30,
    cookTime: 180,
    servings: 6,
    difficulty: "Medium",
    ingredients: [
      { name: "Salt Beef", amount: 2, unit: "lbs", category: "Meat", estimatedPrice: 18.00 },
      { name: "Cabbage", amount: 1, unit: "head", category: "Produce", estimatedPrice: 2.50 },
      { name: "Turnip", amount: 1, unit: "medium", category: "Produce", estimatedPrice: 2.00 },
      { name: "Carrots", amount: 1, unit: "lb", category: "Produce", estimatedPrice: 1.50 },
      { name: "Potatoes", amount: 2, unit: "lbs", category: "Produce", estimatedPrice: 2.50 },
      { name: "Pease Pudding", amount: 1, unit: "bag split peas", category: "Pantry", estimatedPrice: 3.00 }
    ],
    instructions: [
      "Soak salt beef overnight in cold water",
      "Place beef in large pot, cover with fresh water",
      "Boil then simmer for 1.5 hours",
      "Add turnip and carrots, cook 30 minutes",
      "Add potatoes, cook 15 minutes",
      "Add cabbage wedges, cook 15 minutes",
      "Serve with pease pudding and mustard pickles"
    ],
    tags: ["traditional", "newfoundland", "sunday-dinner"],
    estimatedCost: 5.00
  },
  {
    id: "chicken-alfredo",
    name: "Chicken Alfredo Pasta",
    description: "Creamy Alfredo pasta with grilled chicken",
    category: "Dinner",
    mealType: "dinner",
    prepTime: 15,
    cookTime: 20,
    servings: 4,
    difficulty: "Easy",
    ingredients: [
      { name: "Fettuccine", amount: 1, unit: "lb", category: "Pantry", estimatedPrice: 2.50 },
      { name: "Chicken Breast", amount: 1, unit: "lb", category: "Meat", estimatedPrice: 8.00 },
      { name: "Heavy Cream", amount: 2, unit: "cups", category: "Dairy", estimatedPrice: 4.00 },
      { name: "Parmesan Cheese", amount: 1, unit: "cup grated", category: "Dairy", estimatedPrice: 4.00 },
      { name: "Butter", amount: 4, unit: "tbsp", category: "Dairy", estimatedPrice: 0.60 },
      { name: "Garlic", amount: 4, unit: "cloves", category: "Produce", estimatedPrice: 0.40 }
    ],
    instructions: [
      "Cook pasta according to package directions",
      "Season and grill chicken, slice into strips",
      "Melt butter in large pan, sauté garlic 1 minute",
      "Add heavy cream and bring to simmer",
      "Stir in Parmesan until melted and smooth",
      "Toss pasta with sauce",
      "Top with sliced chicken and more Parmesan"
    ],
    tags: ["comfort-food", "date-night", "family-favorite"],
    estimatedCost: 4.90
  },
  {
    id: "cod-cakes",
    name: "Newfoundland Cod Cakes",
    description: "Pan-fried cod and potato cakes",
    category: "Dinner",
    mealType: "dinner",
    prepTime: 25,
    cookTime: 15,
    servings: 4,
    difficulty: "Easy",
    ingredients: [
      { name: "Cod Fillets", amount: 1, unit: "lb", category: "Seafood", estimatedPrice: 10.00 },
      { name: "Potatoes", amount: 2, unit: "lbs", category: "Produce", estimatedPrice: 2.50 },
      { name: "Onion", amount: 1, unit: "small diced", category: "Produce", estimatedPrice: 0.40 },
      { name: "Eggs", amount: 2, unit: "large", category: "Dairy", estimatedPrice: 0.75 },
      { name: "All-Purpose Flour", amount: 0.5, unit: "cup", category: "Pantry", estimatedPrice: 0.15 },
      { name: "Butter", amount: 4, unit: "tbsp", category: "Dairy", estimatedPrice: 0.60 }
    ],
    instructions: [
      "Boil and mash potatoes",
      "Poach cod until flaky, then flake into bowl",
      "Mix cod, mashed potatoes, onion, 1 egg",
      "Season with salt and pepper",
      "Form into patties, dip in beaten egg then flour",
      "Pan fry in butter until golden on each side",
      "Serve with tartar sauce"
    ],
    tags: ["traditional", "newfoundland", "seafood"],
    estimatedCost: 3.60
  },
  {
    id: "bbq-chicken",
    name: "BBQ Chicken Drumsticks",
    description: "Oven-baked BBQ chicken drumsticks",
    category: "Dinner",
    mealType: "dinner",
    prepTime: 10,
    cookTime: 45,
    servings: 4,
    difficulty: "Easy",
    ingredients: [
      { name: "Chicken Drumsticks", amount: 8, unit: "pieces", category: "Meat", estimatedPrice: 6.00 },
      { name: "BBQ Sauce", amount: 1, unit: "cup", category: "Pantry", estimatedPrice: 3.00 },
      { name: "Olive Oil", amount: 2, unit: "tbsp", category: "Pantry", estimatedPrice: 0.40 },
      { name: "Garlic Powder", amount: 1, unit: "tsp", category: "Spices", estimatedPrice: 0.15 },
      { name: "Paprika", amount: 1, unit: "tsp", category: "Spices", estimatedPrice: 0.15 }
    ],
    instructions: [
      "Preheat oven to 400°F",
      "Pat drumsticks dry, coat with olive oil",
      "Season with garlic powder, paprika, salt, pepper",
      "Arrange on baking sheet",
      "Bake 25 minutes, then brush with BBQ sauce",
      "Bake 15-20 more minutes until cooked through",
      "Brush with more sauce before serving"
    ],
    tags: ["kid-friendly", "budget-friendly", "easy"],
    estimatedCost: 2.45
  },
  {
    id: "veggie-pasta",
    name: "Vegetable Pasta Primavera",
    description: "Light pasta with fresh seasonal vegetables",
    category: "Dinner",
    mealType: "dinner",
    prepTime: 15,
    cookTime: 20,
    servings: 4,
    difficulty: "Easy",
    ingredients: [
      { name: "Penne Pasta", amount: 1, unit: "lb", category: "Pantry", estimatedPrice: 2.00 },
      { name: "Zucchini", amount: 2, unit: "medium", category: "Produce", estimatedPrice: 2.00 },
      { name: "Bell Peppers", amount: 2, unit: "medium", category: "Produce", estimatedPrice: 2.00 },
      { name: "Cherry Tomatoes", amount: 1, unit: "pint", category: "Produce", estimatedPrice: 3.00 },
      { name: "Garlic", amount: 4, unit: "cloves", category: "Produce", estimatedPrice: 0.40 },
      { name: "Olive Oil", amount: 3, unit: "tbsp", category: "Pantry", estimatedPrice: 0.60 },
      { name: "Parmesan Cheese", amount: 0.5, unit: "cup", category: "Dairy", estimatedPrice: 2.00 },
      { name: "Fresh Basil", amount: 0.25, unit: "cup", category: "Produce", estimatedPrice: 1.50 }
    ],
    instructions: [
      "Cook pasta according to package directions",
      "Slice zucchini and peppers, halve tomatoes",
      "Sauté garlic in olive oil 1 minute",
      "Add zucchini and peppers, cook 5 minutes",
      "Add tomatoes, cook 3 more minutes",
      "Toss vegetables with pasta and cooking water",
      "Top with Parmesan and fresh basil"
    ],
    tags: ["vegetarian", "healthy", "light"],
    estimatedCost: 3.40
  },
  {
    id: "chili",
    name: "Beef Chili",
    description: "Hearty beef chili with beans",
    category: "Dinner",
    mealType: "dinner",
    prepTime: 15,
    cookTime: 45,
    servings: 6,
    difficulty: "Easy",
    ingredients: [
      { name: "Ground Beef", amount: 1.5, unit: "lbs", category: "Meat", estimatedPrice: 12.00 },
      { name: "Kidney Beans", amount: 2, unit: "cans", category: "Pantry", estimatedPrice: 3.00 },
      { name: "Diced Tomatoes", amount: 28, unit: "oz can", category: "Pantry", estimatedPrice: 2.50 },
      { name: "Onion", amount: 1, unit: "large", category: "Produce", estimatedPrice: 0.60 },
      { name: "Bell Pepper", amount: 1, unit: "medium", category: "Produce", estimatedPrice: 1.00 },
      { name: "Chili Powder", amount: 2, unit: "tbsp", category: "Spices", estimatedPrice: 0.50 },
      { name: "Cumin", amount: 1, unit: "tsp", category: "Spices", estimatedPrice: 0.20 },
      { name: "Cheddar Cheese", amount: 1, unit: "cup shredded", category: "Dairy", estimatedPrice: 3.00 }
    ],
    instructions: [
      "Brown ground beef in large pot, drain fat",
      "Add diced onion and pepper, cook 5 minutes",
      "Add chili powder, cumin, salt, garlic powder",
      "Pour in tomatoes and beans with liquid",
      "Bring to boil, then simmer 30-40 minutes",
      "Serve with shredded cheese, sour cream"
    ],
    tags: ["comfort-food", "make-ahead", "freezer-friendly"],
    estimatedCost: 3.80
  },
  {
    id: "baked-ziti",
    name: "Baked Ziti",
    description: "Cheesy baked pasta with meat sauce",
    category: "Dinner",
    mealType: "dinner",
    prepTime: 20,
    cookTime: 35,
    servings: 8,
    difficulty: "Easy",
    ingredients: [
      { name: "Ziti Pasta", amount: 1, unit: "lb", category: "Pantry", estimatedPrice: 2.00 },
      { name: "Ground Beef", amount: 1, unit: "lb", category: "Meat", estimatedPrice: 8.00 },
      { name: "Marinara Sauce", amount: 32, unit: "oz", category: "Pantry", estimatedPrice: 4.00 },
      { name: "Ricotta Cheese", amount: 15, unit: "oz", category: "Dairy", estimatedPrice: 5.00 },
      { name: "Mozzarella Cheese", amount: 2, unit: "cups shredded", category: "Dairy", estimatedPrice: 4.00 },
      { name: "Parmesan Cheese", amount: 0.5, unit: "cup", category: "Dairy", estimatedPrice: 2.00 },
      { name: "Eggs", amount: 1, unit: "large", category: "Dairy", estimatedPrice: 0.40 }
    ],
    instructions: [
      "Preheat oven to 375°F",
      "Cook pasta until almost done, drain",
      "Brown beef, add marinara, simmer 10 minutes",
      "Mix ricotta with egg and half the mozzarella",
      "Layer: pasta, meat sauce, ricotta mixture",
      "Repeat layers, top with remaining cheese",
      "Bake 25-30 minutes until bubbly"
    ],
    tags: ["family-favorite", "make-ahead", "freezer-friendly"],
    estimatedCost: 3.20
  }
];

// Helper functions
export const getRecipesByMealType = (mealType: string): Recipe[] => {
  return recipes.filter(r => r.mealType === mealType);
};

export const getRecipesByTag = (tag: string): Recipe[] => {
  return recipes.filter(r => r.tags.includes(tag));
};

export const getRecipeById = (id: string): Recipe | undefined => {
  return recipes.find(r => r.id === id);
};

export const searchRecipes = (query: string): Recipe[] => {
  const q = query.toLowerCase();
  return recipes.filter(r =>
    r.name.toLowerCase().includes(q) ||
    r.description.toLowerCase().includes(q) ||
    r.tags.some(t => t.includes(q))
  );
};

export const getQuickRecipes = (maxMinutes: number = 30): Recipe[] => {
  return recipes.filter(r => (r.prepTime + r.cookTime) <= maxMinutes);
};

export const getBudgetRecipes = (maxCostPerServing: number = 3): Recipe[] => {
  return recipes.filter(r => (r.estimatedCost || 0) <= maxCostPerServing);
};

// Calculate total cost for a recipe
export const getRecipeTotalCost = (recipe: Recipe): number => {
  return recipe.ingredients.reduce((sum, ing) => sum + (ing.estimatedPrice || 0), 0);
};

// Get grocery list from selected recipes
export interface GroceryItem {
  name: string;
  amount: number;
  unit: string;
  category: string;
  estimatedPrice: number;
  fromRecipes: string[];
}

export const generateGroceryList = (selectedRecipes: Recipe[]): GroceryItem[] => {
  const itemMap = new Map<string, GroceryItem>();

  selectedRecipes.forEach(recipe => {
    recipe.ingredients.forEach(ing => {
      const key = `${ing.name}-${ing.unit}`.toLowerCase();
      const existing = itemMap.get(key);

      if (existing) {
        existing.amount += ing.amount;
        existing.estimatedPrice += ing.estimatedPrice || 0;
        if (!existing.fromRecipes.includes(recipe.name)) {
          existing.fromRecipes.push(recipe.name);
        }
      } else {
        itemMap.set(key, {
          name: ing.name,
          amount: ing.amount,
          unit: ing.unit,
          category: ing.category,
          estimatedPrice: ing.estimatedPrice || 0,
          fromRecipes: [recipe.name]
        });
      }
    });
  });

  return Array.from(itemMap.values()).sort((a, b) => a.category.localeCompare(b.category));
};
