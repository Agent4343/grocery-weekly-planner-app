"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  TrendingDown,
  MapPin,
  Clock,
  Search,
  Bell,
  Star,
  ShoppingCart
} from "lucide-react";
import { currentSales, type SaleItem } from "@/lib/ai-health-services";
import { newfoundlandStores } from "@/lib/stores";

export default function SalesTracker() {
  const [filteredSales, setFilteredSales] = useState<SaleItem[]>(currentSales);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStore, setSelectedStore] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [savedSales, setSavedSales] = useState<string[]>([]);

  useEffect(() => {
    filterSales();
  }, [searchQuery, selectedStore, selectedCategory]);

  const filterSales = () => {
    let filtered = [...currentSales];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(sale =>
        sale.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sale.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by store
    if (selectedStore !== "all") {
      filtered = filtered.filter(sale => sale.storeType === selectedStore);
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(sale => sale.category === selectedCategory);
    }

    // Sort by discount percentage
    filtered.sort((a, b) => b.discount - a.discount);

    setFilteredSales(filtered);
  };

  const toggleSavedSale = (saleId: string) => {
    setSavedSales(prev => 
      prev.includes(saleId) 
        ? prev.filter(id => id !== saleId)
        : [...prev, saleId]
    );
  };

  const categories = [...new Set(currentSales.map(sale => sale.category))];
  const storeTypes = ["sobeys", "dominion", "costco"];

  const getTotalSavings = () => {
    return filteredSales.reduce((total, sale) => 
      total + (sale.originalPrice - sale.salePrice), 0
    );
  };

  const getStoreInfo = (storeType: string, storeName: string) => {
    return newfoundlandStores.find(store => 
      store.type === storeType && store.name === storeName
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center">
            <TrendingDown className="w-6 h-6 mr-2 text-green-600" />
            Live Sales Tracker
          </h2>
          <p className="text-gray-600">
            Real-time deals from Sobeys, Dominion, and Costco across Newfoundland
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <Badge variant="secondary" className="px-3 py-1">
            {filteredSales.length} Active Deals
          </Badge>
          <Badge variant="secondary" className="px-3 py-1">
            ${getTotalSavings().toFixed(2)} Total Savings
          </Badge>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Search className="w-5 h-5 mr-2" />
            Find Deals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <Input
                placeholder="Search for products or categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            
            <div>
              <select
                value={selectedStore}
                onChange={(e) => setSelectedStore(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="all">All Stores</option>
                {storeTypes.map(store => (
                  <option key={store} value={store}>
                    {store.charAt(0).toUpperCase() + store.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sales Grid */}
      <Tabs defaultValue="grid" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="grid">Grid View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="saved">Saved Deals ({savedSales.length})</TabsTrigger>
        </TabsList>

        {/* Grid View */}
        <TabsContent value="grid" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSales.map((sale) => {
              const storeInfo = getStoreInfo(sale.storeType, sale.storeName);
              const isSaved = savedSales.includes(sale.id);
              
              return (
                <Card key={sale.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{sale.description}</CardTitle>
                        <CardDescription className="flex items-center mt-1">
                          <MapPin className="w-4 h-4 mr-1" />
                          {sale.storeName}
                        </CardDescription>
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
                    <div className="space-y-4">
                      {/* Price Display */}
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-2xl font-bold text-green-600">
                            ${sale.salePrice}
                          </span>
                          <span className="ml-2 text-sm line-through text-gray-500">
                            ${sale.originalPrice}
                          </span>
                        </div>
                        <Badge variant="destructive" className="text-lg px-3 py-1">
                          {sale.discount}% OFF
                        </Badge>
                      </div>

                      {/* Category and Expiry */}
                      <div className="flex justify-between items-center">
                        <Badge variant="outline" className="text-xs">
                          {sale.category}
                        </Badge>
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="w-3 h-3 mr-1" />
                          Until {new Date(sale.validUntil).toLocaleDateString()}
                        </div>
                      </div>

                      {/* Store Info */}
                      {storeInfo && (
                        <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                          <p>{storeInfo.address}, {storeInfo.city}</p>
                          <p>Hours: {storeInfo.hours.monday}</p>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex space-x-2">
                        <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
                          <ShoppingCart className="w-4 h-4 mr-1" />
                          Add to List
                        </Button>
                        <Button variant="outline" size="sm">
                          <Bell className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* List View */}
        <TabsContent value="list" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {filteredSales.map((sale) => {
                  const isSaved = savedSales.includes(sale.id);
                  
                  return (
                    <div key={sale.id} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-4">
                            <div className="flex-1">
                              <h3 className="font-semibold">{sale.description}</h3>
                              <p className="text-sm text-gray-600 flex items-center">
                                <MapPin className="w-3 h-3 mr-1" />
                                {sale.storeName}
                              </p>
                            </div>
                            
                            <div className="text-center">
                              <Badge variant="outline" className="text-xs mb-1">
                                {sale.category}
                              </Badge>
                              <p className="text-xs text-gray-500">
                                Until {new Date(sale.validUntil).toLocaleDateString()}
                              </p>
                            </div>
                            
                            <div className="text-right">
                              <div className="flex items-center space-x-2">
                                <span className="text-lg font-bold text-green-600">
                                  ${sale.salePrice}
                                </span>
                                <span className="text-sm line-through text-gray-500">
                                  ${sale.originalPrice}
                                </span>
                              </div>
                              <Badge variant="destructive" className="text-xs">
                                {sale.discount}% OFF
                              </Badge>
                            </div>
                            
                            <div className="flex space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleSavedSale(sale.id)}
                                className={isSaved ? "text-yellow-500" : "text-gray-400"}
                              >
                                <Star className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`} />
                              </Button>
                              <Button size="sm" variant="outline">
                                <ShoppingCart className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Saved Deals */}
        <TabsContent value="saved" className="space-y-4">
          {savedSales.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Star className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No saved deals yet</p>
                <p className="text-sm text-gray-500">Click the star icon on any deal to save it</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentSales
                .filter(sale => savedSales.includes(sale.id))
                .map((sale) => (
                  <Card key={sale.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{sale.description}</CardTitle>
                          <CardDescription className="flex items-center mt-1">
                            <MapPin className="w-4 h-4 mr-1" />
                            {sale.storeName}
                          </CardDescription>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleSavedSale(sale.id)}
                          className="text-yellow-500"
                        >
                          <Star className="w-4 h-4 fill-current" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <span className="text-2xl font-bold text-green-600">
                            ${sale.salePrice}
                          </span>
                          <span className="ml-2 text-sm line-through text-gray-500">
                            ${sale.originalPrice}
                          </span>
                        </div>
                        <Badge variant="destructive" className="text-lg px-3 py-1">
                          {sale.discount}% OFF
                        </Badge>
                      </div>
                      
                      <Button size="sm" className="w-full bg-green-600 hover:bg-green-700">
                        <ShoppingCart className="w-4 h-4 mr-1" />
                        Add to Shopping List
                      </Button>
                    </CardContent>
                  </Card>
                ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}