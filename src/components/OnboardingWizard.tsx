"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  MapPin,
  Store,
  Users,
  AlertTriangle,
  DollarSign,
  ChefHat,
  Clock,
  Utensils,
  Search,
  ChevronRight,
  ChevronLeft,
  Check,
  Sparkles
} from 'lucide-react';

import { useUserPreferences } from '@/hooks/useUserPreferences';
import {
  getLocationsWithStores,
  getNearbyStores,
  groceryChains,
  ExtendedStore
} from '@/lib/nl-locations';
import {
  COMMON_ALLERGIES,
  DIETARY_RESTRICTIONS,
  BUDGET_DESCRIPTIONS,
  COOKING_SKILL_DESCRIPTIONS,
  TIME_AVAILABILITY_DESCRIPTIONS,
  MEAL_PREFERENCE_LABELS,
  BudgetLevel,
  CookingSkillLevel,
  MealTimeAvailability,
  MealPreference
} from '@/lib/user-preferences';

interface OnboardingWizardProps {
  onComplete: () => void;
}

export function OnboardingWizard({ onComplete }: OnboardingWizardProps) {
  const {
    preferences,
    onboardingStep,
    updateLocation,
    toggleStore,
    updateMemberCount,
    toggleAllergy,
    toggleRestriction,
    updateBudgetLevel,
    updateCookingSkill,
    updateTimePerMeal,
    toggleMealPreference,
    updateAutoSearchDeals,
    completeOnboarding,
    nextStep,
    previousStep
  } = useUserPreferences();

  const [locationSearch, setLocationSearch] = useState('');
  const [nearbyStores, setNearbyStores] = useState<ExtendedStore[]>([]);

  const steps = [
    { id: 0, title: 'Location', icon: MapPin },
    { id: 1, title: 'Stores', icon: Store },
    { id: 2, title: 'Household', icon: Users },
    { id: 3, title: 'Dietary', icon: AlertTriangle },
    { id: 4, title: 'Preferences', icon: Utensils },
    { id: 5, title: 'Deals', icon: Search }
  ];

  const progress = ((onboardingStep + 1) / steps.length) * 100;

  const locationsWithStores = getLocationsWithStores();
  const filteredLocations = locationSearch
    ? locationsWithStores.filter(loc =>
        loc.name.toLowerCase().includes(locationSearch.toLowerCase())
      )
    : locationsWithStores;

  const handleLocationSelect = (locationId: string, locationName: string) => {
    updateLocation(locationName);
    const stores = getNearbyStores(locationId);
    setNearbyStores(stores);
  };

  const handleComplete = () => {
    completeOnboarding();
    onComplete();
  };

  const canProceed = () => {
    switch (onboardingStep) {
      case 0: return preferences.location.city !== '';
      case 1: return preferences.selectedStores.length > 0;
      case 2: return preferences.household.totalPeople > 0;
      case 3: return true; // Allergies are optional
      case 4: return preferences.mealPreferences.length > 0;
      case 5: return true;
      default: return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="h-8 w-8 text-green-600" />
            <h1 className="text-3xl font-bold text-gray-900">Smart Meal Planner</h1>
          </div>
          <p className="text-gray-600">
            Let&apos;s personalize your meal planning experience
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {steps.map((step) => {
              const Icon = step.icon;
              const isActive = step.id === onboardingStep;
              const isComplete = step.id < onboardingStep;

              return (
                <div
                  key={step.id}
                  className={`flex flex-col items-center ${
                    isActive ? 'text-green-600' : isComplete ? 'text-green-500' : 'text-gray-400'
                  }`}
                >
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center mb-1
                    ${isActive ? 'bg-green-600 text-white' : isComplete ? 'bg-green-100' : 'bg-gray-100'}
                  `}>
                    {isComplete ? <Check className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                  </div>
                  <span className="text-xs hidden sm:block">{step.title}</span>
                </div>
              );
            })}
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step Content */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {(() => {
                const Icon = steps[onboardingStep]?.icon || MapPin;
                return <Icon className="h-5 w-5 text-green-600" />;
              })()}
              {onboardingStep === 0 && "Where are you located?"}
              {onboardingStep === 1 && "Select your grocery stores"}
              {onboardingStep === 2 && "Tell us about your household"}
              {onboardingStep === 3 && "Any dietary considerations?"}
              {onboardingStep === 4 && "What are you looking for?"}
              {onboardingStep === 5 && "Deal hunting preferences"}
            </CardTitle>
            <CardDescription>
              {onboardingStep === 0 && "We'll find the best grocery stores near you"}
              {onboardingStep === 1 && "Choose the stores you shop at regularly"}
              {onboardingStep === 2 && "Help us calculate the right portions"}
              {onboardingStep === 3 && "We'll personalize recipes for your needs"}
              {onboardingStep === 4 && "Tell us your meal planning goals"}
              {onboardingStep === 5 && "We'll find the best deals for you"}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Step 0: Location */}
            {onboardingStep === 0 && (
              <div className="space-y-4">
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Search for your city or town..."
                    value={locationSearch}
                    onChange={(e) => setLocationSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <div className="grid gap-2 max-h-64 overflow-y-auto">
                  {filteredLocations.map((location) => (
                    <button
                      key={location.id}
                      onClick={() => handleLocationSelect(location.id, location.name)}
                      className={`
                        w-full text-left p-3 rounded-lg border transition-colors
                        ${preferences.location.city === location.name
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-green-300 hover:bg-gray-50'
                        }
                      `}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{location.name}</p>
                          <p className="text-sm text-gray-500">{location.region} Region</p>
                        </div>
                        {preferences.location.city === location.name && (
                          <Check className="h-5 w-5 text-green-600" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                {preferences.location.city && (
                  <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                    <Check className="h-5 w-5 text-green-600" />
                    <span className="text-green-800">
                      Selected: <strong>{preferences.location.city}</strong>
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Step 1: Store Selection */}
            {onboardingStep === 1 && (
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  Select all the stores you&apos;d like to include in your meal planning
                </p>

                {/* Store chains */}
                {groceryChains.map((chain) => {
                  const chainStores = nearbyStores.filter(s => s.chainId === chain.id);
                  if (chainStores.length === 0) return null;

                  return (
                    <div key={chain.id} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Store className="h-4 w-4 text-gray-500" />
                        <h3 className="font-medium">{chain.name}</h3>
                        <Badge variant="secondary" className="text-xs">
                          {chain.priceLevel}
                        </Badge>
                      </div>

                      <div className="grid gap-2 pl-6">
                        {chainStores.map((store) => (
                          <label
                            key={store.id}
                            className={`
                              flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors
                              ${preferences.selectedStores.includes(store.id)
                                ? 'border-green-500 bg-green-50'
                                : 'border-gray-200 hover:border-green-300'
                              }
                            `}
                          >
                            <Checkbox
                              checked={preferences.selectedStores.includes(store.id)}
                              onCheckedChange={() => toggleStore(store.id)}
                            />
                            <div className="flex-1">
                              <p className="font-medium text-sm">{store.name}</p>
                              <p className="text-xs text-gray-500">{store.address}, {store.city}</p>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  );
                })}

                {nearbyStores.length === 0 && preferences.location.city && (
                  <p className="text-center text-gray-500 py-4">
                    Loading stores near {preferences.location.city}...
                  </p>
                )}

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Check className="h-4 w-4 text-green-600" />
                  <span>{preferences.selectedStores.length} store(s) selected</span>
                </div>
              </div>
            )}

            {/* Step 2: Household */}
            {onboardingStep === 2 && (
              <div className="space-y-6">
                <p className="text-sm text-gray-600">
                  Tell us who you&apos;re cooking for so we can adjust portions
                </p>

                {[
                  { type: 'adult' as const, label: 'Adults', desc: '18+ years' },
                  { type: 'teen' as const, label: 'Teenagers', desc: '13-17 years' },
                  { type: 'child' as const, label: 'Children', desc: '4-12 years' },
                  { type: 'toddler' as const, label: 'Toddlers', desc: '1-3 years' }
                ].map((memberType) => {
                  const count = preferences.household.members.find(
                    m => m.type === memberType.type
                  )?.count || 0;

                  return (
                    <div key={memberType.type} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{memberType.label}</p>
                        <p className="text-sm text-gray-500">{memberType.desc}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateMemberCount(memberType.type, Math.max(0, count - 1))}
                          disabled={count === 0}
                        >
                          -
                        </Button>
                        <span className="w-8 text-center font-medium">{count}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateMemberCount(memberType.type, count + 1)}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  );
                })}

                <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                  <Users className="h-5 w-5 text-green-600" />
                  <span className="text-green-800">
                    Total household: <strong>{preferences.household.totalPeople} people</strong>
                  </span>
                </div>
              </div>
            )}

            {/* Step 3: Dietary */}
            {onboardingStep === 3 && (
              <div className="space-y-6">
                {/* Allergies */}
                <div className="space-y-3">
                  <Label className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                    Allergies (select any that apply)
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {COMMON_ALLERGIES.map((allergy) => (
                      <Badge
                        key={allergy}
                        variant={preferences.dietaryContext.allergies.includes(allergy) ? "default" : "outline"}
                        className="cursor-pointer transition-colors"
                        onClick={() => toggleAllergy(allergy)}
                      >
                        {allergy}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Dietary Restrictions */}
                <div className="space-y-3">
                  <Label>Dietary Restrictions</Label>
                  <div className="flex flex-wrap gap-2">
                    {DIETARY_RESTRICTIONS.map((restriction) => (
                      <Badge
                        key={restriction}
                        variant={preferences.dietaryContext.restrictions.includes(restriction) ? "default" : "outline"}
                        className="cursor-pointer transition-colors"
                        onClick={() => toggleRestriction(restriction)}
                      >
                        {restriction}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Budget */}
                <div className="space-y-3">
                  <Label className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    Budget Sensitivity
                  </Label>
                  <div className="grid gap-2">
                    {(Object.entries(BUDGET_DESCRIPTIONS) as [BudgetLevel, typeof BUDGET_DESCRIPTIONS[BudgetLevel]][]).map(([level, info]) => (
                      <button
                        key={level}
                        onClick={() => updateBudgetLevel(level)}
                        className={`
                          w-full text-left p-3 rounded-lg border transition-colors
                          ${preferences.dietaryContext.budgetLevel === level
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200 hover:border-green-300'
                          }
                        `}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{info.label}</p>
                            <p className="text-sm text-gray-500">{info.description}</p>
                            <p className="text-xs text-gray-400">{info.weeklyEstimate}</p>
                          </div>
                          {preferences.dietaryContext.budgetLevel === level && (
                            <Check className="h-5 w-5 text-green-600" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Cooking Skill */}
                <div className="space-y-3">
                  <Label className="flex items-center gap-2">
                    <ChefHat className="h-4 w-4 text-purple-600" />
                    Cooking Skill Level
                  </Label>
                  <div className="grid grid-cols-3 gap-2">
                    {(Object.entries(COOKING_SKILL_DESCRIPTIONS) as [CookingSkillLevel, typeof COOKING_SKILL_DESCRIPTIONS[CookingSkillLevel]][]).map(([level, info]) => (
                      <button
                        key={level}
                        onClick={() => updateCookingSkill(level)}
                        className={`
                          p-3 rounded-lg border text-center transition-colors
                          ${preferences.dietaryContext.cookingSkill === level
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200 hover:border-green-300'
                          }
                        `}
                      >
                        <p className="font-medium text-sm">{info.label}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Available */}
                <div className="space-y-3">
                  <Label className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-600" />
                    Time Available Per Meal
                  </Label>
                  <div className="grid grid-cols-3 gap-2">
                    {(Object.entries(TIME_AVAILABILITY_DESCRIPTIONS) as [MealTimeAvailability, typeof TIME_AVAILABILITY_DESCRIPTIONS[MealTimeAvailability]][]).map(([level, info]) => (
                      <button
                        key={level}
                        onClick={() => updateTimePerMeal(level)}
                        className={`
                          p-3 rounded-lg border text-center transition-colors
                          ${preferences.dietaryContext.timePerMeal === level
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200 hover:border-green-300'
                          }
                        `}
                      >
                        <p className="font-medium text-sm">{info.label}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Meal Preferences */}
            {onboardingStep === 4 && (
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  What kind of meal planning experience do you want? (Select all that apply)
                </p>

                <div className="grid gap-3">
                  {(Object.entries(MEAL_PREFERENCE_LABELS) as [MealPreference, typeof MEAL_PREFERENCE_LABELS[MealPreference]][]).map(([pref, info]) => (
                    <label
                      key={pref}
                      className={`
                        flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-colors
                        ${preferences.mealPreferences.includes(pref)
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-green-300'
                        }
                      `}
                    >
                      <Checkbox
                        checked={preferences.mealPreferences.includes(pref)}
                        onCheckedChange={() => toggleMealPreference(pref)}
                      />
                      <div>
                        <p className="font-medium">{info.label}</p>
                        <p className="text-sm text-gray-500">{info.description}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Step 5: Deal Settings */}
            {onboardingStep === 5 && (
              <div className="space-y-6">
                <div className="text-center py-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                    <Search className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Smart Deal Finder</h3>
                  <p className="text-gray-600">
                    We&apos;ll automatically search for the best deals and discounts
                    at your selected stores to maximize your savings.
                  </p>
                </div>

                <label
                  className={`
                    flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-colors
                    ${preferences.autoSearchDeals
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200'
                    }
                  `}
                >
                  <Checkbox
                    checked={preferences.autoSearchDeals}
                    onCheckedChange={(checked) => updateAutoSearchDeals(checked as boolean)}
                  />
                  <div>
                    <p className="font-medium">Enable Smart Deal Search</p>
                    <p className="text-sm text-gray-500">
                      Scan weekly flyers and find the best prices automatically
                    </p>
                  </div>
                </label>

                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <h4 className="font-medium">Your Settings Summary:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>Location: <strong>{preferences.location.city}</strong></li>
                    <li>Stores: <strong>{preferences.selectedStores.length} selected</strong></li>
                    <li>Household: <strong>{preferences.household.totalPeople} people</strong></li>
                    <li>Budget: <strong>{BUDGET_DESCRIPTIONS[preferences.dietaryContext.budgetLevel].label}</strong></li>
                    <li>Preferences: <strong>{preferences.mealPreferences.length} selected</strong></li>
                  </ul>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between pt-4 border-t">
              <Button
                variant="outline"
                onClick={previousStep}
                disabled={onboardingStep === 0}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back
              </Button>

              {onboardingStep < 5 ? (
                <Button
                  onClick={nextStep}
                  disabled={!canProceed()}
                >
                  Continue
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              ) : (
                <Button
                  onClick={handleComplete}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Start Planning
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          You can change these settings anytime from your profile
        </p>
      </div>
    </div>
  );
}
