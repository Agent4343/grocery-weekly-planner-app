import { NextRequest, NextResponse } from 'next/server';
import { 
  analyzeNutritionalContent, 
  getPersonalizedSaleRecommendations, 
  generateMealSuggestions,
  optimizeShoppingList,
  healthGoals,
  currentSales
} from '@/lib/ai-health-services';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, data } = body;

    switch (action) {
      case 'analyze-nutrition':
        const { recipes, healthGoalId } = data;
        const healthGoal = healthGoals.find(g => g.id === healthGoalId);
        const analysis = await analyzeNutritionalContent(recipes, healthGoal);
        return NextResponse.json({ success: true, data: analysis });

      case 'get-sale-recommendations':
        const { healthGoalId: goalId, currentMeals } = data;
        const goal = healthGoals.find(g => g.id === goalId);
        const saleRecommendations = await getPersonalizedSaleRecommendations(goal, currentMeals);
        return NextResponse.json({ success: true, data: saleRecommendations });

      case 'generate-meal-suggestions':
        const { healthGoalId: mealGoalId, availableSales } = data;
        const mealGoal = healthGoals.find(g => g.id === mealGoalId);
        const suggestions = await generateMealSuggestions(mealGoal, availableSales);
        return NextResponse.json({ success: true, data: suggestions });

      case 'optimize-shopping-list':
        const { shoppingList, healthGoalId: optimizeGoalId, budget } = data;
        const optimizeGoal = healthGoals.find(g => g.id === optimizeGoalId);
        const optimization = await optimizeShoppingList(shoppingList, optimizeGoal, budget);
        return NextResponse.json({ success: true, data: optimization });

      case 'get-current-sales':
        return NextResponse.json({ success: true, data: currentSales });

      case 'get-health-goals':
        return NextResponse.json({ success: true, data: healthGoals });

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('AI Health API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    switch (type) {
      case 'sales':
        return NextResponse.json({ success: true, data: currentSales });
      
      case 'health-goals':
        return NextResponse.json({ success: true, data: healthGoals });
      
      default:
        return NextResponse.json({
          success: true,
          data: {
            sales: currentSales,
            healthGoals: healthGoals,
            features: [
              'Nutritional Analysis',
              'Personalized Sale Recommendations',
              'AI Meal Suggestions',
              'Shopping List Optimization'
            ]
          }
        });
    }
  } catch (error) {
    console.error('AI Health API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}