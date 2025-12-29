"use client";

import { useState } from "react";
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
  TrendingDown
} from "lucide-react";
import { useMealPlanner, MealPlan } from "@/hooks/useMealPlanner";
import { newfoundlandRecipes, Recipe } from "@/lib/recipes";
import { currentSales, SaleItem } from "@/lib/ai-health-services";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  const {
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
  const [shoppingList, setShoppingList] = useState<SaleItem[]>([]);

  const weekDates = getWeekDates();
  const stats = getMealStats();
  const mealTypes: MealPlan["mealType"][] = ["Breakfast", "Lunch", "Dinner", "Snacks"];

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
    setSavedSales(prev =>
      prev.includes(saleId)
        ? prev.filter(id => id !== saleId)
        : [...prev, saleId]
    );
  };

  const addToShoppingList = (sale: SaleItem) => {
    if (!shoppingList.find(item => item.id === sale.id)) {
      setShoppingList(prev => [...prev, sale]);
    }
  };

  const removeFromShoppingList = (saleId: string) => {
    setShoppingList(prev => prev.filter(item => item.id !== saleId));
  };

  const getWeekRange = () => {
    if (weekDates.length === 0) return "";
    const start = new Date(weekDates[0]);
    const end = new Date(weekDates[6]);
    return `${start.toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${end.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="text-center py-8 bg-gradient-to-r from-green-600 to-blue-600 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 rounded-lg text-white">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Grocery Weekly Planner
        </h1>
        <p className="text-lg text-green-100 max-w-2xl mx-auto">
          Plan meals, track sales, and save money at Newfoundland stores
        </p>
      </section>

      <Tabs defaultValue="planner" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="planner">Meal Planner</TabsTrigger>
          <TabsTrigger value="recipes">Recipes</TabsTrigger>
          <TabsTrigger value="sales">Sales ({currentSales.length})</TabsTrigger>
          <TabsTrigger value="list">My List ({shoppingList.length})</TabsTrigger>
        </TabsList>

        {/* Meal Planner Tab */}
        <TabsContent value="planner" className="space-y-6">
          {/* Week Navigation */}
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={() => navigateWeek("prev")}>
              <ChevronLeft className="w-4 h-4 mr-1" />
              Prev Week
            </Button>
            <div className="text-center">
              <h2 className="text-xl font-bold flex items-center justify-center">
                <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                {getWeekRange()}
              </h2>
              <p className="text-sm text-gray-600">
                {stats.plannedMeals} meals planned
              </p>
            </div>
            <Button variant="outline" onClick={() => navigateWeek("next")}>
              Next Week
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          {/* Weekly Grid */}
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            {/* Day Headers */}
            <div className="grid grid-cols-7 border-b">
              {weekDates.map((date) => (
                <div
                  key={date}
                  className="p-3 text-center border-r last:border-r-0 bg-gray-50"
                >
                  <div className="text-sm font-medium text-gray-600">
                    {getDayName(date)}
                  </div>
                  <div className="text-lg font-bold text-gray-900">
                    {getDayNumber(date)}
                  </div>
                </div>
              ))}
            </div>

            {/* Meal Rows */}
            {mealTypes.map((mealType) => (
              <div key={mealType} className="grid grid-cols-7 border-b last:border-b-0">
                {weekDates.map((date) => {
                  const meals = getMealsForDate(date);
                  const meal = meals.find((m) => m.mealType === mealType);

                  return (
                    <div
                      key={`${date}-${mealType}`}
                      className="p-2 border-r last:border-r-0 min-h-[80px] hover:bg-gray-50 transition-colors"
                    >
                      <div className="text-xs text-gray-500 mb-1">{mealType}</div>
                      {meal?.recipe ? (
                        <div className="bg-green-100 rounded p-2 text-xs relative group">
                          <button
                            onClick={() => removeMeal(meal.id)}
                            className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-3 h-3" />
                          </button>
                          <div className="font-medium text-green-800 truncate">
                            {meal.recipe.name}
                          </div>
                          <div className="text-green-600 flex items-center mt-1">
                            <Clock className="w-3 h-3 mr-1" />
                            {meal.recipe.prepTime + meal.recipe.cookTime}m
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => openRecipeSelector(date, mealType)}
                          className="w-full h-12 border-2 border-dashed border-gray-200 rounded flex items-center justify-center text-gray-400 hover:border-green-400 hover:text-green-600 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Recipes Tab */}
        <TabsContent value="recipes" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newfoundlandRecipes.map((recipe) => (
              <Card
                key={recipe.id}
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedRecipe(recipe)}
              >
                <div className="h-32 bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
                  <Utensils className="w-12 h-12 text-green-600 opacity-50" />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{recipe.name}</CardTitle>
                    {recipe.isTraditional && (
                      <Badge variant="secondary" className="text-xs">
                        Traditional
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {recipe.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {recipe.prepTime + recipe.cookTime} min
                    </span>
                    <span className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {recipe.servings} servings
                    </span>
                    <Badge variant="outline">{recipe.difficulty}</Badge>
                  </div>
                  {recipe.nutritionInfo && (
                    <div className="mt-3 pt-3 border-t text-xs text-gray-500">
                      {recipe.nutritionInfo.calories} cal • {recipe.nutritionInfo.protein}g protein
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Sales Tab */}
        <TabsContent value="sales" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center">
              <TrendingDown className="w-5 h-5 mr-2 text-green-600" />
              This Week&apos;s Sales
            </h2>
            <Badge variant="secondary">
              Save up to ${currentSales.reduce((sum, s) => sum + (s.originalPrice - s.salePrice), 0).toFixed(2)}
            </Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentSales.map((sale) => {
              const isSaved = savedSales.includes(sale.id);
              const inList = shoppingList.find(item => item.id === sale.id);

              return (
                <Card key={sale.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-base">{sale.description}</CardTitle>
                        <p className="text-sm text-gray-600 flex items-center mt-1">
                          <MapPin className="w-3 h-3 mr-1" />
                          {sale.storeName}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleSavedSale(sale.id)}
                        className={isSaved ? "text-yellow-500" : "text-gray-400"}
                      >
                        <Star className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`} />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className="text-xl font-bold text-green-600">
                          ${sale.salePrice.toFixed(2)}
                        </span>
                        <span className="ml-2 text-sm line-through text-gray-400">
                          ${sale.originalPrice.toFixed(2)}
                        </span>
                      </div>
                      <Badge variant="destructive">{sale.discount}% OFF</Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                      <Badge variant="outline">{sale.category}</Badge>
                      <span>Until {new Date(sale.validUntil).toLocaleDateString()}</span>
                    </div>
                    <Button
                      size="sm"
                      className={`w-full ${inList ? "bg-gray-500" : "bg-green-600 hover:bg-green-700"}`}
                      onClick={() => inList ? removeFromShoppingList(sale.id) : addToShoppingList(sale)}
                    >
                      <ShoppingCart className="w-4 h-4 mr-1" />
                      {inList ? "Remove from List" : "Add to List"}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Shopping List Tab */}
        <TabsContent value="list" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center">
              <ShoppingCart className="w-5 h-5 mr-2 text-green-600" />
              My Shopping List
            </h2>
            {shoppingList.length > 0 && (
              <div className="text-right">
                <div className="text-sm text-gray-600">Total Savings</div>
                <div className="text-lg font-bold text-green-600">
                  ${shoppingList.reduce((sum, s) => sum + (s.originalPrice - s.salePrice), 0).toFixed(2)}
                </div>
              </div>
            )}
          </div>

          {shoppingList.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <ShoppingCart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Your shopping list is empty</p>
                <p className="text-sm text-gray-500 mt-1">
                  Add items from the Sales tab to get started
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {shoppingList.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium">{item.description}</h3>
                        <p className="text-sm text-gray-600 flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {item.storeName}
                        </p>
                      </div>
                      <div className="text-right mr-4">
                        <div className="text-lg font-bold text-green-600">
                          ${item.salePrice.toFixed(2)}
                        </div>
                        <div className="text-xs text-gray-500">
                          Save ${(item.originalPrice - item.salePrice).toFixed(2)}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromShoppingList(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-green-800">Total Items: {shoppingList.length}</div>
                      <div className="text-sm text-green-600">
                        Estimated Total: ${shoppingList.reduce((sum, s) => sum + s.salePrice, 0).toFixed(2)}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-green-600">You Save</div>
                      <div className="text-xl font-bold text-green-700">
                        ${shoppingList.reduce((sum, s) => sum + (s.originalPrice - s.salePrice), 0).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Recipe Selector Modal */}
      <Dialog open={showRecipeModal} onOpenChange={setShowRecipeModal}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Select a Recipe for {selectedMealType}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {newfoundlandRecipes.map((recipe) => (
              <Card
                key={recipe.id}
                className="cursor-pointer hover:shadow-md transition-shadow hover:border-green-400"
                onClick={() => handleAddMeal(recipe)}
              >
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-1">{recipe.name}</h3>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                    {recipe.description}
                  </p>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="w-3 h-3 mr-1" />
                    {recipe.prepTime + recipe.cookTime} min
                    <span className="mx-2">•</span>
                    <Users className="w-3 h-3 mr-1" />
                    {recipe.servings}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Recipe Detail Modal */}
      <Dialog open={!!selectedRecipe} onOpenChange={() => setSelectedRecipe(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          {selectedRecipe && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl">{selectedRecipe.name}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <p className="text-gray-600">{selectedRecipe.description}</p>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">
                    <Clock className="w-3 h-3 mr-1" />
                    {selectedRecipe.prepTime + selectedRecipe.cookTime} min
                  </Badge>
                  <Badge variant="outline">
                    <Users className="w-3 h-3 mr-1" />
                    {selectedRecipe.servings} servings
                  </Badge>
                  <Badge variant="outline">{selectedRecipe.difficulty}</Badge>
                  {selectedRecipe.isTraditional && (
                    <Badge className="bg-amber-100 text-amber-800">Traditional</Badge>
                  )}
                </div>

                {selectedRecipe.nutritionInfo && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium mb-2">Nutrition (per serving)</h4>
                    <div className="grid grid-cols-4 gap-4 text-center text-sm">
                      <div>
                        <div className="font-bold text-lg">{selectedRecipe.nutritionInfo.calories}</div>
                        <div className="text-gray-500">Calories</div>
                      </div>
                      <div>
                        <div className="font-bold text-lg">{selectedRecipe.nutritionInfo.protein}g</div>
                        <div className="text-gray-500">Protein</div>
                      </div>
                      <div>
                        <div className="font-bold text-lg">{selectedRecipe.nutritionInfo.carbs}g</div>
                        <div className="text-gray-500">Carbs</div>
                      </div>
                      <div>
                        <div className="font-bold text-lg">{selectedRecipe.nutritionInfo.fat}g</div>
                        <div className="text-gray-500">Fat</div>
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="font-medium mb-2">Ingredients</h4>
                  <ul className="space-y-1">
                    {selectedRecipe.ingredients.map((ing, idx) => (
                      <li key={idx} className="text-sm flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        {ing.amount} {ing.unit} {ing.ingredientId.replace(/-/g, " ")}
                        {ing.notes && <span className="text-gray-500 ml-1">({ing.notes})</span>}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Instructions</h4>
                  <ol className="space-y-2">
                    {selectedRecipe.instructions.map((step, idx) => (
                      <li key={idx} className="text-sm flex">
                        <span className="font-bold text-green-600 mr-3">{idx + 1}.</span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>

                {selectedRecipe.tips && (
                  <div className="bg-yellow-50 rounded-lg p-4">
                    <h4 className="font-medium mb-2 flex items-center">
                      <Heart className="w-4 h-4 mr-1 text-yellow-600" />
                      Tips
                    </h4>
                    <ul className="space-y-1">
                      {selectedRecipe.tips.map((tip, idx) => (
                        <li key={idx} className="text-sm text-gray-700">• {tip}</li>
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
