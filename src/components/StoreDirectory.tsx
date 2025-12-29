"use client";

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Store,
  MapPin,
  Clock,
  CreditCard,
  ExternalLink,
  Search,
  Check,
  Plus
} from 'lucide-react';

import {
  groceryChains,
  extendedStores,
  nlLocations,
  getLocationById,
  ExtendedStore,
  GroceryChain
} from '@/lib/nl-locations';

// Derive regions from locations
const NL_REGIONS = [
  { id: 'avalon', name: 'Avalon Peninsula' },
  { id: 'eastern', name: 'Eastern' },
  { id: 'central', name: 'Central' },
  { id: 'western', name: 'Western' },
  { id: 'labrador', name: 'Labrador' }
];

// Helper to get store region from its location
const getStoreRegion = (store: ExtendedStore): string => {
  const location = getLocationById(store.locationId);
  return location?.region || 'avalon';
};
import { DealItem } from '@/lib/meal-planning-ai';

interface StoreDirectoryProps {
  selectedStores: string[];
  onToggleStore: (storeId: string) => void;
  dealsByStore: Map<string, DealItem[]>;
  onAddDeal: (storeId: string) => void;
}

export function StoreDirectory({
  selectedStores,
  onToggleStore,
  dealsByStore,
  onAddDeal
}: StoreDirectoryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeRegion, setActiveRegion] = useState<string>('all');
  const [activeChain, setActiveChain] = useState<string>('all');

  // Get unique regions
  const regions = useMemo(() => {
    const regionSet = new Set(extendedStores.map(store => getStoreRegion(store)));
    return Array.from(regionSet);
  }, []);

  // Filter stores
  const filteredStores = useMemo(() => {
    return extendedStores.filter(store => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesName = store.name.toLowerCase().includes(query);
        const matchesAddress = store.address.toLowerCase().includes(query);
        const matchesCity = store.city.toLowerCase().includes(query);
        if (!matchesName && !matchesAddress && !matchesCity) return false;
      }

      // Region filter
      if (activeRegion !== 'all' && getStoreRegion(store) !== activeRegion) return false;

      // Chain filter
      if (activeChain !== 'all' && store.type !== activeChain) return false;

      return true;
    });
  }, [searchQuery, activeRegion, activeChain]);

  // Group stores by chain
  const storesByChain = useMemo(() => {
    const grouped = new Map<string, ExtendedStore[]>();
    filteredStores.forEach(store => {
      const existing = grouped.get(store.type) || [];
      existing.push(store);
      grouped.set(store.type, existing);
    });
    return grouped;
  }, [filteredStores]);

  const getChainInfo = (chainType: string): GroceryChain | undefined => {
    return groceryChains.find(c => c.id === chainType);
  };

  const getChainColor = (chainType: string): string => {
    const colors: Record<string, string> = {
      'dominion': 'bg-red-100 text-red-700 border-red-200',
      'atlantic-superstore': 'bg-orange-100 text-orange-700 border-orange-200',
      'sobeys': 'bg-green-100 text-green-700 border-green-200',
      'colemans': 'bg-blue-100 text-blue-700 border-blue-200',
      'walmart': 'bg-blue-100 text-blue-700 border-blue-200',
      'costco': 'bg-red-100 text-red-700 border-red-200',
      'nofrills': 'bg-yellow-100 text-yellow-700 border-yellow-200',
      'foodland': 'bg-green-100 text-green-700 border-green-200',
      'northmart': 'bg-purple-100 text-purple-700 border-purple-200'
    };
    return colors[chainType] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Store className="h-5 w-5 text-green-600" />
            NL Grocery Store Directory
          </CardTitle>
          <CardDescription>
            Browse all grocery stores in Newfoundland & Labrador. Select stores to track deals and build your shopping list.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by store name, address, or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-4">
            {/* Region Filter */}
            <div className="flex-1 min-w-[200px]">
              <p className="text-sm font-medium text-gray-700 mb-2">Region</p>
              <div className="flex flex-wrap gap-1">
                <Button
                  variant={activeRegion === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveRegion('all')}
                >
                  All Regions
                </Button>
                {regions.map(region => (
                  <Button
                    key={region}
                    variant={activeRegion === region ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setActiveRegion(region)}
                  >
                    {NL_REGIONS.find(r => r.id === region)?.name || region}
                  </Button>
                ))}
              </div>
            </div>

            {/* Chain Filter */}
            <div className="flex-1 min-w-[200px]">
              <p className="text-sm font-medium text-gray-700 mb-2">Store Chain</p>
              <div className="flex flex-wrap gap-1">
                <Button
                  variant={activeChain === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveChain('all')}
                >
                  All Chains
                </Button>
                {groceryChains.slice(0, 8).map(chain => (
                  <Button
                    key={chain.id}
                    variant={activeChain === chain.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setActiveChain(chain.id)}
                  >
                    {chain.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>{filteredStores.length} stores found</span>
            <span>{selectedStores.length} stores selected</span>
          </div>
        </CardContent>
      </Card>

      {/* Store Listings by Chain */}
      <Tabs defaultValue="list" className="w-full">
        <TabsList>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="chain">By Chain</TabsTrigger>
        </TabsList>

        {/* List View */}
        <TabsContent value="list" className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredStores.map(store => {
              const isSelected = selectedStores.includes(store.id);
              const chain = getChainInfo(store.type);
              const storeDeals = dealsByStore.get(store.id) || [];

              return (
                <Card
                  key={store.id}
                  className={`transition-all cursor-pointer hover:shadow-md ${
                    isSelected ? 'ring-2 ring-green-500 bg-green-50/50' : ''
                  }`}
                  onClick={() => onToggleStore(store.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge className={getChainColor(store.type)}>
                            {chain?.name || store.type}
                          </Badge>
                          {store.is24Hour && (
                            <Badge variant="outline" className="text-xs">
                              <Clock className="h-3 w-3 mr-1" />
                              24h
                            </Badge>
                          )}
                        </div>
                        <h3 className="font-medium text-gray-900">{store.name}</h3>
                      </div>
                      {isSelected && (
                        <div className="p-1 bg-green-500 rounded-full">
                          <Check className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>

                    <div className="space-y-1 text-sm text-gray-500">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                        <span>{store.address}, {store.city}</span>
                      </div>
                      {chain?.loyaltyProgram && (
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4" />
                          <span>{chain.loyaltyProgram}</span>
                        </div>
                      )}
                    </div>

                    {/* Deals indicator */}
                    <div className="flex items-center justify-between mt-3 pt-3 border-t">
                      {storeDeals.length > 0 ? (
                        <Badge className="bg-orange-100 text-orange-700">
                          {storeDeals.length} active deal{storeDeals.length !== 1 ? 's' : ''}
                        </Badge>
                      ) : (
                        <span className="text-xs text-gray-400">No deals added</span>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddDeal(store.id);
                        }}
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add Deal
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* By Chain View */}
        <TabsContent value="chain" className="space-y-6">
          {Array.from(storesByChain.entries()).map(([chainType, stores]) => {
            const chain = getChainInfo(chainType);

            return (
              <Card key={chainType}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${getChainColor(chainType)}`}>
                        <Store className="h-5 w-5" />
                      </div>
                      <div>
                        <CardTitle>{chain?.name || chainType}</CardTitle>
                        <CardDescription className="flex items-center gap-4">
                          <span>{stores.length} location{stores.length !== 1 ? 's' : ''}</span>
                          {chain?.loyaltyProgram && (
                            <span className="flex items-center gap-1">
                              <CreditCard className="h-3 w-3" />
                              {chain.loyaltyProgram}
                            </span>
                          )}
                        </CardDescription>
                      </div>
                    </div>
                    {chain?.website && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={chain.website} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-1" />
                          Flyer
                        </a>
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {stores.map(store => {
                      const isSelected = selectedStores.includes(store.id);
                      const storeDeals = dealsByStore.get(store.id) || [];

                      return (
                        <div
                          key={store.id}
                          className={`
                            p-3 rounded-lg border cursor-pointer transition-all
                            ${isSelected
                              ? 'bg-green-50 border-green-300'
                              : 'bg-white border-gray-200 hover:border-gray-300'
                            }
                          `}
                          onClick={() => onToggleStore(store.id)}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-sm">{store.name}</span>
                            {isSelected && <Check className="h-4 w-4 text-green-600" />}
                          </div>
                          <p className="text-xs text-gray-500 mb-2">{store.city}</p>
                          <div className="flex items-center justify-between">
                            {storeDeals.length > 0 ? (
                              <Badge variant="secondary" className="text-xs">
                                {storeDeals.length} deals
                              </Badge>
                            ) : (
                              <span className="text-xs text-gray-400">-</span>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 px-2"
                              onClick={(e) => {
                                e.stopPropagation();
                                onAddDeal(store.id);
                              }}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>
      </Tabs>
    </div>
  );
}
