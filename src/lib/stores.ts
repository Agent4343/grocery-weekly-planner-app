// Newfoundland store data for Sobeys, Dominion, and Costco

export interface Store {
  id: string;
  name: string;
  type: 'sobeys' | 'dominion' | 'costco';
  address: string;
  city: string;
  province: string;
  postalCode: string;
  phone: string;
  hours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  specialties: string[];
  services: string[];
}

export const newfoundlandStores: Store[] = [
  // Sobeys Stores
  {
    id: "sobeys-avalon-mall",
    name: "Sobeys Avalon Mall",
    type: "sobeys",
    address: "48 Kenmount Rd",
    city: "St. John's",
    province: "NL",
    postalCode: "A1B 1W3",
    phone: "(709) 726-0123",
    hours: {
      monday: "8:00 AM - 10:00 PM",
      tuesday: "8:00 AM - 10:00 PM",
      wednesday: "8:00 AM - 10:00 PM",
      thursday: "8:00 AM - 10:00 PM",
      friday: "8:00 AM - 10:00 PM",
      saturday: "8:00 AM - 10:00 PM",
      sunday: "8:00 AM - 10:00 PM"
    },
    specialties: ["Fresh Seafood", "Local Produce", "Bakery", "Deli"],
    services: ["Pharmacy", "Floral", "Photo Centre", "Online Grocery"]
  },
  {
    id: "sobeys-torbay-road",
    name: "Sobeys Torbay Road",
    type: "sobeys",
    address: "30 Torbay Rd",
    city: "St. John's",
    province: "NL",
    postalCode: "A1A 2G4",
    phone: "(709) 726-4567",
    hours: {
      monday: "8:00 AM - 9:00 PM",
      tuesday: "8:00 AM - 9:00 PM",
      wednesday: "8:00 AM - 9:00 PM",
      thursday: "8:00 AM - 9:00 PM",
      friday: "8:00 AM - 9:00 PM",
      saturday: "8:00 AM - 9:00 PM",
      sunday: "8:00 AM - 9:00 PM"
    },
    specialties: ["Organic Section", "Gluten-Free Products", "Local Meat"],
    services: ["Pharmacy", "Catering", "Online Grocery"]
  },
  {
    id: "sobeys-corner-brook",
    name: "Sobeys Corner Brook",
    type: "sobeys",
    address: "1 Murphy Square",
    city: "Corner Brook",
    province: "NL",
    postalCode: "A2H 1R7",
    phone: "(709) 634-2345",
    hours: {
      monday: "8:00 AM - 9:00 PM",
      tuesday: "8:00 AM - 9:00 PM",
      wednesday: "8:00 AM - 9:00 PM",
      thursday: "8:00 AM - 9:00 PM",
      friday: "8:00 AM - 9:00 PM",
      saturday: "8:00 AM - 9:00 PM",
      sunday: "8:00 AM - 9:00 PM"
    },
    specialties: ["Fresh Seafood", "Local Produce", "Bakery"],
    services: ["Pharmacy", "Floral", "Catering"]
  },

  // Dominion Stores
  {
    id: "dominion-freshwater-road",
    name: "Dominion Freshwater Road",
    type: "dominion",
    address: "430 Freshwater Rd",
    city: "St. John's",
    province: "NL",
    postalCode: "A1B 1R4",
    phone: "(709) 726-7890",
    hours: {
      monday: "8:00 AM - 10:00 PM",
      tuesday: "8:00 AM - 10:00 PM",
      wednesday: "8:00 AM - 10:00 PM",
      thursday: "8:00 AM - 10:00 PM",
      friday: "8:00 AM - 10:00 PM",
      saturday: "8:00 AM - 10:00 PM",
      sunday: "8:00 AM - 10:00 PM"
    },
    specialties: ["Ready-to-Eat Meals", "Local Seafood", "Bakery", "Deli"],
    services: ["Pharmacy", "Floral", "Photo Centre", "Western Union"]
  },
  {
    id: "dominion-village-mall",
    name: "Dominion Village Mall",
    type: "dominion",
    address: "430 Topsail Rd",
    city: "St. John's",
    province: "NL",
    postalCode: "A1E 2B2",
    phone: "(709) 364-1234",
    hours: {
      monday: "8:00 AM - 9:00 PM",
      tuesday: "8:00 AM - 9:00 PM",
      wednesday: "8:00 AM - 9:00 PM",
      thursday: "8:00 AM - 9:00 PM",
      friday: "8:00 AM - 9:00 PM",
      saturday: "8:00 AM - 9:00 PM",
      sunday: "8:00 AM - 9:00 PM"
    },
    specialties: ["Convenience Foods", "Local Products", "Fresh Produce"],
    services: ["Pharmacy", "Lottery", "ATM"]
  },
  {
    id: "dominion-gander",
    name: "Dominion Gander",
    type: "dominion",
    address: "109 Elizabeth Dr",
    city: "Gander",
    province: "NL",
    postalCode: "A1V 1H6",
    phone: "(709) 256-3456",
    hours: {
      monday: "8:00 AM - 9:00 PM",
      tuesday: "8:00 AM - 9:00 PM",
      wednesday: "8:00 AM - 9:00 PM",
      thursday: "8:00 AM - 9:00 PM",
      friday: "8:00 AM - 9:00 PM",
      saturday: "8:00 AM - 9:00 PM",
      sunday: "8:00 AM - 9:00 PM"
    },
    specialties: ["Local Meat", "Fresh Seafood", "Bakery"],
    services: ["Pharmacy", "Floral", "Catering"]
  },

  // Costco Stores
  {
    id: "costco-st-johns",
    name: "Costco St. John's",
    type: "costco",
    address: "38 Stavanger Dr",
    city: "St. John's",
    province: "NL",
    postalCode: "A1A 5E8",
    phone: "(709) 576-2678",
    hours: {
      monday: "10:00 AM - 8:30 PM",
      tuesday: "10:00 AM - 8:30 PM",
      wednesday: "10:00 AM - 8:30 PM",
      thursday: "10:00 AM - 8:30 PM",
      friday: "10:00 AM - 8:30 PM",
      saturday: "9:30 AM - 6:00 PM",
      sunday: "10:00 AM - 6:00 PM"
    },
    specialties: ["Bulk Items", "Organic Products", "Fresh Meat", "Seafood", "Bakery"],
    services: ["Pharmacy", "Optical", "Photo Centre", "Gas Station", "Food Court"]
  },
  {
    id: "costco-corner-brook",
    name: "Costco Corner Brook",
    type: "costco",
    address: "5 Murphy Square",
    city: "Corner Brook",
    province: "NL",
    postalCode: "A2H 1R8",
    phone: "(709) 634-2678",
    hours: {
      monday: "10:00 AM - 8:30 PM",
      tuesday: "10:00 AM - 8:30 PM",
      wednesday: "10:00 AM - 8:30 PM",
      thursday: "10:00 AM - 8:30 PM",
      friday: "10:00 AM - 8:30 PM",
      saturday: "9:30 AM - 6:00 PM",
      sunday: "10:00 AM - 6:00 PM"
    },
    specialties: ["Bulk Items", "Fresh Produce", "Meat Department", "Frozen Foods"],
    services: ["Pharmacy", "Optical", "Gas Station", "Food Court"]
  }
];

export const getStoresByType = (type: 'sobeys' | 'dominion' | 'costco') => {
  return newfoundlandStores.filter(store => store.type === type);
};

export const getStoresByCity = (city: string) => {
  return newfoundlandStores.filter(store => store.city.toLowerCase() === city.toLowerCase());
};

export const getStoreById = (id: string) => {
  return newfoundlandStores.find(store => store.id === id);
};