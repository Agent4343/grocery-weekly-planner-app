import { describe, expect, it } from 'vitest';
import { generateGroceryList, getRecipeTotalCost, Recipe } from './recipes';

describe('recipes utilities', () => {
  const sampleRecipes: Recipe[] = [
    {
      id: 'lemon-chicken',
      name: 'Lemon Chicken',
      description: 'Bright and simple chicken dish',
      category: 'Dinner',
      mealType: 'dinner',
      prepTime: 10,
      cookTime: 20,
      servings: 2,
      difficulty: 'Easy',
      ingredients: [
        { name: 'Chicken Breast', amount: 1, unit: 'lb', category: 'Meat', estimatedPrice: 8 },
        { name: 'Lemon', amount: 1, unit: 'medium', category: 'Produce', estimatedPrice: 0.5 },
        { name: 'Olive Oil', amount: 2, unit: 'tbsp', category: 'Pantry' },
      ],
      instructions: ['Marinate and roast chicken'],
      tags: ['bright'],
      estimatedCost: 6,
    },
    {
      id: 'herb-chicken',
      name: 'Herb Chicken',
      description: 'Herby chicken with garlic',
      category: 'Dinner',
      mealType: 'dinner',
      prepTime: 5,
      cookTime: 25,
      servings: 2,
      difficulty: 'Easy',
      ingredients: [
        { name: 'Chicken Breast', amount: 0.5, unit: 'lb', category: 'Meat', estimatedPrice: 4 },
        { name: 'Garlic', amount: 3, unit: 'cloves', category: 'Produce', estimatedPrice: 0.2 },
        { name: 'Olive Oil', amount: 1, unit: 'tbsp', category: 'Pantry', estimatedPrice: 0.1 },
      ],
      instructions: ['Roast chicken with herbs'],
      tags: ['herby'],
      estimatedCost: 5,
    },
  ];

  it('calculates total cost even when some ingredients lack estimated price', () => {
    const total = getRecipeTotalCost(sampleRecipes[0]);
    expect(total).toBeCloseTo(8.5);
  });

  it('combines duplicate grocery items and preserves recipe sources', () => {
    const groceryList = generateGroceryList(sampleRecipes);
    const chicken = groceryList.find(item => item.name === 'Chicken Breast');
    const oliveOil = groceryList.find(item => item.name === 'Olive Oil');

    expect(chicken).toMatchObject({
      amount: 1.5,
      unit: 'lb',
      estimatedPrice: 12,
    });
    expect(chicken?.fromRecipes.sort()).toEqual(['Herb Chicken', 'Lemon Chicken'].sort());

    expect(oliveOil).toMatchObject({ amount: 3 });
    expect(oliveOil?.estimatedPrice).toBeCloseTo(0.1);
  });
});
