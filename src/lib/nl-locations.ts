// Newfoundland & Labrador locations and grocery store data
// Updated December 2025 - Complete Grocery Store Directory

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
  { id: 'torbay', name: 'Torbay', region: 'Avalon', population: 7899, hasGroceryStores: false },
  { id: 'portugal-cove', name: "Portugal Cove-St. Philip's", region: 'Avalon', population: 8147, hasGroceryStores: false },
  { id: 'bay-roberts', name: 'Bay Roberts', region: 'Avalon', population: 6012, hasGroceryStores: true },
  { id: 'carbonear', name: 'Carbonear', region: 'Avalon', population: 4372, hasGroceryStores: true },
  { id: 'harbour-grace', name: 'Harbour Grace', region: 'Avalon', population: 2995, hasGroceryStores: false },
  { id: 'placentia', name: 'Placentia', region: 'Avalon', population: 3496, hasGroceryStores: false },
  { id: 'ferryland', name: 'Ferryland', region: 'Avalon', population: 465, hasGroceryStores: true },
  { id: 'bay-bulls', name: 'Bay Bulls', region: 'Avalon', population: 1200, hasGroceryStores: true },
  { id: 'whitbourne', name: 'Whitbourne', region: 'Avalon', population: 900, hasGroceryStores: true },
  { id: 'old-perlican', name: 'Old Perlican', region: 'Avalon', population: 650, hasGroceryStores: true },

  // Eastern Region
  { id: 'clarenville', name: 'Clarenville', region: 'Eastern', population: 6291, hasGroceryStores: true },
  { id: 'bonavista', name: 'Bonavista', region: 'Eastern', population: 3589, hasGroceryStores: true },
  { id: 'marystown', name: 'Marystown', region: 'Eastern', population: 5316, hasGroceryStores: true },
  { id: 'burin', name: 'Burin', region: 'Eastern', population: 2315, hasGroceryStores: true },
  { id: 'grand-bank', name: 'Grand Bank', region: 'Eastern', population: 2248, hasGroceryStores: true },
  { id: 'fortune', name: 'Fortune', region: 'Eastern', population: 1458, hasGroceryStores: false },
  { id: 'arnolds-cove', name: "Arnold's Cove", region: 'Eastern', population: 1000, hasGroceryStores: true },
  { id: 'glovertown', name: 'Glovertown', region: 'Eastern', population: 2000, hasGroceryStores: true },
  { id: 'gambo', name: 'Gambo', region: 'Eastern', population: 2000, hasGroceryStores: true },

  // Central Region
  { id: 'gander', name: 'Gander', region: 'Central', population: 11688, hasGroceryStores: true },
  { id: 'grand-falls-windsor', name: 'Grand Falls-Windsor', region: 'Central', population: 14171, hasGroceryStores: true },
  { id: 'bishops-falls', name: "Bishop's Falls", region: 'Central', population: 3024, hasGroceryStores: true },
  { id: 'lewisporte', name: 'Lewisporte', region: 'Central', population: 3409, hasGroceryStores: true },
  { id: 'twillingate', name: 'Twillingate', region: 'Central', population: 2196, hasGroceryStores: true },
  { id: 'botwood', name: 'Botwood', region: 'Central', population: 2785, hasGroceryStores: true },
  { id: 'springdale', name: 'Springdale', region: 'Central', population: 2900, hasGroceryStores: true },

  // Western Region
  { id: 'corner-brook', name: 'Corner Brook', region: 'Western', population: 19806, hasGroceryStores: true },
  { id: 'stephenville', name: 'Stephenville', region: 'Western', population: 6623, hasGroceryStores: true },
  { id: 'deer-lake', name: 'Deer Lake', region: 'Western', population: 5249, hasGroceryStores: true },
  { id: 'pasadena', name: 'Pasadena', region: 'Western', population: 3620, hasGroceryStores: true },
  { id: 'port-aux-basques', name: 'Channel-Port aux Basques', region: 'Western', population: 4067, hasGroceryStores: true },
  { id: 'rocky-harbour', name: 'Rocky Harbour', region: 'Western', population: 925, hasGroceryStores: false },
  { id: 'st-anthony', name: "St. Anthony", region: 'Western', population: 2258, hasGroceryStores: true },
  { id: 'port-aux-choix', name: 'Port au Choix', region: 'Western', population: 800, hasGroceryStores: true },
  { id: 'roddickton', name: 'Roddickton', region: 'Western', population: 900, hasGroceryStores: true },
  { id: 'flowers-cove', name: "Flower's Cove", region: 'Western', population: 300, hasGroceryStores: true },

  // Labrador
  { id: 'happy-valley-goose-bay', name: 'Happy Valley-Goose Bay', region: 'Labrador', population: 8109, hasGroceryStores: true },
  { id: 'labrador-city', name: 'Labrador City', region: 'Labrador', population: 7220, hasGroceryStores: true },
  { id: 'wabush', name: 'Wabush', region: 'Labrador', population: 1906, hasGroceryStores: false },
  { id: 'nain', name: 'Nain', region: 'Labrador', population: 1125, hasGroceryStores: true },
  { id: 'hopedale', name: 'Hopedale', region: 'Labrador', population: 596, hasGroceryStores: true },
  { id: 'makkovik', name: 'Makkovik', region: 'Labrador', population: 361, hasGroceryStores: true },
  { id: 'rigolet', name: 'Rigolet', region: 'Labrador', population: 300, hasGroceryStores: true },
  { id: 'postville', name: 'Postville', region: 'Labrador', population: 200, hasGroceryStores: true },
  { id: 'lanse-au-loup', name: "L'Anse au Loup", region: 'Labrador', population: 500, hasGroceryStores: true },
  { id: 'forteau', name: 'Forteau', region: 'Labrador', population: 400, hasGroceryStores: true },
  { id: 'lanse-au-clair', name: "L'Anse au Clair", region: 'Labrador', population: 200, hasGroceryStores: true },
];

// Grocery store chain types
export type StoreType = 'dominion' | 'atlantic-superstore' | 'sobeys' | 'colemans' | 'walmart' | 'costco' | 'nofrills' | 'foodland' | 'northmart' | 'wholesale-club' | 'bulk-barn' | 'specialty';

// Grocery store chains in NL
export interface GroceryChain {
  id: string;
  name: string;
  type: StoreType;
  description: string;
  priceLevel: 'budget' | 'mid-range' | 'premium' | 'bulk';
  hasOnlineOrdering: boolean;
  hasFlyer: boolean;
  loyaltyProgram?: string;
  website?: string;
}

export const groceryChains: GroceryChain[] = [
  {
    id: 'dominion',
    name: 'Dominion',
    type: 'dominion',
    description: 'Loblaw-owned supermarket with full service departments',
    priceLevel: 'mid-range',
    hasOnlineOrdering: true,
    hasFlyer: true,
    loyaltyProgram: 'PC Optimum',
    website: 'www.newfoundlandgrocerystores.ca'
  },
  {
    id: 'atlantic-superstore',
    name: 'Atlantic Superstore',
    type: 'atlantic-superstore',
    description: 'Large format Loblaw store with wide selection',
    priceLevel: 'mid-range',
    hasOnlineOrdering: true,
    hasFlyer: true,
    loyaltyProgram: 'PC Optimum',
    website: 'www.atlanticsuperstore.ca'
  },
  {
    id: 'sobeys',
    name: 'Sobeys',
    type: 'sobeys',
    description: 'Full-service supermarket with fresh departments and pharmacy',
    priceLevel: 'mid-range',
    hasOnlineOrdering: true,
    hasFlyer: true,
    loyaltyProgram: 'Scene+',
    website: 'www.sobeys.com'
  },
  {
    id: 'colemans',
    name: "Coleman's",
    type: 'colemans',
    description: 'NL family-owned since 1934, known for excellent service',
    priceLevel: 'mid-range',
    hasOnlineOrdering: true,
    hasFlyer: true,
    website: 'www.colemans.ca'
  },
  {
    id: 'walmart',
    name: 'Walmart',
    type: 'walmart',
    description: 'Low prices, general merchandise with grocery',
    priceLevel: 'budget',
    hasOnlineOrdering: true,
    hasFlyer: true,
    website: 'www.walmart.ca'
  },
  {
    id: 'costco',
    name: 'Costco',
    type: 'costco',
    description: 'Warehouse club with bulk buying, membership required',
    priceLevel: 'bulk',
    hasOnlineOrdering: false,
    hasFlyer: false,
    website: 'www.costco.ca'
  },
  {
    id: 'nofrills',
    name: 'No Frills',
    type: 'nofrills',
    description: 'Discount grocery store with low prices',
    priceLevel: 'budget',
    hasOnlineOrdering: false,
    hasFlyer: true,
    loyaltyProgram: 'PC Optimum',
    website: 'www.nofrills.ca'
  },
  {
    id: 'foodland',
    name: 'Foodland',
    type: 'foodland',
    description: 'Sobeys-owned community stores serving rural areas',
    priceLevel: 'mid-range',
    hasOnlineOrdering: false,
    hasFlyer: true,
    loyaltyProgram: 'Scene+',
    website: 'www.foodland.ca'
  },
  {
    id: 'northmart',
    name: 'NorthMart/Northern',
    type: 'northmart',
    description: 'North West Company stores serving remote communities',
    priceLevel: 'premium',
    hasOnlineOrdering: false,
    hasFlyer: true,
    website: 'www.northmart.ca'
  },
  {
    id: 'wholesale-club',
    name: 'Wholesale Club',
    type: 'wholesale-club',
    description: 'Loblaw-owned bulk/business grocery',
    priceLevel: 'bulk',
    hasOnlineOrdering: false,
    hasFlyer: true,
    loyaltyProgram: 'PC Optimum',
    website: 'www.wholesaleclub.ca'
  },
  {
    id: 'bulk-barn',
    name: 'Bulk Barn',
    type: 'bulk-barn',
    description: 'Bulk foods and baking supplies',
    priceLevel: 'mid-range',
    hasOnlineOrdering: false,
    hasFlyer: true,
    website: 'www.bulkbarn.ca'
  }
];

// Extended store locations for NL
export interface ExtendedStore {
  id: string;
  chainId: string;
  name: string;
  type: StoreType;
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
  is24Hour?: boolean;
}

export const extendedStores: ExtendedStore[] = [
  // ============================================
  // ST. JOHN'S METRO AREA
  // ============================================

  // St. John's - Dominion
  {
    id: 'dominion-stavanger',
    chainId: 'dominion',
    name: 'Dominion Stavanger Drive',
    type: 'dominion',
    address: '55 Stavanger Dr',
    city: "St. John's",
    locationId: 'st-johns',
    phone: '(709) 726-0100',
    hours: { weekday: '8:00 AM - 10:00 PM', saturday: '8:00 AM - 10:00 PM', sunday: '8:00 AM - 10:00 PM' },
    features: ['Pharmacy', 'PC Optimum', 'Fresh Seafood', 'Bakery', 'Deli']
  },
  {
    id: 'dominion-lake-ave',
    chainId: 'dominion',
    name: 'Dominion Lake Avenue',
    type: 'dominion',
    address: '20 Lake Ave',
    city: "St. John's",
    locationId: 'st-johns',
    phone: '(709) 726-0101',
    hours: { weekday: '8:00 AM - 10:00 PM', saturday: '8:00 AM - 10:00 PM', sunday: '8:00 AM - 10:00 PM' },
    features: ['Pharmacy', 'PC Optimum', 'Fresh Produce', 'Bakery']
  },
  {
    id: 'dominion-blackmarsh',
    chainId: 'dominion',
    name: 'Dominion Blackmarsh Road',
    type: 'dominion',
    address: '260 Blackmarsh Rd',
    city: "St. John's",
    locationId: 'st-johns',
    phone: '(709) 726-0102',
    hours: { weekday: '8:00 AM - 10:00 PM', saturday: '8:00 AM - 10:00 PM', sunday: '8:00 AM - 10:00 PM' },
    features: ['Pharmacy', 'PC Optimum', 'Fresh Seafood', 'Bakery', 'Deli']
  },

  // St. John's - Atlantic Superstore
  {
    id: 'superstore-stavanger',
    chainId: 'atlantic-superstore',
    name: 'Atlantic Superstore Stavanger',
    type: 'atlantic-superstore',
    address: '55 Stavanger Dr',
    city: "St. John's",
    locationId: 'st-johns',
    phone: '(709) 726-1000',
    hours: { weekday: '8:00 AM - 10:00 PM', saturday: '8:00 AM - 10:00 PM', sunday: '8:00 AM - 10:00 PM' },
    features: ['Pharmacy', 'PC Optimum', 'Joe Fresh', 'Optical', 'Fresh Produce']
  },
  {
    id: 'superstore-lake-ave',
    chainId: 'atlantic-superstore',
    name: 'Atlantic Superstore Lake Ave',
    type: 'atlantic-superstore',
    address: '20 Lake Ave',
    city: "St. John's",
    locationId: 'st-johns',
    phone: '(709) 726-1001',
    hours: { weekday: '8:00 AM - 10:00 PM', saturday: '8:00 AM - 10:00 PM', sunday: '8:00 AM - 10:00 PM' },
    features: ['Pharmacy', 'PC Optimum', 'Fresh Produce', 'Bakery']
  },

  // St. John's - Sobeys
  {
    id: 'sobeys-elizabeth',
    chainId: 'sobeys',
    name: 'Sobeys Elizabeth Avenue',
    type: 'sobeys',
    address: '175 Elizabeth Ave',
    city: "St. John's",
    locationId: 'st-johns',
    phone: '(709) 726-2000',
    hours: { weekday: '8:00 AM - 10:00 PM', saturday: '8:00 AM - 10:00 PM', sunday: '8:00 AM - 10:00 PM' },
    features: ['Pharmacy', 'Scene+', 'Fresh Seafood', 'Bakery', 'Deli']
  },
  {
    id: 'sobeys-ropewalk',
    chainId: 'sobeys',
    name: 'Sobeys Ropewalk Lane',
    type: 'sobeys',
    address: '30 Ropewalk Lane',
    city: "St. John's",
    locationId: 'st-johns',
    phone: '(709) 726-2001',
    hours: { weekday: '24 Hours', saturday: '24 Hours', sunday: '24 Hours' },
    features: ['Pharmacy', 'Scene+', '24 Hour', 'Fresh Produce', 'Bakery'],
    is24Hour: true
  },
  {
    id: 'sobeys-kelsey',
    chainId: 'sobeys',
    name: 'Sobeys Kelsey Drive',
    type: 'sobeys',
    address: '50 Kelsey Dr',
    city: "St. John's",
    locationId: 'st-johns',
    phone: '(709) 726-2002',
    hours: { weekday: '8:00 AM - 10:00 PM', saturday: '8:00 AM - 10:00 PM', sunday: '8:00 AM - 10:00 PM' },
    features: ['Pharmacy', 'Scene+', 'Fresh Seafood', 'Bakery', 'Hot Food Bar']
  },
  {
    id: 'sobeys-torbay-rd',
    chainId: 'sobeys',
    name: 'Sobeys Torbay Road',
    type: 'sobeys',
    address: '30 Torbay Rd',
    city: "St. John's",
    locationId: 'st-johns',
    phone: '(709) 726-2003',
    hours: { weekday: '8:00 AM - 10:00 PM', saturday: '8:00 AM - 10:00 PM', sunday: '8:00 AM - 10:00 PM' },
    features: ['Pharmacy', 'Scene+', 'Organic Section', 'Gluten-Free']
  },

  // St. John's - Coleman's
  {
    id: 'colemans-newfoundland-dr',
    chainId: 'colemans',
    name: "Coleman's Newfoundland Drive",
    type: 'colemans',
    address: '370 Newfoundland Dr',
    city: "St. John's",
    locationId: 'st-johns',
    phone: '(709) 726-3000',
    hours: { weekday: '8:00 AM - 9:00 PM', saturday: '8:00 AM - 9:00 PM', sunday: '10:00 AM - 6:00 PM' },
    features: ['Online Ordering', 'Local Products', 'Fresh Produce', 'Bakery']
  },
  {
    id: 'belbins-quidi-vidi',
    chainId: 'colemans',
    name: "Belbin's Grocery (Coleman's)",
    type: 'colemans',
    address: '85 Quidi Vidi Rd',
    city: "St. John's",
    locationId: 'st-johns',
    phone: '(709) 726-3001',
    hours: { weekday: '8:00 AM - 9:00 PM', saturday: '8:00 AM - 9:00 PM', sunday: '10:00 AM - 6:00 PM' },
    features: ['Coleman\'s owned since 2018', 'Local Products', 'Fresh Produce']
  },

  // St. John's - Walmart
  {
    id: 'walmart-aberdeen',
    chainId: 'walmart',
    name: 'Walmart Aberdeen Avenue',
    type: 'walmart',
    address: '90 Aberdeen Ave',
    city: "St. John's",
    locationId: 'st-johns',
    phone: '(709) 726-4000',
    hours: { weekday: '7:00 AM - 11:00 PM', saturday: '7:00 AM - 11:00 PM', sunday: '7:00 AM - 11:00 PM' },
    features: ['Supercentre', 'Pharmacy', 'Photo Centre', 'General Merchandise']
  },
  {
    id: 'walmart-kelsey',
    chainId: 'walmart',
    name: 'Walmart Kelsey Drive',
    type: 'walmart',
    address: '75 Kelsey Dr',
    city: "St. John's",
    locationId: 'st-johns',
    phone: '(709) 726-4001',
    hours: { weekday: '7:00 AM - 11:00 PM', saturday: '7:00 AM - 11:00 PM', sunday: '7:00 AM - 11:00 PM' },
    features: ['Supercentre', 'Pharmacy', 'General Merchandise']
  },

  // St. John's - Costco
  {
    id: 'costco-st-johns',
    chainId: 'costco',
    name: "Costco St. John's",
    type: 'costco',
    address: '75 Danny Dr',
    city: "St. John's",
    locationId: 'st-johns',
    phone: '(709) 576-2678',
    hours: { weekday: '10:00 AM - 8:30 PM', saturday: '9:30 AM - 6:00 PM', sunday: '10:00 AM - 6:00 PM' },
    features: ['Membership Required', 'Pharmacy', 'Optical', 'Gas Station', 'Food Court', 'Bulk Items']
  },

  // St. John's - Wholesale Club
  {
    id: 'wholesale-club-st-johns',
    chainId: 'wholesale-club',
    name: 'Wholesale Club',
    type: 'wholesale-club',
    address: "37 O'Leary Ave",
    city: "St. John's",
    locationId: 'st-johns',
    phone: '(709) 726-5000',
    hours: { weekday: '8:00 AM - 6:00 PM', saturday: '8:00 AM - 6:00 PM', sunday: 'Closed' },
    features: ['Bulk/Business', 'PC Optimum', 'Restaurant Supplies']
  },

  // St. John's - Bulk Barn
  {
    id: 'bulkbarn-kelsey',
    chainId: 'bulk-barn',
    name: 'Bulk Barn Kelsey Drive',
    type: 'bulk-barn',
    address: '39A Kelsey Dr',
    city: "St. John's",
    locationId: 'st-johns',
    phone: '(709) 726-6000',
    hours: { weekday: '9:00 AM - 9:00 PM', saturday: '9:00 AM - 6:00 PM', sunday: '12:00 PM - 5:00 PM' },
    features: ['Bulk Foods', 'Baking Supplies', 'Snacks', 'Candy']
  },
  {
    id: 'bulkbarn-white-rose',
    chainId: 'bulk-barn',
    name: 'Bulk Barn White Rose Drive',
    type: 'bulk-barn',
    address: '30 White Rose Dr',
    city: "St. John's",
    locationId: 'st-johns',
    phone: '(709) 726-6001',
    hours: { weekday: '9:00 AM - 9:00 PM', saturday: '9:00 AM - 6:00 PM', sunday: '12:00 PM - 5:00 PM' },
    features: ['Bulk Foods', 'Baking Supplies', 'Snacks']
  },

  // ============================================
  // MOUNT PEARL
  // ============================================
  {
    id: 'sobeys-mount-pearl',
    chainId: 'sobeys',
    name: 'Sobeys Mount Pearl',
    type: 'sobeys',
    address: '60 Commonwealth Ave',
    city: 'Mount Pearl',
    locationId: 'mount-pearl',
    phone: '(709) 368-2000',
    hours: { weekday: '8:00 AM - 10:00 PM', saturday: '8:00 AM - 10:00 PM', sunday: '8:00 AM - 10:00 PM' },
    features: ['Pharmacy', 'Scene+', 'Fresh Produce', 'Bakery']
  },
  {
    id: 'walmart-mount-pearl',
    chainId: 'walmart',
    name: 'Walmart Mount Pearl',
    type: 'walmart',
    address: '60 Merchant Dr',
    city: 'Mount Pearl',
    locationId: 'mount-pearl',
    phone: '(709) 368-4000',
    hours: { weekday: '7:00 AM - 11:00 PM', saturday: '7:00 AM - 11:00 PM', sunday: '7:00 AM - 11:00 PM' },
    features: ['Supercentre', 'Pharmacy', 'General Merchandise']
  },
  {
    id: 'bulkbarn-mount-pearl',
    chainId: 'bulk-barn',
    name: 'Bulk Barn Mount Pearl',
    type: 'bulk-barn',
    address: '22 Gibson Dr',
    city: 'Mount Pearl',
    locationId: 'mount-pearl',
    phone: '(709) 368-6000',
    hours: { weekday: '9:00 AM - 9:00 PM', saturday: '9:00 AM - 6:00 PM', sunday: '12:00 PM - 5:00 PM' },
    features: ['Bulk Foods', 'Baking Supplies']
  },

  // ============================================
  // CONCEPTION BAY SOUTH & PARADISE
  // ============================================
  {
    id: 'dominion-cbs',
    chainId: 'dominion',
    name: 'Dominion CBS',
    type: 'dominion',
    address: '166 Conception Bay Hwy',
    city: 'Conception Bay South',
    locationId: 'conception-bay-south',
    phone: '(709) 834-2000',
    hours: { weekday: '8:00 AM - 10:00 PM', saturday: '8:00 AM - 10:00 PM', sunday: '8:00 AM - 10:00 PM' },
    features: ['Pharmacy', 'PC Optimum', 'Fresh Produce']
  },
  {
    id: 'superstore-cbs',
    chainId: 'atlantic-superstore',
    name: 'Atlantic Superstore CBS',
    type: 'atlantic-superstore',
    address: '166 Conception Bay Hwy',
    city: 'Conception Bay South',
    locationId: 'conception-bay-south',
    phone: '(709) 834-2001',
    hours: { weekday: '8:00 AM - 10:00 PM', saturday: '8:00 AM - 10:00 PM', sunday: '8:00 AM - 10:00 PM' },
    features: ['Pharmacy', 'PC Optimum', 'Joe Fresh']
  },
  {
    id: 'sobeys-long-pond',
    chainId: 'sobeys',
    name: 'Sobeys Long Pond',
    type: 'sobeys',
    address: '350 Conception Bay Hwy',
    city: 'Conception Bay South',
    locationId: 'conception-bay-south',
    phone: '(709) 834-3000',
    hours: { weekday: '8:00 AM - 10:00 PM', saturday: '8:00 AM - 10:00 PM', sunday: '8:00 AM - 10:00 PM' },
    features: ['Pharmacy', 'Scene+', 'Fresh Seafood', 'Bakery']
  },
  {
    id: 'nofrills-paradise',
    chainId: 'nofrills',
    name: 'No Frills Paradise',
    type: 'nofrills',
    address: '1300 Topsail Rd',
    city: 'Paradise',
    locationId: 'paradise',
    phone: '(709) 782-5000',
    hours: { weekday: '8:00 AM - 9:00 PM', saturday: '8:00 AM - 9:00 PM', sunday: '10:00 AM - 6:00 PM' },
    features: ['Discount Prices', 'PC Optimum', 'Fresh Produce']
  },

  // ============================================
  // AVALON PENINSULA (OUTSIDE METRO)
  // ============================================

  // Bay Roberts
  {
    id: 'dominion-bay-roberts',
    chainId: 'dominion',
    name: 'Dominion Bay Roberts',
    type: 'dominion',
    address: 'Main Hwy',
    city: 'Bay Roberts',
    locationId: 'bay-roberts',
    phone: '(709) 786-2000',
    hours: { weekday: '8:00 AM - 9:00 PM', saturday: '8:00 AM - 9:00 PM', sunday: '10:00 AM - 6:00 PM' },
    features: ['Pharmacy', 'PC Optimum', 'Fresh Produce']
  },
  {
    id: 'superstore-bay-roberts',
    chainId: 'atlantic-superstore',
    name: 'Atlantic Superstore Bay Roberts',
    type: 'atlantic-superstore',
    address: 'Main Hwy',
    city: 'Bay Roberts',
    locationId: 'bay-roberts',
    phone: '(709) 786-2001',
    hours: { weekday: '8:00 AM - 9:00 PM', saturday: '8:00 AM - 9:00 PM', sunday: '10:00 AM - 6:00 PM' },
    features: ['Pharmacy', 'PC Optimum']
  },
  {
    id: 'foodland-bay-roberts',
    chainId: 'foodland',
    name: 'Foodland Bay Roberts',
    type: 'foodland',
    address: 'Water St',
    city: 'Bay Roberts',
    locationId: 'bay-roberts',
    phone: '(709) 786-3000',
    hours: { weekday: '8:00 AM - 9:00 PM', saturday: '8:00 AM - 9:00 PM', sunday: '10:00 AM - 6:00 PM' },
    features: ['Scene+', 'Community Store', 'Fresh Produce']
  },

  // Carbonear
  {
    id: 'dominion-carbonear',
    chainId: 'dominion',
    name: 'Dominion Carbonear',
    type: 'dominion',
    address: 'Columbus Dr',
    city: 'Carbonear',
    locationId: 'carbonear',
    phone: '(709) 596-2000',
    hours: { weekday: '8:00 AM - 9:00 PM', saturday: '8:00 AM - 9:00 PM', sunday: '10:00 AM - 6:00 PM' },
    features: ['Pharmacy', 'PC Optimum', 'Fresh Produce']
  },
  {
    id: 'sobeys-carbonear',
    chainId: 'sobeys',
    name: 'Sobeys Carbonear',
    type: 'sobeys',
    address: 'Columbus Dr',
    city: 'Carbonear',
    locationId: 'carbonear',
    phone: '(709) 596-3000',
    hours: { weekday: '8:00 AM - 9:00 PM', saturday: '8:00 AM - 9:00 PM', sunday: '10:00 AM - 6:00 PM' },
    features: ['Pharmacy', 'Scene+', 'Fresh Produce']
  },
  {
    id: 'walmart-carbonear',
    chainId: 'walmart',
    name: 'Walmart Carbonear',
    type: 'walmart',
    address: '120 Columbus Dr',
    city: 'Carbonear',
    locationId: 'carbonear',
    phone: '(709) 596-4000',
    hours: { weekday: '8:00 AM - 10:00 PM', saturday: '8:00 AM - 10:00 PM', sunday: '10:00 AM - 6:00 PM' },
    features: ['Supercentre', 'Pharmacy']
  },
  {
    id: 'foodland-carbonear',
    chainId: 'foodland',
    name: 'Foodland Carbonear',
    type: 'foodland',
    address: 'Water St',
    city: 'Carbonear',
    locationId: 'carbonear',
    phone: '(709) 596-5000',
    hours: { weekday: '8:00 AM - 9:00 PM', saturday: '8:00 AM - 9:00 PM', sunday: '10:00 AM - 6:00 PM' },
    features: ['Scene+', 'Community Store']
  },

  // Other Avalon Foodland locations
  {
    id: 'foodland-bay-bulls',
    chainId: 'foodland',
    name: 'Foodland Bay Bulls',
    type: 'foodland',
    address: 'Main Rd',
    city: 'Bay Bulls',
    locationId: 'bay-bulls',
    phone: '(709) 334-2000',
    hours: { weekday: '8:00 AM - 9:00 PM', saturday: '8:00 AM - 9:00 PM', sunday: '10:00 AM - 6:00 PM' },
    features: ['Scene+', 'Community Store', 'Local Products']
  },
  {
    id: 'foodland-ferryland',
    chainId: 'foodland',
    name: 'Foodland Ferryland',
    type: 'foodland',
    address: 'Main Rd',
    city: 'Ferryland',
    locationId: 'ferryland',
    phone: '(709) 432-2000',
    hours: { weekday: '8:00 AM - 8:00 PM', saturday: '8:00 AM - 8:00 PM', sunday: '10:00 AM - 6:00 PM' },
    features: ['Scene+', 'Rural Community Store']
  },
  {
    id: 'foodland-whitbourne',
    chainId: 'foodland',
    name: 'Foodland Whitbourne',
    type: 'foodland',
    address: 'Main Rd',
    city: 'Whitbourne',
    locationId: 'whitbourne',
    phone: '(709) 759-2000',
    hours: { weekday: '8:00 AM - 8:00 PM', saturday: '8:00 AM - 8:00 PM', sunday: '10:00 AM - 6:00 PM' },
    features: ['Scene+', 'Rural Community Store']
  },
  {
    id: 'foodland-old-perlican',
    chainId: 'foodland',
    name: 'Foodland Old Perlican',
    type: 'foodland',
    address: 'Main Rd',
    city: 'Old Perlican',
    locationId: 'old-perlican',
    phone: '(709) 587-2000',
    hours: { weekday: '8:00 AM - 8:00 PM', saturday: '8:00 AM - 8:00 PM', sunday: '10:00 AM - 5:00 PM' },
    features: ['Scene+', 'Rural Community Store']
  },

  // ============================================
  // EASTERN REGION
  // ============================================

  // Clarenville
  {
    id: 'walmart-clarenville',
    chainId: 'walmart',
    name: 'Walmart Clarenville',
    type: 'walmart',
    address: '11 Shoal Harbour Dr',
    city: 'Clarenville',
    locationId: 'clarenville',
    phone: '(709) 466-4000',
    hours: { weekday: '8:00 AM - 10:00 PM', saturday: '8:00 AM - 10:00 PM', sunday: '10:00 AM - 6:00 PM' },
    features: ['Supercentre', 'Pharmacy']
  },
  {
    id: 'nofrills-clarenville',
    chainId: 'nofrills',
    name: "Michael's No Frills Clarenville",
    type: 'nofrills',
    address: '240B Memorial Dr',
    city: 'Clarenville',
    locationId: 'clarenville',
    phone: '(709) 466-5000',
    hours: { weekday: '8:00 AM - 9:00 PM', saturday: '8:00 AM - 9:00 PM', sunday: '10:00 AM - 6:00 PM' },
    features: ['Discount Prices', 'PC Optimum']
  },

  // Bonavista
  {
    id: 'foodland-bonavista',
    chainId: 'foodland',
    name: 'Foodland Bonavista',
    type: 'foodland',
    address: 'Church St',
    city: 'Bonavista',
    locationId: 'bonavista',
    phone: '(709) 468-2000',
    hours: { weekday: '8:00 AM - 9:00 PM', saturday: '8:00 AM - 9:00 PM', sunday: '10:00 AM - 6:00 PM' },
    features: ['Scene+', 'Community Store', 'Local Seafood']
  },

  // Glovertown & Arnold's Cove
  {
    id: 'foodland-glovertown',
    chainId: 'foodland',
    name: 'Foodland Glovertown',
    type: 'foodland',
    address: 'Main St',
    city: 'Glovertown',
    locationId: 'glovertown',
    phone: '(709) 533-2000',
    hours: { weekday: '8:00 AM - 9:00 PM', saturday: '8:00 AM - 9:00 PM', sunday: '10:00 AM - 6:00 PM' },
    features: ['Scene+', 'Community Store']
  },
  {
    id: 'foodland-arnolds-cove',
    chainId: 'foodland',
    name: "Foodland Arnold's Cove",
    type: 'foodland',
    address: 'Main St',
    city: "Arnold's Cove",
    locationId: 'arnolds-cove',
    phone: '(709) 463-2000',
    hours: { weekday: '8:00 AM - 9:00 PM', saturday: '8:00 AM - 9:00 PM', sunday: '10:00 AM - 6:00 PM' },
    features: ['Scene+', 'Community Store']
  },

  // Burin Peninsula - Marystown
  {
    id: 'walmart-marystown',
    chainId: 'walmart',
    name: 'Walmart Marystown',
    type: 'walmart',
    address: '272 McGettigan Blvd',
    city: 'Marystown',
    locationId: 'marystown',
    phone: '(709) 279-4000',
    hours: { weekday: '8:00 AM - 10:00 PM', saturday: '8:00 AM - 10:00 PM', sunday: '10:00 AM - 6:00 PM' },
    features: ['Supercentre', 'Pharmacy']
  },
  {
    id: 'dominion-marystown',
    chainId: 'dominion',
    name: 'Dominion Marystown',
    type: 'dominion',
    address: 'Peninsula Mall',
    city: 'Marystown',
    locationId: 'marystown',
    phone: '(709) 279-2000',
    hours: { weekday: '8:00 AM - 9:00 PM', saturday: '8:00 AM - 9:00 PM', sunday: '10:00 AM - 6:00 PM' },
    features: ['Pharmacy', 'PC Optimum']
  },
  {
    id: 'nofrills-marystown',
    chainId: 'nofrills',
    name: 'No Frills Marystown',
    type: 'nofrills',
    address: '95 Ville Marie Dr',
    city: 'Marystown',
    locationId: 'marystown',
    phone: '(709) 279-5000',
    hours: { weekday: '8:00 AM - 9:00 PM', saturday: '8:00 AM - 9:00 PM', sunday: '10:00 AM - 6:00 PM' },
    features: ['Discount Prices', 'PC Optimum']
  },

  // Other Burin Peninsula
  {
    id: 'foodland-grand-bank',
    chainId: 'foodland',
    name: 'Foodland Grand Bank',
    type: 'foodland',
    address: 'Main St',
    city: 'Grand Bank',
    locationId: 'grand-bank',
    phone: '(709) 832-2000',
    hours: { weekday: '8:00 AM - 9:00 PM', saturday: '8:00 AM - 9:00 PM', sunday: '10:00 AM - 6:00 PM' },
    features: ['Scene+', 'Community Store']
  },
  {
    id: 'foodland-burin',
    chainId: 'foodland',
    name: 'Foodland Burin',
    type: 'foodland',
    address: 'Main St',
    city: 'Burin',
    locationId: 'burin',
    phone: '(709) 891-2000',
    hours: { weekday: '8:00 AM - 9:00 PM', saturday: '8:00 AM - 9:00 PM', sunday: '10:00 AM - 6:00 PM' },
    features: ['Scene+', 'Community Store']
  },

  // ============================================
  // CENTRAL NEWFOUNDLAND
  // ============================================

  // Gander
  {
    id: 'walmart-gander',
    chainId: 'walmart',
    name: 'Walmart Gander',
    type: 'walmart',
    address: '55 Roe Ave',
    city: 'Gander',
    locationId: 'gander',
    phone: '(709) 256-4000',
    hours: { weekday: '8:00 AM - 10:00 PM', saturday: '8:00 AM - 10:00 PM', sunday: '10:00 AM - 6:00 PM' },
    features: ['Supercentre', 'Pharmacy']
  },
  {
    id: 'dominion-gander',
    chainId: 'dominion',
    name: 'Dominion Gander',
    type: 'dominion',
    address: '100 Laurell Rd',
    city: 'Gander',
    locationId: 'gander',
    phone: '(709) 256-2000',
    hours: { weekday: '8:00 AM - 9:00 PM', saturday: '8:00 AM - 9:00 PM', sunday: '10:00 AM - 6:00 PM' },
    features: ['Pharmacy', 'PC Optimum']
  },
  {
    id: 'sobeys-gander',
    chainId: 'sobeys',
    name: 'Sobeys Gander',
    type: 'sobeys',
    address: 'Fraser Mall',
    city: 'Gander',
    locationId: 'gander',
    phone: '(709) 256-3000',
    hours: { weekday: '8:00 AM - 9:00 PM', saturday: '8:00 AM - 9:00 PM', sunday: '10:00 AM - 6:00 PM' },
    features: ['Pharmacy', 'Scene+']
  },

  // Grand Falls-Windsor
  {
    id: 'walmart-grand-falls',
    chainId: 'walmart',
    name: 'Walmart Grand Falls-Windsor',
    type: 'walmart',
    address: '19 Cromer Ave',
    city: 'Grand Falls-Windsor',
    locationId: 'grand-falls-windsor',
    phone: '(709) 489-4000',
    hours: { weekday: '8:00 AM - 10:00 PM', saturday: '8:00 AM - 10:00 PM', sunday: '10:00 AM - 6:00 PM' },
    features: ['Supercentre', 'Pharmacy']
  },
  {
    id: 'dominion-grand-falls',
    chainId: 'dominion',
    name: 'Dominion Grand Falls-Windsor',
    type: 'dominion',
    address: '17 Cromer Ave',
    city: 'Grand Falls-Windsor',
    locationId: 'grand-falls-windsor',
    phone: '(709) 489-2000',
    hours: { weekday: '8:00 AM - 9:00 PM', saturday: '8:00 AM - 9:00 PM', sunday: '10:00 AM - 6:00 PM' },
    features: ['Pharmacy', 'PC Optimum']
  },
  {
    id: 'sobeys-grand-falls',
    chainId: 'sobeys',
    name: 'Sobeys Grand Falls-Windsor',
    type: 'sobeys',
    address: 'High St',
    city: 'Grand Falls-Windsor',
    locationId: 'grand-falls-windsor',
    phone: '(709) 489-3000',
    hours: { weekday: '8:00 AM - 9:00 PM', saturday: '8:00 AM - 9:00 PM', sunday: '10:00 AM - 6:00 PM' },
    features: ['Pharmacy', 'Scene+']
  },

  // Central Foodland locations
  {
    id: 'foodland-lewisporte',
    chainId: 'foodland',
    name: 'Foodland Lewisporte',
    type: 'foodland',
    address: 'Main St',
    city: 'Lewisporte',
    locationId: 'lewisporte',
    phone: '(709) 535-2000',
    hours: { weekday: '8:00 AM - 9:00 PM', saturday: '8:00 AM - 9:00 PM', sunday: '10:00 AM - 6:00 PM' },
    features: ['Scene+', 'Community Store']
  },
  {
    id: 'foodland-springdale',
    chainId: 'foodland',
    name: 'Foodland Springdale',
    type: 'foodland',
    address: 'Main St',
    city: 'Springdale',
    locationId: 'springdale',
    phone: '(709) 673-2000',
    hours: { weekday: '8:00 AM - 9:00 PM', saturday: '8:00 AM - 9:00 PM', sunday: '10:00 AM - 6:00 PM' },
    features: ['Scene+', 'Community Store']
  },
  {
    id: 'foodland-twillingate',
    chainId: 'foodland',
    name: 'Foodland Twillingate',
    type: 'foodland',
    address: 'Main St',
    city: 'Twillingate',
    locationId: 'twillingate',
    phone: '(709) 884-2000',
    hours: { weekday: '8:00 AM - 9:00 PM', saturday: '8:00 AM - 9:00 PM', sunday: '10:00 AM - 5:00 PM' },
    features: ['Scene+', 'Community Store', 'Local Seafood']
  },
  {
    id: 'foodland-botwood',
    chainId: 'foodland',
    name: 'Foodland Botwood',
    type: 'foodland',
    address: 'Main St',
    city: 'Botwood',
    locationId: 'botwood',
    phone: '(709) 257-2000',
    hours: { weekday: '8:00 AM - 9:00 PM', saturday: '8:00 AM - 9:00 PM', sunday: '10:00 AM - 6:00 PM' },
    features: ['Scene+', 'Community Store']
  },
  {
    id: 'foodland-bishops-falls',
    chainId: 'foodland',
    name: "Foodland Bishop's Falls",
    type: 'foodland',
    address: 'Main St',
    city: "Bishop's Falls",
    locationId: 'bishops-falls',
    phone: '(709) 258-2000',
    hours: { weekday: '8:00 AM - 9:00 PM', saturday: '8:00 AM - 9:00 PM', sunday: '10:00 AM - 6:00 PM' },
    features: ['Scene+', 'Community Store']
  },
  {
    id: 'nofrills-gambo',
    chainId: 'nofrills',
    name: 'No Frills Gambo',
    type: 'nofrills',
    address: 'Main St',
    city: 'Gambo',
    locationId: 'gambo',
    phone: '(709) 674-5000',
    hours: { weekday: '8:00 AM - 9:00 PM', saturday: '8:00 AM - 9:00 PM', sunday: '10:00 AM - 6:00 PM' },
    features: ['Discount Prices', 'PC Optimum']
  },

  // ============================================
  // WESTERN NEWFOUNDLAND
  // ============================================

  // Corner Brook
  {
    id: 'colemans-oconnell',
    chainId: 'colemans',
    name: "Coleman's Garden Market O'Connell",
    type: 'colemans',
    address: "137 O'Connell Dr",
    city: 'Corner Brook',
    locationId: 'corner-brook',
    phone: '(709) 634-3000',
    hours: { weekday: '8:00 AM - 10:00 PM', saturday: '8:00 AM - 10:00 PM', sunday: '10:00 AM - 6:00 PM' },
    features: ['Award-winning Store', 'Online Ordering', 'Fresh Produce', 'Bakery', 'Deli']
  },
  {
    id: 'colemans-caribou',
    chainId: 'colemans',
    name: "Coleman's Caribou Road",
    type: 'colemans',
    address: '26 Caribou Rd',
    city: 'Corner Brook',
    locationId: 'corner-brook',
    phone: '(709) 634-3001',
    hours: { weekday: '8:00 AM - 9:00 PM', saturday: '8:00 AM - 9:00 PM', sunday: '10:00 AM - 6:00 PM' },
    features: ['Online Ordering', 'Fresh Produce', 'Local Products']
  },
  {
    id: 'sobeys-corner-brook',
    chainId: 'sobeys',
    name: 'Sobeys Corner Brook',
    type: 'sobeys',
    address: '1 Mt Bernard Ave',
    city: 'Corner Brook',
    locationId: 'corner-brook',
    phone: '(709) 634-2000',
    hours: { weekday: '8:00 AM - 9:00 PM', saturday: '8:00 AM - 9:00 PM', sunday: '10:00 AM - 6:00 PM' },
    features: ['Pharmacy', 'Scene+', 'Fresh Seafood']
  },
  {
    id: 'dominion-corner-brook',
    chainId: 'dominion',
    name: 'Dominion Corner Brook',
    type: 'dominion',
    address: 'Main St',
    city: 'Corner Brook',
    locationId: 'corner-brook',
    phone: '(709) 634-1000',
    hours: { weekday: '8:00 AM - 9:00 PM', saturday: '8:00 AM - 9:00 PM', sunday: '10:00 AM - 6:00 PM' },
    features: ['Pharmacy', 'PC Optimum']
  },
  {
    id: 'walmart-corner-brook',
    chainId: 'walmart',
    name: 'Walmart Corner Brook',
    type: 'walmart',
    address: '16 Murphy Square',
    city: 'Corner Brook',
    locationId: 'corner-brook',
    phone: '(709) 634-4000',
    hours: { weekday: '8:00 AM - 10:00 PM', saturday: '8:00 AM - 10:00 PM', sunday: '10:00 AM - 6:00 PM' },
    features: ['Supercentre', 'Pharmacy']
  },
  {
    id: 'bulkbarn-corner-brook',
    chainId: 'bulk-barn',
    name: 'Bulk Barn Corner Brook',
    type: 'bulk-barn',
    address: '14 Murphy Square',
    city: 'Corner Brook',
    locationId: 'corner-brook',
    phone: '(709) 634-6000',
    hours: { weekday: '9:00 AM - 9:00 PM', saturday: '9:00 AM - 6:00 PM', sunday: '12:00 PM - 5:00 PM' },
    features: ['Bulk Foods', 'Baking Supplies']
  },

  // Stephenville
  {
    id: 'colemans-stephenville',
    chainId: 'colemans',
    name: "Coleman's Stephenville",
    type: 'colemans',
    address: '125-127 Main St',
    city: 'Stephenville',
    locationId: 'stephenville',
    phone: '(709) 643-3000',
    hours: { weekday: '8:00 AM - 9:00 PM', saturday: '8:00 AM - 9:00 PM', sunday: '10:00 AM - 6:00 PM' },
    features: ['Online Ordering', 'Fresh Produce', 'Local Products']
  },
  {
    id: 'sobeys-stephenville',
    chainId: 'sobeys',
    name: 'Sobeys Stephenville',
    type: 'sobeys',
    address: 'Queen St',
    city: 'Stephenville',
    locationId: 'stephenville',
    phone: '(709) 643-2000',
    hours: { weekday: '8:00 AM - 9:00 PM', saturday: '8:00 AM - 9:00 PM', sunday: '10:00 AM - 6:00 PM' },
    features: ['Pharmacy', 'Scene+']
  },
  {
    id: 'dominion-stephenville',
    chainId: 'dominion',
    name: 'Dominion Stephenville',
    type: 'dominion',
    address: 'Queen St',
    city: 'Stephenville',
    locationId: 'stephenville',
    phone: '(709) 643-1000',
    hours: { weekday: '8:00 AM - 9:00 PM', saturday: '8:00 AM - 9:00 PM', sunday: '10:00 AM - 6:00 PM' },
    features: ['Pharmacy', 'PC Optimum']
  },

  // Deer Lake & Pasadena
  {
    id: 'colemans-deer-lake',
    chainId: 'colemans',
    name: "Coleman's Deer Lake",
    type: 'colemans',
    address: 'Main St',
    city: 'Deer Lake',
    locationId: 'deer-lake',
    phone: '(709) 635-3000',
    hours: { weekday: '8:00 AM - 9:00 PM', saturday: '8:00 AM - 9:00 PM', sunday: '10:00 AM - 6:00 PM' },
    features: ['Fresh Produce', 'Local Products']
  },
  {
    id: 'foodland-deer-lake',
    chainId: 'foodland',
    name: 'Foodland Deer Lake',
    type: 'foodland',
    address: '2 Commerce St',
    city: 'Deer Lake',
    locationId: 'deer-lake',
    phone: '(709) 635-2000',
    hours: { weekday: '8:00 AM - 9:00 PM', saturday: '8:00 AM - 9:00 PM', sunday: '10:00 AM - 6:00 PM' },
    features: ['Scene+', 'Community Store']
  },
  {
    id: 'foodland-pasadena',
    chainId: 'foodland',
    name: 'Foodland Pasadena',
    type: 'foodland',
    address: '77 Main St',
    city: 'Pasadena',
    locationId: 'pasadena',
    phone: '(709) 686-2000',
    hours: { weekday: '8:00 AM - 9:00 PM', saturday: '8:00 AM - 9:00 PM', sunday: '10:00 AM - 6:00 PM' },
    features: ['Scene+', 'Community Store']
  },

  // Port aux Basques
  {
    id: 'colemans-port-aux-basques',
    chainId: 'colemans',
    name: "Coleman's Port aux Basques",
    type: 'colemans',
    address: 'Main St',
    city: 'Channel-Port aux Basques',
    locationId: 'port-aux-basques',
    phone: '(709) 695-3000',
    hours: { weekday: '8:00 AM - 9:00 PM', saturday: '8:00 AM - 9:00 PM', sunday: '10:00 AM - 6:00 PM' },
    features: ['Fresh Produce', 'Local Products']
  },
  {
    id: 'foodland-port-aux-basques',
    chainId: 'foodland',
    name: 'Foodland Port aux Basques',
    type: 'foodland',
    address: 'Grand Bay Mall',
    city: 'Channel-Port aux Basques',
    locationId: 'port-aux-basques',
    phone: '(709) 695-2000',
    hours: { weekday: '8:00 AM - 9:00 PM', saturday: '8:00 AM - 9:00 PM', sunday: '10:00 AM - 6:00 PM' },
    features: ['Scene+', 'Community Store']
  },

  // Northern Peninsula & St. Anthony
  {
    id: 'colemans-st-anthony',
    chainId: 'colemans',
    name: "Coleman's St. Anthony",
    type: 'colemans',
    address: '227A West St',
    city: "St. Anthony",
    locationId: 'st-anthony',
    phone: '(709) 454-3000',
    hours: { weekday: '8:00 AM - 9:00 PM', saturday: '8:00 AM - 9:00 PM', sunday: '10:00 AM - 6:00 PM' },
    features: ['Newest Location (2021)', 'Fresh Produce', 'Local Products']
  },
  {
    id: 'foodland-st-anthony',
    chainId: 'foodland',
    name: 'Foodland St. Anthony',
    type: 'foodland',
    address: 'Main St',
    city: "St. Anthony",
    locationId: 'st-anthony',
    phone: '(709) 454-2000',
    hours: { weekday: '8:00 AM - 9:00 PM', saturday: '8:00 AM - 9:00 PM', sunday: '10:00 AM - 5:00 PM' },
    features: ['Scene+', 'Community Store']
  },
  {
    id: 'foodland-port-aux-choix',
    chainId: 'foodland',
    name: 'Foodland Port au Choix',
    type: 'foodland',
    address: 'Main St',
    city: 'Port au Choix',
    locationId: 'port-aux-choix',
    phone: '(709) 861-2000',
    hours: { weekday: '8:00 AM - 8:00 PM', saturday: '8:00 AM - 8:00 PM', sunday: '10:00 AM - 5:00 PM' },
    features: ['Scene+', 'Rural Community Store']
  },
  {
    id: 'foodland-roddickton',
    chainId: 'foodland',
    name: 'Foodland Roddickton',
    type: 'foodland',
    address: 'Main St',
    city: 'Roddickton',
    locationId: 'roddickton',
    phone: '(709) 457-2000',
    hours: { weekday: '8:00 AM - 8:00 PM', saturday: '8:00 AM - 8:00 PM', sunday: '10:00 AM - 5:00 PM' },
    features: ['Scene+', 'Rural Community Store']
  },
  {
    id: 'foodland-flowers-cove',
    chainId: 'foodland',
    name: "Foodland Flower's Cove",
    type: 'foodland',
    address: 'Main St',
    city: "Flower's Cove",
    locationId: 'flowers-cove',
    phone: '(709) 456-2000',
    hours: { weekday: '8:00 AM - 8:00 PM', saturday: '8:00 AM - 8:00 PM', sunday: '10:00 AM - 5:00 PM' },
    features: ['Scene+', 'Rural Community Store']
  },

  // ============================================
  // LABRADOR
  // ============================================

  // Labrador City
  {
    id: 'walmart-labrador-city',
    chainId: 'walmart',
    name: 'Walmart Labrador City',
    type: 'walmart',
    address: '500 Vanier Dr',
    city: 'Labrador City',
    locationId: 'labrador-city',
    phone: '(709) 944-4000',
    hours: { weekday: '8:00 AM - 10:00 PM', saturday: '8:00 AM - 10:00 PM', sunday: '10:00 AM - 6:00 PM' },
    features: ['Supercentre', 'Pharmacy']
  },
  {
    id: 'sobeys-labrador-city',
    chainId: 'sobeys',
    name: 'Sobeys Labrador City',
    type: 'sobeys',
    address: '208 Humber Ave',
    city: 'Labrador City',
    locationId: 'labrador-city',
    phone: '(709) 944-3000',
    hours: { weekday: '8:00 AM - 9:00 PM', saturday: '8:00 AM - 9:00 PM', sunday: '10:00 AM - 6:00 PM' },
    features: ['Pharmacy', 'Scene+', 'Fresh Produce']
  },

  // Happy Valley-Goose Bay
  {
    id: 'northmart-goose-bay',
    chainId: 'northmart',
    name: 'NorthMart Happy Valley-Goose Bay',
    type: 'northmart',
    address: '90 Hamilton River Rd',
    city: 'Happy Valley-Goose Bay',
    locationId: 'happy-valley-goose-bay',
    phone: '(709) 896-2000',
    hours: { weekday: '9:00 AM - 9:00 PM', saturday: '9:00 AM - 6:00 PM', sunday: '12:00 PM - 5:00 PM' },
    features: ['North West Company', 'Essential Supplies', 'Fresh Produce']
  },

  // Coastal Labrador - Northern Stores
  {
    id: 'northern-nain',
    chainId: 'northmart',
    name: 'Northern Store Nain',
    type: 'northmart',
    address: 'Main Rd',
    city: 'Nain',
    locationId: 'nain',
    phone: '(709) 922-2000',
    hours: { weekday: '9:00 AM - 6:00 PM', saturday: '9:00 AM - 6:00 PM', sunday: '12:00 PM - 5:00 PM' },
    features: ['Remote Community', 'Essential Supplies', 'Higher Prices Due to Shipping']
  },
  {
    id: 'northern-makkovik',
    chainId: 'northmart',
    name: 'Northern Store Makkovik',
    type: 'northmart',
    address: 'Main Rd',
    city: 'Makkovik',
    locationId: 'makkovik',
    phone: '(709) 923-2000',
    hours: { weekday: '9:00 AM - 6:00 PM', saturday: '9:00 AM - 6:00 PM', sunday: 'Closed' },
    features: ['Remote Community', 'Essential Supplies']
  },
  {
    id: 'northern-rigolet',
    chainId: 'northmart',
    name: 'Northern Store Rigolet',
    type: 'northmart',
    address: 'Main Rd',
    city: 'Rigolet',
    locationId: 'rigolet',
    phone: '(709) 947-2000',
    hours: { weekday: '9:00 AM - 6:00 PM', saturday: '9:00 AM - 6:00 PM', sunday: 'Closed' },
    features: ['Remote Community', 'Essential Supplies']
  },
  {
    id: 'northern-postville',
    chainId: 'northmart',
    name: 'Northern Store Postville',
    type: 'northmart',
    address: 'Main Rd',
    city: 'Postville',
    locationId: 'postville',
    phone: '(709) 479-2000',
    hours: { weekday: '9:00 AM - 6:00 PM', saturday: '9:00 AM - 6:00 PM', sunday: 'Closed' },
    features: ['Remote Community', 'Essential Supplies']
  },
  {
    id: 'northern-hopedale',
    chainId: 'northmart',
    name: 'Northern Store Hopedale',
    type: 'northmart',
    address: 'Main Rd',
    city: 'Hopedale',
    locationId: 'hopedale',
    phone: '(709) 933-2000',
    hours: { weekday: '9:00 AM - 6:00 PM', saturday: '9:00 AM - 6:00 PM', sunday: 'Closed' },
    features: ['Remote Community', 'Essential Supplies']
  },

  // Labrador Straits - Foodland
  {
    id: 'foodland-lanse-au-loup',
    chainId: 'foodland',
    name: "Foodland L'Anse au Loup",
    type: 'foodland',
    address: 'Main St',
    city: "L'Anse au Loup",
    locationId: 'lanse-au-loup',
    phone: '(709) 927-2000',
    hours: { weekday: '8:00 AM - 8:00 PM', saturday: '8:00 AM - 8:00 PM', sunday: '10:00 AM - 5:00 PM' },
    features: ['Scene+', 'Southern Labrador']
  },
  {
    id: 'foodland-forteau',
    chainId: 'foodland',
    name: 'Foodland Forteau',
    type: 'foodland',
    address: 'Main St',
    city: 'Forteau',
    locationId: 'forteau',
    phone: '(709) 931-2000',
    hours: { weekday: '8:00 AM - 8:00 PM', saturday: '8:00 AM - 8:00 PM', sunday: '10:00 AM - 5:00 PM' },
    features: ['Scene+', 'Southern Labrador']
  },
  {
    id: 'foodland-lanse-au-clair',
    chainId: 'foodland',
    name: "Foodland L'Anse au Clair",
    type: 'foodland',
    address: 'Main St',
    city: "L'Anse au Clair",
    locationId: 'lanse-au-clair',
    phone: '(709) 931-2100',
    hours: { weekday: '8:00 AM - 8:00 PM', saturday: '8:00 AM - 8:00 PM', sunday: '10:00 AM - 5:00 PM' },
    features: ['Scene+', 'Southern Labrador']
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

// Get 24-hour stores
export const get24HourStores = (): ExtendedStore[] => {
  return extendedStores.filter(store => store.is24Hour);
};

// Get stores by loyalty program
export const getStoresByLoyaltyProgram = (program: 'PC Optimum' | 'Scene+'): ExtendedStore[] => {
  const chainIds = groceryChains
    .filter(chain => chain.loyaltyProgram === program)
    .map(chain => chain.id);
  return extendedStores.filter(store => chainIds.includes(store.chainId));
};

// Get discount stores
export const getDiscountStores = (): ExtendedStore[] => {
  const discountChains = groceryChains
    .filter(chain => chain.priceLevel === 'budget')
    .map(chain => chain.id);
  return extendedStores.filter(store => discountChains.includes(store.chainId));
};
