const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '..', '..', 'data', 'newsletter.db');

// Ensure data directory exists
const fs = require('fs');
const dataDir = path.dirname(dbPath);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const db = new Database(dbPath);

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Create tables
const createTables = `
-- Stores table
CREATE TABLE IF NOT EXISTS stores (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  chain TEXT NOT NULL,
  address TEXT,
  city TEXT NOT NULL,
  region TEXT NOT NULL CHECK(region IN ('Avalon', 'Central', 'Western', 'Labrador')),
  postal_code TEXT,
  phone TEXT,
  website TEXT,
  loyalty_program TEXT,
  store_type TEXT DEFAULT 'grocery' CHECK(store_type IN ('grocery', 'discount', 'wholesale', 'specialty', 'farmers_market')),
  is_active INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Deals table
CREATE TABLE IF NOT EXISTS deals (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  store_id INTEGER NOT NULL,
  product_name TEXT NOT NULL,
  category TEXT NOT NULL CHECK(category IN ('produce', 'meat', 'dairy', 'bakery', 'frozen', 'pantry', 'beverages', 'snacks', 'household', 'personal_care', 'other')),
  regular_price REAL,
  sale_price REAL NOT NULL,
  unit TEXT DEFAULT 'each',
  discount_percent REAL,
  loyalty_points INTEGER DEFAULT 0,
  loyalty_points_value REAL DEFAULT 0,
  description TEXT,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  is_featured INTEGER DEFAULT 0,
  source TEXT,
  image_url TEXT,
  is_active INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (store_id) REFERENCES stores(id) ON DELETE CASCADE
);

-- Subscribers table
CREATE TABLE IF NOT EXISTS subscribers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  first_name TEXT,
  last_name TEXT,
  region TEXT CHECK(region IN ('Avalon', 'Central', 'Western', 'Labrador', 'All')),
  preferences TEXT DEFAULT '{}',
  is_premium INTEGER DEFAULT 0,
  is_verified INTEGER DEFAULT 0,
  verification_token TEXT,
  unsubscribe_token TEXT NOT NULL,
  subscribed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  verified_at DATETIME,
  unsubscribed_at DATETIME,
  is_active INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Newsletters table
CREATE TABLE IF NOT EXISTS newsletters (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  subject TEXT NOT NULL,
  preview_text TEXT,
  content_html TEXT NOT NULL,
  content_text TEXT,
  status TEXT DEFAULT 'draft' CHECK(status IN ('draft', 'scheduled', 'sent', 'cancelled')),
  scheduled_for DATETIME,
  sent_at DATETIME,
  recipients_count INTEGER DEFAULT 0,
  open_count INTEGER DEFAULT 0,
  click_count INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Newsletter deals junction table
CREATE TABLE IF NOT EXISTS newsletter_deals (
  newsletter_id INTEGER NOT NULL,
  deal_id INTEGER NOT NULL,
  display_order INTEGER DEFAULT 0,
  PRIMARY KEY (newsletter_id, deal_id),
  FOREIGN KEY (newsletter_id) REFERENCES newsletters(id) ON DELETE CASCADE,
  FOREIGN KEY (deal_id) REFERENCES deals(id) ON DELETE CASCADE
);

-- Analytics table
CREATE TABLE IF NOT EXISTS analytics (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  event_type TEXT NOT NULL CHECK(event_type IN ('subscribe', 'unsubscribe', 'open', 'click', 'page_view')),
  newsletter_id INTEGER,
  subscriber_id INTEGER,
  deal_id INTEGER,
  metadata TEXT DEFAULT '{}',
  ip_address TEXT,
  user_agent TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (newsletter_id) REFERENCES newsletters(id) ON DELETE SET NULL,
  FOREIGN KEY (subscriber_id) REFERENCES subscribers(id) ON DELETE SET NULL,
  FOREIGN KEY (deal_id) REFERENCES deals(id) ON DELETE SET NULL
);

-- Tips table
CREATE TABLE IF NOT EXISTS tips (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT DEFAULT 'general' CHECK(category IN ('general', 'couponing', 'loyalty', 'meal_planning', 'seasonal')),
  is_active INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_deals_store ON deals(store_id);
CREATE INDEX IF NOT EXISTS idx_deals_dates ON deals(start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_deals_category ON deals(category);
CREATE INDEX IF NOT EXISTS idx_deals_featured ON deals(is_featured);
CREATE INDEX IF NOT EXISTS idx_subscribers_email ON subscribers(email);
CREATE INDEX IF NOT EXISTS idx_subscribers_region ON subscribers(region);
CREATE INDEX IF NOT EXISTS idx_analytics_type ON analytics(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_date ON analytics(created_at);
`;

// Run table creation
db.exec(createTables);

console.log('✅ Database initialized successfully at:', dbPath);

db.close();
