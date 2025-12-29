"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  Heart, 
  Brain, 
  Activity, 
  Target, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle,
  Lightbulb,
  Zap
} from "lucide-react";
import { useHealthAI } from "@/hooks/useAIFeatures";
import { HealthProfile } from "@/lib/ai-services";

export default function AIHealthDashboard() {
  const {
    healthProfile,
    recommendations,
    nutritionAnalysis,
    loading,
    updateHealthProfile,
    generateRecommendations,
    analyzeNutrition,
    getPersonalizedTips
  } = useHealthAI();

  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  const [personalizedTips, setPersonalizedTips] = useState<string[]>([]);
  const [profileForm, setProfileForm] = useState<Partial<HealthProfile>>({
    dietaryRestrictions: [],
    allergies: [],
    healthGoals: [],
    preferredCuisines: [],
    activityLevel: 'moderately_active',
    age: 30,
    gender: 'other',
    height: 170,
    weight: 70
  });

  // Load personalized tips when profile changes
  useEffect(() => {
    if (healthProfile) {
      getPersonalizedTips().then(setPersonalizedTips);
    }
  }, [healthProfile, getPersonalizedTips]);

  const handleProfileSave = () => {
    if (profileForm.age && profileForm.height && profileForm.weight) {
      const newProfile: HealthProfile = {
        id: 'user-1',
        userId: 'user-1',
        dietaryRestrictions: profileForm.dietaryRestrictions || [],
        allergies: profileForm.allergies || [],
        healthGoals: profileForm.healthGoals || [],
        preferredCuisines: profileForm.preferredCuisines || [],
        activityLevel: profileForm.activityLevel || 'moderately_active',
        age: profileForm.age,
        gender: profileForm.gender || 'other',
        height: profileForm.height,
        weight: profileForm.weight,
        targetCalories: calculateTargetCalories(profileForm),
        macroTargets: {
          protein: 25,
          carbs: 45,
          fat: 30
        }
      };
      updateHealthProfile(newProfile);
      setIsProfileDialogOpen(false);
    }
  };

  const calculateTargetCalories = (profile: Partial<HealthProfile>) => {
    if (!profile.age || !profile.height || !profile.weight || !profile.gender) return 2000;
    
    // Basic BMR calculation (Mifflin-St Jeor Equation)
    let bmr;
    if (profile.gender === 'male') {
      bmr = 10 * profile.weight + 6.25 * profile.height - 5 * profile.age + 5;
    } else {
      bmr = 10 * profile.weight + 6.25 * profile.height - 5 * profile.age - 161;
    }

    // Activity multiplier
    const activityMultipliers = {
      sedentary: 1.2,
      lightly_active: 1.375,
      moderately_active: 1.55,
      very_active: 1.725,
      extremely_active: 1.9
    };

    return Math.round(bmr * activityMultipliers[profile.activityLevel || 'moderately_active']);
  };

  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center">
            <Brain className="w-6 h-6 mr-2 text-blue-600" />
            AI Health Dashboard
          </h2>
          <p className="text-gray-600">
            Personalized nutrition insights and health recommendations
          </p>
        </div>

        <div className="flex gap-3">
          <Dialog open={isProfileDialogOpen} onOpenChange={setIsProfileDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Target className="w-4 h-4 mr-2" />
                {healthProfile ? 'Update Profile' : 'Setup Health Profile'}
              </Button>
            </DialogTrigger>
            <HealthProfileDialog 
              profileForm={profileForm}
              setProfileForm={setProfileForm}
              onSave={handleProfileSave}
            />
          </Dialog>

          {healthProfile && (
            <Button 
              onClick={() => generateRecommendations([])}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Zap className="w-4 h-4 mr-2" />
              Get AI Insights
            </Button>
          )}
        </div>
      </div>

      {!healthProfile ? (
        <Card>
          <CardContent className="p-8 text-center">
            <Heart className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold mb-2">Setup Your Health Profile</h3>
            <p className="text-gray-600 mb-4">
              Get personalized nutrition recommendations and meal planning based on your health goals
            </p>
            <Button onClick={() => setIsProfileDialogOpen(true)} className="bg-blue-600 hover:bg-blue-700">
              <Target className="w-4 h-4 mr-2" />
              Create Health Profile
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
            <TabsTrigger value="recommendations">AI Insights</TabsTrigger>
            <TabsTrigger value="tips">Smart Tips</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-green-600" />
                    Health Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className={`text-3xl font-bold ${getHealthScoreColor(nutritionAnalysis?.healthScore || 0)}`}>
                      {nutritionAnalysis?.healthScore || 0}
                    </div>
                    <p className="text-sm text-gray-600">out of 100</p>
                    <Progress 
                      value={nutritionAnalysis?.healthScore || 0} 
                      className="mt-3"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center">
                    <Target className="w-5 h-5 mr-2 text-blue-600" />
                    Daily Calories
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">
                      {healthProfile.targetCalories}
                    </div>
                    <p className="text-sm text-gray-600">target calories</p>
                    <div className="mt-3 text-sm">
                      <span className="text-gray-500">Current: </span>
                      <span className="font-medium">{nutritionAnalysis?.totalCalories || 0}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-purple-600" />
                    Active Goals
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {healthProfile.healthGoals.slice(0, 3).map((goal, index) => (
                      <div key={index} className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                        <span className="text-sm">{goal}</span>
                      </div>
                    ))}
                    {healthProfile.healthGoals.length === 0 && (
                      <p className="text-sm text-gray-500">No goals set</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Health Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Health Profile Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Activity Level</p>
                    <p className="font-medium capitalize">{healthProfile.activityLevel.replace('_', ' ')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Dietary Restrictions</p>
                    <p className="font-medium">{healthProfile.dietaryRestrictions.length || 'None'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Allergies</p>
                    <p className="font-medium">{healthProfile.allergies.length || 'None'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">BMI</p>
                    <p className="font-medium">
                      {(healthProfile.weight / Math.pow(healthProfile.height / 100, 2)).toFixed(1)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Nutrition Tab */}
          <TabsContent value="nutrition" className="space-y-4">
            {nutritionAnalysis ? (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>Macro Breakdown</CardTitle>
                    <CardDescription>Your current macro distribution vs targets</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span>Protein</span>
                          <span>{nutritionAnalysis.macros.protein.grams}g ({nutritionAnalysis.macros.protein.percentage}%)</span>
                        </div>
                        <Progress value={nutritionAnalysis.macros.protein.percentage} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span>Carbohydrates</span>
                          <span>{nutritionAnalysis.macros.carbs.grams}g ({nutritionAnalysis.macros.carbs.percentage}%)</span>
                        </div>
                        <Progress value={nutritionAnalysis.macros.carbs.percentage} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span>Fat</span>
                          <span>{nutritionAnalysis.macros.fat.grams}g ({nutritionAnalysis.macros.fat.percentage}%)</span>
                        </div>
                        <Progress value={nutritionAnalysis.macros.fat.percentage} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Micronutrients</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Fiber</p>
                        <p className="text-lg font-semibold">{nutritionAnalysis.micronutrients.fiber}g</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Sodium</p>
                        <p className="text-lg font-semibold">{nutritionAnalysis.micronutrients.sodium}mg</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Vitamin C</p>
                        <p className="text-lg font-semibold">{nutritionAnalysis.micronutrients.vitaminC}mg</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Iron</p>
                        <p className="text-lg font-semibold">{nutritionAnalysis.micronutrients.iron}mg</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Calcium</p>
                        <p className="text-lg font-semibold">{nutritionAnalysis.micronutrients.calcium}mg</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Sugar</p>
                        <p className="text-lg font-semibold">{nutritionAnalysis.micronutrients.sugar}g</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-gray-500">Add meals to your weekly plan to see nutrition analysis</p>
                  <Button 
                    onClick={() => analyzeNutrition([])} 
                    className="mt-4"
                    disabled={loading}
                  >
                    Analyze Current Plan
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Recommendations Tab */}
          <TabsContent value="recommendations" className="space-y-4">
            {recommendations.length > 0 ? (
              <div className="space-y-4">
                {recommendations.map((rec, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg flex items-center">
                            {rec.priority === 'high' && <AlertCircle className="w-5 h-5 mr-2 text-red-500" />}
                            {rec.priority === 'medium' && <TrendingUp className="w-5 h-5 mr-2 text-yellow-500" />}
                            {rec.priority === 'low' && <Lightbulb className="w-5 h-5 mr-2 text-green-500" />}
                            {rec.title}
                          </CardTitle>
                          <CardDescription>{rec.category}</CardDescription>
                        </div>
                        <Badge className={getPriorityColor(rec.priority)}>
                          {rec.priority}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-2">{rec.description}</p>
                      <p className="text-sm text-gray-600 italic">{rec.reasoning}</p>
                      {rec.relatedItems && rec.relatedItems.length > 0 && (
                        <div className="mt-3">
                          <p className="text-sm font-medium mb-1">Related ingredients:</p>
                          <div className="flex flex-wrap gap-1">
                            {rec.relatedItems.map((item, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {item.replace('-', ' ')}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <Brain className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-500 mb-4">No AI recommendations yet</p>
                  <Button 
                    onClick={() => generateRecommendations([])}
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Generate AI Insights
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Tips Tab */}
          <TabsContent value="tips" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lightbulb className="w-5 h-5 mr-2 text-yellow-500" />
                  Personalized Shopping Tips
                </CardTitle>
                <CardDescription>
                  AI-powered tips based on your health profile and local stores
                </CardDescription>
              </CardHeader>
              <CardContent>
                {personalizedTips.length > 0 ? (
                  <div className="space-y-3">
                    {personalizedTips.map((tip, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                        <Lightbulb className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-700">{tip}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">
                    Personalized tips will appear here based on your health profile
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}

// Health Profile Dialog Component
interface HealthProfileDialogProps {
  profileForm: Partial<HealthProfile>;
  setProfileForm: (form: Partial<HealthProfile>) => void;
  onSave: () => void;
}

function HealthProfileDialog({ profileForm, setProfileForm, onSave }: HealthProfileDialogProps) {
  const dietaryOptions = [
    'vegetarian', 'vegan', 'pescatarian', 'keto', 'paleo', 'mediterranean', 
    'low-carb', 'low-fat', 'gluten-free', 'dairy-free'
  ];

  const healthGoalOptions = [
    'weight-loss', 'weight-gain', 'muscle-building', 'heart-health', 
    'diabetes-management', 'lower-cholesterol', 'increase-energy', 
    'better-digestion', 'immune-support', 'anti-inflammatory'
  ];

  const allergyOptions = [
    'nuts', 'shellfish', 'dairy', 'eggs', 'soy', 'wheat', 'fish', 'sesame'
  ];

  return (
    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Health Profile Setup</DialogTitle>
        <DialogDescription>
          Help us personalize your nutrition recommendations
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-6">
        {/* Basic Info */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              value={profileForm.age || ''}
              onChange={(e) => setProfileForm({...profileForm, age: parseInt(e.target.value)})}
            />
          </div>
          <div>
            <Label htmlFor="gender">Gender</Label>
            <Select 
              value={profileForm.gender} 
              onValueChange={(value) => setProfileForm({...profileForm, gender: value as any})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="height">Height (cm)</Label>
            <Input
              id="height"
              type="number"
              value={profileForm.height || ''}
              onChange={(e) => setProfileForm({...profileForm, height: parseInt(e.target.value)})}
            />
          </div>
          <div>
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input
              id="weight"
              type="number"
              value={profileForm.weight || ''}
              onChange={(e) => setProfileForm({...profileForm, weight: parseInt(e.target.value)})}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="activity">Activity Level</Label>
          <Select 
            value={profileForm.activityLevel} 
            onValueChange={(value) => setProfileForm({...profileForm, activityLevel: value as any})}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sedentary">Sedentary (little/no exercise)</SelectItem>
              <SelectItem value="lightly_active">Lightly Active (light exercise 1-3 days/week)</SelectItem>
              <SelectItem value="moderately_active">Moderately Active (moderate exercise 3-5 days/week)</SelectItem>
              <SelectItem value="very_active">Very Active (hard exercise 6-7 days/week)</SelectItem>
              <SelectItem value="extremely_active">Extremely Active (very hard exercise, physical job)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Health Goals</Label>
          <Textarea
            placeholder="Select your health goals (comma-separated)"
            value={profileForm.healthGoals?.join(', ') || ''}
            onChange={(e) => setProfileForm({
              ...profileForm, 
              healthGoals: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
            })}
          />
          <p className="text-xs text-gray-500 mt-1">
            Options: {healthGoalOptions.join(', ')}
          </p>
        </div>

        <div>
          <Label>Dietary Restrictions</Label>
          <Textarea
            placeholder="Enter dietary restrictions (comma-separated)"
            value={profileForm.dietaryRestrictions?.join(', ') || ''}
            onChange={(e) => setProfileForm({
              ...profileForm, 
              dietaryRestrictions: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
            })}
          />
          <p className="text-xs text-gray-500 mt-1">
            Options: {dietaryOptions.join(', ')}
          </p>
        </div>

        <div>
          <Label>Allergies</Label>
          <Textarea
            placeholder="Enter allergies (comma-separated)"
            value={profileForm.allergies?.join(', ') || ''}
            onChange={(e) => setProfileForm({
              ...profileForm, 
              allergies: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
            })}
          />
          <p className="text-xs text-gray-500 mt-1">
            Options: {allergyOptions.join(', ')}
          </p>
        </div>

        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => {}}>
            Cancel
          </Button>
          <Button onClick={onSave} className="bg-blue-600 hover:bg-blue-700">
            Save Profile
          </Button>
        </div>
      </div>
    </DialogContent>
  );
}