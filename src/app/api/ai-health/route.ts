import { NextRequest, NextResponse } from 'next/server';
import { AIHealthPlannerService } from '@/lib/ai-health-planner';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, profile, preferences } = body;

    const aiService = AIHealthPlannerService.getInstance();

    switch (action) {
      case 'analyze_profile':
        if (!profile) {
          return NextResponse.json(
            { error: 'Health profile is required' },
            { status: 400 }
          );
        }
        
        const recommendations = await aiService.analyzeHealthProfile(profile);
        return NextResponse.json({ recommendations });

      case 'generate_meal_plan':
        if (!profile) {
          return NextResponse.json(
            { error: 'Health profile is required' },
            { status: 400 }
          );
        }

        const sales = await aiService.getCurrentSales();
        const mealPlan = await aiService.generateOptimizedMealPlan(
          profile,
          sales,
          preferences || {}
        );
        
        return NextResponse.json({ mealPlan });

      case 'get_sales':
        const currentSales = await aiService.getCurrentSales();
        return NextResponse.json({ sales: currentSales });

      case 'analyze_nutrition':
        if (!profile) {
          return NextResponse.json(
            { error: 'Health profile is required' },
            { status: 400 }
          );
        }

        const nutritionAnalysis = await aiService.analyzeNutritionalNeeds(profile);
        return NextResponse.json({ nutrition: nutritionAnalysis });

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('AI Health API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const aiService = AIHealthPlannerService.getInstance();
    const sales = await aiService.getCurrentSales();
    
    return NextResponse.json({
      sales,
      totalSales: sales.length,
      flashSales: sales.filter(sale => sale.isFlashSale).length,
      averageDiscount: sales.length > 0 
        ? Math.round(sales.reduce((sum, sale) => sum + sale.discountPercentage, 0) / sales.length)
        : 0,
      totalSavings: sales.reduce((total, sale) => total + (sale.originalPrice - sale.salePrice), 0)
    });
  } catch (error) {
    console.error('AI Health API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sales data' },
      { status: 500 }
    );
  }
}