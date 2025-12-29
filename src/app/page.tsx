import AIHealthDashboard from "@/components/AIHealthDashboard";
import AISalesTracker from "@/components/AISalesTracker";

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="text-center py-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Your AI-Powered Grocery Planner
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Plan healthy meals, track sales, and save money at Newfoundland stores
        </p>
      </section>

      <section id="health">
        <AIHealthDashboard />
      </section>

      <section id="sales" className="mt-12">
        <AISalesTracker />
      </section>
    </div>
  );
}
