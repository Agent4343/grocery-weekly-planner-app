"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Store,
  ShoppingCart,
  Check,
  Tag,
  Copy,
  Download
} from 'lucide-react';

import { SmartShoppingList, StoreShoppingList, SmartShoppingItem } from '@/lib/meal-planning-ai';

interface SmartGroceryListProps {
  shoppingList: SmartShoppingList;
}

export function SmartGroceryList({ shoppingList }: SmartGroceryListProps) {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [activeStore, setActiveStore] = useState<string>(
    shoppingList.byStore[0]?.storeId || ''
  );

  const toggleItem = (itemId: string) => {
    setCheckedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const clearChecked = () => {
    setCheckedItems(new Set());
  };

  const checkAll = (storeId: string) => {
    const store = shoppingList.byStore.find(s => s.storeId === storeId);
    if (store) {
      const newSet = new Set(checkedItems);
      store.items.forEach(item => {
        newSet.add(`${storeId}-${item.ingredientId}`);
      });
      setCheckedItems(newSet);
    }
  };

  const getStoreProgress = (store: StoreShoppingList): number => {
    const checkedCount = store.items.filter(item =>
      checkedItems.has(`${store.storeId}-${item.ingredientId}`)
    ).length;
    return store.items.length > 0 ? (checkedCount / store.items.length) * 100 : 0;
  };

  const copyListToClipboard = () => {
    const text = shoppingList.byStore
      .map(store => {
        const items = store.items
          .map(item => `  [ ] ${item.amount} ${item.unit} ${item.ingredientName}`)
          .join('\n');
        return `${store.storeName}:\n${items}`;
      })
      .join('\n\n');

    navigator.clipboard.writeText(text);
  };

  const exportList = () => {
    const data = {
      generatedAt: new Date().toISOString(),
      totalItems: shoppingList.totalItems,
      totalCost: shoppingList.totalCost,
      totalSavings: shoppingList.totalSavings,
      stores: shoppingList.byStore.map(store => ({
        name: store.storeName,
        items: store.items.map(item => ({
          name: item.ingredientName,
          amount: item.amount,
          unit: item.unit,
          category: item.category,
          price: item.bestPrice,
          isOnSale: item.isOnSale
        })),
        total: store.totalCost
      }))
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `shopping-list-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  const groupItemsByCategory = (items: SmartShoppingItem[]) => {
    const groups: Record<string, SmartShoppingItem[]> = {};
    items.forEach(item => {
      if (!groups[item.category]) {
        groups[item.category] = [];
      }
      groups[item.category].push(item);
    });
    return groups;
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-green-600" />
              Smart Shopping List
            </CardTitle>
            <CardDescription>
              Organized by store for efficient shopping
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={copyListToClipboard}>
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
            <Button variant="outline" size="sm" onClick={exportList}>
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-gray-900">{shoppingList.totalItems}</p>
            <p className="text-sm text-gray-500">Total Items</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-gray-900">{shoppingList.byStore.length}</p>
            <p className="text-sm text-gray-500">Store Trips</p>
          </div>
          <div className="bg-green-50 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-green-600">${shoppingList.totalCost.toFixed(2)}</p>
            <p className="text-sm text-gray-500">Total Cost</p>
          </div>
          <div className="bg-orange-50 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-orange-600">${shoppingList.totalSavings.toFixed(2)}</p>
            <p className="text-sm text-gray-500">You Save</p>
          </div>
        </div>

        {/* Tabs for each store */}
        <Tabs value={activeStore} onValueChange={setActiveStore}>
          <TabsList className="w-full flex flex-wrap h-auto gap-1 bg-gray-100 p-1">
            {shoppingList.byStore.map((store) => {
              const progress = getStoreProgress(store);
              return (
                <TabsTrigger
                  key={store.storeId}
                  value={store.storeId}
                  className="flex-1 min-w-fit data-[state=active]:bg-white relative"
                >
                  <div className="flex items-center gap-2">
                    <Store className="h-4 w-4" />
                    <span className="hidden sm:inline">{store.storeName.split(' ')[0]}</span>
                    <Badge variant="secondary" className="text-xs">
                      {store.itemCount}
                    </Badge>
                  </div>
                  {progress > 0 && progress < 100 && (
                    <div
                      className="absolute bottom-0 left-0 h-0.5 bg-green-500 transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  )}
                  {progress === 100 && (
                    <Check className="h-4 w-4 text-green-600 ml-1" />
                  )}
                </TabsTrigger>
              );
            })}
          </TabsList>

          {shoppingList.byStore.map((store) => {
            const categoryGroups = groupItemsByCategory(store.items);

            return (
              <TabsContent key={store.storeId} value={store.storeId} className="mt-4">
                {/* Store Header */}
                <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-full shadow-sm">
                      <Store className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{store.storeName}</h3>
                      <p className="text-sm text-gray-500">
                        {store.itemCount} items | ${store.totalCost.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => checkAll(store.storeId)}
                    >
                      Check All
                    </Button>
                    {store.totalSavings > 0 && (
                      <Badge className="bg-orange-100 text-orange-700">
                        Save ${store.totalSavings.toFixed(2)}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Items by Category */}
                <Accordion type="multiple" defaultValue={Object.keys(categoryGroups)} className="space-y-2">
                  {Object.entries(categoryGroups).map(([category, items]) => (
                    <AccordionItem key={category} value={category} className="border rounded-lg px-4">
                      <AccordionTrigger className="hover:no-underline py-3">
                        <div className="flex items-center justify-between w-full pr-4">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{category}</span>
                            <Badge variant="outline" className="text-xs">
                              {items.length}
                            </Badge>
                          </div>
                          <span className="text-sm text-gray-500">
                            ${items.reduce((sum, i) => sum + i.bestPrice, 0).toFixed(2)}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 pb-2">
                          {items.map((item) => {
                            const itemId = `${store.storeId}-${item.ingredientId}`;
                            const isChecked = checkedItems.has(itemId);

                            return (
                              <label
                                key={item.ingredientId}
                                className={`
                                  flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all
                                  ${isChecked
                                    ? 'bg-green-50 border-green-200 opacity-60'
                                    : 'bg-white border-gray-100 hover:border-gray-200'
                                  }
                                `}
                              >
                                <Checkbox
                                  checked={isChecked}
                                  onCheckedChange={() => toggleItem(itemId)}
                                />
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <p className={`font-medium ${isChecked ? 'line-through text-gray-400' : ''}`}>
                                      {item.ingredientName}
                                    </p>
                                    {item.isOnSale && (
                                      <Badge className="bg-orange-100 text-orange-700 text-xs">
                                        <Tag className="h-3 w-3 mr-1" />
                                        SALE
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="text-sm text-gray-500">
                                    {item.amount} {item.unit}
                                    {item.recipeNames.length > 0 && (
                                      <span className="text-gray-400">
                                        {' '}| For: {item.recipeNames.slice(0, 2).join(', ')}
                                        {item.recipeNames.length > 2 && ` +${item.recipeNames.length - 2} more`}
                                      </span>
                                    )}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="font-medium">${item.bestPrice.toFixed(2)}</p>
                                  {item.savings > 0 && (
                                    <p className="text-xs text-orange-600">
                                      Save ${item.savings.toFixed(2)}
                                    </p>
                                  )}
                                </div>
                              </label>
                            );
                          })}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </TabsContent>
            );
          })}
        </Tabs>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="text-sm text-gray-500">
            {checkedItems.size} of {shoppingList.totalItems} items checked
          </div>
          <Button variant="ghost" size="sm" onClick={clearChecked}>
            Clear Checked
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
