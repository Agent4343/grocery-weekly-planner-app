"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Calendar,
  DollarSign,
  Clock,
  Tag,
  Utensils,
  TrendingDown,
  Leaf,
  BarChart3,
  Sparkles,
  Target
} from 'lucide-react';

import { WeeklyMealPlan } from '@/lib/meal-planning-ai';

interface WeeklySummaryDashboardProps {
  plan: WeeklyMealPlan;
}

export function WeeklySummaryDashboard({ plan }: WeeklySummaryDashboardProps) {
  const { summary, days } = plan;

  // Calculate additional stats
  const totalTimeHours = Math.round((summary.totalPrepTime + summary.totalCookTime) / 60 * 10) / 10;
  const avgTimePerMeal = summary.totalMeals > 0
    ? Math.round((summary.totalPrepTime + summary.totalCookTime) / summary.totalMeals)
    : 0;

  // Get nutrition grade based on averages
  const getNutritionGrade = (): { grade: string; color: string } => {
    const { avgCalories, avgProtein } = summary.nutritionSummary;
    if (avgCalories >= 300 && avgCalories <= 500 && avgProtein >= 20) {
      return { grade: 'A', color: 'text-green-600' };
    } else if (avgCalories >= 200 && avgCalories <= 600 && avgProtein >= 15) {
      return { grade: 'B', color: 'text-blue-600' };
    } else {
      return { grade: 'C', color: 'text-orange-600' };
    }
  };

  const nutritionGrade = getNutritionGrade();

  return (
    <div className="space-y-6">
      {/* Hero Summary */}
      <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-6 w-6" />
              <h2 className="text-xl font-bold">Your Week at a Glance</h2>
            </div>
            <Badge variant="secondary" className="bg-white/20 text-white border-0">
              {days.length} Days Planned
            </Badge>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-1">
                <Utensils className="h-4 w-4 opacity-80" />
                <span className="text-sm opacity-80">Meals Planned</span>
              </div>
              <p className="text-3xl font-bold">{summary.totalMeals}</p>
            </div>

            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-1">
                <DollarSign className="h-4 w-4 opacity-80" />
                <span className="text-sm opacity-80">Est. Cost</span>
              </div>
              <p className="text-3xl font-bold">${summary.totalCost.toFixed(0)}</p>
            </div>

            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-1">
                <TrendingDown className="h-4 w-4 opacity-80" />
                <span className="text-sm opacity-80">You Save</span>
              </div>
              <p className="text-3xl font-bold">${summary.totalSavings.toFixed(0)}</p>
            </div>

            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="h-4 w-4 opacity-80" />
                <span className="text-sm opacity-80">Total Time</span>
              </div>
              <p className="text-3xl font-bold">{totalTimeHours}h</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Cost Breakdown */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-green-600" />
              Cost Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Grocery Cost</span>
              <span className="font-bold text-lg">${summary.totalCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-green-600">
              <span>Deal Savings</span>
              <span className="font-medium">-${summary.totalSavings.toFixed(2)}</span>
            </div>
            <hr />
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Avg. Cost/Meal</span>
              <span className="font-medium">${summary.averageCostPerMeal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Avg. Cost/Day</span>
              <span className="font-medium">
                ${days.length > 0 ? (summary.totalCost / days.length).toFixed(2) : '0.00'}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Deal Usage */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Tag className="h-4 w-4 text-orange-600" />
              Deal Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center py-2">
              <p className="text-4xl font-bold text-orange-600">{summary.dealPercentage}%</p>
              <p className="text-sm text-gray-500">of meals use deals</p>
            </div>
            <Progress value={summary.dealPercentage} className="h-2" />
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Meals with Deals</span>
              <span className="font-medium">{summary.mealsUsingDeals} of {summary.totalMeals}</span>
            </div>
            <div className="bg-orange-50 rounded-lg p-3 text-center">
              <p className="text-sm text-orange-800">
                You&apos;re saving <strong>${summary.totalSavings.toFixed(2)}</strong> this week!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Time Summary */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-600" />
              Time Investment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-blue-50 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-blue-600">{summary.totalPrepTime}</p>
                <p className="text-xs text-gray-500">min prep</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-purple-600">{summary.totalCookTime}</p>
                <p className="text-xs text-gray-500">min cooking</p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Avg. per meal</span>
              <span className="font-medium">{avgTimePerMeal} min</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total kitchen time</span>
              <span className="font-medium">{totalTimeHours} hours</span>
            </div>
          </CardContent>
        </Card>

        {/* Ingredient Efficiency */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Leaf className="h-4 w-4 text-green-600" />
              Ingredient Efficiency
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-center gap-4 py-2">
              <div className="text-center">
                <p className="text-3xl font-bold text-gray-900">{summary.uniqueIngredients}</p>
                <p className="text-xs text-gray-500">unique items</p>
              </div>
              <div className="text-gray-300">|</div>
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600">{summary.ingredientsReused}</p>
                <p className="text-xs text-gray-500">reused items</p>
              </div>
            </div>
            <div className="bg-green-50 rounded-lg p-3">
              <p className="text-sm text-green-800 text-center">
                {summary.ingredientsReused > 0
                  ? `${summary.ingredientsReused} ingredients used in multiple meals = less waste!`
                  : 'Planning more meals increases ingredient reuse'}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Nutrition Overview */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-purple-600" />
              Nutrition Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Nutrition Score</span>
              <span className={`text-3xl font-bold ${nutritionGrade.color}`}>
                {nutritionGrade.grade}
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Avg. Calories</span>
                <span className="font-medium">{summary.nutritionSummary.avgCalories}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Avg. Protein</span>
                <span className="font-medium">{summary.nutritionSummary.avgProtein}g</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Avg. Carbs</span>
                <span className="font-medium">{summary.nutritionSummary.avgCarbs}g</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Avg. Fat</span>
                <span className="font-medium">{summary.nutritionSummary.avgFat}g</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Goal */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Target className="h-4 w-4 text-indigo-600" />
              This Week&apos;s Goal
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-indigo-50 rounded-lg p-4 text-center">
              <p className="text-lg font-semibold text-indigo-900">
                Set It Once, Shop Once, Cook Stress-Free
              </p>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-green-600">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span>{summary.totalMeals} meals planned</span>
              </div>
              <div className="flex items-center gap-2 text-green-600">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span>{plan.shoppingList.byStore.length} store trips optimized</span>
              </div>
              <div className="flex items-center gap-2 text-green-600">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span>${summary.totalSavings.toFixed(2)} in savings found</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Daily Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-600" />
            Daily Breakdown
          </CardTitle>
          <CardDescription>
            Your meal plan for the week
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {days.map((day) => (
              <div
                key={day.date}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="text-center min-w-[50px]">
                    <p className="text-xs text-gray-500 uppercase">{day.dayName.slice(0, 3)}</p>
                    <p className="text-lg font-bold">{new Date(day.date).getDate()}</p>
                  </div>
                  <div>
                    <p className="font-medium">
                      {day.meals.length} meal{day.meals.length !== 1 ? 's' : ''} planned
                    </p>
                    <p className="text-sm text-gray-500">
                      {day.meals.map(m => m.recipe.name).slice(0, 2).join(', ')}
                      {day.meals.length > 2 && ` +${day.meals.length - 2} more`}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">${day.totalCost.toFixed(2)}</p>
                  {day.totalSavings > 0 && (
                    <Badge variant="secondary" className="bg-orange-100 text-orange-700 text-xs">
                      Save ${day.totalSavings.toFixed(2)}
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
