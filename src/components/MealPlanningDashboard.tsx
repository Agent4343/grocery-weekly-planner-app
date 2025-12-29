"use client";

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Calendar,
  ShoppingCart,
  BarChart3,
  Sparkles,
  RefreshCw,
  Tag,
  Clock,
  ChefHat,
  Settings,
  Utensils,
  Zap,
  TrendingDown
} from 'lucide-react';

import { useUserPreferences } from '@/hooks/useUserPreferences';
import { WeeklySummaryDashboard } from './WeeklySummaryDashboard';
import { SmartGroceryList } from './SmartGroceryList';
import { OnboardingWizard } from './OnboardingWizard';
import {
  WeeklyMealPlan,
  DealItem,
  BestDealMeal,
  getMealPlanningAI
} from '@/lib/meal-planning-ai';
import { BUDGET_DESCRIPTIONS } from '@/lib/user-preferences';

export function MealPlanningDashboard() {
  const { preferences, isLoading, isOnboardingComplete } = useUserPreferences();
  const [weeklyPlan, setWeeklyPlan] = useState<WeeklyMealPlan | null>(null);
  const [currentDeals, setCurrentDeals] = useState<DealItem[]>([]);
  const [bestDealMeals, setBestDealMeals] = useState<BestDealMeal[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [showOnboarding, setShowOnboarding] = useState(false);

  const mealPlanningAI = getMealPlanningAI();

  const loadDealsAndPlan = useCallback(async () => {
    setIsGenerating(true);
    try {
      // Get current deals
      const deals = mealPlanningAI.getDealsForStores(preferences.selectedStores);
      setCurrentDeals(deals);

      // Get best deal meals
      const bestMeals = mealPlanningAI.getBestDealMeals(preferences);
      setBestDealMeals(bestMeals);

      // Generate weekly plan
      const plan = mealPlanningAI.generateWeeklyPlan(preferences, {
        preferDeals: preferences.autoSearchDeals,
        maximizeIngredientReuse: true
      });
      setWeeklyPlan(plan);
    } catch (error) {
      console.error('Error loading plan:', error);
    } finally {
      setIsGenerating(false);
    }
  }, [mealPlanningAI, preferences]);

  // Load deals and generate plan when preferences are ready
  useEffect(() => {
    if (isOnboardingComplete && preferences.selectedStores.length > 0) {
      loadDealsAndPlan();
    }
  }, [isOnboardingComplete, preferences.selectedStores, loadDealsAndPlan]);

  const regeneratePlan = async () => {
    setIsGenerating(true);
    try {
      const plan = mealPlanningAI.generateWeeklyPlan(preferences, {
        preferDeals: preferences.autoSearchDeals,
        maximizeIngredientReuse: true
      });
      setWeeklyPlan(plan);
    } catch (error) {
      console.error('Error regenerating plan:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading your preferences...</p>
        </div>
      </div>
    );
  }

  // Show onboarding if not complete
  if (!isOnboardingComplete || showOnboarding) {
    return (
      <OnboardingWizard
        onComplete={() => {
          setShowOnboarding(false);
          loadDealsAndPlan();
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Sparkles className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Smart Meal Planner</h1>
                <p className="text-sm text-gray-500">
                  {preferences.location.city} | {preferences.household.totalPeople} people
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={regeneratePlan}
                disabled={isGenerating}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isGenerating ? 'animate-spin' : ''}`} />
                New Plan
              </Button>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Settings</DialogTitle>
                    <DialogDescription>
                      Manage your meal planning preferences
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Current Settings</p>
                      <div className="bg-gray-50 rounded-lg p-3 space-y-1 text-sm">
                        <p>Location: {preferences.location.city}</p>
                        <p>Household: {preferences.household.totalPeople} people</p>
                        <p>Budget: {BUDGET_DESCRIPTIONS[preferences.dietaryContext.budgetLevel].label}</p>
                        <p>Stores: {preferences.selectedStores.length} selected</p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => setShowOnboarding(true)}
                    >
                      Update Preferences
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Quick Stats Bar */}
        {weeklyPlan && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card className="bg-white">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Utensils className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{weeklyPlan.summary.totalMeals}</p>
                  <p className="text-xs text-gray-500">Meals Planned</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <ShoppingCart className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">${weeklyPlan.summary.totalCost.toFixed(0)}</p>
                  <p className="text-xs text-gray-500">Est. Cost</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <TrendingDown className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">${weeklyPlan.summary.totalSavings.toFixed(0)}</p>
                  <p className="text-xs text-gray-500">You Save</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Clock className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {Math.round((weeklyPlan.summary.totalPrepTime + weeklyPlan.summary.totalCookTime) / 60)}h
                  </p>
                  <p className="text-xs text-gray-500">Cook Time</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-white shadow-sm mb-6">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="meals" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Meal Plan
            </TabsTrigger>
            <TabsTrigger value="shopping" className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              Shopping List
            </TabsTrigger>
            <TabsTrigger value="deals" className="flex items-center gap-2">
              <Tag className="h-4 w-4" />
              Deals
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            {weeklyPlan ? (
              <WeeklySummaryDashboard plan={weeklyPlan} />
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Sparkles className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Generating your meal plan...
                  </h3>
                  <p className="text-gray-500">
                    We&apos;re creating a personalized plan based on your preferences
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Meal Plan Tab */}
          <TabsContent value="meals">
            {weeklyPlan ? (
              <div className="space-y-6">
                {weeklyPlan.days.map((day) => (
                  <Card key={day.date}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Calendar className="h-5 w-5 text-blue-600" />
                          {day.dayName}
                          <span className="text-sm font-normal text-gray-500">
                            {new Date(day.date).toLocaleDateString('en-CA', { month: 'short', day: 'numeric' })}
                          </span>
                        </CardTitle>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">${day.totalCost.toFixed(2)}</Badge>
                          {day.totalSavings > 0 && (
                            <Badge className="bg-orange-100 text-orange-700">
                              Save ${day.totalSavings.toFixed(2)}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-4">
                        {['breakfast', 'lunch', 'dinner'].map((mealType) => {
                          const meal = day.meals.find(m => m.mealType === mealType);
                          return (
                            <div
                              key={mealType}
                              className={`
                                p-4 rounded-lg border-2 border-dashed
                                ${meal ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'}
                              `}
                            >
                              <p className="text-xs font-medium text-gray-500 uppercase mb-2">
                                {mealType}
                              </p>
                              {meal ? (
                                <div>
                                  <p className="font-medium text-gray-900">{meal.recipe.name}</p>
                                  <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                                    <Clock className="h-3 w-3" />
                                    <span>{meal.estimatedTime} min</span>
                                    <span>|</span>
                                    <span>{meal.servings} servings</span>
                                  </div>
                                  {meal.usesDeals && (
                                    <Badge className="mt-2 bg-orange-100 text-orange-700 text-xs">
                                      <Tag className="h-3 w-3 mr-1" />
                                      Uses deals
                                    </Badge>
                                  )}
                                </div>
                              ) : (
                                <p className="text-gray-400 text-sm">No meal planned</p>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Loading meal plan...</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Shopping List Tab */}
          <TabsContent value="shopping">
            {weeklyPlan ? (
              <SmartGroceryList shoppingList={weeklyPlan.shoppingList} />
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <ShoppingCart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Loading shopping list...</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Deals Tab */}
          <TabsContent value="deals">
            <div className="space-y-6">
              {/* Flash Sales */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-yellow-500" />
                    Flash Sales
                  </CardTitle>
                  <CardDescription>Limited time offers at your selected stores</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {currentDeals.filter(d => d.isFlashSale).map((deal) => (
                      <div
                        key={deal.id}
                        className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-orange-200"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <Badge className="bg-red-500 text-white">
                            {deal.discountPercentage}% OFF
                          </Badge>
                          <Zap className="h-4 w-4 text-yellow-500" />
                        </div>
                        <h4 className="font-medium">{deal.ingredientName}</h4>
                        <p className="text-sm text-gray-500">{deal.storeName}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-lg font-bold text-green-600">
                            ${deal.salePrice.toFixed(2)}
                          </span>
                          <span className="text-sm text-gray-400 line-through">
                            ${deal.originalPrice.toFixed(2)}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">{deal.quantity}</p>
                      </div>
                    ))}
                    {currentDeals.filter(d => d.isFlashSale).length === 0 && (
                      <p className="text-gray-500 col-span-full text-center py-4">
                        No flash sales at your stores right now
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Best Deal Meals */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ChefHat className="h-5 w-5 text-green-600" />
                    Best Deal Meals This Week
                  </CardTitle>
                  <CardDescription>
                    Meals that maximize your savings with current deals
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {bestDealMeals.slice(0, 5).map((dealMeal, index) => (
                      <div
                        key={dealMeal.recipe.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center font-bold text-green-600">
                            {index + 1}
                          </div>
                          <div>
                            <h4 className="font-medium">{dealMeal.recipe.name}</h4>
                            <p className="text-sm text-gray-500">
                              Uses {dealMeal.dealsUsed.length} deal{dealMeal.dealsUsed.length !== 1 ? 's' : ''}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-green-600">
                              ${dealMeal.estimatedCost.toFixed(2)}
                            </span>
                            <span className="text-sm text-gray-400 line-through">
                              ${dealMeal.normalCost.toFixed(2)}
                            </span>
                          </div>
                          <Badge className="bg-orange-100 text-orange-700">
                            Save ${dealMeal.totalSavings.toFixed(2)}
                          </Badge>
                        </div>
                      </div>
                    ))}
                    {bestDealMeals.length === 0 && (
                      <p className="text-gray-500 text-center py-4">
                        No deal meals available with your current store selection
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* All Current Deals */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Tag className="h-5 w-5 text-blue-600" />
                    All Current Deals
                  </CardTitle>
                  <CardDescription>
                    Weekly specials at your selected stores
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {currentDeals.map((deal) => (
                      <div
                        key={deal.id}
                        className="p-4 bg-white rounded-lg border hover:border-green-300 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="secondary">{deal.category}</Badge>
                          <Badge className="bg-green-100 text-green-700">
                            {deal.discountPercentage}% OFF
                          </Badge>
                        </div>
                        <h4 className="font-medium">{deal.ingredientName}</h4>
                        <p className="text-sm text-gray-500">{deal.storeName}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-lg font-bold text-green-600">
                            ${deal.salePrice.toFixed(2)}
                          </span>
                          <span className="text-sm text-gray-400 line-through">
                            ${deal.originalPrice.toFixed(2)}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">{deal.quantity}</p>
                      </div>
                    ))}
                    {currentDeals.length === 0 && (
                      <p className="text-gray-500 col-span-full text-center py-4">
                        No deals found at your selected stores
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-500">
          <p>Smart Meal Planner - Newfoundland & Labrador</p>
          <p className="mt-1">Set it once, shop once, cook stress-free</p>
        </div>
      </footer>
    </div>
  );
}
