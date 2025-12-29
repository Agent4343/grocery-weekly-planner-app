import { describe, it, expect } from 'vitest'
import {
  ingredientsDatabase,
  getIngredientsByCategory,
  getLocalIngredients,
  getSeasonalIngredients,
  getIngredientById,
  searchIngredients,
  type Ingredient
} from '../ingredients'

describe('ingredientsDatabase', () => {
  it('should be a non-empty array', () => {
    expect(Array.isArray(ingredientsDatabase)).toBe(true)
    expect(ingredientsDatabase.length).toBeGreaterThan(0)
  })

  it('should contain ingredients with required properties', () => {
    ingredientsDatabase.forEach((ingredient) => {
      expect(ingredient).toHaveProperty('id')
      expect(ingredient).toHaveProperty('name')
      expect(ingredient).toHaveProperty('category')
      expect(ingredient).toHaveProperty('unit')
      expect(ingredient).toHaveProperty('storeAvailability')
      expect(typeof ingredient.id).toBe('string')
      expect(typeof ingredient.name).toBe('string')
      expect(typeof ingredient.category).toBe('string')
      expect(typeof ingredient.unit).toBe('string')
    })
  })

  it('should have valid store availability structure', () => {
    ingredientsDatabase.forEach((ingredient) => {
      const stores = ingredient.storeAvailability
      expect(stores).toHaveProperty('sobeys')
      expect(stores).toHaveProperty('dominion')
      expect(stores).toHaveProperty('costco')

      // Each store should have an available boolean
      expect(typeof stores.sobeys.available).toBe('boolean')
      expect(typeof stores.dominion.available).toBe('boolean')
      expect(typeof stores.costco.available).toBe('boolean')
    })
  })

  it('should have unique ingredient IDs', () => {
    const ids = ingredientsDatabase.map(i => i.id)
    const uniqueIds = new Set(ids)
    expect(uniqueIds.size).toBe(ids.length)
  })
})

describe('getIngredientsByCategory', () => {
  it('should return ingredients matching the category', () => {
    const vegetables = getIngredientsByCategory('Vegetables')
    expect(vegetables.length).toBeGreaterThan(0)
    vegetables.forEach((ingredient) => {
      expect(ingredient.category).toBe('Vegetables')
    })
  })

  it('should return seafood items when querying Seafood category', () => {
    const seafood = getIngredientsByCategory('Seafood')
    expect(seafood.length).toBeGreaterThan(0)
    expect(seafood.some(i => i.id === 'atlantic-cod')).toBe(true)
  })

  it('should return dairy items when querying Dairy category', () => {
    const dairy = getIngredientsByCategory('Dairy')
    expect(dairy.length).toBeGreaterThan(0)
    expect(dairy.some(i => i.id === 'milk')).toBe(true)
    expect(dairy.some(i => i.id === 'butter')).toBe(true)
    expect(dairy.some(i => i.id === 'eggs')).toBe(true)
  })

  it('should return an empty array for non-existent category', () => {
    const nonExistent = getIngredientsByCategory('NonExistentCategory')
    expect(nonExistent).toEqual([])
  })

  it('should be case-sensitive', () => {
    const lowercase = getIngredientsByCategory('vegetables')
    const uppercase = getIngredientsByCategory('Vegetables')
    expect(lowercase).toEqual([])
    expect(uppercase.length).toBeGreaterThan(0)
  })

  it('should return baking items correctly', () => {
    const baking = getIngredientsByCategory('Baking')
    expect(baking.length).toBeGreaterThan(0)
    expect(baking.some(i => i.id === 'flour')).toBe(true)
    expect(baking.some(i => i.id === 'molasses')).toBe(true)
  })

  it('should return berries category items', () => {
    const berries = getIngredientsByCategory('Berries')
    expect(berries.length).toBeGreaterThan(0)
    expect(berries.some(i => i.id === 'partridgeberries')).toBe(true)
    expect(berries.some(i => i.id === 'blueberries')).toBe(true)
  })
})

describe('getLocalIngredients', () => {
  it('should return only ingredients with isLocal set to true', () => {
    const localIngredients = getLocalIngredients()
    expect(localIngredients.length).toBeGreaterThan(0)
    localIngredients.forEach((ingredient) => {
      expect(ingredient.isLocal).toBe(true)
    })
  })

  it('should include known local ingredients', () => {
    const localIngredients = getLocalIngredients()
    const localIds = localIngredients.map(i => i.id)

    // These are explicitly marked as local in the database
    expect(localIds).toContain('atlantic-cod')
    expect(localIds).toContain('salt-beef')
    expect(localIds).toContain('ground-moose')
    expect(localIds).toContain('potatoes')
    expect(localIds).toContain('partridgeberries')
    expect(localIds).toContain('blueberries')
  })

  it('should not include ingredients without isLocal flag', () => {
    const localIngredients = getLocalIngredients()
    const localIds = localIngredients.map(i => i.id)

    // These don't have isLocal set
    expect(localIds).not.toContain('chicken-breast')
    expect(localIds).not.toContain('flour')
    expect(localIds).not.toContain('oats')
    expect(localIds).not.toContain('milk')
  })

  it('should return ingredients that actually exist in the database', () => {
    const localIngredients = getLocalIngredients()
    const allIds = ingredientsDatabase.map(i => i.id)

    localIngredients.forEach((ingredient) => {
      expect(allIds).toContain(ingredient.id)
    })
  })
})

describe('getSeasonalIngredients', () => {
  it('should return ingredients available in fall', () => {
    const fallIngredients = getSeasonalIngredients('fall')
    expect(fallIngredients.length).toBeGreaterThan(0)

    fallIngredients.forEach((ingredient) => {
      const hasSeasonality = ingredient.seasonality?.includes('fall') ||
                             ingredient.seasonality?.includes('year-round')
      expect(hasSeasonality).toBe(true)
    })
  })

  it('should return ingredients available in summer', () => {
    const summerIngredients = getSeasonalIngredients('summer')
    expect(summerIngredients.length).toBeGreaterThan(0)

    const summerIds = summerIngredients.map(i => i.id)
    expect(summerIds).toContain('blueberries')
  })

  it('should return ingredients available in winter', () => {
    const winterIngredients = getSeasonalIngredients('winter')
    expect(winterIngredients.length).toBeGreaterThan(0)

    const winterIds = winterIngredients.map(i => i.id)
    expect(winterIds).toContain('ground-moose')
    expect(winterIds).toContain('cabbage')
    expect(winterIds).toContain('turnip')
  })

  it('should include year-round items for any season', () => {
    const yearRoundItems = ingredientsDatabase.filter(i =>
      i.seasonality?.includes('year-round')
    )

    const seasons = ['spring', 'summer', 'fall', 'winter']
    seasons.forEach((season) => {
      const seasonalItems = getSeasonalIngredients(season)
      yearRoundItems.forEach((yearRoundItem) => {
        expect(seasonalItems.some(i => i.id === yearRoundItem.id)).toBe(true)
      })
    })
  })

  it('should not include items without seasonality for any season', () => {
    // Ingredients without seasonality shouldn't match any season
    const noSeasonality = ingredientsDatabase.filter(i => !i.seasonality)
    const fallIngredients = getSeasonalIngredients('fall')
    const fallIds = fallIngredients.map(i => i.id)

    noSeasonality.forEach((ingredient) => {
      expect(fallIds).not.toContain(ingredient.id)
    })
  })

  it('should return empty array for non-existent season if no year-round items', () => {
    // Actually it should still return year-round items
    const invalidSeason = getSeasonalIngredients('nonexistent')
    // Should still contain year-round items
    const yearRoundItems = ingredientsDatabase.filter(i =>
      i.seasonality?.includes('year-round')
    )
    expect(invalidSeason.length).toBe(yearRoundItems.length)
  })

  it('should return spring items including year-round', () => {
    const springIngredients = getSeasonalIngredients('spring')
    expect(springIngredients.length).toBeGreaterThan(0)

    const springIds = springIngredients.map(i => i.id)
    expect(springIds).toContain('cabbage') // has spring in seasonality
    expect(springIds).toContain('carrots') // year-round
  })
})

describe('getIngredientById', () => {
  it('should return the correct ingredient for a valid ID', () => {
    const cod = getIngredientById('atlantic-cod')
    expect(cod).toBeDefined()
    expect(cod?.name).toBe('Atlantic Cod')
    expect(cod?.category).toBe('Seafood')
  })

  it('should return undefined for a non-existent ID', () => {
    const notFound = getIngredientById('non-existent-id')
    expect(notFound).toBeUndefined()
  })

  it('should find all ingredients in the database by their ID', () => {
    ingredientsDatabase.forEach((ingredient) => {
      const found = getIngredientById(ingredient.id)
      expect(found).toBeDefined()
      expect(found?.id).toBe(ingredient.id)
      expect(found?.name).toBe(ingredient.name)
    })
  })

  it('should return the complete ingredient object', () => {
    const butter = getIngredientById('butter')
    expect(butter).toBeDefined()
    expect(butter).toEqual({
      id: 'butter',
      name: 'Butter',
      category: 'Dairy',
      unit: 'lb',
      storeAvailability: {
        sobeys: { available: true, avgPrice: 6.99, section: 'Dairy' },
        dominion: { available: true, avgPrice: 7.29, section: 'Dairy' },
        costco: { available: true, avgPrice: 9.99, section: 'Dairy', bulkSize: '2 lb pack' }
      }
    })
  })

  it('should be case-sensitive', () => {
    const lowercase = getIngredientById('Atlantic-Cod')
    expect(lowercase).toBeUndefined()
  })

  it('should handle empty string', () => {
    const empty = getIngredientById('')
    expect(empty).toBeUndefined()
  })
})

describe('searchIngredients', () => {
  it('should find ingredients by name', () => {
    const results = searchIngredients('cod')
    expect(results.length).toBeGreaterThan(0)
    expect(results.some(i => i.id === 'atlantic-cod')).toBe(true)
  })

  it('should find ingredients by category', () => {
    const results = searchIngredients('Seafood')
    expect(results.length).toBeGreaterThan(0)
    results.forEach((ingredient) => {
      expect(
        ingredient.name.toLowerCase().includes('seafood') ||
        ingredient.category.toLowerCase().includes('seafood')
      ).toBe(true)
    })
  })

  it('should be case-insensitive', () => {
    const upperResults = searchIngredients('COD')
    const lowerResults = searchIngredients('cod')
    const mixedResults = searchIngredients('CoD')

    expect(upperResults.length).toBe(lowerResults.length)
    expect(lowerResults.length).toBe(mixedResults.length)
    expect(upperResults.length).toBeGreaterThan(0)
  })

  it('should return multiple matches when applicable', () => {
    const results = searchIngredients('ber')
    // Should match Berries category items and blueberries
    expect(results.length).toBeGreaterThan(1)
  })

  it('should return empty array for no matches', () => {
    const results = searchIngredients('xyznonexistent123')
    expect(results).toEqual([])
  })

  it('should handle partial name matches', () => {
    const results = searchIngredients('blue')
    expect(results.length).toBeGreaterThan(0)
    expect(results.some(i => i.id === 'blueberries')).toBe(true)
  })

  it('should match on category partial', () => {
    const results = searchIngredients('veg')
    expect(results.length).toBeGreaterThan(0)
    results.forEach((ingredient) => {
      expect(
        ingredient.name.toLowerCase().includes('veg') ||
        ingredient.category.toLowerCase().includes('veg')
      ).toBe(true)
    })
  })

  it('should find dairy products', () => {
    const results = searchIngredients('dairy')
    expect(results.length).toBeGreaterThan(0)
    expect(results.some(i => i.id === 'milk')).toBe(true)
    expect(results.some(i => i.id === 'butter')).toBe(true)
    expect(results.some(i => i.id === 'eggs')).toBe(true)
  })

  it('should handle empty string by returning all ingredients', () => {
    const results = searchIngredients('')
    expect(results.length).toBe(ingredientsDatabase.length)
  })

  it('should handle whitespace-only query', () => {
    const results = searchIngredients('   ')
    // Whitespace-only query returns empty since no ingredient contains literal spaces in name/category
    expect(Array.isArray(results)).toBe(true)
    expect(results.length).toBe(0)
  })

  it('should find meat items', () => {
    const results = searchIngredients('meat')
    expect(results.length).toBeGreaterThan(0)
    // Should find items in Meat, Game Meat categories
    expect(results.some(i => i.id === 'salt-beef')).toBe(true)
    expect(results.some(i => i.id === 'ground-moose')).toBe(true)
  })

  it('should find baking items by searching for flour', () => {
    const results = searchIngredients('flour')
    expect(results.length).toBeGreaterThan(0)
    expect(results.some(i => i.id === 'flour')).toBe(true)
  })

  it('should match ingredient names containing search term anywhere', () => {
    const results = searchIngredients('wild')
    expect(results.length).toBeGreaterThan(0)
    expect(results.some(i => i.name === 'Wild Blueberries')).toBe(true)
  })
})

describe('Integration tests', () => {
  it('should have consistent data between functions', () => {
    // Get all local ingredients and verify they can be found by ID
    const localIngredients = getLocalIngredients()
    localIngredients.forEach((ingredient) => {
      const found = getIngredientById(ingredient.id)
      expect(found).toEqual(ingredient)
    })
  })

  it('should have searchable categories matching category filter', () => {
    const categories = [...new Set(ingredientsDatabase.map(i => i.category))]

    categories.forEach((category) => {
      const byCategory = getIngredientsByCategory(category)
      const bySearch = searchIngredients(category)

      // All items from category filter should be in search results
      byCategory.forEach((item) => {
        expect(bySearch.some(s => s.id === item.id)).toBe(true)
      })
    })
  })

  it('should have seasonal ingredients findable by ID', () => {
    const seasons = ['spring', 'summer', 'fall', 'winter']

    seasons.forEach((season) => {
      const seasonalItems = getSeasonalIngredients(season)
      seasonalItems.forEach((item) => {
        const found = getIngredientById(item.id)
        expect(found).toBeDefined()
        expect(found?.id).toBe(item.id)
      })
    })
  })
})

describe('Edge cases', () => {
  it('should handle special characters in search', () => {
    const results = searchIngredients('*')
    // Should not crash, just return empty or matches
    expect(Array.isArray(results)).toBe(true)
  })

  it('should handle numeric search', () => {
    const results = searchIngredients('123')
    expect(Array.isArray(results)).toBe(true)
  })

  it('should handle unicode characters', () => {
    const results = searchIngredients('éàü')
    expect(Array.isArray(results)).toBe(true)
    expect(results).toEqual([])
  })

  it('store availability should have valid prices for available items', () => {
    ingredientsDatabase.forEach((ingredient) => {
      const stores = ingredient.storeAvailability

      if (stores.sobeys.available && stores.sobeys.avgPrice !== undefined) {
        expect(stores.sobeys.avgPrice).toBeGreaterThan(0)
      }
      if (stores.dominion.available && stores.dominion.avgPrice !== undefined) {
        expect(stores.dominion.avgPrice).toBeGreaterThan(0)
      }
      if (stores.costco.available && stores.costco.avgPrice !== undefined) {
        expect(stores.costco.avgPrice).toBeGreaterThan(0)
      }
    })
  })

  it('Costco bulk items should have bulkSize when available', () => {
    const costcoAvailable = ingredientsDatabase.filter(
      i => i.storeAvailability.costco.available
    )

    costcoAvailable.forEach((ingredient) => {
      expect(ingredient.storeAvailability.costco.bulkSize).toBeDefined()
      expect(typeof ingredient.storeAvailability.costco.bulkSize).toBe('string')
      expect(ingredient.storeAvailability.costco.bulkSize!.length).toBeGreaterThan(0)
    })
  })
})
