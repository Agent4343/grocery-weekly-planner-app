"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tag,
  Plus,
  Trash2,
  Zap,
  DollarSign,
  Calendar,
  Pencil,
  Download,
  RefreshCw,
  Clock
} from 'lucide-react';

import { DealItem } from '@/lib/meal-planning-ai';
import { extendedStores, getStoreById } from '@/lib/nl-locations';
import { ingredientsDatabase } from '@/lib/ingredients';
import { fetchWeeklyDeals, getDealsFreshness } from '@/lib/deal-fetcher';

interface DealsManagerProps {
  deals: DealItem[];
  onAddDeal: (deal: Omit<DealItem, 'id'>) => void;
  onUpdateDeal: (dealId: string, updates: Partial<DealItem>) => void;
  onRemoveDeal: (dealId: string) => void;
  onClearAll: () => void;
  onImportDeals?: (deals: Omit<DealItem, 'id'>[]) => void;
  selectedStores?: string[];
  preselectedStoreId?: string;
  lastFetchedAt?: string;
}

const DEAL_CATEGORIES = [
  'Produce',
  'Meat',
  'Poultry',
  'Seafood',
  'Dairy',
  'Bakery',
  'Frozen',
  'Pantry',
  'Beverages',
  'Snacks',
  'Condiments',
  'Baking',
  'Deli',
  'Other'
];

export function DealsManager({
  deals,
  onAddDeal,
  onUpdateDeal,
  onRemoveDeal,
  onClearAll,
  onImportDeals,
  selectedStores = [],
  preselectedStoreId,
  lastFetchedAt
}: DealsManagerProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(!!preselectedStoreId);
  const [editingDeal, setEditingDeal] = useState<DealItem | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Fetch deals from stores
  const handleFetchDeals = async () => {
    if (selectedStores.length === 0) {
      setFetchError('Please select stores in the Stores tab first');
      return;
    }

    setIsFetching(true);
    setFetchError(null);

    try {
      const result = await fetchWeeklyDeals(selectedStores);

      if (result.deals.length > 0 && onImportDeals) {
        // Clear existing fetched deals and import new ones
        onClearAll();
        onImportDeals(result.deals);
      }
    } catch (error) {
      console.error('Error fetching deals:', error);
      setFetchError('Failed to fetch deals. Please try again.');
    } finally {
      setIsFetching(false);
    }
  };

  // Form state
  const [formData, setFormData] = useState({
    ingredientId: '',
    ingredientName: '',
    storeId: preselectedStoreId || '',
    originalPrice: '',
    salePrice: '',
    quantity: '',
    category: '',
    isFlashSale: false,
    validDays: '7'
  });

  const resetForm = () => {
    setFormData({
      ingredientId: '',
      ingredientName: '',
      storeId: preselectedStoreId || '',
      originalPrice: '',
      salePrice: '',
      quantity: '',
      category: '',
      isFlashSale: false,
      validDays: '7'
    });
    setEditingDeal(null);
  };

  const handleSubmit = () => {
    const store = getStoreById(formData.storeId);
    if (!store) return;

    const originalPrice = parseFloat(formData.originalPrice);
    const salePrice = parseFloat(formData.salePrice);
    const validDays = parseInt(formData.validDays);

    const discountPercentage = Math.round(((originalPrice - salePrice) / originalPrice) * 100);

    const dealData: Omit<DealItem, 'id'> = {
      ingredientId: formData.ingredientId || formData.ingredientName.toLowerCase().replace(/\s+/g, '-'),
      ingredientName: formData.ingredientName,
      storeId: formData.storeId,
      storeName: store.name,
      originalPrice,
      salePrice,
      discountPercentage,
      validFrom: new Date().toISOString(),
      validUntil: new Date(Date.now() + validDays * 24 * 60 * 60 * 1000).toISOString(),
      quantity: formData.quantity,
      isFlashSale: formData.isFlashSale,
      category: formData.category
    };

    if (editingDeal) {
      onUpdateDeal(editingDeal.id, dealData);
    } else {
      onAddDeal(dealData);
    }

    resetForm();
    setIsAddDialogOpen(false);
  };

  const startEditing = (deal: DealItem) => {
    setFormData({
      ingredientId: deal.ingredientId,
      ingredientName: deal.ingredientName,
      storeId: deal.storeId,
      originalPrice: deal.originalPrice.toString(),
      salePrice: deal.salePrice.toString(),
      quantity: deal.quantity,
      category: deal.category,
      isFlashSale: deal.isFlashSale,
      validDays: '7'
    });
    setEditingDeal(deal);
    setIsAddDialogOpen(true);
  };

  const getDaysRemaining = (validUntil: string): number => {
    const now = new Date();
    const end = new Date(validUntil);
    const diff = end.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  // Group deals by store
  const dealsByStore = deals.reduce((acc, deal) => {
    if (!acc[deal.storeId]) {
      acc[deal.storeId] = [];
    }
    acc[deal.storeId].push(deal);
    return acc;
  }, {} as Record<string, DealItem[]>);

  const totalSavings = deals.reduce((sum, deal) =>
    sum + (deal.originalPrice - deal.salePrice), 0
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Tag className="h-5 w-5 text-orange-600" />
                Manage Deals & Sales
              </CardTitle>
              <CardDescription>
                Fetch weekly deals automatically or add them manually
              </CardDescription>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant="default"
                className="bg-green-600 hover:bg-green-700"
                onClick={handleFetchDeals}
                disabled={isFetching || selectedStores.length === 0}
              >
                {isFetching ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Download className="h-4 w-4 mr-2" />
                )}
                {isFetching ? 'Fetching...' : "Fetch This Week's Deals"}
              </Button>
              {deals.length > 0 && (
                <Button variant="outline" size="sm" onClick={onClearAll}>
                  <Trash2 className="h-4 w-4 mr-1" />
                  Clear All
                </Button>
              )}
              <Button variant="outline" onClick={() => setIsAddDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-1" />
                Add Manual
              </Button>
            </div>
          </div>
          {/* Fetch status */}
          {lastFetchedAt && (
            <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
              <Clock className="h-4 w-4" />
              Last updated: {getDealsFreshness(lastFetchedAt)}
            </div>
          )}
          {fetchError && (
            <div className="mt-2 p-2 bg-red-50 text-red-600 text-sm rounded-lg">
              {fetchError}
            </div>
          )}
          {selectedStores.length === 0 && (
            <div className="mt-2 p-2 bg-yellow-50 text-yellow-700 text-sm rounded-lg">
              Select stores in the Stores tab to fetch their weekly deals
            </div>
          )}
        </CardHeader>
        <CardContent>
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-blue-600">{deals.length}</p>
              <p className="text-sm text-gray-600">Active Deals</p>
            </div>
            <div className="bg-orange-50 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-orange-600">
                {deals.filter(d => d.isFlashSale).length}
              </p>
              <p className="text-sm text-gray-600">Flash Sales</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-green-600">
                ${totalSavings.toFixed(2)}
              </p>
              <p className="text-sm text-gray-600">Potential Savings</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Deals List */}
      {deals.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Tag className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No deals added yet</h3>
            <p className="text-gray-500 mb-4">
              Add current sales from your local grocery store flyers to get personalized savings recommendations.
            </p>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-1" />
              Add Your First Deal
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {Object.entries(dealsByStore).map(([storeId, storeDeals]) => {
            const store = getStoreById(storeId);

            return (
              <Card key={storeId}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{store?.name || storeId}</CardTitle>
                  <CardDescription>{storeDeals.length} active deals</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {storeDeals.map(deal => {
                      const daysRemaining = getDaysRemaining(deal.validUntil);

                      return (
                        <div
                          key={deal.id}
                          className={`
                            p-4 rounded-lg border
                            ${deal.isFlashSale
                              ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-orange-200'
                              : 'bg-white border-gray-200'
                            }
                          `}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Badge className="bg-green-100 text-green-700">
                                {deal.discountPercentage}% OFF
                              </Badge>
                              {deal.isFlashSale && (
                                <Zap className="h-4 w-4 text-yellow-500" />
                              )}
                            </div>
                            <div className="flex gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => startEditing(deal)}
                              >
                                <Pencil className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                                onClick={() => onRemoveDeal(deal.id)}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>

                          <h4 className="font-medium">{deal.ingredientName}</h4>
                          <p className="text-xs text-gray-500 mb-2">{deal.quantity}</p>

                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-green-600">
                              ${deal.salePrice.toFixed(2)}
                            </span>
                            <span className="text-sm text-gray-400 line-through">
                              ${deal.originalPrice.toFixed(2)}
                            </span>
                          </div>

                          <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                            <Calendar className="h-3 w-3" />
                            {daysRemaining > 0 ? (
                              <span>{daysRemaining} day{daysRemaining !== 1 ? 's' : ''} left</span>
                            ) : (
                              <span className="text-red-500">Expired</span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Add/Edit Deal Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={(open) => {
        setIsAddDialogOpen(open);
        if (!open) resetForm();
      }}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingDeal ? 'Edit Deal' : 'Add New Deal'}
            </DialogTitle>
            <DialogDescription>
              Enter the deal details from your grocery store flyer
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Store Selection */}
            <div className="space-y-2">
              <Label>Store</Label>
              <Select
                value={formData.storeId}
                onValueChange={(value) => setFormData(prev => ({ ...prev, storeId: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a store" />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  {extendedStores.slice(0, 30).map(store => (
                    <SelectItem key={store.id} value={store.id}>
                      {store.name} - {store.city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Product Name */}
            <div className="space-y-2">
              <Label>Product Name</Label>
              <Input
                placeholder="e.g., Chicken Breast"
                value={formData.ingredientName}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  ingredientName: e.target.value
                }))}
              />
              {/* Suggest from existing ingredients */}
              {formData.ingredientName && (
                <div className="flex flex-wrap gap-1">
                  {ingredientsDatabase
                    .filter(ing =>
                      ing.name.toLowerCase().includes(formData.ingredientName.toLowerCase())
                    )
                    .slice(0, 5)
                    .map(ing => (
                      <Button
                        key={ing.id}
                        variant="outline"
                        size="sm"
                        className="h-6 text-xs"
                        onClick={() => setFormData(prev => ({
                          ...prev,
                          ingredientId: ing.id,
                          ingredientName: ing.name,
                          category: ing.category
                        }))}
                      >
                        {ing.name}
                      </Button>
                    ))
                  }
                </div>
              )}
            </div>

            {/* Quantity */}
            <div className="space-y-2">
              <Label>Quantity/Size</Label>
              <Input
                placeholder="e.g., per lb, 500g, 12-pack"
                value={formData.quantity}
                onChange={(e) => setFormData(prev => ({ ...prev, quantity: e.target.value }))}
              />
            </div>

            {/* Prices */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Regular Price ($)</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData(prev => ({ ...prev, originalPrice: e.target.value }))}
                    className="pl-8"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Sale Price ($)</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={formData.salePrice}
                    onChange={(e) => setFormData(prev => ({ ...prev, salePrice: e.target.value }))}
                    className="pl-8"
                  />
                </div>
              </div>
            </div>

            {/* Show calculated discount */}
            {formData.originalPrice && formData.salePrice && (
              <div className="bg-green-50 rounded-lg p-3 text-center">
                <span className="text-2xl font-bold text-green-600">
                  {Math.round(((parseFloat(formData.originalPrice) - parseFloat(formData.salePrice)) / parseFloat(formData.originalPrice)) * 100)}% OFF
                </span>
                <span className="text-sm text-gray-500 ml-2">
                  (Save ${(parseFloat(formData.originalPrice) - parseFloat(formData.salePrice)).toFixed(2)})
                </span>
              </div>
            )}

            {/* Category */}
            <div className="space-y-2">
              <Label>Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {DEAL_CATEGORIES.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Valid Days */}
            <div className="space-y-2">
              <Label>Valid for (days)</Label>
              <Select
                value={formData.validDays}
                onValueChange={(value) => setFormData(prev => ({ ...prev, validDays: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 day</SelectItem>
                  <SelectItem value="3">3 days</SelectItem>
                  <SelectItem value="7">7 days (week)</SelectItem>
                  <SelectItem value="14">14 days</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Flash Sale */}
            <div className="flex items-center gap-2">
              <Checkbox
                id="flashSale"
                checked={formData.isFlashSale}
                onCheckedChange={(checked) =>
                  setFormData(prev => ({ ...prev, isFlashSale: checked as boolean }))
                }
              />
              <Label htmlFor="flashSale" className="flex items-center gap-2 cursor-pointer">
                <Zap className="h-4 w-4 text-yellow-500" />
                Flash Sale / Limited Time Offer
              </Label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!formData.storeId || !formData.ingredientName || !formData.originalPrice || !formData.salePrice}
            >
              {editingDeal ? 'Update Deal' : 'Add Deal'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
