const Database = require('better-sqlite3');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const dbPath = path.join(__dirname, '..', '..', 'data', 'newsletter.db');
const db = new Database(dbPath);

// Clear existing data
db.exec('DELETE FROM newsletter_deals');
db.exec('DELETE FROM analytics');
db.exec('DELETE FROM newsletters');
db.exec('DELETE FROM deals');
db.exec('DELETE FROM subscribers');
db.exec('DELETE FROM stores');
db.exec('DELETE FROM tips');

// Reset auto-increment
db.exec('DELETE FROM sqlite_sequence');

// Insert stores
const insertStore = db.prepare(`
  INSERT INTO stores (name, chain, address, city, region, postal_code, phone, website, loyalty_program, store_type)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

const stores = [
  // Avalon Region - St. John's
  ['Dominion - Stavanger Drive', 'Dominion', '42 Stavanger Dr', "St. John's", 'Avalon', 'A1A 5E8', '709-726-0044', 'https://www.dominion.ca', 'PC Optimum', 'grocery'],
  ['Dominion - Kelsey Drive', 'Dominion', '75 Kelsey Dr', "St. John's", 'Avalon', 'A1B 5E8', '709-726-1922', 'https://www.dominion.ca', 'PC Optimum', 'grocery'],
  ['Dominion - Topsail Road', 'Dominion', '360 Topsail Rd', "St. John's", 'Avalon', 'A1E 2B5', '709-364-8585', 'https://www.dominion.ca', 'PC Optimum', 'grocery'],
  ['Sobeys - Merrymeeting Road', 'Sobeys', '26 Merrymeeting Rd', "St. John's", 'Avalon', 'A1C 2W3', '709-726-0274', 'https://www.sobeys.com', 'Scene+', 'grocery'],
  ['Sobeys - Kelsey Drive', 'Sobeys', '11 Kelsey Dr', "St. John's", 'Avalon', 'A1B 3M5', '709-726-7704', 'https://www.sobeys.com', 'Scene+', 'grocery'],
  ['Colemans - Freshwater Road', 'Colemans', '390 Freshwater Rd', "St. John's", 'Avalon', 'A1B 1C4', '709-726-3500', 'https://www.colemans.ca', 'Scene+', 'grocery'],
  ['Colemans - Blackmarsh Road', 'Colemans', '315 Blackmarsh Rd', "St. John's", 'Avalon', 'A1E 1T2', '709-726-1800', 'https://www.colemans.ca', 'Scene+', 'grocery'],
  ['Walmart Supercentre - Stavanger', 'Walmart', '50 Stavanger Dr', "St. John's", 'Avalon', 'A1A 5E8', '709-726-8898', 'https://www.walmart.ca', null, 'discount'],
  ['Costco - St. Johns', 'Costco', '35 Stavanger Dr', "St. John's", 'Avalon', 'A1A 0C9', '709-726-0939', 'https://www.costco.ca', 'Costco Membership', 'wholesale'],
  ['No Frills - Mount Pearl', 'No Frills', '76 Commonwealth Ave', 'Mount Pearl', 'Avalon', 'A1N 1W7', '709-364-2299', 'https://www.nofrills.ca', 'PC Optimum', 'discount'],
  ['Atlantic Superstore - Kelsey Drive', 'Atlantic Superstore', '55 Kelsey Dr', "St. John's", 'Avalon', 'A1B 5E8', '709-753-8800', 'https://www.atlanticsuperstore.ca', 'PC Optimum', 'grocery'],
  
  // Avalon - Other areas
  ['Dominion - Conception Bay South', 'Dominion', '7 Hefferton Dr', 'Conception Bay South', 'Avalon', 'A1X 7K3', '709-834-8050', 'https://www.dominion.ca', 'PC Optimum', 'grocery'],
  ['Sobeys - Paradise', 'Sobeys', '1300 Topsail Rd', 'Paradise', 'Avalon', 'A1L 1P9', '709-782-0900', 'https://www.sobeys.com', 'Scene+', 'grocery'],
  ['Foodland - Placentia', 'Foodland', '1 Blockhouse Rd', 'Placentia', 'Avalon', 'A0B 2Y0', '709-227-2101', 'https://www.foodland.ca', 'Scene+', 'grocery'],
  
  // Central Region
  ['Dominion - Gander', 'Dominion', '100 Trans Canada Hwy', 'Gander', 'Central', 'A1V 1P6', '709-256-2680', 'https://www.dominion.ca', 'PC Optimum', 'grocery'],
  ['Colemans - Grand Falls-Windsor', 'Colemans', '1 Cromer Ave', 'Grand Falls-Windsor', 'Central', 'A2A 1W9', '709-489-6600', 'https://www.colemans.ca', 'Scene+', 'grocery'],
  ['Walmart - Gander', 'Walmart', '1 Airport Blvd', 'Gander', 'Central', 'A1V 2R1', '709-256-8888', 'https://www.walmart.ca', null, 'discount'],
  ['Foodland - Lewisporte', 'Foodland', '75 Main St', 'Lewisporte', 'Central', 'A0G 3A0', '709-535-2300', 'https://www.foodland.ca', 'Scene+', 'grocery'],
  
  // Western Region
  ['Dominion - Corner Brook', 'Dominion', '11 Murphy Square', 'Corner Brook', 'Western', 'A2H 6T3', '709-634-8000', 'https://www.dominion.ca', 'PC Optimum', 'grocery'],
  ['Colemans - Corner Brook', 'Colemans', '1 Mt. Bernard Ave', 'Corner Brook', 'Western', 'A2H 6T5', '709-634-5141', 'https://www.colemans.ca', 'Scene+', 'grocery'],
  ['Walmart - Corner Brook', 'Walmart', 'Confederation Dr', 'Corner Brook', 'Western', 'A2H 6T6', '709-639-7977', 'https://www.walmart.ca', null, 'discount'],
  ['Foodland - Stephenville', 'Foodland', '40 Queen St', 'Stephenville', 'Western', 'A2N 2M5', '709-643-2011', 'https://www.foodland.ca', 'Scene+', 'grocery'],
  ['Foodland - Port aux Basques', 'Foodland', '2 Grand Bay Rd', 'Channel-Port aux Basques', 'Western', 'A0M 1C0', '709-695-2104', 'https://www.foodland.ca', 'Scene+', 'grocery'],
  
  // Labrador
  ['Dominion - Labrador City', 'Dominion', '500 Vanier Ave', 'Labrador City', 'Labrador', 'A2V 2W7', '709-944-2613', 'https://www.dominion.ca', 'PC Optimum', 'grocery'],
  ['NorthMart - Happy Valley-Goose Bay', 'NorthMart', '382 Hamilton River Rd', 'Happy Valley-Goose Bay', 'Labrador', 'A0P 1E0', '709-896-3672', 'https://www.northmart.ca', null, 'grocery'],
  ['Colemans - Labrador City', 'Colemans', '321 Hudson Dr', 'Labrador City', 'Labrador', 'A2V 1L2', '709-944-5511', 'https://www.colemans.ca', 'Scene+', 'grocery'],
  
  // Specialty Stores
  ["St. John's Farmers' Market", 'Independent', '245 Freshwater Rd', "St. John's", 'Avalon', 'A1B 1B5', '709-722-5888', 'https://www.sjfm.ca', null, 'farmers_market'],
  ['Belbin\'s Grocery', 'Independent', '190 New Gower St', "St. John's", 'Avalon', 'A1C 1J4', '709-722-3902', null, null, 'specialty'],
  ['Bulk Barn - St. Johns', 'Bulk Barn', '41 Pearlgate Plaza', "St. John's", 'Avalon', 'A1A 3Z2', '709-579-3880', 'https://www.bulkbarn.ca', null, 'specialty'],
  ['Andaluzia Market', 'Independent', '326 Freshwater Rd', "St. John's", 'Avalon', 'A1B 1C2', '709-738-8088', null, null, 'specialty'],
];

console.log('📦 Inserting stores...');
stores.forEach(store => {
  insertStore.run(...store);
});

// Insert sample deals
const insertDeal = db.prepare(`
  INSERT INTO deals (store_id, product_name, category, regular_price, sale_price, unit, discount_percent, loyalty_points, loyalty_points_value, description, start_date, end_date, is_featured, source)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

// Calculate dates
const today = new Date();
const startDate = today.toISOString().split('T')[0];
const endDateWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
const endDateTwoWeeks = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

const deals = [
  // Dominion deals (store_id: 1-3)
  [1, 'Boneless Skinless Chicken Breast', 'meat', 14.99, 9.99, '/kg', 33, 0, 0, 'Family pack, fresh', startDate, endDateWeek, 1, 'Weekly Flyer'],
  [1, 'PC Free Run Large Eggs', 'dairy', 5.49, 3.99, 'dozen', 27, 500, 0.50, 'Bonus PC Optimum Points!', startDate, endDateWeek, 1, 'Weekly Flyer'],
  [2, 'Lean Ground Beef', 'meat', 8.99, 5.99, '/lb', 33, 0, 0, 'Fresh, 80% lean', startDate, endDateWeek, 1, 'Weekly Flyer'],
  [2, 'Atlantic Salmon Fillets', 'meat', 15.99, 11.99, '/lb', 25, 1000, 1.00, 'Wild caught, bonus points', startDate, endDateWeek, 0, 'Weekly Flyer'],
  [3, 'Seedless Red Grapes', 'produce', 4.99, 2.99, '/lb', 40, 0, 0, 'Imported, sweet', startDate, endDateWeek, 1, 'Weekly Flyer'],
  [1, 'No Name Butter', 'dairy', 6.99, 4.99, '454g', 29, 0, 0, 'Salted or unsalted', startDate, endDateWeek, 0, 'Weekly Flyer'],
  [3, 'PC White Bread', 'bakery', 3.49, 2.00, 'loaf', 43, 0, 0, '675g loaf', startDate, endDateWeek, 0, 'Weekly Flyer'],
  
  // Sobeys deals (store_id: 4-5)
  [4, 'Compliments Ice Cream', 'frozen', 6.99, 3.99, '1.5L', 43, 200, 2.00, '200 Scene+ bonus points', startDate, endDateWeek, 1, 'Weekly Flyer'],
  [4, 'Broccoli Crowns', 'produce', 3.99, 1.99, '/lb', 50, 0, 0, 'Fresh, product of USA', startDate, endDateWeek, 1, 'Weekly Flyer'],
  [5, 'Pork Tenderloin', 'meat', 12.99, 8.99, '/lb', 31, 0, 0, 'Fresh, whole', startDate, endDateWeek, 0, 'Weekly Flyer'],
  [4, 'Sensations by Compliments Coffee', 'beverages', 12.99, 8.99, '340g', 31, 500, 5.00, '500 Scene+ points', startDate, endDateWeek, 0, 'Weekly Flyer'],
  
  // Colemans deals (store_id: 6-7)
  [6, 'Maple Leaf Bacon', 'meat', 8.99, 5.99, '375g', 33, 0, 0, 'Original or thick cut', startDate, endDateWeek, 1, 'Weekly Flyer'],
  [6, 'Kraft Peanut Butter', 'pantry', 7.99, 5.49, '1kg', 31, 0, 0, 'Smooth or crunchy', startDate, endDateWeek, 0, 'Weekly Flyer'],
  [7, 'Green Peppers', 'produce', 2.99, 0.99, 'each', 67, 0, 0, 'Large size', startDate, endDateWeek, 1, 'Weekly Flyer'],
  
  // Walmart deals (store_id: 8)
  [8, 'Great Value Milk 2%', 'dairy', 5.97, 4.97, '4L', 17, 0, 0, 'Everyday low price', startDate, endDateTwoWeeks, 0, 'Rollback'],
  [8, 'Bananas', 'produce', 0.69, 0.59, '/lb', 14, 0, 0, 'Always fresh', startDate, endDateTwoWeeks, 0, 'Rollback'],
  [8, 'Great Value Pasta', 'pantry', 1.97, 0.97, '900g', 51, 0, 0, 'Spaghetti or penne', startDate, endDateTwoWeeks, 1, 'Rollback'],
  
  // Costco deals (store_id: 9)
  [9, 'Kirkland Signature Olive Oil', 'pantry', 24.99, 19.99, '2L', 20, 0, 0, 'Extra virgin', startDate, endDateTwoWeeks, 1, 'Warehouse Sale'],
  [9, 'Rotisserie Chicken', 'meat', 8.99, 7.99, 'each', 11, 0, 0, 'Hot and ready', startDate, endDateTwoWeeks, 1, 'Member Price'],
  [9, 'Kirkland Signature Toilet Paper', 'household', 22.99, 18.99, '30 rolls', 17, 0, 0, 'Bulk savings', startDate, endDateTwoWeeks, 0, 'Warehouse Sale'],
  
  // No Frills deals (store_id: 10)
  [10, 'No Name Canned Tomatoes', 'pantry', 1.49, 0.88, '796ml', 41, 0, 0, 'Diced or whole', startDate, endDateWeek, 1, 'Weekly Flyer'],
  [10, 'Yellow Onions', 'produce', 2.99, 1.49, '3lb bag', 50, 0, 0, 'Cooking essentials', startDate, endDateWeek, 0, 'Weekly Flyer'],
  [10, 'No Name Cheese', 'dairy', 8.99, 6.99, '700g', 22, 0, 0, 'Medium cheddar', startDate, endDateWeek, 0, 'Weekly Flyer'],
  
  // Corner Brook Dominion (store_id: 19)
  [19, 'Turkey Breast', 'meat', 11.99, 7.99, '/lb', 33, 0, 0, 'Deli sliced', startDate, endDateWeek, 1, 'Weekly Flyer'],
  [19, 'PC Bottled Water', 'beverages', 3.99, 2.49, '24-pack', 38, 0, 0, '500ml bottles', startDate, endDateWeek, 0, 'Weekly Flyer'],
  
  // Labrador deals (store_id: 24-25)
  [24, 'Whole Wheat Bread', 'bakery', 4.99, 3.49, 'loaf', 30, 0, 0, 'Fresh baked', startDate, endDateWeek, 0, 'Weekly Flyer'],
  [25, 'Frozen Vegetables Mix', 'frozen', 5.99, 4.49, '750g', 25, 0, 0, 'Northern selection', startDate, endDateTwoWeeks, 0, 'Weekly Flyer'],
];

console.log('🏷️ Inserting deals...');
deals.forEach(deal => {
  insertDeal.run(...deal);
});

// Insert sample subscribers
const insertSubscriber = db.prepare(`
  INSERT INTO subscribers (email, first_name, last_name, region, is_verified, unsubscribe_token, verified_at)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`);

const subscribers = [
  ['john.smith@example.com', 'John', 'Smith', 'Avalon', 1, uuidv4(), new Date().toISOString()],
  ['mary.jones@example.com', 'Mary', 'Jones', 'Avalon', 1, uuidv4(), new Date().toISOString()],
  ['bob.murphy@example.com', 'Bob', 'Murphy', 'Western', 1, uuidv4(), new Date().toISOString()],
  ['sarah.kelly@example.com', 'Sarah', 'Kelly', 'Central', 1, uuidv4(), new Date().toISOString()],
  ['mike.power@example.com', 'Mike', 'Power', 'Labrador', 1, uuidv4(), new Date().toISOString()],
];

console.log('👥 Inserting sample subscribers...');
subscribers.forEach(sub => {
  insertSubscriber.run(...sub);
});

// Insert tips
const insertTip = db.prepare(`
  INSERT INTO tips (title, content, category)
  VALUES (?, ?, ?)
`);

const tips = [
  ['Stack Your Savings', 'Combine PC Optimum offers with weekly flyer deals. Load personalized offers in the app before shopping!', 'couponing'],
  ['Price Match at Walmart', 'Walmart Canada price matches identical products from local competitors. Bring the flyer or show on your phone!', 'couponing'],
  ['Scene+ Tuesday', 'Shop at Sobeys on Tuesdays to earn 2x Scene+ points on most purchases.', 'loyalty'],
  ['Freeze Your Bread', 'When bread goes on sale, buy extra and freeze. It stays fresh for up to 3 months!', 'meal_planning'],
  ['Check Unit Prices', 'Always compare unit prices ($/kg or $/100g) rather than package prices to find the true best deal.', 'general'],
  ['Bonus Point Events', 'Watch for "Spend $XX, Get XXXX Points" events at Dominion and Sobeys - plan big shops around these!', 'loyalty'],
  ['Seasonal Produce', 'Buy local produce at farmers\' markets in summer. Prices are often better and quality is superior!', 'seasonal'],
  ['Meal Plan Sunday', 'Review next week\'s flyers on Saturday/Sunday and plan meals around what\'s on sale.', 'meal_planning'],
  ['Clearance Section', 'Check the clearance/reduced section for items near best-before date - perfect for same-day use!', 'general'],
  ['PC Insiders Report', 'Download the PC Optimum app and check your personalized offers every week before shopping.', 'loyalty'],
];

console.log('💡 Inserting tips...');
tips.forEach(tip => {
  insertTip.run(...tip);
});

console.log('✅ Database seeded successfully!');
console.log(`   - ${stores.length} stores`);
console.log(`   - ${deals.length} deals`);
console.log(`   - ${subscribers.length} subscribers`);
console.log(`   - ${tips.length} tips`);

db.close();
