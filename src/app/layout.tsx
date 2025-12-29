import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Smart Meal Planner - Newfoundland & Labrador",
  description: "AI-powered meal planning with smart deal optimization. Plan your weekly meals, find the best grocery deals, and generate organized shopping lists for Sobeys, Dominion, Costco, and more across Newfoundland & Labrador.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}