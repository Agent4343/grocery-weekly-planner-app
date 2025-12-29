import AIHealthDashboard from "@/components/AIHealthDashboard";
import AISalesTracker from "@/components/AISalesTracker";
import SalesTracker from "@/components/SalesTracker";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Leaf, Shield, ShoppingBag } from "lucide-react";

const featureHighlights = [
  {
    title: "Weekly planning made simple",
    description: "Build Newfoundland-friendly meal plans with seasonal produce and local store availability.",
  },
  {
    title: "AI-powered savings",
    description: "Track Sobeys, Dominion, and Costco sales and get smart alerts before prices jump.",
  },
  {
    title: "Health-first defaults",
    description: "Personalized nutrition insights, calorie targets, and macro breakdowns for every plan.",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="bg-white rounded-2xl shadow-sm border p-8 lg:p-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-blue-50 to-white opacity-80" aria-hidden />
        <div className="relative grid gap-8 lg:grid-cols-2 items-center">
          <div className="space-y-6">
            <Badge className="bg-green-600 hover:bg-green-700">Built for Newfoundland</Badge>
            <div className="space-y-3">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Plan weekly meals, track sales, and stay on budget with AI help.
              </h1>
              <p className="text-lg text-gray-700">
                Grocery Weekly Planner combines smart sales tracking, nutrition guidance, and Newfoundland store data so
                you can save money and eat well—without juggling multiple apps.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Badge variant="secondary" className="flex items-center gap-2 py-2 px-3 text-base">
                <ShoppingBag className="h-4 w-4 text-green-700" />
                Smart grocery routes
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-2 py-2 px-3 text-base">
                <Leaf className="h-4 w-4 text-green-700" />
                Seasonal picks
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-2 py-2 px-3 text-base">
                <Shield className="h-4 w-4 text-green-700" />
                Nutrition checks
              </Badge>
            </div>
          </div>

          <Card className="border-green-100 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <CheckCircle2 className="h-5 w-5 text-green-600" /> Quick start checklist
              </CardTitle>
              <CardDescription>Everything Vercel needs to boot the experience.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-gray-700">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                <p>Environment variables are optional; the demo runs without secrets for preview deployments.</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                <p>Vercel automatically runs <code>npm run build</code>; no extra build steps are required.</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                <p>Remote images from Pexels, Google Cloud Storage, and Replicate are already allowed in Next config.</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                <p>Static assets live in <code>/public</code>; no custom <code>vercel.json</code> needed.</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                <p>ESLint errors are skipped during builds (<code>ignoreDuringBuilds</code>) to keep previews unblocked.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="planner" className="space-y-4">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">Weekly planner & health insights</h2>
          <p className="text-gray-600">Track goals, analyze nutrition, and get AI recommendations tailored to your profile.</p>
        </div>
        <AIHealthDashboard />
      </section>

      <section id="shopping" className="space-y-4">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">AI sale detection</h2>
          <p className="text-gray-600">Live deals across Sobeys, Dominion, and Costco with automatic alerts and route tips.</p>
        </div>
        <AISalesTracker />
      </section>

      <section id="stores" className="space-y-4">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">Store-by-store deals</h2>
          <p className="text-gray-600">Browse current sales and bookmark the offers that matter most.</p>
        </div>
        <SalesTracker />
      </section>

      <section id="recipes" className="grid gap-4 lg:grid-cols-3">
        {featureHighlights.map((feature) => (
          <Card key={feature.title}>
            <CardHeader>
              <CardTitle>{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </section>
    </div>
  );
}
