"use client";

import { useState, useEffect } from "react";
import {
  Calendar,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  Clock,
  Users,
  X,
  Plus,
  Heart,
  MapPin,
  Star,
  Utensils,
  TrendingDown,
  Search,
  ListPlus,
  Flame,
  Beef,
  Wheat,
  Droplets
} from "lucide-react";
import { useMealPlanner, MealPlan } from "@/hooks/useMealPlanner";
import { newfoundlandRecipes, Recipe } from "@/lib/recipes";
import { currentSales, SaleItem } from "@/lib/ai-health-services";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

// Custom shopping list item type that includes recipe ingredients
interface ShoppingListItem {
  id: string;
  name: string;
  amount?: number;
  unit?: string;
  source: "sale" | "recipe";
  saleItem?: SaleItem;
  checked: boolean;
}

export default function Home() {
  const {
    currentWeek,
    navigateWeek,
    getWeekDates,
    addMeal,
    removeMeal,
    getMealsForDate,
    getMealStats
  } = useMealPlanner();

  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedMealType, setSelectedMealType] = useState<MealPlan["mealType"]>("Dinner");
  const [showRecipeModal, setShowRecipeModal] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [savedSales, setSavedSales] = useState<string[]>([]);
  const [shoppingList, setShoppingList] = useState<ShoppingListItem[]>([]);
  const [recipeSearch, setRecipeSearch] = useState("");
  const [saleSearch, setSaleSearch] = useState("");

  const weekDates = getWeekDates();
  const stats = getMealStats();
  const mealTypes: MealPlan["mealType"][] = ["Breakfast", "Lunch", "Dinner", "Snacks"];

  // Load from localStorage on mount
  useEffect(() => {
    const savedList = localStorage.getItem("shoppingList");
    const savedFavorites = localStorage.getItem("savedSales");
    if (savedList) {
      try {
        setShoppingList(JSON.parse(savedList));
      } catch (e) {
        console.error("Failed to load shopping list", e);
      }
    }
    if (savedFavorites) {
      try {
        setSavedSales(JSON.parse(savedFavorites));
      } catch (e) {
        console.error("Failed to load saved sales", e);
      }
    }
  }, []);

  // Save to localStorage when shopping list changes
  useEffect(() => {
    localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
  }, [shoppingList]);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem("savedSales", JSON.stringify(savedSales));
  }, [savedSales]);

  // Filter recipes by search
  const filteredRecipes = newfoundlandRecipes.filter(
    (r) =>
      r.name.toLowerCase().includes(recipeSearch.toLowerCase()) ||
      r.description.toLowerCase().includes(recipeSearch.toLowerCase()) ||
      r.category.toLowerCase().includes(recipeSearch.toLowerCase())
  );

  // Filter sales by search
  const filteredSales = currentSales.filter(
    (s) =>
      s.description.toLowerCase().includes(saleSearch.toLowerCase()) ||
      s.category.toLowerCase().includes(saleSearch.toLowerCase()) ||
      s.storeName.toLowerCase().includes(saleSearch.toLowerCase())
  );

  // Calculate weekly nutrition from planned meals
  const weeklyNutrition = currentWeek.meals.reduce(
    (totals, meal) => {
      if (meal.recipe?.nutritionInfo) {
        const servings = meal.servings || meal.recipe.servings;
        totals.calories += (meal.recipe.nutritionInfo.calories || 0) * servings;
        totals.protein += (meal.recipe.nutritionInfo.protein || 0) * servings;
        totals.carbs += (meal.recipe.nutritionInfo.carbs || 0) * servings;
        totals.fat += (meal.recipe.nutritionInfo.fat || 0) * servings;
      }
      return totals;
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  const getDayName = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { weekday: "short" });
  };

  const getDayNumber = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.getDate();
  };

  const handleAddMeal = (recipe: Recipe) => {
    if (selectedDay) {
      addMeal({
        date: selectedDay,
        mealType: selectedMealType,
        recipe: recipe,
        servings: recipe.servings
      });
      setShowRecipeModal(false);
      setSelectedDay(null);
    }
  };

  const openRecipeSelector = (date: string, mealType: MealPlan["mealType"]) => {
    setSelectedDay(date);
    setSelectedMealType(mealType);
    setShowRecipeModal(true);
  };

  const toggleSavedSale = (saleId: string) => {
    setSavedSales((prev) =>
      prev.includes(saleId) ? prev.filter((id) => id !== saleId) : [...prev, saleId]
    );
  };

  const addSaleToList = (sale: SaleItem) => {
    if (!shoppingList.find((item) => item.id === `sale-${sale.id}`)) {
      setShoppingList((prev) => [
        ...prev,
        {
          id: `sale-${sale.id}`,
          name: sale.description,
          source: "sale",
          saleItem: sale,
          checked: false
        }
      ]);
    }
  };

  const removeFromShoppingList = (itemId: string) => {
    setShoppingList((prev) => prev.filter((item) => item.id !== itemId));
  };

  const toggleItemChecked = (itemId: string) => {
    setShoppingList((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, checked: !item.checked } : item
      )
    );
  };

  // Generate shopping list from all planned meals
  const generateShoppingListFromMeals = () => {
    const ingredientMap = new Map<string, ShoppingListItem>();

    currentWeek.meals.forEach((meal) => {
      if (meal.recipe) {
        meal.recipe.ingredients.forEach((ing) => {
          const key = ing.ingredientId;
          const existing = ingredientMap.get(key);
          if (existing && existing.amount) {
            existing.amount += ing.amount;
          } else {
            ingredientMap.set(key, {
              id: `recipe-${key}`,
              name: ing.ingredientId.replace(/-/g, " "),
              amount: ing.amount,
              unit: ing.unit,
              source: "recipe",
              checked: false
            });
          }
        });
      }
    });

    // Add new items without removing existing ones
    const newItems = Array.from(ingredientMap.values());
    setShoppingList((prev) => {
      const existingIds = new Set(prev.map((i) => i.id));
      const itemsToAdd = newItems.filter((i) => !existingIds.has(i.id));
      return [...prev, ...itemsToAdd];
    });
  };

  const clearCheckedItems = () => {
    setShoppingList((prev) => prev.filter((item) => !item.checked));
  };

  const getWeekRange = () => {
    if (weekDates.length === 0) return "";
    const start = new Date(weekDates[0]);
    const end = new Date(weekDates[6]);
    return `${start.toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${end.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;
  };

  const isInShoppingList = (saleId: string) => {
    return shoppingList.some((item) => item.id === `sale-${saleId}`);
  };

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <section className="text-center py-6 bg-gradient-to-r from-green-600 to-blue-600 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 rounded-lg text-white">
        <h1 className="text-2xl md:text-3xl font-bold mb-1">Grocery Weekly Planner</h1>
        <p className="text-green-100">Plan meals, track sales, save money</p>
      </section>

      <Tabs defaultValue="planner" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="planner" className="text-xs sm:text-sm">
            Planner
          </TabsTrigger>
          <TabsTrigger value="recipes" className="text-xs sm:text-sm">
            Recipes
          </TabsTrigger>
          <TabsTrigger value="sales" className="text-xs sm:text-sm">
            Sales ({filteredSales.length})
          </TabsTrigger>
          <TabsTrigger value="list" className="text-xs sm:text-sm">
            List ({shoppingList.length})
          </TabsTrigger>
        </TabsList>

        {/* Meal Planner Tab */}
        <TabsContent value="planner" className="space-y-4">
          {/* Week Navigation */}
          <div className="flex items-center justify-between">
            <Button variant="outline" size="sm" onClick={() => navigateWeek("prev")}>
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline ml-1">Prev</span>
            </Button>
            <div className="text-center">
              <h2 className="text-lg font-bold flex items-center justify-center">
                <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                {getWeekRange()}
              </h2>
              <p className="text-xs text-gray-600">{stats.plannedMeals} meals planned</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => navigateWeek("next")}>
              <span className="hidden sm:inline mr-1">Next</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Weekly Nutrition Summary */}
          {stats.plannedMeals > 0 && (
            <Card className="bg-gradient-to-r from-orange-50 to-green-50">
              <CardContent className="py-3">
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div>
                    <Flame className="w-4 h-4 mx-auto text-orange-500" />
                    <div className="text-lg font-bold">{weeklyNutrition.calories}</div>
                    <div className="text-xs text-gray-500">Calories</div>
                  </div>
                  <div>
                    <Beef className="w-4 h-4 mx-auto text-red-500" />
                    <div className="text-lg font-bold">{weeklyNutrition.protein}g</div>
                    <div className="text-xs text-gray-500">Protein</div>
                  </div>
                  <div>
                    <Wheat className="w-4 h-4 mx-auto text-amber-600" />
                    <div className="text-lg font-bold">{weeklyNutrition.carbs}g</div>
                    <div className="text-xs text-gray-500">Carbs</div>
                  </div>
                  <div>
                    <Droplets className="w-4 h-4 mx-auto text-yellow-500" />
                    <div className="text-lg font-bold">{weeklyNutrition.fat}g</div>
                    <div className="text-xs text-gray-500">Fat</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Generate Shopping List Button */}
          {stats.plannedMeals > 0 && (
            <Button
              onClick={generateShoppingListFromMeals}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              <ListPlus className="w-4 h-4 mr-2" />
              Generate Shopping List from Meals
            </Button>
          )}

          {/* Weekly Grid - Desktop */}
          <div className="hidden md:block bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="grid grid-cols-7 border-b">
              {weekDates.map((date) => (
                <div key={date} className="p-2 text-center border-r last:border-r-0 bg-gray-50">
                  <div className="text-xs font-medium text-gray-600">{getDayName(date)}</div>
                  <div className="text-sm font-bold text-gray-900">{getDayNumber(date)}</div>
                </div>
              ))}
            </div>
            {mealTypes.map((mealType) => (
              <div key={mealType} className="grid grid-cols-7 border-b last:border-b-0">
                {weekDates.map((date) => {
                  const meals = getMealsForDate(date);
                  const meal = meals.find((m) => m.mealType === mealType);
                  return (
                    <div
                      key={`${date}-${mealType}`}
                      className="p-1 border-r last:border-r-0 min-h-[70px] hover:bg-gray-50"
                    >
                      <div className="text-[10px] text-gray-500 mb-1">{mealType}</div>
                      {meal?.recipe ? (
                        <div className="bg-green-100 rounded p-1 text-[10px] relative group">
                          <button
                            onClick={() => removeMeal(meal.id)}
                            className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100"
                          >
                            <X className="w-2 h-2" />
                          </button>
                          <div className="font-medium text-green-800 truncate">{meal.recipe.name}</div>
                        </div>
                      ) : (
                        <button
                          onClick={() => openRecipeSelector(date, mealType)}
                          className="w-full h-8 border border-dashed border-gray-200 rounded flex items-center justify-center text-gray-400 hover:border-green-400 hover:text-green-600"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Weekly Grid - Mobile (Stacked) */}
          <div className="md:hidden space-y-3">
            {weekDates.map((date) => (
              <Card key={date}>
                <CardHeader className="py-2 px-3">
                  <CardTitle className="text-sm flex justify-between">
                    <span>{getDayName(date)}</span>
                    <span className="text-gray-500">{getDayNumber(date)}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="py-2 px-3 space-y-2">
                  {mealTypes.map((mealType) => {
                    const meals = getMealsForDate(date);
                    const meal = meals.find((m) => m.mealType === mealType);
                    return (
                      <div key={mealType} className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 w-16">{mealType}</span>
                        {meal?.recipe ? (
                          <div className="flex-1 bg-green-100 rounded px-2 py-1 text-xs flex justify-between items-center">
                            <span className="text-green-800 truncate">{meal.recipe.name}</span>
                            <button onClick={() => removeMeal(meal.id)} className="text-red-500 ml-2">
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => openRecipeSelector(date, mealType)}
                            className="flex-1 h-7 border border-dashed border-gray-200 rounded text-xs text-gray-400 hover:border-green-400 hover:text-green-600"
                          >
                            + Add
                          </button>
                        )}
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Recipes Tab */}
        <TabsContent value="recipes" className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search recipes..."
              value={recipeSearch}
              onChange={(e) => setRecipeSearch(e.target.value)}
              className="pl-9"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredRecipes.map((recipe) => (
              <Card
                key={recipe.id}
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedRecipe(recipe)}
              >
                <div className="h-24 bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
                  <Utensils className="w-8 h-8 text-green-600 opacity-50" />
                </div>
                <CardContent className="p-3">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-semibold text-sm">{recipe.name}</h3>
                    {recipe.isTraditional && (
                      <Badge variant="secondary" className="text-[10px]">Traditional</Badge>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 mb-2 line-clamp-2">{recipe.description}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {recipe.prepTime + recipe.cookTime}m
                    </span>
                    <span className="flex items-center">
                      <Users className="w-3 h-3 mr-1" />
                      {recipe.servings}
                    </span>
                    {recipe.nutritionInfo && (
                      <span>{recipe.nutritionInfo.calories} cal</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Sales Tab */}
        <TabsContent value="sales" className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search sales..."
              value={saleSearch}
              onChange={(e) => setSaleSearch(e.target.value)}
              className="pl-9"
            />
          </div>

          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold flex items-center">
              <TrendingDown className="w-4 h-4 mr-2 text-green-600" />
              This Week&apos;s Sales
            </h2>
            <Badge variant="secondary" className="text-xs">
              Save ${filteredSales.reduce((sum, s) => sum + (s.originalPrice - s.salePrice), 0).toFixed(2)}
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredSales.map((sale) => {
              const isSaved = savedSales.includes(sale.id);
              const inList = isInShoppingList(sale.id);
              return (
                <Card key={sale.id} className="hover:shadow-md">
                  <CardContent className="p-3">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm">{sale.description}</h3>
                        <p className="text-xs text-gray-600 flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {sale.storeName}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleSavedSale(sale.id)}
                        className={`p-1 h-auto ${isSaved ? "text-yellow-500" : "text-gray-400"}`}
                      >
                        <Star className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`} />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <span className="text-lg font-bold text-green-600">${sale.salePrice.toFixed(2)}</span>
                        <span className="ml-1 text-xs line-through text-gray-400">${sale.originalPrice.toFixed(2)}</span>
                      </div>
                      <Badge variant="destructive" className="text-xs">{sale.discount}%</Badge>
                    </div>
                    <Button
                      size="sm"
                      className={`w-full text-xs ${inList ? "bg-gray-500" : "bg-green-600 hover:bg-green-700"}`}
                      onClick={() => (inList ? removeFromShoppingList(`sale-${sale.id}`) : addSaleToList(sale))}
                    >
                      <ShoppingCart className="w-3 h-3 mr-1" />
                      {inList ? "Remove" : "Add to List"}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Shopping List Tab */}
        <TabsContent value="list" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold flex items-center">
              <ShoppingCart className="w-4 h-4 mr-2 text-green-600" />
              Shopping List
            </h2>
            {shoppingList.some((i) => i.checked) && (
              <Button variant="outline" size="sm" onClick={clearCheckedItems}>
                Clear Checked
              </Button>
            )}
          </div>

          {shoppingList.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center">
                <ShoppingCart className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600 text-sm">Your list is empty</p>
                <p className="text-xs text-gray-500">Add items from Sales or generate from meals</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-2">
              {/* Group by source */}
              {shoppingList.filter((i) => i.source === "recipe").length > 0 && (
                <div>
                  <h3 className="text-xs font-medium text-gray-500 mb-1 flex items-center">
                    <Utensils className="w-3 h-3 mr-1" /> From Recipes
                  </h3>
                  {shoppingList
                    .filter((i) => i.source === "recipe")
                    .map((item) => (
                      <div
                        key={item.id}
                        className={`flex items-center gap-2 p-2 rounded border mb-1 ${item.checked ? "bg-gray-100 line-through text-gray-400" : "bg-white"}`}
                      >
                        <input
                          type="checkbox"
                          checked={item.checked}
                          onChange={() => toggleItemChecked(item.id)}
                          className="w-4 h-4"
                        />
                        <span className="flex-1 text-sm capitalize">{item.name}</span>
                        {item.amount && (
                          <span className="text-xs text-gray-500">
                            {item.amount} {item.unit}
                          </span>
                        )}
                        <button onClick={() => removeFromShoppingList(item.id)} className="text-red-500">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                </div>
              )}

              {shoppingList.filter((i) => i.source === "sale").length > 0 && (
                <div>
                  <h3 className="text-xs font-medium text-gray-500 mb-1 flex items-center">
                    <TrendingDown className="w-3 h-3 mr-1" /> Sale Items
                  </h3>
                  {shoppingList
                    .filter((i) => i.source === "sale")
                    .map((item) => (
                      <div
                        key={item.id}
                        className={`flex items-center gap-2 p-2 rounded border mb-1 ${item.checked ? "bg-gray-100 line-through text-gray-400" : "bg-white"}`}
                      >
                        <input
                          type="checkbox"
                          checked={item.checked}
                          onChange={() => toggleItemChecked(item.id)}
                          className="w-4 h-4"
                        />
                        <span className="flex-1 text-sm">{item.name}</span>
                        {item.saleItem && (
                          <span className="text-xs text-green-600 font-medium">
                            ${item.saleItem.salePrice.toFixed(2)}
                          </span>
                        )}
                        <button onClick={() => removeFromShoppingList(item.id)} className="text-red-500">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                </div>
              )}

              {/* Summary */}
              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-3">
                  <div className="flex justify-between text-sm">
                    <span>Total Items:</span>
                    <span className="font-medium">{shoppingList.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Checked Off:</span>
                    <span className="font-medium">{shoppingList.filter((i) => i.checked).length}</span>
                  </div>
                  {shoppingList.filter((i) => i.source === "sale").length > 0 && (
                    <div className="flex justify-between text-sm text-green-700 font-medium mt-1">
                      <span>Sale Savings:</span>
                      <span>
                        $
                        {shoppingList
                          .filter((i) => i.saleItem)
                          .reduce((sum, i) => sum + (i.saleItem!.originalPrice - i.saleItem!.salePrice), 0)
                          .toFixed(2)}
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Recipe Selector Modal */}
      <Dialog open={showRecipeModal} onOpenChange={setShowRecipeModal}>
        <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-base">Select Recipe for {selectedMealType}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 gap-2 mt-2">
            {/* Map meal type to recipe category */}
            {(() => {
              const categoryMap: Record<string, string> = {
                Breakfast: "Breakfast",
                Lunch: "Lunch",
                Dinner: "Dinner",
                Snacks: "Snack"
              };
              const targetCategory = categoryMap[selectedMealType];

              // Get matching recipes first, then others
              const matchingRecipes = newfoundlandRecipes.filter(r => r.category === targetCategory);
              const otherRecipes = newfoundlandRecipes.filter(r => r.category !== targetCategory);

              return (
                <>
                  {matchingRecipes.length > 0 && (
                    <div className="text-xs font-medium text-green-600 mb-1">
                      Best for {selectedMealType} ({matchingRecipes.length})
                    </div>
                  )}
                  {matchingRecipes.map((recipe) => (
                    <Card
                      key={recipe.id}
                      className="cursor-pointer hover:shadow-md hover:border-green-400 border-green-200"
                      onClick={() => handleAddMeal(recipe)}
                    >
                      <CardContent className="p-3 flex items-center gap-3">
                        <div className="w-12 h-12 bg-green-100 rounded flex items-center justify-center flex-shrink-0">
                          <Utensils className="w-6 h-6 text-green-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm truncate">{recipe.name}</h3>
                          <div className="flex items-center text-xs text-gray-500">
                            <Clock className="w-3 h-3 mr-1" />
                            {recipe.prepTime + recipe.cookTime}m
                            <span className="mx-2">•</span>
                            {recipe.nutritionInfo?.calories || 0} cal
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {otherRecipes.length > 0 && (
                    <div className="text-xs font-medium text-gray-500 mt-3 mb-1">
                      Other Options ({otherRecipes.length})
                    </div>
                  )}
                  {otherRecipes.map((recipe) => (
                    <Card
                      key={recipe.id}
                      className="cursor-pointer hover:shadow-md hover:border-green-400"
                      onClick={() => handleAddMeal(recipe)}
                    >
                      <CardContent className="p-3 flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                          <Utensils className="w-6 h-6 text-gray-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm truncate">{recipe.name}</h3>
                          <div className="flex items-center text-xs text-gray-500">
                            <Badge variant="outline" className="text-[10px] mr-2">{recipe.category}</Badge>
                            <Clock className="w-3 h-3 mr-1" />
                            {recipe.prepTime + recipe.cookTime}m
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </>
              );
            })()}
          </div>
        </DialogContent>
      </Dialog>

      {/* Recipe Detail Modal */}
      <Dialog open={!!selectedRecipe} onOpenChange={() => setSelectedRecipe(null)}>
        <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
          {selectedRecipe && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedRecipe.name}</DialogTitle>
              </DialogHeader>
              <div className="space-y-3 mt-2">
                <p className="text-sm text-gray-600">{selectedRecipe.description}</p>

                <div className="flex flex-wrap gap-1">
                  <Badge variant="outline" className="text-xs">
                    <Clock className="w-3 h-3 mr-1" />
                    {selectedRecipe.prepTime + selectedRecipe.cookTime}m
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    <Users className="w-3 h-3 mr-1" />
                    {selectedRecipe.servings}
                  </Badge>
                  <Badge variant="outline" className="text-xs">{selectedRecipe.difficulty}</Badge>
                </div>

                {selectedRecipe.nutritionInfo && (
                  <div className="bg-gray-50 rounded p-3">
                    <h4 className="text-xs font-medium mb-2">Nutrition per serving</h4>
                    <div className="grid grid-cols-4 gap-2 text-center text-xs">
                      <div>
                        <div className="font-bold">{selectedRecipe.nutritionInfo.calories}</div>
                        <div className="text-gray-500">cal</div>
                      </div>
                      <div>
                        <div className="font-bold">{selectedRecipe.nutritionInfo.protein}g</div>
                        <div className="text-gray-500">protein</div>
                      </div>
                      <div>
                        <div className="font-bold">{selectedRecipe.nutritionInfo.carbs}g</div>
                        <div className="text-gray-500">carbs</div>
                      </div>
                      <div>
                        <div className="font-bold">{selectedRecipe.nutritionInfo.fat}g</div>
                        <div className="text-gray-500">fat</div>
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="text-sm font-medium mb-1">Ingredients</h4>
                  <ul className="text-sm space-y-1">
                    {selectedRecipe.ingredients.map((ing, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span>
                          {ing.amount} {ing.unit}{" "}
                          <span className="capitalize">{ing.ingredientId.replace(/-/g, " ")}</span>
                          {ing.notes && <span className="text-gray-500 text-xs"> ({ing.notes})</span>}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-1">Instructions</h4>
                  <ol className="text-sm space-y-2">
                    {selectedRecipe.instructions.map((step, idx) => (
                      <li key={idx} className="flex">
                        <span className="font-bold text-green-600 mr-2">{idx + 1}.</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {selectedRecipe.tips && (
                  <div className="bg-yellow-50 rounded p-3">
                    <h4 className="text-sm font-medium mb-1 flex items-center">
                      <Heart className="w-3 h-3 mr-1 text-yellow-600" />
                      Tips
                    </h4>
                    <ul className="text-sm space-y-1">
                      {selectedRecipe.tips.map((tip, idx) => (
                        <li key={idx} className="text-gray-700">• {tip}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
