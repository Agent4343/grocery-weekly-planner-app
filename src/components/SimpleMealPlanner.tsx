"use client";

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ChefHat,
  Clock,
  DollarSign,
  ShoppingCart,
  Search,
  Plus,
  Minus,
  Check,
  Trash2,
  Users,
  ChevronDown,
  ChevronUp,
  Printer
} from 'lucide-react';

import {
  recipes,
  Recipe,
  GroceryItem,
  generateGroceryList,
  getRecipeTotalCost
} from '@/lib/recipes';

export function SimpleMealPlanner() {
  const [activeTab, setActiveTab] = useState('recipes');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRecipes, setSelectedRecipes] = useState<Recipe[]>([]);
  const [viewingRecipe, setViewingRecipe] = useState<Recipe | null>(null);
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['Produce', 'Meat', 'Dairy']));
  const [servingsMultiplier, setServingsMultiplier] = useState(1);

  // Filter recipes
  const filteredRecipes = useMemo(() => {
    return recipes.filter(recipe => {
      const matchesSearch = searchQuery === '' ||
        recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === 'all' ||
        recipe.mealType === selectedCategory ||
        recipe.tags.includes(selectedCategory);

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // Generate grocery list from selected recipes
  const groceryList = useMemo(() => {
    const list = generateGroceryList(selectedRecipes);
    // Apply servings multiplier
    return list.map(item => ({
      ...item,
      amount: item.amount * servingsMultiplier,
      estimatedPrice: item.estimatedPrice * servingsMultiplier
    }));
  }, [selectedRecipes, servingsMultiplier]);

  // Group grocery list by category
  const groceryByCategory = useMemo(() => {
    const grouped: Record<string, GroceryItem[]> = {};
    groceryList.forEach(item => {
      if (!grouped[item.category]) {
        grouped[item.category] = [];
      }
      grouped[item.category].push(item);
    });
    return grouped;
  }, [groceryList]);

  // Calculate totals
  const totalCost = useMemo(() => {
    return groceryList.reduce((sum, item) => sum + item.estimatedPrice, 0);
  }, [groceryList]);

  const checkedCount = checkedItems.size;
  const totalItems = groceryList.length;

  // Add/remove recipe from selection
  const toggleRecipe = (recipe: Recipe) => {
    setSelectedRecipes(prev => {
      const exists = prev.find(r => r.id === recipe.id);
      if (exists) {
        return prev.filter(r => r.id !== recipe.id);
      }
      return [...prev, recipe];
    });
  };

  const isRecipeSelected = (recipe: Recipe) => {
    return selectedRecipes.some(r => r.id === recipe.id);
  };

  const clearAllRecipes = () => {
    setSelectedRecipes([]);
    setCheckedItems(new Set());
  };

  const toggleItem = (itemKey: string) => {
    setCheckedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemKey)) {
        newSet.delete(itemKey);
      } else {
        newSet.add(itemKey);
      }
      return newSet;
    });
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };

  const formatAmount = (amount: number, unit: string): string => {
    if (amount === Math.floor(amount)) {
      return `${amount} ${unit}`;
    }
    return `${amount.toFixed(1)} ${unit}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <ChefHat className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Meal Planner</h1>
                <p className="text-sm text-gray-500">
                  Pick meals → Get your grocery list
                </p>
              </div>
            </div>

            {selectedRecipes.length > 0 && (
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className="text-lg px-3 py-1">
                  {selectedRecipes.length} meals selected
                </Badge>
                <Button
                  variant="default"
                  onClick={() => setActiveTab('grocery')}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  View Grocery List
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-white shadow-sm mb-6 p-1">
            <TabsTrigger value="recipes" className="flex items-center gap-2 px-6">
              <ChefHat className="h-4 w-4" />
              Browse Recipes
              <Badge variant="outline">{recipes.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="selected" className="flex items-center gap-2 px-6">
              <Check className="h-4 w-4" />
              My Meals
              {selectedRecipes.length > 0 && (
                <Badge className="bg-green-600">{selectedRecipes.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="grocery" className="flex items-center gap-2 px-6">
              <ShoppingCart className="h-4 w-4" />
              Grocery List
              {groceryList.length > 0 && (
                <Badge className="bg-blue-600">{groceryList.length}</Badge>
              )}
            </TabsTrigger>
          </TabsList>

          {/* Browse Recipes Tab */}
          <TabsContent value="recipes">
            {/* Search and Filters */}
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search recipes..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['all', 'breakfast', 'lunch', 'dinner', 'quick', 'kid-friendly', 'budget-friendly'].map(cat => (
                      <Button
                        key={cat}
                        variant={selectedCategory === cat ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedCategory(cat)}
                      >
                        {cat === 'all' ? 'All' : cat.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recipe Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredRecipes.map(recipe => (
                <Card
                  key={recipe.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    isRecipeSelected(recipe) ? 'ring-2 ring-green-500 bg-green-50' : ''
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-lg">{recipe.name}</h3>
                        <p className="text-sm text-gray-500">{recipe.description}</p>
                      </div>
                      {isRecipeSelected(recipe) && (
                        <div className="p-1 bg-green-500 rounded-full">
                          <Check className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>

                    {/* Recipe Meta */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge variant="secondary">
                        <Clock className="h-3 w-3 mr-1" />
                        {recipe.prepTime + recipe.cookTime} min
                      </Badge>
                      <Badge variant="secondary">
                        <Users className="h-3 w-3 mr-1" />
                        {recipe.servings} servings
                      </Badge>
                      <Badge variant="secondary">
                        <DollarSign className="h-3 w-3 mr-1" />
                        ${(recipe.estimatedCost || 0).toFixed(2)}/serving
                      </Badge>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {recipe.tags.slice(0, 3).map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => setViewingRecipe(recipe)}
                      >
                        View Recipe
                      </Button>
                      <Button
                        variant={isRecipeSelected(recipe) ? 'destructive' : 'default'}
                        size="sm"
                        className="flex-1"
                        onClick={() => toggleRecipe(recipe)}
                      >
                        {isRecipeSelected(recipe) ? (
                          <>
                            <Minus className="h-4 w-4 mr-1" />
                            Remove
                          </>
                        ) : (
                          <>
                            <Plus className="h-4 w-4 mr-1" />
                            Add Meal
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredRecipes.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <ChefHat className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No recipes found matching your search.</p>
              </div>
            )}
          </TabsContent>

          {/* My Meals Tab */}
          <TabsContent value="selected">
            {selectedRecipes.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <ChefHat className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-medium mb-2">No meals selected yet</h3>
                  <p className="text-gray-500 mb-4">
                    Browse recipes and add meals to plan your week
                  </p>
                  <Button onClick={() => setActiveTab('recipes')}>
                    Browse Recipes
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <>
                {/* Servings Multiplier */}
                <Card className="mb-6">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Adjust Servings</h3>
                        <p className="text-sm text-gray-500">Multiply all recipe quantities</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setServingsMultiplier(Math.max(0.5, servingsMultiplier - 0.5))}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="text-lg font-bold w-12 text-center">
                          {servingsMultiplier}x
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setServingsMultiplier(servingsMultiplier + 0.5)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Selected Recipes List */}
                <div className="space-y-4">
                  {selectedRecipes.map(recipe => (
                    <Card key={recipe.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg">{recipe.name}</h3>
                            <p className="text-sm text-gray-500 mb-2">{recipe.description}</p>

                            {/* Ingredients Preview */}
                            <div className="mt-3">
                              <p className="text-sm font-medium text-gray-700 mb-1">Ingredients:</p>
                              <div className="flex flex-wrap gap-1">
                                {recipe.ingredients.slice(0, 6).map((ing, i) => (
                                  <Badge key={i} variant="outline" className="text-xs">
                                    {ing.name}
                                  </Badge>
                                ))}
                                {recipe.ingredients.length > 6 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{recipe.ingredients.length - 6} more
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col items-end gap-2">
                            <Badge>
                              ${getRecipeTotalCost(recipe).toFixed(2)}
                            </Badge>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-500 hover:text-red-700"
                              onClick={() => toggleRecipe(recipe)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Summary and Actions */}
                <Card className="mt-6 bg-green-50 border-green-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-lg font-medium">{selectedRecipes.length} meals planned</p>
                        <p className="text-2xl font-bold text-green-600">
                          Est. Total: ${totalCost.toFixed(2)}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={clearAllRecipes}>
                          Clear All
                        </Button>
                        <Button onClick={() => setActiveTab('grocery')}>
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Get Grocery List
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </TabsContent>

          {/* Grocery List Tab */}
          <TabsContent value="grocery">
            {groceryList.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <ShoppingCart className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-medium mb-2">Your grocery list is empty</h3>
                  <p className="text-gray-500 mb-4">
                    Add some meals to generate your shopping list
                  </p>
                  <Button onClick={() => setActiveTab('recipes')}>
                    Browse Recipes
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <>
                {/* Summary Header */}
                <Card className="mb-6">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div className="flex gap-6">
                        <div>
                          <p className="text-sm text-gray-500">Total Items</p>
                          <p className="text-2xl font-bold">{totalItems}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Checked Off</p>
                          <p className="text-2xl font-bold text-green-600">{checkedCount}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Estimated Total</p>
                          <p className="text-2xl font-bold">${totalCost.toFixed(2)}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={() => window.print()}>
                          <Printer className="h-4 w-4 mr-2" />
                          Print List
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => {
                            const text = Object.entries(groceryByCategory)
                              .map(([cat, items]) =>
                                `${cat}:\n${items.map(i => `  - ${formatAmount(i.amount, i.unit)} ${i.name}`).join('\n')}`
                              )
                              .join('\n\n');
                            navigator.clipboard.writeText(text);
                          }}
                        >
                          Copy to Clipboard
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Grocery List by Category */}
                <div className="space-y-4">
                  {Object.entries(groceryByCategory).map(([category, items]) => (
                    <Card key={category}>
                      <CardHeader
                        className="cursor-pointer py-3"
                        onClick={() => toggleCategory(category)}
                      >
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg flex items-center gap-2">
                            {category}
                            <Badge variant="secondary">{items.length}</Badge>
                          </CardTitle>
                          {expandedCategories.has(category) ? (
                            <ChevronUp className="h-5 w-5 text-gray-400" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-gray-400" />
                          )}
                        </div>
                      </CardHeader>
                      {expandedCategories.has(category) && (
                        <CardContent className="pt-0">
                          <div className="space-y-2">
                            {items.map((item, idx) => {
                              const itemKey = `${category}-${idx}`;
                              const isChecked = checkedItems.has(itemKey);
                              return (
                                <div
                                  key={itemKey}
                                  className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                                    isChecked ? 'bg-green-50 border-green-200' : 'bg-white hover:bg-gray-50'
                                  }`}
                                >
                                  <div className="flex items-center gap-3">
                                    <Checkbox
                                      checked={isChecked}
                                      onCheckedChange={() => toggleItem(itemKey)}
                                    />
                                    <div>
                                      <p className={`font-medium ${isChecked ? 'line-through text-gray-400' : ''}`}>
                                        {formatAmount(item.amount, item.unit)} {item.name}
                                      </p>
                                      <p className="text-xs text-gray-500">
                                        For: {item.fromRecipes.join(', ')}
                                      </p>
                                    </div>
                                  </div>
                                  <Badge variant="outline">
                                    ${item.estimatedPrice.toFixed(2)}
                                  </Badge>
                                </div>
                              );
                            })}
                          </div>
                        </CardContent>
                      )}
                    </Card>
                  ))}
                </div>
              </>
            )}
          </TabsContent>
        </Tabs>
      </main>

      {/* Recipe Detail Modal */}
      <Dialog open={!!viewingRecipe} onOpenChange={() => setViewingRecipe(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {viewingRecipe && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{viewingRecipe.name}</DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                <p className="text-gray-600">{viewingRecipe.description}</p>

                {/* Meta */}
                <div className="flex flex-wrap gap-3">
                  <Badge variant="secondary" className="px-3 py-1">
                    <Clock className="h-4 w-4 mr-1" />
                    Prep: {viewingRecipe.prepTime} min
                  </Badge>
                  <Badge variant="secondary" className="px-3 py-1">
                    <Clock className="h-4 w-4 mr-1" />
                    Cook: {viewingRecipe.cookTime} min
                  </Badge>
                  <Badge variant="secondary" className="px-3 py-1">
                    <Users className="h-4 w-4 mr-1" />
                    {viewingRecipe.servings} servings
                  </Badge>
                  <Badge variant="secondary" className="px-3 py-1">
                    <DollarSign className="h-4 w-4 mr-1" />
                    ${getRecipeTotalCost(viewingRecipe).toFixed(2)} total
                  </Badge>
                </div>

                {/* Ingredients */}
                <div>
                  <h3 className="font-semibold text-lg mb-3">Ingredients</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <ul className="space-y-2">
                      {viewingRecipe.ingredients.map((ing, idx) => (
                        <li key={idx} className="flex items-center justify-between">
                          <span>
                            <span className="font-medium">{ing.amount} {ing.unit}</span> {ing.name}
                            {ing.notes && <span className="text-gray-500 text-sm"> ({ing.notes})</span>}
                          </span>
                          {ing.estimatedPrice && (
                            <Badge variant="outline">${ing.estimatedPrice.toFixed(2)}</Badge>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Instructions */}
                <div>
                  <h3 className="font-semibold text-lg mb-3">Instructions</h3>
                  <ol className="space-y-3">
                    {viewingRecipe.instructions.map((step, idx) => (
                      <li key={idx} className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-medium">
                          {idx + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Action */}
                <div className="flex gap-3 pt-4 border-t">
                  <Button
                    className="flex-1"
                    variant={isRecipeSelected(viewingRecipe) ? 'destructive' : 'default'}
                    onClick={() => {
                      toggleRecipe(viewingRecipe);
                      setViewingRecipe(null);
                    }}
                  >
                    {isRecipeSelected(viewingRecipe) ? (
                      <>
                        <Minus className="h-4 w-4 mr-2" />
                        Remove from Meals
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4 mr-2" />
                        Add to My Meals
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
