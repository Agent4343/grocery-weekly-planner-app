// Newfoundland & Labrador locations and grocery store data

export interface NLLocation {
  id: string;
  name: string;
  region: 'Avalon' | 'Eastern' | 'Central' | 'Western' | 'Labrador';
  population: number;
  hasGroceryStores: boolean;
}

// Major cities and towns in Newfoundland & Labrador
export const nlLocations: NLLocation[] = [
  // Avalon Peninsula
  { id: 'st-johns', name: "St. John's", region: 'Avalon', population: 110525, hasGroceryStores: true },
  { id: 'mount-pearl', name: 'Mount Pearl', region: 'Avalon', population: 22957, hasGroceryStores: true },
  { id: 'conception-bay-south', name: 'Conception Bay South', region: 'Avalon', population: 26199, hasGroceryStores: true },
  { id: 'paradise', name: 'Paradise', region: 'Avalon', population: 21389, hasGroceryStores: true },
  { id: 'torbay', name: 'Torbay', region: 'Avalon', population: 7899, hasGroceryStores: true },
  { id: 'portugal-cove', name: 'Portugal Cove-St. Philip\'s', region: 'Avalon', population: 8147, hasGroceryStores: false },
  { id: 'bay-roberts', name: 'Bay Roberts', region: 'Avalon', population: 6012, hasGroceryStores: true },
  { id: 'carbonear', name: 'Carbonear', region: 'Avalon', population: 4372, hasGroceryStores: true },
  { id: 'harbour-grace', name: 'Harbour Grace', region: 'Avalon', population: 2995, hasGroceryStores: true },
  { id: 'placentia', name: 'Placentia', region: 'Avalon', population: 3496, hasGroceryStores: true },
  { id: 'ferryland', name: 'Ferryland', region: 'Avalon', population: 465, hasGroceryStores: false },

  // Eastern Region
  { id: 'clarenville', name: 'Clarenville', region: 'Eastern', population: 6291, hasGroceryStores: true },
  { id: 'bonavista', name: 'Bonavista', region: 'Eastern', population: 3589, hasGroceryStores: true },
  { id: 'marystown', name: 'Marystown', region: 'Eastern', population: 5316, hasGroceryStores: true },
  { id: 'burin', name: 'Burin', region: 'Eastern', population: 2315, hasGroceryStores: true },
  { id: 'grand-bank', name: 'Grand Bank', region: 'Eastern', population: 2248, hasGroceryStores: true },
  { id: 'fortune', name: 'Fortune', region: 'Eastern', population: 1458, hasGroceryStores: false },

  // Central Region
  { id: 'gander', name: 'Gander', region: 'Central', population: 11688, hasGroceryStores: true },
  { id: 'grand-falls-windsor', name: 'Grand Falls-Windsor', region: 'Central', population: 14171, hasGroceryStores: true },
  { id: 'bishops-falls', name: "Bishop's Falls", region: 'Central', population: 3024, hasGroceryStores: true },
  { id: 'lewisporte', name: 'Lewisporte', region: 'Central', population: 3409, hasGroceryStores: true },
  { id: 'twillingate', name: 'Twillingate', region: 'Central', population: 2196, hasGroceryStores: true },
  { id: 'botwood', name: 'Botwood', region: 'Central', population: 2785, hasGroceryStores: true },

  // Western Region
  { id: 'corner-brook', name: 'Corner Brook', region: 'Western', population: 19806, hasGroceryStores: true },
  { id: 'stephenville', name: 'Stephenville', region: 'Western', population: 6623, hasGroceryStores: true },
  { id: 'deer-lake', name: 'Deer Lake', region: 'Western', population: 5249, hasGroceryStores: true },
  { id: 'pasadena', name: 'Pasadena', region: 'Western', population: 3620, hasGroceryStores: true },
  { id: 'port-aux-basques', name: 'Channel-Port aux Basques', region: 'Western', population: 4067, hasGroceryStores: true },
  { id: 'rocky-harbour', name: 'Rocky Harbour', region: 'Western', population: 925, hasGroceryStores: true },
  { id: 'st-anthonys', name: "St. Anthony", region: 'Western', population: 2258, hasGroceryStores: true },

  // Labrador
  { id: 'happy-valley-goose-bay', name: 'Happy Valley-Goose Bay', region: 'Labrador', population: 8109, hasGroceryStores: true },
  { id: 'labrador-city', name: 'Labrador City', region: 'Labrador', population: 7220, hasGroceryStores: true },
  { id: 'wabush', name: 'Wabush', region: 'Labrador', population: 1906, hasGroceryStores: true },
  { id: 'nain', name: 'Nain', region: 'Labrador', population: 1125, hasGroceryStores: true },
  { id: 'hopedale', name: 'Hopedale', region: 'Labrador', population: 596, hasGroceryStores: false },
  { id: 'makkovik', name: 'Makkovik', region: 'Labrador', population: 361, hasGroceryStores: false },
];

// Grocery store chains in NL
export interface GroceryChain {
  id: string;
  name: string;
  type: 'sobeys' | 'dominion' | 'costco' | 'coleman' | 'pipers' | 'northern';
  description: string;
  priceLevel: 'budget' | 'mid-range' | 'premium' | 'bulk';
  hasOnlineOrdering: boolean;
  hasFlyer: boolean;
}

export const groceryChains: GroceryChain[] = [
  {
    id: 'sobeys',
    name: 'Sobeys',
    type: 'sobeys',
    description: 'Full-service supermarket with fresh departments and pharmacy',
    priceLevel: 'mid-range',
    hasOnlineOrdering: true,
    hasFlyer: true
  },
  {
    id: 'dominion',
    name: 'Dominion',
    type: 'dominion',
    description: 'Local NL supermarket chain with great selection',
    priceLevel: 'mid-range',
    hasOnlineOrdering: true,
    hasFlyer: true
  },
  {
    id: 'costco',
    name: 'Costco',
    type: 'costco',
    description: 'Warehouse club with bulk buying and great savings',
    priceLevel: 'bulk',
    hasOnlineOrdering: false,
    hasFlyer: false
  },
  {
    id: 'coleman',
    name: "Coleman's",
    type: 'coleman',
    description: 'Local NL grocery chain with competitive prices',
    priceLevel: 'budget',
    hasOnlineOrdering: false,
    hasFlyer: true
  },
  {
    id: 'pipers',
    name: "Pipers",
    type: 'pipers',
    description: 'Community grocery stores across NL',
    priceLevel: 'mid-range',
    hasOnlineOrdering: false,
    hasFlyer: true
  },
  {
    id: 'northern',
    name: 'Northern Store',
    type: 'northern',
    description: 'Serves remote and northern communities',
    priceLevel: 'premium',
    hasOnlineOrdering: false,
    hasFlyer: true
  }
];

// Extended store locations for NL
export interface ExtendedStore {
  id: string;
  chainId: string;
  name: string;
  type: GroceryChain['type'];
  address: string;
  city: string;
  locationId: string;
  phone: string;
  hours: {
    weekday: string;
    saturday: string;
    sunday: string;
  };
  features: string[];
}

export const extendedStores: ExtendedStore[] = [
  // St. John's Area - Sobeys
  {
    id: 'sobeys-avalon-mall',
    chainId: 'sobeys',
    name: 'Sobeys Avalon Mall',
    type: 'sobeys',
    address: '48 Kenmount Rd',
    city: "St. John's",
    locationId: 'st-johns',
    phone: '(709) 726-0123',
    hours: { weekday: '8:00 AM - 10:00 PM', saturday: '8:00 AM - 10:00 PM', sunday: '8:00 AM - 10:00 PM' },
    features: ['Pharmacy', 'Fresh Seafood', 'Bakery', 'Deli', 'Floral', 'Online Ordering']
  },
  {
    id: 'sobeys-torbay-road',
    chainId: 'sobeys',
    name: 'Sobeys Torbay Road',
    type: 'sobeys',
    address: '30 Torbay Rd',
    city: "St. John's",
    locationId: 'st-johns',
    phone: '(709) 726-4567',
    hours: { weekday: '8:00 AM - 9:00 PM', saturday: '8:00 AM - 9:00 PM', sunday: '8:00 AM - 9:00 PM' },
    features: ['Pharmacy', 'Organic Section', 'Gluten-Free', 'Local Meat']
  },
  {
    id: 'sobeys-kelsey-drive',
    chainId: 'sobeys',
    name: 'Sobeys Kelsey Drive',
    type: 'sobeys',
    address: '50 Kelsey Dr',
    city: "St. John's",
    locationId: 'st-johns',
    phone: '(709) 726-7890',
    hours: { weekday: '8:00 AM - 10:00 PM', saturday: '8:00 AM - 10:00 PM', sunday: '8:00 AM - 10:00 PM' },
    features: ['Pharmacy', 'Fresh Seafood', 'Bakery', 'Hot Food Bar']
  },

  // St. John's Area - Dominion
  {
    id: 'dominion-freshwater-road',
    chainId: 'dominion',
    name: 'Dominion Freshwater Road',
    type: 'dominion',
    address: '430 Freshwater Rd',
    city: "St. John's",
    locationId: 'st-johns',
    phone: '(709) 726-7890',
    hours: { weekday: '8:00 AM - 10:00 PM', saturday: '8:00 AM - 10:00 PM', sunday: '8:00 AM - 10:00 PM' },
    features: ['Pharmacy', 'Ready-to-Eat', 'Local Seafood', 'Bakery', 'Deli']
  },
  {
    id: 'dominion-village-mall',
    chainId: 'dominion',
    name: 'Dominion Village Mall',
    type: 'dominion',
    address: '430 Topsail Rd',
    city: "St. John's",
    locationId: 'st-johns',
    phone: '(709) 364-1234',
    hours: { weekday: '8:00 AM - 9:00 PM', saturday: '8:00 AM - 9:00 PM', sunday: '8:00 AM - 9:00 PM' },
    features: ['Pharmacy', 'Fresh Produce', 'Local Products']
  },
  {
    id: 'dominion-blackmarsh',
    chainId: 'dominion',
    name: 'Dominion Blackmarsh Road',
    type: 'dominion',
    address: '200 Blackmarsh Rd',
    city: "St. John's",
    locationId: 'st-johns',
    phone: '(709) 364-5678',
    hours: { weekday: '8:00 AM - 10:00 PM', saturday: '8:00 AM - 10:00 PM', sunday: '8:00 AM - 10:00 PM' },
    features: ['Pharmacy', 'Fresh Seafood', 'Bakery', 'Deli']
  },

  // St. John's - Costco
  {
    id: 'costco-st-johns',
    chainId: 'costco',
    name: "Costco St. John's",
    type: 'costco',
    address: '38 Stavanger Dr',
    city: "St. John's",
    locationId: 'st-johns',
    phone: '(709) 576-2678',
    hours: { weekday: '10:00 AM - 8:30 PM', saturday: '9:30 AM - 6:00 PM', sunday: '10:00 AM - 6:00 PM' },
    features: ['Pharmacy', 'Optical', 'Gas Station', 'Food Court', 'Bulk Items']
  },

  // Mount Pearl
  {
    id: 'sobeys-mount-pearl',
    chainId: 'sobeys',
    name: 'Sobeys Mount Pearl',
    type: 'sobeys',
    address: '60 Commonwealth Ave',
    city: 'Mount Pearl',
    locationId: 'mount-pearl',
    phone: '(709) 368-2345',
    hours: { weekday: '8:00 AM - 9:00 PM', saturday: '8:00 AM - 9:00 PM', sunday: '8:00 AM - 9:00 PM' },
    features: ['Pharmacy', 'Fresh Produce', 'Bakery']
  },
  {
    id: 'dominion-mount-pearl',
    chainId: 'dominion',
    name: 'Dominion Mount Pearl',
    type: 'dominion',
    address: '70 Commonwealth Ave',
    city: 'Mount Pearl',
    locationId: 'mount-pearl',
    phone: '(709) 368-3456',
    hours: { weekday: '8:00 AM - 9:00 PM', saturday: '8:00 AM - 9:00 PM', sunday: '8:00 AM - 9:00 PM' },
    features: ['Pharmacy', 'Fresh Seafood', 'Deli']
  },

  // Paradise
  {
    id: 'sobeys-paradise',
    chainId: 'sobeys',
    name: 'Sobeys Paradise',
    type: 'sobeys',
    address: '1296 Topsail Rd',
    city: 'Paradise',
    locationId: 'paradise',
    phone: '(709) 782-4567',
    hours: { weekday: '8:00 AM - 10:00 PM', saturday: '8:00 AM - 10:00 PM', sunday: '8:00 AM - 10:00 PM' },
    features: ['Pharmacy', 'Fresh Seafood', 'Bakery', 'Online Ordering']
  },

  // Corner Brook
  {
    id: 'sobeys-corner-brook',
    chainId: 'sobeys',
    name: 'Sobeys Corner Brook',
    type: 'sobeys',
    address: '1 Murphy Square',
    city: 'Corner Brook',
    locationId: 'corner-brook',
    phone: '(709) 634-2345',
    hours: { weekday: '8:00 AM - 9:00 PM', saturday: '8:00 AM - 9:00 PM', sunday: '8:00 AM - 9:00 PM' },
    features: ['Pharmacy', 'Fresh Seafood', 'Local Produce', 'Bakery']
  },
  {
    id: 'dominion-corner-brook',
    chainId: 'dominion',
    name: 'Dominion Corner Brook',
    type: 'dominion',
    address: '42 Main St',
    city: 'Corner Brook',
    locationId: 'corner-brook',
    phone: '(709) 634-5678',
    hours: { weekday: '8:00 AM - 9:00 PM', saturday: '8:00 AM - 9:00 PM', sunday: '8:00 AM - 9:00 PM' },
    features: ['Pharmacy', 'Fresh Produce', 'Deli']
  },
  {
    id: 'costco-corner-brook',
    chainId: 'costco',
    name: 'Costco Corner Brook',
    type: 'costco',
    address: '5 Murphy Square',
    city: 'Corner Brook',
    locationId: 'corner-brook',
    phone: '(709) 634-2678',
    hours: { weekday: '10:00 AM - 8:30 PM', saturday: '9:30 AM - 6:00 PM', sunday: '10:00 AM - 6:00 PM' },
    features: ['Pharmacy', 'Optical', 'Gas Station', 'Food Court']
  },
  {
    id: 'coleman-corner-brook',
    chainId: 'coleman',
    name: "Coleman's Corner Brook",
    type: 'coleman',
    address: '15 West St',
    city: 'Corner Brook',
    locationId: 'corner-brook',
    phone: '(709) 634-7890',
    hours: { weekday: '8:00 AM - 9:00 PM', saturday: '8:00 AM - 9:00 PM', sunday: '10:00 AM - 6:00 PM' },
    features: ['Local Products', 'Fresh Produce', 'Competitive Prices']
  },

  // Gander
  {
    id: 'dominion-gander',
    chainId: 'dominion',
    name: 'Dominion Gander',
    type: 'dominion',
    address: '109 Elizabeth Dr',
    city: 'Gander',
    locationId: 'gander',
    phone: '(709) 256-3456',
    hours: { weekday: '8:00 AM - 9:00 PM', saturday: '8:00 AM - 9:00 PM', sunday: '8:00 AM - 9:00 PM' },
    features: ['Pharmacy', 'Local Meat', 'Fresh Seafood', 'Bakery']
  },
  {
    id: 'coleman-gander',
    chainId: 'coleman',
    name: "Coleman's Gander",
    type: 'coleman',
    address: '115 Airport Blvd',
    city: 'Gander',
    locationId: 'gander',
    phone: '(709) 256-4567',
    hours: { weekday: '8:00 AM - 9:00 PM', saturday: '8:00 AM - 9:00 PM', sunday: '10:00 AM - 6:00 PM' },
    features: ['Local Products', 'Competitive Prices']
  },

  // Grand Falls-Windsor
  {
    id: 'sobeys-grand-falls',
    chainId: 'sobeys',
    name: 'Sobeys Grand Falls-Windsor',
    type: 'sobeys',
    address: '2 High St',
    city: 'Grand Falls-Windsor',
    locationId: 'grand-falls-windsor',
    phone: '(709) 489-2345',
    hours: { weekday: '8:00 AM - 9:00 PM', saturday: '8:00 AM - 9:00 PM', sunday: '8:00 AM - 9:00 PM' },
    features: ['Pharmacy', 'Fresh Produce', 'Bakery']
  },
  {
    id: 'dominion-grand-falls',
    chainId: 'dominion',
    name: 'Dominion Grand Falls-Windsor',
    type: 'dominion',
    address: '5 Cromer Ave',
    city: 'Grand Falls-Windsor',
    locationId: 'grand-falls-windsor',
    phone: '(709) 489-3456',
    hours: { weekday: '8:00 AM - 9:00 PM', saturday: '8:00 AM - 9:00 PM', sunday: '8:00 AM - 9:00 PM' },
    features: ['Pharmacy', 'Fresh Seafood', 'Deli']
  },

  // Clarenville
  {
    id: 'dominion-clarenville',
    chainId: 'dominion',
    name: 'Dominion Clarenville',
    type: 'dominion',
    address: '189 Memorial Dr',
    city: 'Clarenville',
    locationId: 'clarenville',
    phone: '(709) 466-2345',
    hours: { weekday: '8:00 AM - 9:00 PM', saturday: '8:00 AM - 9:00 PM', sunday: '10:00 AM - 6:00 PM' },
    features: ['Pharmacy', 'Fresh Produce', 'Local Products']
  },

  // Stephenville
  {
    id: 'sobeys-stephenville',
    chainId: 'sobeys',
    name: 'Sobeys Stephenville',
    type: 'sobeys',
    address: '42 Queen St',
    city: 'Stephenville',
    locationId: 'stephenville',
    phone: '(709) 643-2345',
    hours: { weekday: '8:00 AM - 9:00 PM', saturday: '8:00 AM - 9:00 PM', sunday: '10:00 AM - 6:00 PM' },
    features: ['Pharmacy', 'Fresh Produce', 'Bakery']
  },

  // Conception Bay South
  {
    id: 'sobeys-cbs',
    chainId: 'sobeys',
    name: 'Sobeys Conception Bay South',
    type: 'sobeys',
    address: '737 Conception Bay Hwy',
    city: 'Conception Bay South',
    locationId: 'conception-bay-south',
    phone: '(709) 834-2345',
    hours: { weekday: '8:00 AM - 10:00 PM', saturday: '8:00 AM - 10:00 PM', sunday: '8:00 AM - 10:00 PM' },
    features: ['Pharmacy', 'Fresh Seafood', 'Bakery', 'Online Ordering']
  },

  // Carbonear
  {
    id: 'dominion-carbonear',
    chainId: 'dominion',
    name: 'Dominion Carbonear',
    type: 'dominion',
    address: '85 Columbus Dr',
    city: 'Carbonear',
    locationId: 'carbonear',
    phone: '(709) 596-2345',
    hours: { weekday: '8:00 AM - 9:00 PM', saturday: '8:00 AM - 9:00 PM', sunday: '10:00 AM - 6:00 PM' },
    features: ['Pharmacy', 'Fresh Produce', 'Local Seafood']
  },

  // Bay Roberts
  {
    id: 'coleman-bay-roberts',
    chainId: 'coleman',
    name: "Coleman's Bay Roberts",
    type: 'coleman',
    address: '44 Conception Bay Hwy',
    city: 'Bay Roberts',
    locationId: 'bay-roberts',
    phone: '(709) 786-2345',
    hours: { weekday: '8:00 AM - 9:00 PM', saturday: '8:00 AM - 9:00 PM', sunday: '10:00 AM - 6:00 PM' },
    features: ['Local Products', 'Fresh Produce', 'Competitive Prices']
  },

  // Marystown
  {
    id: 'dominion-marystown',
    chainId: 'dominion',
    name: 'Dominion Marystown',
    type: 'dominion',
    address: '1 Ville Marie Dr',
    city: 'Marystown',
    locationId: 'marystown',
    phone: '(709) 279-2345',
    hours: { weekday: '8:00 AM - 9:00 PM', saturday: '8:00 AM - 9:00 PM', sunday: '10:00 AM - 6:00 PM' },
    features: ['Pharmacy', 'Fresh Seafood', 'Local Products']
  },

  // Labrador City
  {
    id: 'dominion-labrador-city',
    chainId: 'dominion',
    name: 'Dominion Labrador City',
    type: 'dominion',
    address: '500 Vanier Ave',
    city: 'Labrador City',
    locationId: 'labrador-city',
    phone: '(709) 944-2345',
    hours: { weekday: '9:00 AM - 9:00 PM', saturday: '9:00 AM - 9:00 PM', sunday: '10:00 AM - 6:00 PM' },
    features: ['Pharmacy', 'Fresh Produce', 'Northern Products']
  },

  // Happy Valley-Goose Bay
  {
    id: 'northern-happy-valley',
    chainId: 'northern',
    name: 'Northern Store Happy Valley-Goose Bay',
    type: 'northern',
    address: '369 Hamilton River Rd',
    city: 'Happy Valley-Goose Bay',
    locationId: 'happy-valley-goose-bay',
    phone: '(709) 896-2345',
    hours: { weekday: '9:00 AM - 9:00 PM', saturday: '9:00 AM - 6:00 PM', sunday: '12:00 PM - 5:00 PM' },
    features: ['Northern Products', 'Essential Supplies', 'Fresh Produce']
  }
];

// Helper functions
export const getLocationsByRegion = (region: NLLocation['region']): NLLocation[] => {
  return nlLocations.filter(loc => loc.region === region);
};

export const getLocationsWithStores = (): NLLocation[] => {
  return nlLocations.filter(loc => loc.hasGroceryStores);
};

export const getStoresByLocation = (locationId: string): ExtendedStore[] => {
  return extendedStores.filter(store => store.locationId === locationId);
};

export const getStoresByChain = (chainId: string): ExtendedStore[] => {
  return extendedStores.filter(store => store.chainId === chainId);
};

export const getStoreById = (storeId: string): ExtendedStore | undefined => {
  return extendedStores.find(store => store.id === storeId);
};

export const getChainById = (chainId: string): GroceryChain | undefined => {
  return groceryChains.find(chain => chain.id === chainId);
};

export const searchLocations = (query: string): NLLocation[] => {
  const lowercaseQuery = query.toLowerCase();
  return nlLocations.filter(loc =>
    loc.name.toLowerCase().includes(lowercaseQuery) ||
    loc.region.toLowerCase().includes(lowercaseQuery)
  );
};

export const getLocationById = (locationId: string): NLLocation | undefined => {
  return nlLocations.find(loc => loc.id === locationId);
};

// Get all unique cities with stores
export const getCitiesWithStores = (): string[] => {
  const cities = new Set(extendedStores.map(store => store.city));
  return Array.from(cities).sort();
};

// Get stores near a location (same city or region)
export const getNearbyStores = (locationId: string): ExtendedStore[] => {
  const location = getLocationById(locationId);
  if (!location) return [];

  // First try same city
  const sameCity = extendedStores.filter(store => store.locationId === locationId);
  if (sameCity.length > 0) return sameCity;

  // If no stores in city, get stores from same region
  const regionLocations = getLocationsByRegion(location.region);
  const regionStores = regionLocations
    .flatMap(loc => getStoresByLocation(loc.id))
    .filter(store => store !== undefined);

  return regionStores;
};
