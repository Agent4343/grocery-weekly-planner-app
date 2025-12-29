import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Grocery Weekly Planner - Newfoundland",
  description: "Plan your weekly meals and generate shopping lists for Sobeys, Dominion, and Costco stores in Newfoundland",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
          <header className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">GP</span>
                    </div>
                    <h1 className="text-xl font-bold text-gray-900">Grocery Planner</h1>
                  </div>
                  <span className="text-sm text-gray-500 hidden sm:block">Newfoundland Edition</span>
                </div>
                <nav className="flex items-center space-x-6">
                  <a href="#planner" className="text-gray-700 hover:text-green-600 font-medium">
                    Weekly Planner
                  </a>
                  <a href="#recipes" className="text-gray-700 hover:text-green-600 font-medium">
                    Recipes
                  </a>
                  <a href="#shopping" className="text-gray-700 hover:text-green-600 font-medium">
                    Shopping Lists
                  </a>
                  <a href="#stores" className="text-gray-700 hover:text-green-600 font-medium">
                    Stores
                  </a>
                </nav>
              </div>
            </div>
          </header>
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
          <footer className="bg-white border-t mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="text-center text-gray-600">
                <p className="mb-2">Grocery Weekly Planner for Newfoundland</p>
                <p className="text-sm">Supporting Sobeys, Dominion, and Costco stores across the province</p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}