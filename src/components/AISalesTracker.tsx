"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  TrendingDown, 
  DollarSign, 
  Clock, 
  MapPin, 
  Search,
  AlertTriangle,
  Target,
  Zap,
  ShoppingCart,
  Calendar
} from "lucide-react";
import { useSaleDetection, useSmartShopping } from "@/hooks/useAIFeatures";
import { SaleItem } from "@/lib/ai-services";

export default function AISalesTracker() {
  const {
    sales,
    loading,
    fetchSales,
    getSalesForIngredients: _getSalesForIngredients,
    analyzeSaleTrends
  } = useSaleDetection();

  const {
    optimizedRoute: _optimizedRoute,
    predictPriceChanges: _predictPriceChanges
  } = useSmartShopping();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStore, setSelectedStore] = useState<string>("all");
  const [saleTrends, setSaleTrends] = useState<any>(null);
  const [priceAlerts, setPriceAlerts] = useState<any[]>([]);

  const filteredSales = sales.filter(sale => {
    const matchesSearch = sale.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         sale.ingredientId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStore = selectedStore === "all" || sale.storeType === selectedStore;
    return matchesSearch && matchesStore;
  });

  const totalSavings = filteredSales.reduce((sum, sale) => 
    sum + (sale.originalPrice - sale.salePrice), 0
  );

  const weeklySpecials = sales.filter(sale => sale.isWeeklySpecial);
  const flashSales = sales.filter(sale => !sale.isWeeklySpecial && sale.discountPercentage >= 30);

  useEffect(() => {
    // Generate price alerts for high-discount items
    const alerts = sales
      .filter(sale => sale.discountPercentage >= 25)
      .map(sale => ({
        type: 'high_discount',
        message: `${sale.description} is ${sale.discountPercentage}% off at ${sale.storeName}`,
        urgency: sale.discountPercentage >= 40 ? 'high' : 'medium',
        sale
      }));
    setPriceAlerts(alerts);
  }, [sales]);

  const handleAnalyzeTrends = async (ingredientId: string) => {
    const trends = await analyzeSaleTrends(ingredientId);
    setSaleTrends(trends);
  };

  const getDiscountColor = (percentage: number) => {
    if (percentage >= 40) return "bg-red-100 text-red-800";
    if (percentage >= 25) return "bg-orange-100 text-orange-800";
    return "bg-green-100 text-green-800";
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'border-red-500 bg-red-50';
      case 'medium': return 'border-orange-500 bg-orange-50';
      default: return 'border-green-500 bg-green-50';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center">
            <TrendingDown className="w-6 h-6 mr-2 text-green-600" />
            AI Sales Tracker
          </h2>
          <p className="text-gray-600">
            Smart sale detection and price optimization for Newfoundland stores
          </p>
        </div>

        <div className="flex gap-3">
          <Button 
            onClick={() => fetchSales()}
            disabled={loading}
            variant="outline"
          >
            <Zap className="w-4 h-4 mr-2" />
            Refresh Sales
          </Button>
          <Button className="bg-green-600 hover:bg-green-700">
            <Target className="w-4 h-4 mr-2" />
            Optimize Shopping
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="w-8 h-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Savings</p>
                <p className="text-2xl font-bold text-green-600">${totalSavings.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingDown className="w-8 h-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Sales</p>
                <p className="text-2xl font-bold text-blue-600">{sales.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <AlertTriangle className="w-8 h-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Price Alerts</p>
                <p className="text-2xl font-bold text-orange-600">{priceAlerts.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Clock className="w-8 h-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Flash Sales</p>
                <p className="text-2xl font-bold text-purple-600">{flashSales.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Price Alerts */}
      {priceAlerts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-orange-500" />
              AI Price Alerts
            </CardTitle>
            <CardDescription>
              High-value deals detected by our AI system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {priceAlerts.slice(0, 3).map((alert, index) => (
                <div 
                  key={index} 
                  className={`p-4 border-l-4 rounded-r-lg ${getUrgencyColor(alert.urgency)}`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium">{alert.message}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        Valid until {formatDate(alert.sale.validUntil)}
                      </p>
                    </div>
                    <Badge className={getDiscountColor(alert.sale.discountPercentage)}>
                      {alert.sale.discountPercentage}% OFF
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Search Sales</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search for ingredients or products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant={selectedStore === "all" ? "default" : "outline"}
                onClick={() => setSelectedStore("all")}
                size="sm"
              >
                All Stores
              </Button>
              <Button
                variant={selectedStore === "sobeys" ? "default" : "outline"}
                onClick={() => setSelectedStore("sobeys")}
                size="sm"
              >
                Sobeys
              </Button>
              <Button
                variant={selectedStore === "dominion" ? "default" : "outline"}
                onClick={() => setSelectedStore("dominion")}
                size="sm"
              >
                Dominion
              </Button>
              <Button
                variant={selectedStore === "costco" ? "default" : "outline"}
                onClick={() => setSelectedStore("costco")}
                size="sm"
              >
                Costco
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sales Tabs */}
      <Tabs defaultValue="all-sales" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all-sales">All Sales</TabsTrigger>
          <TabsTrigger value="weekly-specials">Weekly Specials</TabsTrigger>
          <TabsTrigger value="flash-sales">Flash Sales</TabsTrigger>
          <TabsTrigger value="trends">AI Trends</TabsTrigger>
        </TabsList>

        {/* All Sales */}
        <TabsContent value="all-sales" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSales.map((sale) => (
              <SaleCard 
                key={sale.id} 
                sale={sale} 
                onAnalyzeTrends={handleAnalyzeTrends}
              />
            ))}
          </div>
          {filteredSales.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-gray-500">No sales found matching your criteria</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Weekly Specials */}
        <TabsContent value="weekly-specials" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {weeklySpecials.map((sale) => (
              <SaleCard 
                key={sale.id} 
                sale={sale} 
                onAnalyzeTrends={handleAnalyzeTrends}
              />
            ))}
          </div>
        </TabsContent>

        {/* Flash Sales */}
        <TabsContent value="flash-sales" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {flashSales.map((sale) => (
              <SaleCard 
                key={sale.id} 
                sale={sale} 
                onAnalyzeTrends={handleAnalyzeTrends}
              />
            ))}
          </div>
        </TabsContent>

        {/* AI Trends */}
        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Price Trend Analysis</CardTitle>
              <CardDescription>
                Machine learning insights on price patterns and predictions
              </CardDescription>
            </CardHeader>
            <CardContent>
              {saleTrends ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Average Discount</p>
                      <p className="text-2xl font-bold text-blue-600">{saleTrends.averageDiscount}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Sale Frequency</p>
                      <p className="text-lg font-semibold">{saleTrends.saleFrequency}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Best Store</p>
                      <p className="text-lg font-semibold">{saleTrends.bestStore}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Next Sale</p>
                      <p className="text-lg font-semibold">{saleTrends.prediction}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <TrendingDown className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-500 mb-4">Click "Analyze Trends" on any sale item to see AI insights</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Sale Card Component
interface SaleCardProps {
  sale: SaleItem;
  onAnalyzeTrends: (ingredientId: string) => void;
}

function SaleCard({ sale, onAnalyzeTrends }: SaleCardProps) {
  const getDiscountColor = (percentage: number) => {
    if (percentage >= 40) return "bg-red-100 text-red-800";
    if (percentage >= 25) return "bg-orange-100 text-orange-800";
    return "bg-green-100 text-green-800";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{sale.description}</CardTitle>
            <CardDescription className="flex items-center mt-1">
              <MapPin className="w-4 h-4 mr-1" />
              {sale.storeName}
            </CardDescription>
          </div>
          <Badge className={getDiscountColor(sale.discountPercentage)}>
            {sale.discountPercentage}% OFF
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">Original Price</p>
              <p className="text-lg line-through text-gray-500">${sale.originalPrice.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Sale Price</p>
              <p className="text-2xl font-bold text-green-600">${sale.salePrice.toFixed(2)}</p>
            </div>
          </div>

          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center text-gray-600">
              <Calendar className="w-4 h-4 mr-1" />
              Until {formatDate(sale.validUntil)}
            </div>
            <div className="text-green-600 font-medium">
              Save ${(sale.originalPrice - sale.salePrice).toFixed(2)}
            </div>
          </div>

          {sale.quantity && (
            <div className="text-sm text-blue-600 bg-blue-50 p-2 rounded">
              {sale.quantity}
            </div>
          )}

          <div className="flex gap-2 pt-2">
            <Button 
              size="sm" 
              variant="outline" 
              className="flex-1"
              onClick={() => onAnalyzeTrends(sale.ingredientId)}
            >
              <TrendingDown className="w-4 h-4 mr-1" />
              Trends
            </Button>
            <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
              <ShoppingCart className="w-4 h-4 mr-1" />
              Add to List
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}