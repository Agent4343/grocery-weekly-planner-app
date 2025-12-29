// Common ingredients database with store availability

export interface Ingredient {
  id: string;
  name: string;
  category: string;
  unit: string;
  storeAvailability: {
    sobeys: {
      available: boolean;
      avgPrice?: number;
      section?: string;
    };
    dominion: {
      available: boolean;
      avgPrice?: number;
      section?: string;
    };
    costco: {
      available: boolean;
      avgPrice?: number;
      section?: string;
      bulkSize?: string;
    };
  };
  isLocal?: boolean;
  seasonality?: string[];
}

export const ingredientsDatabase: Ingredient[] = [
  // Proteins
  {
    id: "atlantic-cod",
    name: "Atlantic Cod",
    category: "Seafood",
    unit: "lb",
    storeAvailability: {
      sobeys: { available: true, avgPrice: 12.99, section: "Fresh Seafood" },
      dominion: { available: true, avgPrice: 13.49, section: "Seafood Counter" },
      costco: { available: true, avgPrice: 9.99, section: "Fresh Seafood", bulkSize: "2-3 lb portions" }
    },
    isLocal: true,
    seasonality: ["year-round"]
  },
  {
    id: "salt-beef",
    name: "Salt Beef",
    category: "Meat",
    unit: "lb",
    storeAvailability: {
      sobeys: { available: true, avgPrice: 8.99, section: "Deli/Meat" },
      dominion: { available: true, avgPrice: 9.49, section: "Deli" },
      costco: { available: false, avgPrice: 0 }
    },
    isLocal: true
  },
  {
    id: "ground-moose",
    name: "Ground Moose",
    category: "Game Meat",
    unit: "lb",
    storeAvailability: {
      sobeys: { available: true, avgPrice: 15.99, section: "Specialty Meat" },
      dominion: { available: true, avgPrice: 16.49, section: "Meat Counter" },
      costco: { available: false, avgPrice: 0 }
    },
    isLocal: true,
    seasonality: ["fall", "winter"]
  },
  {
    id: "chicken-breast",
    name: "Chicken Breast",
    category: "Poultry",
    unit: "lb",
    storeAvailability: {
      sobeys: { available: true, avgPrice: 7.99, section: "Fresh Meat" },
      dominion: { available: true, avgPrice: 8.49, section: "Meat Department" },
      costco: { available: true, avgPrice: 5.99, section: "Fresh Meat", bulkSize: "Family pack 3-4 lbs" }
    }
  },

  // Vegetables
  {
    id: "cabbage",
    name: "Cabbage",
    category: "Vegetables",
    unit: "head",
    storeAvailability: {
      sobeys: { available: true, avgPrice: 2.49, section: "Produce" },
      dominion: { available: true, avgPrice: 2.99, section: "Fresh Produce" },
      costco: { available: true, avgPrice: 3.99, section: "Produce", bulkSize: "2-pack" }
    },
    seasonality: ["fall", "winter", "spring"]
  },
  {
    id: "carrots",
    name: "Carrots",
    category: "Vegetables",
    unit: "lb",
    storeAvailability: {
      sobeys: { available: true, avgPrice: 1.99, section: "Produce" },
      dominion: { available: true, avgPrice: 2.29, section: "Fresh Produce" },
      costco: { available: true, avgPrice: 2.99, section: "Produce", bulkSize: "3 lb bag" }
    },
    seasonality: ["year-round"]
  },
  {
    id: "potatoes",
    name: "Potatoes",
    category: "Vegetables",
    unit: "lb",
    storeAvailability: {
      sobeys: { available: true, avgPrice: 2.99, section: "Produce" },
      dominion: { available: true, avgPrice: 3.49, section: "Fresh Produce" },
      costco: { available: true, avgPrice: 4.99, section: "Produce", bulkSize: "10 lb bag" }
    },
    isLocal: true,
    seasonality: ["year-round"]
  },
  {
    id: "turnip",
    name: "Turnip",
    category: "Vegetables",
    unit: "lb",
    storeAvailability: {
      sobeys: { available: true, avgPrice: 1.79, section: "Produce" },
      dominion: { available: true, avgPrice: 1.99, section: "Fresh Produce" },
      costco: { available: false, avgPrice: 0 }
    },
    seasonality: ["fall", "winter"]
  },

  // Fruits & Berries
  {
    id: "partridgeberries",
    name: "Partridgeberries",
    category: "Berries",
    unit: "cup",
    storeAvailability: {
      sobeys: { available: true, avgPrice: 4.99, section: "Local Produce" },
      dominion: { available: true, avgPrice: 5.49, section: "Specialty Produce" },
      costco: { available: false, avgPrice: 0 }
    },
    isLocal: true,
    seasonality: ["fall"]
  },
  {
    id: "blueberries",
    name: "Wild Blueberries",
    category: "Berries",
    unit: "cup",
    storeAvailability: {
      sobeys: { available: true, avgPrice: 3.99, section: "Produce" },
      dominion: { available: true, avgPrice: 4.29, section: "Fresh Produce" },
      costco: { available: true, avgPrice: 6.99, section: "Produce", bulkSize: "2 lb container" }
    },
    isLocal: true,
    seasonality: ["summer", "fall"]
  },
  {
    id: "apples",
    name: "Apples",
    category: "Fruits",
    unit: "lb",
    storeAvailability: {
      sobeys: { available: true, avgPrice: 2.99, section: "Produce" },
      dominion: { available: true, avgPrice: 3.29, section: "Fresh Produce" },
      costco: { available: true, avgPrice: 4.99, section: "Produce", bulkSize: "3 lb bag" }
    },
    seasonality: ["year-round"]
  },

  // Pantry Staples
  {
    id: "flour",
    name: "All-Purpose Flour",
    category: "Baking",
    unit: "lb",
    storeAvailability: {
      sobeys: { available: true, avgPrice: 3.99, section: "Baking Aisle" },
      dominion: { available: true, avgPrice: 4.29, section: "Baking" },
      costco: { available: true, avgPrice: 7.99, section: "Baking", bulkSize: "10 lb bag" }
    }
  },
  {
    id: "oats",
    name: "Rolled Oats",
    category: "Breakfast",
    unit: "lb",
    storeAvailability: {
      sobeys: { available: true, avgPrice: 2.99, section: "Cereal Aisle" },
      dominion: { available: true, avgPrice: 3.19, section: "Breakfast" },
      costco: { available: true, avgPrice: 5.99, section: "Breakfast", bulkSize: "4 lb container" }
    }
  },
  {
    id: "molasses",
    name: "Molasses",
    category: "Baking",
    unit: "bottle",
    storeAvailability: {
      sobeys: { available: true, avgPrice: 4.99, section: "Baking Aisle" },
      dominion: { available: true, avgPrice: 5.29, section: "Baking" },
      costco: { available: false, avgPrice: 0 }
    }
  },

  // Dairy
  {
    id: "milk",
    name: "Milk",
    category: "Dairy",
    unit: "L",
    storeAvailability: {
      sobeys: { available: true, avgPrice: 5.49, section: "Dairy" },
      dominion: { available: true, avgPrice: 5.69, section: "Dairy" },
      costco: { available: true, avgPrice: 8.99, section: "Dairy", bulkSize: "4L jug" }
    }
  },
  {
    id: "butter",
    name: "Butter",
    category: "Dairy",
    unit: "lb",
    storeAvailability: {
      sobeys: { available: true, avgPrice: 6.99, section: "Dairy" },
      dominion: { available: true, avgPrice: 7.29, section: "Dairy" },
      costco: { available: true, avgPrice: 9.99, section: "Dairy", bulkSize: "2 lb pack" }
    }
  },
  {
    id: "eggs",
    name: "Large Eggs",
    category: "Dairy",
    unit: "dozen",
    storeAvailability: {
      sobeys: { available: true, avgPrice: 4.99, section: "Dairy" },
      dominion: { available: true, avgPrice: 5.19, section: "Dairy" },
      costco: { available: true, avgPrice: 7.99, section: "Dairy", bulkSize: "18-pack" }
    }
  }
];

export const getIngredientsByCategory = (category: string) => {
  return ingredientsDatabase.filter(ingredient => ingredient.category === category);
};

export const getLocalIngredients = () => {
  return ingredientsDatabase.filter(ingredient => ingredient.isLocal);
};

export const getSeasonalIngredients = (season: string) => {
  return ingredientsDatabase.filter(ingredient => 
    ingredient.seasonality?.includes(season) || ingredient.seasonality?.includes("year-round")
  );
};

export const getIngredientById = (id: string) => {
  return ingredientsDatabase.find(ingredient => ingredient.id === id);
};

export const searchIngredients = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  return ingredientsDatabase.filter(ingredient =>
    ingredient.name.toLowerCase().includes(lowercaseQuery) ||
    ingredient.category.toLowerCase().includes(lowercaseQuery)
  );
};