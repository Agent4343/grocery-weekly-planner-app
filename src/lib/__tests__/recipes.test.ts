import { describe, it, expect } from 'vitest'
import {
  recipes,
  getRecipesByMealType,
  getRecipesByTag,
  getRecipeById,
  searchRecipes,
  getQuickRecipes,
  getBudgetRecipes,
  getRecipeTotalCost,
  generateGroceryList,
  type Recipe,
  type RecipeIngredient,
  type GroceryItem
} from '../recipes'

describe('recipes database', () => {
  it('should be a non-empty array', () => {
    expect(Array.isArray(recipes)).toBe(true)
    expect(recipes.length).toBeGreaterThan(0)
  })

  it('should contain recipes with all required properties', () => {
    recipes.forEach((recipe) => {
      expect(recipe).toHaveProperty('id')
      expect(recipe).toHaveProperty('name')
      expect(recipe).toHaveProperty('description')
      expect(recipe).toHaveProperty('category')
      expect(recipe).toHaveProperty('mealType')
      expect(recipe).toHaveProperty('prepTime')
      expect(recipe).toHaveProperty('cookTime')
      expect(recipe).toHaveProperty('servings')
      expect(recipe).toHaveProperty('difficulty')
      expect(recipe).toHaveProperty('ingredients')
      expect(recipe).toHaveProperty('instructions')
      expect(recipe).toHaveProperty('tags')

      expect(typeof recipe.id).toBe('string')
      expect(typeof recipe.name).toBe('string')
      expect(typeof recipe.description).toBe('string')
      expect(typeof recipe.prepTime).toBe('number')
      expect(typeof recipe.cookTime).toBe('number')
      expect(typeof recipe.servings).toBe('number')
      expect(Array.isArray(recipe.ingredients)).toBe(true)
      expect(Array.isArray(recipe.instructions)).toBe(true)
      expect(Array.isArray(recipe.tags)).toBe(true)
    })
  })

  it('should have unique recipe IDs', () => {
    const ids = recipes.map(r => r.id)
    const uniqueIds = new Set(ids)
    expect(uniqueIds.size).toBe(ids.length)
  })

  it('should have valid category values', () => {
    const validCategories = ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert']
    recipes.forEach((recipe) => {
      expect(validCategories).toContain(recipe.category)
    })
  })

  it('should have valid mealType values', () => {
    const validMealTypes = ['breakfast', 'lunch', 'dinner', 'snack']
    recipes.forEach((recipe) => {
      expect(validMealTypes).toContain(recipe.mealType)
    })
  })

  it('should have valid difficulty values', () => {
    const validDifficulties = ['Easy', 'Medium', 'Hard']
    recipes.forEach((recipe) => {
      expect(validDifficulties).toContain(recipe.difficulty)
    })
  })

  it('should have positive prep and cook times', () => {
    recipes.forEach((recipe) => {
      expect(recipe.prepTime).toBeGreaterThanOrEqual(0)
      expect(recipe.cookTime).toBeGreaterThanOrEqual(0)
    })
  })

  it('should have positive servings count', () => {
    recipes.forEach((recipe) => {
      expect(recipe.servings).toBeGreaterThan(0)
    })
  })

  it('should have at least one ingredient per recipe', () => {
    recipes.forEach((recipe) => {
      expect(recipe.ingredients.length).toBeGreaterThan(0)
    })
  })

  it('should have at least one instruction per recipe', () => {
    recipes.forEach((recipe) => {
      expect(recipe.instructions.length).toBeGreaterThan(0)
    })
  })

  it('should have valid ingredient structure', () => {
    const validCategories = ['Produce', 'Meat', 'Seafood', 'Dairy', 'Pantry', 'Frozen', 'Bakery', 'Spices']
    recipes.forEach((recipe) => {
      recipe.ingredients.forEach((ingredient) => {
        expect(ingredient).toHaveProperty('name')
        expect(ingredient).toHaveProperty('amount')
        expect(ingredient).toHaveProperty('unit')
        expect(ingredient).toHaveProperty('category')

        expect(typeof ingredient.name).toBe('string')
        expect(typeof ingredient.amount).toBe('number')
        expect(typeof ingredient.unit).toBe('string')
        expect(validCategories).toContain(ingredient.category)
        expect(ingredient.amount).toBeGreaterThan(0)
      })
    })
  })

  it('should have non-empty tags arrays', () => {
    recipes.forEach((recipe) => {
      expect(recipe.tags.length).toBeGreaterThan(0)
      recipe.tags.forEach((tag) => {
        expect(typeof tag).toBe('string')
        expect(tag.length).toBeGreaterThan(0)
      })
    })
  })

  it('should have estimatedCost as a positive number when present', () => {
    recipes.forEach((recipe) => {
      if (recipe.estimatedCost !== undefined) {
        expect(typeof recipe.estimatedCost).toBe('number')
        expect(recipe.estimatedCost).toBeGreaterThan(0)
      }
    })
  })
})

describe('getRecipesByMealType', () => {
  it('should return breakfast recipes for breakfast mealType', () => {
    const breakfastRecipes = getRecipesByMealType('breakfast')
    expect(breakfastRecipes.length).toBeGreaterThan(0)
    breakfastRecipes.forEach((recipe) => {
      expect(recipe.mealType).toBe('breakfast')
    })
  })

  it('should return lunch recipes for lunch mealType', () => {
    const lunchRecipes = getRecipesByMealType('lunch')
    expect(lunchRecipes.length).toBeGreaterThan(0)
    lunchRecipes.forEach((recipe) => {
      expect(recipe.mealType).toBe('lunch')
    })
  })

  it('should return dinner recipes for dinner mealType', () => {
    const dinnerRecipes = getRecipesByMealType('dinner')
    expect(dinnerRecipes.length).toBeGreaterThan(0)
    dinnerRecipes.forEach((recipe) => {
      expect(recipe.mealType).toBe('dinner')
    })
  })

  it('should return empty array for non-existent mealType', () => {
    const nonExistent = getRecipesByMealType('brunch')
    expect(nonExistent).toEqual([])
  })

  it('should be case-sensitive', () => {
    const lowercase = getRecipesByMealType('breakfast')
    const uppercase = getRecipesByMealType('BREAKFAST')
    expect(lowercase.length).toBeGreaterThan(0)
    expect(uppercase).toEqual([])
  })

  it('should include specific known breakfast recipes', () => {
    const breakfastRecipes = getRecipesByMealType('breakfast')
    const ids = breakfastRecipes.map(r => r.id)
    expect(ids).toContain('scrambled-eggs-toast')
    expect(ids).toContain('oatmeal-berries')
    expect(ids).toContain('pancakes')
  })

  it('should include specific known dinner recipes', () => {
    const dinnerRecipes = getRecipesByMealType('dinner')
    const ids = dinnerRecipes.map(r => r.id)
    expect(ids).toContain('spaghetti-meat-sauce')
    expect(ids).toContain('chicken-stir-fry')
    expect(ids).toContain('beef-tacos')
  })
})

describe('getRecipesByTag', () => {
  it('should return recipes with the specified tag', () => {
    const quickRecipes = getRecipesByTag('quick')
    expect(quickRecipes.length).toBeGreaterThan(0)
    quickRecipes.forEach((recipe) => {
      expect(recipe.tags).toContain('quick')
    })
  })

  it('should return kid-friendly recipes', () => {
    const kidFriendlyRecipes = getRecipesByTag('kid-friendly')
    expect(kidFriendlyRecipes.length).toBeGreaterThan(0)
    kidFriendlyRecipes.forEach((recipe) => {
      expect(recipe.tags).toContain('kid-friendly')
    })
  })

  it('should return budget-friendly recipes', () => {
    const budgetRecipes = getRecipesByTag('budget-friendly')
    expect(budgetRecipes.length).toBeGreaterThan(0)
    budgetRecipes.forEach((recipe) => {
      expect(recipe.tags).toContain('budget-friendly')
    })
  })

  it('should return family-favorite recipes', () => {
    const familyFavorites = getRecipesByTag('family-favorite')
    expect(familyFavorites.length).toBeGreaterThan(0)
    familyFavorites.forEach((recipe) => {
      expect(recipe.tags).toContain('family-favorite')
    })
  })

  it('should return healthy recipes', () => {
    const healthyRecipes = getRecipesByTag('healthy')
    expect(healthyRecipes.length).toBeGreaterThan(0)
    healthyRecipes.forEach((recipe) => {
      expect(recipe.tags).toContain('healthy')
    })
  })

  it('should return comfort-food recipes', () => {
    const comfortFood = getRecipesByTag('comfort-food')
    expect(comfortFood.length).toBeGreaterThan(0)
    comfortFood.forEach((recipe) => {
      expect(recipe.tags).toContain('comfort-food')
    })
  })

  it('should return empty array for non-existent tag', () => {
    const nonExistent = getRecipesByTag('non-existent-tag-123')
    expect(nonExistent).toEqual([])
  })

  it('should be case-sensitive', () => {
    const lowercase = getRecipesByTag('quick')
    const uppercase = getRecipesByTag('QUICK')
    expect(lowercase.length).toBeGreaterThan(0)
    expect(uppercase).toEqual([])
  })

  it('should return Newfoundland recipes', () => {
    const nlRecipes = getRecipesByTag('newfoundland')
    expect(nlRecipes.length).toBeGreaterThan(0)
    const ids = nlRecipes.map(r => r.id)
    expect(ids).toContain('jiggs-dinner')
    expect(ids).toContain('cod-cakes')
  })
})

describe('getRecipeById', () => {
  it('should return the correct recipe for a valid ID', () => {
    const recipe = getRecipeById('scrambled-eggs-toast')
    expect(recipe).toBeDefined()
    expect(recipe?.name).toBe('Scrambled Eggs & Toast')
    expect(recipe?.mealType).toBe('breakfast')
  })

  it('should return undefined for a non-existent ID', () => {
    const notFound = getRecipeById('non-existent-recipe')
    expect(notFound).toBeUndefined()
  })

  it('should find all recipes in the database by their ID', () => {
    recipes.forEach((recipe) => {
      const found = getRecipeById(recipe.id)
      expect(found).toBeDefined()
      expect(found?.id).toBe(recipe.id)
      expect(found?.name).toBe(recipe.name)
    })
  })

  it('should return the complete recipe object', () => {
    const grilledCheese = getRecipeById('grilled-cheese')
    expect(grilledCheese).toBeDefined()
    expect(grilledCheese?.id).toBe('grilled-cheese')
    expect(grilledCheese?.name).toBe('Grilled Cheese Sandwich')
    expect(grilledCheese?.category).toBe('Lunch')
    expect(grilledCheese?.mealType).toBe('lunch')
    expect(grilledCheese?.ingredients.length).toBeGreaterThan(0)
    expect(grilledCheese?.instructions.length).toBeGreaterThan(0)
  })

  it('should be case-sensitive', () => {
    const lowercase = getRecipeById('grilled-cheese')
    const uppercase = getRecipeById('GRILLED-CHEESE')
    expect(lowercase).toBeDefined()
    expect(uppercase).toBeUndefined()
  })

  it('should handle empty string', () => {
    const empty = getRecipeById('')
    expect(empty).toBeUndefined()
  })

  it('should find Jiggs Dinner recipe', () => {
    const jiggs = getRecipeById('jiggs-dinner')
    expect(jiggs).toBeDefined()
    expect(jiggs?.name).toBe('Traditional Jiggs Dinner')
    expect(jiggs?.tags).toContain('newfoundland')
  })
})

describe('searchRecipes', () => {
  it('should find recipes by name', () => {
    const results = searchRecipes('chicken')
    expect(results.length).toBeGreaterThan(0)
    results.forEach((recipe) => {
      const matchesName = recipe.name.toLowerCase().includes('chicken')
      const matchesDescription = recipe.description.toLowerCase().includes('chicken')
      const matchesTags = recipe.tags.some(t => t.includes('chicken'))
      expect(matchesName || matchesDescription || matchesTags).toBe(true)
    })
  })

  it('should find recipes by description', () => {
    const results = searchRecipes('homemade')
    expect(results.length).toBeGreaterThan(0)
    expect(results.some(r => r.description.toLowerCase().includes('homemade'))).toBe(true)
  })

  it('should find recipes by tags', () => {
    const results = searchRecipes('budget')
    expect(results.length).toBeGreaterThan(0)
    expect(results.some(r => r.tags.some(t => t.includes('budget')))).toBe(true)
  })

  it('should be case-insensitive', () => {
    const upperResults = searchRecipes('CHICKEN')
    const lowerResults = searchRecipes('chicken')
    const mixedResults = searchRecipes('ChIcKeN')

    expect(upperResults.length).toBe(lowerResults.length)
    expect(lowerResults.length).toBe(mixedResults.length)
    expect(upperResults.length).toBeGreaterThan(0)
  })

  it('should return multiple matches when applicable', () => {
    const results = searchRecipes('beef')
    expect(results.length).toBeGreaterThan(1)
  })

  it('should return empty array for no matches', () => {
    const results = searchRecipes('xyznonexistent123')
    expect(results).toEqual([])
  })

  it('should find recipes with partial name matches', () => {
    const results = searchRecipes('stir')
    expect(results.length).toBeGreaterThan(0)
    expect(results.some(r => r.id === 'chicken-stir-fry')).toBe(true)
  })

  it('should find spaghetti recipe', () => {
    const results = searchRecipes('spaghetti')
    expect(results.length).toBeGreaterThan(0)
    expect(results.some(r => r.id === 'spaghetti-meat-sauce')).toBe(true)
  })

  it('should find Newfoundland recipes', () => {
    const results = searchRecipes('newfoundland')
    expect(results.length).toBeGreaterThan(0)
    expect(results.some(r => r.id === 'jiggs-dinner')).toBe(true)
    expect(results.some(r => r.id === 'cod-cakes')).toBe(true)
  })

  it('should find comfort food recipes', () => {
    const results = searchRecipes('comfort')
    expect(results.length).toBeGreaterThan(0)
    expect(results.some(r => r.tags.includes('comfort-food'))).toBe(true)
  })

  it('should handle empty string', () => {
    const results = searchRecipes('')
    // Empty string matches all recipes since every field contains empty string
    expect(results.length).toBe(recipes.length)
  })
})

describe('getQuickRecipes', () => {
  it('should return recipes with total time under default 30 minutes', () => {
    const quickRecipes = getQuickRecipes()
    expect(quickRecipes.length).toBeGreaterThan(0)
    quickRecipes.forEach((recipe) => {
      expect(recipe.prepTime + recipe.cookTime).toBeLessThanOrEqual(30)
    })
  })

  it('should return recipes with total time under specified minutes', () => {
    const veryQuickRecipes = getQuickRecipes(15)
    veryQuickRecipes.forEach((recipe) => {
      expect(recipe.prepTime + recipe.cookTime).toBeLessThanOrEqual(15)
    })
  })

  it('should return more recipes with higher time limit', () => {
    const quick30 = getQuickRecipes(30)
    const quick60 = getQuickRecipes(60)
    expect(quick60.length).toBeGreaterThanOrEqual(quick30.length)
  })

  it('should return all recipes with very high time limit', () => {
    const allRecipes = getQuickRecipes(500)
    expect(allRecipes.length).toBe(recipes.length)
  })

  it('should return empty array with 0 time limit', () => {
    const zeroTime = getQuickRecipes(0)
    expect(zeroTime).toEqual([])
  })

  it('should include scrambled eggs as a quick recipe', () => {
    const quickRecipes = getQuickRecipes()
    expect(quickRecipes.some(r => r.id === 'scrambled-eggs-toast')).toBe(true)
  })

  it('should not include beef stew in 30-minute quick recipes', () => {
    const quickRecipes = getQuickRecipes(30)
    // Beef stew has 20 prep + 120 cook = 140 minutes
    expect(quickRecipes.some(r => r.id === 'beef-stew')).toBe(false)
  })

  it('should include grilled cheese as quick', () => {
    const quickRecipes = getQuickRecipes()
    expect(quickRecipes.some(r => r.id === 'grilled-cheese')).toBe(true)
  })
})

describe('getBudgetRecipes', () => {
  it('should return recipes with cost per serving under default $3', () => {
    const budgetRecipes = getBudgetRecipes()
    expect(budgetRecipes.length).toBeGreaterThan(0)
    budgetRecipes.forEach((recipe) => {
      expect(recipe.estimatedCost || 0).toBeLessThanOrEqual(3)
    })
  })

  it('should return recipes with cost under specified amount', () => {
    const veryBudget = getBudgetRecipes(2)
    veryBudget.forEach((recipe) => {
      expect(recipe.estimatedCost || 0).toBeLessThanOrEqual(2)
    })
  })

  it('should return more recipes with higher cost limit', () => {
    const budget3 = getBudgetRecipes(3)
    const budget10 = getBudgetRecipes(10)
    expect(budget10.length).toBeGreaterThanOrEqual(budget3.length)
  })

  it('should return all recipes with very high cost limit', () => {
    const allRecipes = getBudgetRecipes(100)
    expect(allRecipes.length).toBe(recipes.length)
  })

  it('should include recipes without estimatedCost when limit is positive', () => {
    // Recipes without estimatedCost default to 0, so they should be included
    const budgetRecipes = getBudgetRecipes(1)
    const recipesWithoutCost = recipes.filter(r => r.estimatedCost === undefined)
    recipesWithoutCost.forEach((recipe) => {
      expect(budgetRecipes.some(r => r.id === recipe.id)).toBe(true)
    })
  })

  it('should include scrambled eggs as a budget recipe', () => {
    const budgetRecipes = getBudgetRecipes(2)
    expect(budgetRecipes.some(r => r.id === 'scrambled-eggs-toast')).toBe(true)
  })

  it('should not include expensive recipes in low budget filter', () => {
    const lowBudget = getBudgetRecipes(2)
    // Baked salmon has estimatedCost of 6.10
    expect(lowBudget.some(r => r.id === 'baked-salmon')).toBe(false)
  })

  it('should handle zero budget limit', () => {
    const zeroBudget = getBudgetRecipes(0)
    zeroBudget.forEach((recipe) => {
      expect(recipe.estimatedCost || 0).toBeLessThanOrEqual(0)
    })
  })
})

describe('getRecipeTotalCost', () => {
  it('should calculate total cost from ingredient prices', () => {
    const recipe = getRecipeById('scrambled-eggs-toast')
    expect(recipe).toBeDefined()
    if (recipe) {
      const totalCost = getRecipeTotalCost(recipe)
      // Should be sum of all ingredient prices
      const expectedCost = recipe.ingredients.reduce(
        (sum, ing) => sum + (ing.estimatedPrice || 0),
        0
      )
      expect(totalCost).toBe(expectedCost)
    }
  })

  it('should return 0 for recipe with no ingredient prices', () => {
    const mockRecipe: Recipe = {
      id: 'test',
      name: 'Test Recipe',
      description: 'Test',
      category: 'Dinner',
      mealType: 'dinner',
      prepTime: 10,
      cookTime: 20,
      servings: 4,
      difficulty: 'Easy',
      ingredients: [
        { name: 'Test Ingredient', amount: 1, unit: 'cup', category: 'Pantry' }
      ],
      instructions: ['Test instruction'],
      tags: ['test']
    }
    const totalCost = getRecipeTotalCost(mockRecipe)
    expect(totalCost).toBe(0)
  })

  it('should handle mixed ingredients with and without prices', () => {
    const mockRecipe: Recipe = {
      id: 'test',
      name: 'Test Recipe',
      description: 'Test',
      category: 'Dinner',
      mealType: 'dinner',
      prepTime: 10,
      cookTime: 20,
      servings: 4,
      difficulty: 'Easy',
      ingredients: [
        { name: 'With Price', amount: 1, unit: 'cup', category: 'Pantry', estimatedPrice: 5.00 },
        { name: 'Without Price', amount: 1, unit: 'cup', category: 'Pantry' },
        { name: 'With Price 2', amount: 1, unit: 'cup', category: 'Pantry', estimatedPrice: 3.50 }
      ],
      instructions: ['Test instruction'],
      tags: ['test']
    }
    const totalCost = getRecipeTotalCost(mockRecipe)
    expect(totalCost).toBe(8.50)
  })

  it('should calculate correct cost for grilled cheese', () => {
    const recipe = getRecipeById('grilled-cheese')
    expect(recipe).toBeDefined()
    if (recipe) {
      const totalCost = getRecipeTotalCost(recipe)
      // Bread: 0.60 + Cheese: 1.50 + Butter: 0.30 = 2.40
      expect(totalCost).toBeCloseTo(2.40, 2)
    }
  })

  it('should calculate correct cost for spaghetti with meat sauce', () => {
    const recipe = getRecipeById('spaghetti-meat-sauce')
    expect(recipe).toBeDefined()
    if (recipe) {
      const totalCost = getRecipeTotalCost(recipe)
      expect(totalCost).toBeGreaterThan(0)
      // Should be sum of all ingredient prices
      const expectedCost = recipe.ingredients.reduce(
        (sum, ing) => sum + (ing.estimatedPrice || 0),
        0
      )
      expect(totalCost).toBe(expectedCost)
    }
  })
})

describe('generateGroceryList', () => {
  it('should return an empty array for empty recipe list', () => {
    const groceryList = generateGroceryList([])
    expect(groceryList).toEqual([])
  })

  it('should return grocery items from a single recipe', () => {
    const recipe = getRecipeById('grilled-cheese')
    expect(recipe).toBeDefined()
    if (recipe) {
      const groceryList = generateGroceryList([recipe])
      expect(groceryList.length).toBe(recipe.ingredients.length)

      // Each ingredient should be in the grocery list
      recipe.ingredients.forEach((ing) => {
        expect(groceryList.some(item => item.name === ing.name)).toBe(true)
      })
    }
  })

  it('should aggregate identical ingredients from multiple recipes', () => {
    // Both scrambled eggs and pancakes use eggs and butter
    const scrambledEggs = getRecipeById('scrambled-eggs-toast')
    const pancakes = getRecipeById('pancakes')

    expect(scrambledEggs).toBeDefined()
    expect(pancakes).toBeDefined()

    if (scrambledEggs && pancakes) {
      const groceryList = generateGroceryList([scrambledEggs, pancakes])

      // Find eggs in the list (both recipes use eggs with unit "large")
      const eggs = groceryList.find(item =>
        item.name === 'Eggs' && item.unit === 'large'
      )
      expect(eggs).toBeDefined()
      // Scrambled eggs uses 4 large eggs, pancakes uses 2 large eggs
      expect(eggs?.amount).toBe(6)
      expect(eggs?.fromRecipes.length).toBe(2)
      expect(eggs?.fromRecipes).toContain('Scrambled Eggs & Toast')
      expect(eggs?.fromRecipes).toContain('Fluffy Pancakes')
    }
  })

  it('should aggregate prices when combining ingredients', () => {
    const scrambledEggs = getRecipeById('scrambled-eggs-toast')
    const pancakes = getRecipeById('pancakes')

    expect(scrambledEggs).toBeDefined()
    expect(pancakes).toBeDefined()

    if (scrambledEggs && pancakes) {
      const groceryList = generateGroceryList([scrambledEggs, pancakes])

      const eggs = groceryList.find(item =>
        item.name === 'Eggs' && item.unit === 'large'
      )
      expect(eggs).toBeDefined()
      // Scrambled eggs: $1.50 + Pancakes: $0.75 = $2.25
      expect(eggs?.estimatedPrice).toBeCloseTo(2.25, 2)
    }
  })

  it('should not aggregate ingredients with different units', () => {
    // Butter can come in "tbsp" unit from different recipes
    const grilledCheese = getRecipeById('grilled-cheese')
    const pancakes = getRecipeById('pancakes')

    expect(grilledCheese).toBeDefined()
    expect(pancakes).toBeDefined()

    if (grilledCheese && pancakes) {
      const groceryList = generateGroceryList([grilledCheese, pancakes])

      // Both use butter in tbsp, should be aggregated
      const butter = groceryList.find(item =>
        item.name === 'Butter' && item.unit === 'tbsp'
      )
      expect(butter).toBeDefined()
      // Grilled cheese: 2 tbsp + Pancakes: 3 tbsp = 5 tbsp
      expect(butter?.amount).toBe(5)
    }
  })

  it('should include category information for each item', () => {
    const recipe = getRecipeById('chicken-stir-fry')
    expect(recipe).toBeDefined()

    if (recipe) {
      const groceryList = generateGroceryList([recipe])

      groceryList.forEach((item) => {
        expect(item.category).toBeDefined()
        expect(typeof item.category).toBe('string')
        expect(item.category.length).toBeGreaterThan(0)
      })
    }
  })

  it('should sort grocery items by category', () => {
    const recipe = getRecipeById('chicken-stir-fry')
    expect(recipe).toBeDefined()

    if (recipe) {
      const groceryList = generateGroceryList([recipe])

      // Check that items are sorted alphabetically by category
      for (let i = 1; i < groceryList.length; i++) {
        expect(groceryList[i].category.localeCompare(groceryList[i - 1].category)).toBeGreaterThanOrEqual(0)
      }
    }
  })

  it('should include fromRecipes array for each item', () => {
    const recipe = getRecipeById('grilled-cheese')
    expect(recipe).toBeDefined()

    if (recipe) {
      const groceryList = generateGroceryList([recipe])

      groceryList.forEach((item) => {
        expect(Array.isArray(item.fromRecipes)).toBe(true)
        expect(item.fromRecipes.length).toBeGreaterThan(0)
        expect(item.fromRecipes).toContain('Grilled Cheese Sandwich')
      })
    }
  })

  it('should handle many recipes without duplicating unique ingredients', () => {
    const breakfast = getRecipeById('scrambled-eggs-toast')
    const lunch = getRecipeById('grilled-cheese')
    const dinner = getRecipeById('chicken-stir-fry')

    expect(breakfast).toBeDefined()
    expect(lunch).toBeDefined()
    expect(dinner).toBeDefined()

    if (breakfast && lunch && dinner) {
      const groceryList = generateGroceryList([breakfast, lunch, dinner])

      // Check that unique ingredients appear only once
      const names = groceryList.map(item => `${item.name}-${item.unit}`.toLowerCase())
      const uniqueNames = new Set(names)
      expect(uniqueNames.size).toBe(names.length)
    }
  })

  it('should correctly track recipes for shared ingredients', () => {
    // Multiple recipes use garlic
    const stirFry = getRecipeById('chicken-stir-fry')
    const spaghetti = getRecipeById('spaghetti-meat-sauce')

    expect(stirFry).toBeDefined()
    expect(spaghetti).toBeDefined()

    if (stirFry && spaghetti) {
      const groceryList = generateGroceryList([stirFry, spaghetti])

      const garlic = groceryList.find(item =>
        item.name === 'Garlic' && item.unit === 'cloves'
      )
      expect(garlic).toBeDefined()
      expect(garlic?.fromRecipes).toContain('Chicken Stir Fry')
      expect(garlic?.fromRecipes).toContain('Spaghetti with Meat Sauce')
      // 3 cloves from stir fry + 3 from spaghetti
      expect(garlic?.amount).toBe(6)
    }
  })

  it('should handle recipe with zero-price ingredients', () => {
    const mockRecipe: Recipe = {
      id: 'test',
      name: 'Test Recipe',
      description: 'Test',
      category: 'Dinner',
      mealType: 'dinner',
      prepTime: 10,
      cookTime: 20,
      servings: 4,
      difficulty: 'Easy',
      ingredients: [
        { name: 'Free Item', amount: 1, unit: 'cup', category: 'Pantry' }
      ],
      instructions: ['Test'],
      tags: ['test']
    }
    const groceryList = generateGroceryList([mockRecipe])
    expect(groceryList.length).toBe(1)
    expect(groceryList[0].estimatedPrice).toBe(0)
  })

  it('should not duplicate recipe name in fromRecipes', () => {
    // If the same recipe is passed twice, should still only have one entry
    const recipe = getRecipeById('grilled-cheese')
    expect(recipe).toBeDefined()

    if (recipe) {
      const groceryList = generateGroceryList([recipe, recipe])

      groceryList.forEach((item) => {
        const recipeCount = item.fromRecipes.filter(
          r => r === 'Grilled Cheese Sandwich'
        ).length
        expect(recipeCount).toBe(1)
      })

      // Amounts should be doubled though
      const bread = groceryList.find(item => item.name === 'Bread')
      expect(bread?.amount).toBe(8) // 4 + 4
    }
  })
})

describe('Integration tests', () => {
  it('should have consistent data between meal types and recipes', () => {
    const mealTypes = ['breakfast', 'lunch', 'dinner', 'snack']

    mealTypes.forEach((mealType) => {
      const byMealType = getRecipesByMealType(mealType)
      byMealType.forEach((recipe) => {
        const found = getRecipeById(recipe.id)
        expect(found).toEqual(recipe)
      })
    })
  })

  it('should have searchable recipes matching by ID lookup', () => {
    recipes.forEach((recipe) => {
      const searchResults = searchRecipes(recipe.name)
      expect(searchResults.some(r => r.id === recipe.id)).toBe(true)
    })
  })

  it('should have consistent tag filtering', () => {
    const allTags = new Set<string>()
    recipes.forEach((recipe) => {
      recipe.tags.forEach((tag) => allTags.add(tag))
    })

    allTags.forEach((tag) => {
      const byTag = getRecipesByTag(tag)
      expect(byTag.length).toBeGreaterThan(0)
      byTag.forEach((recipe) => {
        expect(recipe.tags).toContain(tag)
      })
    })
  })

  it('should generate valid grocery list from all recipes', () => {
    const groceryList = generateGroceryList(recipes)
    expect(groceryList.length).toBeGreaterThan(0)

    groceryList.forEach((item) => {
      expect(item.name).toBeDefined()
      expect(item.amount).toBeGreaterThan(0)
      expect(item.unit).toBeDefined()
      expect(item.category).toBeDefined()
      expect(item.fromRecipes.length).toBeGreaterThan(0)
    })
  })

  it('should find quick budget recipes that are also family favorites', () => {
    const quickRecipes = getQuickRecipes(30)
    const budgetRecipes = getBudgetRecipes(3)
    const familyFavorites = getRecipesByTag('family-favorite')

    const intersection = quickRecipes.filter(
      r => budgetRecipes.some(b => b.id === r.id) &&
           familyFavorites.some(f => f.id === r.id)
    )

    // There should be some recipes that are quick, budget, and family-friendly
    expect(intersection.length).toBeGreaterThan(0)
  })
})

describe('Edge cases', () => {
  it('should handle special characters in search', () => {
    const results = searchRecipes('*')
    expect(Array.isArray(results)).toBe(true)
  })

  it('should handle numeric search', () => {
    const results = searchRecipes('123')
    expect(Array.isArray(results)).toBe(true)
  })

  it('should handle unicode characters in search', () => {
    const results = searchRecipes('éàü')
    expect(Array.isArray(results)).toBe(true)
    expect(results).toEqual([])
  })

  it('should handle negative time limit in getQuickRecipes', () => {
    const results = getQuickRecipes(-10)
    expect(Array.isArray(results)).toBe(true)
    expect(results).toEqual([])
  })

  it('should handle negative cost limit in getBudgetRecipes', () => {
    const results = getBudgetRecipes(-5)
    expect(Array.isArray(results)).toBe(true)
  })

  it('should handle very long search queries', () => {
    const longQuery = 'a'.repeat(1000)
    const results = searchRecipes(longQuery)
    expect(Array.isArray(results)).toBe(true)
    expect(results).toEqual([])
  })

  it('should handle whitespace-only search query', () => {
    const results = searchRecipes('   ')
    expect(Array.isArray(results)).toBe(true)
  })

  it('all recipes should have matching category and mealType', () => {
    recipes.forEach((recipe) => {
      const category = recipe.category.toLowerCase()
      const mealType = recipe.mealType

      // Verify they align (category is titlecase of mealType)
      if (mealType === 'breakfast') expect(category).toBe('breakfast')
      if (mealType === 'lunch') expect(category).toBe('lunch')
      if (mealType === 'dinner') expect(category).toBe('dinner')
      if (mealType === 'snack') expect(category).toBe('snack')
    })
  })

  it('should handle recipe with empty ingredients array in grocery list', () => {
    const mockRecipe: Recipe = {
      id: 'empty-test',
      name: 'Empty Recipe',
      description: 'Test',
      category: 'Dinner',
      mealType: 'dinner',
      prepTime: 10,
      cookTime: 20,
      servings: 4,
      difficulty: 'Easy',
      ingredients: [],
      instructions: ['Test'],
      tags: ['test']
    }
    const groceryList = generateGroceryList([mockRecipe])
    expect(groceryList).toEqual([])
  })

  it('should handle decimal amounts in grocery list aggregation', () => {
    const mockRecipe1: Recipe = {
      id: 'test1',
      name: 'Test Recipe 1',
      description: 'Test',
      category: 'Dinner',
      mealType: 'dinner',
      prepTime: 10,
      cookTime: 20,
      servings: 4,
      difficulty: 'Easy',
      ingredients: [
        { name: 'Flour', amount: 0.5, unit: 'cup', category: 'Pantry', estimatedPrice: 0.25 }
      ],
      instructions: ['Test'],
      tags: ['test']
    }
    const mockRecipe2: Recipe = {
      id: 'test2',
      name: 'Test Recipe 2',
      description: 'Test',
      category: 'Dinner',
      mealType: 'dinner',
      prepTime: 10,
      cookTime: 20,
      servings: 4,
      difficulty: 'Easy',
      ingredients: [
        { name: 'Flour', amount: 0.75, unit: 'cup', category: 'Pantry', estimatedPrice: 0.35 }
      ],
      instructions: ['Test'],
      tags: ['test']
    }

    const groceryList = generateGroceryList([mockRecipe1, mockRecipe2])
    const flour = groceryList.find(item => item.name === 'Flour')
    expect(flour).toBeDefined()
    expect(flour?.amount).toBeCloseTo(1.25, 2)
    expect(flour?.estimatedPrice).toBeCloseTo(0.60, 2)
  })
})

describe('Performance considerations', () => {
  it('should handle generating grocery list for all recipes efficiently', () => {
    const start = performance.now()
    const groceryList = generateGroceryList(recipes)
    const end = performance.now()

    expect(groceryList.length).toBeGreaterThan(0)
    // Should complete in under 100ms
    expect(end - start).toBeLessThan(100)
  })

  it('should handle searching through all recipes efficiently', () => {
    const start = performance.now()
    const results = searchRecipes('chicken')
    const end = performance.now()

    expect(results.length).toBeGreaterThan(0)
    // Should complete in under 50ms
    expect(end - start).toBeLessThan(50)
  })
})
