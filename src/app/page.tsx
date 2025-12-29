import {
  Calendar,
  ShoppingCart,
  TrendingDown,
  Heart,
  MapPin,
  Utensils,
  ArrowRight
} from "lucide-react";

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-12 bg-gradient-to-r from-green-600 to-blue-600 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 rounded-lg text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Plan Smarter, Shop Better
        </h1>
        <p className="text-xl text-green-100 max-w-2xl mx-auto mb-8">
          Your AI-powered grocery planner for Newfoundland.
          Track sales, plan healthy meals, and save money at local stores.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#planner"
            className="inline-flex items-center justify-center px-6 py-3 bg-white text-green-600 font-semibold rounded-lg hover:bg-green-50 transition-colors"
          >
            <Calendar className="w-5 h-5 mr-2" />
            Start Planning
          </a>
          <a
            href="#shopping"
            className="inline-flex items-center justify-center px-6 py-3 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 transition-colors"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            View Sales
          </a>
        </div>
      </section>

      {/* Quick Features Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <FeatureCard
          icon={<Calendar className="w-8 h-8 text-blue-600" />}
          title="Weekly Planner"
          description="Plan your meals for the entire week with drag-and-drop simplicity"
          href="#planner"
        />
        <FeatureCard
          icon={<TrendingDown className="w-8 h-8 text-green-600" />}
          title="Sale Tracker"
          description="AI-powered sale detection across Sobeys, Dominion, and Costco"
          href="#shopping"
        />
        <FeatureCard
          icon={<Heart className="w-8 h-8 text-red-500" />}
          title="Health Goals"
          description="Get personalized nutrition recommendations based on your goals"
          href="#recipes"
        />
        <FeatureCard
          icon={<MapPin className="w-8 h-8 text-purple-600" />}
          title="Local Stores"
          description="Find the best deals at stores across Newfoundland"
          href="#stores"
        />
      </section>

      {/* Weekly Planner Section */}
      <section id="planner" className="scroll-mt-20">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Weekly Meal Planner</h2>
            <p className="text-gray-600">Organize your meals for the week ahead</p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="grid grid-cols-7 gap-2 mb-4">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
              <div key={day} className="text-center font-semibold text-gray-700 py-2 bg-gray-50 rounded">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
              <div
                key={day}
                className="min-h-[120px] border-2 border-dashed border-gray-200 rounded-lg p-2 hover:border-green-400 hover:bg-green-50 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                  <Utensils className="w-4 h-4 mr-1" />
                  Add meal
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-500 mt-4 text-sm">
            Click on a day to add meals and build your weekly plan
          </p>
        </div>
      </section>

      {/* Recipes Section */}
      <section id="recipes" className="scroll-mt-20">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Popular Recipes</h2>
            <p className="text-gray-600">Healthy recipes featuring local Newfoundland ingredients</p>
          </div>
          <button className="text-green-600 font-medium flex items-center hover:text-green-700">
            View all <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <RecipeCard
            title="Pan-Seared Atlantic Cod"
            time="25 min"
            calories={320}
            tags={["High Protein", "Low Carb"]}
          />
          <RecipeCard
            title="Partridgeberry Glazed Salmon"
            time="30 min"
            calories={380}
            tags={["Omega-3", "Heart Healthy"]}
          />
          <RecipeCard
            title="Root Vegetable Soup"
            time="45 min"
            calories={220}
            tags={["Vegetarian", "High Fiber"]}
          />
        </div>
      </section>

      {/* Shopping/Sales Section */}
      <section id="shopping" className="scroll-mt-20">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">This Week&apos;s Best Deals</h2>
            <p className="text-gray-600">AI-detected sales at local stores</p>
          </div>
          <button className="text-green-600 font-medium flex items-center hover:text-green-700">
            View all sales <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SaleCard
            item="Atlantic Cod"
            store="Sobeys Avalon Mall"
            originalPrice={12.99}
            salePrice={9.99}
            discount={23}
          />
          <SaleCard
            item="Wild Blueberries"
            store="Dominion Freshwater Rd"
            originalPrice={4.99}
            salePrice={2.99}
            discount={40}
          />
          <SaleCard
            item="Chicken Breast (Family Pack)"
            store="Costco St. John's"
            originalPrice={7.99}
            salePrice={5.99}
            discount={25}
          />
        </div>
      </section>

      {/* Stores Section */}
      <section id="stores" className="scroll-mt-20">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Supported Stores</h2>
            <p className="text-gray-600">Track sales and compare prices across these stores</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StoreCard
            name="Sobeys"
            locations={8}
            color="bg-red-600"
          />
          <StoreCard
            name="Dominion"
            locations={12}
            color="bg-yellow-500"
          />
          <StoreCard
            name="Costco"
            locations={1}
            color="bg-red-700"
          />
        </div>
      </section>
    </div>
  );
}

// Feature Card Component
function FeatureCard({
  icon,
  title,
  description,
  href
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow group"
    >
      <div className="mb-4">{icon}</div>
      <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
        {title}
      </h3>
      <p className="text-sm text-gray-600">{description}</p>
    </a>
  );
}

// Recipe Card Component
function RecipeCard({
  title,
  time,
  calories,
  tags
}: {
  title: string;
  time: string;
  calories: number;
  tags: string[];
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition-shadow group cursor-pointer">
      <div className="h-40 bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
        <Utensils className="w-12 h-12 text-green-600 opacity-50" />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
          {title}
        </h3>
        <div className="flex items-center text-sm text-gray-600 mb-3">
          <span>{time}</span>
          <span className="mx-2">•</span>
          <span>{calories} cal</span>
        </div>
        <div className="flex flex-wrap gap-1">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// Sale Card Component
function SaleCard({
  item,
  store,
  originalPrice,
  salePrice,
  discount
}: {
  item: string;
  store: string;
  originalPrice: number;
  salePrice: number;
  discount: number;
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-gray-900">{item}</h3>
          <p className="text-sm text-gray-600 flex items-center">
            <MapPin className="w-3 h-3 mr-1" />
            {store}
          </p>
        </div>
        <span className="bg-red-100 text-red-700 text-sm font-bold px-2 py-1 rounded">
          {discount}% OFF
        </span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold text-green-600">${salePrice.toFixed(2)}</span>
        <span className="text-gray-400 line-through">${originalPrice.toFixed(2)}</span>
      </div>
      <button className="w-full mt-3 bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center">
        <ShoppingCart className="w-4 h-4 mr-2" />
        Add to List
      </button>
    </div>
  );
}

// Store Card Component
function StoreCard({
  name,
  locations,
  color
}: {
  name: string;
  locations: number;
  color: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center text-white font-bold text-lg`}>
          {name.charAt(0)}
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">{name}</h3>
          <p className="text-sm text-gray-600">{locations} locations in NL</p>
        </div>
      </div>
    </div>
  );
}
