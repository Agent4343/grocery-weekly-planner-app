"use client";

import { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
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
  Printer,
  Tag,
  TrendingDown,
  Flame,
  Heart,
  Leaf,
  Star,
  Zap,
  MapPin,
  Crown
} from 'lucide-react';

import {
  allRecipes,
  Recipe,
  GroceryItem,
  generateGroceryList,
  getRecipeTotalCost,
  getRecipesByCategory
} from '@/lib/healthy-recipes';

import {
  getNLDealsService,
  GroceryDeal
} from '@/lib/nl-deals-service';

export function NLMealPlanner() {
  const [activeTab, setActiveTab] = useState('deals');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedMealType, setSelectedMealType] = useState<string>('all');
  const [selectedRecipes, setSelectedRecipes] = useState<Recipe[]>([]);
  const [viewingRecipe, setViewingRecipe] = useState<Recipe | null>(null);
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['Produce', 'Meat & Poultry', 'Dairy & Eggs']));
  const [servingsMultiplier, setServingsMultiplier] = useState(1);
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);

  // Get deals service
  const dealsService = getNLDealsService();
  const allDeals = dealsService.getAllDeals();
  const bestDeals = dealsService.getBestDeals(6);
  const flashSales = dealsService.getFlashSales();

  // Filter recipes
  const filteredRecipes = useMemo(() => {
    return allRecipes.filter(recipe => {
      const matchesSearch = searchQuery === '' ||
        recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.ingredients.some(ing => ing.name.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = selectedCategory === 'all' ||
        recipe.tags.includes(selectedCategory);

      const matchesMealType = selectedMealType === 'all' ||
        recipe.mealType === selectedMealType;

      return matchesSearch && matchesCategory && matchesMealType;
    });
  }, [searchQuery, selectedCategory, selectedMealType]);

  // Generate grocery list from selected recipes
  const groceryList = useMemo(() => {
    const list = generateGroceryList(selectedRecipes);
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

  const totalNutrition = useMemo(() => {
    return selectedRecipes.reduce((acc, recipe) => ({
      calories: acc.calories + recipe.nutrition.calories,
      protein: acc.protein + recipe.nutrition.protein,
      carbs: acc.carbs + recipe.nutrition.carbs,
      fat: acc.fat + recipe.nutrition.fat,
      fiber: acc.fiber + recipe.nutrition.fiber
    }), { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 });
  }, [selectedRecipes]);

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

  const getCategoryIcon = (tag: string) => {
    switch (tag) {
      case 'healthy': return <Heart className="h-3 w-3" />;
      case 'quick': return <Zap className="h-3 w-3" />;
      case 'vegan': return <Leaf className="h-3 w-3" />;
      case 'high-protein': return <Flame className="h-3 w-3" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg">
                <ChefHat className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">NL Meal Planner</h1>
                <p className="text-sm text-gray-500">
                  Healthy meals • Local deals • Smart savings
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {selectedRecipes.length > 0 && (
                <Badge variant="secondary" className="text-base px-4 py-1.5 bg-green-100 text-green-700">
                  {selectedRecipes.length} meals
                </Badge>
              )}
              <Button
                variant="outline"
                className="border-amber-400 text-amber-600 hover:bg-amber-50"
                onClick={() => setShowSubscribeModal(true)}
              >
                <Crown className="h-4 w-4 mr-2" />
                Premium $5/mo
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-white shadow-sm mb-6 p-1.5 rounded-xl">
            <TabsTrigger value="deals" className="flex items-center gap-2 px-5 rounded-lg data-[state=active]:bg-green-500 data-[state=active]:text-white">
              <Tag className="h-4 w-4" />
              This Week's Deals
            </TabsTrigger>
            <TabsTrigger value="recipes" className="flex items-center gap-2 px-5 rounded-lg data-[state=active]:bg-green-500 data-[state=active]:text-white">
              <ChefHat className="h-4 w-4" />
              Recipes
              <Badge variant="outline" className="ml-1">{allRecipes.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="meals" className="flex items-center gap-2 px-5 rounded-lg data-[state=active]:bg-green-500 data-[state=active]:text-white">
              <Heart className="h-4 w-4" />
              My Meals
              {selectedRecipes.length > 0 && (
                <Badge className="bg-green-600 ml-1">{selectedRecipes.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="grocery" className="flex items-center gap-2 px-5 rounded-lg data-[state=active]:bg-green-500 data-[state=active]:text-white">
              <ShoppingCart className="h-4 w-4" />
              Grocery List
              {groceryList.length > 0 && (
                <Badge className="bg-blue-600 ml-1">{groceryList.length}</Badge>
              )}
            </TabsTrigger>
          </TabsList>

          {/* DEALS TAB */}
          <TabsContent value="deals">
            <div className="space-y-6">
              {/* Flash Sales */}
              {flashSales.length > 0 && (
                <Card className="border-red-200 bg-gradient-to-r from-red-50 to-orange-50">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-red-500" />
                      <CardTitle className="text-red-700">Flash Sales - Limited Time!</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      {flashSales.map(deal => (
                        <div key={deal.id} className="bg-white rounded-lg p-4 border border-red-100 shadow-sm">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold">{deal.productName}</h3>
                            <Badge className="bg-red-500">{deal.savingsPercent}% OFF</Badge>
                          </div>
                          <p className="text-sm text-gray-500 mb-2">{deal.storeName}</p>
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-green-600">${deal.salePrice.toFixed(2)}</span>
                            <span className="text-sm text-gray-400 line-through">${deal.originalPrice.toFixed(2)}</span>
                            <span className="text-xs text-gray-500">/{deal.unit}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Best Deals */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingDown className="h-5 w-5 text-green-600" />
                      <CardTitle>Best Deals This Week</CardTitle>
                    </div>
                    <Badge variant="outline" className="text-green-600">
                      Save up to ${dealsService.getTotalPotentialSavings().toFixed(2)}
                    </Badge>
                  </div>
                  <CardDescription>
                    Top savings from Dominion, Sobeys, Walmart, Costco & more
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {bestDeals.map(deal => (
                      <div key={deal.id} className="bg-gray-50 rounded-lg p-4 border hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold">{deal.productName}</h3>
                            <p className="text-sm text-gray-500">{deal.category}</p>
                          </div>
                          <Badge variant="secondary" className="bg-green-100 text-green-700">
                            {deal.savingsPercent}% OFF
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 mb-3">
                          <MapPin className="h-3 w-3 text-gray-400" />
                          <span className="text-sm text-gray-500">{deal.storeName}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-xl font-bold text-green-600">${deal.salePrice.toFixed(2)}</span>
                            <span className="text-sm text-gray-400 line-through">${deal.originalPrice.toFixed(2)}</span>
                          </div>
                          <span className="text-xs text-gray-500">{deal.unit}</span>
                        </div>
                        {deal.loyaltyPointsBonus && (
                          <div className="mt-2 text-xs text-purple-600 flex items-center gap-1">
                            <Star className="h-3 w-3" />
                            +{deal.loyaltyPointsBonus} {deal.loyaltyProgram} points
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* All Deals by Store */}
              <Card>
                <CardHeader>
                  <CardTitle>All Deals by Store</CardTitle>
                  <CardDescription>Browse weekly specials from NL grocery stores</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {dealsService.getDealsSummaryByStore().map(({ store, dealCount, totalSavings }) => (
                      <div key={store} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
                            <span className="font-bold text-lg">{store[0]}</span>
                          </div>
                          <div>
                            <h3 className="font-semibold">{store}</h3>
                            <p className="text-sm text-gray-500">{dealCount} deals this week</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600">Save ${totalSavings.toFixed(2)}</p>
                          <Button variant="outline" size="sm" className="mt-1">
                            View Deals
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* RECIPES TAB */}
          <TabsContent value="recipes">
            {/* Search and Filters */}
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search recipes or ingredients..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <select
                      className="px-3 py-2 border rounded-lg text-sm"
                      value={selectedMealType}
                      onChange={(e) => setSelectedMealType(e.target.value)}
                    >
                      <option value="all">All Meals</option>
                      <option value="breakfast">Breakfast</option>
                      <option value="lunch">Lunch</option>
                      <option value="dinner">Dinner</option>
                      <option value="snack">Snacks</option>
                    </select>
                    {['all', 'healthy', 'quick', 'high-protein', 'low-carb', 'vegan', 'gluten-free'].map(cat => (
                      <Button
                        key={cat}
                        variant={selectedCategory === cat ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedCategory(cat)}
                        className={selectedCategory === cat ? 'bg-green-600' : ''}
                      >
                        {getCategoryIcon(cat)}
                        <span className="ml-1">{cat === 'all' ? 'All' : cat.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</span>
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
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    isRecipeSelected(recipe) ? 'ring-2 ring-green-500 bg-green-50' : ''
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-lg">{recipe.name}</h3>
                          {isRecipeSelected(recipe) && (
                            <div className="p-1 bg-green-500 rounded-full">
                              <Check className="h-3 w-3 text-white" />
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{recipe.description}</p>
                      </div>
                    </div>

                    {/* Recipe Meta */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge variant="secondary" className="text-xs">
                        <Clock className="h-3 w-3 mr-1" />
                        {recipe.prepTime + recipe.cookTime} min
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        <Users className="h-3 w-3 mr-1" />
                        {recipe.servings}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        <Flame className="h-3 w-3 mr-1" />
                        {recipe.nutrition.calories} cal
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        <DollarSign className="h-3 w-3 mr-1" />
                        ${(getRecipeTotalCost(recipe) / recipe.servings).toFixed(2)}/serving
                      </Badge>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {recipe.tags.slice(0, 4).map(tag => (
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
                        onClick={(e) => {
                          e.stopPropagation();
                          setViewingRecipe(recipe);
                        }}
                      >
                        View Recipe
                      </Button>
                      <Button
                        variant={isRecipeSelected(recipe) ? 'destructive' : 'default'}
                        size="sm"
                        className={`flex-1 ${!isRecipeSelected(recipe) ? 'bg-green-600 hover:bg-green-700' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleRecipe(recipe);
                        }}
                      >
                        {isRecipeSelected(recipe) ? (
                          <>
                            <Minus className="h-4 w-4 mr-1" />
                            Remove
                          </>
                        ) : (
                          <>
                            <Plus className="h-4 w-4 mr-1" />
                            Add
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

          {/* MY MEALS TAB */}
          <TabsContent value="meals">
            {selectedRecipes.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Heart className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-medium mb-2">No meals selected yet</h3>
                  <p className="text-gray-500 mb-4">
                    Browse healthy recipes and add meals to plan your week
                  </p>
                  <Button onClick={() => setActiveTab('recipes')} className="bg-green-600">
                    Browse Recipes
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {/* Nutrition Summary */}
                <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-3 text-green-800">Nutrition Summary</h3>
                    <div className="grid grid-cols-5 gap-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">{totalNutrition.calories}</p>
                        <p className="text-xs text-gray-500">Calories</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600">{totalNutrition.protein}g</p>
                        <p className="text-xs text-gray-500">Protein</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-amber-600">{totalNutrition.carbs}g</p>
                        <p className="text-xs text-gray-500">Carbs</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-red-500">{totalNutrition.fat}g</p>
                        <p className="text-xs text-gray-500">Fat</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-purple-600">{totalNutrition.fiber}g</p>
                        <p className="text-xs text-gray-500">Fiber</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Servings Multiplier */}
                <Card>
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
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant="outline" className="text-xs">{recipe.mealType}</Badge>
                              <h3 className="font-semibold text-lg">{recipe.name}</h3>
                            </div>
                            <p className="text-sm text-gray-500 mb-2">{recipe.description}</p>

                            {/* Ingredients Preview */}
                            <div className="mt-3">
                              <p className="text-sm font-medium text-gray-700 mb-1">Ingredients:</p>
                              <div className="flex flex-wrap gap-1">
                                {recipe.ingredients.slice(0, 5).map((ing, i) => (
                                  <Badge key={i} variant="outline" className="text-xs bg-gray-50">
                                    {ing.name}
                                  </Badge>
                                ))}
                                {recipe.ingredients.length > 5 && (
                                  <Badge variant="outline" className="text-xs bg-gray-50">
                                    +{recipe.ingredients.length - 5} more
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col items-end gap-2 ml-4">
                            <Badge className="bg-green-600">
                              ${getRecipeTotalCost(recipe).toFixed(2)}
                            </Badge>
                            <div className="flex gap-1 text-xs text-gray-500">
                              <span>{recipe.nutrition.calories} cal</span>
                              <span>•</span>
                              <span>{recipe.nutrition.protein}g protein</span>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
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
                <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-lg font-medium">{selectedRecipes.length} meals planned</p>
                        <p className="text-3xl font-bold">
                          Est. Total: ${totalCost.toFixed(2)}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={clearAllRecipes} className="text-white border-white hover:bg-white/20">
                          Clear All
                        </Button>
                        <Button onClick={() => setActiveTab('grocery')} className="bg-white text-green-600 hover:bg-gray-100">
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Get Grocery List
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          {/* GROCERY LIST TAB */}
          <TabsContent value="grocery">
            {groceryList.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <ShoppingCart className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-medium mb-2">Your grocery list is empty</h3>
                  <p className="text-gray-500 mb-4">
                    Add some meals to generate your shopping list
                  </p>
                  <Button onClick={() => setActiveTab('recipes')} className="bg-green-600">
                    Browse Recipes
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {/* Summary Header */}
                <Card className="bg-white">
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
                          Print
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
              </div>
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
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{viewingRecipe.mealType}</Badge>
                  <Badge variant="outline">{viewingRecipe.difficulty}</Badge>
                </div>
                <DialogTitle className="text-2xl mt-2">{viewingRecipe.name}</DialogTitle>
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

                {/* Nutrition */}
                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="font-semibold text-green-800 mb-3">Nutrition per Serving</h3>
                  <div className="grid grid-cols-5 gap-2 text-center">
                    <div>
                      <p className="text-lg font-bold">{viewingRecipe.nutrition.calories}</p>
                      <p className="text-xs text-gray-500">Calories</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold">{viewingRecipe.nutrition.protein}g</p>
                      <p className="text-xs text-gray-500">Protein</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold">{viewingRecipe.nutrition.carbs}g</p>
                      <p className="text-xs text-gray-500">Carbs</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold">{viewingRecipe.nutrition.fat}g</p>
                      <p className="text-xs text-gray-500">Fat</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold">{viewingRecipe.nutrition.fiber}g</p>
                      <p className="text-xs text-gray-500">Fiber</p>
                    </div>
                  </div>
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
                          <Badge variant="outline">${ing.estimatedPrice.toFixed(2)}</Badge>
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
                    className={`flex-1 ${!isRecipeSelected(viewingRecipe) ? 'bg-green-600 hover:bg-green-700' : ''}`}
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

      {/* Subscribe Modal */}
      <Dialog open={showSubscribeModal} onOpenChange={setShowSubscribeModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-2">
              <Crown className="h-6 w-6 text-amber-500" />
              <DialogTitle>NL Meal Planner Premium</DialogTitle>
            </div>
          </DialogHeader>

          <div className="space-y-4">
            <div className="text-center py-4">
              <p className="text-4xl font-bold text-green-600">$5<span className="text-lg text-gray-500">/month</span></p>
              <p className="text-gray-500 mt-1">Cancel anytime</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Check className="h-5 w-5 text-green-500" />
                <span>Daily deal alerts from all NL stores</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="h-5 w-5 text-green-500" />
                <span>100+ healthy recipes per meal type</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="h-5 w-5 text-green-500" />
                <span>Smart grocery list with price matching</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="h-5 w-5 text-green-500" />
                <span>Loyalty points tracking (PC Optimum, Scene+)</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="h-5 w-5 text-green-500" />
                <span>Weekly meal plans customized for you</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="h-5 w-5 text-green-500" />
                <span>Save up to $50+/week on groceries</span>
              </div>
            </div>

            <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-6">
              <Crown className="h-5 w-5 mr-2" />
              Start Free 7-Day Trial
            </Button>

            <p className="text-xs text-center text-gray-500">
              No credit card required for trial. By subscribing, you agree to our Terms of Service.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
