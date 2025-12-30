"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Mail,
  RefreshCw,
  Copy,
  Check,
  Star,
  Zap,
  TrendingDown,
  TrendingUp,
  Minus,
  ChefHat,
  Lightbulb,
  Calendar,
  Store,
  DollarSign,
  Clock,
  FileText,
  Archive,
  Trash2,
} from 'lucide-react';
import { Newsletter, FeaturedDeal, DealCategory, PriceTrend, RecipeSuggestion } from '@/lib/newsletter-types';
import { exportNewsletterAsText } from '@/lib/newsletter-generator';

interface NewsletterViewProps {
  newsletter: Newsletter | null;
  newsletters: Newsletter[];
  isGenerating: boolean;
  onGenerate: () => void;
  onSelectNewsletter: (id: string) => void;
  onDeleteNewsletter: (id: string) => void;
}

export function NewsletterView({
  newsletter,
  newsletters,
  isGenerating,
  onGenerate,
  onSelectNewsletter,
  onDeleteNewsletter,
}: NewsletterViewProps) {
  const [copied, setCopied] = useState(false);
  const [showArchive, setShowArchive] = useState(false);

  const handleCopyNewsletter = async () => {
    if (!newsletter) return;

    const text = exportNewsletterAsText(newsletter);
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-CA', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (!newsletter && newsletters.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-4 bg-primary/10 rounded-full w-fit">
            <Mail className="h-8 w-8 text-primary" />
          </div>
          <CardTitle>NL Grocery Deals Newsletter</CardTitle>
          <CardDescription>
            Generate your first AI-curated newsletter with the best grocery deals across Newfoundland & Labrador
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <Button onClick={onGenerate} disabled={isGenerating} size="lg">
            {isGenerating ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Mail className="mr-2 h-4 w-4" />
                Generate Newsletter
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header Actions */}
      <div className="flex flex-wrap gap-2 justify-between items-center">
        <div className="flex gap-2">
          <Button onClick={onGenerate} disabled={isGenerating}>
            {isGenerating ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                New Edition
              </>
            )}
          </Button>
          {newsletters.length > 1 && (
            <Button variant="outline" onClick={() => setShowArchive(true)}>
              <Archive className="mr-2 h-4 w-4" />
              Archive ({newsletters.length})
            </Button>
          )}
        </div>
        {newsletter && (
          <Button variant="outline" onClick={handleCopyNewsletter}>
            {copied ? (
              <>
                <Check className="mr-2 h-4 w-4 text-green-600" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="mr-2 h-4 w-4" />
                Copy as Text
              </>
            )}
          </Button>
        )}
      </div>

      {/* Newsletter Content */}
      {newsletter && (
        <Card className="overflow-hidden">
          {/* Newsletter Header */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6">
            <div className="flex items-center gap-2 mb-2">
              <Mail className="h-6 w-6" />
              <span className="font-semibold text-lg">{newsletter.title}</span>
            </div>
            <p className="text-green-100 text-sm mb-2">{newsletter.subtitle}</p>
            <div className="flex flex-wrap gap-3 text-sm text-green-100">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {newsletter.edition}
              </span>
              <span className="flex items-center gap-1">
                <Store className="h-4 w-4" />
                {newsletter.storesIncluded.length} stores
              </span>
              <span className="flex items-center gap-1">
                <DollarSign className="h-4 w-4" />
                ${newsletter.totalPotentialSavings.toFixed(2)} in savings
              </span>
            </div>
          </div>

          <CardContent className="p-0">
            <Tabs defaultValue="featured" className="w-full">
              <TabsList className="w-full justify-start rounded-none border-b px-4">
                <TabsTrigger value="featured">Featured</TabsTrigger>
                <TabsTrigger value="categories">By Category</TabsTrigger>
                <TabsTrigger value="recipes">Recipes</TabsTrigger>
                <TabsTrigger value="tips">Tips & Trends</TabsTrigger>
              </TabsList>

              {/* Featured Tab */}
              <TabsContent value="featured" className="p-4 space-y-4">
                <div className="prose prose-sm max-w-none">
                  <p className="text-muted-foreground italic">{newsletter.greeting}</p>
                  <p className="font-medium text-lg">{newsletter.heroMessage}</p>
                </div>

                {/* Top Deal */}
                {newsletter.topDeal && (
                  <TopDealCard deal={newsletter.topDeal} />
                )}

                {/* Featured Deals Grid */}
                {newsletter.featuredDeals.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      More Featured Deals
                    </h3>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {newsletter.featuredDeals.map((fd) => (
                        <FeaturedDealCard key={fd.deal.id} featured={fd} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Closing Message */}
                <div className="pt-4 border-t">
                  <p className="text-muted-foreground italic text-center">
                    {newsletter.closingMessage}
                  </p>
                </div>
              </TabsContent>

              {/* Categories Tab */}
              <TabsContent value="categories" className="p-4">
                <ScrollArea className="h-[500px]">
                  <Accordion type="multiple" className="w-full" defaultValue={newsletter.categories.slice(0, 2).map(c => c.name)}>
                    {newsletter.categories.map((category) => (
                      <CategorySection key={category.name} category={category} />
                    ))}
                  </Accordion>
                </ScrollArea>
              </TabsContent>

              {/* Recipes Tab */}
              <TabsContent value="recipes" className="p-4">
                {newsletter.recipeSuggestions.length > 0 ? (
                  <div className="space-y-3">
                    <p className="text-muted-foreground text-sm">
                      These recipes use ingredients that are on sale this week!
                    </p>
                    <div className="grid gap-3">
                      {newsletter.recipeSuggestions.map((recipe) => (
                        <RecipeCard key={recipe.id} recipe={recipe} />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <ChefHat className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>No recipe suggestions for this edition.</p>
                  </div>
                )}
              </TabsContent>

              {/* Tips & Trends Tab */}
              <TabsContent value="tips" className="p-4 space-y-6">
                {/* Price Trends */}
                {newsletter.priceTrends.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-semibold flex items-center gap-2">
                      <TrendingDown className="h-4 w-4 text-green-600" />
                      Price Trends
                    </h3>
                    <div className="space-y-2">
                      {newsletter.priceTrends.map((trend, i) => (
                        <TrendCard key={i} trend={trend} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Savings Tips */}
                {newsletter.savingsTips.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Lightbulb className="h-4 w-4 text-yellow-500" />
                      Savings Tips
                    </h3>
                    <div className="space-y-2">
                      {newsletter.savingsTips.map((tip, i) => (
                        <div key={i} className="flex gap-3 p-3 bg-muted/50 rounded-lg">
                          <span className="text-primary font-bold">{i + 1}.</span>
                          <p className="text-sm">{tip}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>

            {/* Footer Stats */}
            <div className="border-t p-4 bg-muted/30">
              <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <FileText className="h-4 w-4" />
                  {newsletter.totalDealsCount} deals
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  Generated {formatDate(newsletter.createdAt)}
                </span>
                <span className="flex items-center gap-1">
                  <Badge variant="secondary" className="text-xs">
                    {newsletter.generatedBy === 'ai' ? 'AI Generated' : 'Manual'}
                  </Badge>
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Archive Dialog */}
      <Dialog open={showArchive} onOpenChange={setShowArchive}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Newsletter Archive</DialogTitle>
            <DialogDescription>
              View and manage your past newsletters
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[400px]">
            <div className="space-y-2 pr-4">
              {newsletters.map((nl) => (
                <div
                  key={nl.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors hover:bg-muted/50 ${
                    newsletter?.id === nl.id ? 'border-primary bg-primary/5' : ''
                  }`}
                  onClick={() => {
                    onSelectNewsletter(nl.id);
                    setShowArchive(false);
                  }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-sm">{nl.edition}</p>
                      <p className="text-xs text-muted-foreground">
                        {nl.totalDealsCount} deals • ${nl.totalPotentialSavings.toFixed(2)} savings
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteNewsletter(nl.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatDate(nl.createdAt)}
                  </p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Top Deal Card Component
function TopDealCard({ deal }: { deal: FeaturedDeal }) {
  return (
    <Card className="border-2 border-yellow-400 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-950/20 dark:to-amber-950/20">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Badge className="bg-yellow-500 text-white">
            <Star className="h-3 w-3 mr-1" />
            TOP DEAL
          </Badge>
          {deal.deal.isFlashSale && (
            <Badge variant="destructive">
              <Zap className="h-3 w-3 mr-1" />
              Flash Sale
            </Badge>
          )}
        </div>
        <CardTitle className="text-xl">{deal.headline}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-muted-foreground">{deal.description}</p>
        <div className="flex items-center gap-4">
          <div>
            <span className="text-2xl font-bold text-green-600">
              ${deal.deal.salePrice.toFixed(2)}
            </span>
            <span className="text-muted-foreground line-through ml-2">
              ${deal.deal.originalPrice.toFixed(2)}
            </span>
          </div>
          <Badge variant="secondary" className="text-green-600">
            Save {deal.deal.discountPercentage}%
          </Badge>
        </div>
        <div className="flex items-start gap-2 p-3 bg-white/50 dark:bg-black/20 rounded-lg">
          <Lightbulb className="h-4 w-4 text-yellow-600 mt-0.5 shrink-0" />
          <p className="text-sm">{deal.savingsTip}</p>
        </div>
      </CardContent>
    </Card>
  );
}

// Featured Deal Card Component
function FeaturedDealCard({ featured }: { featured: FeaturedDeal }) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h4 className="font-medium text-sm">{featured.deal.ingredientName}</h4>
          {featured.deal.isFlashSale && (
            <Badge variant="destructive" className="text-xs">
              <Zap className="h-3 w-3" />
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2 mb-2">
          <span className="font-bold text-green-600">
            ${featured.deal.salePrice.toFixed(2)}
          </span>
          <span className="text-xs text-muted-foreground line-through">
            ${featured.deal.originalPrice.toFixed(2)}
          </span>
          <Badge variant="outline" className="text-xs text-green-600">
            -{featured.deal.discountPercentage}%
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground">{featured.deal.storeName}</p>
      </CardContent>
    </Card>
  );
}

// Category Section Component
function CategorySection({ category }: { category: DealCategory }) {
  return (
    <AccordionItem value={category.name}>
      <AccordionTrigger className="hover:no-underline">
        <div className="flex items-center gap-3">
          <span className="text-xl">{category.icon}</span>
          <span className="font-medium">{category.name}</span>
          <Badge variant="secondary" className="text-xs">
            {category.deals.length} deals
          </Badge>
          <Badge variant="outline" className="text-xs text-green-600">
            Save up to ${category.totalSavings.toFixed(2)}
          </Badge>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div className="space-y-2 pt-2">
          {category.deals.map((deal) => (
            <div
              key={deal.id}
              className="flex items-center justify-between p-2 rounded-lg bg-muted/50"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{deal.ingredientName}</span>
                  {deal.isFlashSale && (
                    <Badge variant="destructive" className="text-xs px-1">
                      <Zap className="h-3 w-3" />
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  {deal.storeName} • {deal.quantity}
                </p>
              </div>
              <div className="text-right">
                <div className="font-bold text-green-600">
                  ${deal.salePrice.toFixed(2)}
                </div>
                <div className="text-xs text-muted-foreground line-through">
                  ${deal.originalPrice.toFixed(2)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

// Recipe Card Component
function RecipeCard({ recipe }: { recipe: RecipeSuggestion }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h4 className="font-medium flex items-center gap-2">
              <ChefHat className="h-4 w-4 text-orange-500" />
              {recipe.name}
            </h4>
            <p className="text-sm text-muted-foreground mt-1">{recipe.description}</p>
            <div className="flex flex-wrap gap-1 mt-2">
              {recipe.usesDeals.map((ingredient) => (
                <Badge key={ingredient} variant="secondary" className="text-xs">
                  {ingredient}
                </Badge>
              ))}
            </div>
          </div>
          <div className="text-right ml-4">
            <div className="text-sm font-medium text-green-600">
              Save ~${recipe.estimatedSavings.toFixed(2)}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {recipe.prepTime} min • {recipe.servings} servings
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Trend Card Component
function TrendCard({ trend }: { trend: PriceTrend }) {
  const TrendIcon = trend.trend === 'falling' ? TrendingDown : trend.trend === 'rising' ? TrendingUp : Minus;
  const trendColor = trend.trend === 'falling' ? 'text-green-600' : trend.trend === 'rising' ? 'text-red-500' : 'text-muted-foreground';

  return (
    <div className="flex items-start gap-3 p-3 rounded-lg border">
      <div className={`p-2 rounded-full bg-muted ${trendColor}`}>
        <TrendIcon className="h-4 w-4" />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-medium text-sm">{trend.ingredient}</span>
          <Badge variant="outline" className={`text-xs ${trendColor}`}>
            {trend.trend === 'falling' && `↓ ${trend.changePercent}%`}
            {trend.trend === 'rising' && `↑ ${trend.changePercent}%`}
            {trend.trend === 'stable' && 'Stable'}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground mt-1">{trend.recommendation}</p>
      </div>
    </div>
  );
}
